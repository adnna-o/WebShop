import React, { useEffect, useState } from 'react';
import ArrowUpIcon from '../ArrowUpIcon/ArrowUpIcon';
import api from '../../api/axiosInstance';
import './FilterSidebar.css'; 
import MultiRangeSlider from "multi-range-slider-react";    
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setBrandFilter, setCategoryFilter, setColorFilter, setPriceRange, setSizeFilter } from '../../Redux/slices/filterSlice';

const FiltersSidebar: React.FC = () => {

  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [selectedSizes, setSelectedSize] = useState<number[]>([]); 
  const dispatch = useDispatch();
  const minValue = useSelector((state: RootState) => state.filters.min_price);
  const maxValue = useSelector((state: RootState) => state.filters.max_price);

  type FilterType = 'categories' | 'brands' | 'sizes' | 'colors';
  type Size = {
    id: number;
    size: string;
  };

  const [visible, setVisible] = useState<Record<FilterType, boolean>>({
  categories: true,
  brands: true,
  sizes: true,
  colors: true,
});

const toggleVisibility = (type: FilterType) => {
  setVisible((prev) => ({ ...prev, [type]: !prev[type] }));
};

const handleSizeClick = (sizeId: number) => {
    const newSelectedSizes = selectedSizes.includes(sizeId)
      ? selectedSizes.filter(id => id !== sizeId)  
      : [...selectedSizes, sizeId];  
  
    setSelectedSize(newSelectedSizes);  
    dispatch(setSizeFilter(newSelectedSizes));  
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get('/brands');
        const brandsData = response.data[0];  
        setBrands(brandsData);  
      } catch (error) {
        console.error('Greška prilikom dohvaćanja brendova:', error);
      }
    };
  
    fetchBrands();
  }, []);

  useEffect(()=>{
    const fetchCategory=async ()=>{
    try {
      const response= await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja kategorija:', error);
    }
    }

    fetchCategory();

  }, []);

  useEffect(()=>{
    const fetchSizes=async ()=>{
    try {
      const response= await api.get('/sizes'); 
      setSizes(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja velicina:', error);
    }
    }

    fetchSizes();

  }, []);

  useEffect(()=>{
    const fetchColors=async ()=>{
    try {
      const response= await api.get('/colors');  
      setColors(response.data);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja boja:', error);
    }
    }

    fetchColors();

  }, []);


  return (
    <div className="side-box">
      {/* Category Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('categories')}>
          <p className="side-item-title">Category</p>
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        </div>
        {visible.categories && (
          <ul>
            {categories.map((category: any) => (
              <li key={category.id} onClick={() => dispatch(setCategoryFilter(category.id))}>
              {category.name}
            </li>
            ))}
          </ul>
        )}
      </div>

      {/* Brand Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('brands')}>
          <p className="side-item-title">Brand</p>
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        </div>
        {visible.brands && (
          <ul>
            {brands.map((brand: any) => (
              <li key={brand.id} onClick={() => dispatch(setBrandFilter(brand.id))}>
              {brand.name}
            </li>
            ))}
          </ul>
        )}
      </div>

      {/* Size Filter */}
      <div className="side-item">
  <div className="side-item-header" onClick={() => toggleVisibility('sizes')}>
    <p className="side-item-title">Size</p>
    <ArrowUpIcon style={{ cursor: 'pointer' }} />
  </div>
  {visible.sizes && (
    <div className="filter-sizes">
      {sizes
        .filter((value, index, self) => index === self.findIndex((t) => t.size === value.size))
        .sort((a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size))
        .map((size: any) => (
          <div
            key={size.id}
            onClick={() => handleSizeClick(size.id)} 
            className={`size-item ${selectedSizes.includes(size.id) ? 'selected' : ''}`} 
          >
            {size.size}
          </div>
        ))}
    </div>
  )}
</div>

      {/* Color Filter */}
      <div className="side-item">
        <div className="side-item-header" onClick={() => toggleVisibility('colors')}>
          <p className="side-item-title">Color</p>
          <ArrowUpIcon style={{ cursor: 'pointer' }} />
        </div>
        {visible.colors && (
          <div className="filter-colors">
            {colors.map((color: any) => (
              <div
                key={color.id}
                className="color-item"
                onClick={() => dispatch(setColorFilter(color.id))}
                style={{
                  backgroundColor: color.hex_code
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
      Price Range: ${minValue} - ${maxValue} 
    </p>
  </div>
  <div style={{ padding: '0 10px' }}>
    <MultiRangeSlider
      min={0}
      max={5000}
      step={5}
      ruler={false}
      label={false}
      minValue={minValue}
      maxValue={maxValue}
      onChange={(e) => {        
        dispatch(setPriceRange({ min: e.minValue, max: e.maxValue }));
      }}
    />
  </div>
</div>
    </div>
  );
};

export default FiltersSidebar;
