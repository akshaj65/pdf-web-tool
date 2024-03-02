import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const PageLayout = () => {
  return (
    <Fragment>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </Fragment>
  )
}

export default PageLayout;