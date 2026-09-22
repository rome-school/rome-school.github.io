# rome-school.github.io

The series website for **RoME**, the International Summer School on Robotic
Mission Engineering. It is the permanent front door to the series: what RoME is,
which edition is next, every past edition and where to find it, and who runs the
series.

Individual editions keep their own websites. This site does not duplicate
programmes, schedules, speaker bios or registration — it links to them.

Published at <https://rome-school.github.io>.

---

## Adding a new edition

This is the most common change, and it only touches one file.

Open [`_data/editions.yml`](_data/editions.yml) and add a block at the **top** of
the list:

```yaml
- number: 6
  year: 2028
  ordinal: Sixth
  dates: To be announced
  city: Porto
  country: Portugal
  host: University of Porto
  host_url: https://www.up.pt/
  status: upcoming
  blurb: >-
    One or two sentences about the edition.
```

Then change the previous edition's `status` from `upcoming` to `past` and give
it its final `dates` and `url`.

That is the whole job. The hero card, the timeline and the "Upcoming" badge all
read from this file. Commit the change and GitHub Pages publishes it within a
minute or two.

The other two data files work the same way:

| File | Holds |
|---|---|
| [`_data/editions.yml`](_data/editions.yml) | Every edition, newest first |
| [`_data/steering.yml`](_data/steering.yml) | Steering committee members |
| [`_data/institutions.yml`](_data/institutions.yml) | Institutions that have hosted an edition |

An institution with no `logo` shows its name only, so a new host can be listed
straight away and its logo added later. Put logos in `assets/logos/`, as SVG
where possible.

Funders and sponsors are deliberately not listed on this site. They supported
individual editions, and are credited on those editions' own websites.

## Running the site locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000/>.

To build without serving:

```bash
bundle exec jekyll build
```

## Archiving an edition site

Edition websites outlive their organising teams only if someone archives them.
A site on a custom domain disappears when the domain lapses, and a
JavaScript-rendered site leaves nothing behind even while it is up.

When an edition finishes:

1. Sign in at <https://web.archive.org> and use **Save Page Now** on the
   edition's URL, including its sub-pages (programme, speakers, photos).
   Anonymous saving is rate-limited and usually rejected, so an account is
   needed.
2. Add the resulting snapshot URL as the `mirror:` field on that edition in
   `_data/editions.yml`. It renders as an "Archived copy" link beside the live
   one.

The 2024 and 2026 edition sites currently have no snapshot at all, so they
are the ones to do first.

## How the site is built

Plain [Jekyll](https://jekyllrb.com/), built natively by GitHub Pages. There is
no CI workflow, no Node toolchain and no CSS framework — pushing to `main`
publishes the site. This is deliberate: the site has to keep building after
several handovers, and every moving part is one that a future chair would have
to repair.

```
_config.yml           Site metadata and the contact address
index.md              The page content; all five sections live here
_data/                The three files above — the site's source of truth
_layouts/default.html Page shell
_includes/            head, nav, footer, and one include per section
_sass/_rome.scss      All styling, with the design tokens at the top
assets/               Fonts, logos, images, and the nav script
```

### Styling

The colours and fonts are declared once at the top of
[`_sass/_rome.scss`](_sass/_rome.scss). To restyle the site, edit that block and
nothing else. Navy `#00326d` carries the navigation, footer and headings; blue
`#0068b4` carries links. Both clear WCAG 2.1 AA against white at normal text
size, so check any replacement before committing.

The stylesheet uses Sass `@import` rather than `@use`. Dart Sass warns that
`@import` is deprecated, but the GitHub Pages toolchain does not support `@use`,
so `@import` is what works in both places.

### Fonts

Roboto and Roboto Slab are self-hosted from `assets/fonts/`, so no request goes
to a third party when a page loads. Both are licensed under the Apache License
2.0; see [`LICENSE-fonts.txt`](LICENSE-fonts.txt).

## Contact

<romesummerschool@gmail.com>
