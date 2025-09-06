import { Product } from '@/lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ product, showActions, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-medium transition-smooth cursor-pointer group h-full flex flex-col">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-xs opacity-90"
          >
            {product.condition}
          </Badge>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            <h3 className="font-medium line-clamp-2 text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-primary">
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