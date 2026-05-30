# Pet Gallery

Front-end take-home project: browse a gallery of pets, search and sort results, select images for download, and view individual pet details.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## API

The app fetches pets from `GET /pets`, proxied in dev to [eulerity-hackathon.appspot.com/pets](https://eulerity-hackathon.appspot.com/pets).

## Features

- Responsive gallery grid (1 / 2 / 4 columns)
- Search by title or description
- Sort by name or date
- Pagination
- Multi-select with Select All / Clear
- Download selected images with estimated total file size
- Detail view at `/pets/:id`
- Selection persists across routes
- Custom `usePets` hook with loading, error, and empty states
