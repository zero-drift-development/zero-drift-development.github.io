# Skill: Security Check

> Skill for identifying security vulnerabilities and ensuring secure coding practices.

## Description

This skill enables an agent to identify security vulnerabilities and ensure code follows security best practices.

## Capabilities

- Identify common vulnerabilities (OWASP Top 10)
- Review authentication/authorization logic
- Check for sensitive data exposure
- Assess input validation
- Review cryptographic usage

## Security Checklist

### Input Validation
- [ ] All user input is validated
- [ ] Input is sanitized before use
- [ ] SQL queries use parameterized statements
- [ ] File paths are validated (no traversal)

### Authentication
- [ ] Passwords are hashed (bcrypt/argon2)
- [ ] Session tokens are secure
- [ ] Multi-factor where appropriate
- [ ] Account lockout after failed attempts

### Authorization
- [ ] Access controls at every entry point
- [ ] Principle of least privilege
- [ ] No horizontal privilege escalation
- [ ] Sensitive operations require re-auth

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] TLS for data in transit
- [ ] No secrets in code/logs
- [ ] PII handled appropriately

### Output Encoding
- [ ] HTML output encoded (XSS prevention)
- [ ] JSON properly escaped
- [ ] Headers set correctly (CSP, etc.)

## OWASP Top 10 Quick Reference

| Vulnerability | Check |
|--------------|-------|
| Injection | Parameterized queries, input validation |
| Broken Auth | Strong passwords, secure sessions |
| Sensitive Data | Encryption, proper storage |
| XXE | Disable external entities |
| Broken Access | Verify permissions everywhere |
| Misconfig | Secure defaults, no debug in prod |
| XSS | Output encoding, CSP |
| Insecure Deserialization | Validate before deserializing |
| Components | Check CVEs, update deps |
| Logging | Log security events, protect logs |

## Severity Ratings

- **Critical**: Remote code execution, auth bypass
- **High**: SQL injection, XSS, data leak
- **Medium**: Information disclosure, weak crypto
- **Low**: Missing headers, verbose errors

## Related Skills

- `@skill/code-review` - General code review
