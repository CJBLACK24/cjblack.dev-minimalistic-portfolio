# 📊 Performance Optimization Guide

This document outlines the performance optimizations implemented and how to measure them.

## 🚀 Implemented Optimizations

### 1. **Image Optimization**

- ✅ Modern formats (AVIF, WebP) for better compression
- ✅ Responsive image sizes for different devices
- ✅ Lazy loading by default
- ✅ Optimized cache TTL

### 2. **Analytics & Monitoring**

- ✅ **Vercel Analytics** - Track visitor behavior and page views
- ✅ **Vercel Speed Insights** - Monitor Core Web Vitals in production

### 3. **Loading States**

- ✅ Skeleton loaders for better perceived performance
- ✅ Loading.tsx for automatic loading UI

### 4. **Build Optimizations**

- ✅ Compression enabled
- ✅ Package import optimization (Tabler Icons, Motion, Three.js)
- ✅ SWC minification (default in Next.js 13+)

---

## 🎯 Running Lighthouse Performance Tests

### Method 1: Chrome DevTools (Recommended)

1. **Open your site** in Chrome

   ```
   http://localhost:3000
   ```

2. **Open DevTools**

   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Or `Cmd+Option+I` (Mac)

3. **Navigate to Lighthouse tab**

   - Click "Lighthouse" in the top tabs
   - If not visible, click the `>>` icon and select Lighthouse

4. **Configure test**

   - Mode: **Navigation**
   - Device: **Desktop** or **Mobile**
   - Categories: ✅ All (Performance, Accessibility, Best Practices, SEO)

5. **Run test**

   - Click **"Analyze page load"**
   - Wait for results (30-60 seconds)

6. **Save screenshot**
   - Click the "Download report" icon
   - Or take a screenshot: `Win+Shift+S` (Windows) or `Cmd+Shift+4` (Mac)

### Method 2: Command Line (CI/CD)

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run test (start dev server first with 'npm run dev')
lighthouse http://localhost:3000 --view --output=html

# Or for production build
npm run build
npm run start
lighthouse http://localhost:3000 --view --output=html --output-path=./lighthouse-report.html
```

### Method 3: Online (PageSpeed Insights)

1. Deploy to production (Vercel)
2. Visit [PageSpeed Insights](https://pagespeed.web.dev/)
3. Enter your URL: `https://your-site.vercel.app`
4. Click **"Analyze"**

---

## 🎯 Target Scores

Aim for these scores in production:

| Category           | Target | Excellent |
| ------------------ | ------ | --------- |
| **Performance**    | 90+    | 95+       |
| **Accessibility**  | 90+    | 95+       |
| **Best Practices** | 90+    | 100       |
| **SEO**            | 90+    | 100       |

### Core Web Vitals (Most Important)

| Metric                             | Good    | Needs Improvement | Poor    |
| ---------------------------------- | ------- | ----------------- | ------- |
| **LCP** (Largest Contentful Paint) | ≤ 2.5s  | 2.5s - 4.0s       | > 4.0s  |
| **FID** (First Input Delay)        | ≤ 100ms | 100ms - 300ms     | > 300ms |
| **CLS** (Cumulative Layout Shift)  | ≤ 0.1   | 0.1 - 0.25        | > 0.25  |

---

## 📈 Monitoring in Production

### Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **"Analytics"** tab
4. View:
   - Real User Monitoring (RUM) data
   - Core Web Vitals
   - Page views and unique visitors

### Speed Insights

Real-time performance monitoring is automatically enabled via `<SpeedInsights />` component in `app/layout.tsx`.

---

## 🔍 Common Performance Issues & Fixes

### Issue: Low Performance Score

**Possible Causes:**

- Large images not optimized
- Unused JavaScript
- Render-blocking resources
- No lazy loading

**Fixes:**

1. Use `next/image` instead of `<img>`
2. Enable dynamic imports: `const Component = dynamic(() => import('./Component'))`
3. Remove unused dependencies
4. Use code splitting

### Issue: High CLS (Layout Shift)

**Possible Causes:**

- Images without dimensions
- Fonts loading late
- Dynamic content insertion

**Fixes:**

1. Always specify `width` and `height` on images
2. Use `next/font` for font optimization (already done)
3. Reserve space for dynamic content (use Skeleton loaders)

### Issue: Large Bundle Size

**Fixes:**

```bash
# Analyze bundle
npm run build

# Check bundle analyzer (install first)
npm install -D @next/bundle-analyzer
```

Then update `next.config.ts`:

```typescript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run: `ANALYZE=true npm run build`

---

## ✅ Pre-Deployment Checklist

- [ ] Run Lighthouse test locally
- [ ] All scores above 90
- [ ] No console errors or warnings
- [ ] Images optimized
- [ ] Meta tags configured
- [ ] Analytics working
- [ ] Test on mobile and desktop
- [ ] Test in incognito mode

---

## 📸 Saving Lighthouse Results

### For README

1. Run Lighthouse test
2. Take screenshot of scores
3. Save to `/docs/lighthouse-score.png`
4. Add to README:

```markdown
## Performance Scores

![Lighthouse Score](docs/lighthouse-score.png)
```

---

## 🛠️ Advanced Optimizations (Optional)

### 1. Enable Turbopack (Faster Dev Server)

```bash
npm run dev --turbo
```

### 2. Static Site Generation (SSG)

For pages that don't need real-time data:

```typescript
export const dynamic = "force-static";
```

### 3. Edge Runtime

For API routes:

```typescript
export const runtime = "edge";
```

### 4. Partial Prerendering (Experimental)

In `next.config.ts`:

```typescript
experimental: {
  ppr: true,
}
```

---

## 📚 Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
