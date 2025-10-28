import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, UserPlus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "أحمد_الفنان",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed1",
      action: "أعجب بفيديوك",
      time: "منذ 5 دقائق",
      icon: Heart,
    },
    {
      id: 2,
      type: "comment",
      user: "سارة_الإبداع",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara1",
      action: "علّق على فيديوك",
      time: "منذ 15 دقيقة",
      icon: MessageCircle,
    },
    {
      id: 3,
      type: "follow",
      user: "محمد_الكوميدي",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed1",
      action: "بدأ متابعتك",
      time: "منذ ساعة",
      icon: UserPlus,
    },
    {
      id: 4,
      type: "trending",
      user: "تيك توك",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=TikTok",
      action: "فيديوك يتصدر الترند! 🔥",
      time: "منذ ساعتين",
      icon: TrendingUp,
    },
    {
      id: 5,
      type: "like",
      user: "نور_السفر",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour1",
      action: "وآخرون 45 أعجبوا بفيديوك",
      time: "منذ 3 ساعات",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            الإشعارات
          </h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-border">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="p-4 hover:bg-muted/50 transition-smooth">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.avatar} alt={notification.user} />
                    <AvatarFallback>{notification.user[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 p-1 rounded-full ${
                      notification.type === "like"
                        ? "bg-primary"
                        : notification.type === "comment"
                        ? "bg-secondary"
                        : notification.type === "follow"
                        ? "bg-accent"
                        : "bg-gradient-primary"
                    }`}
                  >
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span>{" "}
                    <span className="text-muted-foreground">{notification.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>

                {notification.type === "follow" && (
                  <Button
                    size="sm"
                    className="gradient-primary border-0 text-white font-semibold h-8 px-4"
                  >
                    متابعة
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
