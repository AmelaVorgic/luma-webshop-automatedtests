# Automated Tests for Luma Webshop Project

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white" /> <img src="https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white"/> <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)"/> 

This repository contains automated tests for the Luma Webshop project, utilizing Playwright for test automation, written in TypeScript.

[![Schedueld Push](https://github.com/AmelaVorgic/luma-webshop-automatedtests/actions/workflows/scheduled-push.yml/badge.svg)](https://github.com/AmelaVorgic/luma-webshop-automatedtests/actions/workflows/scheduled-push.yml)

 
## Prerequisites 

- Playwright: Automated browser testing tool.
- Node.js: Ensure you have Node.js installed to run the tests.

## How to Run the Tests
- Clone the Repository: Begin by cloning this repository to your local machine.
- Install Dependencies: Install the necessary dependencies using npm or yarn.
- Configure .env file accordingly.

### Headless Mode 
Run Tests (Headless Mode): To run the tests in headless mode (default), use the following command. This will run the tests in the Chromium browser and display the results in the terminal.

```bash
npx playwright test
```
### UI Mode
Run Tests with UI Mode: For a better developer experience, use the UI mode to watch tests interactively. This allows you to walk through each step and visually track the test execution.

```bash
npx playwright test --ui
```
### Headed Mode
Run Tests in Headed Mode: To see the tests run in a "headed" mode (with a visible browser window), use the command below. This mode allows you to observe how the automation interacts with the Luma webshop.

```bash
npx playwright test --headed
```

#### Enjoy Testing!