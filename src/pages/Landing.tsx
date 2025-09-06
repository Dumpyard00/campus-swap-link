import { Link } from 'react-router-dom';
import { HeroButton } from '@/components/ui/button-variants';
import { ShoppingBag, Users, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Landing = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Campus Marketplace',
      description: 'Buy and sell with fellow students and staff in your university community.'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Connect with verified members of your campus for safe and reliable transactions.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Built-in safety features and community guidelines keep your trades secure.'
    },
    {
      icon: Zap,
      title: 'Quick & Easy',
      description: 'List items in seconds and find what you need with smart search and filters.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">CD</span>
            </div>
            <span className="font-bold text-xl">CampusDeals</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Sign In
            </Link>
            <HeroButton asChild>
              <Link to="/auth">Get Started</Link>
            </HeroButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Campus
            <span className="gradient-hero bg-clip-text text-transparent"> Marketplace</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buy and sell textbooks, electronics, furniture, and more with your university community.
            Safe, local, and student-friendly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HeroButton asChild size="lg">
              <Link to="/auth">Start Selling</Link>
            </HeroButton>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Browse Items →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CampusDeals?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted marketplace for college communities across the country.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">200+</div>
              <p className="text-muted-foreground">Partner Universities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <p className="text-muted-foreground">Items Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of students already using CampusDeals to buy and sell with their campus community.
          </p>
          <HeroButton
            asChild
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link to="/auth">Create Your Account</Link>
          </HeroButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CD</span>
            </div>
            <span className="font-bold text-lg">CampusDeals</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 CampusDeals. Making campus trading simple and secure.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;