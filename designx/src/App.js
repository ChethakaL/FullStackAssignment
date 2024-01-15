import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'

// Import Swiper styles
import 'swiper/css';

// Screens
import Home from './screens/Home';
import Layout from './screens/Layout';
import Contact from './screens/Contact';
import Shop from './screens/Shop';
import Product from './screens/Product';
import NoPage from './screens/NoPage';
import Dashboard from './screens/admin/Dashboard';
import AdminLayout from './screens/admin/AdminLayout';
import AddProduct from './screens/admin/AddProduct';
import UpdateProduct from './screens/admin/UpdateProduct';
import Login from './screens/admin/Login';
import { CartProvider } from './components/CartContext';
import PaypalButton from './components/PaypalButton';
import CustomerLogin from './screens/CustomerLogin';
import CategoryShop from './screens/CategoryShop';
import ManageOrders from './screens/admin/ManageOrders';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Result from './screens/Results';
import ReviewTable from './screens/admin/ReviewTable';
import PurchaseTable from './screens/admin/PurchaseTable';
import PaymentScreen from './screens/PaymentScreen';

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/customer-login" element={<CustomerLogin />}/>
        <Route path="/customer-register" element={<Register />}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
          <Route path="result/:searchTerm" element={<Result />} />
          <Route path="category-shop/:category" element={<CategoryShop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="payment" element={<PaymentScreen />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/paypal" element={<PaypalButton />}/>
        <Route path="/login" element={<Login />}/>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product" element={<UpdateProduct />} />
          <Route path='manage' element={<ManageOrders/>}/>
          <Route path='review' element={<ReviewTable/>}/>
          <Route path='purchase' element={<PurchaseTable/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
