import { useSelector } from "react-redux";

import RenderCartCourse from "./RenderCartCourse.jsx";
import RenderTotalAmount from "./RenderTotalAmount.jsx";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.auth);

  return (
    <div className="text-white">
      <h1> Your Cart</h1>
      <p>{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div>
          <RenderCartCourse />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
    </div>
  );
}
