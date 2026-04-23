# Developer Checklist - Framework v2.0.0

## ✅ Setup Checklist

### Initial Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Add IQM credentials to `.env`
- [ ] Run `npm run test:iqm` to verify setup
- [ ] View report with `npm run report`

### IDE Setup
- [ ] Install Playwright Test for VS Code extension
- [ ] Install ESLint extension (optional)
- [ ] Install Prettier extension (optional)
- [ ] Configure editor for JavaScript/ES6

### Git Setup
- [ ] Configure git user: `git config user.name "Your Name"`
- [ ] Configure git email: `git config user.email "your@email.com"`
- [ ] Create feature branch: `git checkout -b feature/test-name`

---

## 📝 Writing Tests Checklist

### Before Writing
- [ ] Read test requirements/user story
- [ ] Review existing similar tests
- [ ] Check Page Object Model for available methods
- [ ] Check custom assertions available
- [ ] Check test data builders available

### Test Structure
- [ ] Test has descriptive name
- [ ] Test is in correct file (or create new one)
- [ ] Test has `test.describe()` block
- [ ] Test has `test.beforeEach()` setup
- [ ] Test has `test.afterEach()` cleanup (if needed)
- [ ] Test follows AAA pattern (Arrange, Act, Assert)

### Using Page Object Model
- [ ] Import `CreativePage` from `./pages/CreativePage.js`
- [ ] Initialize in `beforeEach`: `creativePage = new CreativePage(page)`
- [ ] Use POM methods instead of direct locators
- [ ] Check if method exists before using
- [ ] Add new method to POM if needed

### Using Custom Assertions
- [ ] Import assertions from `./utils/assertions.js`
- [ ] Use custom assertions instead of generic `expect()`
- [ ] Use appropriate assertion for the check
- [ ] Include error message if applicable
- [ ] Add new assertion if needed

### Using Test Data Builders
- [ ] Import builder from `./utils/testData.js`
- [ ] Use builder to create test data
- [ ] Override defaults as needed
- [ ] Use bulk builders for multiple items
- [ ] Add new builder if needed

### Code Quality
- [ ] Code follows project style
- [ ] No hardcoded delays (use proper waits)
- [ ] No console.log() statements (use page.pause() for debugging)
- [ ] No duplicate code (extract to helpers)
- [ ] Proper error handling
- [ ] Comments for complex logic

### Locators
- [ ] Use semantic locators (getByRole, getByLabel)
- [ ] Use .or() chains for resilience
- [ ] Avoid brittle selectors (class names, IDs)
- [ ] Test locators in browser DevTools first
- [ ] Use first() for multiple matches

### Waits
- [ ] Use `page.waitForLoadState('networkidle')`
- [ ] Use `expect(element).toBeVisible()` for visibility
- [ ] Use `page.waitForURL()` for navigation
- [ ] Avoid `page.waitForTimeout()` (use proper waits)
- [ ] Set appropriate timeouts

### Assertions
- [ ] Each test has at least one assertion
- [ ] Assertions are specific (not generic)
- [ ] Assertions check the right thing
- [ ] Error messages are clear
- [ ] Use custom assertions when available

---

## 🧪 Testing Checklist

### Before Running Tests
- [ ] Code is saved
- [ ] No syntax errors
- [ ] Dependencies installed
- [ ] Credentials in .env
- [ ] Browser is closed (if running headed)

### Running Tests
- [ ] Run single test first: `npm run test:iqm -- -g "test name"`
- [ ] Verify test passes locally
- [ ] Run all tests in file: `npm run test:iqm -- tests/iqm-site/file.spec.js`
- [ ] Run all tests: `npm run test:iqm`
- [ ] Check report: `npm run report`

### Debugging Failed Tests
- [ ] Read error message carefully
- [ ] Check test output for clues
- [ ] Run in debug mode: `npm run test:iqm:debug`
- [ ] Run in headed mode: `npm run test:iqm:headed`
- [ ] Run in UI mode: `npm run test:iqm:ui`
- [ ] Take screenshot: `page.screenshot()`
- [ ] Check browser console for errors
- [ ] Verify selectors in DevTools
- [ ] Check if element is visible/enabled
- [ ] Verify test data is correct

### Fixing Flaky Tests
- [ ] Replace hardcoded delays with proper waits
- [ ] Use `waitForLoadState('networkidle')`
- [ ] Use `expect(element).toBeVisible()`
- [ ] Add .or() chains for resilience
- [ ] Increase timeout if needed
- [ ] Check for race conditions
- [ ] Verify element is stable before interaction

---

## 📋 Code Review Checklist

### Before Submitting PR
- [ ] All tests pass locally
- [ ] No console.log() statements
- [ ] No hardcoded delays
- [ ] Code follows project style
- [ ] Comments are clear and helpful
- [ ] No duplicate code
- [ ] Proper error handling
- [ ] Descriptive commit messages

### PR Description
- [ ] Clear title (under 70 characters)
- [ ] Summary of changes
- [ ] Tests added/modified
- [ ] Any breaking changes
- [ ] Screenshots if UI changes
- [ ] Related issues/tickets

### Code Review
- [ ] Code is readable
- [ ] Tests are clear
- [ ] Assertions are appropriate
- [ ] No unnecessary complexity
- [ ] Follows best practices
- [ ] Proper use of POM
- [ ] Proper use of assertions
- [ ] Proper use of test data builders

---

## 🚀 Deployment Checklist

### Before Merging
- [ ] All tests pass in CI
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] Documentation updated
- [ ] CHANGELOG updated

