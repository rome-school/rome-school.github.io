# RoME Summer School — umbrella site (`rome-school.github.io`)

Implementation plan for the series-level website that collects every edition of the
International Summer School on Robotic Mission Engineering.

Status: proposal, not yet implemented. Written September 2026.

---

## 1. What this site is (and is not)

The umbrella site is **a permanent, stable front door to the series**. It answers four
questions and nothing more:

1. What is RoME?
2. Which edition is next, and where do I register?
3. What happened in every past edition, and where are its materials?
4. Who runs the series, and how do I contact them?

It is deliberately **not** an edition site. Programmes, schedules, speaker bios,
accommodation, registration forms and photo galleries stay in the per-edition sites.
This separation is what the RSE series does (`rsemeeting.github.io` links out to
`rsemeeting.github.io/rse2026/`), and it is the reason that site has survived four
organising teams without rot.

### The series as it stands

| Edition | Year | Dates | Host | Site |
|---|---|---|---|---|
| 1st | 2023 | — | University of Brasília, Brazil | https://lesunb.github.io/RoME/Previous/ |
| 2nd | 2024 | Feb 20–23 | University of Brasília, Brazil | https://lesunb.github.io/RoME/ |
| 3rd | 2025 | Mar 11–14 | Fortaleza / UECE, Brazil | https://rome.gesaduece.com.br |
| 4th | 2026 | Feb 23–27 | University of Brasília, Brazil | https://lesunb.github.io/RoME26/ |
| 5th | 2027 | TBA | **GSSI, L'Aquila, Italy** | to be created |

Two things to settle before launch:

- **Which year is the GSSI edition?** The brief says "2026 in GSSI", but RoME 2026
  already ran in Brasília in February 2026 and RoME 2027 at GSSI is listed as
  "coming". This plan assumes **RoME 2027, 5th edition, GSSI**. Correct it if wrong —
  it changes the edition numbering everywhere.
- **2023 has no standalone site**, only a subpage of the 2024 site. Either accept the
  deep link or rebuild a minimal 2023 page from it.

### Preservation risk (act on this early)

The 2025 site at `rome.gesaduece.com.br` is a **client-rendered single-page app** — the
served HTML contains only a `<title>` and a `<script type="module">` tag. Nothing is
indexable, nothing is readable without JavaScript, and it sits on a **non-GitHub domain
that can lapse**. The 2023 and 2024 sites depend on the `lesunb` GitHub account
remaining active.

Mitigation, as part of phase 1:

1. Submit all four edition URLs to the Internet Archive Wayback Machine and record the
   snapshot URLs in the data file as a `mirror:` field.
2. Transcribe the 2025 edition's core facts (dates, host, chairs, keynotes, topics) into
   this repo's data file, so the metadata survives even if the site does not.
3. Ask the series steering committee to adopt a policy: **future editions are published
   under the `rome-school` GitHub organisation**, e.g. `rome-school.github.io/rome2027/`.
   Past editions keep their current URLs and are linked out to.

---

## 2. Technology: Jekyll on GitHub Pages

**Recommendation: Jekyll, served by GitHub Pages from the `rome-school/rome-school.github.io`
repository.**

### Why Jekyll specifically

The decisive constraint for an academic event series is not developer experience — it is
**that the site must still build in four years, after three handovers, by a PhD student
who has never touched it**. That constraint eliminates most of the field.

- **Zero build infrastructure.** GitHub Pages builds Jekyll natively. Push to `main`,
  the site is live. No GitHub Actions workflow to maintain, no Node version to pin, no
  npm lockfile that rots, no build token that expires. Every other generator requires a
  CI workflow that is one deprecated action away from silently breaking.
- **The apex domain is free and permanent.** `rome-school.github.io` requires only that
  the GitHub organisation be named `rome-school`. No registrar, no annual renewal, no
  credit card tied to one organiser's personal account. This is exactly the failure mode
  the 2025 edition's custom domain is exposed to.
- **It is what the neighbouring communities already use.** `rsemeeting.github.io` is
  Jekyll; `rose-workshops.github.io` is Jekyll. Contributors move between RoME, RSE and
  ROSE, and every conference site in this community is a Jekyll repo. Familiarity is a
  real maintenance asset here.
- **Content is Markdown + YAML.** A future chair adds an edition by appending eight
  lines to `_data/editions.yml`. They do not need to understand the site to do it, and
  they can do it in the GitHub web editor from a phone.
