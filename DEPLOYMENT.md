# Deployment Guide

This guide covers deploying AI QuestHub to production.

## Prerequisites

- Node.js 18+ installed
- A Lovable account with deployment enabled
- Custom domain (optional)

## Production Checklist

### 1. Environment Variables

Ensure all required environment variables are set:

```bash
# No environment variables required for basic deployment
# Add API keys if integrating external services
```

### 2. Build Optimization

The project is configured with optimal Vite settings:

- ✅ Code splitting enabled
- ✅ Asset optimization
- ✅ Tree shaking
- ✅ Minification

### 3. SEO Configuration

Pre-configured SEO elements:

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs

### 4. Performance

Performance features implemented:

- ✅ Lazy loading for routes
- ✅ Image optimization
- ✅ Code splitting
- ✅ Asset compression
- ✅ Cache-control headers

### 5. Security

Security measures in place:

- ✅ Input validation with Zod
- ✅ Rate limiting
- ✅ Error boundary
- ✅ XSS protection
- ✅ HTTPS enforcement

### 6. Monitoring

Production monitoring:

- ✅ Error tracking
- ✅ Analytics integration ready
- ✅ Performance monitoring
- ✅ Console logging (dev only)

## Deployment via Lovable

1. **Click the Publish button** in the Lovable editor (top right)
2. **Review the deployment preview**
3. **Click "Deploy"** to publish to production
4. Your app will be available at `https://your-project.lovable.app`

## Custom Domain Setup

1. Navigate to **Project > Settings > Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 24 hours)

Required DNS records:
```
Type: CNAME
Name: @ (or subdomain)
Value: your-project.lovable.app
```

## Post-Deployment

### Verify Production Build

1. ✅ Check all pages load correctly
2. ✅ Test wallet connection functionality
3. ✅ Verify navigation and scroll behavior
4. ✅ Test mobile responsiveness
5. ✅ Validate SEO meta tags
6. ✅ Check console for errors
7. ✅ Test performance with Lighthouse

### Monitor Performance

Use these tools:

- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **Lighthouse**: Built into Chrome DevTools

### SEO Verification

1. Submit sitemap to Google Search Console
2. Verify meta tags with social sharing debuggers:
   - Facebook: https://developers.facebook.com/tools/debug
   - Twitter: https://cards-dev.twitter.com/validator

## Troubleshooting

### Build Fails

- Check console for TypeScript errors
- Verify all dependencies are installed
- Clear cache and rebuild

### Assets Not Loading

- Verify asset paths are correct
- Check that images are in `src/assets` folder
- Ensure imports use `@/` alias

### Performance Issues

- Enable production mode
- Check bundle size
- Optimize images
- Use lazy loading for heavy components

## Rollback

If issues occur in production:

1. Open **History** in Lovable (clock icon)
2. Find the last working version
3. Click **"Revert"** to restore
4. Redeploy

## Support

For deployment issues:

- Lovable Documentation: https://docs.lovable.dev
- Discord Community: https://discord.com/invite/lovable
- Email Support: support@lovable.dev
