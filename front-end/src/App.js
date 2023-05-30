import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateComp from './components/PrivateComp'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login.js'
import Products from './components/Product/Products'
import ShoeInfo from './components/Product/ShoeInfo'
import Profile from './components/User/Profile'
import AddProduct from './components/User/AddProduct'
import UpdateProduct from './components/User/UpdateProduct'
import Dashboard from './components/User/Dashboard'
import LegalTerms from './components/LegalTerms'
import Working from './components/Working'
import AdminPanel from './components/Admin/AdminPanel'
import AllUsers from './components/Admin/AllUsers'
import AllProducts from './components/Admin/AllProducts'
import Overview from './components/Admin/Overview'
import AdminLogin from './components/Admin/AdminLogin'
import AdminPrivate from './components/Admin/AdminPrivate'
import Trekking from './components/Product/Trekking'
import Watch from './components/Product/Watch'
import Musical from './components/Product/Musical'
import BiCycle from './components/Product/BiCycle'
import LadiesItem from './components/Product/LadiesItem'
import CoatBlazers from './components/Product/CoatBlazers'
import WholeProducts from './components/Product/AllProducts'
import CarryBags from './components/Product/CarryBags'
import ScrollToTop from './ScrollToTop'
import RentalDetails from './components/Admin/RentalDetails'
import RentalHistory from './components/User/RentalHistory'

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/productList' element={<Products />}>
            <Route path='/productList' element={<WholeProducts />} />
            <Route path='/productList/trekking' element={<Trekking />} />
            <Route path='/productList/watch' element={<Watch />} />
            <Route path='/productList/music' element={<Musical />} />
            <Route path='/productList/biCycle' element={<BiCycle />} />
            <Route path='/productList/ladiesItem' element={<LadiesItem />} />
            <Route path='/productList/coats' element={<CoatBlazers />} />
            <Route path='/productList/carryBags' element={<CarryBags />} />
          </Route>
          <Route path='/user/shoeInfo/:id' element={<ShoeInfo />} />

          <Route path='/working' element={<Working />} />
          <Route path='/adminLogin' element={<AdminLogin />} />

          <Route element={<AdminPrivate />}>
            <Route path='/admin' element={<AdminPanel />}>
              <Route path='/admin' element={<Overview />} />
              <Route path='/admin/allUsers' element={<AllUsers />} />
              <Route path='/admin/allProducts' element={<AllProducts />} />
              <Route path='/admin/rentalDetails' element={<RentalDetails />} />
            </Route>
          </Route>

          <Route element={<PrivateComp />}>
            <Route path='/user/profile/:id' element={<Profile />} />
            <Route path='/user/dashboard/:id' element={<Dashboard />} />
            <Route path='/user/updateProduct/:id' element={<UpdateProduct />} />
            <Route path='/user/addProduct' element={<AddProduct />} />
            <Route path='/user/rentalHistory/:id' element={<RentalHistory />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/legalTerms' element={<LegalTerms />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
