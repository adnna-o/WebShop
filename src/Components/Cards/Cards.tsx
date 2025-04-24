import { FC, useEffect } from "react";
import "./Cards.css";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchProducts } from "../../Redux/slices/productSlice";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  brand: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
}

export const Cards: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    if (!status) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const groupedProducts: Product[][] = products.reduce<Product[][]>(
    (acc, product, index) => {
      const groupIndex = Math.floor(index / 4);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(product);
      return acc;
    },
    []
  );

  return (
    <div className="cards-wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {groupedProducts.map((group, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="product-slider">
              {group.map((product) => (
                <div className="card" key={product.id}>
                  <div className="product-image-wrapper">
                    {product.images?.length > 0 && (
                      <img
                        src="/images/children.webp"
                        alt={product.name}
                      />
                    )}
                    <button className="btn-price">${product.price}</button>
                  </div>
                  <p className="product-name">
                      {product.name}
                    </p>
                  <div className="product-info">
                    {/* Prikazujemo samo prvu kategoriju i brend za svaki proizvod */}
                    
                    <p className="product-category">
                      {t("product-category")}: {product.categories[0]?.name}
                    </p>
                    <p className="product-brand">
                      {t("product-brand")}: {product.brand.name}
                    </p>
                  </div>
                  <div className="card-buttons">
                    <button className="heart-btn">
                      <FaHeart color="#6c63ff" size={18} />
                    </button>
                    <button className="buy-btn">{t("buy-btn")}</button>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cards;
