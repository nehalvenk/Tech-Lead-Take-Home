# Tech Lead Take-Home

A web application for authors to create and manage research publication submissions. Built with the MERN stack.

## Tech Stack

- **MongoDB** — database
- **Express** — REST API
- **React** (Vite) — frontend
- **Tailwind CSS v4** — styling
- **Node.js** — runtime

## Prerequisites

- Node.js v18+
- MongoDB installed and running locally ([install guide](https://www.mongodb.com/docs/manual/installation/))

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

The default values in `server/.env` work out of the box if MongoDB is running locally:

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/manuscripts-db
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

If MongoDB is not already running, start it:

```bash
# macOS (Homebrew)
brew services start mongodb-community

# or run directly
mongod
```

### 4. Run the app

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL                    |
|---------|------------------------|
| Client  | http://localhost:5173  |
| API     | http://localhost:3001  |

## Project Structure

```
/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── index.css        # Design tokens + Tailwind theme
│       ├── utils.js         # cn() class utility
│       ├── components/
│       │   ├── Button.jsx
│       │   └── StatusBadge.jsx
│       └── App.jsx
└── server/                  # Express + Mongoose backend
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
