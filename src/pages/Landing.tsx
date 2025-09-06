import { Link } from 'react-router-dom';
import { HeroButton } from '@/components/ui/button-variants';
import { ShoppingBag, Users, Shield, Zap, ArrowRight, Star, BookOpen, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Landing = () => {
  const isMobile = useIsMobile();

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

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Computer Science Major",
      text: "I sold my old laptop and textbooks in just two days! The interface is so intuitive and the community is great."
    },
    {
      name: "Sarah Miller",
      role: "Biology Student",
      text: "Found my apartment furniture at half the retail price. CampusDeals saved me so much money as a new student!"
    },
    {
      name: "Marcus Lee",
      role: "Engineering Graduate",
      text: "When I graduated, I was able to sell everything I couldn't take with me. The process was seamless and secure."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold">CD</span>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">CampusDeals</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-smooth font-medium"
              aria-label="Sign in to your account"
            >
              Sign In
            </Link>
            <HeroButton asChild>
              <Link to="/auth" aria-label="Get started with CampusDeals">Get Started</Link>
            </HeroButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 md:py-28 lg:py-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(var(--primary-rgb),0.12),transparent)]"></div>

        {/* Decorative elements */}
        <div className="absolute hidden md:block -top-24 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute hidden md:block bottom-12 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center px-3 py-1.5 mb-8 border border-primary/20 bg-primary/5 rounded-full animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse-slow"></span>
            <span className="text-sm font-medium text-primary">Trusted by 50,000+ students</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight animate-fade-in">
            Your Campus
            <span className="gradient-hero bg-clip-text text-transparent"> Marketplace</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-100">
            Buy and sell textbooks, electronics, furniture, and more with your university community.
            Safe, local, and student-friendly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-delay-200">
            <HeroButton asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link to="/auth" aria-label="Start selling your items">Start Selling</Link>
            </HeroButton>
            <Link
              to="/products"
              className="flex items-center text-primary hover:text-primary/80 font-medium transition-smooth group"
              aria-label="Browse available items"
            >
              Browse Items <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-secondary/70 mr-2"></span>
              Features
              <span className="w-5 h-px bg-secondary/70 ml-2"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Choose CampusDeals?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most trusted marketplace for college communities across the country.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`text-center border-muted/50 shadow-soft hover:shadow-medium hover:border-primary/20 transition-all duration-300 animate-fade-in animate-delay-${index * 100}`}
              >
                <CardContent className="p-6 pt-8">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-md animate-float">
                    <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3" id={`feature-${index}`}>{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed" aria-labelledby={`feature-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-primary/70 mr-2"></span>
              Simple Process
              <span className="w-5 h-px bg-primary/70 ml-2"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              How CampusDeals Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start trading with your campus community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-sm relative">
                <BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />
                <div className="absolute -right-1 -top-1 bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center font-semibold text-sm">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">Sign up with your university email to join your campus marketplace community</p>

              {/* Desktop connector line */}
              <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-primary/20"></div>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-sm relative">
                <ShoppingBag className="h-8 w-8 text-primary" aria-hidden="true" />
                <div className="absolute -right-1 -top-1 bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center font-semibold text-sm">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">List or Browse</h3>
              <p className="text-muted-foreground">Easily list items for sale or browse what's available from other students</p>

              {/* Desktop connector line */}
              <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-primary/20"></div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-sm relative">
                <Users className="h-8 w-8 text-primary" aria-hidden="true" />
                <div className="absolute -right-1 -top-1 bg-primary w-6 h-6 rounded-full text-white flex items-center justify-center font-semibold text-sm">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Trade</h3>
              <p className="text-muted-foreground">Message other students and arrange to meet safely on campus to complete your trade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-background border border-muted/40 p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-primary mb-4 flex items-center justify-center">
                <span className="mr-2">50K</span>
                <span className="text-2xl">+</span>
              </div>
              <p className="text-lg font-medium">Active Students</p>
            </div>
            <div className="bg-background border border-muted/40 p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-secondary mb-4 flex items-center justify-center">
                <span className="mr-2">200</span>
                <span className="text-2xl">+</span>
              </div>
              <p className="text-lg font-medium">Partner Universities</p>
            </div>
            <div className="bg-background border border-muted/40 p-8 rounded-xl shadow-sm">
              <div className="text-5xl font-bold text-primary mb-4 flex items-center justify-center">
                <span className="mr-2">1M</span>
                <span className="text-2xl">+</span>
              </div>
              <p className="text-lg font-medium">Items Sold</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
              <span className="w-5 h-px bg-secondary/70 mr-2"></span>
              Testimonials
              <span className="w-5 h-px bg-secondary/70 ml-2"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              What Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the thousands of students who love using CampusDeals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background border border-muted/50 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-secondary fill-secondary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-foreground mb-4">"{testimonial.text}"</p>
                  <footer>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero"></div>
        <div className="absolute inset-0 -z-5 bg-[url('/placeholder.svg')] opacity-5 bg-repeat"></div>

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <div className="bg-background/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of students already using CampusDeals to buy and sell with your campus community.
            </p>
            <ul className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
              <li className="flex items-center text-primary-foreground/90">
                <Check className="h-5 w-5 mr-2 text-primary-foreground" aria-hidden="true" /> Free to join
              </li>
              <li className="flex items-center text-primary-foreground/90">
                <Check className="h-5 w-5 mr-2 text-primary-foreground" aria-hidden="true" /> No commission fees
              </li>
              <li className="flex items-center text-primary-foreground/90">
                <Check className="h-5 w-5 mr-2 text-primary-foreground" aria-hidden="true" /> Verified campus users
              </li>
            </ul>
            <HeroButton
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 shadow-xl"
            >
              <Link to="/auth" aria-label="Create your CampusDeals account">Create Your Account</Link>
            </HeroButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 mb-8 border-b border-muted/50">
            <div className="flex items-center space-x-2.5 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold">CD</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">CampusDeals</span>
            </div>

            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Browse</Link></li>
                  <li><Link to="/products/new" className="text-muted-foreground hover:text-primary transition-colors">Sell Items</Link></li>
                  <li><Link to="/messages" className="text-muted-foreground hover:text-primary transition-colors">Messages</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Safety Tips</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                  <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Community Guidelines</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm order-2 md:order-1">
              © 2025 CampusDeals. Making campus trading simple and secure.
            </p>
            <div className="flex space-x-4 order-1 md:order-2">
              <a href="#" aria-label="CampusDeals on Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="#" aria-label="CampusDeals on Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="#" aria-label="CampusDeals on Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;