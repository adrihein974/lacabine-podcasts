#!/usr/bin/env node
/**
 * Met à jour l'épisode en cours sur la page /regarder
 *
 * Usage :
 *   node scripts/update-episode.js \
 *     --title "Mon titre d'épisode" \
 *     --hook "L'accroche de l'épisode en une phrase." \
 *     --youtube "https://youtu.be/XXXXXXXXXX" \
 *     --spotify "https://open.spotify.com/episode/XXXXXXXXXX"
 *
 * Puis : git add src/data/episode.json && git commit -m "feat: nouvel épisode — <titre>" && git push
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '../src/data/episode.json');

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const title   = get('--title');
const hook    = get('--hook');
const ytUrl   = get('--youtube');
const spUrl   = get('--spotify');

if (!title || !hook || !ytUrl || !spUrl) {
  console.error('Usage: node scripts/update-episode.js --title "..." --hook "..." --youtube "https://youtu.be/..." --spotify "https://open.spotify.com/episode/..."');
  process.exit(1);
}

function toYouTubeEmbed(url) {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  if (!match) throw new Error(`URL YouTube invalide : ${url}`);
  return `https://www.youtube.com/embed/${match[1]}`;
}

function toSpotifyEmbed(url) {
  const match = url.match(/episode\/([A-Za-z0-9]+)/);
  if (!match) throw new Error(`URL Spotify invalide : ${url}`);
  return `https://open.spotify.com/embed/episode/${match[1]}`;
}

const episode = {
  title,
  hook,
  date: new Date().toISOString().split('T')[0],
  youtube_url: ytUrl,
  youtube_embed_url: toYouTubeEmbed(ytUrl),
  spotify_url: spUrl,
  spotify_embed_url: toSpotifyEmbed(spUrl),
};

writeFileSync(dataPath, JSON.stringify(episode, null, 2) + '\n');
console.log(`✅ Épisode mis à jour : "${title}"`);
console.log(`   YouTube embed : ${episode.youtube_embed_url}`);
console.log(`   Spotify embed : ${episode.spotify_embed_url}`);
console.log('');
console.log('👉 Prochaine étape :');
console.log(`   git add src/data/episode.json && git commit -m "feat: nouvel épisode — ${title}" && git push`);