- **`_data` is the right primitive for this site.** The whole umbrella site is
  fundamentally one list of editions rendered three ways (hero, timeline, host logos).
  Jekyll's `_data` directory plus Liquid loops expresses that in a few dozen lines with
  no framework.

### Why not the alternatives

| Option | Why not |
|---|---|
| **Hugo** | Faster and a fine generator, but GitHub Pages does not build it natively — it needs a GitHub Actions workflow. That workflow is the fragile part. Speed is irrelevant for a 5-page site. |
| **Astro / Next.js / Vite SPA** | This is what the 2025 edition did, and its content is now invisible to search engines and archives. A Node toolchain has a ~2-year practical shelf life without maintenance. Wrong trade for a site whose job is to outlive its authors. |
| **Plain static HTML** | Tempting, and the 2026 edition does it. But adding an edition means editing the same block in four files, and it drifts. Jekyll's cost over plain HTML is one `Gemfile`. |
| **Wix / Squarespace / university CMS** | Recurring cost, tied to one person's account, no version history, no diffable review of who changed what. |

### Stack detail

- **Jekyll 4.x** via `github-pages` gem (pins to whatever GitHub Pages supports).
- **Kramdown** Markdown, `permalink: pretty`.
- **Sass** via Jekyll's built-in converter — one `_sass/_rome.scss`, no build step.
- **No CSS framework.** The RSE site pulls in Materialize from a CDN and then overrides
  most of it; that is ~150 KB to get a nav bar and a card. This site is five sections of
  flow content — hand-written CSS Grid and custom properties are less code and age
  better. No third-party CDN means no external dependency that can go dark.
- **Self-hosted fonts** (see §4) rather than Google Fonts, for GDPR comfort at an
  EU-hosted edition and to remove a third-party request.
- **No JavaScript** except a ~15-line mobile nav toggle. No analytics by default.

---

## 3. Repository and content structure

### Prerequisite

Create a GitHub **organisation** named exactly `rome-school`, with the current steering
committee as owners (not one person). Then create the repo `rome-school.github.io`.
Organisation ownership is what makes the domain survive a chair rotation.

```
rome-school.github.io/
├── _config.yml                 # site metadata, palette tokens, current edition pointer
├── Gemfile                     # github-pages gem
├── README.md                   # how to add an edition, how to run locally
├── CNAME                       # only if a custom domain is ever added
├── index.md                    # the whole site: hero, about, editions, hosts, committee
├── _data/
│   ├── editions.yml            # one entry per edition — the single source of truth
│   └── steering.yml            # steering committee members
├── _layouts/
│   └── default.html
├── _includes/
│   ├── head.html
│   ├── nav.html
│   ├── editions.html           # renders _data/editions.yml as the timeline
│   ├── committee.html
│   └── footer.html
├── _sass/
│   └── _rome.scss
└── assets/
    ├── css/main.scss
    ├── fonts/
    ├── img/logo-rome.svg, favicon.png
    ├── logos/                  # host + sponsor logos, SVG preferred
    └── people/                 # committee portraits
```

### The data model

`_data/editions.yml` is the file that matters. Everything else renders from it.

```yaml
- number: 5
  year: 2027
  ordinal: Fifth
  dates: "TBA"
  city: "L'Aquila"
  country: Italy
  host: Gran Sasso Science Institute
  host_url: https://www.gssi.it/
  host_logo: /assets/logos/gssi.svg
  url: https://rome-school.github.io/rome2027/
  status: upcoming          # upcoming | past
  blurb: >
    The fifth edition brings RoME to Europe for the first time...

- number: 4
  year: 2026
  ordinal: Fourth
  dates: "February 23–27, 2026"
  city: Brasília
  country: Brazil
  host: University of Brasília
  host_url: https://www.unb.br/
  host_logo: /assets/logos/unb.svg
  url: https://lesunb.github.io/RoME26/
  mirror: https://web.archive.org/web/.../lesunb.github.io/RoME26/
  status: past
  highlights:
    - The first RoME Robotic Competition, with missions executed on TurtleBots
  keynotes: [Ana Cavalcanti, Patrizio Pelliccione, Lina Marsso, Pedro Ribeiro,
             Thierry Lecomte, Marcel Vinicius Medeiros Oliveira,
             Genaína Rodrigues, Ricardo Caldas]
```

