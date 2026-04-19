import { createContext, useContext, useState } from 'react';
import { dummyWishlist } from '../data/dummyData';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(dummyWishlist);

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      setWishlist((prev) => prev.filter((p) => p._id !== product._id));
      return { added: false };
    } else {
      setWishlist((prev) => [...prev, product]);
      return { added: true };
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p._id !== productId));
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      wishlistCount: wishlist.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
