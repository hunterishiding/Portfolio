# hunterwashiding.com

Static portfolio site. No build step, no framework, no dependencies.

```
index.html            the main site — home, gallery, about, field notes, contact
entry.html            renders every collection page and every blog post
data/entries.json     the content for those pages, plus the menu/footer labels
editADMINhtr.html     the visual editor (see "The editor" below)
assets/               photos, video, wordmark, icons
assets/texture.js     the cherry-blossom background (see "The background texture")
vercel.json           tidy addresses (/work/… and /notes/…)
CNAME                 for GitHub Pages only — delete it, you host on Vercel
```

> The site only reads `data/entries.json`. If there is also an `entries.json`
> in the root of the repo it is an old download and nothing uses it.

---

## How the pages fit together

Each gallery collection and each field note has its own page. Rather than one
HTML file per entry, there is **one template** (`entry.html`) that reads its
content from `data/entries.json`:

```
entry.html?id=gal-1     a photo/video collection
entry.html?id=note-1    a blog post
```

Adding a collection adds a record to the JSON, not a new file. Restyling
`entry.html` updates every entry page at once.

Cards on the site open their page two ways: the cover photo is clickable, and
so is the button underneath. Home page tiles work the same way.

### Page addresses

On Vercel every page also answers to a tidy address, and you can give each one
its own name in the editor (**Page address** field):

```
/work/el-salvador       instead of   /entry?id=gal-4
/notes/three-mornings   instead of   /entry?id=note-1
```

Old `entry?id=…` links keep working, and the browser bar switches to the tidy
address on its own. Two pages can't share an address; the editor tells you if
you try. The tidy addresses need the rewrite rules in `vercel.json` and do not
work on a plain local server (`python3 -m http.server`) — locally, use the
`entry?id=…` form.

---

## Deploying to Vercel

1. Put this folder in a GitHub repo.
2. Go to vercel.com, sign in with GitHub, **Add New → Project**, pick the repo.
3. Framework preset: **Other**. No build command, no output directory. Deploy.
4. Add `hunterwashiding.com` under **Project → Settings → Domains** and set the
   DNS records Vercel shows you.

Vercel redeploys on every push, so saving from the editor with GitHub connected
publishes the change on its own (give it a minute).

---

## The editor

`editADMINhtr.html` must be served over http. Locally:

```
python3 -m http.server 8000
```

then open **http://localhost:8000/editADMINhtr.html**. It also works from the
live site — see "Keeping the editor private" below.

### Layout

- **Left rail** — every page in the site: Home, each collection, each post.
  Click one to edit it. The `+ New` buttons at the bottom of each list create a
  page *and* its card on the site in one step.
- **Middle** — controls for whatever is selected.
- **Right** — the live page.

### Text and translation

- **Text** — click and type. Click a piece of text to set its size, and to add
  an **English version**. Anything without an English version shows the same
  text in both languages.
- Visitors switch EN/ES with the button in the top bar. Their choice is
  remembered.

### Buttons, menu and footer

Click any button or link in the preview — the top menu, the footer, the big
home buttons, "Send Message" — and the **Button / link** panel opens:

- **Text** and **English version** of the label.
- **Goes to** — pick which page a button opens (Home, Gallery, About, Field
  notes, Contact).
- **Link address** — for links that go to another site (the footer Instagram
  link also updates the Instagram URL under "Site links").

Clicking still switches pages in the preview, so you can browse while you edit.
Changes to the top menu and footer are also saved into `data/entries.json` so
that every collection and post page shows the same menu. **Save both files**
(the editor does this when you save).

### Photos

Click a photo to select it. Then:

- **Shape** — 1:1, 4:3, 3:2, 16:9, 9:16, 4:5.
- **Zoom** — slide from 100% to 300% to zoom in on the photo.
- **Crop across / down** — with a zoom, these move the photo around inside its
  frame, like the crop tool in a phone's Photos app. Without a zoom they choose
  what stays in frame when the shape is cropped.

### Blocks

Hover a section for move, duplicate, open and delete. Click one to select it:
set text alignment, a scroll animation (fade, up, left, right, zoom), and drag
the green handle on its right edge to resize it. Deleting a card deletes its
page too, and asks first.

### Collections

Add photos or videos, drag the order with the arrows, caption them, set any one
to full width or half, and give each its own shape, zoom and crop. Tall and wide
media are packed together without gaps.

