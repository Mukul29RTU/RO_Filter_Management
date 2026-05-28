import { useEffect, useState } from "react";
import api from "../../../api/apiClient";
import Loading from "../../../components/Loading";
import ErrorState from "../../../components/ErrorState";

const ProductList = ({ addToCart }) => {
  const [type, setType] = useState("parts");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [qtyInputs, setQtyInputs] = useState({});

  useEffect(() => {
    loadInventory();
  }, [type]);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const endpoint =
        type === "parts"
          ? "/api/inventory/parts"
          : "/api/inventory/ro-models";

      const res = await api.get(endpoint);
      const data = type === "parts" ? res.items || [] : res.models || [];

      setItems(data);

      const initialInputs = {};
      data.forEach((item) => {
        initialInputs[item._id] = 1;
      });

      setQtyInputs(initialInputs);
    } catch (err) {
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const updateQty = (id, change) => {
    setQtyInputs((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  const handleQuantityChange = async (id, change) => {
    try {
      setItems((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + change),
              }
            : item
        )
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
      loadInventory();
    }
  };

  const handleCart = (item) => {
    const qty = qtyInputs[item._id] || 1;

    if (item.quantity <= 0) {
      alert("Item out of stock");
      return;
    }

    if (qty > item.quantity) {
      alert(`Only ${item.quantity} in stock`);
      return;
    }

    addToCart({ ...item, qty });
  };

  const displayedItems = items.filter((item) => {
    const itemName = item.name || item.modelName || "";
    return itemName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="inv-page-wrapper">
      <div className="inv-container">

        <header className="inv-header">
          <div className="inv-toggle-box">
            <button
              className={`inv-toggle-btn ${type === "parts" ? "active" : ""}`}
              onClick={() => {
                setType("parts");
                setSearchTerm("");
              }}
            >
              Parts
            </button>

            <button
              className={`inv-toggle-btn ${type === "ro" ? "active" : ""}`}
              onClick={() => {
                setType("ro");
                setSearchTerm("");
              }}
            >
              RO Models
            </button>
          </div>
        </header>

        <div className="inv-search-section">
          <div className="inv-search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder={`Quick search ${
                type === "parts" ? "parts" : "models"
              }...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <div className="row g-3">
          {displayedItems.map((p) => (
            <div
              key={p._id}
              className={`${
                p.quantity <= 0 ? "out-of-stock" : ""
              } col-12 col-sm-6 col-md-4 col-lg-3`}
            >
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column justify-content-between">

                  <div>
                    <h5 className="card-title">{p.name.toUpperCase()}</h5>
                    <span className="inv-item-cat">
                      {type === "parts" ? p.category || "Part" : "RO Unit"}
                    </span>
                  </div>

                  <p className="text-dark mb-2">
                    ₹ {Number(p.price || 0).toLocaleString("en-IN")}
                  </p>

                  <div className="inv-quick-row">
                    <button
                      className="inv-qty-btn"
                      onClick={() => updateQty(p._id, -1)}
                    >
                      −
                    </button>

                    <span className="inv-qty-val">
                      {qtyInputs[p._id] || 1}
                    </span>

                    <button
                      className="inv-qty-btn"
                      onClick={() => updateQty(p._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => handleCart(p)}
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductList;