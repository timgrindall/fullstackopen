# Part 5: Testing React apps

React frontend for the Part 4 blog list API, plus end-to-end tests.

| Exercises | Project | What it does |
| --- | --- | --- |
| 5.1–5.16 | [`bloglist-frontend/`](bloglist-frontend) | Login, list, create and like blogs; notifications; `Togglable` component; unit tests with Vitest and React Testing Library |
| 5.17–5.23 | [`blog-app-tests/`](blog-app-tests) | End-to-end tests with Playwright |
| 5.24–5.28 | [`bloglist-router-frontend-3/`](bloglist-router-frontend-3) | Blog list with React Router and Material UI styling |

## Running the frontends

The frontends call `/api/blogs`, so start the backend from `Part_4/blog-list-app` first.

```bash
cd bloglist-frontend      # or bloglist-router-frontend-3
npm install
npm run dev
npm test                  # Vitest unit tests
```

## Running the end-to-end tests

Start the backend in test mode (`npm run start:test` in `Part_4/blog-list-app`) and the frontend dev server, then:

```bash
cd blog-app-tests
npm install
npm test                  # Playwright, Chromium
npm run test:report       # open the HTML report
```
