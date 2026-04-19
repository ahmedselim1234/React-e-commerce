export const dummyCategories = [
  { _id: 'c1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c3', name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c4', name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c5', name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400' }
];

export const dummyBrands = [
  { _id: 'b1', name: 'Apple', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b2', name: 'Samsung', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b3', name: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b4', name: 'Sony', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400' }
];

export const dummyProducts = [
  {
    _id: 'p1',
    title: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone with aerospace-grade titanium design, A17 Pro chip, and a more advanced 48MP Main camera system.',
    price: 1199,
    priceAfterDiscount: 1099,
    ratingsQuantity: 124,
    ratingsAverage: 4.8,
    imageCover: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1695048064871-331cf102d5b6?auto=format&fit=crop&q=80&w=600'
    ],
    category: dummyCategories[0],
    brand: dummyBrands[0],
    colors: ['#000000', '#ffffff', '#223344'],
    quantity: 10
  },
  {
    _id: 'p2',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.',
    price: 1299,
    ratingsQuantity: 89,
    ratingsAverage: 4.7,
    imageCover: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600'
    ],
    category: dummyCategories[0],
    brand: dummyBrands[1],
    colors: ['#121212', '#dcdcdc'],
    quantity: 5
  },
  {
    _id: 'p3',
    title: 'Nike Air Max 270',
    description: 'Nike s first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270.',
    price: 150,
    priceAfterDiscount: 120,
    ratingsQuantity: 240,
    ratingsAverage: 4.5,
    imageCover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600'
    ],
    category: dummyCategories[1],
    brand: dummyBrands[2],
    colors: ['#ff0000', '#000000'],
    quantity: 20
  },
  {
    _id: 'p4',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation optimized to you with Auto NC Optimizer.',
    price: 398,
    ratingsQuantity: 150,
    ratingsAverage: 4.9,
    imageCover: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600'
    ],
    category: dummyCategories[0],
    brand: dummyBrands[3],
    colors: ['#000000', '#dddddd'],
    quantity: 15
  }
];

export const dummyUser = {
  _id: 'u1',
  name: 'Ahmed Selim',
  email: 'ahmed@example.com',
  phone: '01012345678',
  role: 'user',
  profileImage: 'https://ui-avatars.com/api/?name=Ahmed+Selim&background=random'
};

export const dummyAddresses = [
  {
    _id: 'a1',
    alias: 'Home',
    details: '123 Maadi Street, apt 4',
    phone: '01012345678',
    city: 'Cairo',
    postalCode: '11431'
  },
  {
    _id: 'a2',
    alias: 'Work',
    details: 'Smart Village, Building B',
    phone: '01198765432',
    city: 'Giza',
    postalCode: '12577'
  }
];

export const dummyCartItems = [
  {
    _id: 'ci1',
    product: dummyProducts[0],
    count: 1,
    price: 1099,
    color: '#000000'
  },
  {
    _id: 'ci2',
    product: dummyProducts[2],
    count: 2,
    price: 120,
    color: '#ff0000'
  }
];

export const dummyOrders = [
  {
    _id: 'o1',
    user: dummyUser,
    cartItems: dummyCartItems,
    taxPrice: 150,
    shippingPrice: 50,
    totalOrderPrice: 1539,
    paymentMethodType: 'card',
    isPaid: true,
    paidAt: '2023-10-01T10:00:00Z',
    isDelivered: false,
    shippingAddress: dummyAddresses[0],
    createdAt: '2023-10-01T09:30:00Z'
  }
];
