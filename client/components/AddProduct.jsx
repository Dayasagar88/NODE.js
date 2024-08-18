import axios from "axios";
import { get } from "mongoose";
import React, { useState } from "react";

const AddProduct = ({ setProdList }) => {
  const [prodAdded, setProdAdded] = useState(false);
  const [err, setError] = useState(false)

  const [product, setProduct] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    addProduct(product);
  };

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setProdList(res.data);
  };

  const addProduct = async (product) => {
    try {
      
      await axios.post("http://localhost:8080/products", product);
      
      getProducts();
      setProdAdded(true);
      setTimeout(() => {
        setProdAdded(false);
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false)
      }, 2000)
      console.log(err);
    }
  };

  return (
    <div className="card rounded-lg border border-border bg-card p-6 shadow-sm h-full">
      <div className="card-header pb-1">
        <h3 className="text-2xl font-bold">Add New Product</h3>
        <p className="text-muted-foreground">
          Fill out the form to create a new product.
        </p>
      </div>
      <form className="grid gap-2 ">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Enter product title"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            name="price"
            id="price"
            type="text"
            placeholder="Enter price"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="thumbnail" className="text-sm font-medium">
            Thumbnail
          </label>
          <input
            name="thumbnail"
            id="thumbnail"
            type="text"
            placeholder="Paste thumbnail"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="discount" className="text-sm font-medium">
            Discount
          </label>
          <input
            name="discountPercentage"
            id="discount"
            type="text"
            placeholder="Enter discount percentage"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>
          <input
            name="quantity"
            id="quantity"
            type="text"
            placeholder="Enter quantity"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="card-footer mt-6 flex justify-between items-center">
        {prodAdded && <p
          className={`font-semibold text-green-700 bg-[#ffffffde] px-2 rounded-xl flex items-center ${
            prodAdded ? "scale-1" : "scale-0"
          } transition-scale duration-200`}
        >
          <i className="fa-solid mr-1 bg-[#000000dc] w-5 h-5 rounded-full  p-[.2rem] fa-check"></i>
          Product added!
        </p>}
        { err && <p className={`text-center bg-[#a52727] px-2 text-white rounded-full transition-scale duration-150 ${err  ? "scale-100" : "scale-0"}`}>
          <i className="mr-1 text-center bg-white text-black rounded-full w-4 fa-solid fa-exclamation"></i>
        Enter product details
          </p>}
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md text-white bg-[#030303] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-gray-900 active:scale-[.97]"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct; 
