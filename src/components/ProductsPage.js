import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./styles.css";
import { CartContext } from "../App";

const ProductsPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const [allCategories, setallCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
  useEffect(() => {
    fetchData();
    getCategories();
  }, []);
  const fetchData = () => {
    axios.get(`https://fakestoreapi.com/products`).then((result) => {
      setData(result?.data);
      console.log(result);
    });
  };
  const getCategories = () => {
    axios.get(`https://fakestoreapi.com/products/categories`).then((result) => {
      setallCategories(result?.data);
      console.log("Electronics", result);
    });
  };

  const getProductsByCategory = (category) => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((result) => {
        setData(result?.data);
        console.log("Electronics", result);
      });
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="buttons">
        <div className="buttonborder">
          <h3>Categories</h3>
          <button
            className="arrangebuttons"
            onClick={() => {
              const fetchData = () => {
                setSelectedCategory("");
                axios
                  .get(`https://fakestoreapi.com/products`)
                  .then((result) => {
                    setData(result?.data);
                    console.log(result);
                  });
              };
              fetchData();
              data.map((item) => (
                <ProductCard productData={item} addToCart={addToCart} />
              ));
            }}
          >
            All
          </button>
          {allCategories.map((category) => {
            return (
              <>
                <button
                  className="arrangebuttons"
                  style={{
                    border:
                      selectedCategory == category
                        ? "5px solid orange"
                        : "1px solid black",
                  }}
                  onClick={() => {
                    getProductsByCategory(category);
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </button>
              </>
            );
          })}
        </div>
      </div>
      <div className="flex-container">
        {console.log("data", data?.data)}
        {data?.map((item) => (
          <ProductCard productData={item} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
