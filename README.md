# IELTS 7+ House

An advanced IELTS preparation platform featuring full-length Academic & General Reading and Listening mock tests, detailed answer reviews, writing submissions, and score tracking.

---

## 🏗️ Target & Deployment Architecture

IELTS 7+ House uses a modern Jamstack & Edge Serverless architecture powered by **Cloudflare Workers** with **OpenNext** for Next.js 15, backed by a single shared **Firebase** project (`ielts7-48b25`).

```text
                                GITHUB REPOSITORY
                                       │
                        Feature Branch (e.g. feature/reading-engine)
                                       │
                                   Pull Request
                                       │
                                       ▼
                              Canonical Branch (main)
                                       │
                                 Push / Merge
                                       │
                                       ▼
                                GITHUB ACTIONS
                           (.github/workflows/deploy.yml)
                                       │
                                       ▼
                       CLOUDFLARE WORKERS & OPENNEXT
                               (Worker: ielts7)
                                       │
                        ┌──────────────┴──────────────┐
                        │                             │
                        ▼                             ▼
                Cloudflare Worker             Firebase Backend
            https://ielts7.varun...          (Shared Data & Auth)
                 .workers.dev/                 `ielts7-48b25`
```

---

## 📍 Environment & Deployment State

| Parameter | Configuration |
| :--- | :--- |
| **Canonical Branch** | `main` (Transitional: `stage` branch is currently used until renamed to `main`) |
| **Current Live Worker URL** | [https://ielts7.varunsaxena5elc.workers.dev/](https://ielts7.varunsaxena5elc.workers.dev/) |
| **Cloudflare Worker Name** | `ielts7` |
| **Production Custom Domain** | `https://ielts7plushouse.com/` (DNS migration to Cloudflare is managed separately) |
| **Firebase Project ID** | `ielts7-48b25` (Single shared backend) |
| **Automated Deployment Pipeline** | GitHub Actions (`.github/workflows/deploy.yml`) |

---

## 🛠️ Local Development & Build Commands

### Prerequisites
- Node.js 20 LTS
- npm 10+

### Setup & Local Server

```bash
# Clean install dependencies
npm ci

# Start Next.js development server
npm run dev

# Run TypeScript type validation (zero emit)
npx tsc --noEmit

# Standard Next.js production build
npm run build
```

### Cloudflare Worker Commands (OpenNext & Wrangler)

```bash
# Build OpenNext Cloudflare Worker bundle (.open-next/ worker)
npm run build:worker

# Preview local Worker build with Wrangler
npm run preview:worker

# Manually deploy Worker to Cloudflare (requires local Wrangler authentication)
npm run deploy:worker
```

---

## 🌿 Git & Deployment Workflow

### Intended Development Lifecycle

1. **Feature Development**: Create a feature branch off `main` (e.g. `feature/my-feature`).
2. **Pull Request (PR)**: Open a PR against `main` for code review and standard build validation checks.
3. **Merge & Deployment**: Merging the PR into `main` automatically triggers GitHub Actions (`.github/workflows/deploy.yml`).
4. **Cloudflare Worker Deployment**: GitHub Actions compiles the app using OpenNext (`npm run build:worker`) and deploys the bundle to Cloudflare Worker `ielts7`.

> [!NOTE]
> During the transition period before `stage` is renamed to `main`, both `main` and `stage` branches are configured in the workflow trigger. Pushing to feature branches will **NOT** trigger production Cloudflare deployments.

---

## 🗄️ Firebase Backend (`ielts7-48b25`)

Firebase serves as the **single external backend** for data and authentication across all deployment instances.

### Services Used
- **Firebase Authentication**: User identity, guest access tokens, session persistence.
- **Firestore Database**: User attempts, mock test answers, writing essay submissions.
- **Firebase Storage**: Submitted essay documents & attachments.

### Rules & Infrastructure Deployment

- **Single Environment Rule**: There is **NO** separate staging Firebase project or database. Both development, preview, and production instances connect to `ielts7-48b25`.
- **Manual / CLI Deployment**: Infrastructure files (`firestore.rules`, `storage.rules`, `firestore.indexes.json`) can be deployed using the Firebase CLI:
  ```bash
  npm run deploy:firebase
  ```
  *(Requires local `firebase login` or GCP Application Default Credentials / `FIREBASE_TOKEN`).*
- **Application Data Safety**: Application data (Firestore documents, user accounts, storage files) is created exclusively at runtime by user activity and is **NEVER** modified or wiped by CI/CD build scripts.

---

## 🔑 Required GitHub Secrets

To enable automated deployment via GitHub Actions, the following repository secrets must be configured in **GitHub Repo Settings -> Secrets and variables -> Actions**:

| Secret Name | Description | Required For |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token with `Workers: Edit` and `Account Analytics: Read` permissions | Cloudflare Worker deployment |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID string | Cloudflare Worker deployment |
| `FIREBASE_TOKEN` *(Optional)* | Legacy CI token for automated Firebase rules deployment | `.github/workflows/deploy-firebase.yml` |

> [!IMPORTANT]
> Never commit raw secret tokens into source control or configuration files.

---

## 🌐 Production Domain & Vercel Decommissioning

- The legacy Vercel deployment path and Android 8 redirects have been completely removed from application code (`src/middleware.ts` and `src/app/layout.tsx`).
- The production domain **`ielts7plushouse.com`** is currently active and its DNS transition to Cloudflare Workers is handled as a separate administrative step.
- No Vercel deployment dependencies, middleware redirects, or Vercel build scripts exist in the canonical deployment pipeline.

---

## 🔍 Troubleshooting Guide

### 1. Wrangler Authentication Error / Missing Cloudflare Secrets
- **Symptom**: `wrangler deploy` fails in GitHub Actions or locally with `Authentication Error: Invalid API Token` or `Account ID required`.
- **Fix**: Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set in GitHub Repository Secrets. Locally, run `npx wrangler login` or set `CLOUDFLARE_API_TOKEN` in your environment.

### 2. Failed OpenNext Build (`npm run build:worker`)
- **Symptom**: `opennextjs-cloudflare build` fails during page generation or asset bundling.
- **Fix**: Run `npx tsc --noEmit` locally to identify TypeScript errors. Ensure Node.js version is 20 LTS (`node -v`). Clean `.next` and `.open-next` folders before rebuilding.

### 3. Firebase CLI Authentication Error
- **Symptom**: `firebase deploy` fails with `HTTP 401 Unauthorized` or token deprecation warnings.
- **Fix**: Firebase considers `FIREBASE_TOKEN` legacy and recommends Application Default Credentials (ADC) or Workload Identity Federation. For local deployments, run `npx firebase login`.

### 4. Broken Static Assets on Worker Deployment
- **Symptom**: CSS/JS assets return 404 on the Cloudflare Worker URL.
- **Fix**: Ensure `wrangler.jsonc` contains `"assets": { "directory": ".open-next/assets", "binding": "ASSETS" }` and `open-next.config.ts` defines `defineCloudflareConfig()`.

### 5. Cloudflare Worker Runtime Errors
- **Symptom**: Worker returns HTTP 500 error page.
- **Fix**: Run `npx wrangler tail` to stream real-time console logs from the active Cloudflare Worker execution.
