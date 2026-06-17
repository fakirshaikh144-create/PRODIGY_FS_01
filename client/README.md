# Auth Client

Frontend using Next.js, TypeScript and Tailwind CSS.

Run locally:

```
cd client
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` or `.env` from `.env.example`.

Example local config:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For Vercel deployment, set `NEXT_PUBLIC_API_URL` in the Vercel dashboard instead of committing it.

For Vercel deployment, set `NEXT_PUBLIC_API_URL` in the Vercel project settings to your backend origin.
Example:
```env
NEXT_PUBLIC_API_URL=http://3.91.185.146:4000
```
