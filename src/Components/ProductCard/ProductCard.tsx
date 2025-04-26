import React from 'react';
import "./ProductCard.css";
import { Rating } from 'react-simple-star-rating';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';


interface Image {
  id: number;
  name: string;
  path: string;
  is_main: number;
}

interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  avg_rating: string;
  brand: Brand;
  images: Image[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images.find(img => img.is_main === 1) || product.images[0];
  const genderFilter = useSelector((state: RootState) => state.filters.genders);

  return (
    <div className='product-card'>
        <div className='product-card-content'>
      <div className='product-image'>
      {product.images?.length > 0 && (
     <img src="/images/login-removebg-preview.png" alt={product.name}
        />
)}
      </div>
      <div className='product-details'>
        <div className='product-more'>
          <p className='product-name'>{product.name}</p>
          <p className='product-brand'>{product.brand.name}</p>
        </div>
        <div className='product-price'>${product.price}</div>
      </div>
      <div className='product-rating'>
        <Rating
         readonly
         initialValue={parseFloat(product.avg_rating)}
         size={20}
         SVGstyle={{ display: 'inline-block' }}
         allowFraction />
    </div>
      <div className='add-to-cart'>
      <button>Add to cart</button>
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
