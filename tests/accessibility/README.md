# Accessibility Tests

This folder contains accessibility tests using axe-core/playwright for the Luma Webshop.

## Test Files

- `search-accessibility.spec.ts` - Tests accessibility of search functionality
- `login-accessibility.spec.ts` - Tests accessibility of login forms and error states
- `account-creation-accessibility.spec.ts` - Tests accessibility of account creation forms

## Running Tests

### Run all accessibility tests:
```bash
npm run test:accessibility
```

### Run specific accessibility test:
```bash
npm run test:accessibility:search
npm run test:accessibility:login
npm run test:accessibility:account
```

### Run functional tests (without accessibility):
```bash
npm run test:functional
```

## Reports

Accessibility reports are generated in HTML format and saved to:
```
reports/accessibility/
```

Each test generates a timestamped HTML report with:
- Summary of violations and passes
- Detailed violation descriptions
- Affected HTML elements
- WCAG 2.0 A and AA compliance status

## WCAG Standards

Tests check for compliance with:
- WCAG 2.0 Level A
- WCAG 2.0 Level AA

## Common Issues Found

- Missing alt text for images
- Insufficient color contrast
- Missing form labels
- Keyboard navigation issues
- Screen reader compatibility

## Viewing Reports

After running tests, HTML reports can be opened in any web browser to view detailed accessibility analysis. 