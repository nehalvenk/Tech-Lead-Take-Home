# Tech Lead Take-Home

A web application for authors to create and manage research publication submissions. Built with the MERN stack.

## Tech Stack

- **MongoDB** — database
- **Express** — REST API
- **React** (Vite) — frontend
- **Node.js** — runtime

## Prerequisites

- Node.js v18+
- A running MongoDB instance (local or Atlas)

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd Tech-Lead-Take-Home
npm run install:all
```

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
```

Open `server/.env` and set your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/submissions
CLIENT_URL=http://localhost:5173
```

### 3. Run the app

```bash
npm run dev
```

This starts both servers concurrently:

| Service  | URL                   |
|----------|-----------------------|
| Client   | http://localhost:5173 |
| API      | http://localhost:5000 |

## Project Structure

```
/
├── client/          # React + Vite frontend
│   └── src/
│       ├── App.jsx
│       └── ...
└── server/          # Express + Mongoose backend
    └── src/
        ├── index.js
        ├── config/db.js
        ├── routes/
        ├── models/
        ├── controllers/
        └── middleware/
```

## Features

- **Submissions Dashboard** — paginated table of all submissions with status tags, formatted dates, and search by title
- **Create/Edit Submission** — form to set DOI suffix, add authors, and write an abstract, with full validation
- **Persistent storage** — all submission data stored in MongoDB
