'use client';
import {Swiper} from 'swiper/react';
import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SliderProducts({children}: {children: React.ReactNode}) {
    const id = Math.random().toString(36).slice(2);    
  return (
    <div className="relative pt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={8}
        slidesPerGroup={8}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
       breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          640: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          980: {
            slidesPerView: 5,
            slidesPerGroup: 5
          },
          1280: {
            slidesPerView: 6,
            slidesPerGroup: 6
          }
        }}
        className="categories-swiper"
      >
        {children}
      </Swiper>
    </div>
  );
}


export default SliderProducts;
