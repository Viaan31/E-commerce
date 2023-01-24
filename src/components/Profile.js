import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const Profile = ({ token, setToken }) => {
  let navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const getDetails = () => {
    axios
      .get(
        `https://smallbrushedroof15.conveyor.cloud/api/Users/FindByID?ID=${token}`
      )
      .then((res) => {
        setdata(res.data);
        console.log(res);
      });
  };
  const getOrders = () => {
    axios
      .get(
        `https://smallbrushedroof15.conveyor.cloud/api/Orders/FindByUserID?UserID=${token}`
      )
      .then((result) => {
        setOrderData(result.data.data);
        console.log(result.data.data);
      });
  };

  useEffect(() => {
    getDetails();
    getOrders();
  }, []);

  return (
    <>
      <div className="profile">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            alignSelf: "flex-start",
            marginTop: "40px",
            marginLeft: "20px",
          }}
        >
          <Avatar src="/broken-image.jpg" sx={{ height: 200, width: 200 }} />
        </div>
        <div className="profile-left-container">
          <div style={{ borderBottom: "1px solid gray" }}>
            <h2>Your Details: </h2>
            <h5 style={{ marginBottom: "8px" }}>Personal Information </h5>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
              }}
            >
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Name:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.data?.[0]?.firstName} {data?.data?.[0]?.lastName}
                </p>
              </div>

              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Email:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.data?.[0]?.userName}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Phone Number:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.data?.[0]?.phoneNumber}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  Address:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.data?.[0]?.address}, {data?.data?.[0]?.landMark}
                </p>
              </div>
              <div className="profile-data">
                <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                  City:
                </h4>
                <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {data?.data?.[0]?.city}-{data?.data?.[0]?.pincode}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                navigate(`/register`, {
                  state: { type: "update", data: { data } },
                });
              }}
              style={{
                width: "200px",
                height: "35px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              Update Profile
            </button>

            <button
              style={{
                width: "200px",
                height: "35px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              onClick={() => {
                setToken("");
                localStorage.clear();
                navigate(`/`);
              }}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="profile-right-container">
          <Accordion sx={{ width: 400 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Customer Service
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Contact Details</Typography>
              <Typography>Call us on : 9999999999</Typography>
              <Typography>Email : fakestore@fakemail.com</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: 400, marginBottom: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>Return Policy</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Products must be returned within 7 days.</Typography>
              <Typography> Product must contain the original tags</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div>
        <h2>Past orders</h2>
        <div className="pastorder">
          {orderData?.map((orderData) => (
            <div
              key={"order" + orderData.orderID}
              className="profileorder-container"
            >
              <h3>Order {orderData?.orderID}</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  <CheckCircle />
                  Delivered
                </p>
              </div>
              <h3>Total Price: ${orderData?.totalPrice}</h3>
              <p>Date & Time: {orderData.createdOn}</p>
              {console.log(
                "products in cart",
                JSON.parse(orderData?.productInCart)
              )}

              {/* {JSON.parse(orderData?.productInCart)} */}
              <h4>Products: </h4>
              {JSON.parse(orderData?.productInCart)?.map((item) => (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    flexDirection: "column",
                    borderBottom: "1px solid darkgray",
                  }}
                >
                  <p>Name: {item?.title}</p>
                  <p>Quantity : {item?.qty}</p>
                  <p>Price: {item?.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
