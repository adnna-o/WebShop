import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchCategories, addCategory } from "../../Redux/slices/categorySlice"; 
import Input from "../../Components/Input/Input"; 
import AddIcon from "../AddIcon/AddIcon";
import ReactPaginate from "react-paginate"; 
import "./Categories.css";

const Categories: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    dispatch(addCategory({ name: categoryName }));

    setCategoryName("");
    setShowForm(false);
  };

  const currentCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="category-main">
      <div className="category_add_item">
        <button className="btn-addCategory" onClick={() => setShowForm(!showForm)}>
          <AddIcon />
          <p>{showForm ? "Cancel" : "Add new Category"}</p>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="category-form">
          <h3>Add New Category</h3>
          <Input
            type="text"
            name="categoryName"
            value={categoryName}
            placeholder="Category Name"
            onChange={handleInputChange}
            className="input-category"
          />
          <div className="form-buttons">
            <button type="submit" className="btn-saveCategory">Save</button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="category_table">
        {categories && categories.length > 0 ? (
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
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    {category.created_at ? (
                      (() => {
                        const date = new Date(category.created_at);
                        const formattedDate = date.toLocaleDateString("en-GB");
                        const formattedTime = date.toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });
                        return `${formattedDate} ${formattedTime}`;
                      })()
                    ) : (
                      "N/A"
                    )}
                  </td>
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
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(categories.length / itemsPerPage)}
          marginPagesDisplayed={2} 
          pageRangeDisplayed={0} 
          onPageChange={handlePageChange} 
          containerClassName={"pagination-container"}
          activeClassName={"active-page"}
          disabledClassName={"disabled-page"}
        />
      </div>
    </div>
  );
};

export default Categories;
