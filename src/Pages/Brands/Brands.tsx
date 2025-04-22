import { FC } from "react";
import "./Brands.css";

const Brands: FC = () => {
  const brands = [
    { id: 1, name: "Nike", created_at: "2025-04-10" },
    { id: 2, name: "Adidas", created_at: "2025-04-11" },
    { id: 3, name: "Zara", created_at: "2025-04-12" },
  ];

  return (
    <div className="brand-main">
      <div className="brand_add_item">
        <button className="btn-addBrand">Add new Brand</button>
      </div>

      <div className="brand_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>
                <td>{brand.name}</td>
                <td>{brand.created_at}</td>
                <td>
                  <div className="brand-actions">
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

export default Brands;
