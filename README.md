# Full Stack Open

My exercise solutions for [Full Stack Open](https://fullstackopen.com/en/) by the University of Helsinki, Parts 0–7.

## Repository layout

| Folder | Topic | Exercises | Details |
| --- | --- | --- | --- |
| `Part_0/` | Fundamentals of web apps | 0.4–0.6 | Sequence diagrams (Markdown) |
| `Part_1/` | Introduction to React | 1.1–1.14 | [Part_1/README.md](Part_1/README.md) |
| `Part_2/` | Communicating with the server | 2.1–2.17 | [Part_2/README.md](Part_2/README.md) |
| `Part_3/` | Programming a server with Node and Express | 3.1–3.22 | [Part_3/README.md](Part_3/README.md) |
| `Part_4/` | Testing Express servers, user administration | 4.1–4.23 | [Part_4/README.md](Part_4/README.md) |
| `Part_5/` | Testing React apps | 5.1–5.28 | [Part_5/README.md](Part_5/README.md) |
| `Part_6/` | Advanced state management | 6.1–6.22 | [Part_6/README.md](Part_6/README.md) |
| `Part_7/` | React router, custom hooks, extending the bloglist | 7.1–7.20 | In progress |

## Related repositories

The phonebook app (Part 3) lives in two separate repositories:

- Backend: https://github.com/timgrindall/Phone-Book-Backend
- Frontend: https://github.com/timgrindall/Phone-Book-Frontend
- Live app: https://phone-book.timothygrindall.com

## Status

- Parts 0–6: code is in this repository.
- Part 2: exercises 2.18–2.20 (Data for countries) are still to be added.
- Part 7: exercises 7.1–7.6 (routed anecdotes) are done; the bloglist extension (7.7–7.20) is in progress.

## Running a project

Every project is self-contained with its own `package.json`. From inside a project folder:

```bash
npm install
npm run dev      # frontends (Vite) and backends with a dev script
```

Each part's README lists the scripts and any extra setup for its projects. Backends that use MongoDB read their connection details from environment variables in a local `.env` file, which is never committed.
