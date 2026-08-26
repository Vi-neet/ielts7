# IELTS 7+ House

An advanced IELTS preparation platform featuring full-length Academic & General Reading and Listening mock tests, detailed answer reviews, and score tracking.

---

## 🏗️ Architecture & Deployment Strategy

IELTS 7+ House uses a strict **Two-Tier Dual-Cloud Deployment Strategy** separating Staging and Production environments.

```text
                                GITHUB REPOSITORY

                       ┌────────────────────────────────┐
                       │          main branch           │
                       └───────────────┬────────────────┘
                                       │
                                   merge PR
                                       │
                                       ▼
                         VERCEL PRODUCTION DEPLOYMENT
                                       │
                                       ▼
                           https://ielts7plushouse.com/


                       ┌────────────────────────────────┐
                       │          stage branch          │
                       └───────────────┬────────────────┘
                                       │
                              merge PR into stage
                                       │
                                       ▼
                       CLOUDFLARE WORKERS AUTO-DEPLOY
                             (GitHub Actions CI)
                                       │
                                       ▼
               https://ielts7.varunsaxena5elc.workers.dev/
```

### Hosting Environments

| Environment | Hosting Platform | Branch | Live URL | Worker/App Name |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | Vercel | `main` | [ielts7plushouse.com](https://ielts7plushouse.com/) | `ielts7` (Vercel Project) |
| **Staging** | Cloudflare Workers + OpenNext | `stage` | [ielts7.varunsaxena5elc.workers.dev](https://ielts7.varunsaxena5elc.workers.dev/) | `ielts7` (Cloudflare Worker) |

> ⚠️ **IMPORTANT**: Firebase (`ielts7-48b25`) remains shared and completely untouched across environments. Production hosting on Vercel remains active and isolated from Cloudflare Staging.

---

## 🔄 Developer Workflow

1. **Feature Development**: Create a feature branch off `stage` (e.g., `feature/reading-engine-update`).
2. **Staging Deployment**: Create a Pull Request (PR) into `stage`.
   - Once merged into `stage`, GitHub Actions automatically builds the OpenNext bundle (`npm run build:worker`) and deploys the Cloudflare Worker to `https://ielts7.varunsaxena5elc.workers.dev/`.
3. **Staging QA**: Test and verify all features on the Cloudflare Staging environment.
4. **Production Release**: Create a Pull Request from `stage` into `main`.
   - Once merged into `main`, Vercel automatically deploys the updated build to production at `https://ielts7plushouse.com/`.

---

## 🔑 CI/CD GitHub Secrets Configuration

To enable automatic Cloudflare Workers deployment on merge to `stage`, configure the following GitHub Repository Secrets under **Settings > Secrets and variables > Actions**:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with `Edit Workers` permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID.

---

## 🛠️ Local Development & Build Commands

### Prerequisites
- Node.js 20+
- npm

### Development Commands

```bash
# Install dependencies
npm install

# Start local Next.js development server
npm run dev

# Run TypeScript type check
node node_modules/typescript/bin/tsc --noEmit

# Build local Next.js production app
npm run build

# Build OpenNext Cloudflare Worker bundle
npm run build:worker

# Preview local Worker build with Wrangler
npm run preview:worker

# Manually deploy to Cloudflare Worker Staging
npm run deploy:worker
```

---

## ⚡ Tech Stack

- **Framework**: Next.js 15.3.1 (App Router, TypeScript, React 19)
- **Staging Infrastructure**: Cloudflare Workers (`@opennextjs/cloudflare` 1.14.0, `wrangler` 4.126.0)
- **Production Infrastructure**: Vercel
- **Database & Auth**: Firebase Client SDK & Firebase Admin (`ielts7-48b25`)
- **Styling**: Tailwind CSS v4, Lucide React icons, Framer Motion, GSAP
