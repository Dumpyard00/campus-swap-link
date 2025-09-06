import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dummyPurchases } from '@/lib/dummy-data';
import { ShoppingBag, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Purchases = () => {
  const handleDownloadReceipt = (purchaseId: string) => {
    console.log('Downloading receipt for:', purchaseId);
    // Simulate receipt download
  };

  const totalSpent = dummyPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Purchase History</h1>
            <p className="text-muted-foreground">
              {dummyPurchases.length} purchase{dummyPurchases.length !== 1 ? 's' : ''} • Total spent: ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Purchases List */}
        {dummyPurchases.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start browsing our marketplace to find great deals from your campus community.
            </p>
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {dummyPurchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Link to={`/products/${purchase.product.id}`} className="shrink-0">
                      <img
                        src={purchase.product.image}
                        alt={purchase.product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Link 
                            to={`/products/${purchase.product.id}`}
                            className="font-semibold hover:text-primary transition-smooth line-clamp-2 text-lg"
                          >
                            {purchase.product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            Sold by {purchase.product.sellerName}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ${purchase.amount.toFixed(2)}
                          </p>
                          <Badge 
                            variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>Category: {purchase.product.category}</span>
                        <span>•</span>
                        <span>Condition: {purchase.product.condition}</span>
                        <span>•</span>
                        <span>Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {purchase.product.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(purchase.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                        
                        {purchase.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            Leave Review
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm">
                          Contact Seller
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Purchases;