// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
// import { ThemeProvider } from './context/ThemeContext';

// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import ProductDetail from './pages/ProductDetail';
// import Cart from './pages/Cart';
// import Wishlist from './pages/Wishlist';
// import Checkout from './pages/Checkout';

// function App() {
//   return (
//     <Provider store={store}>
//       <ThemeProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
//             <Navbar />
            
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/wishlist" element={<Wishlist />} />
//               <Route path="/checkout" element={<Checkout />} />
              
//               {/* 404 Page */}
//               <Route path="*" element={
//                 <div className="flex flex-col items-center justify-center min-h-[70vh]">
//                   <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
//                   <p className="text-2xl mb-6">Page Not Found</p>
//                   <a href="/" className="text-indigo-600 hover:underline text-lg">
//                     Go Back to Home
//                   </a>
//                 </div>
//               } />
//             </Routes>
//           </div>
//         </Router>
//       </ThemeProvider>
//     </Provider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import ToastContainer from './components/ToastContainer';   // ← Import

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                  <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
                  <p className="text-2xl mb-6">Page Not Found</p>
                  <a href="/" className="text-indigo-600 hover:underline text-lg">
                    Go Back to Home
                  </a>
                </div>
              } />
            </Routes>
           
            {/* Global Toast Container */}
            {/* Global Toast Container */}
            <ToastContainer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
