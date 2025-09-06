import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { dummyUser, dummyUserListings, dummyPurchases } from '@/lib/dummy-data';
import { User, Package, ShoppingBag, Edit, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    {
      title: 'Items Listed',
      value: dummyUserListings.length,
      icon: Package,
      description: 'Active listings'
    },
    {
      title: 'Items Purchased',
      value: dummyPurchases.length,
      icon: ShoppingBag,
      description: 'All time'
    },
    {
      title: 'Member Since',
      value: new Date(dummyUser.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      icon: Calendar,
      description: 'Join date'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                <AvatarFallback className="text-xl">
                  {dummyUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{dummyUser.name}</h1>
                <p className="text-muted-foreground mb-2">{dummyUser.email}</p>
                <Badge variant="outline">{dummyUser.campus}</Badge>
              </div>
              
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/products/new">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">Sell Item</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/my-listings">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Listings</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/purchases">
                  <ShoppingBag className="h-6 w-6 mb-2" />
                  <span className="text-sm">Purchases</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4 flex-col">
                <Link to="/products">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="text-sm">Browse</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Listings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Listings
                <Link to="/my-listings" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummyUserListings.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.condition}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Purchases
                <Link to="/purchases" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dummyPurchases.slice(0, 2).map((purchase) => (
                <div key={purchase.id} className="flex items-center space-x-3">
                  <img
                    src={purchase.product.image}
                    alt={purchase.product.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{purchase.product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${purchase.amount}</p>
                    <Badge 
                      variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;