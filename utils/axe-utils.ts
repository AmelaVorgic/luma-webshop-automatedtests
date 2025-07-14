import { AxeBuilder } from '@axe-core/playwright';
import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export async function runAxeTest(page: Page, testName: string) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const violations = accessibilityScanResults.violations;
  
  if (violations.length > 0) {
    console.log(`Accessibility violations found in ${testName}:`);
    violations.forEach(violation => {
      console.log(`- ${violation.id}: ${violation.description}`);
      violation.nodes.forEach(node => {
        console.log(`  - Element: ${node.html}`);
      });
    });
  }

  return {
    violations,
    passes: accessibilityScanResults.passes,
    incomplete: accessibilityScanResults.incomplete,
    inapplicable: accessibilityScanResults.inapplicable
  };
}

export async function assertNoAccessibilityViolations(page: Page, testName: string) {
  const results = await runAxeTest(page, testName);
  
  if (results.violations.length > 0) {
    throw new Error(
      `Accessibility violations found in ${testName}:\n` +
      results.violations.map(violation => 
        `${violation.id}: ${violation.description}`
      ).join('\n')
    );
  }
}

export async function generateAccessibilityReport(page: Page, testName: string) {
  const results = await runAxeTest(page, testName);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = path.join(__dirname, '../reports/accessibility');
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const htmlReport = generateHTMLReport(results, testName, timestamp);
  const reportPath = path.join(reportDir, `accessibility-${testName}-${timestamp}.html`);
  
  fs.writeFileSync(reportPath, htmlReport);
  console.log(`Accessibility report generated: ${reportPath}`);
  
  return reportPath;
}

function generateHTMLReport(results: any, testName: string, timestamp: string) {
  const violations = results.violations;
  const passes = results.passes;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Report - ${testName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }
        .summary { margin: 20px 0; }
        .violation { background: #ffe6e6; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .pass { background: #e6ffe6; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .node { background: #f9f9f9; padding: 10px; margin: 5px 0; border-left: 3px solid #ccc; }
        .tag { background: #007bff; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px; margin: 2px; }
        .impact { font-weight: bold; }
        .impact-minor { color: #ffc107; }
        .impact-moderate { color: #fd7e14; }
        .impact-serious { color: #dc3545; }
        .impact-critical { color: #721c24; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Accessibility Report</h1>
        <p><strong>Test:</strong> ${testName}</p>
        <p><strong>Generated:</strong> ${timestamp}</p>
    </div>

    <div class="summary">
        <h2>Summary</h2>
        <p><strong>Violations:</strong> ${violations.length}</p>
        <p><strong>Passes:</strong> ${passes.length}</p>
    </div>

    ${violations.length > 0 ? `
    <div class="violations">
        <h2>Violations (${violations.length})</h2>
        ${violations.map(violation => `
            <div class="violation">
                <h3>${violation.id}: ${violation.description}</h3>
                <p><strong>Impact:</strong> <span class="impact impact-${violation.impact}">${violation.impact}</span></p>
                <p><strong>Help:</strong> ${violation.help}</p>
                <p><strong>Tags:</strong> ${violation.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</p>
                <h4>Affected Elements (${violation.nodes.length}):</h4>
                ${violation.nodes.map(node => `
                    <div class="node">
                        <p><strong>HTML:</strong> ${node.html}</p>
                        <p><strong>Target:</strong> ${node.target.join(' > ')}</p>
                        <p><strong>Failure Summary:</strong> ${node.failureSummary}</p>
                    </div>
                `).join('')}
            </div>
        `).join('')}
    </div>
    ` : '<p><strong>No violations found! 🎉</strong></p>'}

    ${passes.length > 0 ? `
    <div class="passes">
        <h2>Passes (${passes.length})</h2>
        ${passes.map(pass => `
            <div class="pass">
                <h3>${pass.id}: ${pass.description}</h3>
                <p><strong>Tags:</strong> ${pass.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</p>
            </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>
  `;
} 