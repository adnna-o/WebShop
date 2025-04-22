import { FC } from "react";
import "./Cards.css";
import { FaHeart } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";

export const Cards: FC = () => {
  const { t } = useTranslation();
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
        {Array.from({ length: 5 }).map((_, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="product-slider">
              {[1, 2, 3, 4].map((_, i) => (
                <div className="card" key={i}>
                  <div className="product-image-wrapper">
                    <img
                      src="./images/women.webp"
                      alt="product"
                      className="product-image"
                    />
                    <button className="btn-price">$</button>
                  </div>
                  <div className="product-info">
                    <p className="product-category">{t("product-category")}:</p>
                    <p className="product-brand">{t("product-brand")}:</p>
                  </div>
                  <div className="card-buttons">
                    <button className="heart-btn">
                      <FaHeart color=" #6c63ff;" size={18} />
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
