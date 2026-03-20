---
name: 03-frontend
description: Expert of frontend architecture, UI flow, and data fetching patterns.
---

# 🎨 Frontend Excellence & Architecture

This skill ensures that the frontend is more than just a UI—it's a clean, structured, and performant user interface that reflects professional-grade engineering.

> [!IMPORTANT]
> **Frontend Rule**: A fast, intuitive UI is the most visible sign of a well-engineered app.

---

## 🎯 Trigger Patterns

- **Keywords**: `dashboard layout`, `frontend structure`, `data fetching`, `loading states`, `suspense`, `error boundary`, `ui flow`, `state management`.
- **Logic Patterns**: Combining UI components, handling async data with Next.js Server Components, designing user journeys.

---

## 🏗️ Frontend Architecture Principles

### 1. Page Structure (Dashboard, Settings, etc.)
- **Consistent Layouts**: Use a standard dashboard layout (sidebar, navbar, content area).
- **Logical Flow**: Group related settings and actions intuitively.

### 2. Modern Data Fetching Patterns
- **Server-First**: Prioritize React Server Components for data fetching.
- **Suspense & Streaming**: Use React Suspense boundaries for loading states, ensuring a high-quality user experience.
- **Client Components sparingly**: Only use Client Components for interactive UI elements.

### 3. State Management & Feedback
- **Simple State**: Use built-in React state for basic interactivity and avoid overengineering.
- **Clear Feedback**: Implement loading skeletons and error messages for every data-dependent component.

---

## 🔒 Security & Data Filtering (Frontend)

> [!CAUTION]
> **UI Protection**: Never show admin-only UI elements to a regular user. Filter sensitive content on the frontend even if the backend is also secured.

---

## 🔄 Frontend Workflow Checklist

- [ ] **Dashboard Layout**: Build a consistent, responsive skeleton for the app.
- [ ] **Loading States**: Add skeletons or spinners for all async data.
- [ ] **Error Boundaries**: Handle unreachable APIs or failed requests gracefully.
- [ ] **Clean Logic**: Ensure components are modular and well-structured.

---

## 💡 Pro Tips

> [!TIP]
> Use **Partial Prerendering (PPR)** to deliver a near-instant static shell while streaming in the dynamic components for optimal performance.
