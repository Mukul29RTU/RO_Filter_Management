import { FaChartLine, FaTrash } from "react-icons/fa";

const Cart = ({ cart, removeFromCart, updateQty }) => {

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );


    const handleCheckout = async () => {
    try {
      const payload = {
        customer,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      };

      const res = await api.post("/api/sales/checkout", payload);

      alert("Checkout Successful!");
      console.log("Response:", res);

      // clear cart after success
      setCart([]);
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        type: "",
        paymentStatus: "",
        date: "",
      });

    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="d-flex flex-column gap-3">

      {cart.length === 0 ? (
        <div className="text-center text-muted py-3">
          No items in cart
        </div>
      ) : (
        <>
      
          {cart.map((item) => (
            <div
              key={item._id}
              className="card shadow-sm border-0"
            >
              <div className="card-body d-flex justify-content-between align-items-center">

             
                <div>
                  <h6 className="mb-1">{item.name.toUpperCase()}</h6>
                  <small className="text-muted">
                    ₹ {Number(item.price || 0).toLocaleString("en-IN")}
                  </small>
                </div>

           
                <div className="d-flex align-items-center gap-2">

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQty(item._id, item.qty - 1)
                    }
                  >
                    -
                  </button>

                  <span className="fw-bold">{item.qty}</span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQty(item._id, item.qty + 1)
                    }
                  >
                    +
                  </button>

                </div>

                {/* Remove */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="border-top pt-3 mt-2">

            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5>₹ {total.toLocaleString("en-IN")}</h5>
            </div>

            <button
                className="btn btn-success w-100 mt-3"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>

          </div>
        </>
      )}

    </div>
  );
};

export default Cart;