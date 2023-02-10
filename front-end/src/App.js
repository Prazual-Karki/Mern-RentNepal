import './App.css'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import PrivateComp from './components/PrivateComp'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import Products from './components/Product/Products'
import ShoeInfo from './components/Product/ShoeInfo'
import Profile from './components/User/Profile'
import AddProduct from './components/User/AddProduct'
import UpdateProduct from './components/User/UpdateProduct'
import Dashboard from './components/User/Dashboard'
import LegalTerms from './components/LegalTerms'
import Working from './components/Working'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/productList' element={<Products />} />
          <Route path='/working' element={<Working />} />
          <Route element={<PrivateComp />}>
            <Route path='/user/profile/:id' element={<Profile />} />
            <Route path='/user/dashboard/:id' element={<Dashboard />} />
            <Route path='/user/updateProduct/:id' element={<UpdateProduct />} />
            <Route path='/user/addProduct' element={<AddProduct />} />
            <Route path='/user/shoeInfo' element={<ShoeInfo />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/legalTerms' element={<LegalTerms />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
