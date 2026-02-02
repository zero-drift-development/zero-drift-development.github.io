# Skill: Code Review

> Skill for reviewing code quality, correctness, and adherence to standards.

## Description

This skill enables an agent to perform thorough code reviews, identifying issues and providing constructive feedback.

## Capabilities

- Assess code quality and readability
- Verify logic correctness
- Check adherence to coding standards
- Identify potential bugs
- Suggest improvements

## Review Checklist

### Correctness
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled?
- [ ] Are errors handled appropriately?
- [ ] Is the logic sound?

### Quality
- [ ] Is the code readable and understandable?
- [ ] Are names meaningful and consistent?
- [ ] Is there unnecessary complexity?
- [ ] Is there code duplication?

### Standards
- [ ] Does it follow project style guide?
- [ ] Is it consistent with existing code?
- [ ] Are comments appropriate (not excessive)?
- [ ] Is documentation updated?

### Testing
- [ ] Are there adequate tests?
- [ ] Do tests cover edge cases?
- [ ] Are tests readable and maintainable?

## Feedback Guidelines

### Do
- Be specific about issues
- Explain why something is a problem
- Suggest alternatives
- Acknowledge good code
- Use "we" instead of "you"

### Don't
- Be vague ("this is bad")
- Be condescending
- Nitpick on style if not important
- Block for personal preferences
- Rewrite the whole thing

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| Blocker | Security/correctness issue | Must fix |
| Major | Significant quality issue | Should fix |
| Minor | Style/preference | Consider fixing |
| Nitpick | Tiny improvement | Optional |

## Related Skills

- `@skill/security-check` - Security-focused review
- `@skill/performance-review` - Performance-focused review
