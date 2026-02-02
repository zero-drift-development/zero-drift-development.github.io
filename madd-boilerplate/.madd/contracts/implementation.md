# Contract: Implementation

> Output contract for code changes produced by DEV agent.

## Description

This contract defines the structure for implementation outputs that DEV produces and AUDIT consumes. It provides context about what was changed and why.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Implementation",
  "type": "object",
  "required": ["summary", "changes", "testing"],
  "properties": {
    "summary": {
      "type": "string",
      "description": "Brief summary of what was implemented"
    },
    "related_request": {
      "type": "string",
      "description": "Reference to the feature-request or bug-report"
    },
    "changes": {
      "type": "array",
      "description": "List of files changed with descriptions",
      "items": {
        "type": "object",
        "required": ["file", "action", "description"],
        "properties": {
          "file": {
            "type": "string",
            "description": "Path to the changed file"
          },
          "action": {
            "type": "string",
            "enum": ["created", "modified", "deleted", "renamed"]
          },
          "description": {
            "type": "string",
            "description": "What was changed in this file"
          }
        }
      }
    },
    "testing": {
      "type": "object",
      "required": ["tests_added", "tests_passed"],
      "properties": {
        "tests_added": {
          "type": "array",
          "items": { "type": "string" }
        },
        "tests_modified": {
          "type": "array",
          "items": { "type": "string" }
        },
        "tests_passed": {
          "type": "boolean"
        },
        "coverage": {
          "type": "number",
          "minimum": 0,
          "maximum": 100
        }
      }
    },
    "breaking_changes": {
      "type": "array",
      "description": "Any breaking changes introduced",
      "items": {
        "type": "object",
        "properties": {
          "description": { "type": "string" },
          "migration": { "type": "string" }
        }
      }
    },
    "dependencies": {
      "type": "object",
      "properties": {
        "added": {
          "type": "array",
          "items": { "type": "string" }
        },
        "removed": {
          "type": "array",
          "items": { "type": "string" }
        },
        "updated": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "notes": {
      "type": "string",
      "description": "Additional notes for reviewers"
    }
  }
}
```

## Example

```yaml
summary: "Implemented JWT authentication with login/logout"
related_request: "feature-request/add-user-authentication"
changes:
  - file: "src/auth/jwt.ts"
    action: created
    description: "JWT token generation and validation utilities"
  - file: "src/api/routes/auth.ts"
    action: created
    description: "Login and logout API endpoints"
  - file: "src/middleware/auth.ts"
    action: created
    description: "Authentication middleware for protected routes"
  - file: "src/api/routes/index.ts"
    action: modified
    description: "Added auth routes to router"
testing:
  tests_added:
    - "tests/auth/jwt.test.ts"
    - "tests/api/auth.test.ts"
  tests_passed: true
  coverage: 85
breaking_changes: []
dependencies:
  added:
    - "jsonwebtoken@9.0.0"
    - "bcrypt@5.1.0"
notes: |
  JWT secret must be set in JWT_SECRET environment variable.
  Token expiry is set to 24 hours by default.
```

## Producers

- `DEV` agent

## Consumers

- `AUDIT` agent
- `SCRIBE` agent
