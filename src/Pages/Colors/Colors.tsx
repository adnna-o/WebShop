import { FC } from "react";
import "./Colors.css";

const Colors: FC = () => {
  const colors = [
    { id: 1, name: "Red", hex: "#FF0000", created_at: "2025-04-10" },
    { id: 2, name: "Green", hex: "#00FF00", created_at: "2025-04-11" },
    { id: 3, name: "Blue", hex: "#0000FF", created_at: "2025-04-12" },
  ];

  return (
    <div className="color-main">
      <div className="color_add_item">
        <button className="btn-addColor">Add new Color</button>
      </div>

      <div className="color_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Hex Code</th>
              <th>Color</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <tr key={color.id}>
                <td>{color.id}</td>
                <td>{color.name}</td>
                <td>{color.hex}</td>
                <td>
                  <div
                    className="color-box"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                </td>
                <td>{color.created_at}</td>
                <td>
                  <div className="color-actions">
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

export default Colors;
