# Contract: Bug Report

> Input contract for reporting bugs to be fixed.

## Description

This contract defines the structure for bug reports that the DEV agent consumes. It ensures all necessary information is provided to diagnose and fix the bug.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BugReport",
  "type": "object",
  "required": ["title", "description", "steps_to_reproduce", "expected_behavior", "actual_behavior"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Brief, descriptive title for the bug",
      "minLength": 5,
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the bug"
    },
    "steps_to_reproduce": {
      "type": "array",
      "description": "Step-by-step instructions to reproduce the bug",
      "items": {
        "type": "string"
      },
      "minItems": 1
    },
    "expected_behavior": {
      "type": "string",
      "description": "What should happen"
    },
    "actual_behavior": {
      "type": "string",
      "description": "What actually happens"
    },
    "severity": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"],
      "description": "Impact severity of the bug"
    },
    "environment": {
      "type": "object",
      "properties": {
        "os": { "type": "string" },
        "browser": { "type": "string" },
        "version": { "type": "string" },
        "node_version": { "type": "string" }
      }
    },
    "logs": {
      "type": "string",
      "description": "Relevant error logs or stack traces"
    },
    "screenshots": {
      "type": "array",
      "description": "Paths to screenshots showing the issue",
      "items": {
        "type": "string"
      }
    },
    "workaround": {
      "type": "string",
      "description": "Temporary workaround if known"
    }
  }
}
```

## Example

```yaml
title: "Login fails silently with valid credentials"
description: |
  Users are unable to login even with correct credentials.
  The form submits but nothing happens - no error message, no redirect.
steps_to_reproduce:
  - Go to /login page
  - Enter valid email: test@example.com
  - Enter valid password: correctpassword
  - Click "Login" button
  - Observe nothing happens
expected_behavior: |
  User should be logged in and redirected to dashboard
actual_behavior: |
  Form submits, button shows loading briefly, then returns to normal state.
  No error message displayed. User remains on login page.
severity: critical
environment:
  os: "macOS 14.0"
  browser: "Chrome 120"
  version: "1.2.3"
  node_version: "20.10.0"
logs: |
  [API] POST /api/auth/login 200 OK
  [Console] Uncaught TypeError: Cannot read property 'token' of undefined
workaround: |
  Refreshing the page after clicking login sometimes works
```

## Producers

- User (manual input)
- Error tracking systems
- QA team

## Consumers

- `DEV` agent
