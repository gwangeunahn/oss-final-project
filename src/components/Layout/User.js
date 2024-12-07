import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer'
import HeaderUser from '../Common/HeaderUser';

export default function LayoutIn() {
  return (
    <div className="container">
      <HeaderUser/>
        <Outlet/>
      <Footer/>
    </div>
  )
}
