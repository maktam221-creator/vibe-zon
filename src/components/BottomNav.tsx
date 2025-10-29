import { Home, Compass, PlusSquare, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: User, label: "الملف الشخصي", path: "/profile" },
    { icon: Bell, label: "الإشعارات", path: "/notifications" },
    { icon: PlusSquare, label: "إنشاء", path: "/create" },
    { icon: Compass, label: "اكتشف", path: "/discover" },
    { icon: Home, label: "الرئيسية", path: "/" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          const isCreate = item.path === "/create";

          if (isCreate) {
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  size="icon"
                  className="h-12 w-12 gradient-primary border-0 glow-primary"
                >
                  <Icon className="h-6 w-6" />
                </Button>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 transition-smooth"
            >
              <Icon
                className={`h-6 w-6 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