### After Merging
- [ ] Verify CI/CD runs successfully
- [ ] Check test reports
- [ ] Monitor for failures
- [ ] Update team on changes

---

## 📚 Documentation Checklist

### Test File Documentation
- [ ] File has header comment
- [ ] Test descriptions are clear
- [ ] Complex logic has comments
- [ ] Helper functions are documented

### README Updates
- [ ] Update test count if changed
- [ ] Add new test file to structure
- [ ] Update coverage percentage
- [ ] Add new commands if added
- [ ] Update best practices if needed

### Commit Messages
- [ ] Clear and descriptive
- [ ] References issue/ticket
- [ ] Explains what and why
- [ ] Uses present tense

---

## 🔍 Quality Checklist

### Test Quality
- [ ] Test is independent
- [ ] Test is repeatable
- [ ] Test is fast (< 30 seconds)
- [ ] Test is reliable (not flaky)
- [ ] Test is maintainable
- [ ] Test is readable

### Code Quality
- [ ] No code duplication
- [ ] Proper error handling
- [ ] Proper logging
- [ ] Proper comments
- [ ] Follows conventions
- [ ] No technical debt

### Performance
- [ ] Tests run in reasonable time
- [ ] No unnecessary waits
- [ ] Parallel execution works
- [ ] CI/CD completes in time

---

## 🛠️ Maintenance Checklist

### Regular Tasks
- [ ] Review failing tests
- [ ] Update selectors if UI changes
- [ ] Update test data if app changes
- [ ] Review and fix flaky tests
- [ ] Update dependencies monthly
- [ ] Review test coverage

### Monthly
- [ ] Run full test suite
- [ ] Review test reports
- [ ] Update documentation
- [ ] Check for deprecated features
- [ ] Plan new tests

### Quarterly
- [ ] Review test strategy
- [ ] Assess coverage gaps
- [ ] Plan improvements
- [ ] Update best practices
- [ ] Team training/review

---

## 🎓 Learning Checklist

### Getting Started
- [ ] Read `QUICK_START_TESTING.md`
- [ ] Read `tests/iqm-site/README.md`
- [ ] Review `QUICK_REFERENCE.md`
- [ ] Run existing tests
- [ ] Review example test file

### Understanding Architecture
- [ ] Understand Page Object Model
- [ ] Understand custom assertions
- [ ] Understand test data builders
- [ ] Understand authentication fixture
- [ ] Understand CI/CD workflow

### Writing Tests
- [ ] Write first test
- [ ] Write test with POM
- [ ] Write test with assertions
- [ ] Write test with test data
- [ ] Debug failing test

### Advanced Topics
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Integration testing
- [ ] CI/CD configuration
- [ ] Test reporting

---

## 🐛 Troubleshooting Checklist

### Tests Not Running
- [ ] Dependencies installed: `npm install`
- [ ] Credentials in .env
- [ ] Correct Node version (18+)
- [ ] Playwright browsers installed
- [ ] No syntax errors

### Tests Failing
- [ ] Check error message
- [ ] Run in debug mode
- [ ] Check selectors in DevTools
- [ ] Verify test data
- [ ] Check for timing issues

### CI/CD Issues
- [ ] Secrets configured in GitHub
- [ ] Workflow file is valid
- [ ] Dependencies install correctly
- [ ] Tests pass locally
- [ ] Check CI logs

### Performance Issues
- [ ] Reduce number of workers
- [ ] Increase timeout
- [ ] Check for network issues
- [ ] Profile test execution
- [ ] Optimize selectors

---

## 📊 Metrics Checklist

### Test Coverage
- [ ] Track test count
- [ ] Track coverage percentage
- [ ] Track pass rate
- [ ] Track execution time
- [ ] Track flaky tests

### Quality Metrics
- [ ] Code review time
- [ ] Bug detection rate
- [ ] Test maintenance time
- [ ] Developer productivity
- [ ] Test reliability

---

## 🎯 Goals Checklist

### Short Term (1-2 weeks)
- [ ] Setup complete
- [ ] First test written
- [ ] CI/CD working
- [ ] Team trained

### Medium Term (1-2 months)
- [ ] 50+ tests written
- [ ] 50% coverage achieved
- [ ] All team members contributing
- [ ] CI/CD fully integrated

### Long Term (3-6 months)
- [ ] 150+ tests written
- [ ] 80-90% coverage achieved
- [ ] Automated reporting
- [ ] Performance monitoring

---

## ✨ Best Practices Reminder

1. **Use Page Object Model** - Always
2. **Use Custom Assertions** - When available
3. **Use Test Data Builders** - For consistency
4. **Follow AAA Pattern** - Arrange, Act, Assert
5. **Use Semantic Locators** - More resilient
6. **Use .or() Chains** - Fallback selectors
7. **Keep Tests Independent** - No dependencies
8. **Use Descriptive Names** - Clear intent
9. **Proper Waits** - Not hardcoded delays
10. **Clean Code** - Readable and maintainable

---

## 📞 Quick Links

- **Quick Start:** `QUICK_START_TESTING.md`
- **Full Guide:** `tests/iqm-site/README.md`
- **Quick Reference:** `QUICK_REFERENCE.md`
- **Implementation:** `IMPLEMENTATION_SUMMARY.md`
- **Playwright Docs:** https://playwright.dev
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Framework Version:** 2.0.0
**Last Updated:** April 23, 2026
**Status:** ✅ Ready to Use

Print this checklist and keep it handy while developing! ✅
