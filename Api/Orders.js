import { Orders } from "../axios/index";

export const AllOrders = async () => {
  var AllOrders = await Orders.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllOrders;
};


export const Payment = async (data) => {
  var AllOrders = await Orders.post(`/payment`,data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllOrders;
};

export const Createorder = async (data) => {
  var Createorder = await Orders.post(`/create`,data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Createorder;
};
