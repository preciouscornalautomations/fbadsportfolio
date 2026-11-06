# Precious Cornal | Meta Ads Specialist Portfolio (Vite + React + TypeScript)

Facebook and Instagram ads portfolio, ready to publish as is. All words live in `src/content/`, all pictures live in
`public/images/`, and the contact form sends leads to your Gmail through a free Google Apps Script.

## Run it

Needs Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the build locally
```

## Folder map

```
public/
  images/
    profile/        your photo -> profile.jpg (falls back to profile.svg)
    projects/       one 16:9 cover per project
    testimonials/   client headshots
    logos/          client logos
    social/         og.png share image
  favicon.svg
src/
  content/          ALL the words and data. Edit these, not the components.
    site.ts           name, email, links, photo, hero text, About, contact text
    projects.ts       the seven sample campaigns (cards, popups, metrics, ad images)
    creatives.ts      the ad creative gallery
    strategy.ts       creative strategy: pillars, testing roadmap, hook bank, storyboard, weekly report
    services.ts       "how I run your ads" + the six service cards
    tools.ts          tool chips
    testimonials.ts   real client quotes (section stays hidden while the list is empty)
    faqs.ts           FAQ questions and answers
    flow.ts           steps in the animated hero diagram
    nav.ts            sidebar and mobile dock items
  components/       React components (one per section)
  lib/submitLead.ts the form -> Apps Script call
  styles/           global.css (your original design) + extras.css
apps-script/Code.gs the Gmail receiver you paste into Google
```

## Adding images

1. Put the file in the matching `public/images/...` folder.
2. Point to it in the content file, relative to `public/` (no leading slash):

```ts
// src/content/projects.ts
{ id: 'missed-call', ..., image: 'images/projects/missed-call.jpg' }

// src/content/site.ts
photo: 'images/profile/profile.jpg'

// src/content/testimonials.ts
{ quote: '...', name: 'Jane', role: 'Owner, Acme', avatar: 'images/testimonials/jane.jpg' }
export const clients = [{ name: 'Acme', logo: 'images/logos/acme.svg' }]
```

If a file is missing, the page hides that image instead of showing a broken icon.
More detail and recommended sizes are in `public/images/README.md`.

## Receive leads in Gmail

The form posts to a Google Apps Script web app that emails each lead to your Gmail
(reply-to is set to the lead, so Reply goes straight to them). It can also log leads to a Google Sheet.

1. Go to <https://script.google.com> and click **New project**, signed in to the Gmail you want leads sent to.
2. Delete the starter code and paste in everything from `apps-script/Code.gs`.
3. Optional settings at the top of the file: `NOTIFY_EMAIL` (send somewhere other than this account),
   `SHEET_ID` (also log to a Google Sheet), `SECRET` (a random string; see step 7).
4. Pick the `testLead` function in the toolbar and click **Run**. Approve the permission prompt
   ("Advanced" > "Go to project"). You should get a test email within a minute.
5. Click **Deploy > New deployment > Web app**. Set **Execute as: Me** and **Who has access: Anyone**,
   then **Deploy**. Copy the **Web app URL** (ends in `/exec`).
   Opening that URL in a browser should show `Lead endpoint is live`.
6. In this project, copy `.env.example` to `.env` and paste the URL:

   ```
   VITE_LEAD_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

7. Optional spam filter: set the same random string as `SECRET` in `Code.gs` and as `VITE_LEAD_TOKEN` in `.env`.
   (Anything in a front-end build is visible to visitors, so this only stops casual bots. The hidden honeypot
   field in the form also catches simple bots.)
8. Restart `npm run dev`, submit the form, and check your inbox.

Visit counter and profile header
- Phones and tablets (under 1024px wide) show a profile header at the top: your photo, name with a verified tick,
  handle, role and a visit count. From 1024px up, the same details and count sit in the sidebar.
- Set `name`, `handle`, `role`, `verified` and `viewsStart` in `src/content/site.ts`. The counter starts at 0.
  `viewsStart` is added to the live count if you ever want to carry over an existing total.
- The live count uses the same Apps Script. Paste in the latest `Code.gs`, then redeploy it
  (Deploy > Manage deployments > Edit > New version). Each browser session counts once, so refreshing doesn't add visits.
  Without `VITE_LEAD_ENDPOINT` the header shows 0 and does not count, because counting visits from many people needs
  somewhere to store the total.

Good to know
- Whenever you change `Code.gs`, use **Deploy > Manage deployments > Edit > New version** or the live URL keeps running the old code.
- The browser cannot read the script's reply (that is how Apps Script works with a static site), so the form shows
  "sent" when the request goes out. Use the Apps Script **Executions** page to see failures.
- Free Gmail accounts can send roughly 100 script emails a day, far more than a portfolio needs.
- With no `VITE_LEAD_ENDPOINT` set, the form falls back to opening the visitor's email app.
- For production, set the same variables in your host's environment settings (they are baked in at build time).

## Deploy

It is a static site: `npm run build`, then publish `dist/`. Vercel, Netlify and Cloudflare Pages all work with the
defaults (build command `npm run build`, output `dist`). Add `VITE_LEAD_ENDPOINT` (and `VITE_LEAD_TOKEN`) in their
environment variables. Then set your real domain and `og:image` in `index.html`.

## Before you publish

Nothing has to be changed. Optional upgrades:
- Real photo: save it as `public/images/profile/profile.jpg` and set `photo: "images/profile/profile.jpg"` in `src/content/site.ts`.
- Email or booking link: fill `email` and `bookingUrl` in `src/content/site.ts`. The contact form appears once an email
  or `VITE_LEAD_ENDPOINT` is set; until then the contact area shows a "Message me on LinkedIn" card.
- The sample campaigns use fictional brands and illustrative figures, and say so on the page. When you have real
  results you are allowed to share, add them to `src/content/projects.ts` and real quotes to `testimonials.ts`.
- `dist/` in this zip is a ready build: drag the folder onto Netlify Drop (app.netlify.com/drop) to put it online.
