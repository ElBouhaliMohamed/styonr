import React from 'react';
import { Autoplay, EffectFade, Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

const params = {
  slidesPerView: 1,
  watchOverflow: false,
  autoplay: {
    delay: 5000
  },
  loop: true,
  allowTouchMove: false,
  speed: 1000,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
};
const images = [
  '/images/home (1).jpg',
  '/images/home (2).jpg',
  '/images/home (3).jpg',
  '/images/home (4).jpg',
  '/images/home (5).jpg',
];

export default function HeroSection() {
  SwiperCore.use([Autoplay, EffectFade]);
  return (
    <div className="relative bg-cover bg-center">
      <Swiper {...params}>
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <div
              className="min-h-[85vh]  flex items-center justify-center flex-col text-white py-5"
              style={{
                backgroundImage: `url("${image}")`
              }}
            >
              <p className="font-size-display5 font-family-secondary mb-4 text-center hero-header">
                Fashion which you can feel good about
              </p>
              <p className="text-transform-uppercase font-size-title mb-5 hero-subheader">
                A range of products for you
              </p>
              <Link href="/products/all" className="d-flex align-items-center bg-transparent border border-color-white h-56 px-5 font-color-white hero-btn">
                Shop now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
