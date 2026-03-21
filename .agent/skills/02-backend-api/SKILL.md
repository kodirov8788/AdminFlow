---
name: 02-backend-api
description: Master of backend engineering, robust API design, and production-grade error handling.
---

# ⚙️ Backend & API Excellence

This skill focuses on the core mechanics of a professional backend. It ensures every API route and Server Action is secure, validated, and handles errors with grace.

> [!IMPORTANT]
> **API Rule**: Never trust user input. Every request MUST be validated, and every failure MUST be predictable and informative.

---

## 🎯 Trigger Patterns

- **Keywords**: `api design`, `validation`, `zod`, `error handling`, `server action`, `rest api`, `protected route`, `input validation`, `handling edge cases`.
- **Logic Patterns**: Defining schemas for API input, creating error responses, structuring route handlers.

---

## 🏗️ Backend Engineering Principles

### 1. Robust API Design (REST or RPC)
- **Logical Structure**: Group endpoints by resource and use appropriate HTTP methods (GET, POST, PUT, DELETE).
- **Protected Routes**: Use Auth-middleware or wrapper functions to gate access to sensitive operations early.

### 2. Deep Validation (Zod)
- **Input Validation**: Validate every field in `req.body` and `req.query` using **Zod** or a similar schema library.
- **Edge Cases**: Account for missing data, incorrect types, and boundary values (e.g., negative amounts or empty strings).

### 3. Graceful Error Handling
- **Predictable Failures**: Use custom error classes or structured JSON responses to provide clear messages to the frontend.
- **Security Awareness**: Avoid leaking system-level stack traces to the end user.
- **No Silent Crashes**: Every `try/catch` must result in a clear, logged outcome.

---

## 🔒 Security & Authorization

> [!CAUTION]
> **Enforcement Gap**: Don't rely on UI-level restrictions. Always verify the user's role and identity directly in the API handler before performing mutations.

---

## 🔄 Backend Workflow Checklist

- [ ] **Validation Schema**: Define a Zod schema for every input.
- [ ] **Auth Wrapper**: Protect the route using a standard auth wrapper or middleware.
- [ ] **Response Structure**: Ensure a consistent JSON response format for success and failure.
- [ ] **Scale Ready**: Structure code to be modular, avoiding monolith-style large handlers.

---

## 💡 Pro Tips

> [!TIP]
> Use a shared `errorHandler` middleware/utility to normalize error responses across all your API routes and maintain a professional API contract.
