import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { fetchGenders } from "../../Redux/slices/genderSlice";
import { fetchBrands } from "../../Redux/slices/brandSlice";
import { fetchCategories } from "../../Redux/slices/categorySlice";
import { fetchColors } from "../../Redux/slices/colorSlice";
import "./AddProductForm.css";
import Input from "../../Components/Input/Input";
import Select from "../../Components/Select/Select";

const AddProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColors] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const { genders, loading: gendersLoading } = useSelector(
    (state: RootState) => state.genders
  );
  const { brands, loading: brandsLoading } = useSelector(
    (state: RootState) => state.brands
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { colors, loading: colorsLoading } = useSelector(
    (state: RootState) => state.colors
  );

  useEffect(() => {
    dispatch(fetchGenders());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchColors());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      price,
      gender,
      brand,
      category,
    };
    console.log("Submitting product:", newProduct);
    // dispatch(addProduct(newProduct)); // kada napraviš addProduct akciju
  };

  return (
    <div className="add-product-form-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="number"
          name="price"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <Select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
            { label: "Children", value: 3 },
          ]}
          placeholder={gendersLoading ? "Loading Genders..." : "Select Gender"}
        />

        <Select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
          placeholder={
            categoriesLoading ? "Loading Categories..." : "Select Category"
          }
        />

      {/*<Select
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          options={brands.map((b) => ({
            label: b.name,
            value: b.id,
          }))}
          placeholder={brandsLoading ? "Loading Brands..." : "Select Brand"}
        />
*/}  
<Select
          name="color"
          value={color}
          onChange={(e) => setBrand(e.target.value)}
          options={colors.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
          placeholder={colorsLoading ? "Loading Colors..." : "Select Color"}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
