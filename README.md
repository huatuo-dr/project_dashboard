# project_dashboard

Vite + Tailwind static project entry dashboard.

## Setup

```bash
npm i
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Edit project data

Edit `public/projects.json`. Fields:

- `id` — unique id
- `name` — display name (search is case-insensitive on this field)
- `url` — project link (cover opens in new tab; Copy Link writes clipboard; raw URL text is never shown)
- `cover` — image path from site root, e.g. `/covers/cover-01.svg`

## Replace covers

Put images in `public/covers/` (SVG/PNG/JPG), then update the matching `cover` field in `projects.json`. Placeholder SVGs are included.

## Layout

Responsive grid: 1 column by default, 2 at `sm`, 3 at `lg`.
