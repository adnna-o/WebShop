import { FC } from "react";
import "./Cards.css";
import { FaHeart } from "react-icons/fa";

// Swiper core
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

export const Cards: FC = () => {
  return (
    <div className="cards-wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {Array.from({ length: 5 }).map((_, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="product-slider">
              {[1, 2, 3, 4].map((_, i) => (
                <div className="card" key={i}>
                  <img
                    src="./images/women.webp"
                    alt="product"
                    className="product-image"
                  />
                  <div className="price">
                    <button className="btn-price">$</button>
                  </div>
                  <div className="product-info">
                    <p className="product-category">Category</p>
                    <p className="product-brand">Brand</p>
                  </div>
                  <div className="card-buttons">
                    <button className="heart-btn">
                      <FaHeart color="#5978DC" size={18} />
                    </button>
                    <button className="buy-btn">BUY</button>
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
