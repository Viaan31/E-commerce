import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetailCard from "./ProductDetailCard";
import "./styles.css";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [data, setData] = useState([]);
  const [isValue, setIsValue] = useState(false);
  let { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    getProductData(id);
  }, [id]);

  const getProductData = (id) => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((result) => {
      setData(result.data);
      console.log(result);
      setIsValue(true);
    });
  };
  return <div>{isValue ? <ProductDetailCard productData={data} /> : null}</div>;
};

export default ProductDetailPage;
