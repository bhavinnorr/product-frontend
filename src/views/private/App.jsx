import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar' 
// import Login from '../Login'
import ProductList from './ProductList'

export default function App() {
  return (
    <>
        {/* <BrowserRouter> */}
        <Navbar />
        {/* <LoadingBar
          color='#f11946'
          progress={progress}
        /> */}
        {/* <Routes> */}
            {/* <Route exact path='/' element={<Login/>} />   */}
            {/* <Route exact path='/product-list' element={<ProductList/>} /> */}
        {/* </Routes> */}

      {/* </BrowserRouter> */}
    </>
  )
}
