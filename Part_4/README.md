# Part 4: Testing Express servers, user administration

## Blog list backend (exercises 4.1–4.23)

[`blog-list-app/`](blog-list-app) is a REST API for blog posts with user accounts and token authentication.

- Stack: Node.js, Express, MongoDB (Mongoose), bcryptjs, JSON Web Tokens
- Structure: `controllers/` (blogs, users, login, testing), `models/`, `utils/` (config, logger, middleware, list helpers)
- Tests (`tests/`): unit tests for the list helper functions (dummy, total likes, favorite blog, most blogs, most likes) and API tests for blogs and users, run with Node's built-in test runner and supertest

## Setup

Create a `.env` file in `blog-list-app/` (it is not committed):

```
MONGODB_URI=<your MongoDB connection string>
TEST_MONGODB_URI=<a separate database for tests>
SECRET=<a long random string for signing tokens>
SESSION_SECRET=<a long random string>
PORT=3003
```

## Scripts

```bash
cd blog-list-app
npm install
npm run dev         # development, restarts on change
npm start           # production
npm test            # runs the test suite against TEST_MONGODB_URI
npm run start:test  # server in test mode (used by the Part 5 end-to-end tests)
npm run lint
```
