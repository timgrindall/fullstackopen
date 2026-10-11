# Part 6: Advanced state management

State management with Zustand, and server state with React Query and context.

**The final version of the Part 6 projects is [`fs-statemanagement/`](fs-statemanagement).** The other folders are earlier iterations of the same exercises, kept for reference.

## Final version: `fs-statemanagement/`

| Project | Notes |
| --- | --- |
| [`unicafe/`](fs-statemanagement/unicafe) | Unicafe feedback app with Zustand; Playwright tests in [`unicafe-tests/`](fs-statemanagement/unicafe-tests) |
| [`anecdotes/`](fs-statemanagement/anecdotes) | Anecdotes with a Zustand store and json-server; Playwright tests in [`anecdotes-tests/`](fs-statemanagement/anecdotes-tests) |
| [`query-anecdotes/`](fs-statemanagement/query-anecdotes) | Anecdotes with React Query for server state and a context + reducer for notifications; Playwright tests in [`query-anecdotes-tests/`](fs-statemanagement/query-anecdotes-tests) |

GitHub Actions workflows in `fs-statemanagement/.github/workflows/` run the Playwright tests.

## Earlier iterations

| Folder | Notes |
| --- | --- |
| [`unicafe-zustand/`](unicafe-zustand) | Earlier Unicafe version with a Zustand store |
| [`zustand-anecdotes/`](zustand-anecdotes) | Earlier anecdotes version with a Zustand store, json-server backend and Vitest unit tests for the store |
| [`zustand-app/`](zustand-app) | Counter and notes examples from the course material |

## Running

```bash
cd fs-statemanagement/<project>
npm install
npm run dev
```

Projects with a backend need it running in a second terminal:

```bash
npm run server    # json-server (anecdotes) or server.js (query-anecdotes)
```

Tests:

```bash
cd fs-statemanagement/<project>-tests
npm install
npm test          # Playwright
```
