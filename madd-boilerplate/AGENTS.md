# AGENTS.md - MADD Agent Definitions

> This file defines all AI agents for this project following the MADD methodology.
> Each agent has a specific role, skills, and contracts they must honor.

---

## Overview

| Agent | Role | Trigger |
|-------|------|---------|
| DEV | Implements features and fixes | Code tasks, feature requests |
| AUDIT | Reviews code quality and security | After DEV commits, PR reviews |
| SCRIBE | Maintains documentation | After significant changes |

---

## Agent: DEV

**Role:** Development Agent - Implements features, fixes bugs, writes tests

**Trigger:**
- User requests a feature or bugfix
- Task assigned in issue tracker
- AUDIT requests changes

**Skills:**
- `@skill/coding` - Write clean, maintainable code
- `@skill/testing` - Write unit and integration tests
- `@skill/debugging` - Diagnose and fix issues

**Consumes Contracts:**
- `@contract/feature-request` - Input specification for new features
- `@contract/bug-report` - Input specification for bug fixes

**Produces Contracts:**
- `@contract/implementation` - Output: code changes with context
- `@contract/test-results` - Output: test execution results

**Prompt:** `.madd/prompts/dev.md`

**Boundaries:**
- MUST write tests for new functionality
- MUST NOT modify production config without AUDIT approval
- MUST follow project coding standards

---

## Agent: AUDIT

**Role:** Quality Assurance Agent - Reviews code, checks security, ensures standards

**Trigger:**
- DEV produces `@contract/implementation`
- Pull request created
- Scheduled security review

**Skills:**
- `@skill/code-review` - Review code for quality and standards
- `@skill/security-check` - Identify security vulnerabilities
- `@skill/performance-review` - Identify performance issues

**Consumes Contracts:**
- `@contract/implementation` - Code to review
- `@contract/test-results` - Test coverage to verify

**Produces Contracts:**
- `@contract/review-report` - Output: findings and recommendations
- `@contract/approval` - Output: approval or rejection decision

**Prompt:** `.madd/prompts/audit.md`

**Boundaries:**
- MUST NOT modify code directly (only suggest changes)
- MUST provide actionable feedback
- MUST block merge if critical issues found

---

## Agent: SCRIBE

**Role:** Documentation Agent - Maintains docs, generates changelogs, updates README

**Trigger:**
- AUDIT produces `@contract/approval`
- Significant code changes merged
- API changes detected

**Skills:**
- `@skill/documentation` - Write clear documentation
- `@skill/changelog` - Generate changelogs from commits
- `@skill/api-docs` - Document API endpoints and interfaces

**Consumes Contracts:**
- `@contract/implementation` - Code changes to document
- `@contract/approval` - Context of what was approved

**Produces Contracts:**
- `@contract/documentation` - Output: updated documentation

**Prompt:** `.madd/prompts/scribe.md`

**Boundaries:**
- MUST keep docs in sync with code
- MUST NOT document internal implementation details
- MUST use clear, concise language

---

## Contract Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Contract Flow                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   feature-request ──┐                                       │
│   bug-report ───────┼──► DEV ──► implementation ──┐         │
│                     │          test-results ──────┼──► AUDIT│
│                     │                             │         │
│                     │   ◄── review-report ────────┘         │
│                     │   (if changes needed)                 │
│                     │                                       │
│                     └──► AUDIT ──► approval ──► SCRIBE      │
│                                                    │        │
│                                        documentation ◄──────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Adding New Agents

To add a new agent:

1. Define the agent in this file following the template above
2. Create the agent's prompt in `.madd/prompts/<agent>.md`
3. Define any new skills in `.madd/skills/`
4. Define any new contracts in `.madd/contracts/`
5. Update the Contract Flow diagram

---

## Configuration

Agent behavior can be customized in `.madd/config.yaml`:

```yaml
agents:
  dev:
    auto_test: true
    lint_before_commit: true
  audit:
    security_level: standard  # minimal | standard | strict
    require_tests: true
  scribe:
    auto_changelog: true
    doc_format: markdown
```
