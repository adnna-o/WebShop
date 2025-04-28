import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { SketchPicker } from "react-color";
import { fetchColors, addColor } from "../../Redux/slices/colorSlice";

import AddIcon from "../AddIcon/AddIcon";
import "./Colors.css";
import Input from "../../Components/Input/Input";

const ColorsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { colors, loading, error } = useSelector(
    (state: RootState) => state.colors
  );

  const [showForm, setShowForm] = useState(false);
  const [newColor, setNewColor] = useState({
    name: "",
    hex_code: "",
    color: "#000000",
  });

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  const handleAddClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (color: any) => {
    setNewColor({
      ...newColor,
      hex_code: color.hex,
      color: color.hex,
    });
  };
  const handleCancel = () => {
    setNewColor({ name: "", hex_code: "", color: "#000000" });
    setShowForm(false);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColor.name.trim() || !newColor.hex_code.trim()) return;

    dispatch(addColor(newColor)).then(() => {
      dispatch(fetchColors());
    });

    setNewColor({ name: "", hex_code: "", color: "#000000" });
    setShowForm(false);
  };

  return (
    <div className="color-main">
      
      <div className="color_add_item">
        <button className="btn-addColor" onClick={handleAddClick}>
          <AddIcon />
          <p>{showForm ? "Cancel" : "Add new Color"}</p>
        </button>
      </div>

      {showForm && (
        <form className="color-form-popup" onSubmit={handleSubmit}>
          <h3>Add New Color</h3>
          <Input
            type="text"
            name="name"
            value={newColor.name}
            placeholder="Color Name"
            onChange={handleInputChange}
            className="input-addColor"
          />
          <Input
            type="text"
            name="hex_code"
            value={newColor.hex_code}
            placeholder="Hex Code (e.g., #ff5733)"
            onChange={handleInputChange}
            className="input-addColor"
          />
          <div className="color-picker">
            <SketchPicker
              color={newColor.color}
              onChange={handleColorChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-saveColor">
              Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Loading ili error poruke */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    
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
            {colors.map((color, index) => (
              <tr key={color.id || index}>
                <td>{color.id || "-"}</td>
                <td>{color.name || "-"}</td>
                <td>{color.hex_code || "-"}</td>
                <td>
                  <div
                    className="color-box"
                    style={{ backgroundColor: color.hex_code }}
                  ></div>
                </td>
                <td>
                  {color.created_at
                    ? (() => {
                        const date = new Date(color.created_at);
                        if (isNaN(date.getTime())) {
                          return "Invalid Date";
                        }
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

export default ColorsPage;
