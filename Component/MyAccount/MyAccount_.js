import React, { useEffect, useState } from "react";
import classes from "./MyAccount.module.css";
import PersonIcon from "@mui/icons-material/Person";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import LogoutIcon from "@mui/icons-material/Logout";
import { Viewuser, Updateuser } from "../../Api/User";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount_ = () => {
  const [isAccountDetails, setisAccountDetails] = useState(true);
  const [isChangePassword, setisChangePassword] = useState(false);
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setphone] = useState(null);
  const [userid, setuserid] = useState(null);
  const [password, setpassword] = useState(null);

  // AcountHandler
  const AccountHandler = () => {
    setisAccountDetails(true);
    setisChangePassword(false);
  };
  // PasswordHandler
  const PasswordHandler = () => {
    setisAccountDetails(false);
    setisChangePassword(true);
  };
  const logoutbtn = () => {
    sessionStorage.removeItem("customer_id");
    window.location.replace("/");
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    var customer_id = sessionStorage.getItem("customer_id");
    var singleuser = await Viewuser({ user_id: customer_id });
    if (singleuser.data.length !== 0) {
      setname(singleuser.data[0].name);
      setemail(singleuser.data[0].email);
      setphone(singleuser.data[0].phone);
      setuserid(singleuser.data[0].id);
      setpassword(singleuser.data[0].password);
    }
  };
  const updateuser = async () => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var data = {
      name: name,
      email: email,
      phone: phone,
      id: userid,
    };
    var updateuser = await Updateuser(data);
    if (updateuser.message === "Updated Successfully") {
      toast.success("User Updated Successfully...", {
        autoClose: 2000,
        transition: Slide,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const changepassword = async () => {
    var oldpassword = document.getElementById("oldpassword").value;
    var newpassword = document.getElementById("newpassword").value;
    if (oldpassword.length === 0) {
      toast.error("Previous Password Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (newpassword.length === 0) {
      toast.error("New Password Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      if (oldpassword === password) {
        var data = {
          password: newpassword,
          id: userid,
        };
        var updateuser = await Updateuser(data);
        if (updateuser.message === "Updated Successfully") {
          toast.success("User Updated Successfully...", {
            autoClose: 2000,
            transition: Slide,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else {
        toast.error("Previous Password Not Match...", {
          autoClose: 2000,
          transition: Slide,
        });
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="p-8 ">
        <h1 className="mb-4 text-2xl">My Account</h1>
        <div className="grid grid-cols-3 gap-8 ">
          <div className={classes.MyAccount_Card}>
            <div onClick={AccountHandler} className="flex items-center">
              <PersonIcon />
              <h1>Account Details</h1>
            </div>
            <hr />
            <div onClick={PasswordHandler} className="flex items-center">
              <EnhancedEncryptionIcon />
              <h1>Change Password</h1>
            </div>
            <hr />
            <div className="flex items-center">
              <LogoutIcon />
              <h1 onClick={logoutbtn}>Logout</h1>
            </div>
            <hr />

            <div className={classes.Cart_Footer}></div>
          </div>
          <div className="col-span-2  ">
            {isAccountDetails && !isChangePassword && (
              <div className="flex  flex-col w-full ">
                <div className="flex flex-col items-start  w-full">
                  <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                    Full Name
                  </label>
                  <input
                    className="w-full border  py-2 px-4"
                    defaultValue={name}
                    id="name"
                  />
                </div>
                <div className="flex flex-col w-full items-start ">
                  <label className="tracking-wider  font-light tracking-wider text-1xl my-2">
                    Email
                  </label>
                  <input
                    className="border w-full py-2 px-4"
                    defaultValue={email}
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full items-start ">
                  <label className="tracking-wider  font-light tracking-wider text-1xl my-2">
                    Phone
                  </label>
                  <input
                    className="border w-full py-2 px-4"
                    defaultValue={phone}
                    id="phone"
                  />
                </div>
                <button
                  className="bg-black-500 text-white-1000 w-full py-2 my-8"
                  onClick={updateuser}
                >
                  Update
                </button>
              </div>
            )}
            {!isAccountDetails && isChangePassword && (
              <div className="flex  flex-col w-full ">
                <div className="flex flex-col items-start  w-full">
                  <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                    Previous Password
                  </label>
                  <input
                    className="w-full border  py-2 px-4"
                    id="oldpassword"
                    type="password"
                  />
                </div>
                <div className="flex flex-col w-full items-start ">
                  <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                    New Password
                  </label>
                  <input
                    className="border w-full py-2 px-4"
                    id="newpassword"
                    type="password"
                  />
                </div>
                <button
                  className="bg-black-500 text-white-1000 w-full py-2 my-8"
                  onClick={changepassword}
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyAccount_;
