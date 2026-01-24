import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

import CartPage from "./pages/Cart/CartPage";
import ChoosePayMethoudPage from "./pages/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./pages/Admin/AdminAllOrdersPage";
import AdminOrderDetalisPage from "./pages/Admin/AdminOrderDetalisPage";
import AdminAddBrandPage from "./pages/Admin/AdminAddBrandPage";

import AdminAddCategoryPage from "./pages/Admin/AdminAddCategoryPage";

import AdminAddSubCategoryPage from "./pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./pages/Admin/AdminAddProductsPage";

import UserAllOrdersPage from "./pages/User/UserAllOrdersPage";
import UserFavoriteProductsPage from "./pages/User/UserFavoriteProductsPage";
import UserAllAddresPage from "./pages/User/UserAllAddresPage";
import UserAddAddressPage from "./pages/User/UserAddAddressPage";
import UserEditAddressPage from "./pages/User/UserEditAddressPage";
import UserProfilePage from "./pages/User/UserProfilePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 دقائق
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/auth/ForgetPassword ";
import VerifyCodePage from "./pages/auth/VerifyCodePage";
import ResetPasswordPage from "./pages/auth/ResetPassword";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import UserRoute from "./components/auth/UserRoute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verifycode" element={<VerifyCodePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrand />} />
          <Route path="/products" element={<ShopProductPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/paymethoud" element={<ChoosePayMethoudPage />} />

          {/* admin routes */}

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoute />}>
              <Route
                path="/admin/allproducts"
                element={<AdminAllProductsPage />}
              />
              <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
              <Route
                path="/admin/addcategory"
                element={<AdminAddCategoryPage />}
              />
              <Route
                path="/admin/addsubcategory"
                element={<AdminAddSubCategoryPage />}
              />
              <Route
                path="/admin/addproduct"
                element={<AdminAddProductsPage />}
              />
              <Route
                path="/admin/orders/:id"
                element={<AdminOrderDetalisPage />}
              />
              <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            </Route>

            {/* user routes */}

            <Route element={<UserRoute />}>
              <Route path="/user/allorders" element={<UserAllOrdersPage />} />
              <Route
                path="/user/favoriteproducts"
                element={<UserFavoriteProductsPage />}
              />
              <Route path="/user/addresses" element={<UserAllAddresPage />} />
              <Route
                path="/user/add-address"
                element={<UserAddAddressPage />}
              />
              <Route
                path="/user/edit-address"
                element={<UserEditAddressPage />}
              />
              <Route path="/user/profile" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
