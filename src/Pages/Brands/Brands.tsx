import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchBrands, createBrand } from "../../Redux/slices/brandSlice";
import ReactPaginate from "react-paginate"; // Import React Paginate
import "./Brands.css";
import Input from "../../Components/Input/Input";

const Brands: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading, error } = useSelector((state: RootState) => state.brands);

  const [showForm, setShowForm] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  // Paginacija
  const itemsPerPage = 10; // Broj brendova po stranici
  const [currentPage, setCurrentPage] = useState(0); // React Paginate koristi indekse (počinje od 0)

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

  // Paginacija: deljenje brendova na stranice
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBrands = brands.slice(indexOfFirstItem, indexOfLastItem);

  // Funkcija za promenu stranice
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected); // React Paginate vraća indeks stranice
  };

  return (
    <div className="brand-main">
      {/* Dugme za otvaranje forme */}
      <div className="brand_add_item">
        <button className="btn-addBrand" onClick={() => setShowForm(true)}>
          Add new Brand
        </button>
      </div>

      {/* Forma koja iskače */}
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

      {/* Tabela sa brendovima */}
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
      // Provera da li brand postoji i da li ima validan 'id'
      if (brand && brand.id !== undefined) {
        return (
          <tr key={`${brand.id}-${brand.name}-${brand.created_at}`}>
            <td>{brand.id}</td>
            <td>{brand.name || "N/A"}</td>
            <td>{brand.created_at ? new Date(brand.created_at).toLocaleDateString() : "N/A"}</td>
            <td>
              <div className="brand-actions">
                <button className="btn-options">Edit</button>
                <button className="btn-options delete">Delete</button>
              </div>
            </td>
          </tr>
        );
      } else {
        // Ako brand nije validan, možemo ga zanemariti ili prikazati poruku
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

      {/* Paginacija */}
      {brands.length > itemsPerPage && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={"<"} // Strelica za prethodnu stranicu
            nextLabel={">"} // Strelica za sledeću stranicu
            breakLabel={"..."} // Za razdvajanje velikih blokova stranica (ako je potrebno)
            pageCount={Math.ceil(brands.length / itemsPerPage)} // Ukupan broj stranica
            marginPagesDisplayed={2} // Broj stranica na početku i kraju (ako su stranice veće od 5)
            pageRangeDisplayed={0} // Ne prikazuje brojeve stranica, samo strelice
            onPageChange={handlePageChange} // Funkcija koja se poziva pri promeni stranice
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
