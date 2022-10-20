import axios from "axios";

export const User = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/users`,
});

export const Store = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/store`,
});

export const Product = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/product`,
});

export const Category = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/category`,
});

export const Variation = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/variation`,
});

export const Gallery = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/gallery`,
});

export const Orders = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/order`,
});

export const CategoryType = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/categorytype`,
});

export const Userelements = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/userelements`,
});

export const Cart = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/cart`,
});

export const Wishlist = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/wishlist`,
});

export const Journal = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/journal`,
});

export const Review = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/review`,
});

export const Coverimg = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/coverimg`,
});

export const Navbar = axios.create({
  baseURL: `https://e-comme-api.herokuapp.com/navbar`,
});