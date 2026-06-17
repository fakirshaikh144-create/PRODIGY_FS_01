# Auth Server

Backend for the authentication system.

Run locally:

```
cd server
npm install
npm run dev
```

Create a `.env` file from `.env.example`.

Example `.env` for local development:

```env
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=super_secret_jwt_key
CLIENT_URL=http://localhost:3000
PORT=4000
```

For production, set `CLIENT_URL` to your deployed frontend origin and keep `JWT_SECRET` secure.
