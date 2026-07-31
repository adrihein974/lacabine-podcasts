/**
 * Vérifie que toutes les routes critiques sont présentes dans dist/ après le build.
 * Usage : node scripts/check-routes.mjs
 * Intégré dans "npm run build:check" — à exécuter avant tout déploiement.
 */

import { existsSync } from 'fs';
import { join } from 'path';

const DIST = './dist';

// Toutes les routes du site — ajouter ici chaque nouvelle page créée
const ROUTES = [
  // Pages principales
  '/',
  '/regarder',
  '/studio-podcast-video-photo-reunion',
  '/creation-contenu-influenceurs-reunion',
  '/video-sales-letter-temoignages-clients-reunion',
  '/mentions-legales',
  '/politique-de-confidentialite',

  // Pages podcasts
  '/les-escaliers-sont-en-papier',

  // Blog
  '/blog',
  '/blog/comment-enregistrer-un-podcast',
  '/blog/location-studio-podcast-saint-denis',
  '/blog/studio-enregistrement-podcast-equipements',
  '/blog/studio-podcast-974',
  '/blog/studio-video-la-reunion',
];

function routeToFile(route) {
  if (route === '/') return join(DIST, 'index.html');
  return join(DIST, route, 'index.html');
}

let ok = 0;
let missing = [];

for (const route of ROUTES) {
  const file = routeToFile(route);
  if (existsSync(file)) {
    ok++;
    console.log(`  ✓  ${route}`);
  } else {
    missing.push(route);
    console.log(`  ✗  ${route}  ← MANQUANT`);
  }
}

console.log(`\n${ok}/${ROUTES.length} pages présentes.`);

if (missing.length > 0) {
  console.error(`\n⚠️  ${missing.length} page(s) manquante(s) — déploiement annulé :`);
  missing.forEach(r => console.error(`   → ${r}`));
  console.error('\nImpact SEO potentiel : pages indexées qui renverraient 404.');
  console.error('Vérifier les imports, les collections de contenu et la config Astro.\n');
  process.exit(1);
}

console.log('\n✅  Toutes les routes sont présentes. Build validé.\n');
