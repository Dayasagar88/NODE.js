import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const [prodList, setProdList] = useState([]);

  const getProducts = async () => {
    const res =  await axios("http://localhost:8080/products");
    setProdList(res.data)
  }
  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/products/${id}`);
      getProducts();
    }catch(err){
          console.log(err);
    }

  }

  useEffect(()=> {
    getProducts()
  },[]);

  return (
    <div className="w-[80vw] mx-auto justify-center  flex py-10 gap-5">
      <AddProduct setProdList={setProdList} />
      <div className="  grid grid-cols-3 gap-10">
      {prodList.map((prod, index) => (
        <Product key={prod.id} data={prod}  handleClick={() => handleDelete(prod.id)}/>
      ))}
      </div>
      
    </div>
  );
};

export default ProductList;
