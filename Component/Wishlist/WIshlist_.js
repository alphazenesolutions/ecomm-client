import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./Wishlist.module.css";
import sad from "../../public/sad.png";
import { Mywishlist, Deletewishlist } from "../../Api/Wishlist";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Emptydata from "../EmptyData/Emptydata";
const WIshlist_ = () => {
  const [mywislist, setmywislist] = useState([]);
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    var customer_id = sessionStorage.getItem("customer_id");
    var allwishlist = await Mywishlist({ user_id: customer_id });
    setmywislist(allwishlist);
    console.log(allwishlist);
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
      <div className="py-4 ">
        {mywislist.length != 0 && (
          <>
            <h1 className="mb-4 text-2xl">Wishlist</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Variations</TableCell>
                    <TableCell align="center">View</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mywislist.map((data, index) => (
                    <>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <div className="flex items-center flex-col">
                            <Avatar>
                              <img
                                className={classes.wishlist_product_img}
                                src={data.product.original}
                                id={data.product.slug}
                                onClick={viewbtn}
                              />
                            </Avatar>

                            <h1
                              className="font-thin mt-2 text-xs tracking-wider  mb-3"
                              id={data.product.slug}
                              onClick={viewbtn}
                            >
                              {data.product.name}
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {data.product.sale_price}
                        </TableCell>
                        {data.variation.type == "Size" && (
                          <TableCell align="center">
                            Size - {data.variation.value}
                          </TableCell>
                        )}
                        {data.variation.type == "Color" && (
                          <TableCell align="center">
                            Color - {data.variation.value}
                          </TableCell>
                        )}
                        <TableCell align="center">
                          {" "}
                          <button
                            className="bg-yellow-300 py-2 px-4  rounded-lg"
                            id={data.product.slug}
                            onClick={viewbtn}
                          >
                            View
                          </button>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <center>
                            <Avatar
                              className={classes.delete_wishList}
                              id={data.wishlist.id}
                              onClick={deltebtn}
                            >
                              <p id={data.wishlist.id}>x</p>
                            </Avatar>
                          </center>
                        </TableCell>
                      </TableRow>
                      <hr />
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {mywislist.length == 0 && (
          <div>
            <Emptydata data="Wishlist" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WIshlist_;
