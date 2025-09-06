import { Product } from '@/lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { DoubleTap } from '@/components/ui/double-tap';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ product, showActions, onEdit, onDelete }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleDoubleTap = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would also call your API to update the wishlist
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card className="overflow-hidden transition-smooth cursor-pointer group h-full flex flex-col border shadow-soft hover:shadow-medium hover:border-primary/20">
      <DoubleTap onDoubleTap={handleDoubleTap} className="aspect-square overflow-hidden relative bg-muted/50">
        <img
          src={product.image}
          alt={product.title}
          className={cn(
            "w-full h-full object-cover group-hover:scale-105 transition-smooth",
            !isImageLoaded && "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        />
        <div className={cn("absolute inset-0 flex items-center justify-center", isImageLoaded && "hidden")}>
          <div className="w-10 h-10 rounded-lg bg-primary/10 animate-pulse"></div>
        </div>
        <Badge
          variant="secondary"
          className="absolute top-3 right-3 text-xs px-2.5 py-0.5 font-medium rounded-md shadow-soft"
        >
          {product.condition}
        </Badge>
        <button
          className="absolute top-3 left-3 p-2 rounded-full bg-background/90 backdrop-blur-sm shadow-soft hover:opacity-100 transition-opacity hover:bg-background touch-feedback"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted ? "text-secondary fill-secondary" : "text-muted-foreground hover:text-secondary"
            )}
          />
        </button>
      </DoubleTap>

      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="font-medium line-clamp-2 text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-base sm:text-lg font-bold text-primary">
              ₹{product.price}
            </p>
            <span className="text-xs px-2.5 py-0.5 bg-accent rounded-full text-accent-foreground font-medium">
              {product.category}
            </span>
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 bg-muted rounded-full"></span>
            {product.sellerName}
          </p>
        </div>

        {showActions && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit?.(product.id);
              }}
              className="flex-1 px-3 py-2 text-xs bg-secondary text-secondary-foreground rounded-md shadow-soft hover:bg-secondary/90 transition-smooth touch-feedback"
              aria-label={`Edit ${product.title}`}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete?.(product.id);
              }}
              className="flex-1 px-3 py-2 text-xs bg-destructive text-destructive-foreground rounded-md shadow-soft hover:bg-destructive/90 transition-smooth touch-feedback"
              aria-label={`Delete ${product.title}`}
            >
              Delete
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};