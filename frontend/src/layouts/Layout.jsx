import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../component/Navbar';
// import Footer from './Footer';

const Layout = () => {
  return (
    <>
    <div className='container mx-auto'>
        <Navbar />
    </div>
    <main>
        <Outlet />
    </main>
    </>
  )
}

export default Layout