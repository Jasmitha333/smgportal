import React, { useState } from 'react';
import { Coffee, ShoppingCart, Plus, Minus, CreditCard, Clock, Star } from 'lucide-react';

export const CanteenPage = () => {
  const [cart, setCart] = useState([]);

  const menuItems = [
    { id: 1, name: 'Veg Thali', price: 80, category: 'Meals', rating: 4.5, available: true },
    { id: 2, name: 'Non-Veg Thali', price: 120, category: 'Meals', rating: 4.7, available: true },
    { id: 3, name: 'Paneer Sandwich', price: 50, category: 'Snacks', rating: 4.2, available: true },
    { id: 4, name: 'Samosa (2 pcs)', price: 20, category: 'Snacks', rating: 4.0, available: true },
    { id: 5, name: 'Coffee', price: 15, category: 'Beverages', rating: 4.3, available: true },
    { id: 6, name: 'Tea', price: 10, category: 'Beverages', rating: 4.4, available: true },
    { id: 7, name: 'Biryani', price: 100, category: 'Meals', rating: 4.8, available: true },
    { id: 8, name: 'Fruit Juice', price: 30, category: 'Beverages', rating: 4.1, available: true },
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find(c => c.id === itemId);
    if (existing.quantity > 1) {
      setCart(cart.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== itemId));
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2 flex items-center gap-3">
              <Coffee size={32} /> Canteen Service
            </h1>
            <p className="text-[#87CEEB] opacity-90">Order your meals and snacks online</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
            <p className="text-sm text-[#87CEEB] mb-1">Balance</p>
            <p className="text-2xl font-bold">₹450</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-6">
          {['Meals', 'Snacks', 'Beverages'].map(category => (
            <div key={category} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-[#1B254B] mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.filter(item => item.category === category).map(item => (
                  <div key={item.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-[#0B4DA2] transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-[#1B254B] font-bold">{item.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-[#A3AED0]">{item.rating}</span>
                        </div>
                      </div>
                      <p className="font-bold text-[#0B4DA2]">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full mt-3 bg-[#0B4DA2] text-white py-2 rounded-lg font-bold hover:bg-[#042A5B] transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} /> Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit sticky top-6">
          <h3 className="text-[#1B254B] mb-4 flex items-center gap-2">
            <ShoppingCart size={20} /> Your Order
          </h3>
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[#A3AED0]">
              <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#1B254B]">{item.name}</p>
                      <p className="text-xs text-[#A3AED0]">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-[#1B254B] w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 bg-[#0B4DA2] text-white rounded-lg flex items-center justify-center hover:bg-[#042A5B]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#A3AED0]">Subtotal</span>
                  <span className="font-bold text-[#1B254B]">₹{totalAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A3AED0]">GST (5%)</span>
                  <span className="font-bold text-[#1B254B]">₹{(totalAmount * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold text-[#1B254B]">Total</span>
                  <span className="font-bold text-[#0B4DA2] text-xl">₹{(totalAmount * 1.05).toFixed(2)}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <CreditCard size={20} /> Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-[#1B254B] mb-4 flex items-center gap-2">
          <Clock size={20} /> Recent Orders
        </h3>
        <div className="space-y-3">
          {[
            { id: 'ORD001', items: 'Veg Thali, Coffee', amount: 95, date: 'Dec 12, 2024', status: 'Delivered' },
            { id: 'ORD002', items: 'Biryani, Juice', amount: 130, date: 'Dec 11, 2024', status: 'Delivered' },
            { id: 'ORD003', items: 'Samosa, Tea', amount: 30, date: 'Dec 10, 2024', status: 'Delivered' },
          ].map(order => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-[#1B254B] text-sm">{order.id}</p>
                <p className="text-sm text-[#A3AED0]">{order.items}</p>
                <p className="text-xs text-[#A3AED0] mt-1">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1B254B]">₹{order.amount}</p>
                <span className="text-xs font-bold text-[#05CD99] bg-green-50 px-2 py-1 rounded-lg">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
