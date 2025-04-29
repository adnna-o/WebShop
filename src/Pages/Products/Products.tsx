import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "../../Redux/slices/productSlice";

import "./Products.css";
import { AppDispatch, RootState } from "../../Redux/store";
import AddIcon from "../AddIcon/AddIcon";
import { fetchBrands } from "../../Redux/slices/brandSlice";
import { fetchCategories } from "../../Redux/slices/categorySlice";
import { fetchSizes } from "../../Redux/slices/sizeSlice";

import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";
import { fetchColors } from "../../Redux/slices/colorSlice";
import ReactPaginate from "react-paginate";

const Products: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { brands } = useSelector((state: RootState) => state.brands);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { sizes } = useSelector((state: RootState) => state.sizes);
  const { colors } = useSelector((state: RootState) => state.colors);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [productSizes, setProductSizes] = useState<{
    [sizeId: string]: string;
  }>({});
  const [gender, setGender] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState<File[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setBrand("");
    setCategory("");
    setSize("");
    setGender("");
    setColor("");
    setDescription("");
    setImage([]);
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchSizes());
    dispatch(fetchColors());
  }, [dispatch]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", productName);
    formDataToSend.append("price", productPrice);
    formDataToSend.append("gender_id", gender);
    formDataToSend.append("color_id", color);
    formDataToSend.append("brand_id", brand);
  
    if (category) {
      formDataToSend.append("categories[]", category);
    }
  
    sizes.forEach((s) => {
      const amount = productSizes[s.id.toString()];
      if (amount) {
        formDataToSend.append(`sizes[${s.id}][size_id]`, s.id.toString());
        formDataToSend.append(`sizes[${s.id}][amount]`, amount);
      }
    });
  
    if (images.length > 0) {
      for (const img of images) {
        if (!["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(img.type)) {
          alert("Invalid image type. Only JPEG, PNG, JPG, or GIF are allowed.");
          return;
        }
        formDataToSend.append("images[]", img);
      }
    }
  
    formDataToSend.append("description", description);
  
    const result = await dispatch(addProduct(formDataToSend));
  
    if (addProduct.fulfilled.match(result)) {
      setSuccessMessage("Product successfully added!");
      await dispatch(fetchProducts());
      resetForm();
      setShowForm(false);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } else {
      alert("Error adding product.");
      console.error("Add product failed:", result);
    }
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="product-main">
      <div className="add_product_button" onClick={() => setShowForm(true)}>
        <AddIcon />
        <p>Add new Product</p>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-btn" onClick={() => setShowForm(false)}>
                X
              </button>
              <h2>Add Product</h2>
            </div>
            <form onSubmit={handleAddProduct}>
              <Input
                type="text"
                name="productName"
                value={productName}
                placeholder="Enter product name"
                onChange={(e) => setProductName(e.target.value)}
              />
              <Input
                type="number"
                name="productPrice"
                value={productPrice}
                placeholder="Enter product price"
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Select
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                options={brands.map((b) => ({
                  label: b.name,
                  value: b.id?.toString() || "",
                }))}
                placeholder="Select brand"
              />
              <Select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id?.toString() || "",
                }))}
                placeholder="Select category"
              />
              <Select
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                options={sizes.map((s) => ({
                  label: s.size,
                  value: s.id?.toString() || "",
                }))}
                placeholder="Select size"
              />
              {size && (
                <Input
                  type="number"
                  name={`amount-${size}`}
                  value={productSizes[size] || ""}
                  placeholder="Enter amount"
                  onChange={(e) => {
                    const newAmount = e.target.value;
                    setProductSizes((prev) => ({
                      ...prev,
                      [size]: newAmount,
                    }));
                  }}
                />
              )}

              <Select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                options={[
                  { label: "Male", value: "1" },
                  { label: "Female", value: "2" },
                  { label: "Children", value: "3" },
                ]}
                placeholder="Select gender"
              />
              <Select
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                options={colors.map((b) => ({
                  label: b.name,
                  value: b.id?.toString() || "",
                }))}
                placeholder="Select color"
              />
              <Input
                type="text"
                name="description"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="image-upload">
                <label htmlFor="image">Select images:</label>
                <br />
                <input
                  type="file"
                  name="image"
                  id="image"
                  multiple
                  accept="image/jpeg, image/png, image/jpg, image/gif"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImage(Array.from(e.target.files));
                    }
                  }}
                />
              </div>
              <br />
              <button type="submit">Add Product</button>
              <button type="button" onClick={resetForm}>
                Reset Data
              </button>
            </form>
          </div>
        </div>
      )}
      {successMessage && <div className="success-popup">{successMessage}</div>}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="product_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>First Image</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  {product.created_at
                    ? (() => {
                        const date = new Date(product.created_at);
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
                  {product.images?.length > 0 && (
                    <img
                      src="/images/children.webp"
                      alt={product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  <div className="product-actions">
                    <button className="btn-options">Edit</button>
                    <button className="btn-options delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(products.length / itemsPerPage)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination-container"}
          activeClassName={"active-page"}
          disabledClassName={"disabled-page"}
        />
      </div>
    </div>
  );
};

export default Products;
