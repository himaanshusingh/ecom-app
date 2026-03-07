import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NofFound'
import Ai from './pages/Ai'

function App() {
  let {user} = useContext(userDataContext)
  let location = useLocation()
  return (
    <div>
      {user && <Nav/>}
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

        <Route path='/login' 
        element={user ? (<Navigate to={location.state?.from || "/"}/> ) 
        : (<Login/>)}/>

          <Route path='/signup' element={user ? (<Navigate to={location.state?.from || "/"}/> ) 
        : (<Registration/>)}/>

         
            <Route path='/about' 
            element={user ? <About/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

             <Route path='/collections' 
             element={user ? <Collections/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

              <Route path='/contact' 
              element={user ? <Contact/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>
              
               <Route path='/cart' 
               element={user ? <Cart/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

                 <Route path='/productdetail/:productId' 
               element={user ? <ProductDetail/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

               <Route path='/placeorder' 
               element={user ? <PlaceOrder/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

               <Route path='/order' 
               element={user ? <Order/> : <Navigate to="/login" state={{from: location.pathname}}/>}/>

               <Route path='*' element={<NotFound/>}/>


      </Routes>
      <Ai/>
    </div>
  )
}

export default App
