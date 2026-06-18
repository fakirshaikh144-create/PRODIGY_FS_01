# HTTPS Reverse Proxy Setup (Mixed Content Fix)

## Problem
- Frontend: `https://prodigy-fs-01-weld.vercel.app/` (HTTPS)
- Backend: `http://3.91.185.146:4000` (HTTP)
- Result: **Mixed Content Error** - browsers block HTTP requests from HTTPS pages

## Solution
Set up NGINX reverse proxy with SSL/TLS on your EC2 instance.

---

## Step 1: SSH into EC2 Instance

```bash
ssh -i your-key.pem ubuntu@3.91.185.146
```

---

## Step 2: Install NGINX and Certbot

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

---

## Step 3: Copy NGINX Configuration

Copy the content from `nginx.conf` in this repo to your server:

```bash
sudo nano /etc/nginx/sites-available/auth-backend
```

Paste the entire configuration from `nginx.conf`. Save with `Ctrl+X`, then `Y`, then `Enter`.

---

## Step 4: Enable the NGINX Site

```bash
sudo ln -s /etc/nginx/sites-available/auth-backend /etc/nginx/sites-enabled/auth-backend
sudo rm /etc/nginx/sites-enabled/default
```

Test configuration:
```bash
sudo nginx -t
```

---

## Step 5: Obtain SSL Certificate with Certbot

For a self-signed certificate (quick, but shows warning in browser):
```bash
sudo certbot certonly --standalone -d 3.91.185.146 --non-interactive --agree-tos -m your-email@example.com
```

For a proper certificate (requires domain name, not just IP - recommended):
- Point your domain to `3.91.185.146`
- Then run:
```bash
sudo certbot certonly --standalone -d your-domain.com --non-interactive --agree-tos -m your-email@example.com
```

---

## Step 6: Update NGINX Config Path (if needed)

If Certbot created certificates at a different path, update the paths in the NGINX config:

```bash
sudo nano /etc/nginx/sites-available/auth-backend
```

Find these lines and update the paths:
```nginx
ssl_certificate /etc/letsencrypt/live/YOUR-DOMAIN-OR-IP/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/YOUR-DOMAIN-OR-IP/privkey.pem;
```

---

## Step 7: Start and Enable NGINX

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl restart nginx
```

Check status:
```bash
sudo systemctl status nginx
```

---

## Step 8: Update Firewall (if needed)

Allow HTTPS traffic:
```bash
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
sudo ufw enable
```

---

## Step 9: Verify Backend is Still Running

Make sure your Express server is running on port 4000:

```bash
cd /path/to/server
npm start
```

Or with PM2 (for production):
```bash
sudo npm install -g pm2
pm2 start src/index.js --name "auth-server"
pm2 startup
pm2 save
```

---

## Step 10: Test the Setup

### Test HTTPS endpoint:
```bash
curl -k https://3.91.185.146/api/auth/me
```

Should return: `{"message":"Unauthorized"}` (because no token), not a connection error.

### Test from browser:
Visit: `https://3.91.185.146` - you should see a response from your backend

---

## Step 11: Update Vercel Environment Variable

In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Find or create `NEXT_PUBLIC_API_URL`
3. Set value to: `https://3.91.185.146`
4. Redeploy your frontend

---

## Troubleshooting

### SSL Certificate Error
If you get certificate errors, check if certificate exists:
```bash
sudo ls /etc/letsencrypt/live/
```

### NGINX won't start
Check for syntax errors:
```bash
sudo nginx -t
sudo journalctl -u nginx -n 50
```

### Still getting mixed content error
1. Clear browser cache and reload
2. Check Network tab in DevTools - verify requests are HTTPS
3. Check Vercel environment variable is set correctly
4. Redeploy Vercel project

### Connection refused to localhost:4000
Your Express backend is not running. SSH to EC2 and restart it:
```bash
npm start
# or
pm2 restart auth-server
```

---

## Auto-Renew SSL Certificate

Certbot automatically renews certificates. To test renewal:
```bash
sudo certbot renew --dry-run
```

Schedule renewal with cron:
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```
