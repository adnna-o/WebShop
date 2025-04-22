import { FC } from "react";
import "./Sizes.css";

const Sizes: FC = () => {
  const sizes = [
    { id: 1, size: "S", created_at: "2025-04-10" },
    { id: 2, size: "M", created_at: "2025-04-11" },
    { id: 3, size: "L", created_at: "2025-04-12" },
  ];

  return (
    <div className="size-main">
      <div className="size_add_item">
        <button className="btn-addSize">Add new Size</button>
      </div>

      <div className="size_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Size</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size.id}>
                <td>{size.id}</td>
                <td>{size.size}</td>
                <td>{size.created_at}</td>
                <td>
                  <div className="size-actions">
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

export default Sizes;
