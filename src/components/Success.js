import React, { useContext } from "react";
import { CartContext } from "../App";
import "./styles.css";
import axios from "axios";
const Success = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  // const handleAddOrder = () => {
  //   cart.map((item) =>
  //     axios
  //       .post("", {
  //         title: item.title,
  //         price: item.price,
  //         quantity: item.qty,
  //       })
  //       .then((result) => console.log(result))
  //   );
  // };
  // useEffect(() => {
  //   handleAddOrder();
  // }, []);

  return (
    <div className="success">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3KoNpySX6KZDN0GJtebbCnuYtu2FIClZGA&usqp=CAU"
        alt=""
        className="image"
      />
      <h1>Order Placed Successfully</h1>
    </div>
  );
};

export default Success;
