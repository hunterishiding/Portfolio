# razorbill.studio

Static portfolio site. No build step, no framework, no dependencies.

```
index.html          the main site — home, gallery, about, field notes, contact
entry.html          renders every collection page and every blog post
data/entries.json   the content for those pages
edit.html           the visual editor
assets/             photos, video, wordmark, icons
vercel.json         tidy URLs (/work/… and /notes/…)
CNAME               for GitHub Pages only — delete it if you host on Vercel
```

## How the pages fit together

Each gallery entry and each field note has its own page. Rather than one HTML
file per entry, there is **one template** (`entry.html`) that reads its content
from `data/entries.json`:

```
entry.html?id=gal-1     a photo/video collection
entry.html?id=note-1    a blog post
```

Adding a collection adds a record to the JSON, not a new file. That means
restyling entry pages updates all of them at once, and you never end up with
forty near-identical HTML files drifting apart.

On Vercel these also answer to `/work/gal-1` and `/notes/note-1`.

Cards on the site link to their page in two ways: the cover photo is clickable,
and so is the button underneath. Home page tiles work the same way.

---

## Deploying to Vercel

1. Put this folder in a GitHub repo (drag and drop on github.com is fine).
2. Go to vercel.com, sign in with GitHub, **Add New → Project**, pick the repo.
3. Framework preset: **Other**. No build command, no output directory. Deploy.

You get a `something.vercel.app` URL straight away. When you buy
`razorbill.studio`, add it under **Project → Settings → Domains** and Vercel
tells you which DNS records to set.

Vercel redeploys automatically on every push, so saving from the editor with
GitHub connected publishes the change on its own.

---

## The editor

`edit.html` needs to be served over http. Locally:

```
python3 -m http.server 8000
```

then open **http://localhost:8000/edit.html**

### Layout

- **Left rail** — every page in the site: Home, each collection, each post.
  Click one to edit it. The `+ New` buttons at the bottom of each list create
  a page *and* its card on the site in one step.
- **Middle** — controls for whatever is selected.
- **Right** — the live page.

### Editing the site

- **Text** — click and type.
- **Photos** — click one to select it, then set its shape (1:1, 4:3, 3:2, 16:9,
  9:16, 4:5) and slide the two crop controls to choose what stays in frame.
- **Blocks** — hover a section for move, duplicate, open and delete. Selecting
  one also gives you text alignment and a scroll animation (fade, up, left,
  right, zoom).
- **Delete** — on the hover toolbar, in the block panel, and on every entry page.
  Deleting a card deletes its page too, and it asks first.

### Collections

Add photos or videos, drag the order with the arrows, caption them, set any one
to full width, and give each its own crop. The page packs tall and wide media
together without gaps.

### Posts

A proper composer: bold, italic, underline, headings, quotes, lists, text
colour, links. "Add photo or video" drops an attachment in at the cursor; click
an attachment to set it narrow, normal or wide, or to remove it. Posts carry a
category and a date.

### Saving — three ways

| | Where it works | What happens |
|---|---|---|
| **Folder** | Chrome, Edge | Writes into the site folder on your computer |
| **GitHub** | Any browser, including the deployed site | Commits to your repo; Vercel redeploys |
| **Download** | Always | Hands you the files to drop in yourself |

For **GitHub**, make a token at github.com/settings/tokens — a fine-grained
token with **Contents: read and write** on this repo only. The editor asks for
`owner/repo`, the token, and the branch. The token lives only in that browser
tab and is gone when you close it, so you paste it once per session.

Nothing is stored between visits. The editor reads the real files each time,
which means a forgotten draft can never overwrite good work — but also that
unsaved changes are lost if you close the tab. It warns you first.

### If you put edit.html on the live site

Anyone can open it, but they can only change their own copy in their browser.
The only way to publish is a GitHub token, which only you have. If you would
rather not have it there at all, delete `edit.html` before pushing and run it
locally instead.

---

## Contact form

The form opens the visitor's email app with their message pre-filled. To get
messages in your inbox instead, see the commented instructions at the bottom of
`index.html` — Formspree and Web3Forms both have free tiers.
