import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, User, Package, Home, Plus, MessageCircle, Search, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DesktopSidebar } from './ui/desktop-sidebar';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  showHeader?: boolean;
  showSearch?: boolean;
}

export const Layout = ({
  children,
  showBottomNav = true,
  showHeader = true,
  showSearch = false
}: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        if (window.scrollY > 300) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      } else {
        setIsScrolled(false);
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <header className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          isScrolled && "shadow-sm"
        )}>
          <div className="container flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CD</span>
              </div>
              <span className="font-bold text-lg hidden md:block">CampusDeals</span>
            </Link>

            {showSearch && !isMobile && (
              <div className="relative mx-4 flex-1 max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for textbooks, electronics, furniture..."
                  className="pl-10"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild className="hidden md:flex touch-feedback">
                <Link to="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden md:flex touch-feedback">
                <Link to="/messages">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="touch-feedback">
                <Link to="/dashboard">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {showHeader && !isMobile && <DesktopSidebar />}

        <main className={cn("flex-1", showBottomNav && "pb-16 lg:pb-0")}>
          {children}
        </main>
      </div>

      {showBottomNav && isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <div className="grid h-16 max-w-lg mx-auto grid-cols-6">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "inline-flex flex-col items-center justify-center px-2 py-2 text-xs transition-smooth touch-feedback",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5 mb-1", isActive && "text-primary")} />
                  <span className={cn("text-[11px]", isActive && "font-medium")}>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Desktop notifications or banner that only appears on desktop view */}
      <div className="hidden lg:block fixed bottom-6 right-6 left-6 ml-64 z-40">
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-lg p-4 shadow-md max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm">
              <span className="font-medium">New messages:</span> You have 2 unread messages from sellers
            </p>
          </div>
          <Button size="sm" variant="outline" className="touch-feedback">View Messages</Button>
        </div>
      </div>

      {/* Back to top button on mobile */}
      {isMobile && showScrollTop && (
        <Button
          size="icon"
          variant="secondary"
          className="fixed bottom-20 right-4 z-40 rounded-full shadow-medium opacity-80"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};