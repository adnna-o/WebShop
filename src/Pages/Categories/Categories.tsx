import { FC, useEffect } from "react";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchCategories } from "../../Redux/slices/categorySlice";
import AddIcon from "../AddIcon/AddIcon";

const Categories: FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { categories} = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="category-main">
      <div className="category_add_item">
        <button className="btn-addCategory"><AddIcon/><p>Add new Category</p></button>
      </div>

      <div className="category_table">
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th>Name</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.created_at}</td>
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
