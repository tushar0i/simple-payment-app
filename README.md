# Simple Payment App

This repository contains a minimal full-stack application for sending simple transactions between users. It includes an Express/MongoDB backend and a React + Vite frontend. The app is intended as a learning/example project and a starting point for building a small payments-like workflow.

**Repository**: `simple-payment-app`

**Main folders**:
- `backEnd/` — Express API and database configuration
- `frontEnd/` — React + Vite single-page app

**Status**: Prototype / demo

**Preview**: The backend runs on port `3000` by default and exposes API routes under `/api/v1/*`. The frontend uses Vite (default dev port is `5173`).

**Demo**

Uploading Soon....

**Screenshot**

<img height="200px"  alt="Sign Up page" src="./frontEnd/src/assets/SignUp.png ">
<img height="200px"  alt="Sign In page" src="./frontEnd/src/assets/SIgnIn.png ">
<img height="200px"  alt="Send Money page" src="./frontEnd/src/assets/SendMoney.png ">

<img height="200px"  alt="Dashboard page" src="./frontEnd/src/assets/Dashboard.png ">


**Table of Contents**
- **About**
- **Features**
- **Tech Stack**
- **Quickstart**
- **Environment**
- **API**
- **Project Structure**
- **Contributing**

**About**

This project demonstrates a simple transaction flow where users have accounts and can send money to each other. The backend handles user registration, authentication and account/transfer operations. The frontend provides forms and pages to sign up, sign in, view users and send money.

**Features**
- **User accounts**: Signup, signin, JWT-based auth
- **Account operations**: Balance viewing and transfers
- **Input validation**: Validator modules under `validators/`
- **Simple API**: REST endpoints in `backEnd/routes/`

**Tech Stack**
- **Backend**: Node.js, Express, Mongoose, MongoDB, JWT
- **Frontend**: React, Vite, Tailwind (optional config present), Axios

**Quickstart**

Prerequisites: Node.js (16+ recommended), npm, a running MongoDB instance or MongoDB Atlas URI.

1) Clone the repo (if you haven't already):

```bash
git clone https://github.com/tushar0i/simple-payment-app.git
cd simple-payment-app
```

2) Backend — install and run (development):

```bash
cd backEnd
npm install
npm run dev    # uses nodemon: restarts on changes
```

Notes:
- The backend listens on `PORT = 3000` (configured in `backEnd/server.js`).
- If you prefer a one-off run: `node server.js` from the `backEnd` folder.

3) Frontend — install and run:

```bash
cd frontEnd
npm install
npm run dev    # starts Vite dev server (usually http://localhost:5173)
```

4) Open the frontend in your browser and use the UI to register accounts and perform transfers.

**Environment**
- `backEnd/.env` (or environment variables) must include:
	- `MONGO_URI` — MongoDB connection string used by Mongoose (the backend reads `MONGO_URI` via dotenv)
	- Any JWT secret used for signing tokens (check `middlewares/authMiddleware.js` or token usage in routes)

Example `.env`:

```
MONGO_URI="mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority"

JWT_SECRET="your_jwt_secret_here"

BCRYPT_SALT_ROUNDS = "number"
```

**API (overview)**
- Base URL: `http://localhost:3000/api/v1`
- Main route groups:
	- `/api/v1/user/...`
        - `POST /signup , /signin `
        - `GET /me , /bulk `
        - `PUT /changePassword `

        (see `backEnd/routes/user.js`)
	- `/api/v1/account/...`
        - `GET /balance` 
        - `POST /transfer`

        (see `backEnd/routes/account.js`)

Inspect the route files in `backEnd/routes/` for exact endpoints, request shape and expected responses.

**Project Structure**
- `backEnd/`
	- `server.js` — Express server bootstrapping
	- `config/db.js` — (DB connection helpers if present)
	- `routes/` — API route handlers (`user.js`, `account.js`)
	- `middlewares/` — auth middleware and error handling
	- `validators/` — input validation logic
- `frontEnd/`
	- `src/` — React components and pages
	- `components/` — reusable components (e.g., `TopBar.jsx`, `UsersList.jsx`)
	- `pages/` — `Dashboard.jsx`, `SendMoney.jsx`, `Signin.jsx`, `Signup.jsx`

**Development notes / gotchas**
- The backend `package.json` has a `dev` script that uses `nodemon server.js` — use `npm run dev` while developing.
- The `start` script in `backEnd/package.json` currently contains `"npm server.js"` which is unconventional; to run without nodemon use `node server.js` or fix the `start` script to `node server.js`.
- Frontend uses Vite — standard Vite/HMR development workflow applies.

**Contributing**
- Fork the repo, create a feature branch, and open a PR with a concise description.
- Add tests and keep changes small and focused.


