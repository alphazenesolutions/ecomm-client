import React from "react";
import SingleProduct_ from "../../../Component/SingleProduct/SingleProduct_";
import Nav from "../../../Component/Nav/Nav_";
import Footer from "../../../Component/Footer/Footer";
const SingleProduct = () => {
  var store_id = process.env.STORE_ID;
  return (
    <div>
      <Nav />
      <SingleProduct_ />
      <Footer />
    </div>
  );
};

export default SingleProduct;
