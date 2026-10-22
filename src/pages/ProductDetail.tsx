// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../features/cart/cartSlice';
// import { mockProducts } from '../data/mockProducts';
// import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
// import { addToast } from '../features/toast/toastSlice';
// import type { Product } from '../types';

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const product = mockProducts.find(p => p.id === Number(id));

//   if (!product) {
//     return <div className="text-center py-20">Product not found</div>;
//   }

  
//   const handleAddToCart = (product: Product) => {
//   dispatch(addToCart({ ...product, quantity: 1 }));
  
//   dispatch(addToast({
//     message: `${product.name} added to cart successfully!`,
//     type: 'success',
//     duration: 2500
//   }));
// };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400 hover:text-indigo-600"
//       >
//         <ArrowLeft size={20} /> Back to Shop
//       </button>

//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Image Section */}
//         <div>
//           <img 
//             src={product.image} 
//             alt={product.name}
//             className="w-full rounded-3xl shadow-lg"
//           />
//         </div>

//         {/* Details */}
//         <div>
//           <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex text-amber-500">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} size={24} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
//               ))}
//             </div>
//             <span className="text-xl font-medium">{product.rating}</span>
//           </div>

//           <div className="flex items-baseline gap-3 mb-8">
//             <span className="text-5xl font-bold">₹{product.price}</span>
//             {product.originalPrice && (
//               <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</span>
//             )}
//           </div>

//           <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
//             {product.description}
//           </p>

//           {product.sizes && (
//             <div className="mb-8">
//               <p className="font-medium mb-3">Available Sizes</p>
//               <div className="flex gap-3">
//                 {product.sizes.map(size => (
//                   <div key={size} className="px-6 py-2 border dark:border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500">
//                     {size}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex gap-4">
//             <button 
//               onClick={() => handleAddToCart(product)}
//               className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3"
//             >
//               <ShoppingCart size={24} /> Add to Cart
//             </button>
            
//             <button className="px-8 border dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700">
//               ❤️
//             </button>
//           </div>

//           <p className="text-sm text-green-600 mt-6">✅ In Stock ({product.stock} left)</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addComment } from '../features/comment/commentSlice';
import { addToast } from '../features/toast/toastSlice';
import { mockProducts } from '../data/mockProducts';
import type { RootState } from '../app/store';
import type { Comment } from '../types';
import { Star, ArrowLeft, ShoppingCart, Send } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = mockProducts.find(p => p.id === Number(id));
  const allComments = useSelector((state: RootState) => state.comment.comments);
  const productComments = allComments.filter(c => c.productId === Number(id));

  const [commentText, setCommentText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const userName = 'Guest User';

  if (!product) {
    return <div className="text-center py-20 text-2xl">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(addToast({
      message: `${product.name} added to cart successfully!`,
      type: 'success'
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      productId: product.id,
      userName: userName,
      text: commentText.trim(),
      rating: userRating,
      date: new Date().toISOString()
    };

    dispatch(addComment(newComment));
    dispatch(addToast({
      message: "Thank you for your review!",
      type: 'success'
    }));

    setCommentText('');
    setUserRating(5);
  };

  // Average Rating Calculation
  const averageRating = productComments.length > 0 
    ? (productComments.reduce((sum, c) => sum + c.rating, 0) / productComments.length).toFixed(1)
    : product.rating;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400 hover:text-indigo-600"
      >
        <ArrowLeft size={20} /> Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-3xl shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={26} fill={i < Math.floor(Number(averageRating)) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-2xl font-medium">{averageRating}</span>
            <span className="text-gray-500">({productComments.length} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-5xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {product.sizes && (
            <div className="mb-8">
              <p className="font-medium mb-3">Available Sizes</p>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <div key={size} className="px-6 py-2 border dark:border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500">
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} /> Add to Cart
            </button>
          </div>

          <p className="text-green-600">✅ In Stock ({product.stock} left)</p>
        </div>
      </div>

      {/* Comment / Review Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

        {/* Add Comment Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl mb-10">
          <h3 className="text-xl font-semibold mb-6">Write a Review</h3>
          
          <form onSubmit={handleSubmitComment}>
            <div className="mb-6">
              <p className="mb-3 font-medium">Your Rating</p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="text-3xl transition-transform hover:scale-110"
                  >
                    <Star 
                      fill={star <= userRating ? "#fbbf24" : "none"} 
                      stroke={star <= userRating ? "#fbbf24" : "currentColor"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full h-32 p-5 rounded-2xl border dark:border-gray-600 bg-transparent focus:outline-none focus:border-indigo-500 resize-y"
              required
            />

            <button 
              type="submit"
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-medium flex items-center gap-2"
            >
              <Send size={20} /> Post Review
            </button>
          </form>
        </div>

        {/* Display Comments */}
        <div className="space-y-6">
          {productComments.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No reviews yet. Be the first to review!</p>
          ) : (
            productComments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < comment.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
