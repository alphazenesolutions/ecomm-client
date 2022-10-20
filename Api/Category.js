import { Category } from "../axios/index";

export const Creatcategory = async (data) => {
  var creatcategory = await Category.post(`/create`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return creatcategory;
};

export const Allcategory = async () => {
  var Allcategory = await Category.get(`/viewall`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return Allcategory;
};

export const Deltecategory = async (data) => {
  var deltecategory = await Category.post(`/destroy`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return deltecategory;
};

export const categoryproduct = async (data) => {
  var categoryproduct = await Category.post(`/categoryproduct`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return categoryproduct;
};

export const Storecategory = async (data) => {
  var storecategory = await Category.post(`/storecategory`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return storecategory;
};

export const category_slug = async (data) => {
  var categorySlug = await Category.post(`/view_by_slug`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return categorySlug;
};
