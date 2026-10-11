# Part 3: Programming a server with Node and Express

## Phonebook (exercises 3.1–3.22)

The phonebook backend (Express, MongoDB) and frontend are kept in their own repositories:

- Backend: https://github.com/timgrindall/Phone-Book-Backend
- Frontend: https://github.com/timgrindall/Phone-Book-Frontend
- Live app: https://phone-book.timothygrindall.com

[`phone-book/`](phone-book) in this folder is a copy of the frontend, including `mongo.cjs`, the command-line script from the MongoDB exercises. It takes the database password as an argument and never stores it:

```bash
node mongo.cjs <password> "<name>" <number>
```

## Course material

These folders follow the course text and are included for reference, not as exercises:

| Folder | What it is |
| --- | --- |
| [`lecture/`](lecture) | Minimal Express server from the first chapter |
| [`notes-backend/`](notes-backend) | Notes backend; its `dist/` folder is the built frontend served as static files |
| [`notes-frontend/`](notes-frontend) | Notes frontend used to build that production bundle |

## Running the notes backend

```bash
cd notes-backend
npm install
npm run dev
```
