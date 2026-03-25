export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  businessType: string;
}

export const HERO_SLIDES: Slide[] = [
  {
    id: 's1',
    title: 'Tu Negocio, Totalmente Equipado',
    subtitle: 'PC, Impresora, Lectora y más: La solución integral para cualquier tipo de negocio.',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1920',
    businessType: 'Solución Integral'
  },
  {
    id: 's2',
    title: 'Velocidad y Precisión en cada Venta',
    subtitle: 'Optimiza tu atención con lectores de alta velocidad e impresoras térmicas de alto rendimiento.',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1920',
    businessType: 'Eficiencia Operativa'
  },
  {
    id: 's3',
    title: 'Profesionalismo que Impulsa tus Ingresos',
    subtitle: 'Equipos robustos, duraderos y fáciles de usar. La tecnología que tu negocio necesita.',
    image: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=1920',
    businessType: 'Tecnología Confiable'
  }
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pc' | 'printer' | 'scanner' | 'drawer' | 'paper' | 'barcode-printer';
  images: string[];
  specs?: string[];
  warranty: string;
  recommendedFor?: string[];
  driverUrl?: string; // Added driverUrl
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PC All-in-One POS Pro',
    description: 'Computadora táctil de 15 pulgadas diseñada para alto tráfico. Procesador Intel Core i5, 8GB RAM, 256GB SSD.',
    price: 3200, // Updated to PEN
    category: 'pc',
    images: [
      'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Pantalla Táctil Capacitiva de 15.6"',
      'Procesador Intel Core i5 10ma Gen',
      '8GB RAM DDR4 / 256GB SSD',
      'Múltiples puertos USB, Serial y LAN',
      'Diseño robusto de aluminio'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Restaurantes', 'Minimarkets', 'Farmacias'],
    driverUrl: 'https://drivers.postec.pe/pc-all-in-one'
  },
  {
    id: '2',
    name: 'Impresora Térmica 80mm USB/LAN',
    description: 'Impresora de recibos de alta velocidad con corte automático. Ideal para boletas y facturas.',
    price: 450, // Updated to PEN
    category: 'printer',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563162110-3565f698704a?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Velocidad de impresión: 250mm/s',
      'Ancho de papel: 80mm',
      'Interfaz: USB + LAN + Serial',
      'Cortador automático de larga duración',
      'Compatible con comandos ESC/POS'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Retail', 'Gastronomía', 'Farmacias'],
    driverUrl: 'https://drivers.postec.pe/impresora-80mm'
  },
  {
    id: '3',
    name: 'Lector de Código de Barras 2D Inalámbrico',
    description: 'Escáner de alta precisión para códigos 1D y 2D (QR). Conexión Bluetooth y USB.',
    price: 280, // Updated to PEN
    category: 'scanner',
    images: [
      'https://images.unsplash.com/photo-1601598851547-4302969d0614?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Lectura de códigos 1D y 2D (QR)',
      'Conexión inalámbrica 2.4G y Bluetooth',
      'Batería de larga duración (2000mAh)',
      'Resistente a caídas de 1.5 metros',
      'Modo de almacenamiento interno'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Minimarkets', 'Farmacias', 'Almacenes'],
    driverUrl: 'https://drivers.postec.pe/lector-2d'
  },
  {
    id: '4',
    name: 'Caja Registradora Metálica Heavy Duty',
    description: 'Cajón de dinero con apertura automática RJ11. 5 compartimentos para billetes y 8 para monedas.',
    price: 250, // Updated to PEN
    category: 'drawer',
    images: [
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556742049-02e53695219e?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Construcción de acero laminado en frío',
      '5 ranuras para billetes / 8 para monedas',
      'Cerradura de 3 posiciones',
      'Conexión RJ11 para apertura automática',
      'Dimensiones: 410mm x 420mm x 100mm'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Todo tipo de negocio']
  },
  {
    id: '5',
    name: 'Pack 10 Rollos Papel Térmico 80x80',
    description: 'Papel de alta calidad para impresoras térmicas. Libre de BPA.',
    price: 95, // Updated to PEN
    category: 'paper',
    images: [
      'https://images.unsplash.com/photo-1589793463357-5fb813435467?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586075010623-26c50279c7ef?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Medida: 80mm ancho x 80mm diámetro',
      'Papel térmico de alta sensibilidad',
      'Libre de Bisfenol A (BPA)',
      'Largo aproximado: 60 metros',
      'Compatible con todas las marcas de 80mm'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Impresoras de 80mm']
  },
  {
    id: '6',
    name: 'Impresora de Etiquetas Zebra ZD220',
    description: 'Impresora de transferencia térmica para códigos de barra y etiquetas de envío.',
    price: 800, // Updated to PEN
    category: 'barcode-printer',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563162110-3565f698704a?auto=format&fit=crop&q=80&w=800'
    ],
    specs: [
      'Resolución: 203 dpi',
      'Ancho máximo de impresión: 104mm',
      'Memoria: 128MB Flash / 128MB SDRAM',
      'Conectividad USB 2.0',
      'Soporta ZPL II y EPL 2'
    ],
    warranty: 'Garantía x 1 año',
    recommendedFor: ['Logística', 'Farmacias', 'Retail'],
    driverUrl: 'https://drivers.postec.pe/zebra-zd220'
  }
];
