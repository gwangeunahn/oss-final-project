import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Common/Header';
import Footer from '../Common/Footer'

function Layout() {
  return (
    <div className="container">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout;