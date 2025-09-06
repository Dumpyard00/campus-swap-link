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
  const [showMessageAlert, setShowMessageAlert] = useState(true);

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
    { icon: Plus, label: 'Sell Item', path: '/products/new' },
    { icon: Package, label: 'My Items', path: '/my-listings' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/seller/1' }, // Using the current user's ID
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {showHeader && (
        <header className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
          isScrolled ? "shadow-sm" : ""
        )} role="banner">
          <div className="container-responsive flex h-14 items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-2.5 mr-6 focus-ring rounded-md p-1 -m-1"
                aria-label="CampusDeals home"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center shadow-sm">
                  <span className="text-primary-foreground font-bold text-sm">CD</span>
                </div>
                <span className="font-semibold text-lg hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">CampusDeals</span>
              </Link>

              {!isMobile && (
                <nav className="hidden lg:flex items-center space-x-5" role="navigation" aria-label="Main navigation">
                  <Link
                    to="/products"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1"
                    aria-label="Browse products"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/products/new"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1"
                    aria-label="Sell an item"
                  >
                    Sell
                  </Link>
                </nav>
              )}
            </div>

            {showSearch && !isMobile && (
              <div className="relative mx-4 flex-1 max-w-md hidden md:block">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" aria-hidden="true" />
                  <Input
                    placeholder="Search for textbooks, electronics, furniture..."
                    className="pl-10 h-9 rounded-lg border-input bg-muted/30 focus:bg-background transition-colors"
                    aria-label="Search products"
                    role="searchbox"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full h-9 w-9 p-0 lg:w-auto lg:px-3 touch-target"
              >
                <Link to="/seller/1" aria-label="Go to your seller profile" className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10">
                    <User className="h-3 w-3 text-primary" aria-hidden="true" />
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">Profile</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {showHeader && !isMobile && <DesktopSidebar />}

        <main
          id="main-content"
          className={cn(
            "flex-1 transition-all duration-300",
            showBottomNav && "pb-16 lg:pb-0",
            !isMobile && "px-5 py-5 lg:px-8"
          )}
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>

      {showBottomNav && isMobile && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t md:hidden shadow-medium"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="grid h-16 max-w-lg mx-auto grid-cols-6">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "inline-flex flex-col items-center justify-center px-2 py-2 text-xs transition-smooth touch-feedback focus-ring rounded-md",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={label}
                >
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}>
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <span className={cn("text-xs mt-0.5", isActive && "font-medium")}>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Desktop notifications or banner that only appears on desktop view */}
      {showMessageAlert && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-40" style={{ left: "calc(var(--sidebar-width, 72px) + 1.5rem)" }}>
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border rounded-lg p-3.5 shadow-sm max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm">
                <span className="font-medium text-primary">New messages:</span> You have 2 unread messages from sellers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2.5 text-xs"
                onClick={() => setShowMessageAlert(false)}
              >
                Dismiss
              </Button>
              <Button size="sm" variant="default" className="h-8 px-2.5 text-xs" asChild>
                <Link to="/messages">View Messages</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Back to top button on mobile */}
      {isMobile && showScrollTop && (
        <Button
          size="icon"
          variant="secondary"
          className="fixed bottom-20 right-4 z-40 rounded-full shadow-strong h-12 w-12"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};