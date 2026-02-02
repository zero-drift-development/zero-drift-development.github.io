---
title: "Case Studies"
description: "Des exemples concrets d'application de MADD en conditions réelles. Ce qui a marché, ce qui a échoué, les leçons apprises."
layout: "examples"
---

## Plateforme Multi-Tenant en 2 Jours

<div class="case-study-meta" style="background: var(--color-bg-card); border: 1px solid var(--color-border); padding: var(--space-lg); margin-bottom: var(--space-lg);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-md);">
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Durée</span>
      <p style="color: var(--color-accent); margin: 0; font-weight: 600;">2 jours</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Estimation classique</span>
      <p style="color: var(--color-text-secondary); margin: 0;">~12 mois</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Agents utilisés</span>
      <p style="margin: 0;">Gemini, Opus, GPT</p>
    </div>
    <div>
      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Statut</span>
      <p style="color: var(--color-accent); margin: 0;">En production</p>
    </div>
  </div>
</div>

### Le contexte

Une plateforme SaaS multi-tenant complète : authentification, gestion des organisations, isolation des données, facturation, dashboard admin.

Avec une équipe classique et Scrum : planning, sprints, code reviews, QA... estimation réaliste de 10-14 mois.

### L'approche MADD

<div class="not-table">
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Agent Spec (Gemini)</span>
    <span class="not-row__right">Roadmap, Intention Documents, priorisation des fondations</span>
  </div>
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Agent Dev (Opus)</span>
    <span class="not-row__right">Implémentation guidée par les contrats</span>
  </div>
  <div class="not-row">
    <span class="not-row__left" style="text-decoration: none; color: var(--color-accent);">Agent Audit (GPT)</span>
    <span class="not-row__right">Due diligence sur chaque livraison</span>
  </div>
</div>

### Ce qui a fait la différence

1. **Fondations d'abord** — L'isolation multi-tenant a été implémentée avant toute feature. Pas de "on verra plus tard".
2. **Contrats exécutables** — Chaque requirement avait des tests. L'Agent Dev ne pouvait pas "tricher".
3. **Audit indépendant** — GPT a détecté 3 failles de sécurité que l'Agent Dev avait manquées.
4. **Pas de dette cachée** — La rétro-spec a documenté 12 limitations techniques dès le départ.

### Les frictions rencontrées

- Gemini avait des connaissances obsolètes sur Next.js 14 → Skills delta nécessaires
- Opus avait tendance à sur-ingénierer → Contraintes explicites dans le Development Skill
- Le Scribe était initialement l'Agent Dev lui-même → Biais détecté, séparation forcée

### Résultats mesurables

- **Temps** : 2 jours vs 12 mois estimés (x180)
- **Bugs en production** : 2 mineurs en 3 semaines
- **Dette technique** : 12 items identifiés et documentés (vs découverts au fil de l'eau)
- **Couverture de tests** : 78% (vs objectif 70%)

## Autres Case Studies

<p style="color: var(--color-text-muted);">D'autres études de cas sont en préparation :</p>

<div class="problem__grid" style="margin-top: var(--space-lg);">
  <article class="problem__card" data-number="02" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Migration Legacy</h3>
    <p>Réécriture d'une application PHP monolithique vers Next.js avec MADD. Comment les rétro-specs ont permis de ne rien oublier.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>

  <article class="problem__card" data-number="03" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Équipe Distribuée</h3>
    <p>Application de MADD dans une équipe de 5 personnes sur 3 fuseaux horaires. Rôles, coordination, outils.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>

  <article class="problem__card" data-number="04" style="opacity: 0.6;">
    <h3 style="color: var(--color-text-muted);">Startup MVP</h3>
    <p>De l'idée au MVP en 1 semaine. Comment MADD permet de valider rapidement sans accumuler de dette.</p>
    <p style="color: var(--color-accent); font-family: var(--font-mono); font-size: 0.75rem;">COMING SOON</p>
  </article>
</div>

## Partagez votre expérience

Vous avez appliqué MADD sur un projet ? Partagez votre retour d'expérience :

- **GitHub Discussions** — Pour les retours détaillés
- **Pull Request** — Pour contribuer un case study complet
- **Issues** — Pour signaler des frictions ou proposer des améliorations

Les échecs sont aussi précieux que les succès. Ce qui n'a pas marché nous intéresse autant.
