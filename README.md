# OBSIDIAN 93

Season 01, **Fault Line '93**. A static site for the crystal fleece tracksuit: a full-viewport 4:3 flash-film hero, a men’s / women’s lookbook with colorway filters, a lightbox of every frame, a drag turnaround, a drop clock, and a pre-order waitlist.

The hero is `public/media/obsidian93-hype-club-dark-v2.mp4`, a 16:9 film with “WELCOME TO OBSIDIAN 93” burned in. It autoplays muted, looped, and full-screen. **Sound off / Sound on** unmutes the audio track. Older hype cuts are not in the repo. Nothing is charged. The waitlist is saved in this browser only (`localStorage`).

Images are concept renders.

## Run locally

```bash
npm install
npm run dev
```

Open http://127.0.0.1:43123

```bash
npm run check   # confirm every still, the chart, and the hero file
npm run build   # writes dist/ with relative asset paths
npm run preview
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds `dist` and deploys with GitHub Actions.

1. Push this repo to GitHub.
2. In the repository, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.

`base` is `./`, so the built site works as a project site (`https://<user>.github.io/<repo>/`) or a user site.

## Lookbook

- **Men’s:** Black, Steel Grey, Bone / Cream, Charcoal, Deep Navy, Oxblood, Chocolate, Olive, Slate Blue, Black-on-Black (limited).
- **Women’s:** Black, Steel Grey, Dusty Ballet Pink (`#C9A2A6`), Bone / Cream, Lilac, Chocolate, Cherry Red, Sage, Baby Blue, Ivory Iridescent (limited).
- Pink, lilac, and baby blue are women’s only.
- Frames are mapped from filenames. A couple or group still shows when any of its on-line colorways is selected.

The drop clock targets **Friday 20 November 2026, 10:00 PT** (San Francisco and Los Angeles).
