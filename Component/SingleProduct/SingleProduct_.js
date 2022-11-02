import React, { useEffect, useState } from "react";
import classes from "./SingleProduct.module.css";
import { Singleproduct_bySlug, Allproduct } from "../../Api/Product";
import { productVariation, viewVariation } from "../../Api/Variation";
import { product_gallery } from "../../Api/Gallery";
import { useSelector } from "react-redux";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateCart } from "../../Api/Cart";
import { CreateWishlist } from "../../Api/Wishlist";
import { Createorder } from "../../Api/Orders";
import { Payment } from "../../Api/Orders";
import Loader from "../Loader/Loader";
import Loaders from "../Loader";

const SingleProduct_ = () => {
  const [price, setprice] = React.useState(0);
  const [type, settype] = React.useState(null);
  const [productid, setproductid] = React.useState(null);
  const [customer_id, setcustomer_id] = useState(null);
  const [isCartloading, setisCartloading] = useState(false);
  // setproduct image
  const [productImg, setproductImg] = useState("");
  const [suggestproduct, setsuggestproduct] = useState([]);
  const setProductImage = (e) => {
    setproductImg(e.target.id);
  };

  // getSingleProduct
  useEffect(() => {
    getSingleProduct();
  }, []);
  const [single_product, setsingle_product] = useState([]);
  const getSingleProduct = async () => {
    const storeid = sessionStorage.getItem("store_id");

    var customer_id = sessionStorage.getItem("customer_id");
    setcustomer_id(customer_id);
    var str = window.location.href;
    var part = str.split("//").pop().split("/").pop().split("/")[0];
    var slug_product = await Singleproduct_bySlug({
      slug: part,
    });
    var Products_size = [];
    var Products_gallery = [];
    var Products_data = [];
    var Products_color = [];
    for (var i = 0; i < slug_product.data.length; i++) {
      Products_gallery.push({
        id: slug_product.data[i].id,
        image: slug_product.data[i].original,
      });
      var product_variations = await productVariation({
        id: slug_product.data[i].id,
      });
      var product_Gallery = await product_gallery({
        id: slug_product.data[i].id,
      });
      product_Gallery.map((data) => {
        Products_gallery.push({ id: data.id, image: data.original });
      });
      product_variations.map((Data) => {
        if (Data.type == "Size") {
          Products_size.push(Data);
        } else if (Data.type == "Color") {
          Products_color.push(Data);
        }
      });
      var productsizelist = Products_size.filter(
        (v, i, a) => a.indexOf(v) === i
      );
      var productcolorlist = Products_color.filter(
        (v, i, a) => a.indexOf(v) === i
      );
      Products_data.push({
        gallery: Products_gallery,
        size: productsizelist,
        color: productcolorlist,
        category: slug_product.data[i].category,
        name: slug_product.data[i].name,
        price: slug_product.data[i].sale_price,
        slug: slug_product.data[i].slug,
        thumbnail: slug_product.data[i].thumbnail,
        original: slug_product.data[i].original,
        id: slug_product.data[i].id,
      });
    }
    setprice(Products_data[0].price);
    setproductid(Products_data[0].id);
    setsingle_product(Products_data);
    var allproduct = await Allproduct();
    if (allproduct.length !== 0) {
      var myproductdata = await allproduct.data.filter((data) => {
        return (
          data.category === Products_data[0].category &&
          data.store == storeid &&
          data.id !== Products_data[0].id
        );
      });
      setsuggestproduct(myproductdata.slice(0, 4));
    }
  };
  // increase and decrease product
  const [count, setcount] = useState(1);
  const [row, setrow] = useState([undefined]);

  const addcount = () => {
    var finalcount = Number(count) + Number(1);
    setcount(finalcount);
    var data = [];
    var countnew = finalcount;
    for (var i = 0; i < countnew; i++) {
      data.push(countnew[i]);
    }
    setrow(data);
  };
  const deleterow = () => {
    if (count == 0) {
      return;
    } else {
      var finalcount = Number(count) - Number(1);
      setcount(finalcount);
      var data = [];
      var countnew = finalcount;
      for (var i = 0; i < countnew; i++) {
        data.push(countnew[i]);
      }
      setrow(data);
    }
  };

  // getSelected product size
  const getSelectSize = async (e) => {
    var product_variations = await viewVariation({
      id: e.target.id,
    });
    setprice(product_variations[0].price);
    settype(e.target.id);
  };
  const selectcolor = async (e) => {
    var product_variations = await viewVariation({
      id: e.target.id,
    });
    setprice(product_variations[0].price);
    settype(e.target.id);
  };
  const addtocart = async (e) => {
    if (customer_id !== null) {
      if (type === null) {
        toast.error("Please Select Variation..", {
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        setisCartloading(true);

        var data = {
          product_id: e.target.id,
          user_id: sessionStorage.getItem("customer_id"),
          Quantity: count,
          price: Number(count) * price,
          variations: type,
          status: "Booked",
        };
        var createcart = await CreateCart(data);
        if (createcart.message === "SUCCESS") {
          setisCartloading(true);

          toast.success("Cart Added..", {
            autoClose: 2000,
            transition: Slide,
          });
          setisCartloading(false);
        } else {
          setisCartloading(false);
        }
      }
    } else {
      toast.error("Please Login..", {
        autoClose: 2000,
        transition: Slide,
      });
    }
  };
  const [iswislistloading, setiswislistloading] = useState(false);
  const addtowishlist = async (e) => {
    if (customer_id !== null) {
      if (type === null) {
        toast.error("Please Select Variation..", {
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        setiswislistloading(true);

        var data = {
          product_id: e.target.id,
          user_id: sessionStorage.getItem("customer_id"),
          Quantity: count,
          price: Number(count) * price,
          variations: type,
        };

        var cretewishlist = await CreateWishlist(data);
        if (cretewishlist.message === "SUCCESS") {
          setiswislistloading(true);
          toast.success("Wishlist Added..", {
            autoClose: 2000,
            transition: Slide,
          });
          setiswislistloading(false);
        } else {
          setiswislistloading(false);
        }
      }
    } else {
      toast.error("Please Login..", {
        autoClose: 2000,
        transition: Slide,
      });
    }
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const [isbuyNowloading, setisbuyNowloading] = useState(false);
  async function displayRazorpay() {
    if (customer_id !== null) {
      if (type === null) {
        toast.error("Please Select Variation..", {
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        setisbuyNowloading(true);
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          setisbuyNowloading(false);

          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        var data = {
          amount: Number(count) * price,
        };
        const result = await Payment(data);
        if (!result) {
          setisbuyNowloading(false);

          alert("Server error. Are you online?");
          return;
        }
        const options = {
          key: "rzp_test_wwtzZzqIUwIpk2", // Enter the Key ID generated from the Dashboard
          amount: result.amount.toString(),
          currency: result.currency,
          name: "E-Commerce",
          description: "Test Transaction",
          // image: { logo },
          order_id: result.order_id,
          handler: async function (response) {
            var store = sessionStorage.getItem("store_id");
            if (response.razorpay_payment_id !== undefined) {
              var data = {
                product_id: productid,
                user_id: sessionStorage.getItem("customer_id"),
                Quantity: count,
                price: Number(count) * price,
                variations: type.toString(),
                status: "Booked",
                store: store,
              };
              var createorder = await Createorder(data);

              if (createorder.message === "SUCCESS") {
                toast.success("Order Placed...", {
                  autoClose: 2000,
                  transition: Slide,
                });
                setTimeout(() => {
                  setisbuyNowloading(false);
                  window.location.replace("/Order");
                }, 2000);
              }
            }
          },
          theme: {
            color: "#61dafb",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } else {
      toast.error("Please Login..", {
        autoClose: 2000,
        transition: Slide,
      });
    }
  }
  const viewsugproduct = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };
  return (
    <>
      {single_product.length != 0 && (
        <div>
          <div className={classes.SingleProduct_pageLayout}>
            {single_product[0].gallery.length != 0 && (
              <div
                className={`${classes.SingleProduct_images}  p-4 flex flex-col gap-2`}
              >
                {single_product[0].gallery.map((data) => {
                  return (
                    <img
                      onClick={setProductImage}
                      id={data.image}
                      src={data.image}
                    />
                  );
                })}
              </div>
            )}
            <div className=" p-4">
              {productImg.length == 0 && (
                <img
                  className={classes.SingleProduct_image}
                  src={single_product[0].original}
                />
              )}
              {productImg.length != 0 && (
                <img className={classes.SingleProduct_image} src={productImg} />
              )}
            </div>
            <div className=" p-4 flex flex-col items-start">
              <h1 className="font-bold font-light	text-2xl my-4">
                {single_product[0].name}
              </h1>
              <p>₹ {price} /-</p>
              <p className="my-4 font-thin text-xs">
                Tax included. Shipping calculated at checkout.
              </p>
              <hr />
              {single_product[0].color.length != 0 && (
                <div className="flex items-center">
                  <h1 className="my-4 tracking-wider font-thin text-sm">
                    COLORS
                  </h1>
                  <p className="mx-4">-</p>
                  <>
                    {single_product[0].color.map((data) => {
                      return (
                        <p
                          id={data.id}
                          className="bg-yellow-300"
                          style={{
                            backgroundColor: data.value,
                            height: "20px",
                            width: "20px",
                            borderRadius: "50%",
                            marginRight: "5px",
                          }}
                          onClick={selectcolor}
                        ></p>
                      );
                    })}
                  </>
                </div>
              )}

              {single_product[0].size.length != 0 && (
                <div className={classes.SingleProduct_size}>
                  <h1 className="my-4 tracking-wider font-thin text-sm">
                    SIZE
                  </h1>
                  <div className="grid grid-cols-5 gap-4">
                    <>
                      {single_product[0].size.map((data) => {
                        return (
                          <>
                            {Number(data.id) === Number(type) ? (
                              <p
                                onClick={getSelectSize}
                                id={data.id}
                                className="border p-1 text-xs text-center bg-yellow-300"
                              >
                                {data.value}
                              </p>
                            ) : (
                              <p
                                onClick={getSelectSize}
                                id={data.id}
                                className="border p-1 text-xs text-center"
                              >
                                {data.value}
                              </p>
                            )}
                          </>
                        );
                      })}
                    </>
                  </div>
                </div>
              )}
              <div className={classes.SingleProduct_Quantity}>
                <h1 className="my-4 tracking-wider font-thin text-sm">
                  QUANTITY
                </h1>
                <div className=" flex">
                  <p
                    onClick={deleterow}
                    className="border hover:bg-white-400 py-2 px-2"
                  >
                    -
                  </p>
                  <p className="border py-2 px-8">{count}</p>
                  <p
                    onClick={addcount}
                    className="border hover:bg-white-400 py-2 px-2"
                  >
                    +
                  </p>
                </div>
              </div>
              <>
                {isCartloading && (
                  <button className="w-full border font-bold my-4 p-1 text-sm">
                    <Loader />{" "}
                  </button>
                )}
                {!isCartloading && (
                  <button
                    className="w-full border font-bold my-4 p-3 text-sm"
                    id={single_product[0].id}
                    onClick={addtocart}
                  >
                    {" "}
                    ADD TO CART{" "}
                  </button>
                )}
                {iswislistloading && (
                  <button className="w-full border font-bold my-4 p-1 text-sm">
                    <Loader />
                  </button>
                )}
                {!iswislistloading && (
                  <button
                    className="w-full border font-bold my-4 p-3 text-sm"
                    id={single_product[0].id}
                    onClick={addtowishlist}
                  >
                    {" "}
                    ADD TO WISHLIST{" "}
                  </button>
                )}
                {isbuyNowloading && (
                  <button className="w-full border font-bold bg-yellow-300 p-1 text-sm">
                    {" "}
                    <Loader />
                  </button>
                )}
                {!isbuyNowloading && (
                  <button
                    className="w-full border font-bold bg-yellow-300 p-3 text-sm"
                    onClick={displayRazorpay}
                  >
                    {" "}
                    BUY NOW{" "}
                  </button>
                )}
              </>
            </div>
          </div>
          <hr />
          <div className="mb-8 mt-4">
            <center>
              <h1 className="tracking-wider font-thin text-sm tracking-wider mb-4">
                You may also like
              </h1>
            </center>
            <div
              className={`grid grid-cols-5 gap-4 p-4 ${classes.SingleProduct_Youmaylike}`}
            >
              {suggestproduct.length !== 0
                ? suggestproduct.map((datanew, index) => (
                    <div
                      className="flex flex-col items-center"
                      key={index}
                      id={datanew.slug}
                      onClick={viewsugproduct}
                    >
                      <img src={datanew.original} id={datanew.slug} />
                      <p className="text-center my-4 text-xs" id={datanew.slug}>
                        {datanew.name}
                      </p>
                      <p className="text-black-500 font-bold" id={datanew.slug}>
                        ₹ {Number(datanew.price).toLocaleString("en-IN")} /-
                      </p>
                    </div>
                  ))
                : "No Product Found.."}
            </div>
          </div>
        </div>
      )}
      {single_product.length == 0 && (
        <div className={classes.LoadingPage}>
          <div className={classes.Loader}>
            <Loaders />
            <p className="mt-4">Loading...</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SingleProduct_;
