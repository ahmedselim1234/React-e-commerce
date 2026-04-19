// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────
export const dummyCategories = [
  { _id: 'c1', name: 'إلكترونيات', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c2', name: 'أزياء', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c3', name: 'المنزل والمطبخ', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c4', name: 'رياضة', slug: 'sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c5', name: 'كتب', slug: 'books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c6', name: 'جمال وعناية', slug: 'beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c7', name: 'سيارات', slug: 'automotive', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400' },
  { _id: 'c8', name: 'ألعاب', slug: 'gaming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400' },
];

// ─────────────────────────────────────────────
// SUBCATEGORIES
// ─────────────────────────────────────────────
export const dummySubCategories = [
  { _id: 'sc1', name: 'هواتف ذكية', slug: 'smartphones', category: 'c1' },
  { _id: 'sc2', name: 'لابتوب', slug: 'laptops', category: 'c1' },
  { _id: 'sc3', name: 'سماعات', slug: 'headphones', category: 'c1' },
  { _id: 'sc4', name: 'تليفزيونات', slug: 'televisions', category: 'c1' },
  { _id: 'sc5', name: 'ملابس رجالي', slug: 'mens-clothing', category: 'c2' },
  { _id: 'sc6', name: 'ملابس نسائي', slug: 'womens-clothing', category: 'c2' },
  { _id: 'sc7', name: 'أحذية', slug: 'shoes', category: 'c2' },
  { _id: 'sc8', name: 'أثاث', slug: 'furniture', category: 'c3' },
  { _id: 'sc9', name: 'أدوات مطبخ', slug: 'kitchen-tools', category: 'c3' },
  { _id: 'sc10', name: 'لياقة بدنية', slug: 'fitness', category: 'c4' },
  { _id: 'sc11', name: 'ألعاب فيديو', slug: 'video-games', category: 'c8' },
  { _id: 'sc12', name: 'عطور', slug: 'perfumes', category: 'c6' },
];

// ─────────────────────────────────────────────
// BRANDS
// ─────────────────────────────────────────────
export const dummyBrands = [
  { _id: 'b1', name: 'Apple', slug: 'apple', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b2', name: 'Samsung', slug: 'samsung', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b3', name: 'Nike', slug: 'nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b4', name: 'Sony', slug: 'sony', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b5', name: 'LG', slug: 'lg', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=400' },
  { _id: 'b6', name: 'Adidas', slug: 'adidas', image: 'https://images.unsplash.com/photo-1556906781-9a412961d28e?auto=format&fit=crop&q=80&w=400' },
];

