import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type{ RootState } from '../app/store';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Heart, User, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items); // agar wishlist slice bana liya ho

  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ShopSphere
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            {/* Yahan baad mein search input add karenge Home page ke saath */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Heart size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart with Mini Cart */}
            <div className="relative">
              <button
                onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-1"
              >
                <ShoppingCart size={22} />
                {totalItemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </button>

              {/* Mini Cart Dropdown */}
              {isMiniCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700 p-4 z-50">
                  <h3 className="font-semibold mb-3">Your Cart ({totalItemsInCart})</h3>
                  
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">Cart is empty</p>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-auto space-y-3 mb-4">
                        {cartItems.slice(0, 3).map(item => (
                          <div key={item.id} className="flex gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1 text-sm">
                              <p className="line-clamp-1">{item.name}</p>
                              <p>₹{item.price} × {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t dark:border-gray-700 pt-3">
                        <div className="flex justify-between font-semibold mb-3">
                          <span>Total</span>
                          <span>₹{totalPrice}</span>
                        </div>
                        <button 
                          onClick={() => { navigate('/cart'); setIsMiniCartOpen(false); }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium"
                        >
                          View Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <User size={22} />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-700">
          {/* Mobile links */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
