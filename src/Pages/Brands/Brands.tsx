import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchBrands, createBrand } from "../../Redux/slices/brandSlice";
import ReactPaginate from "react-paginate";
import "./Brands.css";
import Input from "../../Components/Input/Input";
import AddIcon from "../AddIcon/AddIcon";

const Brands: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector(
    (state: RootState) => state.brands
  );

  const [showForm, setShowForm] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handleAddBrand = () => {
    if (newBrandName.trim()) {
      const newBrand = {
        name: newBrandName,
        created_at: new Date().toISOString(),
        updated_at: null,
      };
      dispatch(createBrand(newBrand));
      setNewBrandName("");
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setNewBrandName("");
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBrands = brands.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="brand-main">
      <div className="brand_add_item">
        
        <button className="btn-addBrand" onClick={() => setShowForm(true)}>
        <AddIcon/> Add new Brand
        </button>
      </div>

      {showForm && (
        <div className="brand-form-popup">
          <h3>Add New Brand</h3>
          <Input
            type="text"
            name="brandName"
            value={newBrandName}
            placeholder="Enter brand name..."
            onChange={(e) => setNewBrandName(e.target.value)}
            className="input-addBrand"
          />
          <div className="form-buttons">
            <button className="btn-save" onClick={handleAddBrand}>
              Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="brand_table">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
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
              {currentBrands && currentBrands.length > 0 ? (
                currentBrands.map((brand, index) => {
                  if (brand && brand.id !== undefined) {
                    return (
                      <tr key={`${brand.id}-${brand.name}-${brand.created_at}`}>
                        <td>{brand.id}</td>
                        <td>{brand.name || "N/A"}</td>
                        <td>
                          {brand.created_at
                            ? new Date(brand.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <div className="brand-actions">
                            <button className="btn-options">Edit</button>
                            <button className="btn-options delete">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td colSpan={4}>Invalid brand data</td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan={4}>No brands available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {brands.length > itemsPerPage && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={"<"} 
            nextLabel={">"} 
            breakLabel={"..."} 
            pageCount={Math.ceil(brands.length / itemsPerPage)} 
            marginPagesDisplayed={2}
            pageRangeDisplayed={0} 
            onPageChange={handlePageChange} 
            containerClassName={"pagination-container"}
            activeClassName={"active-page"}
            disabledClassName={"disabled-page"}
          />
        </div>
      )}
    </div>
  );
};

export default Brands;
