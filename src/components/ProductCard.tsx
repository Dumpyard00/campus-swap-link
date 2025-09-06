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
      <Card className="overflow-hidden hover:shadow-medium transition-smooth cursor-pointer group">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium line-clamp-2 text-sm leading-tight">
                {product.title}
              </h3>
              <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                {product.condition}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-primary">
                ${product.price}
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