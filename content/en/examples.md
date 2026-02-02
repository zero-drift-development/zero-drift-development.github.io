---
title: "Case Studies"
description: "Concrete examples of applying MADD in real conditions. What worked, what failed, lessons learned."
layout: "examples"
---

## Multi-Tenant Platform in 2 Days

<div class="case-study-meta" style="background: var(--color-bg-card); border: 1px solid var(--color-border); padding: var(--space-lg); margin-bottom: var(--space-lg);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md);">
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Duration</span>
      <p style="color: var(--color-accent); margin: 0; font-weight: 600;">2 days</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Classic Estimate</span>
      <p style="color: var(--color-text-secondary); margin: 0;">~12 months</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Agents Used</span>
      <p style="margin: 0;">Gemini, Opus, GPT</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Status</span>
      <p style="color: var(--color-accent); margin: 0;">In Production</p>
    </div>
  </div>
</div>

### Context

A complete multi-tenant SaaS platform: authentication, organization management, data isolation, billing, admin dashboard.

With a classic team and Scrum: planning, sprints, code reviews, QA... realistic estimate of 10-14 months.

### The MADD Approach

<div class="not-table">
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Spec Agent (Gemini)</span>
    <span class="not-row__right">Roadmap, Intention Documents, foundation prioritization</span>
  </div>
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Dev Agent (Opus)</span>
    <span class="not-row__right">Contract-guided implementation</span>
  </div>
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Audit Agent (GPT)</span>
    <span class="not-row__right">Due diligence on each delivery</span>
  </div>
</div>

### What Made the Difference

1. **Foundations first** — Multi-tenant isolation was implemented before any feature. No "we'll see later".
2. **Executable contracts** — Every requirement had tests. The Dev Agent couldn't "cheat".
3. **Independent audit** — GPT detected 3 security flaws that the Dev Agent had missed.
4. **No hidden debt** — The retro-spec documented 12 technical limitations from the start.

### Frictions Encountered

- Gemini had outdated knowledge about Next.js 14 → Delta skills needed
- Opus tended to over-engineer → Explicit constraints in the Development Skill
- The Scribe was initially the Dev Agent itself → Bias detected, separation enforced

### Measurable Results

- **Time**: 2 days vs 12 months estimated (x180)
- **Production bugs**: 2 minor in 3 weeks
- **Technical debt**: 12 items identified and documented (vs discovered along the way)
- **Test coverage**: 78% (vs target 70%)

## Other Case Studies

<p style="color: var(--color-text-muted);">More case studies are in preparation:</p>

<div class="problem__grid" style="margin-top: var(--space-lg);">
  <article class="problem__card" data-number="02" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Legacy Migration</h3>
    <p>Rewriting a monolithic PHP application to Next.js with MADD. How retro-specs ensured nothing was forgotten.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>

  <article class="problem__card" data-number="03" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Distributed Team</h3>
    <p>Applying MADD in a 5-person team across 3 time zones. Roles, coordination, tools.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>

  <article class="problem__card" data-number="04" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Startup MVP</h3>
    <p>From idea to MVP in 1 week. How MADD enables rapid validation without accumulating debt.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>
</div>

## Share Your Experience

Have you applied MADD on a project? Share your feedback:

- **GitHub Discussions** — For detailed feedback
- **Pull Request** — To contribute a complete case study
- **Issues** — To report friction or propose improvements

Failures are as valuable as successes. What didn't work interests us just as much.
