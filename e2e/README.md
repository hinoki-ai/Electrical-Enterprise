# End-to-End Tests

This directory contains Playwright-based end-to-end tests for the Electrical Enterprise application.

## Setup

The tests are configured to run against the production site by default (`https://quote.aramac.dev`), but can also be run against a local development server.

## Running Tests

### Production Tests (Default)
```bash
# Run all e2e tests against production
npm run test:e2e:prod

# Run with visual browser (headed mode)
npm run test:e2e:headed

# Run with Playwright UI for debugging
npm run test:e2e:ui
```

### Local Development Tests
```bash
# Start your dev server first
npm run dev

# Run tests against localhost (requires BASE_URL env var)
BASE_URL=http://localhost:3000 npm run test:e2e
```

### Debug Mode
```bash
# Run tests in debug mode (step through each action)
npm run test:e2e:debug
```

## Test Structure

- `basic.spec.ts` - Basic functionality tests (homepage, navigation, responsive design)
- `quote-flow.spec.ts` - Quote creation, viewing, and management flow tests
- `calculator.spec.ts` - Advanced calculator functionality tests

## Configuration

Tests are configured in `playwright.config.ts` with:
- Base URL pointing to production site
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile viewport testing
- Parallel test execution
- HTML report generation

## CI/CD Integration

For CI/CD pipelines, use:
```bash
npm run test:e2e:prod
```

The tests will automatically retry failed tests on CI and generate HTML reports.

## Writing New Tests

1. Create new `.spec.ts` files in the `e2e/` directory
2. Use descriptive test names and organize with `test.describe()`
3. Follow the existing patterns for waiting and assertions
4. Test both success and error scenarios
5. Include responsive design testing where relevant

## Troubleshooting

- **Tests failing on production**: Check if the production site is accessible and up-to-date
- **Flaky tests**: Use appropriate wait strategies and retry logic
- **Network issues**: Tests wait for network idle, but may need additional timeouts for slow operations
- **Browser compatibility**: All tests run on multiple browsers to catch compatibility issues
