import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import Nav_ from "../../Nav/Nav_";
import classes from "./Home_head.module.css";
import { useSelector } from "react-redux";
import { AllCoverimg } from "../../../Api/Coverimg";
// swiper

const Home_head = () => {
  const [coveimglist, setcoveimglist] = useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const storeid = sessionStorage.getItem("store_id");

    var allcoverimg = await AllCoverimg();
    var mystoredata = await allcoverimg.filter((data) => {
      return Number(data.store) === Number(storeid);
    });
    setcoveimglist(mystoredata);
  };
  return (
    <div>
      <Nav_ />
      <div className={classes.Home_swiper}>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {coveimglist.length !== 0
            ? coveimglist.map((data, index) => (
                <SwiperSlide>
                  {" "}
                  <img src={data.image} key={index} />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};

export default Home_head;
