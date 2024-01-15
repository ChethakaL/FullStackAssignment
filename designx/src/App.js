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


function App() {
  return (
    <BrowserRouter>
    {/* <CartProvider> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    {/* </CartProvider> */}
    </BrowserRouter>
  );
}

export default App;
