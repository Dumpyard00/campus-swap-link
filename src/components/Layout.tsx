import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, Package, Home, Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showHeader?: boolean;
}

export const Layout = ({ children, showBottomNav = true, showHeader = true }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/products' },
    { icon: Plus, label: 'Sell', path: '/products/new' },
    { icon: Package, label: 'My Items', path: '/my-listings' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary-solid flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CD</span>
              </div>
              <span className="font-bold text-lg hidden md:block">CampusDeals</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                <Link to="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                <Link to="/messages">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className={cn("flex-1", showBottomNav && "pb-16")}>
        {children}
      </main>

      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t md:hidden">
          <div className="grid h-16 max-w-lg mx-auto grid-cols-6">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "inline-flex flex-col items-center justify-center px-2 py-2 text-xs transition-smooth",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mb-1", isActive && "text-primary")} />
                  <span className={cn(isActive && "font-medium")}>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};