// ─────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────
export const dummyProducts = [
  {
    _id: 'p1',
    title: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'أقوى هاتف من أبل مع تصميم التيتانيوم الفضائي وشريحة A17 Pro وكاميرا 48 ميجابكسل المتطورة. يوفر أداءً استثنائياً مع نظام التصوير الأكثر تقدماً في تاريخ آيفون. ميزة الإجراء القابلة للتخصيص والمنفذ USB-C لاتصال أسرع.',
    price: 1199,
    priceAfterDiscount: 1099,
    ratingsQuantity: 124,
    Averagerating: 4.8,
    imageCover: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1695048064871-331cf102d5b6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1574755393849-623942496936?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc1', name: 'هواتف ذكية' }],
    brand: { _id: 'b1', name: 'Apple' },
    colors: ['#000000', '#ffffff', '#223344', '#c0c0c0'],
    quantity: 10,
    sold: 320,
    createdAt: '2024-09-15T10:00:00Z',
  },
  {
    _id: 'p2',
    title: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'ذكاء Galaxy هنا. مرحباً بك في عصر الذكاء الاصطناعي للهاتف المحمول. مع Galaxy S24 Ultra في يديك، يمكنك إطلاق مستويات جديدة كلياً من الإبداع. S Pen مدمج لتجربة ملاحظات وفنون استثنائية.',
    price: 1299,
    ratingsQuantity: 89,
    Averagerating: 4.7,
    imageCover: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc1', name: 'هواتف ذكية' }],
    brand: { _id: 'b2', name: 'Samsung' },
    colors: ['#121212', '#dcdcdc', '#7c3aed'],
    quantity: 5,
    sold: 210,
    createdAt: '2024-08-20T10:00:00Z',
  },
  {
    _id: 'p3',
    title: 'Nike Air Max 270',
    slug: 'nike-air-max-270',
    description: 'أول Air Max لأسلوب الحياة من Nike يجلب لك الأناقة والراحة والجرأة. وحدة Air Max الأكبر أجهزة بطانة لكعب بنسبة 270 درجة مع شبكة رياضية خفيفة. مثالي للارتداء اليومي.',
    price: 150,
    priceAfterDiscount: 120,
    ratingsQuantity: 240,
    Averagerating: 4.5,
    imageCover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c2', name: 'أزياء' },
    subcategory: [{ _id: 'sc7', name: 'أحذية' }],
    brand: { _id: 'b3', name: 'Nike' },
    colors: ['#ff0000', '#000000', '#ffffff', '#3b82f6'],
    quantity: 20,
    sold: 580,
    createdAt: '2024-07-10T10:00:00Z',
  },
  {
    _id: 'p4',
    title: 'Sony WH-1000XM5 سماعات لاسلكية',
    slug: 'sony-wh-1000xm5',
    description: 'إلغاء الضوضاء الرائد في الصناعة المحسّن لك مع Auto NC Optimizer. استمتع بصوت استثنائي مع معالج V1 المخصص من Sony وميكروفون مدمج مع بيانات الضوضاء في الوقت الفعلي. حتى 30 ساعة من عمر البطارية.',
    price: 398,
    ratingsQuantity: 150,
    Averagerating: 4.9,
    imageCover: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc3', name: 'سماعات' }],
    brand: { _id: 'b4', name: 'Sony' },
    colors: ['#000000', '#dddddd'],
    quantity: 15,
    sold: 430,
    createdAt: '2024-06-05T10:00:00Z',
  },
  {
    _id: 'p5',
    title: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    description: 'أقوى MacBook Air على الإطلاق مع شريحة M3 الثورية. 18 ساعة عمر البطارية، شاشة Liquid Retina مذهلة، وتصميم خفيف الوزن يزن 1.24 كيلوجرام. مثالي للمحترفين والطلاب.',
    price: 1299,
    priceAfterDiscount: 1199,
    ratingsQuantity: 67,
    Averagerating: 4.9,
    imageCover: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc2', name: 'لابتوب' }],
    brand: { _id: 'b1', name: 'Apple' },
    colors: ['#c0c0c0', '#d2b48c', '#2d3748'],
    quantity: 8,
    sold: 145,
    createdAt: '2024-10-01T10:00:00Z',
  },
  {
    _id: 'p6',
    title: 'Samsung QLED 65" 4K TV',
    slug: 'samsung-qled-65-4k-tv',
    description: 'تليفزيون QLED 65 بوصة بدقة 4K من Samsung مع تقنية Neo Quantum Processor وتردد 120Hz. تقنية Quantum HDR 32X لألوان استثنائية. نظام صوت Object Tracking Sound Plus للصوت المحيطي.',
    price: 1899,
    priceAfterDiscount: 1599,
    ratingsQuantity: 45,
    Averagerating: 4.6,
    imageCover: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc4', name: 'تليفزيونات' }],
    brand: { _id: 'b2', name: 'Samsung' },
    colors: ['#000000'],
    quantity: 3,
    sold: 67,
    createdAt: '2024-05-20T10:00:00Z',
  },
  {
    _id: 'p7',
    title: 'Adidas Ultraboost 23',
    slug: 'adidas-ultraboost-23',
    description: 'حذاء الجري المطور بتقنية BOOST المبتكرة لاسترداد طاقة كل خطوة. النعل الخارجي Continental Rubber للإمساك بالأرض في أي ظروف. شبكة Primeknit+ المتوافقة تلتف حول قدمك بشكل مثالي.',
    price: 180,
    ratingsQuantity: 312,
    Averagerating: 4.7,
    imageCover: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556906781-9a412961d28e?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c2', name: 'أزياء' },
    subcategory: [{ _id: 'sc7', name: 'أحذية' }],
    brand: { _id: 'b6', name: 'Adidas' },
    colors: ['#ffffff', '#000000', '#3b82f6'],
    quantity: 25,
    sold: 890,
    createdAt: '2024-04-15T10:00:00Z',
  },
  {
    _id: 'p8',
    title: 'LG OLED C3 55" evo',
    slug: 'lg-oled-c3-55',
    description: 'شاشة LG OLED evo بدقة 4K مع معالج α9 Gen6 AI. كل بكسل ينير وينطفئ بشكل مستقل لتباين لا نهائي. متوافق مع HDMI 2.1 وVRR وG-Sync وFreeSync Premium لتجربة ألعاب رهيبة.',
    price: 1499,
    ratingsQuantity: 78,
    Averagerating: 4.8,
    imageCover: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1571415060716-baff5f717c37?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc4', name: 'تليفزيونات' }],
    brand: { _id: 'b5', name: 'LG' },
    colors: ['#000000'],
    quantity: 4,
    sold: 123,
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    _id: 'p9',
    title: 'Sony PlayStation 5',
    slug: 'sony-playstation-5',
    description: 'PlayStation 5 مع وحدة معالجة مركزية AMD Zen 2 ووحدة GPU مخصصة تعتمد على RDNA 2. تشغيل الألعاب بدقة 4K وتردد 120Hz. ذاكرة SSD فائقة السرعة لتحميل الألعاب بشكل لحظي. يدة DualSense مع التغذية الراجعة اللمسية.',
    price: 499,
    priceAfterDiscount: 449,
    ratingsQuantity: 560,
    Averagerating: 4.9,
    imageCover: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c8', name: 'ألعاب' },
    subcategory: [{ _id: 'sc11', name: 'ألعاب فيديو' }],
    brand: { _id: 'b4', name: 'Sony' },
    colors: ['#ffffff', '#000000'],
    quantity: 7,
    sold: 1200,
    createdAt: '2024-11-01T10:00:00Z',
  },
  {
    _id: 'p10',
    title: 'Nike Dri-FIT Academy Polo',
    slug: 'nike-dri-fit-polo',
    description: 'قميص بولو Nike Dri-FIT Academy للأداء العالي. تقنية Dri-FIT تبقيك جافاً ومرتاحاً طوال اليوم. قماش خفيف الوزن وقابل للتنفس مثالي للرياضة والارتداء اليومي.',
    price: 45,
    ratingsQuantity: 189,
    Averagerating: 4.4,
    imageCover: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c2', name: 'أزياء' },
    subcategory: [{ _id: 'sc5', name: 'ملابس رجالي' }],
    brand: { _id: 'b3', name: 'Nike' },
    colors: ['#000000', '#ffffff', '#3b82f6', '#ef4444'],
    quantity: 50,
    sold: 670,
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    _id: 'p11',
    title: 'Samsung Galaxy Watch 6 Classic',
    slug: 'samsung-galaxy-watch-6-classic',
    description: 'ساعة Samsung Galaxy Watch 6 Classic الرائدة بإطار دوار كلاسيكي يوفر تحكماً دقيقاً. مستشعر BioActive المتقدم لمراقبة الصحة الشاملة. شاشة Super AMOLED مشرقة. عمر بطارية يصل إلى 40 ساعة.',
    price: 399,
    priceAfterDiscount: 349,
    ratingsQuantity: 95,
    Averagerating: 4.6,
    imageCover: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc1', name: 'هواتف ذكية' }],
    brand: { _id: 'b2', name: 'Samsung' },
    colors: ['#000000', '#c0c0c0'],
    quantity: 12,
    sold: 234,
    createdAt: '2024-09-01T10:00:00Z',
  },
  {
    _id: 'p12',
    title: 'Apple AirPods Pro 2nd Generation',
    slug: 'apple-airpods-pro-2',
    description: 'AirPods Pro من الجيل الثاني مع إلغاء الضوضاء النشط الأكثر تقدماً من Apple. الصوت المكاني الشخصي يضعك في قلب الصوت. مقاومة للماء والعرق. حتى 30 ساعة عمر بطارية مع علبة الشحن.',
    price: 249,
    ratingsQuantity: 445,
    Averagerating: 4.8,
    imageCover: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    availableImages: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    ],
    category: { _id: 'c1', name: 'إلكترونيات' },
    subcategory: [{ _id: 'sc3', name: 'سماعات' }],
    brand: { _id: 'b1', name: 'Apple' },
    colors: ['#ffffff'],
    quantity: 30,
    sold: 980,
    createdAt: '2024-10-15T10:00:00Z',
  },
];

