# Contract: Approval

> Output contract for approved implementations from AUDIT agent.

## Description

This contract defines the structure for approval records when AUDIT approves an implementation. It serves as a gate for merging code and triggers documentation updates.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Approval",
  "type": "object",
  "required": ["implementation_ref", "approved", "timestamp"],
  "properties": {
    "implementation_ref": {
      "type": "string",
      "description": "Reference to the approved implementation"
    },
    "approved": {
      "type": "boolean",
      "const": true
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "When the approval was granted"
    },
    "review_ref": {
      "type": "string",
      "description": "Reference to the review report"
    },
    "conditions": {
      "type": "array",
      "description": "Any conditions attached to approval",
      "items": {
        "type": "string"
      }
    },
    "merge_instructions": {
      "type": "object",
      "properties": {
        "target_branch": {
          "type": "string",
          "default": "main"
        },
        "squash": {
          "type": "boolean",
          "default": false
        },
        "delete_branch": {
          "type": "boolean",
          "default": true
        }
      }
    },
    "release_notes": {
      "type": "string",
      "description": "Suggested text for release notes"
    },
    "documentation_needed": {
      "type": "array",
      "description": "Documentation that should be created/updated",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["api", "user_guide", "changelog", "readme"]
          },
          "description": { "type": "string" }
        }
      }
    }
  }
}
```

## Example

```yaml
implementation_ref: "impl/jwt-authentication-2024-01-15"
approved: true
timestamp: "2024-01-16T14:30:00Z"
review_ref: "review/jwt-auth-v2-2024-01-16"
conditions:
  - "Monitor for auth failures in first week after deploy"
merge_instructions:
  target_branch: "main"
  squash: true
  delete_branch: true
release_notes: |
  Added user authentication with JWT tokens. Users can now register,
  login, and access protected resources with session persistence.
documentation_needed:
  - type: api
    description: "Document /api/auth/* endpoints"
  - type: user_guide
    description: "Add authentication section to user guide"
  - type: changelog
    description: "Add entry for v1.2.0"
```

## Producers

- `AUDIT` agent

## Consumers

- CI/CD system (merge trigger)
- `SCRIBE` agent (documentation trigger)
