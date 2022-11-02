import React, { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { Mycart, Updatecart, Deleteecart } from "../../Api/Cart";
import Loader from "../Loader/Loader";
import { Payment } from "../../Api/Orders";
import { Createorder } from "../../Api/Orders";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emptydata from "../EmptyData/Emptydata";

const Cart_ = () => {
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    var customer_id = sessionStorage.getItem("customer_id");
    var mycart = await Mycart({ user_id: customer_id });
    setcartdata(mycart);
    if (mycart.length !== 0) {
      var pricelist = [];
      for (var i = 0; i < mycart.length; i++) {
        pricelist.push(Number(mycart[i].cart.price));
      }
      const sum = pricelist.reduce((partialSum, a) => partialSum + a, 0);
      setsubtotal(sum);
    }
  };
  const [subtotal, setsubtotal] = useState(0);

  const addcount = async (e) => {
    var chekcart = await cartdata.filter((data) => {
      return data.cart.id === Number(e.target.id);
    });

    var data = {
      id: e.target.id,
      Quantity: Number(chekcart[0].cart.Quantity) + 1,
      price:
        Number(chekcart[0].variation.price) *
        (Number(chekcart[0].cart.Quantity) + 1),
    };
    var updatecart = await Updatecart(data);
    if (updatecart.message === "Updated Successfully") {
      getalldata();
    }
  };
  const deleterow = async (e) => {
    var chekcart = await cartdata.filter((data) => {
      return data.cart.id === Number(e.target.id);
    });
    if (Number(chekcart[0].cart.Quantity) - 1 === 0) {
      Deleteecart({ id: e.target.id });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      var data = {
        id: e.target.id,
        Quantity: Number(chekcart[0].cart.Quantity) - 1,
        price:
          Number(chekcart[0].variation.price) *
          (Number(chekcart[0].cart.Quantity) - 1),
      };
      var updatecart = await Updatecart(data);
      if (updatecart.message === "Updated Successfully") {
        getalldata();
      }
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
  const [isClicked, setisClicked] = useState(false);
  const buyNowHandler = async () => {
    setisClicked(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      setisClicked(false);

      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    var data = {
      amount: subtotal,
    };
    const result = await Payment(data);
    if (!result) {
      setisClicked(false);

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
          for (var i = 0; i < cartdata.length; i++) {
            var data = {
              product_id: cartdata[i].product.id,
              user_id: sessionStorage.getItem("customer_id"),
              Quantity: cartdata[i].cart.Quantity,
              price: cartdata[i].cart.price,
              variations: cartdata[i].cart.variations,
              status: "Booked",
              store: store,
            };
            await Createorder(data);
            await Deleteecart({ id: cartdata[i].cart.id });
          }
          toast.success("Order Placed...", {
            autoClose: 2000,
            transition: Slide,
          });
          setTimeout(() => {
            setisClicked(false);
            window.location.replace("/Order");
          }, 2000);
        }
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="p-8 ">
      {cartdata.length == 0 && (
        <div>
          <Emptydata data="Cart Items" />
        </div>
      )}
      {cartdata.length !== 0 && (
        <>
          <h1 className="mb-4 text-2xl">CART</h1>
          <div className="grid grid-cols-3 gap-8 ">
            <div className="col-span-2  p-4 ">
              {cartdata.map((data, index) => (
                <>
                  <div
                    className="flex items-center justify-between my-4"
                    key={index}
                  >
                    <img
                      className={classes.cart_product_img}
                      src={data.product.original}
                    />
                    <div>
                      <h1 className="font-thin text-sm tracking-wider  mb-3">
                        {data.product.name}
                      </h1>
                      <p>
                        {data.variation.type} - {data.variation.value}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex">
                        <p
                          id={data.cart.id}
                          onClick={deleterow}
                          className="border hover:bg-white-400 py-2 px-2"
                        >
                          -
                        </p>
                        <p className="border py-2 px-8">{data.cart.Quantity}</p>
                        <p
                          id={data.cart.id}
                          onClick={addcount}
                          className="border hover:bg-white-400 py-2 px-2"
                        >
                          +
                        </p>
                      </div>
                      <p>
                        ₹ {Number(data.cart.price).toLocaleString("en-IN")} /-
                      </p>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
            {cartdata.length !== 0 && (
              <div className={classes.Cart_summary}>
                <center>
                  <h1>Summary</h1>
                </center>
                <div className={classes.Cart_Summary_products}>
                  {cartdata.length !== 0
                    ? cartdata.map((data, index) => (
                        <div className="flex items-center justify-between my-4">
                          <h1 className="font-thin text-xs tracking-wider mb-3">
                            {data.product.name}
                          </h1>
                          <p className="text-xs w-36 text-end">
                            ₹ {Number(data.cart.price).toLocaleString("en-IN")}{" "}
                            /-
                          </p>
                        </div>
                      ))
                    : null}
                </div>
                <div className={classes.CartBuynow}>
                  {isClicked && <Loader />}
                  <>
                    {!isClicked && (
                      <button onClick={buyNowHandler}>Buy Now</button>
                    )}
                  </>
                </div>

                <div className={classes.Cart_Footer}>
                  <p>SUBTOTAL</p>
                  <p>₹ {Number(subtotal).toLocaleString("en-IN")} /-</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart_;
