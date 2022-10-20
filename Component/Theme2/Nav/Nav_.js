import React, { useEffect, useState } from "react";
import classes from "./Nav.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Popover from "@mui/material/Popover";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Storecategory } from "../../../Api/Category";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Mycart } from "../../../Api/Cart";
import { Mywishlist } from "../../../Api/Wishlist";
import CloseIcon from "@mui/icons-material/Close";
import { Allproduct } from "../../../Api/Product";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SingleNav } from "../../../Api/Navbar";
import { Allstore } from "../../../Api/Store";
import { Avatar } from "@mui/material";

const Nav_ = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedcategory, setselectedcategory] = React.useState([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // men Products
  const [anchorEl_M, setAnchorEl_M] = React.useState(null);
  const [mycartcount, setmycartcount] = React.useState(0);
  const [mywishlistcount, setmywishlistcount] = React.useState(0);

  const open_M = Boolean(anchorEl_M);
  const id_M = open_M ? "simple-popover" : undefined;

  // Baby Products
  const [anchorEl_B, setAnchorEl_B] = React.useState(null);
  const [storelogo, setstorelogo] = React.useState(null);
  const [customer_id, setcustomer_id] = React.useState(null);
  const [filterproduct, setfilterproduct] = React.useState([]);
  const [menudata, setmenudata] = React.useState([]);

  const open_B = Boolean(anchorEl_B);
  const id_B = open_B ? "simple-popover" : undefined;
  const Navigate_Home = () => {
    window.location.replace("/");
  };
  const Navigate_ShopNow = (e) => {
    window.location.replace(`/collections/${e.target.id}`);
  };
  useEffect(() => {
    getalldata();
    getallmenu();
  }, []);

  const getalldata = async () => {
    const store = sessionStorage.getItem("store_id");
    var allstore = await Allstore();
    var mystore = await allstore.data.filter((data) => {
      return data.id === Number(store);
    });
    if (mystore.length !== 0) {
      setstorelogo(mystore[0].logo);
    }
    var customer_id = sessionStorage.getItem("customer_id");
    setcustomer_id(customer_id);
    var mycart = await Mycart({ user_id: customer_id });
    var allwishlist = await Mywishlist({ user_id: customer_id });
    setmywishlistcount(allwishlist.length);
    setmycartcount(mycart.length);
  };
  const getallmenu = async () => {
    const store = sessionStorage.getItem("store_id");
    var mynavlist = await SingleNav({ id: store });
    if (mynavlist.data.length !== 0) {
      setmenudata(mynavlist.data);
    }
  };
  // store id
  const userprofile = () => {
    var customer_id = sessionStorage.getItem("customer_id");
    if (customer_id !== null) {
      window.location.replace("/MyAccount");
    } else {
      window.location.replace("/Login");
    }
  };
  // isSearch
  const [isSearch, setisSearch] = useState(false);
  const searchHandler = () => {
    setisSearch(true);
  };
  const [isstartSearch, setisstartSearch] = useState(false);
  const searchHandler_Data = () => {
    // setisSearch(false);
    setisstartSearch(true);
  };
  // isSelected
  const [isSelected, setisSelected] = useState(false);

  const [isTyping, setisTyping] = useState(false);
  const onTyping = async (e) => {
    const store = sessionStorage.getItem("store_id");
    var allproduct = await Allproduct();
    if (allproduct.length !== 0) {
      var myproduct = await allproduct.data.filter((datanew) => {
        return datanew.store === store;
      });
      if (myproduct.length !== 0) {
        var filterdata = [];
        for (var i = 0; i < myproduct.length; i++) {
          if (
            myproduct[i].name.toLowerCase().match(e.target.value.toLowerCase())
          ) {
            filterdata.push(myproduct[i]);
          }
        }
        setfilterproduct(filterdata);
      }
    }

    setisTyping(true);
  };

  const getproductslug = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };
  const handleClick_M = async (event) => {
    setAnchorEl_M(event.currentTarget);
    const store = sessionStorage.getItem("store_id");
    var checkmenudata = await menudata.filter((data) => {
      return data.id === Number(event.target.id);
    });
    if (checkmenudata.length !== 0) {
      setselectedcategory([]);
      if (checkmenudata[0].categories !== null) {
        var categorylist = checkmenudata[0].categories.split(",");
        var allcategory = await Storecategory({ store: store });
        if (allcategory.data.length !== 0) {
          var selectedcate = [];
          for (var i = 0; i < categorylist.length; i++) {
            for (var j = 0; j < allcategory.data.length; j++) {
              if (categorylist[i] === allcategory.data[j].category_name) {
                selectedcate.push(allcategory.data[j]);
              }
            }
          }
          setAnchorEl(event.currentTarget);
          setselectedcategory(selectedcate);
        }
      }
    }
  };
  const handleClose_M = () => {
    setAnchorEl_M(null);
  };
  const Nav_categoryPrroducts = (e) => {
    window.location.replace(`/Category/${e.target.id}`);
  };
  return (
    <div>
      <div className="bg-black-1000 text-white-1000 text-xs p-3 text-center ">
        <b> Free Shipping</b> : Across India on orders above 5000 INR
      </div>
      <div className="px-8 pt-4 text-sm">
        <div className="flex items-center justify-between	 ">
          <h1></h1>
          <div>
            <InstagramIcon className="mr-2" />
            <FacebookIcon className="mr-2" />
            <LinkedInIcon className="mr-2" />
            <YouTubeIcon />
          </div>
        </div>
        {isSearch && (
          <div className={classes.Nav_searchBar}>
            <FormControl
              sx={{ width: "100%", marginTop: "20px", textAlign: "center" }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-weight"
                placeholder="Search Product"
                onChange={onTyping}
                endAdornment={
                  <>
                    <InputAdornment position="end">
                      {" "}
                      <CloseIcon
                        className=" font-thin"
                        onClick={() => {
                          setisSearch(false);
                        }}
                      />
                    </InputAdornment>
                  </>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            {isTyping && (
              <div className={`w-full p-4 ${classes.SearchedProducts}`}>
                {filterproduct.length !== 0
                  ? filterproduct.map((data, index) => (
                      <div
                        className={`flex items-center justify-between productbox py-2 px-8 border mb-2 ${classes.productbox}`}
                        id={data.slug}
                        onClick={getproductslug}
                      >
                        <img src={data.original} id={data.slug} />
                        <div id={data.slug}>
                          <h1 id={data.slug}>
                            <b>{data.name}</b>
                          </h1>
                          <p
                            className="text-yellow-500 font-bold"
                            id={data.slug}
                          >
                            ₹ {Number(data.price).toLocaleString("en-IN")} /-
                          </p>
                        </div>
                        <button
                          id={data.slug}
                          onClick={getproductslug}
                          className="border py-2 px-8 hover:bg-white-400"
                        >
                          Open
                        </button>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
        )}

        {!isSearch && (
          <div
            className={`flex items-start justify-between mt-8 ${classes.nav_search}`}
          >
            {!isSearch && (
              <SearchIcon className=" font-thin" onClick={searchHandler} />
            )}
            <div className="flex items-center flex-col logo	">
              {storelogo === null ? (
                <Image
                  onClick={Navigate_Home}
                  src="/logo.avif"
                  alt="Logo"
                  width="140px"
                  height="60"
                ></Image>
              ) : (
                <img
                  src={storelogo}
                  onClick={Navigate_Home}
                  width="140px"
                  height="60"
                />
              )}

              <div className="flex  items-center justify-between mt-4 w-full">
                {menudata.length !== 0
                  ? menudata.map((data, index) => (
                      <>
                        <div
                          id={data.name}
                          onClick={Nav_categoryPrroducts}
                          style={{ zIndex: "3200" }}
                        >
                          <p
                            aria-describedby={id_M}
                            id={data.name}
                            value={data.name}
                            onMouseEnter={handleClick_M}
                            className={`mr-4 ml-4 ${classes.navMenus}`}
                          >
                            {data.name.toUpperCase()}
                          </p>
                        </div>

                        <Popover
                          id={id_M}
                          open={open_M}
                          anchorEl={anchorEl_M}
                          onClose={handleClose_M}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <div
                            onMouseLeave={handleClose_M}
                            className="p-4  "
                            style={{ width: "180px" }}
                          >
                            {selectedcategory.length !== 0
                              ? selectedcategory.map((data, index) => (
                                  <>
                                    <div className="flex items-center justify-between w-full mb-1">
                                      <p
                                        onClick={Navigate_ShopNow}
                                        key={index}
                                        id={data.slug}
                                        className="text-xs my-2"
                                      >
                                        {" "}
                                        {data.category_name}
                                      </p>
                                      <Avatar
                                        src={data.category_image}
                                        className={classes.Nav_avatar}
                                      ></Avatar>
                                    </div>
                                    <hr />
                                  </>
                                ))
                              : "No Category"}
                          </div>
                        </Popover>
                      </>
                    ))
                  : null}
                <p
                  className={`mr-4 ml-4 ${classes.navMenus}`}
                  onClick={() => {
                    window.location.replace("/Sale");
                  }}
                >
                  SALE
                </p>
                <p
                  className={`mr-4 ml-4 ${classes.navMenus}`}
                  onClick={() => {
                    window.location.replace("/Blog");
                  }}
                >
                  BLOG
                </p>
              </div>
            </div>
            {customer_id !== null ? (
              <div className="flex items-center">
                <Person2OutlinedIcon onClick={userprofile} className="mr-4" />
                <Badge
                  className="mr-4"
                  badgeContent={mywishlistcount}
                  color="primary"
                >
                  <FavoriteBorderOutlinedIcon
                    onClick={() => {
                      window.location.replace("/Wishlist");
                    }}
                  />
                </Badge>
                <Badge
                  className="mr-4"
                  badgeContent={mycartcount}
                  color="primary"
                >
                  <ShoppingCartOutlinedIcon
                    onClick={() => {
                      window.location.replace("/Cart");
                    }}
                  />
                </Badge>
                <ShoppingBagOutlinedIcon
                  onClick={() => {
                    window.location.replace("/Order");
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <Person2OutlinedIcon onClick={userprofile} className="mr-4" />
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Nav_;