// ─────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────
export const dummyReviews = [
  { _id: 'r1', product: 'p1', user: { _id: 'u2', name: 'محمد علي', profileImage: '' }, rating: 5, content: 'منتج رائع جداً، الأداء مذهل والكاميرا تلتقط صور احترافية. أنصح به بشدة لكل من يبحث عن أفضل هاتف في السوق.', createdAt: '2024-10-15T10:00:00Z' },
  { _id: 'r2', product: 'p1', user: { _id: 'u3', name: 'سارة أحمد', profileImage: '' }, rating: 4, content: 'جودة ممتازة وتصميم أنيق، لكن السعر مرتفع نسبياً. البطارية تدوم يوماً كاملاً مع الاستخدام المكثف.', createdAt: '2024-10-10T10:00:00Z' },
  { _id: 'r3', product: 'p1', user: { _id: 'u4', name: 'أحمد سليم', profileImage: '' }, rating: 5, content: 'أفضل هاتف استخدمته في حياتي. شريحة A17 Pro لا تصدق وسرعة الأداء خارقة.', createdAt: '2024-10-05T10:00:00Z' },
  { _id: 'r4', product: 'p2', user: { _id: 'u2', name: 'محمد علي', profileImage: '' }, rating: 5, content: 'S24 Ultra رائع! S Pen يفيد كثيراً في العمل والرسم. الكاميرا الزوم 10x مذهلة.', createdAt: '2024-09-20T10:00:00Z' },
  { _id: 'r5', product: 'p3', user: { _id: 'u3', name: 'سارة أحمد', profileImage: '' }, rating: 5, content: 'حذاء مريح جداً للمشي والجري. الوسادة الهوائية تخفف الضغط عن القدم تماماً.', createdAt: '2024-08-01T10:00:00Z' },
  { _id: 'r6', product: 'p4', user: { _id: 'u5', name: 'علي حسن', profileImage: '' }, rating: 5, content: 'أفضل سماعات في السوق. إلغاء الضوضاء يعمل بشكل مذهل حتى في الأماكن الصاخبة.', createdAt: '2024-07-15T10:00:00Z' },
  { _id: 'r7', product: 'p9', user: { _id: 'u2', name: 'محمد علي', profileImage: '' }, rating: 5, content: 'PS5 تجربة ألعاب من مستوى آخر! تحميل الألعاب فوري والرسومات مذهلة. DualSense يضيف بعداً جديداً للعب.', createdAt: '2024-11-10T10:00:00Z' },
  { _id: 'r8', product: 'p5', user: { _id: 'u4', name: 'أحمد سليم', profileImage: '' }, rating: 5, content: 'MacBook Air M3 سريع جداً ويدوم طويلاً على البطارية. الشاشة جميلة وخفيف الوزن مثالي للسفر.', createdAt: '2024-10-20T10:00:00Z' },
];

