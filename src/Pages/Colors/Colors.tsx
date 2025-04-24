import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";  
import { fetchColors } from "../../Redux/slices/colorSlice"; 

import "./Colors.css";  
import AddIcon from "../AddIcon/AddIcon";

const ColorsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

 
  const { colors} = useSelector(
    (state: RootState) => state.colors
  );

  
  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  

  return (
    <div className="color-main">
      <div className="color_add_item">
        <button className="btn-addColor"><AddIcon/><p>Add new Color</p></button>
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
                <td>{color.hex_code}</td>
                <td>
                  <div
                    className="color-box"
                    style={{ backgroundColor: color.hex_code }}
                  ></div>
                </td>
                <td>{new Date(color.created_at).toLocaleDateString()}</td>
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
