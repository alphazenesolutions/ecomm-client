import { Wishlist } from "../axios/index";

export const CreateWishlist = async (data) => {
  var createWishlist = await Wishlist.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return createWishlist;
};

export const AllWishlist = async () => {
  var AllWishlist = await Wishlist.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return AllWishlist;
};

export const SingleWishlist = async (data) => {
  var SingleWishlist = await Wishlist.post(`/view`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return SingleWishlist;
};

export const Mywishlist = async (data) => {
  var Mywishlist = await Wishlist.post(`/mywishlist`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Mywishlist;
};

export const Deletewishlist = async (data) => {
  var Deletewishlist = await Wishlist.post(`/destroy`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Deletewishlist;
};

