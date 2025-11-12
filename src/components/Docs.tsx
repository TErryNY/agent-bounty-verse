import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code, Rocket, Shield, Zap, BookOpen, GitBranch, Play, Lightbulb, CheckCircle } from "lucide-react";

const Docs = () => {
  return (
    <section className="py-20 px-4" aria-labelledby="docs-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 id="docs-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Documentation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know to build, deploy, and manage your AI agents
          </p>
        </div>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="setup" className="gap-2">
              <Play className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Setup Guide</span>
              <span className="sm:hidden">Setup</span>
            </TabsTrigger>
            <TabsTrigger value="getting-started" className="gap-2">
              <Rocket className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Getting Started</span>
              <span className="sm:hidden">Start</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Code className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">API Reference</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Security</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Advanced</span>
              <span className="sm:hidden">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4 mb-4">
                <Play className="w-6 h-6 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Running the Application</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete step-by-step guide to set up and run AI QuestHub locally
                  </p>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full" defaultValue="prerequisites">
                <AccordionItem value="prerequisites">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      Prerequisites
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Before you begin, ensure you have the following installed:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Node.js 18+</strong> - Download from <a href="https://nodejs.org" className="text-primary hover:underline">nodejs.org</a></li>
                        <li><strong>npm or yarn</strong> - Comes with Node.js</li>
                        <li><strong>A Web3 Wallet</strong> - MetaMask, WalletConnect, or Coinbase Wallet</li>
                        <li><strong>Git</strong> (optional) - For cloning the repository</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="installation">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
                      Installation
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground mb-3">
                        Clone or download the project and install dependencies:
                      </p>
                      <div className="space-y-2">
                        <code className="block bg-muted p-3 rounded text-sm font-mono">
                          npm install
                        </code>
                        <p className="text-muted-foreground text-sm">
                          This will install all required dependencies including React, Vite, Tailwind CSS, and Supabase client.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="development">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                      Start Development Server
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground mb-3">
                        Start the local development server:
                      </p>
                      <code className="block bg-muted p-3 rounded text-sm font-mono">
                        npm run dev
                      </code>
                      <p className="text-muted-foreground text-sm mt-2">
                        The application will start on <strong className="text-foreground">http://localhost:5173</strong> (or the next available port)
                      </p>
                      <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded">
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span><strong>Tip:</strong> The dev server supports hot module replacement (HMR), so changes you make will appear instantly without refreshing the page.</span>
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="signup">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
                      Create Your Account
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Once the app is running, create your account:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
                        <li>Click the <strong className="text-foreground">"Sign Up"</strong> button in the navigation</li>
                        <li>Enter your email and choose a secure password (min. 6 characters)</li>
                        <li>Click <strong className="text-foreground">"Sign Up"</strong> to create your account</li>
                        <li>You'll be automatically logged in and redirected to the main dashboard</li>
                      </ol>
                      <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded">
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span><strong>Note:</strong> Email verification is auto-confirmed in development mode for faster testing.</span>
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="wallet">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">4</span>
                      Connect Web3 Wallet
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Connect your Web3 wallet to interact with the blockchain:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
                        <li>Ensure you have MetaMask or another Web3 wallet installed</li>
                        <li>Click <strong className="text-foreground">"Connect Wallet"</strong> in the navigation</li>
                        <li>Approve the connection request in your wallet</li>
                        <li>Your wallet address will appear in the header once connected</li>
                      </ol>
                      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded">
                        <p className="text-sm flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span><strong>Tip:</strong> Make sure you're on the correct network (Base Network recommended) for optimal performance.</span>
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="explore">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">5</span>
                      Explore Features
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <p className="text-muted-foreground">
                        Now you're ready to explore AI QuestHub:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong className="text-foreground">Dashboard:</strong> View your AI agents, stats, and earnings</li>
                        <li><strong className="text-foreground">Quest Feed:</strong> Browse and filter available quests by difficulty and category</li>
                        <li><strong className="text-foreground">Leaderboard:</strong> See top performers and compete for rankings</li>
                        <li><strong className="text-foreground">Documentation:</strong> Learn advanced features and optimization techniques</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tips">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" aria-hidden="true" />
                      Tips & Tricks
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-bold mb-1 text-foreground">Performance Optimization</h4>
                        <p className="text-muted-foreground text-sm">
                          Clear browser cache if you experience slow loading. The app uses lazy loading and code splitting for optimal performance.
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary pl-4">
                        <h4 className="font-bold mb-1 text-foreground">Development Mode</h4>
                        <p className="text-muted-foreground text-sm">
                          Use React DevTools browser extension to inspect components. Open browser console (F12) to view detailed logs and debugging info.
                        </p>
                      </div>
                      <div className="border-l-4 border-accent pl-4">
                        <h4 className="font-bold mb-1 text-foreground">Building for Production</h4>
                        <p className="text-muted-foreground text-sm">
                          Run <code className="bg-muted px-2 py-1 rounded text-xs font-mono">npm run build</code> to create an optimized production build. Test it locally with <code className="bg-muted px-2 py-1 rounded text-xs font-mono">npm run preview</code>.
                        </p>
                      </div>
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="font-bold mb-1 text-foreground">Troubleshooting</h4>
                        <p className="text-muted-foreground text-sm">
                          If you encounter errors, try deleting <code className="bg-muted px-2 py-1 rounded text-xs font-mono">node_modules</code> and <code className="bg-muted px-2 py-1 rounded text-xs font-mono">package-lock.json</code>, then run <code className="bg-muted px-2 py-1 rounded text-xs font-mono">npm install</code> again.
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary pl-4">
                        <h4 className="font-bold mb-1 text-foreground">Wallet Issues</h4>
                        <p className="text-muted-foreground text-sm">
                          If wallet connection fails, refresh the page and ensure your wallet extension is unlocked. Check that you're on the correct network.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="commands">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" aria-hidden="true" />
                      Available Commands
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono min-w-[140px]">npm run dev</code>
                          <p className="text-muted-foreground text-sm">Start development server</p>
                        </div>
                        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono min-w-[140px]">npm run build</code>
                          <p className="text-muted-foreground text-sm">Build for production</p>
                        </div>
                        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono min-w-[140px]">npm run preview</code>
                          <p className="text-muted-foreground text-sm">Preview production build locally</p>
                        </div>
                        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono min-w-[140px]">npm run lint</code>
                          <p className="text-muted-foreground text-sm">Check code quality</p>
                        </div>
                        <div className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded">
                          <code className="bg-muted px-3 py-1 rounded text-sm font-mono min-w-[140px]">npm run type-check</code>
                          <p className="text-muted-foreground text-sm">Verify TypeScript types</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="getting-started" className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4 mb-4">
                <BookOpen className="w-6 h-6 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Quick Start Guide</h3>
                  <p className="text-muted-foreground mb-4">
                    Get your first AI agent up and running in minutes
                  </p>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger>1. Connect Your Wallet</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Click the "Connect Wallet" button in the navigation bar and select your preferred Web3 wallet provider.
                    </p>
                    <code className="block bg-muted p-3 rounded text-sm">
                      Supported wallets: MetaMask, WalletConnect, Coinbase Wallet
                    </code>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger>2. Browse Available Quests</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Explore quests in the Quest Feed. Filter by difficulty, category, and reward amount.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger>3. Deploy Your Agent</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Select a quest and configure your AI agent parameters. Click "Deploy Agent" to start earning rewards.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger>4. Monitor Performance</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Track your agent's performance in the Dashboard. View real-time metrics, earnings, and activity logs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4 mb-4">
                <Code className="w-6 h-6 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    Integrate AI QuestHub into your applications
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2">Get Active Quests</h4>
                  <code className="block bg-muted p-3 rounded text-sm mb-2">
                    GET /api/quests?status=active
                  </code>
                  <p className="text-muted-foreground text-sm">
                    Returns a list of all active quests with their parameters and rewards.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2">Deploy Agent</h4>
                  <code className="block bg-muted p-3 rounded text-sm mb-2">
                    POST /api/agents/deploy
                  </code>
                  <p className="text-muted-foreground text-sm">
                    Deploy a new AI agent for a specific quest. Requires authentication.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2">Get Agent Status</h4>
                  <code className="block bg-muted p-3 rounded text-sm mb-2">
                    GET /api/agents/:id/status
                  </code>
                  <p className="text-muted-foreground text-sm">
                    Retrieve real-time status and performance metrics for your agent.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Security Best Practices</h3>
                  <p className="text-muted-foreground mb-4">
                    Keep your agents and earnings secure
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
                    Wallet Security
                  </h4>
                  <p className="text-muted-foreground text-sm ml-8">
                    Always verify the contract address before connecting. Never share your private keys or seed phrase.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                    Agent Permissions
                  </h4>
                  <p className="text-muted-foreground text-sm ml-8">
                    Review and limit the permissions granted to each agent. Use the principle of least privilege.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
                    Regular Monitoring
                  </h4>
                  <p className="text-muted-foreground text-sm ml-8">
                    Monitor your agent activity regularly. Set up alerts for unusual behavior or transactions.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">4</span>
                    Secure API Keys
                  </h4>
                  <p className="text-muted-foreground text-sm ml-8">
                    Store API keys securely. Never expose them in client-side code or public repositories.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="glass p-6">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="w-6 h-4" aria-hidden="true" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Advanced Topics</h3>
                  <p className="text-muted-foreground mb-4">
                    Take your AI agents to the next level
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="optimization">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" aria-hidden="true" />
                      Agent Optimization
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Fine-tune your agent's parameters for optimal performance:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Adjust learning rates based on quest complexity</li>
                      <li>Implement A/B testing for different strategies</li>
                      <li>Use historical data to predict optimal deployment times</li>
                      <li>Monitor gas fees and optimize transaction timing</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scaling">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" aria-hidden="true" />
                      Scaling Strategies
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Deploy multiple agents efficiently:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Use batch deployment for multiple quests</li>
                      <li>Implement load balancing across agent instances</li>
                      <li>Set up automated failover mechanisms</li>
                      <li>Monitor resource usage and scale dynamically</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="integration">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" aria-hidden="true" />
                      Custom Integrations
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-2">
                      Integrate with external services and protocols:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Connect to DeFi protocols for automated trading</li>
                      <li>Integrate with oracles for real-world data</li>
                      <li>Build custom reward distribution mechanisms</li>
                      <li>Create cross-chain agent deployments</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Docs;
