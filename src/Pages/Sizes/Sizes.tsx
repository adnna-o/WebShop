import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Sizes.css";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchSizes, addSize } from "../../Redux/slices/sizeSlice";
import AddIcon from "../AddIcon/AddIcon";
import Input from "../../Components/Input/Input";

const Sizes: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sizes, loading, error } = useSelector(
    (state: RootState) => state.sizes
  );

  const [showForm, setShowForm] = useState(false);
  const [newSize, setNewSize] = useState("");

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  const handleAddClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSize(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSize.trim()) return;

    dispatch(addSize(newSize));

    setNewSize("");
    setShowForm(false);
  };

  return (
    <div className="size-main">
      <div className="size_add_item">
        <button className="btn-addSize" onClick={handleAddClick}>
          <AddIcon />
          <p>{showForm ? "Cancel" : "Add new Size"}</p>
        </button>
      </div>

      {showForm && (
        <form className="size-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="size"
            value={newSize}
            placeholder="Enter size (e.g., S, M, L, XL)"
            onChange={handleInputChange}
            className="size-input"
          />
          <button type="submit" className="btn-saveSize">
            Save Size
          </button>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

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
              <tr key={size.id ? size.id : `${size.size}-${size.created_at}`}>
                <td>{size.id}</td>
                <td>{size.size}</td>
                <td>
                  {size.created_at
                    ? (() => {
                        const date = new Date(size.created_at);
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
