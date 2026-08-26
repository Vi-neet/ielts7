# IELTS 7+ House

An advanced IELTS preparation platform featuring full-length Academic & General Reading and Listening mock tests, detailed answer reviews, writing submissions, and score tracking.

---

## 🏗️ Architecture & Deployment Strategy

IELTS 7+ House uses a **Single-Backend Dual-Stage Cloud Architecture** powered by Cloudflare Workers and OpenNext.

```text
                                GITHUB REPOSITORY

                        Feature Branch (e.g. feature/reading-engine)
                                       │
                                   Pull Request
                                       │
                                       ▼
                       ┌────────────────────────────────┐
                       │          stage branch          │
                       │   (Future Canonical: main)     │
                       └───────────────┬────────────────┘
                                       │
                              merge PR into stage
                                       │
                                       ▼
                      CLOUDFLARE WORKERS & FIREBASE CI/CD
                             (GitHub Actions Workflow)
                                       │
                        ┌──────────────┴──────────────┐
                        │                             │
                        ▼                             ▼
              Cloudflare Worker               Firebase Infrastructure
              Staging Deployment               Security Rules & Indexes
                        │                             │
                        ▼                             ▼
        https://ielts7.varunsaxena5elc        Firebase Project
                 .workers.dev/                 `ielts7-48b25`
```

---

## 📍 Current Deployment State

| Parameter | Current Configuration |
| :--- | :--- |
| **Active Staging Branch** | `stage` |
| **Staging Live URL** | [https://ielts7.varunsaxena5elc.workers.dev/](https://ielts7.varunsaxena5elc.workers.dev/) |
| **Cloudflare Worker Name** | `ielts7` |
| **Firebase Project ID** | `ielts7-48b25` (Shared single backend) |
| **Automated Pipeline** | GitHub Actions (`.github/workflows/deploy-staging.yml`) |

---

## 🗄️ Firebase Backend Architecture

Firebase is an **external shared backend**, NOT a branch-specific environment.

### Shared Infrastructure (`ielts7-48b25`)
- **Firestore Database**: User documents, test attempts, writing submissions.
- **Firebase Authentication**: User accounts, guest sessions, tokens.
- **Firebase Storage**: Submitted essay documents & files.

### Key Rules
- **NO Staging Database**: There is no separate staging Firebase project. Both `stage` and future `main` use `ielts7-48b25`.
- **Infrastructure vs. Application Data**:
  - **Infrastructure Configuration** (`firestore.rules`, `storage.rules`, `firestore.indexes.json`) is stored in source control and automatically deployed to `ielts7-48b25` on push/merge to canonical deployment branches (`stage` / `main`) if `FIREBASE_TOKEN` is configured.
  - **Application Data** (user accounts, Firestore documents, storage blobs) is **NEVER** modified by build scripts or CI/CD pipelines.

---

## ⚡ What is Automatic vs. Manual

### 🤖 Automatic (Triggered on PR merge / push to `stage` or `main`)
1. **Application Build & Worker Deployment**:
   - GitHub Actions checks out code, runs `npm run build:worker`, and deploys the generated OpenNext bundle to Cloudflare Worker `ielts7`.
2. **Firebase Infrastructure Deployment**:
   - If `FIREBASE_TOKEN` is provided in GitHub Secrets, GitHub Actions deploys `firestore.rules`, `storage.rules`, and `firestore.indexes.json` directly to project `ielts7-48b25`.

### 🛑 What is NOT Automatic
- **Application Data Modifications**: User accounts, attempt logs, and Firestore records are created strictly by end-user runtime activity.
- **Arbitrary Feature Branch Deployments**: Pushing to unmerged feature branches (e.g. `feature/*`) does **NOT** deploy to Cloudflare or update Firebase rules.
- **Production Domain Re-pointing**: Updating `ielts7plushouse.com` DNS remains a deliberate administrative action.

---

## 🚀 Future Architecture Roadmap

1. **Branch Consolidation**:
   - The `stage` branch will be renamed to `main` and become the single canonical development & production branch.
2. **Cloudflare Production Target**:
   - Cloudflare Workers + OpenNext will become the primary production deployment target.
   - The custom domain `ielts7plushouse.com` will be configured to route directly to the Cloudflare Worker.
3. **Vercel Retirement**:
   - Legacy Vercel hosting will be decommissioned once DNS is repointed to Cloudflare.
4. **CI/CD Alignment**:
   - The deployment workflow in `.github/workflows/deploy-staging.yml` already includes `main` in its branch trigger list, ensuring zero downtime or re-configuration during the transition.

---

## 🛠️ Local Development & Build Commands

### Local Development Setup

```bash
# Install dependencies
npm install

# Start local Next.js development server
npm run dev

# Run TypeScript type validation
node node_modules/typescript/bin/tsc --noEmit

# Build local Next.js production app
npm run build
```

### Cloudflare Worker Commands

```bash
# Build OpenNext Cloudflare Worker bundle (.open-next/ worker)
npm run build:worker

# Preview local Worker build with Wrangler
npm run preview:worker

# Manually deploy Worker to Cloudflare Staging
npm run deploy:worker
```

### Firebase Infrastructure Commands

```bash
# Deploy security rules & indexes manually (requires firebase login or FIREBASE_TOKEN)
npm run deploy:firebase
```

---

## 📚 Summary of Command Differences

| Action | Command | Purpose |
| :--- | :--- | :--- |
| **App Code Deployment** | `npm run deploy:worker` | Compiles Next.js app via OpenNext and deploys Worker bundle to Cloudflare |
| **Firebase Infra Deployment** | `npm run deploy:firebase` | Uploads `firestore.rules`, `storage.rules`, & `firestore.indexes.json` to `ielts7-48b25` |
| **Modifying Firebase Data** | *(Runtime Only)* | Executed by application users at runtime via Firebase Client / Admin SDK |
