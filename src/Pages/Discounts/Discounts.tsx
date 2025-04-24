import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Discounts.css";
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchDiscounts } from "../../Redux/slices/discountSlice";
import AddIcon from "../AddIcon/AddIcon";

const Discounts: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { discounts} = useSelector(
    (state: RootState) => state.discounts
  );

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  return (
    <div className="discount-main">
      <div className="discount_add_item">
        <button className="btn-addDiscount">
          <AddIcon/>
          <p>Add new Discount</p></button>
      </div>

      <div className="discount_table">
       
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Discount Percentage</th>
                <th>Valid To</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.id}</td>
                  <td>{discount.name}</td>
                  <td>{discount.discount}%</td>
                 
                  <td>{new Date(discount.valid_to).toLocaleDateString()}</td>
                  <td>
                    <div className="discount-actions">
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

export default Discounts;
