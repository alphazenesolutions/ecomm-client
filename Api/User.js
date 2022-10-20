import { User } from "../axios/index";

export const CreateUser = async (data) => {
  var createuser = await User.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createuser;
};

export const LoginUser = async (data) => {
  var loginuser = await User.post(`/login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return loginuser;
};

export const Allusers = async () => {
  var Allusers = await User.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Allusers;
};

export const Myorder = async (data) => {
  var Myorder = await User.post(`/myorder`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Myorder;
};

export const Viewuser = async (data) => {
  var Viewuser = await User.post(`/viewUser`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Viewuser;
};

export const Updateuser = async (data) => {
  var Updateuser = await User.post(`/update`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Updateuser;
};

