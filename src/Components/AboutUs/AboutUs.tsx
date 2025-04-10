import { FC } from "react";
import "./AboutUs.css";

export const AboutUs: FC = () => {
  return (
    <div className="promo-section">
      <div className="promo-content">
        <h2> QSD SHOP</h2>
        <p>
          Our mission is to provide our customers with a seamless online
          shopping experience for high-quality, stylish clothing that empowers
          them to look and feel their best. We are committed to offering a wide
          range of modern clothing options that are both functional and
          fashionable, and we aim to make our customers lives easier by
          delivering exceptional service and exceptional products at affordable
          prices.{" "}
        </p>
        <p>
          Our vision is to become the go-to online destination for quality and
          modern clothing that inspires confidence and individuality. We strive
          to be a trusted source for fashion-forward individuals who value style
          and substance in their clothing choices. By continuously innovating
          and adapting to changing fashion trends, we aim to remain at the
          forefront of the online fashion industry, while maintaining our
          commitment to providing excellent customer service and high-quality
          products.
        </p>
      </div>
    </div>
  );
};
