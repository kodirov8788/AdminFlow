---
name: 06-automated-testing
description: Master of mission-critical SaaS testing - Jest, Vitest, Playwright, and TDD.
importance: 1
---

# 🕵️ SKILL: Automated Testing Excellence

> **"A SaaS without tests is a ship with a slow-motion leak."**
> _— The AdminFlow Architecture Doctrine_

## 🎯 The Mission
To ensure that the AdminFlow dashboard and multi-tenant engine achieve **zero-regression** stability through comprehensive, high-fidelity automated test suites. 

## 🏗️ Core Competencies

### 1. The Testing Stack (SaaS Standard)
- **Unit & Logic**: Use **Vitest** for high-speed logic verification (Server Actions, Utils).
- **Component**: Use **React Testing Library** for high-fidelity UI interaction tests.
- **E2E (The Multi-tenant Wall)**: Use **Playwright** to verify cross-tenant isolation and login workflows.

### 2. Multi-tenant Isolation Testing
- **Rule of ID**: Every test case MUST use a fresh `orgId` or `userId`.
- **Wall Check**: Verify that `Org A` cannot delete a project from `Org B` during E2E flows.
- **Session Mocking**: Use Next-Auth's `mockSession` helpers for high-fidelity server-side context simulation.

### 3. Server Action Testing
- **Atomic Rollbacks**: Ensure that tests involving the database use the `test-db` or atomic transaction wrappers.
- **Zod Integrity**: Verify that malformed Form Data is correctly caught and reported by the project/tenant actions.

## 🚀 Operational Workflow (TDD)

1.  **RED**: Define the requirement with a failing test (e.g., `should.not.permit.unauthorized.delete`).
2.  **GREEN**: Implement the minimal logic in the Server Action to pass.
3.  **REFACTOR**: Clean the abstraction while maintaining the green status.

## 🛡️ Best Practices
- **Snapshot No-No**: Avoid large UI snapshots—they are brittle. Favor specific DOM assertions (`toBeInTheDocument`).
- **Parallel Execution**: Leverage Vercel's multi-thread capabilities for CI/CD pipeline efficiency.
- **Database Hygiene**: Always purge test-data in the `afterAll` hook of your integration suites.

---

_This skill is maintained by the AdminFlow Quality Engineering Team. 2026_
