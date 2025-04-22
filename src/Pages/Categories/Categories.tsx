import { FC } from "react";
import "./Categories.css";

const Categories: FC = () => {
  const categories = [
    {
      id: 1,
      name: "T-Shirts",
      createdAt: "2025-04-10",
    },
    {
      id: 2,
      name: "Jeans",
      createdAt: "2025-04-12",
    },
    {
      id: 3,
      name: "Jackets",
      createdAt: "2025-04-14",
    },
    {
      id: 4,
      name: "Shoes",
      createdAt: "2025-04-16",
    },
  ];

  return (
    <div className="category-main">
      <div className="category_add_item">
        <button className="btn-addCategory">Add new Category</button>
      </div>

      <div className="category_table">
        <table>
          <thead>
            <tr>
              <th>ID Kategorije</th>
              <th>Naziv</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.createdAt}</td>
                <td>
                  <div className="category-actions">
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

export default Categories;
