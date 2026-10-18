# ACCUKOUNT Pharma

React and Vite implementation of the bilingual ACCUKOUNT Pharma website.

## Development

```sh
npm install
npm run dev
```

Use `?lang=en` or `?lang=fr` to open the site in English or French.

## Checks

```sh
npm run lint
npm run format:check
npm run build
npm run preview
```

## Structure

- `src/App.jsx`: language state, document metadata and page selection
- `src/content.js`: English and French copy (`t` in components, via `useLanguage()`)
- `src/HomePage.jsx`: home page sections, numbered after the gallery visuals
- `src/sections/`: one component per home page section
- `src/components/`: header, footer, dialogs, gallery and shared UI (`Badge`, `Lines`, `PillButton`, `Tabs`, `Icon`)
- `src/styles/`: CSS Modules for globals and the shell (`Shared`) and shared primitives (`Site`)
- `src/pages/`: page-level CSS Modules (`Home`, `Gallery`)
- `src/lib/motion.js`: GSAP scroll animations driven by `data-reveal`, `data-lines`, `data-stagger`, `data-clip`, `data-draw-icons`, `data-count` and `data-grow`; off with reduced motion

The `visuals.html` page serves the visual gallery linked from the site footer.
