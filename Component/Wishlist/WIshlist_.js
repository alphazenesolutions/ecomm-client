import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./Wishlist.module.css";
import sad from "../../public/sad.png";
import { Mywishlist, Deletewishlist } from "../../Api/Wishlist";

const WIshlist_ = () => {
  const [mywislist, setmywislist] = useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    var customer_id = sessionStorage.getItem("customer_id");
    var allwishlist = await Mywishlist({ user_id: customer_id });
    setmywislist(allwishlist);
  };
  const viewbtn = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };
  const deltebtn = async (e) => {
    var deltewishlist = await Deletewishlist({ id: e.target.id });
    if (deltewishlist.message === "Deleted Successfully") {
      getalldata();
    }
  };
  return (
    <div className="p-8 ">
      <h1 className="mb-4 text-2xl">Wishlist</h1>
      <div className="py-4 ">
        {mywislist.length !== 0 ? (
          mywislist.map((data, index) => (
            <>
              <div
                className={`flex items-center justify-between my-4 ${classes.Single_wishlist}`}
              >
                <img
                  className={classes.wishlist_product_img}
                  src={data.product.original}
                  id={data.product.slug}
                  onClick={viewbtn}
                />
                <h1
                  className="font-thin text-sm tracking-wider  mb-3"
                  id={data.product.slug}
                  onClick={viewbtn}
                >
                  {data.product.name}
                </h1>
                <button
                  className="bg-yellow-300 py-2 px-4  rounded-lg"
                  id={data.product.slug}
                  onClick={viewbtn}
                >
                  View
                </button>
                <Avatar
                  className={classes.delete_wishList}
                  id={data.wishlist.id}
                  onClick={deltebtn}
                >
                  <p id={data.wishlist.id}>x</p>
                </Avatar>
              </div>
              <hr />
            </>
          ))
        ) : (
          <div>
            <center>NO PRODUCTS TO DISPLAY</center>
          </div>
        )}
      </div>
    </div>
  );
};

export default WIshlist_;