### Instagram and YouTube embeds

In a collection or post: **Add Instagram/YouTube embed…**, then paste a link
(any of these work: the address-bar link, a share link with tracking text, the
`/reel/…` or `/p/…` link, or the embed code). Instagram links are cleaned up
automatically.

- The post has to be **public**. Private accounts, age-restricted posts and some
  music-licensed reels won't embed.
- Instagram doesn't let third-party pages play its videos in place. The embed
  shows a preview and opens Instagram when clicked. To play video directly on
  the page, upload the video file itself as a photo/video.
- Some browser extensions (Privacy Badger, uBlock Origin, strict tracking
  protection) block Instagram embeds and show a blank box. That happens in the
  visitor's browser and can't be fixed from the site; the **Watch on Instagram**
  link under each embed still works for them.
- A collection made only of embeds is centered on the page.

### Posts

A proper composer: bold, italic, underline, headings, quotes, lists, text
colour, links. "Add photo or video" drops an attachment in at the cursor; click
an attachment to set it narrow, normal or wide, or remove it. Posts carry a
category and a date.

### Saving — three ways

| | Where it works | What happens |
|---|---|---|
| **Folder** | Chrome, Edge | Writes into the site folder on your computer |
| **GitHub** | Any browser, including the deployed site | Commits to your repo; Vercel redeploys |
| **Download** | Always | Hands you the files to drop in yourself |

For **GitHub**, make a token at github.com/settings/tokens — a fine-grained
token with **Contents: read and write** on this repo only. The editor asks for
`owner/repo`, the token and the branch.

Nothing is stored between visits except that connection. The editor reads the
real files each time, so a forgotten draft can never overwrite good work — but
unsaved changes are lost if you close the tab. It warns you first.

Each save commits the changed files, so make your edits first and save once
instead of many times to keep the history tidy.

### Keeping the editor private

Anyone who finds the editor page can open it, but they can only change their own
copy in their browser. The only way to publish is a GitHub token, which only you
have. If you would rather not have the page on the live site at all, delete
`editADMINhtr.html` before pushing and run it locally instead.

---

## The background texture

`assets/texture.js` draws the cherry-blossom branches down both edges, drifting
petals, a soft vignette and a faint grain. It sits on top of the page without
blocking clicks, and both `index.html` and `entry.html` load it. It is added to
the page by the script, so it never gets saved into your HTML, and it is
switched off inside the editor preview.

The settings are at the top of the file:

| Setting | What it does |
|---|---|
| `color` | `#ffffff` white · `#f7f4ec` ivory · `#fcddec` pale blush |
| `branchOpacity` | 0.03 (barely there) to 0.5 (bold). Default 0.12 |
| `branchScale` | 0.7 to 1.4 — how far the branches reach in |
| `bloom` | soft glow around the branches, 0–16 px |
| `petals`, `petalCount` | falling petals on/off, and how many |
| `vignette`, `grain` | on/off |

To try values without editing the file, open the browser console on the live
site and run `SiteTexture.set({ branchOpacity: 0.25, color: '#fcddec' })`. It
resets on refresh, so copy what you like into the file. Add `?texture=off` to
any address to see the site without it. To remove it completely, delete the
`<script src="assets/texture.js" …>` line at the bottom of `index.html` and
`entry.html`.

It is light-coloured, so it shows on the dark green pages and almost disappears
on the cream sections. Visitors who have "reduce motion" turned on get the
branches without the falling petals.

---

## Contact form

The form opens the visitor's email app with their message pre-filled. To get
messages in your inbox instead, see the commented instructions at the bottom of
`index.html` — Formspree and Web3Forms both have free tiers.

---

## If something looks wrong

- **Changes don't show on the live site** — Vercel takes a minute after a push.
  Hard-refresh with Ctrl+Shift+R.
- **A menu label is right on the home page but old on a collection page** —
  the collection pages read their menu from `data/entries.json`, so that file
  needs to be saved/committed too.
- **A custom page address gives a 404** — check that `vercel.json` is in the
  repo, and that you're on the deployed site rather than a local server.
- **An Instagram embed is blank** — see the embed notes above; it's almost
  always a blocker extension or a non-public post.
- **The editor can't read the data** — it has to be opened over http (the
  `python3 -m http.server` command above), not by double-clicking the file.
