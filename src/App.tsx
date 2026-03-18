import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import ReturnRequest from './pages/ReturnRequest';
import Profile from './pages/Profile';
import SearchPage from './pages/Search';
import Addresses from './pages/Addresses';
import HelpSupport from './pages/HelpSupport';
import About from './pages/About';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/app" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="orders" element={<Orders />} />
        <Route path="return/:id" element={<ReturnRequest />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="about" element={<About />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
