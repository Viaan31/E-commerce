import React from "react";
import "./styles.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  price: yup.number().min(1).required(),
  quantity: yup.number().min(1).required(),
  description: yup.string(),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const addHandler = (data) => {
    // let blob = new Blob(data?.image, { type: "image/png" });
    // let url = URL.createObjectURL(blob);
    console.log(data);
    axios
      .post(
        `https://littleaquawave69.conveyor.cloud/api/Products/Insert
      `,
        {
          title: data?.title,
          Price: data?.price,
          Category: data?.category,
          Quantity: data?.quantity,
          Description: data?.description,
        }
      )
      .then((res) => console.log("product", res));

    axios
      .post(
        `https://littleaquawave69.conveyor.cloud/api/Products/ImageUpload`,
        {
          files: data?.image,
          // ImgName: data?.title,
        }
      )
      .then((res) => console.log("Image", res));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(addHandler)} className="register-container">
        <div style={{ width: "500px", borderBottom: "2px solid gray" }}>
          <h1 style={{ color: "white" }}>Add Product</h1>
        </div>
        {/* {console.log(process.env.REACT_APP_API_URL)} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "75px",
            marginTop: "10px",
          }}
        >
          <label>Title</label>
          <input
            type="text"
            name="title"
            // placeholder="Product Title"
            {...register("title")}
          />
        </div>
        {errors.title?.message && (
          <p className="errors">{errors.title?.message}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <label>Category</label>
          <input
            type="text"
            name="category"
            // placeholder="Product Category"
            {...register("category")}
          />
        </div>
        {errors.category?.message && (
          <p className="errors">{errors.category?.message}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "70px" }}>
          <label>Price</label>
          <input
            type="text"
            name="price"
            // placeholder="Price"
            {...register("price")}
          />
        </div>
        {errors.price?.message && (
          <p className="errors">{errors.price?.message}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            // placeholder="Product Quantity"
            {...register("quantity")}
          />
        </div>
        {errors.quantity?.message && (
          <p className="errors">{errors.quantity?.message}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label>Description</label>
          <input
            type="text"
            name="description"
            // placeholder="Product Description"
            {...register("description")}
          />
        </div>
        {errors.description?.message && (
          <p className="errors">{errors.description?.message}</p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: "75px" }}>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              console.log("image file", event.target.files[0]);
            }}
            {...register("image")}
          />
        </div>
        <button type="submit" style={{ width: "200px", height: "40px" }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
