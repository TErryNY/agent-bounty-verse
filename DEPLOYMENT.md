# Deployment Guide

This guide covers deploying AI QuestHub to production on Vercel and other platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Vercel Deployment](#vercel-deployment-recommended)
- [Environment Variables](#environment-variables)
- [Alternative Platforms](#alternative-deployment-platforms)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ installed
- A Supabase project set up (https://supabase.com)
- Git repository for your code
- A Vercel account (recommended) or other hosting platform

## Vercel Deployment (Recommended)

### Initial Setup

1. **Push your code to GitHub, GitLab, or Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Build Settings**
   
   Vercel should auto-detect these, but verify:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables Setup

> [!IMPORTANT]
> **This step is CRITICAL**. The app will show a blank screen without these environment variables configured.

1. **In Vercel Dashboard**, navigate to your project
2. Go to **Settings → Environment Variables**
3. Add the following variables:

   | Variable Name | Value | Where to find |
   |--------------|-------|---------------|
   | `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Supabase Dashboard → Project Settings → API |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGc...` (anon/public key) | Supabase Dashboard → Project Settings → API |
   | `VITE_SUPABASE_PROJECT_ID` | `your-project-id` | Supabase Dashboard → Project Settings → General |

4. **Select environments** for each variable:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Save** all variables

### Deploy

1. Click **"Deploy"** or push a commit to trigger deployment
2. Wait for build to complete (usually 1-2 minutes)
3. Visit your deployment URL: `https://your-project.vercel.app`

### Custom Domain (Optional)

1. In Vercel Dashboard, go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Configure DNS based on Vercel's instructions:
   ```
   Type: CNAME or A
   Name: @ (or subdomain)
   Value: cname.vercel-dns.com (or provided IP)
   ```
5. Wait for DNS propagation (up to 24 hours)

## Environment Variables

### Required Variables

All Vite environment variables must be prefixed with `VITE_`:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### Getting Supabase Credentials

1. Go to https://app.supabase.com
2. Select your project
3. Navigate to **Project Settings → API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project ID** → `VITE_SUPABASE_PROJECT_ID`
   - **anon/public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`

3. Never commit `.env` to git (already in `.gitignore`)

## Alternative Deployment Platforms

### Netlify

1. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment variables**: Add the same variables as Vercel (see above)

3. **Redirects**: Create `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Cloudflare Pages

1. **Build settings**:
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Environment variables**: Add the same variables in Cloudflare dashboard

3. **Compatibility flags**: Set Node.js version to 18+

### Self-Hosted with Docker

1. **Create Dockerfile** (example):
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   ENV NODE_ENV=production
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=0 /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run**:
   ```bash
   docker build -t ai-questhub .
   docker run -p 80:80 ai-questhub
   ```

## Post-Deployment

### Verification Checklist

After deploying, verify everything works:

- [ ] **Landing page loads** without blank screen
- [ ] **Authentication works** (sign up/sign in with Supabase)
- [ ] **Quests display** correctly
- [ ] **Navigation** between pages works
- [ ] **Wallet connection** functions properly
- [ ] **Responsive design** works on mobile
- [ ] **No console errors** (open browser DevTools)

### Performance Testing

Test your deployment with:

1. **Google PageSpeed Insights**: https://pagespeed.web.dev
   - Target: 90+ score
   
2. **Lighthouse** (Chrome DevTools):
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### SEO Setup

1. **Submit sitemap** to Google Search Console
   - URL: `https://yoursite.com/sitemap.xml`

2. **Verify meta tags**:
   - Facebook Debugger: https://developers.facebook.com/tools/debug
   - Twitter Card Validator: https://cards-dev.twitter.com/validator

3. **Check structured data**:
   - Google Rich Results Test: https://search.google.com/test/rich-results

## Troubleshooting

### Blank Screen After Deployment

**Symptoms**: The deployed site shows a blank white screen.

**Solution**:
1. ✅ Check browser console (F12) for errors
2. ✅ Verify environment variables are set in Vercel/hosting dashboard
3. ✅ Ensure all three Supabase variables are configured
4. ✅ Check that variable names have `VITE_` prefix
5. ✅ Redeploy after adding variables

### Environment Variables Not Working

**Symptoms**: App can't connect to Supabase, shows errors about missing credentials.

**Solution**:
1. ✅ In hosting dashboard, verify variables are set for the correct environment (Production/Preview)
2. ✅ Variable names must match exactly: `VITE_SUPABASE_URL`, etc.
3. ✅ No extra spaces in variable values
4. ✅ Trigger a new deployment after changing variables (changes don't auto-apply)

### Build Failures

**Symptoms**: Deployment fails during build step.

**Common Causes & Solutions**:
- **TypeScript errors**: Fix in code and redeploy
- **Missing dependencies**: Ensure `package.json` is up-to-date
- **Node version**: Ensure platform uses Node.js 18+
- **Memory issues**: Increase build memory in platform settings

### 404 on Page Refresh

**Symptoms**: Direct URLs or page refreshes show 404 errors.

**Solution**:
- ✅ **Vercel**: Already configured in `vercel.json`
- ✅ **Netlify**: Add `[[redirects]]` to `netlify.toml`
- ✅ **Others**: Configure SPA fallback routing

### Performance Issues

**Symptoms**: Slow loading times, poor Lighthouse scores.

**Optimization Steps**:
1. ✅ Enable gzip/brotli compression (usually automatic)
2. ✅ Optimize images (use WebP format)
3. ✅ Check bundle size: `npm run build` shows chunk sizes
4. ✅ Lazy load heavy components (already implemented)
5. ✅ Use CDN for static assets (automatic on Vercel)

## Rollback Strategy

If production has issues:

### Vercel
1. Go to **Deployments** tab
2. Find last working deployment
3. Click **"..."** → **"Promote to Production"**

### Git-based Rollback
```bash
git revert HEAD
git push origin main
```

## Security Best Practices

- ✅ Never commit `.env` file (check `.gitignore`)
- ✅ Rotate Supabase keys if exposed
- ✅ Use environment-specific credentials
- ✅ Enable HTTPS (automatic on Vercel)
- ✅ Set up CORS in Supabase dashboard

## Monitoring

### Recommended Tools

1. **Vercel Analytics** (built-in)
   - Real user monitoring
   - Web vitals tracking

2. **Sentry** (error tracking)
   - Install: `npm i @sentry/react`
   - Track runtime errors

3. **LogRocket** (session replay)
   - Debug user issues
   - See what users experienced

## Support

Need help?

- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Vite**: https://vitejs.dev/guide
- **Project Issues**: Check browser console first, then review this guide
