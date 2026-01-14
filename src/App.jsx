import "./App.css";
import Footer from "./components/utility/Footer";

import NavBar from "./components/utility/NavBar";

import HomePage from "./pages/Home/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import RegisterPage from "./pages/auth/RegisterPage";

import AllCategoryPage from "./pages/Category/AllGategoryPage";

import AllBrand from "./pages/brand/AllBrandPage";
import ShopProductPage from "./pages/product/ShopProductPage";

import ProductDetalisPage from "./pages/product/ProductDetailsPage";

import CartPage   from "./pages/Cart/CartPage";
import ChoosePayMethoudPage from "./pages/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./pages/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./pages/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "./pages/Admin/AdminAddBrandPage";

import AdminAddCategoryPage from "./pages/Admin/AdminAddCategoryPage";

import AdminAddSubCategoryPage from "./pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./pages/Admin/AdminAddProductsPage";
function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<RegisterPage />} />
          
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrand />} />
          <Route path="/products" element={<ShopProductPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/paymethoud" element={<ChoosePayMethoudPage />} />

          <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
          <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
          <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
          <Route path="/admin/addsubcategory" element={<AdminAddSubCategoryPage />} />
          <Route path="/admin/addproduct" element={<AdminAddProductsPage />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetalisPage />} />
          <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />



        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
