import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { CategoryButton, FABButton } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import { dummyProducts, CATEGORIES } from '@/lib/dummy-data';
import { Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout showSearch={true}>
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Mobile Search Bar */}
        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for textbooks, electronics, furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Categories</h2>
            <p className="text-sm text-muted-foreground hidden md:block">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
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
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items found matching your criteria</p>
              <Link to="/products/new">
                <CategoryButton>
                  Be the first to list something!
                </CategoryButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6">
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