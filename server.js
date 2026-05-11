/**
 * Controlo Total · Extreme Challenge · III Edição
 * Static file server (Express) for deployment on Render.
 *
 * Serves /public as static content. Single-file app — no build step.
 */

const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip everything we send
app.use(compression());

// Security headers (lightweight, no helmet dependency)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Static files from /public — long cache for assets, short for HTML
app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=300'); // 5 min
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
      }
    },
  })
);

// Health check (Render uses this)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ct-extreme-challenge', ts: Date.now() });
});

// SPA-style fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[CT-EXTREME] Listening on port ${PORT}`);
});
