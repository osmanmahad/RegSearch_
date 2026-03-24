# SETUP GUIDE — Deploy RegSearch Live Search (5 minutes)

Follow these steps in order. No command line needed.

---

## STEP 1 — Get a fresh Anthropic API key

1. Go to https://console.anthropic.com/settings/keys
2. If you have an old key, click the trash icon to delete it
3. Click "Create Key", give it a name like "regsearch", click Create
4. **COPY the key** — it starts with `sk-ant-api03-...`
   ⚠️  You only see it once, so copy it now and keep it somewhere safe

Optional but recommended:
- Go to https://console.anthropic.com/settings/limits
- Set a monthly spend limit (e.g. $10) to cap your costs

---

## STEP 2 — Create a free Cloudflare account

1. Go to https://cloudflare.com and click "Sign Up"
2. Enter your email and a password, then verify your email
3. You don't need to add a domain — just create the account

---

## STEP 3 — Deploy the Worker

1. Log in to https://dash.cloudflare.com
2. In the left sidebar, click **Workers & Pages**
3. Click the blue **Create** button
4. Click **Create Worker**
5. Give it a name — e.g. `regsearch-proxy` — then click **Deploy**
6. Click **Edit Code** on the next screen
7. **DELETE** everything in the editor
8. Open the file `worker.js` from this zip and **paste its entire contents** into the editor
9. Click **Deploy** (top right)
10. **COPY the Worker URL** shown at the top — it looks like:
    `https://regsearch-proxy.YOUR-NAME.workers.dev`
    ← Save this, you'll need it in Step 5

---

## STEP 4 — Add your API key as a secret

Still on your Worker page:

1. Click the **Settings** tab
2. Scroll down to **Variables and Secrets**
3. Click **Add variable**
4. Set Type to **Secret**
5. Set Variable name to: `ANTHROPIC_API_KEY`
6. Set Value to: your `sk-ant-api03-...` key from Step 1
7. Click **Deploy**

Your API key is now stored securely on Cloudflare — it will never appear in any file or webpage.

---

## STEP 5 — Connect the portal to your Worker

1. Open `index.html` from this zip in any text editor
   (Notepad on Windows, TextEdit on Mac, or VS Code)
2. Near the top of the `<script>` section, find this line:

```
const PROXY_URL = 'YOUR_WORKER_URL_HERE';
```

3. Replace `YOUR_WORKER_URL_HERE` with the Worker URL from Step 3, for example:

```
const PROXY_URL = 'https://regsearch-proxy.your-name.workers.dev';
```

4. Save the file

---

## STEP 6 — Push to GitHub

1. Go to https://github.com and create a new repository called `regsearch`
2. Make it **Public**
3. Upload these files from the zip:
   - `index.html` (the one you edited in Step 5)
   - `worker.js`
   - `README.md`
   - `.gitignore`
4. Enable GitHub Pages:
   - Go to **Settings → Pages**
   - Source: Deploy from a branch
   - Branch: `main`, folder: `/ (root)`
   - Click **Save**
5. Your site will be live at:
   `https://YOUR-GITHUB-USERNAME.github.io/regsearch/`

---

## Done!

- Cached search works instantly with no API key
- Live search works for all visitors through your Worker proxy
- Your API key is hidden and safe on Cloudflare's servers
- Monitor usage at https://console.anthropic.com/usage

---

## Troubleshooting

**Live search says "unavailable"**
→ Double-check the `PROXY_URL` in `index.html` matches your Worker URL exactly
→ Make sure the `ANTHROPIC_API_KEY` secret was saved in the Worker settings

**Worker returns an error**
→ Go to your Worker in the Cloudflare dashboard → **Logs** tab to see what's failing
→ Make sure the variable name is exactly `ANTHROPIC_API_KEY` (case sensitive)

**Need a new API key**
→ Go to https://console.anthropic.com/settings/keys, delete the old one, create a new one
→ Update the secret in Cloudflare Worker settings (Step 4)
