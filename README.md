BDD Playwright Framework
This repository contains a BDD (Behavior-Driven Development) framework implemented using Playwright, with scripts written in type script. This framework facilitates automated testing of web applications in a structured and collaborative manner.

Framework Overview
Framework Type: BDD (Behavior-Driven Development)
Automation Tool: Playwright
Language Type: TypeScript

Features
Structured Testing: Utilizes the BDD approach to define test scenarios in a human-readable format using Given-When-Then steps.
Cross-Browser Testing: Supports testing across multiple browsers (e.g., Chrome, Firefox, Safari) with Playwright's multi-browser support.
Data-Driven Testing: Integrates with data providers to parameterize test scenarios and execute them with different input data.


Getting Started
Prerequisites
Node.js installed on your machine.
Playwright installed globally (npm install -g playwright).
Installation
Clone this repository to your local machine.
Navigate to the project directory.
Install dependencies by running npm install.

Usage
To run all tests, execute npm run test.

Folder Structure
│
├── features/                   # BDD feature files (Gherkin syntax)
├── src/tests/step_definitions/ # Step definitions for Given-When-Then steps
├── src/tests/resources/                      # Test data files (if applicable)
├── reports/                   # Test reports (generated after test execution)
└── package.json               # Node.js dependencies and scripts
