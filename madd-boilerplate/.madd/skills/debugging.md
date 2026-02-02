# Skill: Debugging

> Skill for diagnosing and fixing issues in code.

## Description

This skill enables an agent to systematically identify, diagnose, and resolve bugs and issues in the codebase.

## Capabilities

- Reproduce reported issues
- Identify root causes through analysis
- Apply fixes without introducing regressions
- Verify fixes with targeted tests
- Document findings and solutions

## Debugging Process

### 1. Reproduce
- Get exact steps to reproduce
- Identify the environment/conditions
- Create a minimal reproduction case

### 2. Isolate
- Narrow down the problem area
- Use binary search on code/commits
- Check recent changes (git bisect)

### 3. Diagnose
- Read error messages carefully
- Check logs and stack traces
- Add strategic logging/breakpoints
- Form and test hypotheses

### 4. Fix
- Make the smallest change that fixes the issue
- Don't fix unrelated code at the same time
- Consider side effects

### 5. Verify
- Confirm the fix resolves the issue
- Run existing tests
- Add a test for this specific case
- Test related functionality

## Common Bug Categories

| Category | Symptoms | Approach |
|----------|----------|----------|
| Logic | Wrong output | Trace data flow |
| Null/Undefined | Crashes | Check inputs |
| Race condition | Intermittent | Add logging with timestamps |
| Memory | Slow/crash | Profile memory usage |
| Integration | Works alone, fails together | Check interfaces |

## Tools

- Debuggers (breakpoints, step through)
- Logging (structured, with context)
- Profilers (performance issues)
- Git bisect (regression hunting)

## Related Skills

- `@skill/coding` - Implement the fix
- `@skill/testing` - Verify the fix
