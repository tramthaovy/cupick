import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, User, Tractor, Users } from "lucide-react";

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "buyer";

  const getNavItems = () => {
    if (userRole === "buyer") {
      return [
        {
          icon: Heart,
          label: "Quẹt",
          path: "/swipe",
          active: location.pathname === "/swipe",
        },
        {
          icon: Users,
          label: "Forum",
          path: "/forum",
          active: location.pathname === "/forum",
        },
        {
          icon: MessageCircle,
          label: "Tin nhắn",
          path: "/messages",
          active: location.pathname === "/messages",
        },
        {
          icon: User,
          label: "Profile",
          path: "/profile",
          active: location.pathname === "/profile",
        },
      ];
    } else {
      return [
        {
          icon: Tractor,
          label: "Trang trại",
          path: "/farm",
          active: location.pathname === "/farm",
        },
        {
          icon: Users,
          label: "Forum",
          path: "/forum",
          active: location.pathname === "/forum",
        },
        {
          icon: MessageCircle,
          label: "Tin nhắn",
          path: "/messages",
          active: location.pathname === "/messages",
        },
        {
          icon: User,
          label: "Profile",
          path: "/profile",
          active: location.pathname === "/profile",
        },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1",
                    item.active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
