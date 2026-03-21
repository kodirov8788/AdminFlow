---
name: 01-saas-architect
description: Master of multi-tenant SaaS architecture, data isolation, and role-based access control (RBAC).
---

# 🏢 SaaS Architect & Multi-Tenancy

This skill ensures that the application is built with professional-grade SaaS principles. It focuses on the **"High Signal"** areas: data isolation, tenant boundaries, and robust authorization.

> [!IMPORTANT]
> **The Golden Rule**: Never perform a database action without an `org_id` filter (or equivalent). Data isolation is the #1 priority.

---

## 🎯 Trigger Patterns

- **Keywords**: `multi-tenant`, `role-based access`, `permission`, `org_id`, `tenant isolation`, `admin vs user`, `data relationship`, `rbac`, `membership`.
- **Logic Patterns**: Querying data by organization, creating new organizations, adding users to teams.

---

## 🏗️ Architectural Foundations

### 1. Multi-Tenant Structure (Org → User → Data)
- **Isolation Strategy**: Every query MUST filter by the current user's `org_id`.
- **No Leaks**: Proactively check for scenarios where a user might access another organization's data.
- **Relationships**: Ensure clean associations between Users, Organizations, and their respective Data (Products, Orders, etc.).

### 2. Role Model (RBAC)
- **Admin vs. User**: Enforce clear access boundaries.
- **Backend Enforcement**: Don't just hide UI elements; check roles in Middleware, Server Actions, and API routes.
- **Member Schema**: Use a `memberships` table (user ↔ org) to handle many-to-many relationships if necessary.

### 3. Data Integrity
- **Relational Integrity**: Use foreign keys and constraints to prevent orphaned data.
- **Tenant Context**: Inject the tenant ID early in the request lifecycle (API or Server Actions).

---

## 🛡️ Security Checkpoint

> [!CAUTION]
> **Credibility Killer**: Forgetting to filter by `org_id` in even one endpoint can expose a user's entire private data to a stranger. Always double-check DELETE and UPDATE operations.

---

## 🔄 SaaS Workflow Protocol

- [ ] **Data Model**: Design a clear relation between `organizations` and all other entities.
- [ ] **Auth Protection**: Ensure all routes are protected and verify the identity + role.
- [ ] **Logical API**: Structure APIs logically by resource within the tenant context.
- [ ] **UI Boundaries**: Reflect permissions in the UI (e.g., disable delete buttons for non-admins).

---

## 💡 Best Practices

> [!TIP]
> Use a shared helper or utility (like `getTenantId()`) to consistently fetch and validate the organization context in every database call.
