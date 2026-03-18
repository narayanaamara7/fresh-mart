export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  unit: string;
  imageUrl: string;
  inStock: boolean;
  description: string;
}

export const categories: Category[] = [
  { id: 'c1', name: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=400&auto=format&fit=crop' },
  { id: 'c2', name: 'Leafy Greens', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop' },
  { id: 'c3', name: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=400&auto=format&fit=crop' },
  { id: 'c4', name: 'Gourds', imageUrl: 'https://images.unsplash.com/photo-1595855761376-8805f42a5bc6?q=80&w=400&auto=format&fit=crop' },
  { id: 'c5', name: 'Root Vegetables', imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89134a66?q=80&w=400&auto=format&fit=crop' },
  { id: 'c6', name: 'Herbs', imageUrl: 'https://images.unsplash.com/photo-1512805481744-8cb23fc8b1c4?q=80&w=400&auto=format&fit=crop' },
  { id: 'c7', name: 'Exotics', imageUrl: 'https://images.unsplash.com/photo-1518977673343-4eea34a1792b?q=80&w=400&auto=format&fit=crop' },
];

export const products: Product[] = [
  // Vegetables (c1)
  { id: 'p1', name: 'Tomatoes (Local)', categoryId: 'c1', price: 40, originalPrice: 50, unit: '1 kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400&auto=format&fit=crop', description: 'Fresh, juicy local tomatoes perfect for curries.' },
  { id: 'p2', name: 'Onions', categoryId: 'c1', price: 30, unit: '1 kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=400&auto=format&fit=crop', description: 'Dry onions with a strong flavor.' },
  { id: 'p3', name: 'Potatoes', categoryId: 'c1', price: 35, unit: '1 kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1518977673343-4eea34a1792b?q=80&w=400&auto=format&fit=crop', description: 'Versatile potatoes ideal for any dish.' },
  { id: 'p4', name: 'Lady Finger (Bhindi)', categoryId: 'c1', price: 45, unit: '500 g', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1698246413988-51f71f65bb51?q=80&w=400&auto=format&fit=crop', description: 'Tender okra, locally sourced.' },
  { id: 'p5', name: 'Cauliflower', categoryId: 'c1', price: 50, originalPrice: 60, unit: '1 pc (approx 600g)', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?q=80&w=400&auto=format&fit=crop', description: 'Fresh cauliflower with tight florets.' },
  
  // Leafy Greens (c2)
  { id: 'p6', name: 'Spinach (Palak)', categoryId: 'c2', price: 20, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop', description: 'Nutrient-rich fresh spinach.' },
  { id: 'p7', name: 'Fenugreek (Methi)', categoryId: 'c2', price: 25, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1643449339097-9df03822bca6?q=80&w=400&auto=format&fit=crop', description: 'Fresh methi leaves.' },
  { id: 'p8', name: 'Amaranth (Thotakura)', categoryId: 'c2', price: 15, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop', description: 'Healthy and fresh Thotakura.' },
  
  // Fruits (c3)
  { id: 'p9', name: 'Bananas (Robusta)', categoryId: 'c3', price: 60, unit: '1 Dozen', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?q=80&w=400&auto=format&fit=crop', description: 'Sweet and ripe bananas.' },
  { id: 'p10', name: 'Apples (Kashmiri)', categoryId: 'c3', price: 180, originalPrice: 200, unit: '4 pcs', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cdaa1f014?q=80&w=400&auto=format&fit=crop', description: 'Crisp and sweet apples.' },
  { id: 'p11', name: 'Papaya', categoryId: 'c3', price: 70, unit: '1 pc (approx 1kg)', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1617415170313-1b913baaa2f6?q=80&w=400&auto=format&fit=crop', description: 'Farm-fresh ripe papaya.' },
  { id: 'p12', name: 'Pomegranate', categoryId: 'c3', price: 150, unit: '1 kg', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1615486171439-0bd9f1acb021?q=80&w=400&auto=format&fit=crop', description: 'Juicy red pomegranates.' },
  
  // Gourds (c4)
  { id: 'p13', name: 'Bottle Gourd (Sorakaya)', categoryId: 'c4', price: 40, unit: '1 pc', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1595855761376-8805f42a5bc6?q=80&w=400&auto=format&fit=crop', description: 'Fresh and tender bottle gourd.' },
  { id: 'p14', name: 'Bitter Gourd (Kakarakaya)', categoryId: 'c4', price: 60, unit: '500 g', inStock: true, imageUrl: 'https://plus.unsplash.com/premium_photo-1663928172901-71fb5de14620?q=80&w=400&auto=format&fit=crop', description: 'Fresh bitter gourds.' },
  { id: 'p15', name: 'Ridge Gourd (Beerakaya)', categoryId: 'c4', price: 50, unit: '500 g', inStock: false, imageUrl: 'https://images.unsplash.com/photo-1602492190367-43ca4628ee3e?q=80&w=400&auto=format&fit=crop', description: 'Tender ridge gourds.' },
  
  // Root Vegetables (c5)
  { id: 'p16', name: 'Carrots', categoryId: 'c5', price: 60, unit: '500 g', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&auto=format&fit=crop', description: 'Crunchy sweet carrots.' },
  { id: 'p17', name: 'Beetroot', categoryId: 'c5', price: 45, unit: '500 g', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?q=80&w=400&auto=format&fit=crop', description: 'Fresh red beetroots.' },
  { id: 'p18', name: 'Ginger', categoryId: 'c5', price: 40, unit: '100 g', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bf?q=80&w=400&auto=format&fit=crop', description: 'Strong, aromatic ginger root.' },
  
  // Herbs (c6)
  { id: 'p19', name: 'Coriander Leaves (Kotimeera)', categoryId: 'c6', price: 15, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1582114778848-0ca1f0eebc85?q=80&w=400&auto=format&fit=crop', description: 'Fresh green coriander.' },
  { id: 'p20', name: 'Mint Leaves (Pudina)', categoryId: 'c6', price: 15, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1590483259960-9118e7e17c09?q=80&w=400&auto=format&fit=crop', description: 'Aromatic mint leaves.' },
  { id: 'p21', name: 'Curry Leaves (Karivepaku)', categoryId: 'c6', price: 10, unit: '1 bunch', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1596707328639-53e70d47d4e5?q=80&w=400&auto=format&fit=crop', description: 'Essential curry leaves for tempering.' },
  { id: 'p22', name: 'Green Chillies', categoryId: 'c6', price: 20, unit: '100 g', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1563200772-2dcff56d81ea?q=80&w=400&auto=format&fit=crop', description: 'Spicy green chillies.' },
  
  // Exotics & Defaults
  { id: 'p23', name: 'Broccoli', categoryId: 'c7', price: 120, unit: '1 pc (approx 250g)', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=400&auto=format&fit=crop', description: 'Fresh broccoli head.' },
  { id: 'p24', name: 'Mushroom (Button)', categoryId: 'c7', price: 80, unit: '1 pack', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1615486511484-92e172054fb1?q=80&w=400&auto=format&fit=crop', description: 'Fresh white button mushrooms.' },
  { id: 'p25', name: 'Lemon', categoryId: 'c6', price: 30, unit: '6 pcs', inStock: true, imageUrl: 'https://images.unsplash.com/photo-1590502593747-4229879f7625?q=80&w=400&auto=format&fit=crop', description: 'Juicy lemons.' },
];

export const dummyOrders = [
  { id: 'ORD-1001', date: '2026-03-15', total: 450, status: 'Delivered', items: 5 },
  { id: 'ORD-1002', date: '2026-03-16', total: 1200, status: 'Processing', items: 12 },
  { id: 'ORD-1003', date: '2026-03-10', total: 320, status: 'Delivered', items: 3 },
  { id: 'ORD-1004', date: '2026-03-01', total: 1500, status: 'Delivered', items: 15 },
  { id: 'ORD-1005', date: '2026-03-16', total: 200, status: 'Cancelled', items: 2 },
  { id: 'ORD-1006', date: '2026-02-28', total: 850, status: 'Delivered', items: 8 },
  { id: 'ORD-1007', date: '2026-02-15', total: 400, status: 'Returned', items: 4 },
  { id: 'ORD-1008', date: '2026-03-16', total: 60, status: 'Pending', items: 1 },
];
