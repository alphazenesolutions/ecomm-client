import { Cart } from "../axios/index";

export const CreateCart = async (data) => {
  var createCart = await Cart.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createCart;
};

export const AllCart = async () => {
  var AllCart = await Cart.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllCart;
};

export const SingleCart = async (data) => {
  var SingleCart = await Cart.post(`/view`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return SingleCart;
};


export const Mycart = async (data) => {
  var Mycart = await Cart.post(`/mycart`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Mycart;
};

export const Updatecart = async (data) => {
  var Updatecart = await Cart.post(`/update`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Updatecart;
};

export const Deleteecart = async (data) => {
  var Deleteecart = await Cart.post(`/destroy`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Deleteecart;
};