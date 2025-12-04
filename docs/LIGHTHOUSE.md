# 🚀 Quick Lighthouse Test

Run these commands to test your site's performance:

## Prerequisites

```bash
npm install -g lighthouse
```

## Run Tests

### 1. Start your dev server

```bash
npm run dev
```

### 2. In a new terminal, run Lighthouse

```bash
# Desktop test with visual report
lighthouse http://localhost:3000 --view --output=html --output-path=./docs/lighthouse-report.html

# Mobile test
lighthouse http://localhost:3000 --view --output=html --output-path=./docs/lighthouse-mobile.html --preset=mobile

# CI/CD mode (JSON output)
lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-results.json --quiet
```

## View Results

The HTML reports will open automatically in your browser, or you can find them in the `/docs` folder.

## Save Screenshots

1. Open the HTML report
2. Take a screenshot of the scores section
3. Save to `/docs/lighthouse-score.png`
4. Add to README

## Target Scores

- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

## Tips for Better Scores

1. **Build for production first** for accurate results:

   ```bash
   npm run build
   npm run start
   # Then run lighthouse on http://localhost:3000
   ```

2. **Test in incognito mode** to avoid browser extensions affecting scores

3. **Run multiple times** and take the average (performance can vary)
