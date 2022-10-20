import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { SingleStore } from "../../../Api/Store";
import { Allproduct } from "../../../Api/Product";

const Footer = () => {
  const [productdata, setproductdata] = useState([]);
  const [storename, setstorename] = useState("null");
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const storeid = sessionStorage.getItem("store_id");
    var allproductdata = await Allproduct();
    if (allproductdata.length !== 0) {
      var checkproduct = await allproductdata.data.filter((datanew) => {
        return datanew.store == storeid;
      });
      setproductdata(checkproduct.slice(0, 8));
    }
    var user_id = sessionStorage.getItem("user_id");
    if (user_id !== null) {
      var mystore = await SingleStore({ id: user_id });
      setstorename(mystore.data[0].storename);
    } else {
      setstorename(null);
    }
  };
  const viewproduct = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };

  return (
    <div className="p-10 bg-black-1000 text-white-1000">
      <div className="grid grid-cols-5 gap-4 items-start">
        <div>
          <h1 className="mb-6">
            {storename !== null ? storename.toUpperCase() : storename}
          </h1>
          <div>
            <p className="mb-3 text-xs">About us</p>
            {/* <p className="mb-3 text-xs"> Showrooms </p>
            <p className="mb-3 text-xs"> Size Guide </p> */}
            <p className="mb-3 text-xs"> Terms of Service </p>
            <p className="mb-3 text-xs">Refund policy</p>
          </div>
        </div>
        <div>
          <h1 className="mb-6">USER POLICY</h1>
          <div>
            <p className="mb-3 text-xs">Terms & Conditionss</p>
            <p className="mb-3 text-xs"> Shipping Policy </p>
            <p className="mb-3 text-xs"> Exchange & Return </p>
            <p className="mb-3 text-xs"> Privacy Policy</p>
            <p className="mb-3 text-xs">Disclaimer</p>
            <p className="mb-3 text-xs">Terms of Service</p>
            {/* <p className="mb-3 text-xs">Cancellation Policy</p> */}
          </div>
        </div>
        <div>
          <h1 className="mb-6">GET IN TOUCH</h1>
          <div>
            <p className="mb-3 text-xs">Contact Us</p>
            {/* <p className="mb-3 text-xs"> FAQ's </p> */}
            <p className="mb-3 text-xs"> Feedbacks</p>
            {/* <p className="mb-3 text-xs">Track Your Order</p> */}
          </div>
        </div>

        <div>
          <h1 className="mb-6">CUSTOMER CARE</h1>
          <div>
            <p className="mb-3 text-xs">Time : 10am - 7pm </p>
            <p className="mb-3 text-xs"> Working Days : Mon to Sat </p>
            <p className="mb-3 text-xs">
              {" "}
              (Closed on Sunday & All National Holidays)
            </p>
            <p className="mb-3 text-xs">Mobile/Whatsapp : +91 8098991122</p>
          </div>
        </div>
        <div>
          <h1 className="mb-6">HEAR IT FIRST!</h1>
          <div>
            <p className="mb-3 text-xs">
              Subscribe to get all the latest discounts, events, collections,
              and plans.{" "}
            </p>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Enter your email
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                endAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div>
              <InstagramIcon className="mr-2" />
              <FacebookIcon className="mr-2" />
              <LinkedInIcon className="mr-2" />
              <YouTubeIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h1>POPULAR PRODUCTS</h1>
        <div className="flex items-center mt-4">
          {productdata.length !== 0
            ? productdata.map((data, index) => (
                <>
                  <p
                    className="text-xs mr-2"
                    style={{ cursor: "pointer" }}
                    key={index}
                    id={data.slug}
                    onClick={viewproduct}
                  >
                    {data.name}
                  </p>
                  <p className="mr-2" id={data.slug} onClick={viewproduct}>
                    |
                  </p>
                </>
              ))
            : null}
        </div>
      </div>
      <center>
        <p className="mt-8 text-xs">© 2022. All Rights Reserved.</p>
      </center>
    </div>
  );
};

export default Footer;
