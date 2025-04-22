import { FC } from "react";
import "./Discounts.css";

const Discounts: FC = () => {
  const discounts = [
    {
      id: 1,
      name: "Spring Sale",
      percentage: "20%",
      product: "Product A",
      validTo: "2025-05-01",
    },
    {
      id: 2,
      name: "Clearance",
      percentage: "50%",
      product: "Product B",
      validTo: "2025-04-30",
    },
  ];

  return (
    <div className="discount-main">
      <div className="discount_add_item">
        <button className="btn-addDiscount">Add new Discount</button>
      </div>

      <div className="discount_table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Discount Percentage</th>
              <th>Product Affected</th>
              <th>Valid To</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td>{discount.id}</td>
                <td>{discount.name}</td>
                <td>{discount.percentage}</td>
                <td>{discount.product}</td>
                <td>{discount.validTo}</td>
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
