import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Sizes.css";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchSizes } from "../../Redux/slices/sizeSlice";
import AddIcon from "../AddIcon/AddIcon";

const Sizes: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sizes} = useSelector((state: RootState) => state.sizes);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  return (
    <div className="size-main">
      <div className="size_add_item">
        <button className="btn-addSize"><AddIcon/><p>Add new Size</p></button>
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
