---
name: 05-production
description: Expert of observability, database modeling, and production-ready deployments.
---

# 🚀 Production Readiness & Observability

This skill focuses on making software reliable, observable, and maintainable. It ensures your database schema is optimized and your application is ready for the real-world.

> [!IMPORTANT]
> **Production Rule**: If it's not logged, it didn't happen. Observability is the difference between an amateur app and a professional system.

---

## 🎯 Trigger Patterns

- **Keywords**: `observability`, `audit log`, `database relations`, `postgres schema`, `deploy to production`, `edge vs serverless`, `logging`, `environment variable`, `migration`.
- **Logic Patterns**: Designing tables, creating logging structures, managing deployment environment configurations.

---

## 🏗️ Core Production Concepts

### 1. Database Design (Relational Modeling)
- **Clean Schema**: Design tables that are normalized and have clear single-responsibilities.
- **Relational Integrity**: Use proper relations (`user ↔ org`, `org ↔ product`, etc.) and indexes for performance.
- **Audit Logs**: Maintain an `audit_logs` table (who did what, and when) to show production awareness.

### 2. Observability & Logging
- **Audit Logs**: Track critical mutations (e.g., role changes, product deletion).
- **Error Messages**: Ensure errors are logged to the console (or a service like Sentry) with enough context to debug.
- **Health Checks**: Implement basic checks to monitor database connection and API availability.

### 3. Vercel / Deployment Strategy
- **Edge vs. Serverless**: Choose Edge for low-latency tasks (auth, redirects) and Serverless for intensive logic (data mutations).
- **Environment Variables**: Use Vercel's managed secrets for API keys and database strings.
- **Zero-Downtime**: Plan migrations and changes to avoid breaking production mid-deployment.

---

## 🔒 Security & Data Safety

> [!CAUTION]
> **Migration Risks**: Never run a destructive database migration without a backup. Use Neon's branching to test changes in isolation first.

---

## 🔄 Production Workflow Checklist

- [ ] **Schema Check**: Is the database normalized? Are all relations correctly defined?
- [ ] **Logging Plan**: Are critical actions being recorded in an audit log?
- [ ] **Deployment Prep**: Are environment variables configured for production?
- [ ] **Edge Logic**: Can any logic (like simple auth checks) be moved to the Edge Middleware for faster response?

---

## 💡 Pro Tips

> [!TIP]
> Add a `created_at` and `updated_at` column to every table. It’s a standard production practice that saves countless hours of debugging later.
