export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
}

export interface User {
  id: string;
  name: string;
  email: string;
  campus: string;
  avatar: string;
  joinedDate: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Purchase {
  id: string;
  productId: string;
  product: Product;
  purchaseDate: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export const CATEGORIES = [
  'Electronics',
  'Books',
  'Furniture',
  'Notes',
  'Clothing',
  'Sports',
  'Kitchen',
  'Other'
];

export const dummyUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  campus: 'Central University',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  joinedDate: '2024-01-15'
};

export const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'MacBook Pro 13" 2021',
    price: 1200,
    category: 'Electronics',
    description: 'Excellent condition MacBook Pro with M1 chip. Perfect for students. Includes charger and original box.',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop',
    sellerId: '2',
    sellerName: 'Sarah Chen',
    createdAt: '2024-02-01',
    condition: 'like-new'
  },
  {
    id: '2',
    title: 'Calculus Textbook - 10th Edition',
    price: 45,
    category: 'Books',
    description: 'Stewart Calculus textbook in great condition. No highlighting or writing inside.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
    sellerId: '3',
    sellerName: 'Mike Rodriguez',
    createdAt: '2024-02-03',
    condition: 'good'
  },
  {
    id: '3',
    title: 'IKEA Desk Chair',
    price: 80,
    category: 'Furniture',
    description: 'Comfortable office chair from IKEA. Adjustable height and good back support.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
    sellerId: '4',
    sellerName: 'Emma Davis',
    createdAt: '2024-02-05',
    condition: 'good'
  },
  {
    id: '4',
    title: 'Physics 101 Complete Notes',
    price: 25,
    category: 'Notes',
    description: 'Comprehensive handwritten notes for Physics 101. Includes all chapters and practice problems.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop',
    sellerId: '5',
    sellerName: 'David Kim',
    createdAt: '2024-02-07',
    condition: 'like-new'
  },
  {
    id: '5',
    title: 'iPhone 13 - 128GB',
    price: 650,
    category: 'Electronics',
    description: 'iPhone 13 in excellent condition. Battery health 95%. Includes case and screen protector.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    sellerId: '6',
    sellerName: 'Lisa Wang',
    createdAt: '2024-02-10',
    condition: 'like-new'
  },
  {
    id: '6',
    title: 'Mini Fridge - Perfect for Dorm',
    price: 120,
    category: 'Furniture',
    description: 'Compact refrigerator perfect for dorm rooms. Energy efficient and quiet operation.',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop',
    sellerId: '7',
    sellerName: 'Tom Wilson',
    createdAt: '2024-02-12',
    condition: 'good'
  }
];

export const dummyCartItems: CartItem[] = [
  { productId: '2', quantity: 1 },
  { productId: '4', quantity: 1 }
];

export const dummyPurchases: Purchase[] = [
  {
    id: 'p1',
    productId: '1',
    product: dummyProducts[0],
    purchaseDate: '2024-01-20',
    amount: 1200,
    status: 'completed'
  },
  {
    id: 'p2',
    productId: '3',
    product: dummyProducts[2],
    purchaseDate: '2024-01-25',
    amount: 80,
    status: 'completed'
  }
];

export const dummyUserListings: Product[] = [
  {
    id: '7',
    title: 'Biology Textbook Bundle',
    price: 85,
    category: 'Books',
    description: 'Complete set of biology textbooks for first year. All in excellent condition.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    sellerId: '1',
    sellerName: 'Alex Johnson',
    createdAt: '2024-02-01',
    condition: 'like-new'
  },
  {
    id: '8',
    title: 'Gaming Mouse & Keyboard',
    price: 60,
    category: 'Electronics',
    description: 'RGB gaming peripherals in great condition. Perfect for gaming or general use.',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    sellerId: '1',
    sellerName: 'Alex Johnson',
    createdAt: '2024-01-28',
    condition: 'good'
  }
];