import React, { useEffect, useState } from 'react';
import ArrowUpIcon from '../ArrowUpIcon/ArrowUpIcon';
import api from '../../api/axiosInstance';
import './FilterSidebar.css'; 
import MultiRangeSlider from "multi-range-slider-react";    
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { resetFilters, setBrandFilter, setCategoryFilter, setColorFilter, setPriceRange, setSizeFilter } from '../../Redux/slices/filterSlice';
import ArrowDownIcon from '../ArrowDownIcon/ArrowDownIcon';
import XIcon from '../XIcon/XIcon';
import FilterButton from '../FilterButton/FilterButton';
import { useTranslation } from 'react-i18next';

const FiltersSidebar: React.FC = () => {

  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [localMinPrice, setLocalMinPrice] = useState(0);
  const [localMaxPrice, setLocalMaxPrice] = useState(5000);
  const [visible, setVisible] = useState<Record<FilterType, boolean>>({
    categories: false,
    brands: false,
    sizes: false,
    colors: false,
  });
  const minValue = useSelector((state: RootState) => state.filters.min_price);
  const maxValue = useSelector((state: RootState) => state.filters.max_price);
  const categoriesFilter = useSelector((state: RootState) => state.filters.categories);
  const brandsFilter = useSelector((state: RootState) => state.filters.brands);
  const sizesFilter = useSelector((state: RootState) => state.filters.sizes);
  const colorsFilter = useSelector((state: RootState) => state.filters.colors);
  const gender = useSelector((state: RootState) => state.filters.genders);
  const selectedColors = useSelector((state: RootState) => state.filters.colors);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  
  useEffect(() => {
    fetchBrands();
  }, []);
  useEffect(()=>{
    fetchCategory();
  }, []);
  useEffect(()=>{
    fetchSizes();
  }, []);
  useEffect(()=>{
    fetchColors();
  }, []);
  useEffect(() => {
    resetAllFilters();
  }, [gender]);

  type FilterType = 'categories' | 'brands' | 'sizes' | 'colors';
  type Size = {id: number; size: string;};

const toggleVisibility = (type: FilterType) => {
  setVisible((prev) => ({ ...prev, [type]: !prev[type] }));
};

  const hasActiveFilters = () => {
    return (
      minValue !== 0 ||
      maxValue !== 5000 ||
      categoriesFilter.length > 0 ||
      brandsFilter.length > 0 ||
      sizesFilter.length > 0 ||
      colorsFilter.length > 0
    );
  };

  const resetAllFilters = () => {
    dispatch(resetFilters());
    setLocalMinPrice(0);
    setLocalMaxPrice(5000);
  };
  
  const fetchBrands = async () => {
    try {
      const response = await api.get('/brands');
      const brandsData = response.data.data;  
      setBrands(brandsData);  
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategory=async ()=>{
    try {
      const response= await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
    }

  const fetchSizes=async ()=>{
    try {
      const response= await api.get('/sizes'); 
      setSizes(response.data);
    } catch (error) {
      console.error(error);
    }
    }

  const fetchColors=async ()=>{
    try {
      const response= await api.get('/colors');  
      setColors(response.data);
    } catch (error) {
      console.error(error);
    }
    }

  return (
    <div className="side-box">
      
      {/* Category Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('categories')}>
          <p className="side-item-title" style={{ cursor: 'pointer' }}>{t('category')}</p>
          {visible.categories ? (
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        ) : (
        <ArrowDownIcon style={{ cursor: 'pointer' }} />
         )}
        </div>
        {visible.categories && (
          <ul>
            {categories.map((category: any) => (
              <FilterButton
              key={category.id}
              label={category.name}
              onClick={() => dispatch(setCategoryFilter(category.id))}
              isSelected={categoriesFilter.includes(category.id)}
            />
            ))}
          </ul>
        )}
      </div>

      {/* Brand Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('brands')}>
          <p className="side-item-title" style={{ cursor: 'pointer' }}>{t('brand')}</p>
          {visible.brands ? (
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
          ) : (
         <ArrowDownIcon style={{ cursor: 'pointer' }} />
         )}
        </div>
        {visible.brands && (
          <ul>
            {brands.map((brand: any) => (
              <FilterButton
              key={brand.id}
              label={brand.name}
              onClick={() => dispatch(setBrandFilter(brand.id))}
              isSelected={brandsFilter.includes(brand.id)}
            />
            ))}
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="side-item">
       <div className="side-item-header" onClick={() => toggleVisibility('sizes')}>
      <p className="side-item-title" style={{ cursor: 'pointer' }}>{t('size')}</p>
      {visible.sizes ? (
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        ) : (
        <ArrowDownIcon style={{ cursor: 'pointer' }} />
         )}
      </div>
      {visible.sizes && (
      <div className="filter-sizes">
      {sizes
        .filter((value, index, self) => index === self.findIndex((t) => t.size === value.size))
        .sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size))
        .map((size: any) => (
          <FilterButton
              key={size.id}
              label={size.size}
              onClick={() => dispatch(setSizeFilter(size.id))}
              isSelected={sizesFilter.includes(size.id)}
              className="size" 
            />
        ))}
    </div>
  )}
</div>

      {/* Color Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('colors')}>
          <p className="side-item-title" style={{ cursor: 'pointer' }}>{t('color')}</p>
          {visible.colors ? (
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        ) : (
        <ArrowDownIcon style={{ cursor: 'pointer' }} />
         )}
        </div>
        {visible.colors && (
          <div className="filter-colors">
            {colors.map((color: any) => (
           <div
            key={color.id}
            className="color-item"
            onClick={() => dispatch(setColorFilter(color.id))}
            style={{
            backgroundColor: color.hex_code,
            border: selectedColors.includes(color.id)? '3px solid var(--button-border)': 'none',
           }}
          ></div>
        ))}
      </div>
      )}
      </div>


    {/* Range Filter */}
    <div className="side-item">
    <div className="side-item-header">
    <p className="side-item-title">
    {t('priceRange')}: ${minValue} - ${maxValue} 
    </p>
    </div>
    <div>
    <MultiRangeSlider
      min={0}
      max={5000}
      minValue={localMinPrice}
      maxValue={localMaxPrice}
      onChange={(e) => {        
        setLocalMinPrice(e.minValue);
        setLocalMaxPrice(e.maxValue);
         dispatch(setPriceRange({ min: e.minValue, max: e.maxValue }));
      }}
      label={false}
      ruler={false}
      style={{ 
         border: "none", 
        boxShadow: "none", 
        padding: "15px 10px" 
      }}
      barLeftColor="#f0f0f0"
      barInnerColor=" #564fcb"
      barRightColor="#f0f0f0"
      thumbLeftColor="#fff"
      thumbRightColor="#fff"
    />
   </div>
  </div>

  {/* Reset Filters Button */}
  {hasActiveFilters() && (
  <div className="reset-filters">
    <XIcon size="20px" /> 
    <span className="reset-button" onClick={resetAllFilters}>{t('resetFilter')}</span>
  </div>
  )}

</div>
)};



export default FiltersSidebar;
