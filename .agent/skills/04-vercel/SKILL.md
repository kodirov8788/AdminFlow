---
name: 04-vercel
description: Deep expertise in the Vercel platform, Next.js evolution (15-16+), and AI Cloud architecture.
---

# 🚀 Vercel Master Skill

Master the Vercel ecosystem, from Framework-Defined Infrastructure (FDI) to the latest **AI Cloud** advancements. This skill encompasses deep knowledge of Next.js 15+, Vercel AI SDK v6, Fluid Compute, and high-performance rendering patterns like Partial Prerendering (PPR).

## 🎯 Trigger Patterns

- **Keywords**: `vercel`, `nextjs`, `isr`, `ppr`, `middleware`, `edge functions`, `ai sdk`, `fluid compute`, `vercel postgres`, `vercel kv`, `vercel blob`, `deploy to vercel`, `v0`, `vercel firewall`.
- **File Patterns**: `vercel.json`, `next.config.js`, `next.config.mjs`, `middleware.ts`, `proxy.ts`, `.vercel/`.

---

## 🏗️ Core Architecture: The AI Cloud (2025-2026)

Vercel has evolved from a frontend host to a complete **AI Cloud** platform. The following components are critical for modern high-scale applications:

### 1. Next.js 15 & 16 Evolution
- **Next.js 15**: Introduced the Rust-powered compiler (30% faster builds), React 19 support, and **Partial Prerendering (PPR)**.
- **Next.js 16 (Current)**: Transitioned from `middleware.ts` to `proxy.ts` to clarify network boundaries. Introduced **Cache Components** as the evolution of PPR, allowing for granular control over static/dynamic segments.
- **Partial Prerendering (PPR)**: The holy grail of rendering. It combines static shells with dynamic islands using React Suspense, enabling <100ms LCP for dynamic pages.

### 2. Fluid Compute & Active CPU Billing
- **Active CPU Billing**: Pay ONLY for the CPU cycles used during a request, not the idle time (ideal for I/O-heavy AI tasks).
- **Extended Timeouts**: Vercel Functions now support up to **300s** execution time by default, enabling deep reasoning for AI agents.
- **Fluid Compute**: Automatically scales resources based on the complexity of the execution, from lightweight API routes to heavy AI processing.

### 3. Vercel AI SDK (v6+)
- **Agentic Abstraction**: Built-in support for multi-step reasoning agents.
- **AI Gateway**: A single endpoint for OpenAI, Anthropic, Mistral, and more, providing smart routing, observability, and fallbacks.
- **Tool Execution Approval**: Native UI components for human-in-the-loop approvals of AI actions.

---

## 💾 Storage & Data Layer

Vercel's managed storage solutions are optimized for the Edge and Serverless:

- **Vercel Postgres**: Serverless SQL based on Neon with branching support.
- **Vercel KV**: Low-latency Redis-compatible key-value store (Upstash powered).
- **Vercel Blob**: S3-compatible object storage with a simple `put()` API.
- **Edge Config**: Ultra-low latency (<10ms) configuration store for feature flags and redirects, updated globally in milliseconds.

---

## 🛡️ Security & Reliability

> [!IMPORTANT]
> Always implement **Vercel Firewall** rules for production apps. Use custom rules to block malicious user agents and implement rate-limiting at the platform level.

- **BotID**: Invisible CAPTCHA system that distinguishes humans from bots without user friction.
- **Vercel Sandbox**: firecracker-powered microVMs that spin up in milliseconds to execute untrusted code safely.
- **Vercel Firewall**: Custom logging, blocking, and rate-limiting rules.
- **Rolling Releases**: Native support for canary deployments with real-time observability and instant rollbacks.

---

## 🛠️ Advanced Patterns & Best Practices

### The "Perfect" Rendering Strategy
1. **Static First**: Use `generateStaticParams` for predictable content.
2. **ISR for Freshness**: Implement Incremental Static Regeneration with on-demand revalidation (`res.revalidate()`).
3. **PPR for Dynamic Depth**: Wrap dynamic components in `<Suspense>` to take advantage of Partial Prerendering.

### Middleware vs. Proxy
- Use `proxy.ts` (Next.js 16+) for request interception, geo-routing, and authentication redirects.
- **Note**: Decouple security. Perform final authorization checks in the data layer (Server Actions/Components) rather than relying solely on Middleware.

### AI Agent Workflow
- Use **Vercel Queues** (Feb 2026 update) for long-running agent tasks.
- Implement **Vercel Agent** for automated production anomaly detection and AI-based code reviews.

---

## 📝 Implementation Checklist

- [ ] **Next.js Version**: Ensure `next@latest` (v15 or v16).
- [ ] **PPR Enabled**: Check `next.config.js` for `experimental: { ppr: true }`.
- [ ] **Infrastructure**: Use **Fluid Compute** for intensive workloads.
- [ ] **Monitoring**: Enable **Speed Insights** and **Web Analytics**.
- [ ] **Security**: Configure **Vercel Firewall** and **BotID**.
- [ ] **Toolbar**: Utilize the **Vercel Toolbar** for accessibility audits and Open Graph previews.

---

## 💡 Pro Tips

> [!TIP]
> Use **v0.dev** to generate UI prototypes and directly sync them with your Vercel project for rapid iteration.

> [!CAUTION]
> When using Middleware, avoid large dependencies to stay within the **1MB-4MB** bundle size limit for Edge execution.

---

**Documentation References**:
- [Vercel Ship 2025 Keynote](https://vercel.com/ship)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK Docs](https://sdk.vercel.com)
- [Vercel Infrastructure Guide](https://vercel.com/docs/infrastructure)