# Contract: Feature Request

> Input contract for requesting new features.

## Description

This contract defines the structure for feature requests that the DEV agent consumes. It ensures all necessary information is provided to implement a feature correctly.

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "FeatureRequest",
  "type": "object",
  "required": ["title", "description", "acceptance_criteria"],
  "properties": {
    "title": {
      "type": "string",
      "description": "Brief, descriptive title for the feature",
      "minLength": 5,
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "description": "Detailed description of what the feature should do"
    },
    "acceptance_criteria": {
      "type": "array",
      "description": "List of criteria that must be met for the feature to be complete",
      "items": {
        "type": "string"
      },
      "minItems": 1
    },
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"],
      "default": "medium"
    },
    "affected_areas": {
      "type": "array",
      "description": "Parts of the codebase that will be affected",
      "items": {
        "type": "string"
      }
    },
    "dependencies": {
      "type": "array",
      "description": "Other features or tasks this depends on",
      "items": {
        "type": "string"
      }
    },
    "notes": {
      "type": "string",
      "description": "Additional context or implementation hints"
    }
  }
}
```

## Example

```yaml
title: "Add user authentication"
description: |
  Implement user authentication using JWT tokens. Users should be able to
  register, login, and logout. Sessions should persist across browser restarts.
acceptance_criteria:
  - Users can register with email and password
  - Users can login and receive a JWT token
  - Protected routes require valid JWT
  - Users can logout (token invalidation)
  - Passwords are hashed using bcrypt
priority: high
affected_areas:
  - src/auth/
  - src/api/routes/
  - src/middleware/
dependencies:
  - Database setup complete
notes: |
  Consider using refresh tokens for better security.
  JWT secret should be in environment variables.
```

## Producers

- User (manual input)
- Issue tracker integration
- Product management tools

## Consumers

- `DEV` agent
