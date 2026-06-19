# Prompts — Pet Gallery

Prompts used while building this project, grouped by topic.

---

## Architecture & structure

### Selection state across routes

```
I'm building a pet gallery in React with react-router-dom. Users multi-select
images on / and can navigate to /pets/:id; selection must persist across routes.

I'm planning:
- SelectionProvider above BrowserRouter in main.tsx
- useReducer holding selectedIds: Set<string>
- No global store library

Compare this to:
(a) lifting state into a parent route layout
(b) URL query params for selected ids
(c) sessionStorage

For a hackathon-sized app (~dozens of pets), which tradeoffs matter most?
```

### Data fetching approach

```
Hackathon app: one GET /pets on load, manual retry, explicit status machine
(idle | loading | success | error | empty). No mutations, no cache invalidation.

Is a custom hook with useEffect + cancelled flag reasonable, or am I missing
something important by skipping TanStack Query? I want to keep dependencies minimal.
```

### Folder layout

```
For a small Vite + React TS app (gallery, detail, about), I'm using:

src/api, src/hooks, src/context, src/pages, src/components/{gallery,layout,selection,ui}, src/utils

Is this over-foldered for the scope, or still worth it for clarity?
Any naming you'd change?
```

---

## Data layer & API

### Vite dev proxy

```
Production will call the hackathon API directly; locally I proxy /pets to
eulerity-hackathon.appspot.com in vite.config.ts (dev + preview).

Any gotchas with changeOrigin/secure for this setup, or with fetch('/pets')
assuming same-origin in dev only?
```

### Pet IDs from API

```
GET /pets returns { title, description, url, created } with no id field.
I'm assigning id = String(index) at normalize time.

What breaks if the API adds reordering or pagination later? Would you
use url hash, or accept index ids for a static hackathon dataset?
```

### File size estimation

```
Requirement: show estimated total download size for selected images. API doesn't
include byte size. I'm planning normalizePets to:

1. Promise.all HEAD requests per image url for Content-Length
2. Fallback ~40KB if HEAD fails (CORS/network)

Concerns:
- Does this block first paint if I await before rendering gallery?
- Is HEAD reliable on Pexels CDN from the browser?
- Better fallback strategy?

Review the approach; don't write the full module.
```

---

## State & behavior

### Set inside React state

```
Selection reducer stores selectedIds: Set<string>. Toggle clones the Set
each dispatch. Any issues with React reconciliation or DevTools compared
to storing string[]?
```

### Select All scope

```
Gallery has client-side search, sort, and pagination (12 per page). "Select All"
should mean all pets matching current search/sort, not only the visible page.

I'm wiring selectAll(processedPets) from GalleryPage, not paginatedPets.
Confirm that's the expected UX and whether I should show a count like
"12 selected (48 matching filter)".
```

### usePets on multiple routes

```
GalleryPage and PetDetailPage each call usePets(), so navigating to detail
may refetch. For a static list that's acceptable.

If I don't add a cache layer, is the cancelled-flag pattern in each mount
still correct under React StrictMode double effects?
```

---

## Gallery features

### Client-side filter, sort, paginate

```
All pets load once. Filter (title + description), sort (name, date), paginate
slice in useMemo. Page resets when search or sort changes.

For ~50–100 items, any reason to debounce search or virtualize the grid?
```

### Download flow

```
Download selected: for each pet, fetch(url) -> blob -> temporary <a download>.
Filenames from sanitized title.

Browser limitations I should expect? (multiple downloads blocked, CORS on
Pexels images, sequential vs parallel). I won't zip for scope.
```

### Fixed selection bar

```
Fixed bottom bar when selectedCount > 0, shows count + formatBytes(estimated).
Gallery has bottom spacer so content isn't hidden.

Review for mobile safe-area and z-index stacking with cards only—no code dump.
```

---

## UI & accessibility

### styled-components theme

```
Using styled-components with a small theme object (colors, spacing, radius, shadows)
and GlobalStyles. Hackathon scope—skip CSS modules?

Any anti-patterns for ThemeProvider at root with react-router?
```

### Accessibility review

```
Review this interaction model:

- Checkbox on card with aria-label per pet title
- Separate "View details" link to /pets/:id
- Loading spinner with aria-label

Missing: focus management when selection bar appears? keyboard traps?
```

---

## Targeted code review

### usePets race / cancel handling

```
Review only race/cancel handling in this effect:

[paste usePets useEffect block]
```

### Selection reducer

```
Any case I'm not handling in this reducer?

[paste selectionReducer switch]
```

### Gallery pagination logic

```
Page resets when search/sort changes and clamps when totalPages shrinks—spot logic bugs:

[paste relevant useEffects + useMemos from GalleryPage]
```
