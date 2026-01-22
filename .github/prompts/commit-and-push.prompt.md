---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze the current changes, generate a conventional commit message, and push to the specified feature branch.

## Required Information

Branch Name: ${input:branch-name:Enter the feature branch name (e.g., feature/step-5-1, fix/toggle-bug)}

## Instructions

### 1. Verify Branch Name Provided

If no branch name was provided, **STOP** and ask the user to provide a branch name.

**NEVER commit to main or any other branch** - only use the user-provided branch name.

### 2. Analyze Changes

Use git to see what has changed:
```bash
git status
git diff
```

Review the changes to understand:
- What files were modified
- What functionality was added/changed
- What bugs were fixed

### 3. Generate Conventional Commit Message

Based on the Git Workflow in `.github/copilot-instructions.md`, use conventional commit format:

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks (dependencies, configs)
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without behavior change

**Examples**:
- `feat: implement POST endpoint for todo creation`
- `fix: toggle endpoint now properly toggles completed state`
- `test: add comprehensive tests for DELETE endpoint`
- `chore: remove unused variables and console logs`
- `refactor: extract validation logic to helper function`

**Guidelines**:
- Keep description concise (50-72 characters)
- Use imperative mood ("add" not "added")
- Don't capitalize first letter after colon
- No period at the end
- Be specific about what changed

### 4. Branch Management

**Check if branch exists**:
```bash
git branch --list <branch-name>
```

**If branch does NOT exist**:
```bash
git checkout -b <branch-name>
```

**If branch exists**:
```bash
git checkout <branch-name>
```

**CRITICAL CHECK**: Ensure you're NOT on main:
```bash
git branch --show-current
```
If this shows "main", **STOP** - something went wrong. Do not proceed.

### 5. Stage Changes

Stage all changes:
```bash
git add .
```

Verify what will be committed:
```bash
git status
```

### 6. Commit with Generated Message

```bash
git commit -m "<generated-conventional-commit-message>"
```

### 7. Push to Remote

Push the branch to origin:
```bash
git push origin <branch-name>
```

If this is the first push for this branch:
```bash
git push -u origin <branch-name>
```

### 8. Report Success

After successful push, report:
- Branch name
- Commit message used
- Files changed (summary)
- Next steps (if applicable)

## Safety Checks

Before committing:
- ✅ Verify you're on the correct branch (NOT main)
- ✅ Review git status to ensure expected files are staged
- ✅ Confirm commit message follows conventional format
- ✅ Ensure branch name matches user's input exactly

## Example Workflow

```
User provides branch: feature/step-5-1

1. Analyze changes:
   - Modified: packages/backend/src/app.js
   - Added POST endpoint implementation
   
2. Generate message:
   "feat: implement POST endpoint for todo creation"
   
3. Create/switch to branch:
   git checkout -b feature/step-5-1
   
4. Stage changes:
   git add .
   
5. Commit:
   git commit -m "feat: implement POST endpoint for todo creation"
   
6. Push:
   git push -u origin feature/step-5-1
   
7. Report:
   ✅ Committed and pushed to feature/step-5-1
   📝 Commit message: "feat: implement POST endpoint for todo creation"
   📁 Files changed: packages/backend/src/app.js
```

## Troubleshooting

**If git push fails**:
- Check if you have write permissions
- Ensure you're authenticated with GitHub
- Try `git push -u origin <branch-name>`

**If commit fails**:
- Verify files are staged: `git status`
- Check for pre-commit hooks that might be failing
- Ensure commit message is properly quoted

---

**Remember**: This prompt inherits git knowledge from `.github/copilot-instructions.md`. Always use the branch name provided by the user, never commit to main.
