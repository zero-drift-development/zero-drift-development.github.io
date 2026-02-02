# Contract: Review Report

> Output contract for code review findings from AUDIT agent.

## Description

This contract defines the structure for review reports that AUDIT produces. It contains findings, recommendations, and the overall assessment.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ReviewReport",
  "type": "object",
  "required": ["implementation_ref", "verdict", "findings"],
  "properties": {
    "implementation_ref": {
      "type": "string",
      "description": "Reference to the implementation being reviewed"
    },
    "verdict": {
      "type": "string",
      "enum": ["approved", "changes_requested", "rejected"],
      "description": "Overall review decision"
    },
    "findings": {
      "type": "array",
      "description": "List of issues found during review",
      "items": {
        "type": "object",
        "required": ["severity", "category", "description", "location"],
        "properties": {
          "severity": {
            "type": "string",
            "enum": ["blocker", "major", "minor", "nitpick"]
          },
          "category": {
            "type": "string",
            "enum": ["security", "correctness", "performance", "quality", "testing", "documentation"]
          },
          "description": {
            "type": "string",
            "description": "What the issue is"
          },
          "location": {
            "type": "object",
            "properties": {
              "file": { "type": "string" },
              "line": { "type": "integer" },
              "code": { "type": "string" }
            }
          },
          "suggestion": {
            "type": "string",
            "description": "How to fix the issue"
          }
        }
      }
    },
    "summary": {
      "type": "object",
      "properties": {
        "blockers": { "type": "integer" },
        "major": { "type": "integer" },
        "minor": { "type": "integer" },
        "nitpicks": { "type": "integer" }
      }
    },
    "security_assessment": {
      "type": "object",
      "properties": {
        "passed": { "type": "boolean" },
        "vulnerabilities": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "test_assessment": {
      "type": "object",
      "properties": {
        "adequate_coverage": { "type": "boolean" },
        "missing_tests": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "positive_notes": {
      "type": "array",
      "description": "Things done well worth acknowledging",
      "items": { "type": "string" }
    }
  }
}
```

## Example

```yaml
implementation_ref: "impl/jwt-authentication-2024-01-15"
verdict: changes_requested
findings:
  - severity: blocker
    category: security
    description: "JWT secret is hardcoded in source code"
    location:
      file: "src/auth/jwt.ts"
      line: 5
      code: "const SECRET = 'mysecretkey123'"
    suggestion: "Move to environment variable: process.env.JWT_SECRET"

  - severity: major
    category: correctness
    description: "Token expiry not validated on refresh"
    location:
      file: "src/auth/jwt.ts"
      line: 42
    suggestion: "Add expiry check before issuing refresh token"

  - severity: minor
    category: quality
    description: "Inconsistent error messages"
    location:
      file: "src/api/routes/auth.ts"
      line: 28
    suggestion: "Use consistent error response format"

summary:
  blockers: 1
  major: 1
  minor: 1
  nitpicks: 0

security_assessment:
  passed: false
  vulnerabilities:
    - "Hardcoded secret (CWE-798)"

test_assessment:
  adequate_coverage: true
  missing_tests:
    - "Test for expired token handling"

positive_notes:
  - "Good separation of concerns"
  - "Clear function naming"
  - "Comprehensive happy-path tests"
```

## Producers

- `AUDIT` agent

## Consumers

- `DEV` agent (when changes requested)
- `SCRIBE` agent (for documentation)
