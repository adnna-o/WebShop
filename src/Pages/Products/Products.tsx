import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Products.css";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchProducts } from "../../Redux/slices/productSlice";
import AddIcon from "../AddIcon/AddIcon";


const Products: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product-main">
      <div className="product_add_item">
        <div
          className="add_product_button"
     
        >
          <AddIcon />
          <p>Add new Product</p>
        </div>
        <input
          className="products_searchBar"
          type="search"
          placeholder="Search..."
        />
      </div>

   
  
      <div className="product_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>First Image</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  {product.created_at
                    ? (() => {
                        const date = new Date(product.created_at);
                        const formattedDate = date.toLocaleDateString("en-GB");
                        const formattedTime = date.toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return `${formattedDate} ${formattedTime}`;
                      })()
                    : "N/A"}
                </td>
                <td>
                  {product.images?.length > 0 && (
                    <img
                      src="/images/children.webp"
                      alt={product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <div className="product-actions">
                    <button className="btn-options">Edit</button>
                    <button className="btn-options delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
