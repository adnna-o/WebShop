import { FC } from "react";
import "./Products.css";

const Products: FC = () => {
  const products = [
    {
      id: 1,
      name: "Product A",
      createdAt: "2025-04-20",
      images: ["https://via.placeholder.com/100"],
    },
    {
      id: 2,
      name: "Product B",
      createdAt: "2025-04-18",
      images: ["https://via.placeholder.com/100"],
    },
  ];

  return (
    <div className="product-main">
      <div className="product_add_item">
        <button className="btn-addProduct">Add new Product</button>
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
                <td>{product.createdAt}</td>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                  />
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
