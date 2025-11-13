export interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
  pricing: {
    name: string;
    price: string;
    description: string;
  }[];
}

export const services: Service[] = [
  {
    id: 'roll-labels',
    name: 'Roll Labels Printing',
    description: 'High-quality custom roll labels for all your product labeling needs',
    detailedDescription: 'Our roll labels are perfect for businesses of all sizes. We offer custom shapes, sizes, and finishes to make your products stand out. With state-of-the-art printing technology, we ensure vibrant colors and sharp details.',
    features: [
      'Custom shapes and sizes',
      'Waterproof and durable materials',
      'Glossy or matte finishes',
      'Food-safe options available',
      'Fast turnaround time',
      'Minimum order: 100 labels'
    ],
    image: 'product-labels',
    pricing: [
      { name: 'Standard', price: '$49', description: '100-500 labels' },
      { name: 'Business', price: '$89', description: '501-1000 labels' },
      { name: 'Enterprise', price: 'Custom', description: '1000+ labels' }
    ]
  },
  {
    id: 'posters',
    name: 'Posters',
    description: 'Eye-catching posters in various sizes for marketing and decoration',
    detailedDescription: 'Make a bold statement with our premium poster printing. Perfect for events, promotions, retail displays, and interior decoration. We use high-quality paper stocks and advanced printing techniques.',
    features: [
      'Multiple size options (A4, A3, A2, A1, A0)',
      'Premium paper stocks',
      'Indoor and outdoor options',
      'Lamination available',
      'Same-day printing available',
      'Bulk discounts'
    ],
    image: 'concert-poster',
    pricing: [
      { name: 'A3 Poster', price: '$15', description: 'Single poster' },
      { name: 'A2 Poster', price: '$25', description: 'Single poster' },
      { name: 'Bulk Orders', price: 'Custom', description: '10+ posters' }
    ]
  },
  {
    id: 'flyers-leaflets',
    name: 'Flyer & Leaflets',
    description: 'Professional flyers and leaflets for effective marketing campaigns',
    detailedDescription: 'Spread your message effectively with our professionally printed flyers and leaflets. Ideal for promotions, events, and direct mail campaigns.',
    features: [
      'Various sizes (A4, A5, A6, DL)',
      'Single or double-sided',
      'Glossy or matte finish',
      'Folded options available',
      'Fast turnaround',
      'Design services available'
    ],
    image: 'marketing-flyer',
    pricing: [
      { name: 'Standard', price: '$79', description: '250 flyers' },
      { name: 'Premium', price: '$149', description: '500 flyers' },
      { name: 'Enterprise', price: '$249', description: '1000 flyers' }
    ]
  },
  {
    id: 'brochures',
    name: 'Brochure',
    description: 'Premium brochures that showcase your business professionally',
    detailedDescription: 'Create lasting impressions with our beautifully crafted brochures. Perfect for presenting your products, services, and company information in a professional manner.',
    features: [
      'Multiple folding options',
      'Premium paper quality',
      'Full-color printing',
      'Custom sizes available',
      'Perfect binding option',
      'Professional design assistance'
    ],
    image: 'business-marketing',
    pricing: [
      { name: 'Bi-fold', price: '$199', description: '100 brochures' },
      { name: 'Tri-fold', price: '$229', description: '100 brochures' },
      { name: 'Custom', price: 'Quote', description: 'Custom requirements' }
    ]
  },
  {
    id: 'business-cards',
    name: 'Business Cards',
    description: 'Make a lasting first impression with premium business cards',
    detailedDescription: 'Your business card is often the first tangible impression you make. We offer premium quality business cards with various finishes and specialty options.',
    features: [
      'Standard and custom sizes',
      'Premium cardstock',
      'Special finishes (foil, emboss, spot UV)',
      'Rounded corners option',
      'Double-sided printing',
      'Quick turnaround (2-3 days)'
    ],
    image: 'professional-business',
    pricing: [
      { name: 'Standard', price: '$49', description: '250 cards' },
      { name: 'Premium', price: '$79', description: '500 cards' },
      { name: 'Luxury', price: '$149', description: '500 cards with special finish' }
    ]
  },
  {
    id: 'packaging',
    name: 'Packaging',
    description: 'Custom packaging solutions that protect and promote your products',
    detailedDescription: 'Stand out on the shelves with custom packaging designed specifically for your brand. We offer a wide range of packaging solutions from boxes to bottles.',
    features: [
      'Custom shapes and sizes',
      'Full-color printing',
      'Various material options',
      'Eco-friendly options',
      'Prototype samples',
      'Low minimum orders'
    ],
    image: 'product-packaging',
    pricing: [
      { name: 'Small Run', price: '$299', description: '50-100 units' },
      { name: 'Standard', price: '$599', description: '100-500 units' },
      { name: 'Bulk', price: 'Custom', description: '500+ units' }
    ]
  },
  {
    id: 'logo-design',
    name: 'Logo Design',
    description: 'Professional logo design services for your brand identity',
    detailedDescription: 'A great logo is the foundation of your brand identity. Our experienced designers create unique, memorable logos that represent your business perfectly.',
    features: [
      'Multiple design concepts',
      'Unlimited revisions',
      'Vector files provided',
      'Brand guidelines',
      'Social media kit',
      '100% satisfaction guarantee'
    ],
    image: 'creative-design',
    pricing: [
      { name: 'Basic', price: '$199', description: '2 concepts, 3 revisions' },
      { name: 'Professional', price: '$399', description: '4 concepts, unlimited revisions' },
      { name: 'Premium', price: '$699', description: 'Full brand package' }
    ]
  },
  {
    id: 'office-stationery',
    name: 'Office Stationary',
    description: 'Complete office stationery solutions for professional businesses',
    detailedDescription: 'Keep your office running smoothly with our comprehensive stationery printing services. From letterheads to envelopes, we have all your office needs covered.',
    features: [
      'Letterheads',
      'Envelopes',
      'Notepads',
      'Compliment slips',
      'Folders',
      'Matching sets available'
    ],
    image: 'office-workspace',
    pricing: [
      { name: 'Starter Pack', price: '$149', description: 'Basic stationery set' },
      { name: 'Business Pack', price: '$299', description: 'Complete office set' },
      { name: 'Corporate Pack', price: '$499', description: 'Premium full set' }
    ]
  },
  {
    id: 'signage',
    name: 'Signage',
    description: 'Indoor and outdoor signage solutions for maximum visibility',
    detailedDescription: 'Make your business visible with our professional signage solutions. We offer both indoor and outdoor options in various sizes and materials.',
    features: [
      'Indoor and outdoor options',
      'Weather-resistant materials',
      'Custom sizes available',
      'Mounting options included',
      'LED options available',
      'Installation services'
    ],
    image: 'business-signage',
    pricing: [
      { name: 'Small', price: '$99', description: 'Up to 2x2 ft' },
      { name: 'Medium', price: '$199', description: 'Up to 4x4 ft' },
      { name: 'Large', price: 'Custom', description: 'Custom size' }
    ]
  },
  {
    id: 'magazines',
    name: 'Magazines',
    description: 'Professional magazine printing for publications and catalogs',
    detailedDescription: 'Bring your publication to life with our professional magazine printing services. Perfect for corporate magazines, catalogs, and periodicals.',
    features: [
      'Multiple binding options',
      'Various page counts',
      'Premium paper stocks',
      'Full-color or black & white',
      'Glossy or matte covers',
      'Short and long runs'
    ],
    image: 'magazine-publication',
    pricing: [
      { name: '24 Pages', price: '$4.50', description: 'Per magazine' },
      { name: '48 Pages', price: '$7.50', description: 'Per magazine' },
      { name: 'Custom', price: 'Quote', description: 'Custom specifications' }
    ]
  },
  {
    id: 'pullup-banners',
    name: 'Pullup Banners',
    description: 'Portable and professional pull-up banners for events and exhibitions',
    detailedDescription: 'Perfect for trade shows, events, and retail environments. Our pull-up banners are easy to set up and transport while maintaining a professional appearance.',
    features: [
      'Easy setup and takedown',
      'Portable carrying case',
      'High-resolution printing',
      'Replaceable graphics',
      'Durable construction',
      'Multiple size options'
    ],
    image: 'trade-show',
    pricing: [
      { name: 'Standard', price: '$149', description: '33" x 79" banner' },
      { name: 'Premium', price: '$199', description: '47" x 79" banner' },
      { name: 'Deluxe', price: '$249', description: 'Double-sided banner' }
    ]
  },
  {
    id: 'labels-print',
    name: 'Labels Print',
    description: 'Custom printed labels for products, shipping, and organization',
    detailedDescription: 'From product labels to shipping labels, we offer comprehensive label printing services for all your needs.',
    features: [
      'Die-cut shapes',
      'Waterproof options',
      'Various adhesives',
      'Full-color printing',
      'Barcode compatible',
      'Quick turnaround'
    ],
    image: 'product-labels',
    pricing: [
      { name: 'Sheet Labels', price: '$39', description: '100 sheets' },
      { name: 'Roll Labels', price: '$79', description: '500 labels' },
      { name: 'Custom', price: 'Quote', description: 'Special requirements' }
    ]
  },
  {
    id: 't-shirts',
    name: 'T Shirts',
    description: 'Custom printed t-shirts for teams, events, and promotions',
    detailedDescription: 'Create custom t-shirts for your team, event, or promotional campaign. We offer various printing methods and quality garments.',
    features: [
      'Screen printing',
      'Digital printing',
      'Embroidery available',
      'Various brands and colors',
      'All sizes available',
      'No minimum order'
    ],
    image: 'custom-apparel',
    pricing: [
      { name: 'Basic', price: '$15', description: 'Per shirt (12+ qty)' },
      { name: 'Premium', price: '$22', description: 'Per shirt (12+ qty)' },
      { name: 'Custom', price: 'Quote', description: 'Special printing' }
    ]
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Custom calendars for marketing and gifts',
    detailedDescription: 'Keep your brand in front of customers year-round with custom printed calendars. Perfect for corporate gifts and marketing.',
    features: [
      'Wall and desk calendars',
      'Custom start month',
      'Full-color printing',
      'High-quality paper',
      'Wire or spiral binding',
      'Personalization options'
    ],
    image: 'desk-calendar',
    pricing: [
      { name: 'Desk Calendar', price: '$8', description: 'Per calendar (50+)' },
      { name: 'Wall Calendar', price: '$12', description: 'Per calendar (50+)' },
      { name: 'Premium', price: '$18', description: 'Per calendar (50+)' }
    ]
  },
  {
    id: 'presentation-folders',
    name: 'Presentation Folders',
    description: 'Professional folders for impressive business presentations',
    detailedDescription: 'Make your presentations stand out with custom printed folders. Perfect for proposals, sales kits, and corporate materials.',
    features: [
      'Multiple pocket options',
      'Business card slits',
      'Gloss or matte lamination',
      'Custom sizes available',
      'Foil stamping option',
      'Eco-friendly materials'
    ],
    image: 'business-presentation',
    pricing: [
      { name: 'Standard', price: '$2.50', description: 'Per folder (100+)' },
      { name: 'Premium', price: '$4.50', description: 'Per folder (100+)' },
      { name: 'Luxury', price: '$7.50', description: 'Per folder with special finish' }
    ]
  },
  {
    id: 'menu-cafe',
    name: 'Menu Cafe',
    description: 'Custom menus for restaurants, cafes, and bars',
    detailedDescription: 'Create appetizing menus that showcase your offerings. We offer various formats and finishes perfect for any dining establishment.',
    features: [
      'Multiple sizes and formats',
      'Laminated options',
      'Water-resistant materials',
      'Easy-to-update designs',
      'Single or multi-page',
      'Quick turnaround'
    ],
    image: 'restaurant-menu',
    pricing: [
      { name: 'Single Page', price: '$5', description: 'Per menu (25+)' },
      { name: 'Bi-fold', price: '$8', description: 'Per menu (25+)' },
      { name: 'Premium', price: '$15', description: 'Multi-page menu (25+)' }
    ]
  },
  {
    id: 'dvd-wraps',
    name: 'DVD Wraps',
    description: 'Professional DVD and CD packaging and printing',
    detailedDescription: 'Complete DVD/CD packaging solutions including disc printing, case inserts, and wraps for a professional finish.',
    features: [
      'Full-color disc printing',
      'Custom case inserts',
      'Shrink wrapping',
      'Various case options',
      'Short and long runs',
      'Fast production'
    ],
    image: 'media-packaging',
    pricing: [
      { name: 'Basic', price: '$3', description: 'Per DVD with insert' },
      { name: 'Standard', price: '$5', description: 'Per DVD with printing' },
      { name: 'Premium', price: '$8', description: 'Complete package' }
    ]
  },
  {
    id: 'promotional-items',
    name: 'Promotional Items',
    description: 'Wide range of branded promotional products for marketing',
    detailedDescription: 'Boost your brand visibility with our extensive range of promotional items. From pens to bags, we can brand almost anything.',
    features: [
      'Wide product selection',
      'Custom branding',
      'Various printing methods',
      'Quality guaranteed',
      'Bulk discounts',
      'Free samples available'
    ],
    image: 'promotional-products',
    pricing: [
      { name: 'Small Items', price: '$2-5', description: 'Pens, keychains, etc.' },
      { name: 'Medium Items', price: '$5-15', description: 'Mugs, bags, etc.' },
      { name: 'Large Items', price: '$15+', description: 'Tech items, apparel, etc.' }
    ]
  }
];