Adding the 2028 edition later = prepend one block, flip the previous `status` to `past`.
That is the entire maintenance burden, and it is why this structure is worth the setup.

### Page structure (single scrolling page, anchor nav)

One page, five anchored sections — the RSE site's shape, and the right one for four
facts and a list.

1. **Hero** — RoME wordmark, one-line definition of the series, and a prominent card for
   the next edition (`status: upcoming`) with a "Visit the RoME 2027 site" button. If no
   edition is upcoming, the card degrades to "The next edition will be announced here."
2. **About** — two or three paragraphs: what robotic mission engineering is, what the
   school does, who should attend (PhD / MSc / advanced undergrad in CS, engineering,
   mechatronics), and the ACM SIGSOFT connection.
3. **Editions** — a vertical timeline generated from `_data/editions.yml`: year, ordinal,
   dates, host, city, a one-line blurb, and links to the live site and the archived
   mirror. This is the section that gives the site its reason to exist.
4. **Hosts & Supporters** — logo grid of host institutions (UnB, UECE, GSSI) and
   recurring supporters (ACM SIGSOFT, SBC, LES, FAP-DF), each captioned with its role,
   as the RSE site does.
5. **Steering Committee** — portrait cards from `_data/steering.yml` (the nine members
   currently listed on the 2026 site), plus the contact address
   `romesummerschool@gmail.com`.

Footer: copyright, contact, link to the GitHub repo.

---

## 4. Aesthetics

### The design problem

The three existing edition sites each look different — 2024 is institutional
blue-and-white, 2025 is a dark SPA, 2026 is navy nav bars with Poppins. There is no
series identity, only four one-off sites. The umbrella site's job is to **become** that
identity: it should look like the thing the editions belong to, not like a fifth variant.
It also has to sit next to `rsemeeting.github.io` (deep crimson `#9d2246`) without being
mistaken for it.

### Recommended direction: navy structure, terracotta accent

Keep **deep navy** as the structural colour — it is the one thread running through the
2024 and 2026 sites, so the series stays recognisable — and introduce **terracotta** as
the single accent. Terracotta does real work here: it reads as Roman/Mediterranean
(which the name RoME invites and the GSSI edition earns), it is warm against the cold
navy, and it is unmistakably not RSE's crimson. Two colours, used consistently, on a
warm off-white ground.

| Token | Hex | Role | Contrast on white |
|---|---|---|---|
| `--ink` | `#0B2545` | Nav, headings, footer | **15.4 : 1** (AAA) |
| `--terracotta` | `#9E4631` | Links, buttons, "upcoming" badge, timeline markers | **6.2 : 1** (AA all sizes) |
| `--terracotta-bright` | `#B5563C` | Hover, large decorative fills only | 4.8 : 1 (AA normal text) |
| `--sand` | `#FAF7F2` | Page background | — |
| `--surface` | `#FFFFFF` | Cards | — |
| `--border` | `#E4DCD1` | Hairlines, dividers | — |
| `--text` | `#1F2937` | Body text | 14.7 : 1 (AAA) |
| `--text-muted` | `#5A6472` | Captions, metadata | 6.4 : 1 (AA) |

Ratios computed against `#FFFFFF`; all foreground tokens meet WCAG 2.1 AA at normal
text size, and `--ink` and `--text` reach AAA. White on `--ink` is also 15.4 : 1, so the
nav bar and footer are safe. Terracotta is used at `#9E4631` for anything carrying text
and `#B5563C` only for hovers and fills — the brighter tone would sit at 4.8 : 1, which
passes but leaves no margin.

Every token is declared once on `:root` in `_sass/_rome.scss` and referenced through
`var()`, so a future chair can restyle the site by editing eight lines.

### The alternative, if the committee prefers continuity

**All-blue**: `--ink #0B2545` with `--accent #0068B4` (azure) and a neutral grey ground.
Safer, closer to the 2024/2026 sites, and indistinguishable from several hundred other
academic event sites. It is the defensible choice if the committee wants zero
discussion; the terracotta gives the series an identity it currently lacks, which is the
better investment for a site meant to last a decade. **Worth a five-minute decision at
the next steering meeting** — everything else in this plan is unaffected either way.

### Typography

- **Headings:** *Space Grotesk* — technical without being cold, distinctive at large
  sizes, reads well in the wordmark.
