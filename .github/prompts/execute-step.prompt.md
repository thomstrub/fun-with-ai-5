---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute GitHub Issue Step

You are now in **tdd-developer** mode. Follow Test-Driven Development principles while executing the step instructions.

## Task

Execute the instructions from the current GitHub Issue step systematically.

## Issue Context

Issue Number: ${input:issue-number:Enter issue number (leave blank to auto-detect exercise issue)}

## Instructions

### 1. Locate the Exercise Issue

If no issue number was provided:
- Use `gh issue list --state open` to find the exercise issue
- The main exercise issue will have "Exercise:" in the title
- Extract the issue number from the list

If an issue number was provided, use it directly.

### 2. Fetch Issue Content with Comments

Use the gh CLI to get the complete issue with all comments:
```bash
gh issue view <issue-number> --comments
```

The issue format follows this structure:
- Main issue body contains the overview
- Each step is posted as a comment with format "# Step X-Y: Title"
- Steps contain ":keyboard: Activity:" sections with specific tasks

### 3. Identify the Current Step

Parse through the issue comments to find the **latest step** that hasn't been completed yet. Steps are sequential (5-0, 5-1, 5-2, etc.).

Look for the step comment with:
- Step number and title
- :keyboard: Activity: sections
- Success Criteria section

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section in the current step:

**Follow TDD Workflow** (as defined in tdd-developer agent):
- If implementing new features: **Write tests FIRST**, then implement (Red-Green-Refactor)
- If fixing existing tests: Analyze failures, fix code to pass tests, refactor
- Run tests after each change to verify progress
- Keep changes small and incremental

**Testing Constraints** (from project instructions):
- ✅ Use Jest + Supertest for backend testing
- ✅ Use React Testing Library for frontend testing
- ✅ Manual browser testing for UI verification
- ❌ NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ NEVER suggest browser automation tools

**During Execution**:
1. Read the activity instruction carefully
2. Plan the approach using TDD principles
3. Execute step by step
4. Verify each change (run tests, check for errors)
5. Use `.github/memory/scratch/working-notes.md` to track progress
6. Document findings as you work

### 5. Verification

After completing all activities:
- Run all tests: `npm test`
- Run linter: `npm run lint` (note any errors but don't fix them if not part of this step)
- Verify the application runs: `npm run start` (if applicable)

### 6. Stop Before Committing

**CRITICAL**: Do NOT commit or push changes. That's handled by the `/commit-and-push` prompt.

After completing the step:
1. Summarize what was accomplished
2. List any files modified
3. Report test and lint status
4. Inform the user to run `/validate-step` next to check success criteria

## Workflow Notes

- This prompt inherits git and gh CLI knowledge from `.github/copilot-instructions.md`
- Follow the TDD workflow patterns defined in project documentation
- Use the memory system (`.github/memory/`) to track discoveries
- Break complex activities into smaller tasks using the todo tool

## Example Execution Flow

```
1. Fetch issue: gh issue view 1 --comments
2. Parse step instructions from latest comment
3. For each activity:
   - Read requirements
   - Write test (if new feature)
   - Implement minimal code to pass
   - Verify with npm test
   - Refactor and re-verify
4. Final verification: npm test && npm run lint
5. Report completion and instruct user to run /validate-step
```

---

**Remember**: You're in tdd-developer mode. Write tests first, implement minimally, refactor safely. Keep the Red-Green-Refactor cycle tight and systematic.