// ─────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────
export const dummyUsers = [
  {
    _id: 'u1',
    first_name: 'Admin',
    email: 'admin@techstore.com',
    phone: '01000000000',
    role: 'admin',
    active: true,
    profileImage: '',
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    _id: 'u2',
    first_name: 'محمد علي',
    email: 'mohamed@example.com',
    phone: '01012345678',
    role: 'client',
    active: true,
    profileImage: '',
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    _id: 'u3',
    first_name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01198765432',
    role: 'client',
    active: true,
    profileImage: '',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    _id: 'u4',
    first_name: 'أحمد سليم',
    email: 'ahmed@example.com',
    phone: '01234567890',
    role: 'client',
    active: true,
    profileImage: '',
    createdAt: '2024-04-10T10:00:00Z',
  },
  {
    _id: 'u5',
    first_name: 'علي حسن',
    email: 'ali@example.com',
    phone: '01556789012',
    role: 'manager',
    active: true,
    profileImage: '',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    _id: 'u6',
    first_name: 'مريم خالد',
    email: 'mariam@example.com',
    phone: '01678901234',
    role: 'client',
    active: false,
    profileImage: '',
    createdAt: '2024-05-05T10:00:00Z',
  },
];

// Default logged-in user (client)
export const dummyCurrentUser = dummyUsers[3]; // Ahmed Selim

// ─────────────────────────────────────────────
// ADDRESSES
// ─────────────────────────────────────────────
export const dummyAddresses = [
  {
    id: 'a1',
    alias: 'المنزل',
    details: 'شارع المعادي، شقة 4، الدور الثالث',
    phone: '01012345678',
    city: 'القاهرة',
    postalCode: '11431',
  },
  {
    id: 'a2',
    alias: 'العمل',
    details: 'القرية الذكية، مبنى B، الدور الثاني',
    phone: '01198765432',
    city: 'الجيزة',
    postalCode: '12577',
  },
];

// ─────────────────────────────────────────────
// COUPONS
// ─────────────────────────────────────────────
export const dummyCoupons = [
  { _id: 'cp1', name: 'WELCOME10', discount: 10, expire: '2025-12-31T23:59:59Z', createdAt: '2024-01-01T10:00:00Z' },
  { _id: 'cp2', name: 'SUMMER20', discount: 20, expire: '2025-08-31T23:59:59Z', createdAt: '2024-06-01T10:00:00Z' },
  { _id: 'cp3', name: 'TECH15', discount: 15, expire: '2025-06-30T23:59:59Z', createdAt: '2024-03-01T10:00:00Z' },
  { _id: 'cp4', name: 'FLASH30', discount: 30, expire: '2025-01-15T23:59:59Z', createdAt: '2024-12-01T10:00:00Z' },
  { _id: 'cp5', name: 'VIP25', discount: 25, expire: '2025-12-31T23:59:59Z', createdAt: '2024-02-01T10:00:00Z' },
];

