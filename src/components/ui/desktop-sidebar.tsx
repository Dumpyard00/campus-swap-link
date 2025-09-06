import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, User, Package, Home, Plus, MessageCircle, Settings, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
}

export function DesktopSidebar({ className, collapsed: propCollapsed }: SidebarProps) {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(propCollapsed || false);

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
        <div className={cn(
            "hidden lg:flex flex-col border-r h-[calc(100vh-3.5rem)] bg-background sticky top-14 transition-all duration-300",
            collapsed ? "w-20" : "w-64",
            className
        )}>
            <div className={cn("p-4", collapsed && "flex flex-col items-center")}>
                <div className="flex items-center justify-between mb-6">
                    {!collapsed && <h2 className="font-semibold text-lg">CampusDeals</h2>}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            collapsed && "rotate-180"
                        )} />
                    </Button>
                </div>
                <nav className="space-y-2">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={cn(
                                    "flex items-center gap-3 rounded-md transition-smooth",
                                    collapsed ? "px-0 py-3 justify-center" : "px-4 py-3",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                                title={collapsed ? label : undefined}
                            >
                                <Icon className="h-5 w-5" />
                                {!collapsed && (
                                    <span className={cn("font-medium", isActive && "font-semibold")}>{label}</span>
                                )}
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
