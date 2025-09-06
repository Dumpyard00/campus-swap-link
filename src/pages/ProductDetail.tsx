import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dummyProducts, dummyReviews } from '@/lib/dummy-data';
import { ArrowLeft, MessageCircle, Heart, Phone, Star, MapPin } from 'lucide-react';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const product = dummyProducts.find(p => p.id === id);
  const sellerReviews = dummyReviews.filter(r => r.sellerId === product?.sellerId);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled:', product.id);
  };

  const handleContact = () => {
    console.log('Starting chat with seller:', product.sellerId);
    navigate('/messages');
  };

  const handleCall = () => {
    console.log('Calling seller:', product.sellerId);
  };

  const averageRating = sellerReviews.length > 0 
    ? sellerReviews.reduce((sum, review) => sum + review.rating, 0) / sellerReviews.length 
    : 0;

  return (
    <Layout showBottomNav={false}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold leading-tight">
                  {product.title}
                </h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlist}
                >
                  <Heart 
                    className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.condition}</Badge>
              </div>
              
              <p className="text-3xl font-bold text-primary mb-4">
                ₹{product.price}
              </p>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.sellerId}`} />
                      <AvatarFallback>{product.sellerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{product.sellerName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">Student</Badge>
                        <MapPin className="h-3 w-3" />
                        IIT Delhi
                      </p>
                      {sellerReviews.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{averageRating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">
                            ({sellerReviews.length} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleContact}
                variant="outline"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Message
              </Button>
              <Button 
                onClick={handleCall}
                className="bg-primary-solid text-primary-foreground hover:bg-primary-light flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Seller
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold mb-3">Item Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <span className="ml-2 capitalize">{product.condition}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Listed:</span>
                    <span className="ml-2">{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <span className="ml-2">#{product.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Reviews */}
            {sellerReviews.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Seller Reviews</h3>
                  <div className="space-y-3">
                    {sellerReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;