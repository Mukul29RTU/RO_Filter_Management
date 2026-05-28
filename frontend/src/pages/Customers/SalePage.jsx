import { useState } from "react";
import ProductList from "./Sales/ProductList";
import Cart from "./Sales/Cart";
import api from "../../api/apiClient";

const SalePage = () => {
  const [cart, setCart] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "",
    paymentStatus: "",
    date: "",
  });

  // ✅ ADD TO CART (correct qty merge)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, qty: p.qty + product.qty }
            : p
        );
      }

      return [...prev, product];
    });
  };

 const removeFromCart = (id) => {
  setCart((prev) => prev.filter((p) => p._id !== id));
};

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, qty } : p
      )
    );
  };



  return (
    <div className="container-fluid py-3 bg-light min-vh-100">

      {/* HEADER */} 
      <div className="mb-3 text-center" >
        <h3 className="fw-bold">Sales Voucher</h3>
      </div>

      <div className="row g-3">

        {/* LEFT SIDE */}
        <div className="col-lg-8">

          {/* CUSTOMER */}
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <h5 className="fw-bold mb-3">👤 Customer Details</h5>

              <div className="row g-2">

                <div className="col-md-6">
                  <input className="form-control" placeholder="Name *"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input className="form-control" placeholder="Phone *"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input className="form-control" placeholder="Email"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <input type="date" className="form-control"
                    value={customer.date}
                    onChange={(e) =>
                      setCustomer({ ...customer, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <select className="form-select"
                    value={customer.type}
                    onChange={(e) =>
                      setCustomer({ ...customer, type: e.target.value })
                    }
                  >
                    <option value="">Invoice Type</option>
                    <option value="SALE">Sale</option>
                    <option value="SERVICE">Service</option>
                    <option value="AMC">AMC</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <select className="form-select"
                    value={customer.paymentStatus}
                    onChange={(e) =>
                      setCustomer({ ...customer, paymentStatus: e.target.value })
                    }
                  >
                    <option value="">Payment Status</option>
                    <option value="PAID">Paid</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="UNPAID">Unpaid</option>
                  </select>
                </div>

                <div className="col-12">
                  <textarea className="form-control"
                    placeholder="Address"
                    rows="2"
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                  />
                </div>

              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="fw-bold mb-3">📦 Products</h5>

              <ProductList addToCart={addToCart} />
            </div>
          </div>

        </div>

        {/* RIGHT CART */}
        <div className="col-lg-4">

          <div
            className="card shadow-sm border-0"
            style={{
              position: "sticky",
              top: "25px",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <div className="card-body">

              <h5 className="fw-bold mb-3">🛒 Cart</h5>

              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQty={updateQty}
              />



            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SalePage;