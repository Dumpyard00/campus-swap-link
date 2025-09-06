import { Product } from '@/lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ product, showActions, onEdit, onDelete }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-medium transition-smooth cursor-pointer group h-full flex flex-col border-transparent hover:border-primary/20">
        <div className="aspect-square overflow-hidden relative bg-muted/50">
          <img
            src={product.image}
            alt={product.title}
            className={cn(
              "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              !isImageLoaded && "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
          />
          <div className={cn("absolute inset-0 flex items-center justify-center", isImageLoaded && "hidden")}>
            <div className="w-8 h-8 rounded-lg bg-primary/10 animate-pulse"></div>
          </div>
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-xs opacity-90"
          >
            {product.condition}
          </Badge>
          <button
            className="absolute top-2 left-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add wishlist logic here
            }}
          >
            <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        </div>

        <CardContent className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            <h3 className="font-medium line-clamp-2 text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg font-bold text-primary">
                ₹{product.price}
              </p>
              <p className="text-xs text-muted-foreground">
                {product.category}
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              by {product.sellerName}
            </p>
          </div>

          {showActions && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.(product.id);
                }}
                className="flex-1 px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-smooth"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.(product.id);
                }}
                className="flex-1 px-3 py-1 text-xs bg-destructive text-destructive-foreground rounded hover:bg-destructive/80 transition-smooth"
              >
                Delete
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};