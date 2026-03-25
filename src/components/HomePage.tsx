/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MessageCircle, 
  Search, 
  Monitor, 
  Printer, 
  Scan, 
  Wallet, 
  ScrollText, 
  Tag,
  X,
  ChevronRight,
  Utensils,
  ShoppingBag,
  Warehouse
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, Product, HERO_SLIDES } from '../data';

interface CartItem extends Product {
  quantity: number;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000); // Aumentado a 7 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_SLIDES[currentSlide].image} 
            alt={HERO_SLIDES[currentSlide].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="px-8 max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tighter"
              >
                Moderniza tu negocio hoy.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-white/90 mb-10 font-light"
              >
                Equipos POS de alta resistencia para los que no se detienen.
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  const element = document.getElementById('product-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-all"
              >
                Comprar ahora
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all rounded-full ${
              currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'products' | 'support' | 'drivers'>('products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'Todo el catálogo', icon: <Tag size={18} /> },
    { id: 'pc', name: 'PCs POS', icon: <Monitor size={18} /> },
    { id: 'printer', name: 'Impresoras', icon: <Printer size={18} /> },
    { id: 'scanner', name: 'Lectores', icon: <Scan size={18} /> },
    { id: 'drawer', name: 'Cajones', icon: <Wallet size={18} /> },
    { id: 'paper', name: 'Insumos', icon: <ScrollText size={18} /> },
    { id: 'barcode-printer', name: 'Etiquetadoras', icon: <Printer size={18} /> },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const sendWhatsApp = () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor, completa tus datos para generar el pedido.');
      return;
    }

    const phoneNumber = '51900000000'; // Reemplazar con el número real del vendedor
    let message = `*Nuevo Pedido de Cotización*\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Teléfono:* ${customerPhone}\n`;
    message += `*Dirección:* ${customerAddress}\n\n`;
    message += `*Productos:*\n`;
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} - S/.${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total estimado: S/.${cartTotal.toFixed(2)}*\n\n`;
    message += `*Métodos de pago:*\n- Yape / Plin: 900 000 000\n- BCP: 191-00000000-0-00\n\n`;
    message += `Por favor, envíanos la captura de pantalla de tu pago por aquí para validar tu pedido y proceder con el envío.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight text-black">PosTec</span>
            </div>

            <nav className="hidden md:flex gap-8">
              <button onClick={() => setActiveTab('products')} className="text-sm text-zinc-600 hover:text-black transition-colors">Productos</button>
              <button onClick={() => setActiveTab('support')} className="text-sm text-zinc-600 hover:text-black transition-colors">Soporte</button>
              <button onClick={() => setActiveTab('drivers')} className="text-sm text-zinc-600 hover:text-black transition-colors">Drivers</button>
            </nav>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              {activeTab === 'products' && (
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar equipos..."
                    className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent focus:bg-white focus:ring-2 focus:ring-zinc-900 rounded-full text-sm transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'products' && <HeroSlider />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <>
            {/* Kits de Inicio */}
            <section className="py-16">
              <h2 className="text-3xl font-semibold mb-8 tracking-tighter">Kits de Inicio (Combos)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-zinc-100 p-8 rounded-3xl">
                  <h3 className="text-xl font-semibold mb-2">Combo Básico</h3>
                  <p className="text-zinc-600 mb-6">Lectora + Impresora</p>
                  <button className="bg-black text-white px-6 py-2 rounded-full text-sm">Ver Combo</button>
                </div>
                <div className="bg-zinc-100 p-8 rounded-3xl">
                  <h3 className="text-xl font-semibold mb-2">Combo Pro</h3>
                  <p className="text-zinc-600 mb-6">Lectora + Impresora + Papel</p>
                  <button className="bg-black text-white px-6 py-2 rounded-full text-sm">Ver Combo</button>
                </div>
                <div className="bg-zinc-100 p-8 rounded-3xl">
                  <h3 className="text-xl font-semibold mb-2">Combo Impresión</h3>
                  <p className="text-zinc-600 mb-6">Impresora + Papel</p>
                  <button className="bg-black text-white px-6 py-2 rounded-full text-sm">Ver Combo</button>
                </div>
              </div>
            </section>

            {/* Cómo comprar */}
            <section className="py-16 bg-zinc-900 text-white rounded-3xl mb-16">
              <div className="max-w-5xl mx-auto px-8">
                <h2 className="text-3xl font-semibold mb-12 text-center tracking-tighter">¿Cómo comprar?</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">1</div>
                    <h4 className="font-semibold mb-2">Elige</h4>
                    <p className="text-zinc-400 text-sm">Selecciona tus equipos.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">2</div>
                    <h4 className="font-semibold mb-2">Coordina</h4>
                    <p className="text-zinc-400 text-sm">Confirma por WhatsApp.</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">3</div>
                    <h4 className="font-semibold mb-2">Realizar el pago</h4>
                    <p className="text-zinc-400 text-sm">YAPE / PLIN / BCP</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">4</div>
                    <h4 className="font-semibold mb-2">Recibe</h4>
                    <p className="text-zinc-400 text-sm">Disfruta tu equipo.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories */}
            <div id="product-section" className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-black text-white' 
                      : 'bg-white text-zinc-600 border border-zinc-100 hover:border-zinc-300'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:border-zinc-300 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden bg-zinc-100 relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                        <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-zinc-500 border border-zinc-200">
                          {product.category}
                        </span>
                        <span className="bg-zinc-900 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-zinc-800">
                          {product.warranty}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-zinc-900 mb-1 group-hover:text-zinc-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-zinc-500 line-clamp-2 mb-4 min-h-[40px]">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-zinc-900">
                          S/.{product.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="p-2 bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded-xl transition-all active:scale-95"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-full text-zinc-400 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-medium text-zinc-900">No se encontraron productos</h3>
                <p className="text-zinc-500">Intenta con otros términos de búsqueda o categoría.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'support' && (
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Soporte Técnico AI</h2>
            <p className="text-zinc-600 mb-8">¿Tienes problemas con tus equipos? Nuestro asistente IA por WhatsApp está listo para ayudarte.</p>
            <button 
              onClick={() => window.open('https://wa.me/51900000000', '_blank')}
              className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
            >
              Contactar Soporte por WhatsApp
            </button>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Descarga de Drivers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRODUCTS.filter(p => p.driverUrl).map(product => (
                <div key={product.id} className="p-4 border border-zinc-200 rounded-xl flex justify-between items-center">
                  <span className="font-medium">{product.name}</span>
                  <a href={product.driverUrl} target="_blank" rel="noopener noreferrer" className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800">Descargar</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProduct(null);
                setActiveImageIndex(0);
              }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <div className="md:w-1/2 bg-zinc-100 relative flex flex-col">
                  <div className="flex-1 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={selectedProduct.images[activeImageIndex]} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <button 
                      onClick={() => {
                        setSelectedProduct(null);
                        setActiveImageIndex(0);
                      }}
                      className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-full text-zinc-900 md:hidden"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  {/* Image Thumbnails */}
                  {selectedProduct.images.length > 1 && (
                    <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            activeImageIndex === idx ? 'border-zinc-900 scale-105' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          {selectedProduct.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
                          • {selectedProduct.warranty}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                        {selectedProduct.name}
                      </h2>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedProduct(null);
                        setActiveImageIndex(0);
                      }}
                      className="p-2 hover:bg-zinc-100 rounded-full transition-colors hidden md:block"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="text-zinc-600 mb-6">
                    {selectedProduct.description}
                  </p>

                  {selectedProduct.recommendedFor && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Recomendado para:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.recommendedFor.map((item, i) => (
                          <span key={i} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-md border border-zinc-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.specs && (
                    <div className="mb-8 flex-1 overflow-y-auto pr-2">
                      <h4 className="text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">Especificaciones</h4>
                      <ul className="space-y-2">
                        {selectedProduct.specs.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
                    <div className="text-2xl font-bold text-zinc-900">
                      ${selectedProduct.price.toFixed(2)}
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        setActiveImageIndex(0);
                      }}
                      className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95"
                    >
                      <Plus size={18} />
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-zinc-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  <h2 className="text-lg font-bold">Tu Carrito</h2>
                  <span className="bg-zinc-100 px-2 py-0.5 rounded text-xs font-medium text-zinc-500">
                    {cartCount} items
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300 mb-4">
                      <ShoppingCart size={32} />
                    </div>
                    <p className="text-zinc-500">Tu carrito está vacío</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-zinc-900 font-semibold hover:underline"
                    >
                      Seguir comprando
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-zinc-900 truncate">{item.name}</h4>
                        <p className="text-sm text-zinc-500 mb-2">S/.{item.price.toFixed(2)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-zinc-50 text-zinc-500"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium border-x border-zinc-200">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-zinc-50 text-zinc-500"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-200 bg-zinc-50">
                  <div className="space-y-4 mb-6">
                    <input type="text" placeholder="Nombre completo" className="w-full p-3 rounded-xl border border-zinc-200" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    <input type="text" placeholder="Teléfono" className="w-full p-3 rounded-xl border border-zinc-200" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                    <input type="text" placeholder="Dirección de envío" className="w-full p-3 rounded-xl border border-zinc-200" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
                  </div>
                  <div className="mb-6 p-4 bg-white rounded-xl border border-zinc-200 text-sm space-y-2">
                    <p className="font-bold text-zinc-900">Métodos de pago:</p>
                    <p className="text-zinc-600">• Yape / Plin: 900 000 000</p>
                    <p className="text-zinc-600">• BCP: 191-00000000-0-00</p>
                    <p className="text-zinc-500 pt-2 text-xs">Una vez pagado, envía la captura por WhatsApp para generar tu pedido y envío.</p>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-2xl font-bold text-zinc-900">
                      S/.{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={sendWhatsApp}
                    className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-zinc-200"
                  >
                    <MessageCircle size={20} />
                    Confirmar Pedido por WhatsApp
                    <ChevronRight size={18} />
                  </button>
                  <p className="text-center text-[10px] text-zinc-400 mt-4 uppercase tracking-widest">
                    Serás redirigido para coordinar el pago y envío
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white">
                  <Monitor size={18} />
                </div>
                <span className="text-lg font-bold tracking-tight">PosTec</span>
              </div>
              <p className="text-zinc-500 max-w-sm">
                Tu aliado tecnológico para el punto de venta. Ofrecemos hardware de alta calidad 
                con garantía y soporte especializado.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categorías</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>PCs para Punto de Venta</li>
                <li>Impresoras Térmicas</li>
                <li>Lectores de Código</li>
                <li>Insumos y Papel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>Soporte Técnico</li>
                <li>Ventas Corporativas</li>
                <li>WhatsApp: +51 900 000 000</li>
                <li>Email: ventas@posstore.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-100 text-center text-sm text-zinc-400">
            © 2026 PosTec. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
