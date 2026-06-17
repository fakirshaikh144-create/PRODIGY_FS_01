# Deployment (Ubuntu on AWS)

1. Prepare server

```
ssh ubuntu@your-server-ip
sudo apt update && sudo apt install -y curl build-essential
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

2. Clone repo and install

```
git clone <repo>
cd <repo>/server
npm install
```

3. Environment

Create `/home/ubuntu/app/.env` with `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT` set. Do NOT commit `.env`.

4. Run with PM2

```
sudo npm install -g pm2
pm2 start src/index.js --name auth-server
pm2 save
pm2 startup
```

5. Optional: Nginx reverse proxy (example)

```
sudo apt install nginx
sudo vi /etc/nginx/sites-available/auth

# server block example
server {
  listen 80;
  server_name your.domain.com;

  location / {
    proxy_pass http://localhost:4000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}

sudo ln -s /etc/nginx/sites-available/auth /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

6. HTTPS

Use Certbot to obtain certificates and enable HTTPS.

8. Vercel frontend configuration

  - In your Vercel project, add `NEXT_PUBLIC_API_URL` to Environment Variables.
  - Set its value to your backend origin, for example:
    `http://3.91.185.146:4000` or `https://your-domain.com`.
  - This ensures the frontend uses the deployed backend rather than localhost.

9. Backend environment variables

  - `MONGO_URI` should point to the MongoDB instance used by the server.
  - `JWT_SECRET` must be a strong secret and must not be committed.
  - `CLIENT_URL` should match the deployed frontend origin.

7. CORS

Set `CLIENT_URL` to your deployed frontend origin (e.g. `https://your-frontend.vercel.app`) so CORS allows only that origin.
