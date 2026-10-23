import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/customer/Home'
import Products from './pages/customer/Products'
import Categories from './pages/customer/Categories'
import Cart from './pages/customer/Cart'
import Wishlist from './pages/customer/Wishlist'
import Orders from './pages/customer/Orders'
import Profile from './pages/customer/Profile'
import Dashboard from './pages/seller/Dashboard'
import ManageProducts from './pages/seller/ManageProducts'
import ProductForm from './pages/seller/ProductForm'
import SellerOrders from './pages/seller/SellerOrders'
import SellerProfile from './pages/seller/SellerProfile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/shop"
          element={
            <ProtectedRoute role="customer">
              <AppLayout role="customer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/seller"
          element={
            <ProtectedRoute role="seller">
              <AppLayout role="seller" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="add-product" element={<ProductForm />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="profile" element={<SellerProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