- **Body:** *Inter* — excellent at small sizes, wide language coverage (Portuguese and
  Italian diacritics matter here), and a genuinely good tabular-figures set for the
  dates in the edition timeline.
- Both self-hosted as WOFF2 from `assets/fonts/`, two weights each (400 / 600), with a
  system-font fallback stack. Total ~80 KB.
- Fluid sizing with `clamp()`; body at ~1.05rem / 1.65 line-height; generous whitespace.

### Layout and motion

- Content column capped at 960 px, centred, with a 16 px gutter on phones.
- The edition timeline is a single column with a terracotta vertical rule and a marker
  per edition; the upcoming edition's marker is filled, past ones outlined. It collapses
  to plain stacked cards below 700 px.
- Cards: 1 px `--border`, 16 px radius, very soft shadow. No glassmorphism, no gradients
  beyond a faint sand-to-white page wash.
- A hairline nav bar in `--ink`, sticky, with anchor links and a hamburger below 900 px.
- Motion limited to 140 ms hover transitions, all wrapped in
  `@media (prefers-reduced-motion: reduce)`.

### Dark mode

Full support via `prefers-color-scheme`, with the tokens redefined under
`@media (prefers-color-scheme: dark)` and a `:root[data-theme="dark"]` escape hatch.
Dark ground `#0E1621`, surfaces `#16212E`, and terracotta lifted to `#D98266` (7.1 : 1 on
the dark ground) since the dark `#9E4631` would be too low-contrast.

### Accessibility, treated as a requirement

Semantic landmarks (`header` / `nav` / `main` / `footer`), one `h1`, no heading level
skipped. Visible focus rings in terracotta. Alt text on every host and sponsor logo
naming the institution. Colour never the sole carrier of meaning — the "upcoming" badge
says "Upcoming", it is not just a coloured dot. Target: Lighthouse accessibility 100.

---

## 5. Implementation phases

**Phase 0 — Governance (do first, blocks everything).**
Create the `rome-school` GitHub organisation with the steering committee as owners.
Create `rome-school.github.io`. Enable Pages on `main`. Confirm the 2027-vs-2026
numbering question. Agree the palette direction (terracotta or all-blue).

**Phase 1 — Preservation (do early, independent of the site).**
Archive all four edition sites to the Wayback Machine. Transcribe the 2025 edition's
facts from the live SPA before they become unrecoverable. Collect host and sponsor logos
as SVG where possible.

**Phase 2 — Skeleton.**
`_config.yml`, `Gemfile`, layout, includes, Sass tokens, nav, footer. Local
`bundle exec jekyll serve` working. Deploy an empty-but-styled site to confirm Pages
builds and the domain resolves.

**Phase 3 — Content.**
Populate `_data/editions.yml` with all five editions and `_data/steering.yml` with the
nine committee members. Write the About copy. Build the timeline, host grid and
committee cards.

**Phase 4 — Polish and verification.**
Dark mode, reduced motion, responsive pass at 320 / 768 / 1280 px. Lighthouse run
(target: 100 accessibility, 100 best practices). Check every outbound edition link
resolves. Add Open Graph and Twitter card metadata with a rendered preview image, since
these links get shared on social media and mailing lists.

**Phase 5 — Handover.**
`README.md` with two sections: "How to add an edition" (edit one YAML file, six lines,
shown as a worked example) and "How to run locally". This is what keeps the site alive
after the current chairs rotate off.

**Phase 6 — The 2027 edition site.**
Separate repo `rome-school/rome2027`, published at `rome-school.github.io/rome2027/`,
inheriting this site's Sass tokens and fonts so the two look like one family. Then add
its entry to `_data/editions.yml` with `status: upcoming`.

---

## 6. Open questions for the steering committee

1. **2026 or 2027 for the GSSI edition** — and therefore is it the fifth edition?
2. **Terracotta or all-blue.**
3. **Is there a RoME logo asset** (the robot graphic used on the 2026 site) available as
   SVG, and who owns it? The umbrella site should use the series mark, not invent one.
4. **Does the series want `rome-school.github.io` or a custom domain** such as
   `rome-school.org`? The GitHub domain is free and permanent; a custom domain looks
   better on a poster but reintroduces the renewal risk that threatens the 2025 site.
   Recommendation: launch on `rome-school.github.io`, add a custom domain later only if
   the organisation can pay for a 10-year registration up front.
5. **Do past organising teams agree to their editions being listed and archived?**
   (Expected yes, but worth one email.)
