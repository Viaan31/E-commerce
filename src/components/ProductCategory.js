import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCategoryCard from "./ProductCategoryCard";
import { CartContext } from "../App";
import { useLocation } from "react-router-dom";

const ProductCategory = () => {
  const [data, setData] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const location = useLocation();
  const category = location?.state?.type;
  console.log(location?.state?.type);
  const addToCart = (data) => {
    console.log(cart);

    if (cart == null) {
      setCart([{ ...data, qty: 1 }]);
      localStorage.setItem("cart", JSON.stringify([{ ...data, qty: 1 }]));
    } else {
      console.log(
        "ID",
        cart.findIndex((item) => item.id == data.id)
      );
      console.log("data1", data);
      if (cart.findIndex((item) => item.id == data.id) == -1) {
        setCart([...cart, { ...data, qty: 1 }]);
      } else {
        console.log(
          "duplicate item",
          cart[cart.findIndex((item) => item.id == data.id)]
        );
        let prevCart = [...cart];
        let duplicateItem = cart[cart.findIndex((item) => item.id == data.id)];
        duplicateItem.qty += 1;
        prevCart.splice(
          cart.findIndex((item) => item.id == data.id),
          1,
          duplicateItem
        );

        setCart([...prevCart]);
      }

      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...data, qty: 1 }])
      );
    }
  };
  const getProductsByCategory = (category) => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((result) => {
        setData(result?.data);
        console.log("Electronics", result);
      });
  };
  useEffect(() => {
    getProductsByCategory(category);
  }, []);

  return (
    <div>
      {data.map((item) => (
        <ProductCategoryCard
          productData={item}
          addToCart={addToCart}
          type="category"
        />
      ))}
    </div>
  );
};

export default ProductCategory;
