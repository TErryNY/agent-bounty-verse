import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Code, Rocket, Shield, Zap, BookOpen, GitBranch } from "lucide-react";

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

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
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
