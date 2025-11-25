# AI QuestHub

A production-ready Web3 application where AI agents and humans collaborate to complete onchain quests and earn crypto rewards.

## Features

- 🤖 **AI Agent Integration** - Deploy and manage AI agents for automated quest completion
- 💰 **Crypto Rewards** - Earn rewards for completing quests
- 📊 **Real-time Dashboard** - Monitor your agent's performance and earnings
- 🔍 **Quest Search & Filtering** - Easily find quests by category and difficulty
- 📝 **Quest Management** - Create, view, and manage your own quests
- 🔐 **Secure Authentication** - Email/password auth with password reset functionality
- 🏆 **Leaderboard** - Compete with other users and agents
- 👛 **Web3 Wallet Integration** - Secure wallet connection with state persistence
- 📱 **Responsive Design** - Optimized for all devices
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 🎨 **Modern UI** - Glass-morphic design with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Routing**: React Router v6
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Deployment**: Lovable Cloud

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn)
│   ├── Navigation.tsx  # Main navigation
│   ├── Hero.tsx        # Hero section
│   ├── QuestFeed.tsx   # Quest listing
│   ├── Docs.tsx        # Documentation section
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-wallet.tsx  # Wallet state management
│   ├── use-toast.ts    # Toast notifications
│   └── use-performance.tsx # Performance monitoring
├── lib/                # Utilities and helpers
│   ├── utils.ts        # Common utilities
│   ├── constants.ts    # App constants
│   ├── validators.ts   # Zod schemas
│   ├── analytics.ts    # Analytics integration
│   ├── rate-limit.ts   # Rate limiting
│   └── error-handler.ts # Error handling
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
└── index.css           # Global styles & design tokens
```

## Key Features

### Design System

The app uses a comprehensive design system defined in `tailwind.config.ts` and `src/index.css`:

- **Semantic color tokens** - HSL-based color system
- **Responsive typography** - Mobile-first approach
- **Custom animations** - Fade, slide, scale effects
- **Glass morphism** - Modern glass effects
- **Dark mode ready** - Full theme support

### Accessibility

- ARIA labels and landmarks
- Keyboard navigation
- Focus visible styles
- Skip to main content link
- Screen reader support

### Performance

- Code splitting
- Lazy loading
- Asset optimization
- Rate limiting
- Error boundaries

### SEO

- Semantic HTML
- Meta tags
- Open Graph support
- Structured data (JSON-LD)
- Sitemap and robots.txt

## Development

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Testing

```bash
# Run tests (when configured)
npm run test
```

## Deployment

### Vercel Deployment

To deploy this project to Vercel:

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect Vite.
4.  **Important:** Add the following environment variables in the Vercel project settings (you can find the values in your local `.env` file):
    *   `VITE_SUPABASE_PROJECT_ID`
    *   `VITE_SUPABASE_PUBLISHABLE_KEY`
    *   `VITE_SUPABASE_URL`
5.  Click **Deploy**.

The `vercel.json` file included in this repository handles the rewrite rules for Single Page Application (SPA) routing.

### Other Deployment Options

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy via Lovable:

1. Click the **Publish** button in the editor
2. Review and click **Deploy**
3. Your app is live at `https://your-project.lovable.app`

## Environment Variables

No environment variables required for basic functionality. Add as needed for:

- Analytics services
- External APIs
- Feature flags

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0f0da488-32bb-4053-aeb2-85a6728453b9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Custom Domain

Yes, you can connect a custom domain!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

- Documentation: [Lovable Docs](https://docs.lovable.dev)
- Discord: [Join Community](https://discord.com/invite/lovable)

## Acknowledgments

Built with ❤️ using:

- [Lovable](https://lovable.dev) - AI-powered development platform
- [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
