import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper";
import classes from "./Review.module.css";
import Rating from "@mui/material/Rating";
import ReadMoreAndLess from "react-read-more-less";
import { useSelector } from "react-redux";
import { AllReview } from "../../../Api/Review";
import moment from "moment";
const Review = () => {
  const [value, setValue] = React.useState(2);
  const [allreview, setallreview] = React.useState([]);

  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const store = sessionStorage.getItem("store_id");

    var allreview = await AllReview();
    var checkreview = await allreview.filter((data) => {
      return data.review.store == store && data.product.store == store;
    });

    setallreview(checkreview);
    // setjournaldata(checkjournal.slice(0, 4));
  };

  return (
    <>
      <div className="p-8 mt-4 ">
          <h1 className="text-center text-2xl mb-4 ">Customer Reviews</h1>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {allreview.length !== 0
              ? allreview.map((data, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`flex flex-col items-start p-4 ${classes.review}`}
                    >
                      <img
                        className={`mb-2 ${classes.Review_person}`}
                        src={
                          data.review.image === null
                            ? "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=20&m=587805156&s=612x612&w=0&h=Ok_jDFC5J1NgH20plEgbQZ46XheiAF8sVUKPvocne6Y="
                            : data.review.image
                        }
                      />
                      <p className="mb-2">{data.user.name}</p>
                      <p className="mb-2">{moment(data.review.createdAt).format("DD/MM/YYYY")}</p>
                      <Rating
                        className="mb-2"
                        name="simple-controlled"
                        value={data.review.rating}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        disabled
                      />

                      <ReadMoreAndLess
                        className="read-more-content "
                        charLimit={100}
                        readMoreText="Read more"
                        readLessText="Read less"
                      >
                        {data.review.review}
                      </ReadMoreAndLess>
                      <div
                        className={`flex items-center mt-2 bg-white-400 p-3 ${classes.review_product_img} `}
                      >
                        <img className="mr-2" src={data.product.original} />
                        <p>Maroon and Dark Green Silk Frock For Girl Baby</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              : <div className="text-center"><h1>No Review Available</h1></div>}
          </Swiper>
        </div>
    </>
  );
};

export default Review;
