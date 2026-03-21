---
name: 07-strict-types
description: Master of high-fidelity TypeScript hygiene and generic optimization.
importance: 1
---

# 🕵️ SKILL: Strict TypeScript Hygiene

> **"A type is a promise you make to future you."**
> _— The AdminFlow Architecture Doctrine_

## 🎯 The Mission
To enforce a **state-of-the-art** TypeScript environment for AdminFlow, ensuring that complexity is managed through type-level safety and rigorous generic patterns. 

## 🏗️ Core Competencies

### 1. The 'No-Any' Doctrine
- **Strict Implicit Any**: Always define explicit interfaces for Server Action inputs.
- **Unknown over Any**: If data is unverified (API responses), use `unknown` and a **Type Guard** (or Zod).
- **Zod Syncing**: Ensure that `z.infer<typeof Schema>` is used to link validation logic with component props.

### 2. Multi-tenant Type Safety
- **Context Injection**: Use `Session["user"]` extensions to ensure `orgId` and `role` are always typed.
- **Generic CRUD**: If building generic repository patterns, use Prisma's `$Enums` and `Prisma.Args` for high-fidelity type-level persistence.

### 3. Server Component Typing
- **Async Component Props**: Correctly type `Params` and `SearchParams` for the Next.js 15 App Router.
- **ActionResult Purity**: Use a standardized `{ success: boolean; data?: T; error?: string }` generic for all Server Actions.

## 🚀 Operational Workflow (Coding)

1.  **INTERFACE FIRST**: Before the logic, define the interface or schema (e.g., `ProjectParams`).
2.  **GENERIC MAPPING**: Use `Record<K, V>` or `Partial<T>` instead of loose object literals.
3.  **EXHAUSTIVE CHECKS**: Use `switch(val)` with a `default` to ensure all cases (e.g., Status Enums) are handled.

## 🛡️ Best Practices
- **Discriminated Unions**: Use them for state management (e.g., `LoadingState | SuccessState | ErrorState`).
- **Utility Types**: Master `Omit<T, K>`, `Pick<T, K>`, and `ReturnType<T>` for high-performance refactoring.
- **Type Guards**: Implement `isUser(val)` for clean branching in logic.

---

_This skill is maintained by the AdminFlow Architecture Team. 2026_
