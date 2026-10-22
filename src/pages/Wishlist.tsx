import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type{ RootState } from '../app/store';
import type { Product } from '../types';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(removeFromWishlist(product.id)); // optional: wishlist se remove kar do
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-gray-500 hover:text-indigo-600">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length})</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 mb-4">Your wishlist is empty</p>
          <Link to="/" className="text-indigo-600 hover:underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="text-2xl font-bold mb-4">₹{product.price}</div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="p-3 border border-red-300 dark:border-red-700 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
