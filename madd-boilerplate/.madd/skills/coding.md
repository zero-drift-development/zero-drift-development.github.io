# Skill: Coding

> Core development skill for writing clean, maintainable code.

## Description

This skill enables an agent to write production-quality code following project standards and best practices.

## Capabilities

- Write new features from specifications
- Refactor existing code
- Fix bugs and issues
- Implement design patterns appropriately
- Handle errors gracefully

## Guidelines

### Code Quality
- Follow the project's style guide
- Use meaningful variable and function names
- Keep functions small and focused (single responsibility)
- Avoid magic numbers and strings - use constants

### Structure
- Organize code into logical modules
- Separate concerns (data, logic, presentation)
- Use dependency injection where appropriate
- Prefer composition over inheritance

### Best Practices
- Write self-documenting code
- Add comments only for "why", not "what"
- Handle edge cases explicitly
- Fail fast and fail loud

## Anti-patterns to Avoid

- God objects/functions
- Deep nesting (prefer early returns)
- Copy-paste programming
- Premature optimization
- Over-engineering

## Example Usage

```
When implementing a feature:
1. Understand the requirement from the contract
2. Design the solution (data structures, interfaces)
3. Implement incrementally with tests
4. Refactor for clarity
5. Document public interfaces
```

## Related Skills

- `@skill/testing` - Write tests for the code
- `@skill/debugging` - Fix issues in the code
