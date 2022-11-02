import React, { useEffect, useState } from "react";
import classes from "./Featured_product.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Allproduct } from "../../../Api/Product";
import { SingleStore } from "../../../Api/Store";

const Featured_products = () => {
  const [productdata, setproductdata] = useState([]);
  const [productPerView, setproductPerView] = useState([]);

  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const storeid = sessionStorage.getItem("store_id");

    var allproductdata = await Allproduct();
    if (allproductdata.length !== 0) {
      var checkproduct = await allproductdata.data.filter((datanew) => {
        return datanew.store == storeid && datanew.featured !== null;
      });
      setproductdata(checkproduct);
      if (checkproduct.length <= 4) {
        setproductPerView(checkproduct.length);
      } else {
        setproductPerView(4);
      }
    }
  };
  const viewproduct = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };
  const viewallbtn = () => {
    window.location.replace(`/Sale`);
  };
  useEffect(() => {
    getuserdata();
  }, []);
  const [storename, setstorename] = useState("null");
  const getuserdata = async () => {
    var user_id = sessionStorage.getItem("user_id");
    if (user_id !== null) {
      var mystore = await SingleStore({ id: user_id });
      setstorename(mystore.data[0].storename);
    } else {
      setstorename(null);
    }
  };

  return (
    <div className="p-8 mt-4  ">
      <h1 className="text-center text-2xl ">
        {storename}'s Featured Collections
      </h1>
      <center>
        {productdata.length !== 0 ? (
          <button
            className="mt-4 border py-2 px-4 hover:bg-white-400 text-sm"
            onClick={viewallbtn}
          >
            VIEW ALL
          </button>
        ) : (
          <div className="mt-4 ">
            <h1>No Product Available</h1>
          </div>
        )}
      </center>
      <div className={`${classes.Featured_product_images} mt-8 `}>
        <Swiper
          slidesPerView={productPerView}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper "
        >
          {productdata.length !== 0
            ? productdata.map((data, index) => (
                <SwiperSlide
                  key={index}
                  id={data.slug}
                  className="swipertag"
                  onClick={viewproduct}
                >
                  <center>
                    <div
                      className={`flex flex-col items-center ${classes.product_container}`}
                      id={data.slug}
                    >
                      <img src={data.original} id={data.slug} />
                      <p className="text-center my-4" id={data.slug}>
                        {data.name}
                      </p>
                      <p className="text-black-500 font-bold" id={data.slug}>
                        ₹ {Number(data.price).toLocaleString("en-IN")} /-
                      </p>
                    </div>
                  </center>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured_products;
