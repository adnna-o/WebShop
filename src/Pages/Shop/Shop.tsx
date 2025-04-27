import React, { useEffect, useState } from 'react';
import './Shop.css';
import api from '../../api/axiosInstance';
import ProductCard, { Product } from '../../Components/ProductCard/ProductCard';
import FiltersSidebar from '../../Components/FilterSidebar/FilterSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setGenderFilter } from '../../Redux/slices/filterSlice';
import { useParams } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import ArrowLeftIcon from '../../Components/BackIcon/BackIcon';
import ArrowRightIcon from '../../Components/ArrowRightIcon/ArrowRightIcon';
import { useTranslation } from 'react-i18next';

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const {t} = useTranslation();

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
    fetchFilteredProducts();
  }, [genders, categories, brands, sizes, colors, min_price, max_price, currentPage]); 

  const fetchFilteredProducts = async () => {
    const queryParams = new URLSearchParams();
    genders.forEach((id) => queryParams.append('genders[]', id.toString()));
    categories.forEach((id) => queryParams.append('categories[]', id.toString()));
    brands.forEach((id) => queryParams.append('brands[]', id.toString()));
    sizes.forEach((id) => queryParams.append('sizes[]', id.toString()));
    colors.forEach((id) => queryParams.append('colors[]', id.toString()));
    queryParams.append('min_price', min_price.toString());
    queryParams.append('max_price', max_price.toString());
    queryParams.append('page', currentPage.toString()); 

    const url = `/filterProducts?${queryParams.toString()}`;
    console.log(url);
    const response = await api.get(url);
    console.log(response.data.data);
    setProducts(response.data.data);
    setTotalPages(response.data.meta.last_page); 
    setLoading(false);
  };

  const renderTitle = () => {
    if (!gender) return t('shop');  
    return t(`gender.${gender}`);  
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1); 
  };

  return (
    <div className="shop-container">
      <div className="main-container">
        {loading ? (
          <div className="loader-container">
            <Rings height="100" width="100" color="#564fcb" ariaLabel="rings-loading" wrapperClass="loader-wrapper" />
          </div>
        ) : (
          <>
          <FiltersSidebar />
          <div className="shop-box">
            <div className="shop-title">
              <p>{renderTitle()}</p>
            </div>
            <div className="shop-content">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-results-message">
                  <h4>{t('noResultsFound')}</h4>
                </div>
              )}
            </div>
            
            {/* Paginacija */}
            {products.length > 0 && (
              <div>
                <ReactPaginate
                  previousLabel={currentPage > 1 ? <ArrowLeftIcon width="15px" height="15px" /> : null}
                  nextLabel={currentPage < totalPages ? <ArrowRightIcon /> : null}
                  breakLabel="..."
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  activeClassName="active"
                />
              </div>
            )}
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
