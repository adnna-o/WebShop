import React, { useEffect, useState } from 'react';
import './Shop.css';
import api from '../../api/axiosInstance';
import ProductCard, { Product } from '../../Components/ProductCard/ProductCard';
import FiltersSidebar from '../../Components/FilterSidebar/FilterSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setGenderFilter } from '../../Redux/slices/filterSlice';
import { useParams } from 'react-router-dom';

type GenderParam = 'men' | 'women' | 'children' | 'all';

const genderMap: Record<Exclude<GenderParam, 'all'>, number> = {
  men: 1,
  women: 2,
  children: 3,
};

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const params = useParams<{ gender?: GenderParam }>();
  const gender = params.gender;

  const {
    genders,
    categories,
    brands,
    sizes,
    colors,
    min_price,
    max_price,
  } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    if (gender === 'all') {
      dispatch(setGenderFilter([])); 
    } else if (gender && genderMap[gender as keyof typeof genderMap]) {
      dispatch(setGenderFilter([genderMap[gender as keyof typeof genderMap]]));
    }
  }, [dispatch, gender]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const queryParams = new URLSearchParams();
      genders.forEach((id) => queryParams.append('genders[]', id.toString()));
      categories.forEach((id) => queryParams.append('categories[]', id.toString()));
      brands.forEach((id) => queryParams.append('brands[]', id.toString()));
      sizes.forEach((id) => queryParams.append('sizes[]', id.toString()));
      colors.forEach((id) => queryParams.append('colors[]', id.toString()));
      queryParams.append('min_price', min_price.toString());
      queryParams.append('max_price', max_price.toString());
      queryParams.append('page', '1');

      const url = `/filterProducts?${queryParams.toString()}`;
      console.log(url);
      const response = await api.get(url);
      console.log(response.data.data);
      setProducts(response.data.data);
    };

    fetchFilteredProducts();
  }, [genders, categories, brands, sizes, colors, min_price, max_price]);

  const renderTitle = () => {
    if (!gender) return 'Shop';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <div className="shop-container">
      <div className="main-container">
        <FiltersSidebar />
        <div className="shop-box">
          <div className="shop-title">
            <p>{renderTitle()}</p>
          </div>
          <div className="shop-content">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
