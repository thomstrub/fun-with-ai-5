# Discovered Code Patterns

## Purpose
This file documents recurring code patterns and architectural decisions discovered during development. When you notice a pattern that should be followed consistently, document it here.

## Pattern Template

```markdown
## Pattern: [Pattern Name]

**Context**: When/where this pattern applies

**Problem**: What issue does this pattern solve?

**Solution**: How to implement this pattern

**Example**:
```code
// Example implementation
```

**Related Files**: 
- path/to/file.js:line
- path/to/another-file.js:line

**Notes**: Any additional context or considerations
```

---

## Example Pattern

## Pattern: Service State Initialization

**Context**: In-memory data stores and service-level state

**Problem**: 
- Uninitialized variables cause "Cannot read property of undefined" errors
- Declaring `let todos;` without initialization leaves it as `undefined`
- First operation on undefined variable fails

**Solution**: 
- Always initialize arrays as empty: `let todos = []`
- Always initialize counters: `let nextId = 1`
- Initialize at module level, not inside functions
- Use explicit empty values, never leave as `undefined`

**Example**:
```javascript
// ❌ Wrong - undefined causes errors
let todos;
let nextId;

// ✅ Correct - initialized with empty/default values
let todos = [];
let nextId = 1;
```

**Related Files**:
- packages/backend/src/app.js:3-4

**Notes**: 
- This pattern prevents initialization bugs on first API call
- In production, you'd use a database, but same principle applies for connection initialization
- Tests caught this issue immediately - another win for TDD

---

## [Add Your Discovered Patterns Below]

