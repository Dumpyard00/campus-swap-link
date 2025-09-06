import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./button";
import { forwardRef } from "react";

// Hero button variant for landing page
export const HeroButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "gradient-hero text-primary-foreground hover:shadow-medium transition-smooth font-medium px-8 py-3 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
HeroButton.displayName = "HeroButton";

// FAB (Floating Action Button) variant
export const FABButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-strong hover:shadow-medium transition-smooth z-50",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
FABButton.displayName = "FABButton";

// Category button variant
export const CategoryButton = forwardRef<HTMLButtonElement, ButtonProps & { active?: boolean }>(
  ({ className, children, active, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "transition-smooth",
          active 
            ? "bg-primary text-primary-foreground border-primary" 
            : "hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
CategoryButton.displayName = "CategoryButton";