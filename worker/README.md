# Leaderboard Worker

Small **Cloudflare Worker** + **KV** that stores the global top-5 leaderboard for the
Japanese practice games. It lives outside the static site and keeps the KV namespace
binding secret on Cloudflare's edge — no key is exposed to the browser.

## Endpoints

Each route is scoped to a game via the `game` field. Allowed game values:
`speed`, `wordle`, `recall`, `match`, `builder`, `kanji-reading`,
`kanji-meaning`, `kanji-select`.

- `GET /?game=<slug>` → top-5 scores for that game:
  `[{ "name": string, "score": number, "updatedAt": string }]`
- `POST /` with body `{ "game": string, "name": string, "score": number }` →
  merges the score (keeps the better score per `{game, name}`), sorts descending,
  caps at 5 per game, returns that game's new top-5.
- CORS is enabled (`Access-Control-Allow-Origin: *`) so the static site can call it.

## Deploy steps (one time)

> Note: this project uses **pnpm** (same as the main site). Run the commands below
> from the `worker/` folder. Because the repo root is a pnpm workspace, use
> `--ignore-workspace` so the worker installs its own deps.

1. Install deps (from this folder):

   ```bash
   cd worker
   pnpm install --ignore-workspace
   ```

   The worker's `package.json` whitelists the `esbuild`, `workerd` and `sharp`
   build scripts so Wrangler's tooling installs correctly. If a build is ever
   reported as ignored, run `pnpm approve-builds` or extend that list.

2. Create a KV namespace and note the returned id:

   ```bash
   npx wrangler login
   npx wrangler kv namespace create LEADERBOARD
   ```

3. Paste that id into `wrangler.toml` under `[[kv_namespaces]]` → `id`.

4. Deploy:

   ```bash
   pnpm run deploy
   ```

   The output shows your Worker URL, e.g. `https://drogan-leaderboard.<account>.workers.dev`.

5. Set it as the site's public env var (see root README / `.env.local`):

   ```dotenv
   NEXT_PUBLIC_LEADERBOARD_URL=https://drogan-leaderboard.<account>.workers.dev
   ```

   Provide this var in the GitHub Actions build too (Settings → Secrets and variables →
   Actions), so the deployed site knows where to POST/GET scores.
