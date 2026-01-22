# Copilot Instructions for TODO Application

## Project Context

This is a full-stack TODO application with the following characteristics:

- **Frontend**: React application with modern hooks and testing
- **Backend**: Express.js API with RESTful endpoints
- **Development Philosophy**: Iterative, feedback-driven development
- **Current Phase**: Backend stabilization and frontend feature completion

The project emphasizes systematic problem-solving, test-driven development, and maintaining code quality throughout the development lifecycle.

## Documentation References

Before making significant changes, consult these documentation files for context:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

These documents provide essential context for understanding the project's structure and conventions.

## Development Principles

Follow these core principles when working on this project:

- **Test-Driven Development**: Use the Red-Green-Refactor cycle for all feature work
- **Incremental Changes**: Make small, testable modifications rather than large rewrites
- **Systematic Debugging**: Use test failures as guides to identify and fix issues
- **Validation Before Commit**: Ensure all tests pass and no lint errors exist before committing

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Testing Tools
- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

### Important Constraints
- **DO NOT** suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- **DO NOT** suggest browser automation tools
- **Reason**: This lab focuses on unit/integration tests without the added complexity of e2e testing

### Testing Approach by Context

**Backend API Changes**:
- Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- Use Supertest for HTTP endpoint testing
- Test all success and error cases

**Frontend Component Features**:
- Write React Testing Library tests FIRST for component behavior
- Implement component to pass tests (RED-GREEN-REFACTOR)
- Follow with manual browser testing for full UI flows

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these established workflows for different types of tasks:

### 1. TDD Workflow (Red-Green-Refactor)
1. Write failing test (RED)
2. Run test to confirm failure
3. Implement minimal code to pass (GREEN)
4. Run test to confirm success
5. Refactor for quality (REFACTOR)
6. Re-run tests to ensure they still pass

### 2. Code Quality Workflow
1. Run lint command
2. Categorize issues (by type or severity)
3. Fix issues systematically
4. Re-validate with lint
5. Confirm all issues resolved

### 3. Integration Workflow
1. Identify the issue or requirement
2. Debug to understand root cause
3. Write/update tests
4. Implement fix or feature
5. Verify end-to-end functionality

## Agent Usage

This project uses specialized agents for specific workflows:

### tdd-developer Agent
Use for:
- Writing tests before implementation
- Following Red-Green-Refactor cycles
- Test-related debugging
- Implementing features with TDD approach

### code-reviewer Agent
Use for:
- Addressing lint errors systematically
- Code quality improvements
- Reviewing changes for best practices
- Refactoring for maintainability

When working in default mode, you have access to all tools and should use the appropriate workflow patterns described above.

## Memory System

This project uses a memory system to track development discoveries and patterns:

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) contains foundational principles and workflows
- **Working Memory**: `.github/memory/` directory contains discoveries and patterns
- **During active development**: Take notes in `.github/memory/scratch/working-notes.md` (not committed)
- **At end of session**: Summarize key findings into `.github/memory/session-notes.md` (committed)
- **Document recurring patterns**: Add to `.github/memory/patterns-discovered.md` (committed)
- **Reference these files**: When providing context-aware suggestions

For detailed guidance on using the memory system, see [.github/memory/README.md](memory/README.md).

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management
```bash
# List open issues
gh issue list --state open

# Get issue details
gh issue view <issue-number>

# Get issue with comments
gh issue view <issue-number> --comments
```

### Exercise Workflow
- The main exercise issue will have "Exercise:" in the title
- Exercise steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked
- Always fetch the latest issue state to see current progress

## Git Workflow

### Conventional Commits
Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without behavior change

Example: `feat: add delete button to todo items`

### Branch Strategy
- **Feature branches**: `feature/<descriptive-name>`
- **Bug fixes**: `fix/<descriptive-name>`
- **Main branch**: Protected, always stable

### Commit and Push Process
1. Stage all changes: `git add .`
2. Commit with conventional format: `git commit -m "feat: description"`
3. Push to correct branch: `git push origin <branch-name>`
4. Ensure all tests pass before pushing

---

*These instructions help maintain consistency and quality across all development work on this project.*
