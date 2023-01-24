import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "nuka-carousel";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { LocalShipping } from "@mui/icons-material";
import { Help } from "@mui/icons-material";
import { AttachMoney } from "@mui/icons-material";
const Home = () => {
  let navigate = useNavigate();
  const [electronics, setElectronics] = useState();
  const [mens, setMens] = useState();
  const [jewelry, setJewelry] = useState();
  const [womens, setWomens] = useState();
  const getElectronics = () => {
    axios
      .get(`https://fakestoreapi.com/products/category/electronics`)
      .then((result) => {
        setElectronics(result.data);
        console.log(result);
      });
  };
  const getJewelry = () => {
    axios
      .get("https://fakestoreapi.com/products/category/jewelery")
      .then((result) => {
        setJewelry(result.data);
        console.log(result);
      });
  };
  const getMens = () => {
    axios
      .get(`https://fakestoreapi.com/products/category/men's clothing`)
      .then((result) => {
        setMens(result.data);
        console.log(result);
      });
  };
  const getWomens = () => {
    axios
      .get(`https://fakestoreapi.com/products/category/women's clothing`)
      .then((result) => {
        setWomens(result.data);
        console.log(result);
      });
  };
  useEffect(() => {
    getElectronics();
    getMens();
    getWomens();
    getJewelry();
  }, []);

  return (
    <>
      <Carousel style={{ height: "300px", width: "100%" }}>
        <div>
          <img
            style={{ height: "600px", width: "100%" }}
            src="https://m.media-amazon.com/images/I/416YDluptAL._SX1500_.jpg"
          />
        </div>
        <div>
          <img
            style={{ height: "600px", width: "100%" }}
            src="https://m.media-amazon.com/images/I/71cQMXCLSvL._SX3000_.jpg"
          />
        </div>
        <div>
          <img
            style={{ height: "600px", width: "100%" }}
            src="https://m.media-amazon.com/images/I/81fl-uN9kOL._SX3000_.jpg"
          />
        </div>
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <div className="home-icons">
          <LocalShipping fontSize="large" />
          <p>Free Shipping</p>
        </div>
        <div className="home-icons">
          <Help fontSize="large" />
          <p style={{ marginLeft: "25px" }}>24/7 Customer Support</p>
        </div>
        <div className="home-icons">
          <AttachMoney fontSize="large" />
          <p>Easy Refunds</p>
        </div>
      </div>
      <fieldset
        style={{
          marginLeft: "350px",
          marginRight: "350px",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          borderTop: "2px solid black",
        }}
      >
        <legend
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
        >
          BEST DEALS ON CATEGORIES
        </legend>
      </fieldset>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className="categories">
          <h2
            onClick={() => {
              navigate(`/products/electronics`, {
                state: { type: "electronics" },
              });
            }}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Electronics
          </h2>
          <div className="home-image-container">
            {electronics?.slice(0, 4).map((item) => (
              <img
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
                className="home-image"
                src={item?.image}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="categories">
          <h2
            onClick={() => {
              navigate(`/products/men'sclothing`, {
                state: { type: "men's clothing" },
              });
            }}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Men's clothing
          </h2>
          <div className="home-image-container">
            {mens?.slice(0, 4).map((item) => (
              <img
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
                className="home-image"
                src={item?.image}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="categories">
          <h2
            onClick={() => {
              navigate(`/products/women'sclothing`, {
                state: { type: "women's clothing" },
              });
            }}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Women's clothing
          </h2>
          <div className="home-image-container">
            {womens?.slice(0, 4).map((item) => (
              <img
                onClick={() => {
                  navigate(`/product/${item.id}`);
                }}
                className="home-image"
                src={item?.image}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="categories">
          <h2
            onClick={() => {
              navigate(`/products/jewelery`, {
                state: { type: "jewelery" },
              });
            }}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            Jewellery
          </h2>
          <div className="home-image-container">
            {jewelry?.slice(0, 4).map((item) => (
              <img
                onClick={() => {
                  navigate(`/products/${item.id}`);
                }}
                className="home-image"
                src={item?.image}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
      <div className="deals">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="big-billion">
            <img
              className="top-deals"
              src="https://techstoriesindia.in/wp-content/uploads/2020/10/Flipkart-Big-Billion-Days-2020-Date-1024x628.png"
              alt=""
              onClick={() => {
                navigate(`/products`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
