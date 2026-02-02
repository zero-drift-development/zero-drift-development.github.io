# Skill: Testing

> Skill for writing comprehensive tests to ensure code quality.

## Description

This skill enables an agent to write effective tests that verify code correctness and prevent regressions.

## Capabilities

- Write unit tests for individual functions/components
- Write integration tests for system interactions
- Write end-to-end tests for user flows
- Generate test data and fixtures
- Measure and improve test coverage

## Guidelines

### Test Structure (AAA Pattern)
```
Arrange - Set up test data and conditions
Act     - Execute the code under test
Assert  - Verify the expected outcome
```

### Naming Convention
```
test_<function>_<scenario>_<expected_result>

Examples:
- test_calculate_total_with_discount_returns_reduced_price
- test_user_login_with_invalid_password_throws_error
```

### What to Test
- Happy path (normal operation)
- Edge cases (boundaries, empty inputs, nulls)
- Error conditions (invalid inputs, failures)
- Security scenarios (injection, overflow)

### What NOT to Test
- External libraries (trust them)
- Simple getters/setters
- Framework code
- Implementation details (test behavior, not implementation)

## Test Types

| Type | Scope | Speed | Isolation |
|------|-------|-------|-----------|
| Unit | Function/Class | Fast | Full |
| Integration | Module/Service | Medium | Partial |
| E2E | Full System | Slow | None |

## Coverage Targets

- Minimum: 70% line coverage
- Target: 80% branch coverage
- Critical paths: 100% coverage

## Related Skills

- `@skill/coding` - Write the code to test
- `@skill/debugging` - Fix failing tests
