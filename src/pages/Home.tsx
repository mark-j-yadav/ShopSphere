import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const debouncedSearch = useDebounce(searchTerm, 300);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [debouncedSearch, selectedCategory, sortOption]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    // Optional: toast notification add kar sakte ho
    // Optional: toast notification add kar sakte ho
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Discover Amazing Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Shop the best deals</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-5 py-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800"
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all group">
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
            </Link>

            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-lg line-clamp-2 mb-1 hover:text-indigo-600">{product.name}</h3>
              </Link>
              
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                
                <button className="p-3 border dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default Home;
