// import './App.css';
// import Home from './components/Home';
// import Footer from './components/layouts/Footer';
// import Header from './components/layouts/Header';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ProductDetail from './components/product/ProductDetail';
// import ProductSearch from './components/product/ProductSearch';
// import Login from './components/user/Login';
// import Register from './components/user/Register';
// import { useEffect, useState } from 'react';
// import store from './store';
// import { loadUser } from './actions/userActions';
// import Profile from './components/user/Profile';
// import ProtectedRoute from './components/route/ProtectedRoute';
// import UpdateProfile from './components/user/UpdateProfile';
// import UpdatePassword from './components/user/UpdatePassword';
// import ForgotPassword from './components/user/ForgotPassword';
// import ResetPassword from './components/user/ResetPassword';
// import Cart from './components/cart/Cart';
// import Shipping from './components/cart/Shipping';
// import ConfirmOrder from './components/cart/ConfirmOrder';
// import Payment from './components/cart/Payment';
// import axios from 'axios';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import OrderSuccess from './components/cart/OrderSuccess';
// import UserOrders from './components/order/UserOrders';
// import OrderDetail from './components/order/OrderDetail';
// import Dashboard from './components/admin/Dashboard';
// import ProductList from './components/admin/ProductList';
// import NewProduct from './components/admin/NewProduct';
// import UpdateProduct from './components/admin/UpdateProduct';
// import OrderList from './components/admin/OrderList';
// import UpdateOrder from './components/admin/UpdateOrder';
// import UserList from './components/admin/UserList';
// import UpdateUser from './components/admin/UpdateUser';
// import ReviewList from './components/admin/ReviewList';
// import Discounts from './components/cart/Discounts';

// function App() {
//   const [stripeApiKey, setStripeApiKey] = useState("")
//   useEffect(() => {
//     store.dispatch(loadUser)
//     async function getStripeApiKey(){
//       const {data} = await axios.get('/api/v1/stripeapi')
//       setStripeApiKey(data.stripeApiKey)
//     }
//     getStripeApiKey()
//   },[])

//   return (
//     <Router>
//       <div className="App">
//         <HelmetProvider>
//             <Header/>
//                 <div className='container container-fluid'>
//                   <ToastContainer theme='dark' />
//                   <Routes>
//                       <Route path='/' element={<Home/>} />
//                       <Route path='/search/:keyword' element={<ProductSearch/>} />
//                       <Route path='/product/:id' element={<ProductDetail/>} />
//                       <Route path='/login' element={<Login/>} />
//                       <Route path='/register' element={<Register/>} />
//                       <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
//                       <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
//                       <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
//                       <Route path='/password/forgot' element={<ForgotPassword/> } />
//                       <Route path='/password/reset/:token' element={<ResetPassword/> } />
//                       <Route path='/cart' element={<Cart/> } />
//                       <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />
//                       <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
//                       <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } />
//                       <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
//                       <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
//                       {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />
// } 
//                       <Route path='/discounts' element={<ProtectedRoute><Discounts/></ProtectedRoute>} />
//                   </Routes>
//                 </div>
//                 {/* Admin Routes */}
//                 <Routes>
//                   <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
//                   <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
//                   <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
//                   <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
//                   <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
//                   <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
//                   <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
//                   <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
//                   <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
//                 </Routes>
//             <Footer/>
//         </HelmetProvider>
//       </div>
//     </Router>
//   );
// }

// export default App;



import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import store from './store';
import { loadUser } from './actions/userActions';

import Home from './components/Home';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import AboutUs from './components/pages/AboutUs';
import Careers from './components/pages/Careers';
import ContactUs from './components/pages/ContactUs';
import HelpCenter from './components/pages/HelpCenter';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';


import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';
import Discounts from './components/cart/Discounts';

import AdminDiscounts from './components/cart/AdminDiscounts';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className='container container-fluid'>
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />}
              <Route path='/discounts' element={<ProtectedRoute><Discounts /></ProtectedRoute>} />
              
              <Route path='/admindiscounts' element={<ProtectedRoute><AdminDiscounts /></ProtectedRoute>} />

              <Route path='/about' element={<AboutUs />} />
              <Route path='/careers' element={<Careers />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/help' element={<HelpCenter />} />
              <Route path='/privacy' element={<PrivacyPolicy />} />
              <Route path='/terms' element={<TermsOfService />} />
            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
            <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
            <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
            <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
            <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} />
            <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
            <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
            <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ReviewList /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;