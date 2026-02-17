# Sahid Romero - Developer Portfolio (Frontend) 🚀

Live Demo: [http://portfolio-sahid-web-2026.s3-website-us-east-1.amazonaws.com](http://portfolio-sahid-web-2026.s3-website-us-east-1.amazonaws.com)

## 📌 Overview
This repository contains the frontend implementation of my personal developer portfolio. It is designed with an extreme focus on web performance (Lighthouse FCP < 0.8s), modern 3D UI/UX, and robust End-to-End (E2E) testing.

## 🛠️ Tech Stack
* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Animations & 3D:** Three.js, Framer Motion, GSAP
* **Testing:** Playwright (E2E)
* **Infrastructure:** Terraform, AWS S3 (Static Website Hosting)

## ⚡ Performance Highlights
* Implemented aggressive code-splitting (`manualChunks`) to separate heavy 3D libraries from the critical rendering path.
* Local variable font hosting (`@fontsource`) to eliminate Layout Shifts and reduce DNS lookup times.
* Achieved near-instant initial loads by isolating main-thread work.

## 🧪 E2E Testing
Automated UI testing is implemented using **Playwright** to ensure critical user journeys (like the Contact Serverless workflow) never break in production.

```bash
# Run tests with UI
npm run test:ui
