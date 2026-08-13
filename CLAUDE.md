# Règles du projet — La Cabine Podcasts

## Google Analytics — OBLIGATOIRE sur chaque nouvelle page

Toute nouvelle page `.astro` doit inclure le composant GA dans son `<head>` :

```astro
---
import GoogleAnalytics from '../components/GoogleAnalytics.astro';
---
<head>
  <!-- ... autres balises meta ... -->
  <GoogleAnalytics />
</head>
```

Le composant est dans `src/components/GoogleAnalytics.astro`.  
Il charge GA4 (`G-PK9JHLK9YF`) uniquement si l'utilisateur a accepté les cookies (`localStorage['lcp-consent'] === 'accepted'`).

Le cookie banner (déjà présent sur toutes les pages) doit aussi déclencher GA au clic "Accepter" :

```js
document.getElementById('cookieAccept')?.addEventListener('click', () => {
  localStorage.setItem('lcp-consent', 'accepted');
  // charger GA
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-PK9JHLK9YF';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date()); gtag('config', 'G-PK9JHLK9YF');
});
```

## Sitemap — OBLIGATOIRE pour chaque nouvelle page

Toute nouvelle page publique (hors mentions légales, 404) doit être ajoutée dans `src/pages/sitemap-index.xml.ts` :

```ts
{ url: `${siteUrl}/nouvelle-page/`, priority: '0.8', changefreq: 'monthly' },
```

Le sitemap est accessible sur : `https://lacabinepodcasts.com/sitemap-index.xml`

## Indexation automatique

Chaque push sur `main` déclenche le workflow `.github/workflows/indexnow.yml` qui soumet automatiquement toutes les URLs du sitemap à **Google** et **Bing** via IndexNow.

Clé IndexNow : voir `public/indexnow-key.txt` et le secret GitHub `INDEXNOW_KEY`.

## Canonical URLs — trailing slash obligatoire

Toutes les URLs canoniques, og:url et JSON-LD doivent avoir un `/` final pour correspondre au sitemap :

```astro
const pageUrl = `${siteUrl}/nouvelle-page/`;
<link rel="canonical" href={pageUrl} />
<meta property="og:url" content={pageUrl} />
```
