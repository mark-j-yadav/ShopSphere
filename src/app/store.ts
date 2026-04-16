import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import toastReducer from '../features/toast/toastSlice';
import commentReducer from '../features/comment/commentSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    toast: toastReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../features/cart/cartSlice';
// import wishlistReducer from '../features/wishlist/wishlistSlice';
// import toastReducer from '../features/toast/toastSlice';
// import commentReducer from '../features/comment/commentSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     wishlist: wishlistReducer,
//     toast: toastReducer,
//     comment: commentReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
