import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Edit, Plus, X, Package, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Order {
  id: number;
  customer_name: string;
  customer_whatsapp: string;
  customer_address: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, category: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    if (activeTab === 'products') {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data || []);
    } else {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching orders:', error);
      else setOrders(data || []);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingProduct) {
      await supabase.from('products').update(formData).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert([formData]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: 0, category: '' });
    fetchData();
  }

  async function deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  }

  async function updateOrderStatus(id: number, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchData();
  }

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg ${activeTab === 'products' ? 'bg-zinc-900 text-white' : 'bg-zinc-200'}`}>Productos</button>
        <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-lg ${activeTab === 'orders' ? 'bg-zinc-900 text-white' : 'bg-zinc-200'}`}>Pedidos</button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Productos</h1>
            <button onClick={() => setIsFormOpen(true)} className="bg-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={18} /> Nuevo Producto
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-bold">{editingProduct ? 'Editar' : 'Nuevo'} Producto</h2>
                  <button type="button" onClick={() => setIsFormOpen(false)}><X size={20} /></button>
                </div>
                <input className="w-full p-2 border mb-2" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <input className="w-full p-2 border mb-2" placeholder="Descripción" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <input className="w-full p-2 border mb-2" type="number" placeholder="Precio" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} required />
                <input className="w-full p-2 border mb-4" placeholder="Categoría" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                <button type="submit" className="w-full bg-zinc-900 text-white p-2 rounded">Guardar</button>
              </form>
            </div>
          )}

          {loading ? <p>Cargando...</p> : (
            <table className="w-full border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Precio</th>
                  <th className="border p-2">Categoría</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">S/.{product.price}</td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => { setEditingProduct(product); setFormData(product); setIsFormOpen(true); }} className="text-blue-600"><Edit size={18} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>
          {loading ? <p>Cargando...</p> : (
            <table className="w-full border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="border p-2">Cliente</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Estado</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border p-2">{order.customer_name}</td>
                    <td className="border p-2">S/.{order.total}</td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2 flex gap-2">
                      <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="border p-1">
                        <option value="pendiente">Pendiente</option>
                        <option value="pagado">Pagado</option>
                        <option value="enviado">Enviado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
