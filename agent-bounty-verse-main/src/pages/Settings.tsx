import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, User, Bell, Palette } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Settings() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    quest_updates: true,
    quest_completed: true,
    leaderboard_changes: true,
    email_notifications: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const queryClient = useQueryClient();

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, theme")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: prefsData, isLoading: prefsLoading } = useQuery({
    queryKey: ["notification_preferences", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      if (error && (error as any).code !== "PGRST116") throw error;
      return data || null;
    },
  });

  useEffect(() => {
    if (profileData) {
      setUsername(profileData.username || "");
      setTheme(profileData.theme || "dark");
      setEmail(user?.email || "");
    }
  }, [profileData, user]);

  useEffect(() => {
    if (prefsData) {
      setNotifications({
        quest_updates: prefsData.quest_updates,
        quest_completed: prefsData.quest_completed,
        leaderboard_changes: prefsData.leaderboard_changes,
        email_notifications: prefsData.email_notifications,
      });
    }
  }, [prefsData]);

  const updateAccountMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Account settings updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveAccount = () => {
    updateAccountMutation.mutate();
  };

  const updatePrefsMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("notification_preferences")
        .upsert({ user_id: user.id, ...notifications });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Notification preferences updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["notification_preferences", user?.id] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveNotifications = () => {
    updatePrefsMutation.mutate();
  };

  const updateThemeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .update({ theme })
        .eq("id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      document.documentElement.classList.remove("light", "dark");
      if (theme !== "system") {
        document.documentElement.classList.add(theme);
      }
      toast({ title: "Success", description: "Theme updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSaveTheme = () => {
    updateThemeMutation.mutate();
  };

  if (authLoading || profileLoading || prefsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Settings</h1>

        <Tabs defaultValue="account" className="max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="theme">
              <Palette className="mr-2 h-4 w-4" />
              Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="opacity-60"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
                <Button onClick={handleSaveAccount} disabled={updateAccountMutation.isPending}>
                  {updateAccountMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quest Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when quests are updated
                    </p>
                  </div>
                  <Switch
                    checked={notifications.quest_updates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, quest_updates: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Quest Completed</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you complete a quest
                    </p>
                  </div>
                  <Switch
                    checked={notifications.quest_completed}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, quest_completed: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Leaderboard Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about leaderboard position changes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.leaderboard_changes}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, leaderboard_changes: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email_notifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email_notifications: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveNotifications} disabled={updatePrefsMutation.isPending}>
                  {updatePrefsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Customization</CardTitle>
                <CardDescription>
                  Customize your visual experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Theme</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className="w-full"
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className="w-full"
                    >
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => setTheme("system")}
                      className="w-full"
                    >
                      System
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSaveTheme} disabled={updateThemeMutation.isPending}>
                  {updateThemeMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Apply Theme
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
