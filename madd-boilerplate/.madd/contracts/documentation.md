# Contract: Documentation

> Output contract for documentation updates from SCRIBE agent.

## Description

This contract defines the structure for documentation outputs that SCRIBE produces. It tracks what documentation was created or updated.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Documentation",
  "type": "object",
  "required": ["trigger_ref", "updates"],
  "properties": {
    "trigger_ref": {
      "type": "string",
      "description": "Reference to what triggered this documentation update"
    },
    "updates": {
      "type": "array",
      "description": "List of documentation changes made",
      "items": {
        "type": "object",
        "required": ["file", "action", "type"],
        "properties": {
          "file": {
            "type": "string",
            "description": "Path to the documentation file"
          },
          "action": {
            "type": "string",
            "enum": ["created", "updated", "deleted"]
          },
          "type": {
            "type": "string",
            "enum": ["api", "guide", "tutorial", "reference", "changelog", "readme"]
          },
          "summary": {
            "type": "string",
            "description": "What was changed"
          },
          "sections_affected": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    },
    "changelog_entry": {
      "type": "object",
      "properties": {
        "version": { "type": "string" },
        "date": { "type": "string", "format": "date" },
        "changes": {
          "type": "object",
          "properties": {
            "added": { "type": "array", "items": { "type": "string" } },
            "changed": { "type": "array", "items": { "type": "string" } },
            "deprecated": { "type": "array", "items": { "type": "string" } },
            "removed": { "type": "array", "items": { "type": "string" } },
            "fixed": { "type": "array", "items": { "type": "string" } },
            "security": { "type": "array", "items": { "type": "string" } }
          }
        }
      }
    },
    "api_docs": {
      "type": "array",
      "description": "API documentation updates",
      "items": {
        "type": "object",
        "properties": {
          "endpoint": { "type": "string" },
          "method": { "type": "string" },
          "description": { "type": "string" },
          "documented": { "type": "boolean" }
        }
      }
    },
    "review_needed": {
      "type": "boolean",
      "description": "Whether human review is recommended"
    },
    "notes": {
      "type": "string",
      "description": "Additional notes about the documentation"
    }
  }
}
```

## Example

```yaml
trigger_ref: "approval/jwt-auth-2024-01-16"
updates:
  - file: "docs/api/authentication.md"
    action: created
    type: api
    summary: "Documented all authentication endpoints"
    sections_affected:
      - "POST /api/auth/register"
      - "POST /api/auth/login"
      - "POST /api/auth/logout"
      - "POST /api/auth/refresh"

  - file: "docs/guides/getting-started.md"
    action: updated
    type: guide
    summary: "Added authentication section"
    sections_affected:
      - "Authentication"

  - file: "CHANGELOG.md"
    action: updated
    type: changelog
    summary: "Added v1.2.0 entry"

changelog_entry:
  version: "1.2.0"
  date: "2024-01-16"
  changes:
    added:
      - "User authentication with JWT tokens"
      - "Register, login, and logout functionality"
      - "Protected route middleware"
    security:
      - "Passwords hashed with bcrypt"

api_docs:
  - endpoint: "/api/auth/register"
    method: "POST"
    description: "Register a new user"
    documented: true
  - endpoint: "/api/auth/login"
    method: "POST"
    description: "Authenticate and receive JWT"
    documented: true
  - endpoint: "/api/auth/logout"
    method: "POST"
    description: "Invalidate current session"
    documented: true

review_needed: false
notes: "All documentation follows existing style. No human review needed."
```

## Producers

- `SCRIBE` agent

## Consumers

- Documentation site builder
- Release process
