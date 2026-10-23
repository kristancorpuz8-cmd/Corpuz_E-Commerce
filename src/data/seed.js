export const STORE_NAME = 'Corpuz & Volante Gaming Depot'

export const ACCOUNTS = [
  {
    email: 'user@example.com',
    password: 'user123',
    role: 'customer',
    name: 'Kristan Rio Corpuz',
    phone: '0917 123 4567',
    address: 'Malacampa, Camiling, Tarlac',
    memberSince: 'January 2025',
  },
  {
    email: 'seller@example.com',
    password: 'seller123',
    role: 'seller',
    name: 'Lawrence Volante',
    storeName: STORE_NAME,
    phone: '0918 765 4321',
    address: 'Malacampa, Camiling, Tarlac',
    memberSince: 'March 2024',
  },
]

export const CATEGORIES = [
  {
    name: 'Gaming Peripherals',
    description: 'High-precision mice, mechanical keyboards, and custom desk mats.',
    icon: 'bi-keyboard',
  },
  {
    name: 'Consoles & Handhelds',
    description: 'Next-gen consoles, portable gaming handhelds, and controllers.',
    icon: 'bi-controller',
  },
  {
    name: 'PC Hardware & Rigs',
    description: 'Pre-built gaming PCs, high-refresh displays, and components.',
    icon: 'bi-cpu',
  },
  {
    name: 'Audio & Streaming',
    description: 'Spatial surround headsets, studio mics, and capture gear.',
    icon: 'bi-headset',
  },
  {
    name: 'Setup & Lifestyle',
    description: 'Ergonomic gaming chairs, RGB lighting, and gaming apparel.',
    icon: 'bi-lightning-charge',
  },
]

export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Apex RGB Mechanical Keyboard',
    price: 3899,
    category: 'Gaming Peripherals',
    stock: 24,
    featured: true,
    highlight: true,
    description: 'Hot-swappable tactile switches, per-key RGB backlighting, and durable aluminum chassis.',
    image:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    name: 'Phantom Ultralight Wireless Mouse',
    price: 2499,
    category: 'Gaming Peripherals',
    stock: 32,
    featured: true,
    highlight: false,
    description: '58g ultra-lightweight ergonomic shell with 26,000 DPI optical sensor and PTFE feet.',
    image:
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    name: 'Next-Gen Gaming Console (1TB)',
    price: 29990,
    category: 'Consoles & Handhelds',
    stock: 10,
    featured: true,
    highlight: true,
    description: 'True 4K 120Hz gaming, ultra-fast custom NVMe SSD, and ray-tracing graphics.',
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    name: 'Portable OLED Handheld Console',
    price: 18499,
    category: 'Consoles & Handhelds',
    stock: 15,
    featured: false,
    highlight: false,
    description: '7-inch vibrant OLED display with detachable wireless controllers for gaming anywhere.',
    image:
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p5',
    name: '27" QHD 180Hz Fast-IPS Gaming Monitor',
    price: 14999,
    category: 'PC Hardware & Rigs',
    stock: 12,
    featured: true,
    highlight: true,
    description: '1ms response time, HDR400, and AMD FreeSync Premium for tear-free competitive play.',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    name: 'Titan RTX Esports Prebuilt PC',
    price: 64999,
    category: 'PC Hardware & Rigs',
    stock: 6,
    featured: false,
    highlight: true,
    description: 'Liquid-cooled powerhouse equipped with RTX GPU for high-FPS competitive esports.',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p7',
    name: 'Spatial 7.1 Wireless Gaming Headset',
    price: 4299,
    category: 'Audio & Streaming',
    stock: 22,
    featured: true,
    highlight: false,
    description: '50mm neodymium drivers, detachable noise-cancelling boom mic, and 30-hour battery life.',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p8',
    name: 'USB Studio Condenser Microphone',
    price: 3199,
    category: 'Audio & Streaming',
    stock: 18,
    featured: false,
    highlight: false,
    description: 'Cardioid pickup pattern with tap-to-mute sensor and built-in RGB shock mount.',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p9',
    name: 'Pro Ergonomic Gaming Chair',
    price: 8999,
    category: 'Setup & Lifestyle',
    stock: 14,
    featured: false,
    highlight: false,
    description: 'High-density cold-cure foam, 4D armrests, lumbar support, and 165-degree recline.',
    image:
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p10',
    name: 'RGB Ambient Smart Light Bar Set',
    price: 1799,
    category: 'Setup & Lifestyle',
    stock: 30,
    featured: false,
    highlight: true,
    description: 'Syncs with PC audio and screen colors for full battlestation immersion.',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  },
]

export const INITIAL_ORDERS = [
  {
    id: 'ORD-1042',
    customerName: 'Kristan Rio Corpuz',
    customerEmail: 'user@example.com',
    date: '2026-10-02',
    status: 'Delivered',
    items: [
      { productId: 'p1', name: 'Apex RGB Mechanical Keyboard', quantity: 1, price: 3899 },
    ],
    total: 3899,
  },
  {
    id: 'ORD-1088',
    customerName: 'Kristan Rio Corpuz',
    customerEmail: 'user@example.com',
    date: '2026-10-12',
    status: 'Shipped',
    items: [
      { productId: 'p2', name: 'Phantom Ultralight Wireless Mouse', quantity: 1, price: 2499 },
      { productId: 'p7', name: 'Spatial 7.1 Wireless Gaming Headset', quantity: 1, price: 4299 },
    ],
    total: 6798,
  },
  {
    id: 'ORD-1115',
    customerName: 'Lawrence Volante',
    customerEmail: 'seller@example.com',
    date: '2026-10-16',
    status: 'Processing',
    items: [
      { productId: 'p4', name: 'Portable OLED Handheld Console', quantity: 1, price: 18499 },
    ],
    total: 18499,
  },
]
