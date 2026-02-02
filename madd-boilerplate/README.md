# MADD Boilerplate

A ready-to-use template for projects following the **MADD** (Multi-Agent Driven Development) methodology.

## What is MADD?

MADD is a lightweight methodology for orchestrating AI agents in software development. Instead of using a single AI assistant for everything, MADD structures work across specialized agents:

- **DEV** - Implements features and fixes bugs
- **AUDIT** - Reviews code quality and security
- **SCRIBE** - Maintains documentation

Agents communicate through **contracts** - structured data schemas that define inputs and outputs.

## Quick Start

### 1. Copy this template

```bash
# Clone or copy this boilerplate to your project
cp -r madd-boilerplate/* your-project/
```

### 2. Customize AGENTS.md

Edit `AGENTS.md` to match your project's needs:
- Add or remove agents
- Modify skills and boundaries
- Adjust triggers

### 3. Configure settings

Edit `.madd/config.yaml`:
```yaml
project:
  name: "Your Project Name"
  version: "1.0.0"
```

### 4. Start developing

Point your AI assistant to `AGENTS.md` and start working!

## Project Structure

```
your-project/
├── AGENTS.md                 # Agent definitions (the source of truth)
├── .madd/
│   ├── config.yaml          # MADD configuration
│   ├── agents/              # Agent-specific files (if needed)
│   ├── skills/              # Skill definitions
│   │   ├── coding.md
│   │   ├── testing.md
│   │   ├── debugging.md
│   │   ├── code-review.md
│   │   ├── security-check.md
│   │   └── documentation.md
│   ├── contracts/           # Contract schemas
│   │   ├── feature-request.md
│   │   ├── bug-report.md
│   │   ├── implementation.md
│   │   ├── review-report.md
│   │   ├── approval.md
│   │   └── documentation.md
│   └── prompts/             # Agent prompts
│       ├── dev.md
│       ├── audit.md
│       └── scribe.md
├── src/                     # Your source code
├── tests/                   # Your tests
└── docs/                    # Your documentation
```

## Core Concepts

### Agents

Agents are specialized AI roles with defined:
- **Skills** - What they can do
- **Triggers** - When they activate
- **Contracts** - What data they consume and produce
- **Boundaries** - What they must/must not do

### Skills

Skills are reusable capabilities that agents can have. They define how to perform specific tasks like coding, testing, or documentation.

### Contracts

Contracts are structured data schemas that define the interface between agents. They ensure consistent communication and enable validation.

## Workflow

```
1. User creates feature-request or bug-report
         │
         ▼
2. DEV implements and produces implementation + test-results
         │
         ▼
3. AUDIT reviews and produces review-report
         │
         ├── changes_requested → back to DEV
         │
         └── approved → produces approval
                  │
                  ▼
         4. SCRIBE updates documentation
```

## Customization

### Adding a New Agent

1. Add the agent definition to `AGENTS.md`
2. Create the agent's prompt in `.madd/prompts/<agent>.md`
3. Define any new skills in `.madd/skills/`
4. Define any new contracts in `.madd/contracts/`

### Adding a New Skill

1. Create a skill file in `.madd/skills/<skill-name>.md`
2. Reference it in the agent's skills list in `AGENTS.md`

### Adding a New Contract

1. Create a contract file in `.madd/contracts/<contract-name>.md`
2. Define the JSON schema
3. Add examples
4. Reference it in agent definitions

## Best Practices

1. **Keep AGENTS.md as the source of truth** - All agent behavior stems from here
2. **Use contracts for all agent communication** - Structured data prevents ambiguity
3. **Define clear boundaries** - Prevent agents from overstepping
4. **Start simple** - Add complexity only when needed
5. **Iterate** - Refine agent definitions based on experience

## License

MIT

---

Learn more about MADD at [madd.sh](https://madd.sh)
