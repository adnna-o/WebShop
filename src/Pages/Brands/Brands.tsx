import { FC, useEffect } from "react";
import "./Brands.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchBrands } from "../../Redux/slices/brandSlice";

const Brands: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { brands, loading, error } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <div className="brand-main">
      <div className="brand_add_item">
        <button className="btn-addBrand">Add new Brand</button>
      </div>

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
              {brands.map((brand) => (
                
                 <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>{new Date(brand.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="brand-actions">
                      <button className="btn-options">Edit</button>
                      <button className="btn-options delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Brands;
