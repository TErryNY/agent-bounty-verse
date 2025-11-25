import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, ExternalLink, AlertCircle } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";

interface WalletProvider {
    id: string;
    name: string;
    description: string;
    icon: string;
    isInstalled: () => boolean;
    downloadUrl: string;
}

interface WalletConnectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const WalletConnectModal = ({ open, onOpenChange }: WalletConnectModalProps) => {
    const { connect, isConnecting } = useWallet();
    const { toast } = useToast();
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

    const walletProviders: WalletProvider[] = [
        {
            id: "metamask",
            name: "MetaMask",
            description: "The most popular Web3 wallet",
            icon: "🦊",
            isInstalled: () => {
                return typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
            },
            downloadUrl: "https://metamask.io/download/",
        },
        {
            id: "coinbase",
            name: "Coinbase Wallet",
            description: "Secure wallet from Coinbase",
            icon: "🔷",
            isInstalled: () => {
                return typeof window.ethereum !== "undefined" && window.ethereum.isCoinbaseWallet;
            },
            downloadUrl: "https://www.coinbase.com/wallet/downloads",
        },
        {
            id: "rabby",
            name: "Rabby Wallet",
            description: "Multi-chain wallet for DeFi",
            icon: "🐰",
            isInstalled: () => {
                return typeof window.ethereum !== "undefined" && window.ethereum.isRabby;
            },
            downloadUrl: "https://rabby.io/",
        },
        {
            id: "rainbow",
            name: "Rainbow",
            description: "Fun, simple, and secure",
            icon: "🌈",
            isInstalled: () => {
                return typeof window.ethereum !== "undefined" && window.ethereum.isRainbow;
            },
            downloadUrl: "https://rainbow.me/",
        },
    ];

    const handleConnect = async (provider: WalletProvider) => {
        setSelectedProvider(provider.id);

        if (!provider.isInstalled()) {
            toast({
                title: `${provider.name} Not Found`,
                description: `Please install ${provider.name} browser extension first.`,
                variant: "destructive",
                action: (
                    <Button
                        variant="outline"
                        size="sm"
                        asChild
                    >
                        <a
                            href={provider.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                        >
                            Install
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </Button>
                ),
            });
            setSelectedProvider(null);
            return;
        }

        try {
            await connect();
            toast({
                title: "Wallet Connected",
                description: `Successfully connected with ${provider.name}!`,
            });
            onOpenChange(false);
        } catch (error) {
            console.error("Connection error:", error);
            toast({
                title: "Connection Failed",
                description: error instanceof Error ? error.message : "Failed to connect wallet",
                variant: "destructive",
            });
        } finally {
            setSelectedProvider(null);
        }
    };

    // Check if any wallet is installed
    const anyWalletInstalled = walletProviders.some(p => p.isInstalled());

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        Connect Wallet
                    </DialogTitle>
                    <DialogDescription>
                        Choose your preferred Web3 wallet to connect
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 mt-4">
                    {!anyWalletInstalled && (
                        <Card className="p-4 bg-warning/10 border-warning/30">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-warning">No Wallet Detected</p>
                                    <p className="text-xs text-muted-foreground">
                                        You need a Web3 wallet to use this app. Click on any wallet below to install.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {walletProviders.map((provider) => {
                        const installed = provider.isInstalled();
                        const isSelected = selectedProvider === provider.id;

                        return (
                            <Card
                                key={provider.id}
                                className={`p-4 transition-all cursor-pointer hover:bg-muted/50 ${installed ? "border-primary/30" : "opacity-70"
                                    } ${isSelected ? "ring-2 ring-primary" : ""}`}
                                onClick={() => !isConnecting && handleConnect(provider)}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="text-3xl">{provider.icon}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold">{provider.name}</h4>
                                                {installed && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30">
                                                        Installed
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {provider.description}
                                            </p>
                                        </div>
                                    </div>

                                    {!installed ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <a
                                                href={provider.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1"
                                            >
                                                Install
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            disabled={isConnecting && isSelected}
                                        >
                                            {isConnecting && isSelected ? "Connecting..." : "Connect"}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> This app is configured for the <strong>Base</strong> network. Your wallet will be prompted to switch networks if needed.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WalletConnectModal;
