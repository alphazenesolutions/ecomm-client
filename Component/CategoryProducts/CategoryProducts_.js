import React, { useEffect, useState } from "react";
import classes from "./CategoryProducts.module.css";
import { categoryproduct } from "../../Api/Category";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { Allproduct } from "../../Api/Product";
import { productVariation } from "../../Api/Variation";
import { allnavbar } from "../../Api/Navbar";
const CategoryProducts_ = () => {
  useEffect(() => {
    getCategory_product();
  }, []);
  const [category_product, setcategory_product] = useState([]);
  const [categoryname, setcategoryname] = useState(null);
  const [colorlist, setcolorlist] = useState([]);
  const [sizelist, setsizelist] = useState([]);

  const getCategory_product = async () => {
    const storeid = sessionStorage.getItem("store_id");
    var str = window.location.href;
    var part = str.split("//").pop().split("/")[2];
    var allNavbar = await allnavbar();
    var mystorenav = await allNavbar.data.filter((data) => {
      return data.store == storeid && data.name == part;
    });
    if (mystorenav.length !== 0) {
      if (mystorenav[0].categories !== null) {
        var categorieslist = mystorenav[0].categories.split(",");
        if (categorieslist.length !== 0) {
          var Products_data = [];
          for (var i = 0; i < categorieslist.length; i++) {
            var myprodyct = await categoryproduct({
              id: categorieslist[i],
              storeid: storeid,
            });
            if (myprodyct.data.length !== 0) {
              for (var a = 0; a < myprodyct.data.length; a++) {
                var product_variations = await productVariation({
                  id: myprodyct.data[a].id,
                });
                var Products_size = [];
                var Products_color = [];
                product_variations.map((Data) => {
                  if (Data.type == "Size") {
                    Products_size.push({ value: Data.value, id: Data.id });
                  } else if (Data.type == "Color") {
                    Products_color.push({ value: Data.value, id: Data.id });
                  }
                });
                var productsizelist = Products_size.filter(
                  (v, i, a) => a.indexOf(v) === i
                );
                var productcolorlist = Products_color.filter(
                  (v, i, a) => a.indexOf(v) === i
                );
                Products_data.push({
                  size: productsizelist,
                  color: productcolorlist,
                  category: myprodyct.data[a].category,
                  name: myprodyct.data[a].name,
                  price: myprodyct.data[a].price,
                  slug: myprodyct.data[a].slug,
                  original: myprodyct.data[a].original,
                });
              }
            }
          }
          setcategory_product(Products_data);
          if (Products_data.length !== 0) {
            var colorlist = [],
              sizelist = [];
            for (var i = 0; i < Products_data.length; i++) {
              if (Products_data[i].color.length !== 0) {
                for (var j = 0; j < Products_data[i].color.length; j++) {
                  colorlist.push(Products_data[i].color[j].value);
                }
              }
              if (Products_data[i].size.length !== 0) {
                for (var j = 0; j < Products_data[i].size.length; j++) {
                  sizelist.push(Products_data[i].size[j].value);
                }
              }
            }
            var finalcolorlist = colorlist.filter(
              (v, i, a) => a.indexOf(v) === i
            );
            var finalsizelist = sizelist.filter(
              (v, i, a) => a.indexOf(v) === i
            );
            setcolorlist(finalcolorlist);
            setsizelist(finalsizelist);
          }
        }
      }
    }
  };
  const NavSingleProduct = (e) => {
    window.location.replace(`/collections/singleProduct/${e.target.id}`);
  };
  const submitbtn = async () => {
    var minprice = document.getElementById("minprice").value;
    var maxprice = document.getElementById("maxprice").value;
    if (category_product.length !== 0) {
      var filterproduct = [];
      for (var i = 0; i < category_product.length; i++) {
        if (
          category_product[i].price >= minprice &&
          category_product[i].price <= maxprice
        ) {
          filterproduct.push(category_product[i]);
        }
      }
      setcategory_product(filterproduct);
    }
  };
  const resetbtn = () => {
    getCategory_product();
    document.getElementById("minprice").value = "";
    document.getElementById("maxprice").value = "";
  };
  const selectcolor = (e) => {
    if (category_product.length !== 0) {
      var colorfilter = [];
      for (var i = 0; i < category_product.length; i++) {
        if (category_product[i].color.length !== 0) {
          for (var j = 0; j < category_product[i].color.length; j++) {
            if (category_product[i].color[j].value === e.target.id) {
              colorfilter.push(category_product[i]);
            }
          }
        }
      }
      setcategory_product(colorfilter);
    }
  };
  const selectsize = (e) => {
    if (category_product.length !== 0) {
      var sizefilter = [];
      for (var i = 0; i < category_product.length; i++) {
        if (category_product[i].size.length !== 0) {
          for (var j = 0; j < category_product[i].size.length; j++) {
            if (category_product[i].size[j].value === e.target.id) {
              sizefilter.push(category_product[i]);
            }
          }
        }
      }
      setcategory_product(sizefilter);
    }
  };
  const filterset = async (e) => {
    if (e.target.value === "Low to High Price") {
      setcategory_product([]);
      setTimeout(() => {
        const sortedDatesA = category_product.sort(
          (dateA, dateB) => dateA.price - dateB.price
        );
        setcategory_product(sortedDatesA);
      }, 1000);
    } else if (e.target.value === "High to Low Price") {
      setcategory_product([]);
      setTimeout(() => {
        const sortedDatesB = category_product.sort(
          (dateA, dateB) => dateB.price - dateA.price
        );
        setcategory_product(sortedDatesB);
      }, 1000);
    } else if (e.target.value === "Relevance") {
      getCategory_product();
    }
  };
  return (
    <div className="p-8 ">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div>
          <select className="border p-2" onChange={filterset}>
            <option value="Low to High Price">Low to High Price</option>
            <option value="High to Low Price">High to Low Price</option>
            <option selected value="Relevance">
              Relevance
            </option>
          </select>
        </div>
      </div>
      <div className={classes.ShopNow_Page_layout}>
        <div className=" p-4 ">
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Price ₹</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex items-center">
                  <input
                    className="text-xs border w-full p-1"
                    placeholder="Min Price"
                    id="minprice"
                  />
                  <p className="text-xs mx-2">-</p>
                  <input
                    className="text-xs border w-full p-1"
                    placeholder="Max Price"
                    id="maxprice"
                  />
                </div>
                <button
                  className="bg-black-500 text-white-1000 w-full py-2 my-2"
                  onClick={submitbtn}
                >
                  Submit
                </button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className={`${classes.product_colors} grid grid-cols-4 gap-4`}
                >
                  {colorlist.length !== 0
                    ? colorlist.map((data, index) => (
                        <p
                          key={index}
                          id={data}
                          onClick={selectcolor}
                          style={{ backgroundColor: `${data}` }}
                        ></p>
                      ))
                    : null}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Size</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className={`grid grid-cols-3 gap-2 ${classes.product_size}`}
                >
                  {sizelist.length !== 0
                    ? sizelist.map((data, index) => (
                        <p
                          className="border hover:bg-white-400 text-xs p-2 text-center"
                          id={data}
                          onClick={selectsize}
                          key={index}
                        >
                          {data}
                        </p>
                      ))
                    : null}
                </div>
              </AccordionDetails>
            </Accordion>

            <button
              className="bg-black-500 text-white-1000 w-full py-2 my-2"
              onClick={resetbtn}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 px-4 ">
          {category_product.length !== 0 && (
            <>
              {category_product.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-between ${classes.Single_product}`}
                  >
                    <img
                      id={data.slug}
                      src={data.original}
                      onClick={NavSingleProduct}
                    />
                    <h1
                      id={data.slug}
                      onClick={NavSingleProduct}
                      className="text-center font-bold text-sm mt-2"
                    >
                      {data.name}
                    </h1>
                    <div className="grid grid-cols-4 gap-4 my-2">
                      {" "}
                      {data.size.length != 0 && (
                        <>
                          {data.size.map((data, index) => {
                            return (
                              <p
                                id={data.slug}
                                onClick={NavSingleProduct}
                                key={index}
                                className="border hover:bg-white-400 text-xs p-2 text-center"
                              >
                                {data.value}
                              </p>
                            );
                          })}
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-4 my-2">
                      {data.color.length != 0 && (
                        <>
                          {data.color.map((data, index) => {
                            return (
                              <p
                                key={index}
                                style={{
                                  backgroundColor: data.value,
                                  height: "20px",
                                  width: "20px",
                                  borderRadius: "50%",
                                  marginRight: "20px",
                                }}
                              ></p>
                            );
                          })}
                        </>
                      )}
                    </div>
                    <button
                      className="border p-2"
                      id={data.slug}
                      onClick={NavSingleProduct}
                    >
                      {" "}
                      <b>₹ {Number(data.price).toLocaleString("en-IN")} /-</b>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts_;
