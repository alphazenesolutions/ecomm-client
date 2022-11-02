import React, { useEffect } from "react";
import classes from "./MyOrder.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import { Myorder } from "../../Api/User";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateReview } from "../../Api/Review";
import { useSelector } from "react-redux";
import { firebase } from "../../database/firebase";
import Emptydata from "../EmptyData/Emptydata";

const MyOrder_ = () => {
  // rating

  const [value, setValue] = React.useState(0);
  const [myorderdata, setmyorderdata] = React.useState([]);
  const [reviewbox, setreviewbox] = React.useState(false);
  const [productname, setproductname] = React.useState(null);
  const [productid, setproductid] = React.useState(null);
  const [orderid, setorderid] = React.useState(null);
  const [reviewvalue, setreviewvalue] = React.useState(null);
  const [disablebtn, setdisablebtn] = React.useState(false);
  const [reviewimage, setreviewimage] = React.useState(null);

  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    var customer_id = sessionStorage.getItem("customer_id");
    var myorder = await Myorder({ user_id: customer_id });
    setmyorderdata(myorder);
  };
  const reviewbtn = async (e) => {
    var checkorder = await myorderdata.filter((data) => {
      return data.order.id === Number(e.target.id);
    });
    setorderid(e.target.id);
    if (checkorder[0].review !== undefined) {
      setreviewvalue(checkorder[0].review.review);
      setValue(checkorder[0].review.rating);
      setproductname(checkorder[0].product.name);
      setreviewbox(true);
      setTimeout(() => {
        document.getElementById("review").value = checkorder[0].review.review;
      }, 1000);
    } else {
      setreviewbox(true);
      setproductname(checkorder[0].product.name);
      setproductid(checkorder[0].product.id);
      setreviewvalue(null);
      setValue(0);
      setTimeout(() => {
        document.getElementById("review").value = " ";
      }, 1000);
    }
  };
  const savebtn = async () => {
    const storeid = sessionStorage.getItem("store_id");
    console.log(storeid);
    var review = document.getElementById("review").value;
    if (value === 0) {
      toast.error("Rating Is Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (review.length === 0) {
      toast.error("Review Is Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      setdisablebtn(true);
      setTimeout(async () => {
        var data = {
          rating: value,
          review: review,
          productid: productid,
          orderid: orderid,
          userid: sessionStorage.getItem("customer_id"),
          store: storeid,
          image: reviewimage,
        };
        var createreview = await CreateReview(data);
        console.log(createreview);
        if (createreview.message === "SUCCESS") {
          toast.success("Review Added...", {
            autoClose: 2000,
            transition: Slide,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, 2000);
    }
  };
  const geturl = async (e) => {
    toast.info("Please Wait...", {
      autoClose: 5000,
      transition: Slide,
    });
    let file = e.target.files;
    let file13 = new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref("review/" + file[0].name);
      storageRef.put(file[0]).then(function (snapshot) {
        storageRef.getDownloadURL().then(function (url) {
          //img download link ah ketakiradhu
          setTimeout(() => resolve(url), 1000);
        });
      });
    });
    var imgurl1 = await file13;
    setreviewimage(imgurl1);
  };
  return (
    <div className="p-8 ">
      {myorderdata.length == 0 && (
        <div>
          <Emptydata data="Orders" />
        </div>
      )}
      {myorderdata.length !== 0 && (
        <>
          <h1 className="mb-4 text-2xl">My Orders</h1>
          <div className="grid grid-cols-3 gap-8 ">
            <div className="col-span-2  p-4 ">
              {myorderdata.map((data, index) => (
                <>
                  <h1 className="font-thin text-sm tracking-wider  mb-3">
                    <b>{data.product.name}</b>
                  </h1>
                  <div className="flex items-center justify-between my-4">
                    <div className="flex">
                      <img
                        className={classes.myorder_product_img}
                        src={data.product.original}
                      />
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                Qty
                              </TableCell>
                              <TableCell align="right">
                                {data.order.Quantity}
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {data.variation.type}
                              </TableCell>
                              <TableCell align="right">
                                {data.variation.value}
                              </TableCell>
                            </TableRow>

                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                Price
                              </TableCell>
                              <TableCell align="right">
                                ₹{" "}
                                {Number(data.order.price).toLocaleString(
                                  "en-IN"
                                )}{" "}
                                /-
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div>
                      <span>{data.order.status}</span>
                    </div>
                    <div>
                      {data.review !== undefined ? (
                        <button
                          className="bg-yellow-300 py-2 px-4  rounded-lg"
                          id={data.order.id}
                          onClick={reviewbtn}
                        >
                          Reviewed
                        </button>
                      ) : (
                        <button
                          className="bg-yellow-300 py-2 px-4  rounded-lg"
                          id={data.order.id}
                          onClick={reviewbtn}
                        >
                          Review Me
                        </button>
                      )}
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
            {reviewbox === true ? (
              <div className={classes.myorder_review}>
                <center>
                  <h1 className="mb-4">{productname}</h1>
                </center>
                {reviewvalue !== null && (
                  <>
                    <div>
                      <Rating
                        disabled
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </div>
                    <textarea
                      rows={4}
                      disabled
                      className=" w-full border border-2 p-2"
                      placeholder="Write a review."
                      id="review"
                      defaultValue={reviewvalue}
                    />
                  </>
                )}
                {reviewvalue === null && (
                  <>
                    <div>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </div>
                    <textarea
                      rows={4}
                      className=" w-full border border-2 p-2"
                      placeholder="Write a review."
                      id="review"
                      defaultValue={reviewvalue}
                    />
                    <input
                      className="border w-full mt-4 p-3"
                      type="file"
                      onChange={geturl}
                    />
                  </>
                )}

                {reviewvalue === null ? (
                  disablebtn === true ? (
                    <div className={classes.myOrder_Footer}>
                      <button style={{ cursor: "pointer" }} onClick={savebtn}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className={classes.myOrder_Footer}>
                      <p style={{ cursor: "pointer" }} onClick={savebtn}>
                        Save
                      </p>
                    </div>
                  )
                ) : (
                  <div className={classes.myOrder_Footer}>
                    <p>Reviewed</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default MyOrder_;
