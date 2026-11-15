export const products = [
  // BIRIYANI & RICE
  {
    id: "bir-01",
    name: "Malabar Dum Chicken Biriyani",
    category: "biriyani",
    price: 210,
    rating: 4.9,
    reviewsCount: 342,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Kaima rice dum biriyani infused with slow-simmered aromatic spices, tender chicken, caramelized onions and hard-boiled egg.",
    variants: [
      { id: "reg", name: "Regular Portion", price: 210 },
      { id: "full", name: "Full Pot (2 Pax)", price: 380 }
    ],
    addons: [
      { id: "extra-egg", name: "Extra Boiled Egg", price: 20 },
      { id: "extra-raita", name: "Special Raita & Date Pickle", price: 30 },
      { id: "extra-chicken-piece", name: "Extra Chicken Dum Piece", price: 70 }
    ]
  },
  {
    id: "bir-02",
    name: "Calicut Beef Dum Biriyani",
    category: "biriyani",
    price: 240,
    rating: 4.8,
    reviewsCount: 289,
    isVeg: false,
    isPopular: true,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    description: "Tender succulently spiced beef chunks layered between fragrant Malabar short-grain rice with mint and fried cashews.",
    variants: [
      { id: "reg", name: "Regular Portion", price: 240 },
      { id: "full", name: "Full Pot (2 Pax)", price: 440 }
    ],
    addons: [
      { id: "extra-beef-piece", name: "Extra Tender Beef Piece", price: 90 },
      { id: "extra-raita", name: "Extra Raita & Chutney", price: 30 }
    ]
  },
  {
    id: "bir-03",
    name: "Fragrant Neychoru (Ghee Rice)",
    category: "biriyani",
    price: 130,
    rating: 4.7,
    reviewsCount: 164,
    isVeg: true,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Jeerakasala rice cooked in pure golden ghee, topped with crispy shallots and golden sultanas.",
    variants: [
      { id: "reg", name: "Regular", price: 130 }
    ],
    addons: [
      { id: "papad-pickle", name: "Papad & Pickle Set", price: 25 }
    ]
  },

  // SHAWARMA
  {
    id: "shw-01",
    name: "Signature Loaded Chicken Shawarma",
    category: "shawarma",
    price: 150,
    rating: 4.9,
    reviewsCount: 420,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=800&q=80",
    description: "Slow-roasted marinated chicken shaved hot from the spit, rolled in freshly baked rumali roti with garlic toum and pickles.",
    variants: [
      { id: "roll", name: "Rumali Roll", price: 150 },
      { id: "plate", name: "Jumbo Shawarma Plate with Kuboos", price: 220 }
    ],
    addons: [
      { id: "extra-cheese", name: "Melted Cheddar Cheese", price: 30 },
      { id: "extra-toum", name: "Extra Garlic Toum Mayo", price: 25 },
      { id: "spicy-peri", name: "Fiery Peri-Peri Dust", price: 15 }
    ]
  },
  {
    id: "shw-02",
    name: "Smoky Charcoal Beef Shawarma",
    category: "shawarma",
    price: 170,
    rating: 4.8,
    reviewsCount: 215,
    isVeg: false,
    isPopular: true,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    description: "Caramelized beef strips with charred notes, tahini drizzle, parsley, sumac onions wrapped warmly.",
    variants: [
      { id: "roll", name: "Regular Roll", price: 170 },
      { id: "jumbo", name: "Jumbo Meat Only (No Salad)", price: 230 }
    ],
    addons: [
      { id: "extra-cheese", name: "Extra Cheddar Slice", price: 30 },
      { id: "tahini-dip", name: "Creamy Sesame Tahini", price: 30 }
    ]
  },

  // BURGERS
  {
    id: "brg-01",
    name: "The CKB Monster Crispy Burger",
    category: "burgers",
    price: 190,
    rating: 4.9,
    reviewsCount: 310,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-crispy golden chicken thigh fillet, secret Kattans spicy glaze, brioche bun, crunchy iceberg lettuce and double melted cheese.",
    variants: [
      { id: "single", name: "Single Patty", price: 190 },
      { id: "double", name: "Double Trouble (Double Patty)", price: 270 }
    ],
    addons: [
      { id: "bacon-rasher", name: "Crispy Chicken Bacon", price: 45 },
      { id: "cheese-slice", name: "Extra American Cheese", price: 30 },
      { id: "jalapenos", name: "Pickled Jalapenos", price: 20 }
    ]
  },
  {
    id: "brg-02",
    name: "Classic Smashed Beef Burger",
    category: "burgers",
    price: 210,
    rating: 4.7,
    reviewsCount: 195,
    isVeg: false,
    isPopular: false,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    description: "Crispy lacy-edge smashed beef patty on butter-toasted brioche with smoky caramelized onions and Kattans house sauce.",
    variants: [
      { id: "single", name: "Single Smashed Patty", price: 210 },
      { id: "double", name: "Double Smashed Patty", price: 290 }
    ],
    addons: [
      { id: "egg", name: "Fried Sunny Egg", price: 25 },
      { id: "cheese", name: "Extra Melted Cheddar", price: 30 }
    ]
  },

  // FRIED CHICKEN
  {
    id: "frd-01",
    name: "Crispy Golden Fried Chicken (4 Pcs)",
    category: "fried-chicken",
    price: 280,
    rating: 4.8,
    reviewsCount: 260,
    isVeg: false,
    isPopular: true,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    description: "Deep-fried to golden crunchiness on the outside while keeping the chicken juicy and tender inside, served with garlic dip.",
    variants: [
      { id: "4pcs", name: "4 Pieces Bucket", price: 280 },
      { id: "8pcs", name: "8 Pieces Feast Bucket", price: 520 }
    ],
    addons: [
      { id: "fries-side", name: "Add French Fries", price: 70 },
      { id: "peri-dust", name: "Peri Peri Seasoning", price: 20 },
      { id: "garlic-dip", name: "Extra Garlic Dip", price: 25 }
    ]
  },
  {
    id: "frd-02",
    name: "Hot & Fiery Chicken Wings (6 Pcs)",
    category: "fried-chicken",
    price: 210,
    rating: 4.7,
    reviewsCount: 180,
    isVeg: false,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    description: "Crisp fried chicken wings tossed in our signature hot pepper glaze with sesame sprinkle.",
    variants: [
      { id: "6pcs", name: "6 Wings", price: 210 },
      { id: "12pcs", name: "12 Wings Bucket", price: 380 }
    ],
    addons: [
      { id: "ranch", name: "Creamy Ranch Dip", price: 30 }
    ]
  },

  // KERALA SPECIALS
  {
    id: "ker-01",
    name: "Flaky Malabar Porotta (Set of 3)",
    category: "kerala-specials",
    price: 60,
    rating: 4.9,
    reviewsCount: 512,
    isVeg: true,
    isPopular: true,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80",
    description: "Multi-layered, flaky, soft hand-stretched Kerala parottas beaten fresh on the hot griddle.",
    variants: [
      { id: "3pcs", name: "Set of 3 Porottas", price: 60 },
      { id: "5pcs", name: "Set of 5 Porottas", price: 95 }
    ],
    addons: [
      { id: "extra-porotta", name: "Single Extra Porotta", price: 20 }
    ]
  },
  {
    id: "ker-02",
    name: "Kerala Slow-Roasted Beef Roast",
    category: "kerala-specials",
    price: 230,
    rating: 4.9,
    reviewsCount: 380,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Spicy dark caramelized beef chunks pan-roasted with coconut slices, crushed shallots, curry leaves and fresh black pepper.",
    variants: [
      { id: "half", name: "Regular Plate", price: 230 },
      { id: "full", name: "Full Feast Plate", price: 390 }
    ],
    addons: [
      { id: "fried-coconut", name: "Extra Fried Coconut Bits (Thengakothu)", price: 30 }
    ]
  },
  {
    id: "ker-03",
    name: "Travancore Chicken Curry",
    category: "kerala-specials",
    price: 200,
    rating: 4.7,
    reviewsCount: 190,
    isVeg: false,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    description: "Chicken simmered in rich coconut milk gravy tempered with mustard seeds, whole red chilies and fresh curry leaves.",
    variants: [
      { id: "reg", name: "Regular Bowl", price: 200 }
    ],
    addons: [
      { id: "appam-pair", name: "Add 2 Soft Appams", price: 40 }
    ]
  },

  // STARTERS & GRILLS
  {
    id: "str-01",
    name: "Charcoal Pepper Alfaham Chicken",
    category: "starters",
    price: 260,
    rating: 4.8,
    reviewsCount: 320,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    description: "Arabic charcoal grilled chicken marinated with ground Malabar black pepper, garlic, lime and grilled over wood coals. Served with kuboos & mayonnaise.",
    variants: [
      { id: "half", name: "Half Chicken (With 2 Kuboos)", price: 260 },
      { id: "full", name: "Full Chicken (With 4 Kuboos)", price: 480 }
    ],
    addons: [
      { id: "kuboos", name: "Extra Kuboos (2 Pcs)", price: 30 },
      { id: "mayo", name: "Garlic Dip Extra", price: 25 }
    ]
  },
  {
    id: "str-02",
    name: "Crispy Paneer 65 Bites",
    category: "starters",
    price: 180,
    rating: 4.6,
    reviewsCount: 140,
    isVeg: true,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    description: "Crispy cottage cheese cubes tossed with green chillies, curry leaves and Southern spice batter.",
    variants: [
      { id: "reg", name: "Standard Plate", price: 180 }
    ],
    addons: [
      { id: "mint-chutney", name: "Extra Mint Chutney", price: 20 }
    ]
  },

  // COMBOS
  {
    id: "cmb-01",
    name: "Chicken Biriyani & Kattan Combo",
    category: "combos",
    price: 240,
    rating: 4.9,
    reviewsCount: 410,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Our signature Chicken Dum Biriyani paired with raita, pickle, pappadam and piping hot CKB Special Sulaimani Kattan tea.",
    variants: [
      { id: "single", name: "Solo Combo", price: 240 }
    ],
    addons: [
      { id: "gulab-jamun", name: "Add Sweet Gulab Jamun (2 pcs)", price: 40 }
    ]
  },
  {
    id: "cmb-02",
    name: "Burger, Golden Fries & Shake Combo",
    category: "combos",
    price: 310,
    rating: 4.8,
    reviewsCount: 220,
    isVeg: false,
    isPopular: true,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    description: "CKB Monster Crispy Burger served with salted French fries and rich chocolate milkshake.",
    variants: [
      { id: "reg", name: "Standard Combo", price: 310 }
    ],
    addons: [
      { id: "cheese-fries", name: "Upgrade to Cheesy Fries", price: 40 }
    ]
  },
  {
    id: "cmb-03",
    name: "Shawarma & Fresh Mint Lime Combo",
    category: "combos",
    price: 195,
    rating: 4.8,
    reviewsCount: 310,
    isVeg: false,
    isPopular: true,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=800&q=80",
    description: "Signature Loaded Chicken Shawarma roll accompanied by ice-cold refreshing Mint Lime juice.",
    variants: [
      { id: "reg", name: "Standard Combo", price: 195 }
    ],
    addons: [
      { id: "extra-cheese", name: "Add Melted Cheese", price: 30 }
    ]
  },
  {
    id: "cmb-04",
    name: "Porotta & Beef Roast Feast Combo",
    category: "combos",
    price: 290,
    rating: 4.9,
    reviewsCount: 460,
    isVeg: false,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=800&q=80",
    description: "3 Flaky hot Malabar porottas with Kerala Beef Roast, sliced shallots, lime and hot sulaimani tea.",
    variants: [
      { id: "reg", name: "Single Feast", price: 290 }
    ],
    addons: [
      { id: "extra-porotta-2", name: "2 Extra Porottas", price: 38 }
    ]
  },

  // BEVERAGES
  {
    id: "bev-01",
    name: "CKB Special Sulaimani Kattan Tea",
    category: "beverages",
    price: 30,
    rating: 4.9,
    reviewsCount: 650,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    description: "Our legendary aromatic black tea brewed with crushed cardamom, fresh mint sprigs, ginger and a squeeze of fresh lemon.",
    variants: [
      { id: "cup", name: "Regular Glass", price: 30 },
      { id: "flask", name: "Sharing Flask (3 Cups)", price: 80 }
    ],
    addons: []
  },
  {
    id: "bev-02",
    name: "Chilled Mint Fresh Lime Cooler",
    category: "beverages",
    price: 50,
    rating: 4.8,
    reviewsCount: 210,
    isVeg: true,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Refreshing crushed ice drink with freshly pressed lemon, garden mint leaves and sweet soda or water.",
    variants: [
      { id: "soda", name: "Sparkling Soda", price: 50 },
      { id: "water", name: "Still Water", price: 40 }
    ],
    addons: []
  },
  {
    id: "bev-03",
    name: "Belgian Chocolate Thick Shake",
    category: "beverages",
    price: 130,
    rating: 4.8,
    reviewsCount: 175,
    isVeg: true,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-thick gourmet chocolate shake topped with whipped cream, cocoa nibs and chocolate sauce drizzle.",
    variants: [
      { id: "glass", name: "350ml Glass", price: 130 }
    ],
    addons: [
      { id: "icecream-scoop", name: "Extra Vanilla Ice Cream Scoop", price: 30 }
    ]
  },

  // DESSERTS
  {
    id: "des-01",
    name: "Royal Malabar Falooda",
    category: "desserts",
    price: 160,
    rating: 4.9,
    reviewsCount: 290,
    isVeg: true,
    isPopular: true,
    isSpecial: false,
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    description: "Layers of rose syrup, vermicelli, sabja seeds, fresh fruits, kulfi ice cream and crunchy dry fruit toppings.",
    variants: [
      { id: "std", name: "Standard Tall Glass", price: 160 }
    ],
    addons: [
      { id: "dry-fruits", name: "Extra Roasted Cashews & Pistachios", price: 30 }
    ]
  },
  {
    id: "des-02",
    name: "Hot Gulab Jamun with Ice Cream",
    category: "desserts",
    price: 110,
    rating: 4.7,
    reviewsCount: 160,
    isVeg: true,
    isPopular: false,
    isSpecial: false,
    isRecommended: false,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    description: "Two warm melt-in-the-mouth milk solid dumplings dipped in rose-scented cardamom sugar syrup, paired with vanilla ice cream.",
    variants: [
      { id: "std", name: "2 Jamuns + Ice Cream", price: 110 }
    ],
    addons: []
  }
];
