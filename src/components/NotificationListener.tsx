import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Bell } from "lucide-react";

export default function NotificationListener() {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    // Subscribe to real-time notifications
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new as {
            id: string;
            type: string;
            title: string;
            message: string;
          };

          // Show toast notification
          toast({
            title: (
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                {notification.title}
              </div>
            ) as any,
            description: notification.message,
          });

          // Mark as read after a delay
          setTimeout(async () => {
            await supabase
              .from("notifications")
              .update({ read: true })
              .eq("id", notification.id);
          }, 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  return null;
}
