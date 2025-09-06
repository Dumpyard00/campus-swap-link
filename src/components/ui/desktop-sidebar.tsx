import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart, Package, Home, Plus, MessageCircle, ChevronRight, HelpCircle, Settings } from 'lucide-react';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface SidebarProps {
    className?: string;
    collapsed?: boolean;
}

export function DesktopSidebar({ className, collapsed: propCollapsed }: SidebarProps) {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(propCollapsed || false);

    const navItems = [
        { icon: Home, label: 'Home', path: '/products' },
        { icon: Plus, label: 'Sell Item', path: '/products/new' },
        { icon: Package, label: 'My Items', path: '/my-listings' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: MessageCircle, label: 'Messages', path: '/messages' },
        { icon: Settings, label: 'My Profile', path: '/dashboard' }, // Using the current user's ID
    ];

    return (
        <div
            className={cn(
                "hidden lg:flex flex-col border-r h-[calc(100vh-3.5rem)] bg-background sticky top-14 transition-all duration-300 shadow-sm",
                collapsed ? "w-[72px]" : "w-64",
                className
            )}
            style={{
                "--sidebar-width": collapsed ? "72px" : "256px"
            } as React.CSSProperties}>
            <div className={cn(collapsed ? "p-3" : "p-4", "flex flex-col items-center lg:items-stretch")}>
                <div className={cn("flex items-center justify-end mb-6", collapsed && "w-full")}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn("h-8 w-8 p-0 rounded-full hover:bg-muted", collapsed && "mx-auto")}
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            collapsed && "rotate-180"
                        )} />
                    </Button>
                </div>
                <nav className={cn(
                    "flex flex-col w-full",
                    collapsed ? "items-center space-y-3" : "space-y-1"
                )}>
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path;
                        const isPending = location.pathname.startsWith(path) && path !== '/products';
                        const isHighlighted = isActive || isPending;

                        const navLink = (
                            <Link
                                key={path}
                                to={path}
                                className={cn(
                                    "flex items-center rounded-md transition-all duration-200 relative overflow-hidden group",
                                    collapsed ? "w-11 h-11 justify-center mx-auto" : "px-3 py-2.5 gap-3",
                                    isHighlighted
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {isActive && !collapsed && (
                                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-full" />
                                )}
                                <div className={cn(
                                    "flex items-center justify-center",
                                    collapsed ? "w-6 h-6" : "",
                                    isHighlighted && collapsed && "bg-primary/10 rounded-full p-1"
                                )}>
                                    <Icon className={cn("h-[18px] w-[18px]",
                                        isHighlighted ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )} />
                                </div>
                                {!collapsed && (
                                    <span className={cn(
                                        "text-sm",
                                        isHighlighted ? "font-medium text-primary" : "font-normal group-hover:text-foreground"
                                    )}>{label}</span>
                                )}
                            </Link>
                        );

                        return collapsed ? (
                            <TooltipProvider key={path} delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {navLink}
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-background border shadow-sm">
                                        <span className="text-xs font-medium">{label}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : navLink;
                    })}

                    {!collapsed && (
                        <div className="mt-6 pt-4 border-t border-border/50">
                            <h4 className="text-xs text-muted-foreground/70 font-medium px-3 mb-2">Utilities</h4>
                            <div className="space-y-1">
                                <Link
                                    to="/help"
                                    className="flex items-center rounded-md transition-all duration-200 relative overflow-hidden group px-3 py-2 gap-3 text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <div className="flex items-center justify-center">
                                        <HelpCircle className="h-[16px] w-[16px] text-muted-foreground group-hover:text-foreground" />
                                    </div>
                                    <span className="text-xs font-normal group-hover:text-foreground">Help & Support</span>
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center rounded-md transition-all duration-200 relative overflow-hidden group px-3 py-2 gap-3 text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                    <div className="flex items-center justify-center">
                                        <Settings className="h-[16px] w-[16px] text-muted-foreground group-hover:text-foreground" />
                                    </div>
                                    <span className="text-xs font-normal group-hover:text-foreground">Settings</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            <div className={cn(
                "mt-auto p-4 border-t text-center text-xs text-muted-foreground",
                collapsed && "px-2"
            )}>
                {collapsed ? (
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 rounded-sm bg-primary/10 flex items-center justify-center">
                            <span className="text-[10px] text-primary font-medium">CD</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-center gap-1.5">
                            <div className="w-4 h-4 rounded-sm bg-primary/10 flex items-center justify-center">
                                <span className="text-[8px] text-primary font-medium">CD</span>
                            </div>
                            <span className="text-xs font-medium">CampusDeals</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/70">© {new Date().getFullYear()} All rights reserved</p>
                    </div>
                )}
            </div>
        </div>
    );
}
