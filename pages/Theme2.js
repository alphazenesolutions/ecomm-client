import React, { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../Component/Theme2/Footer/Footer";
import Featured_products from "../Component/Home/Featured_products/Featured_products";
import Home_head from "../Component/Theme2/Home/Home_Head/Home_head";
import Journal from "../Component/Home/Journal/Journal";
import Latest from "../Component/Home/Latest/Latest";
import Review from "../Component/Home/Review/Review";

import { Allstore } from "../Api/Store";
import { SingleUserElement } from "../Api/UserElement";
const Theme2 = () => {
  // get storelayout
  useEffect(() => {
    getLayout();
  }, []);
  const [userElementsArray, setuserElementsArray] = useState([]);

  const getLayout = async () => {
    var str = window.location.href;
    var part = str.split("//").pop().split("/")[0];
    var allstore = await Allstore();
    var checkdomain = await allstore.data.filter((data) => {
      return data.domain === part;
    });
    sessionStorage.setItem("store_id", checkdomain[0].id);
    sessionStorage.setItem("user_id", checkdomain[0].user_id);
    const storeid = checkdomain[0].id;
    var allstore = await Allstore();
    if (allstore.data.length !== 0) {
      const storeid = sessionStorage.getItem("store_id");

      var singleStore = allstore.data.filter((data) => {
        return data.id == storeid;
      });
      var userElements = await SingleUserElement({
        id: singleStore[0].user_id,
      });
      if (userElements.data.length !== 0) {
        if (userElements.data[0].element_list !== null) {
          var userElements_array = userElements.data[0].element_list.split(",");
          setuserElementsArray(userElements_array);
        }
      }
    }
  };
  return (
    <div>
      <Head>
        <title>E-com | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home_head />
      {/* {userElementsArray.map((data, index) => {
        return (
          <span key={index}>
            {data == "Latest" && <Latest />}
            {data == "Featured_products" && <Featured_products />}
            {data == "Journal" && <Journal />}
            {data == "Review" && <Review />}
          </span>
        );
      })} */}
      <Footer />
    </div>
  );
};

export default Theme2;
