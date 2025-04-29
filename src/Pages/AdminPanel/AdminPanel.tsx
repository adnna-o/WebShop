import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminPanel.css';
import ProductIcon from '../ProductIcon/ProductIcon';
import Discounts from '../Discounts/Discounts';
import DiscountsIcon from '../DiscountsIcon/DiscountsIcon';
import Categories from '../Categories/Categories';
import CategoriesIcon from '../CategoriesIcon/CategoriesIcon';
import BrandsIcon from '../BrandsIcon/BrandsIcon';
import ColorsIcon from '../ColorsIcon/ColorsIcon';
import SizesIcon from '../SizesIcon/SizesIcon';

const AdminPanel: React.FC = () => {
    return (
    
    <div className='layout_main'>
      <div className='sideNavigation_main'>
        <div className='sideNavigation_title'>
          <h3>Admin</h3>
          <span>.</span>
          </div>
        <div className='sideNavigation_options'>
          <Link to='admin/products' className='sideNavigation_products'><ProductIcon/> <p>Products</p></Link>
          <Link to='admin/discounts' className='sideNavigation_products'><DiscountsIcon/><p>Discounts</p></Link>
          <Link to='admin/categories' className='sideNavigation_categories'><CategoriesIcon/><p>Categories</p></Link>
          <Link to='admin/brands' className='sideNavigation_brands'><BrandsIcon/><p>Brands</p></Link>
          <Link to='admin/colors' className='sideNavigation_colors'><ColorsIcon/><p>Colors</p></Link>
          <Link to='admin/sizes' className='sideNavigation_sizes'><SizesIcon/><p>Sizes</p></Link>
        </div>
      </div>
      <div className='adminLayout_main'>
        <header>Header</header>
        <Outlet/>

      </div>
    </div>
    );
  };

  export default AdminPanel;