// ─────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────
export const dummyOrders = [
  {
    _id: 'o1',
    user: dummyUsers[3],
    cartItems: [
      { _id: 'ci1', product: dummyProducts[0], quantity: 1, price: 1099, color: '#000000' },
      { _id: 'ci2', product: dummyProducts[2], quantity: 2, price: 120, color: '#ff0000' },
    ],
    taxPrice: 150,
    shippingPrice: 50,
    shippingAddress: dummyAddresses[0],
    totalOrderPrice: 1539,
    paymentMethodType: 'card',
    isPaid: true,
    paidAt: '2024-10-01T10:00:00Z',
    isDelivered: true,
    deliveredAt: '2024-10-05T10:00:00Z',
    createdAt: '2024-10-01T09:30:00Z',
  },
  {
    _id: 'o2',
    user: dummyUsers[3],
    cartItems: [
      { _id: 'ci3', product: dummyProducts[3], quantity: 1, price: 398, color: '#000000' },
    ],
    taxPrice: 40,
    shippingPrice: 50,
    shippingAddress: dummyAddresses[1],
    totalOrderPrice: 488,
    paymentMethodType: 'cash',
    isPaid: false,
    isDelivered: false,
    createdAt: '2024-11-10T09:30:00Z',
  },
  {
    _id: 'o3',
    user: dummyUsers[1],
    cartItems: [
      { _id: 'ci4', product: dummyProducts[8], quantity: 1, price: 449, color: '#ffffff' },
      { _id: 'ci5', product: dummyProducts[10], quantity: 1, price: 349, color: '#000000' },
    ],
    taxPrice: 80,
    shippingPrice: 50,
    shippingAddress: dummyAddresses[0],
    totalOrderPrice: 928,
    paymentMethodType: 'card',
    isPaid: true,
    paidAt: '2024-11-05T10:00:00Z',
    isDelivered: false,
    createdAt: '2024-11-05T09:00:00Z',
  },
  {
    _id: 'o4',
    user: dummyUsers[2],
    cartItems: [
      { _id: 'ci6', product: dummyProducts[4], quantity: 1, price: 1199, color: '#c0c0c0' },
    ],
    taxPrice: 120,
    shippingPrice: 50,
    shippingAddress: dummyAddresses[0],
    totalOrderPrice: 1369,
    paymentMethodType: 'card',
    isPaid: true,
    paidAt: '2024-09-20T10:00:00Z',
    isDelivered: true,
    deliveredAt: '2024-09-25T10:00:00Z',
    createdAt: '2024-09-20T09:00:00Z',
  },
  {
    _id: 'o5',
    user: dummyUsers[3],
    cartItems: [
      { _id: 'ci7', product: dummyProducts[11], quantity: 1, price: 249, color: '#ffffff' },
      { _id: 'ci8', product: dummyProducts[9], quantity: 3, price: 45, color: '#000000' },
    ],
    taxPrice: 40,
    shippingPrice: 50,
    shippingAddress: dummyAddresses[0],
    totalOrderPrice: 424,
    paymentMethodType: 'cash',
    isPaid: false,
    isDelivered: false,
    createdAt: '2024-11-15T09:30:00Z',
  },
];

// ─────────────────────────────────────────────
// INITIAL CART
// ─────────────────────────────────────────────
export const dummyCartItems = [
  {
    _id: 'ci1',
    product: dummyProducts[0],
    quantity: 1,
    price: 1099,
    color: '#000000',
  },
  {
    _id: 'ci2',
    product: dummyProducts[2],
    quantity: 2,
    price: 120,
    color: '#ff0000',
  },
];

// ─────────────────────────────────────────────
// WISHLIST
// ─────────────────────────────────────────────
export const dummyWishlist = [dummyProducts[3], dummyProducts[8]];

// ─────────────────────────────────────────────
// HELPER: get reviews for a product
// ─────────────────────────────────────────────
export const getProductReviews = (productId) =>
  dummyReviews.filter((r) => r.product === productId);

// ─────────────────────────────────────────────
// DEMO ACCOUNTS (for quick login)
// ─────────────────────────────────────────────
export const demoAccounts = {
  admin: { email: 'admin@techstore.com', password: 'admin123', role: 'admin' },
  client: { email: 'ahmed@example.com', password: 'client123', role: 'client' },
};
