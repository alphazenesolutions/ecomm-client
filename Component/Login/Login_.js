import React, { useState } from "react";
import classes from "./Login.module.css";
import { toast, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { CreateUser, LoginUser } from "../../Api/User";
import Loader from "../Loader/Loader";

const Login_ = () => {
  const [isSingup, setisSingup] = useState(false);
  const [errorlist, seterrorlist] = useState(null);

  const SingupHandler = () => {
    setisSingup(true);
  };
  const SinginHandler = () => {
    setisSingup(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name Is Required";
      }
      if (!values.phone) {
        errors.phone = "Mobile Number Required";
      } else if (values.phone.length > 10) {
        errors.phone = "Must be 10 characters";
      }
      if (!values.email) {
        errors.email = "Email Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password Required";
      } else if (values.password.length < 6) {
        errors.password = "Must be 6 characters";
      }
      seterrorlist(errors);
      if (Object.keys(errors).length === 0) {
        values["type"] = "customer";
        var createuser = await CreateUser(values);
        if (createuser.message === "SUCCESS") {
          toast.success("User Created Successfully...", {
            autoClose: 2000,
            transition: Slide,
          });
          sessionStorage.setItem("customer_id", createuser.data.user_id);
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        } else {
          toast.error(createuser.message, {
            autoClose: 2000,
            transition: Slide,
          });
        }
      }
    },
  });
  const [isClicked, setisClicked] = useState(false);
  const loginbtn = async () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email.length === 0) {
      toast.error("Email Is Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else if (password.length === 0) {
      toast.error("Password Is Required...", {
        autoClose: 2000,
        transition: Slide,
      });
    } else {
      setisClicked(true);

      var data = {
        email: email,
        password: password,
      };
      var loginuser = await LoginUser(data);
     
      if (
        loginuser.message == "SUCCESS" &&
        loginuser.data.checkuser[0].type == "customer"
      ) {
        toast.success("Welcome...", {
          autoClose: 2000,
          transition: Slide,
        });
        sessionStorage.setItem(
          "customer_id",
          loginuser.data.checkuser[0].user_id
        );
        setTimeout(() => {
          setisClicked(false);

          window.location.replace("/");
        }, 2000);
      } else {
        var message = loginuser;
        setisClicked(false);

        toast.error("Not a valid user", {
          autoClose: 2000,
          transition: Slide,
        });
      }
    }
  };
  return (
    <>
      {isSingup && (
        <div className={classes.Login_page}>
          <center>
            <h1 className="text-2xl py-8 font-light">Create Account</h1>
          </center>
          <div className="flex items-center flex-col pb-8 ">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Full Name
                </label>
                <input
                  className="border  py-2 px-4"
                  name="name"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.name}
                />
                {errorlist !== null ? (
                  <div className="text-red-500">{errorlist.name}</div>
                ) : null}
              </div>

              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Email
                </label>
                <input
                  className="border  py-2 px-4"
                  name="email"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.email}
                />
                {errorlist !== null ? (
                  <div className="text-red-500">{errorlist.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Mobile Number
                </label>
                <input
                  className="border  py-2 px-4"
                  name="phone"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.phone}
                />
                {errorlist !== null ? (
                  <div className="text-red-500">{errorlist.phone}</div>
                ) : null}
              </div>
              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Password
                </label>
                <input
                  className="border  py-2 px-4"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.password}
                />
                {errorlist !== null ? (
                  <div className="text-red-500">{errorlist.password}</div>
                ) : null}
                {!isClicked && (
                  <button className="bg-yellow-300 text-black-1000 w-full py-2 my-8">
                    CREATE
                  </button>
                )}
                {isClicked && (
                  <button className="bg-yellow-300 text-white-1000 w-full py-1 my-8">
                    <Loader />
                  </button>
                )}
                <p onClick={SinginHandler} className="cursor-pointer">
                  Already have an account ? Sign in.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isSingup && (
        <div className={classes.Login_page}>
          <center>
            <h1 className="text-2xl py-8 font-light">Welcome Back</h1>
          </center>
          <div className="flex items-center flex-col pb-8 ">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Email
                </label>
                <input className="border  py-2 px-4" id="email" />
              </div>
              <div className="flex flex-col items-start ">
                <label className="tracking-wider font-light tracking-wider text-1xl my-2">
                  Password
                </label>
                <input
                  className="border  py-2 px-4"
                  id="password"
                  type="password"
                />
                {!isClicked && (
                  <button
                    className="bg-yellow-300 text-black-1000 w-full py-2 my-8"
                    onClick={loginbtn}
                  >
                    Sign in
                  </button>
                )}
                {isClicked && (
                  <button className="bg-yellow-300 text-white-1000 w-full py-1 my-8 cursor-pointer">
                    <Loader />
                  </button>
                )}

                <p className="cursor-pointer" onClick={SingupHandler}>
                  New to here ? Create account.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login_;
