import { FC, useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Products.css";
import { AppDispatch, RootState } from "../../Redux/store";
import { addProduct, fetchProducts } from "../../Redux/slices/productSlice";

const Products: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [newProductName, setNewProductName] = useState("");
  const [newImageURL, setNewImageURL] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name: newProductName,
      created_at: new Date().toISOString().split("T")[0],
      images: [newImageURL],
    };

    dispatch(addProduct(newProduct));
    setNewProductName("");
    setNewImageURL("");
  };

  return (
    <div className="product-main">
      <div className="product_add_item">
        <form onSubmit={handleAddProduct} className="product-form">
         
          <button type="submit" className="btn-addProduct">
            Add new Product
          </button>
        </form>

        <input className="products_searchBar" type="search" placeholder="Search..." />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

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
                <td>{product.created_at}</td>
                <td>
                  <img src={product.images[0]} alt={product.name} className="product-image" />
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
