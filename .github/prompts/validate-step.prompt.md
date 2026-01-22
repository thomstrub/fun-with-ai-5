---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Success Criteria

You are now in **code-reviewer** mode. Review the workspace systematically to verify all success criteria are met.

## Task

Validate that all success criteria for the specified step have been completed.

## Required Information

Step Number: ${input:step-number:Enter the step number (e.g., 5-0, 5-1, 5-2)}

## Instructions

### 1. Locate the Exercise Issue

Use gh CLI to find the main exercise issue:
```bash
gh issue list --state open
```

The main exercise issue will have "Exercise:" in the title. Extract the issue number.

### 2. Fetch Issue with Comments

Get the complete issue content including all step comments:
```bash
gh issue view <issue-number> --comments
```

### 3. Find the Specified Step

Search through the issue comments to find the step matching the provided step number.

The step format is:
```
# Step {step-number}: [Title]

[Description]

:keyboard: Activity: [Instructions]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Extract the **Success Criteria** section for the specified step.

### 4. Validate Each Criterion

For each success criterion, perform the appropriate validation:

#### Test-Related Criteria

**"All tests pass"** or **"Test X passes"**:
```bash
npm test
```
Or for specific test:
```bash
npm test -- --testNamePattern="test name pattern"
```

Check output to confirm all tests pass.

#### Lint-Related Criteria

**"No ESLint errors"** or **"Clean lint output"**:
```bash
npm run lint
```

Check that exit code is 0 and no errors are reported.

#### Implementation Criteria

**"Endpoint returns correct status"** or **"Component renders correctly"**:
- Read the relevant source files
- Verify implementation matches requirements
- Cross-reference with tests to confirm behavior

#### Application Runtime Criteria

**"Application starts without errors"**:
```bash
npm run start
```

Verify no errors in startup and application runs successfully.

#### File/Code Criteria

**"File X contains Y"** or **"Function Z is implemented"**:
- Use search tools to locate the file/function
- Read the code to verify implementation
- Check against the requirement description

### 5. Generate Validation Report

Create a structured report with:

**✅ Completed Criteria** (Green checkmark):
- List each criterion that passes validation
- Brief confirmation of how it was verified

**❌ Incomplete Criteria** (Red X):
- List each criterion that fails validation
- Specific details about what's missing or wrong
- Actionable guidance on how to fix it

**⚠️ Warnings**:
- Any issues that don't block progress but should be noted
- Recommendations for improvement

### 6. Provide Next Steps

Based on validation results:

**If ALL criteria met**:
- Congratulate the user on completing the step
- Suggest running `/commit-and-push` to save progress
- Indicate the next step number to tackle

**If criteria NOT met**:
- Provide clear guidance on what needs to be fixed
- Suggest which agent to use (tdd-developer for code, code-reviewer for quality)
- Offer to help fix specific issues

## Validation Checklist Template

```markdown
## Step ${step-number} Validation Report

### ✅ Completed Criteria
- [x] Criterion 1: Brief verification note
- [x] Criterion 2: Brief verification note

### ❌ Incomplete Criteria
- [ ] Criterion 3: Specific issue and fix guidance
- [ ] Criterion 4: Specific issue and fix guidance

### ⚠️ Warnings
- Note about potential issues or recommendations

### Summary
- X of Y criteria met
- [Overall status: PASS/FAIL]

### Next Steps
[Guidance based on results]
```

## Example Validation Flow

```
Step: 5-1

1. Fetch issue: gh issue view 1 --comments
2. Parse step 5-1 from comments
3. Extract success criteria:
   - [ ] POST /api/todos endpoint implemented
   - [ ] POST tests pass
   - [ ] Returns 201 status with created todo
   
4. Validate each:
   - Check app.js for POST endpoint ✅
   - Run npm test -- --testNamePattern="POST" ✅
   - Verify test expectations in test file ✅
   
5. Generate report:
   ✅ All 3 criteria met
   
6. Recommend:
   "All criteria met! Run /commit-and-push to save your progress."
```

## Special Validation Cases

### Testing Scope Validation

If criteria mention testing:
- Verify tests use Jest/Supertest (backend) or React Testing Library (frontend)
- Confirm NO e2e frameworks (Playwright, Cypress, Selenium) are mentioned or installed
- Flag any violation of testing scope constraints

### Code Quality Validation

When validating lint criteria:
- Run `npm run lint` for full check
- Categorize any remaining errors by type
- Provide systematic fix guidance following code-reviewer patterns

### TDD Workflow Validation

When validating implementation:
- Check if tests exist for the feature
- Verify tests were written before implementation (ideal TDD)
- Note if implementation lacks test coverage

---

**Remember**: You're in code-reviewer mode. Be systematic, thorough, and constructive. Provide actionable guidance for any incomplete criteria.
