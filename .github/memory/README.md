# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps maintain context across development sessions and enables AI assistants to provide more informed, project-specific guidance.

## Memory Types

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- Foundational principles and workflows
- Project structure and conventions
- Testing philosophy and guidelines
- Committed to git and shared across team

### Working Memory
**Location**: `.github/memory/`
- Development discoveries and patterns
- Session notes and historical learnings
- Active work-in-progress notes
- Mix of committed historical records and ephemeral working notes

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (committed)
├── patterns-discovered.md       # Accumulated code patterns (committed)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session notes (not committed)
```

### File Purposes

#### `session-notes.md` (Committed)
**Purpose**: Document completed development sessions for future reference

**When to update**: At the end of each significant development session

**Content**: 
- What was accomplished
- Key findings and decisions
- Bugs discovered and fixed
- Important context for future work

**Workflow**: At session end, review `scratch/working-notes.md` and summarize key learnings into this file

#### `patterns-discovered.md` (Committed)
**Purpose**: Document recurring code patterns and architectural decisions

**When to update**: When you discover a pattern that should be followed consistently

**Content**:
- Pattern name and context
- Problem it solves
- Implementation details
- Example code
- Related files

**Example use cases**:
- "Service methods always validate input before processing"
- "Error responses follow this specific format"
- "State initialization pattern for in-memory stores"

#### `scratch/working-notes.md` (Not Committed)
**Purpose**: Track thoughts, findings, and decisions during active development

**When to update**: Throughout your current development session

**Content**:
- Current task and approach
- Real-time findings and blockers
- Quick notes and TODOs
- Decision rationale

**Workflow**: Use freely during development. At session end, extract valuable insights into session-notes.md and patterns-discovered.md, then clear or archive this file for next session.

## When to Use Each File

### During TDD Workflow (Red-Green-Refactor)

**In scratch/working-notes.md** (active work):
```markdown
## Current Task
Fix failing test: should create todo with valid title

## Approach
1. Read test expectations
2. Implement minimal code to pass
3. Run test and iterate

## Key Findings
- todos array was undefined - needed initialization
- nextId counter required for unique IDs
- createdAt timestamp format: ISO 8601
```

**In session-notes.md** (at end of session):
```markdown
## Session: Backend Initialization Fix
**Date**: 2026-01-22

### Accomplished
- Fixed todos array initialization
- Added ID counter for unique todo IDs
- All POST endpoint tests passing

### Key Findings
- In-memory storage requires explicit initialization
- ID generation needs counter state
```

**In patterns-discovered.md** (if pattern emerges):
```markdown
## Pattern: Service State Initialization

**Context**: In-memory data stores
**Problem**: Undefined array errors on first operation
**Solution**: Initialize at module level with empty array
**Example**: `let todos = [];`
```

### During Lint Error Resolution

**In scratch/working-notes.md**:
```markdown
## Current Task
Fix ESLint errors in app.js

## Approach
- Run lint to get full error list
- Group by error type
- Fix systematically

## Key Findings
- 3 unused variables from debugging
- 2 console.log statements left in code
- Fixed by removing unused vars, replacing console.log with proper responses
```

**In session-notes.md** (at session end):
```markdown
### Lint Cleanup
- Removed debug variables and console statements
- All ESLint checks passing
- Code follows project standards
```

### During Debugging Workflow

**In scratch/working-notes.md**:
```markdown
## Current Task
Debug: Toggle always sets completed to true

## Key Findings
- Line 45: `todo.completed = true` should be `todo.completed = !todo.completed`
- Missing test for toggle both directions
- Added test to prevent regression

## Decisions Made
- Always write test before fixing bug (Red-Green-Refactor)
- Document line number for future reference
```

**In patterns-discovered.md** (if debugging reveals pattern):
```markdown
## Pattern: Toggle State Management

**Context**: Boolean state toggle operations
**Problem**: Hardcoded `true` doesn't toggle, only sets
**Solution**: Use negation operator `!previous`
**Example**: `todo.completed = !todo.completed`
**Related Files**: packages/backend/src/app.js:45
```

## How AI Reads and Applies Patterns

When you provide context to GitHub Copilot or other AI assistants:

1. **AI reads persistent memory first**: Understanding project principles from `.github/copilot-instructions.md`

2. **AI scans working memory**: Checking `patterns-discovered.md` for established patterns

3. **AI considers recent context**: Reviewing `session-notes.md` for recent decisions

4. **AI suggests consistent solutions**: Applying discovered patterns to new problems

### Example: AI Pattern Application

**Scenario**: You ask AI to implement a new endpoint

**AI process**:
1. Reads `.github/copilot-instructions.md` → Knows to use TDD workflow
2. Reads `patterns-discovered.md` → Sees service initialization pattern
3. Reads `session-notes.md` → Knows recent ID generation approach
4. **Result**: Suggests implementation following established patterns

**Your prompt**:
```
"Implement PUT /api/todos/:id endpoint"
```

**AI response** (informed by memory):
```
"I'll implement this following the TDD workflow. Based on the patterns 
in patterns-discovered.md, I'll:
1. Parse and validate ID (per validation pattern)
2. Find todo in array (per service pattern)
3. Handle not found case (per error handling pattern)
4. Update and return todo

Let's start by reading the test expectations..."
```

## Best Practices

### Do ✅
- **Update scratch/working-notes.md freely** during active work
- **Summarize into session-notes.md** at end of session
- **Document patterns when you see repetition** (2+ occurrences)
- **Reference specific files and line numbers** for traceability
- **Keep notes concise and actionable** - future you will thank you
- **Clear scratch/working-notes.md** at start of new session

### Don't ❌
- **Don't skip session summaries** - they're invaluable later
- **Don't document everything** - focus on insights, not minutiae
- **Don't leave scratch notes uncommitted forever** - summarize and clear
- **Don't duplicate copilot-instructions.md** - that's for principles, this is for discoveries

## Workflow Integration

### Starting a Development Session
1. Review `session-notes.md` to recall recent work
2. Review `patterns-discovered.md` for established patterns
3. Open `scratch/working-notes.md` for active note-taking

### During Development
1. Take quick notes in `scratch/working-notes.md`
2. Document blockers and decisions in real-time
3. Note any emerging patterns

### Ending a Development Session
1. Review `scratch/working-notes.md`
2. Summarize key findings into `session-notes.md`
3. Extract any patterns into `patterns-discovered.md`
4. Clear or archive `scratch/working-notes.md` for next session
5. Commit session-notes.md and patterns-discovered.md

## Memory System Benefits

- **Continuity**: Pick up where you left off, even after breaks
- **Pattern Recognition**: Build institutional knowledge
- **AI Context**: Enable smarter AI suggestions
- **Team Alignment**: Share learnings across developers
- **Historical Record**: Understand why decisions were made

---

**Remember**: The memory system works best when used consistently. A few notes after each session compound into valuable project knowledge over time.
