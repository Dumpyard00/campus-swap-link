import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryButton, FABButton } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { dummyProducts, CATEGORIES } from '@/lib/dummy-data';
import { Search, Plus, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { RefreshIndicator } from '@/components/ui/refresh-indicator';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Initialize pull-to-refresh
  const { pullDistance, isRefreshing, refreshIndicatorStyle } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
    containerRef
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout showSearch={true}>
      <div ref={containerRef} className="container mx-auto px-4 py-6 space-y-6 max-w-7xl overflow-auto min-h-[calc(100vh-3.5rem)]">
        {isMobile && (
          <RefreshIndicator
            pullDistance={pullDistance}
            threshold={80}
            isRefreshing={isRefreshing}
            style={refreshIndicatorStyle}
          />
        )}
        {/* Mobile Search Bar */}
        <div className="relative md:hidden">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for textbooks, electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && "bg-primary/10 border-primary/20")}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className={cn("space-y-3", isMobile && !showFilters && "hidden")}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Categories</h2>
            <p className="text-sm text-muted-foreground hidden md:block">
              {!isLoading && `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap scrollbar-hide">
            <CategoryButton
              active={!selectedCategory}
              onClick={() => setSelectedCategory('')}
            >
              All
            </CategoryButton>
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </CategoryButton>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              {selectedCategory ? `${selectedCategory} Items` : 'All Items'}
            </h2>
            <p className="text-sm text-muted-foreground md:hidden">
              {!isLoading && `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items found matching your criteria</p>
              <Link to="/products/new">
                <CategoryButton>
                  Be the first to list something!
                </CategoryButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button - Only show on mobile */}
      <FABButton asChild className="lg:hidden">
        <Link to="/products/new">
          <Plus className="h-6 w-6" />
        </Link>
      </FABButton>
    </Layout>
  );
};

export default Products;