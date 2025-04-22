import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
    return (
    
    <div className='layout_main'>
      <div className='sideNavigation_main'>
        <div className='sideNavigation_title'>Admin</div>
        <div className='sideNavigation_options'>
          <Link to='products' className='sideNavigation_products'>Products</Link>
          <Link to='discounts' className='sideNavigation_products'>Discounts</Link>
          <Link to='categories' className='sideNavigation_categories'>Categories</Link>
          <Link to='brands' className='sideNavigation_brands'>Brands</Link>
          <Link to='colors' className='sideNavigation_colors'>Colors</Link>
          <Link to='sizes' className='sideNavigation_sizes'>Sizes</Link>
        </div>
      </div>
      <div className='adminLayout_main'>
        <header>This is header</header>
        <Outlet/>

      </div>
    </div>
    );
  };

  export default AdminPanel;