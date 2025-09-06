import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, User, Package, Home, Plus, MessageCircle, Settings } from 'lucide-react';
import { Button } from './button';

interface SidebarProps {
    className?: string;
}

export function DesktopSidebar({ className }: SidebarProps) {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/products' },
        { icon: Plus, label: 'Sell', path: '/products/new' },
        { icon: Package, label: 'My Items', path: '/my-listings' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: MessageCircle, label: 'Messages', path: '/messages' },
        { icon: User, label: 'Profile', path: '/dashboard' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className={cn("hidden lg:flex flex-col w-64 border-r h-[calc(100vh-3.5rem)] bg-background sticky top-14", className)}>
            <div className="p-4">
                <h2 className="font-semibold text-lg mb-6">CampusDeals</h2>
                <nav className="space-y-2">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-md transition-smooth",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className={cn("font-medium", isActive && "font-semibold")}>{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t">
                <Button className="w-full" variant="outline" asChild>
                    <Link to="/products/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Sell Item
                    </Link>
                </Button>
            </div>
        </div>
    );
}
