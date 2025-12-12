import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ slides = [], settings = {} }) => {
  const defaultSettings = {
    // dots:true,
    // fade:true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "linear",
    speed: 800,
    arrows: false, // Hide left/right buttons
    ...settings,
  };

  return (
    <div className="slider-container">
      <Slider {...defaultSettings}>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;