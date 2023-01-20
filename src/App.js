import "./components/styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { useState, createContext } from "react";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddProduct from "./components/AddProduct";
import LocalMallSharpIcon from "@mui/icons-material/LocalMallSharp";
import { AccountCircleOutlined } from "@mui/icons-material";
import Success from "./components/Success";
import ProductCategory from "./components/ProductCategory";
import ViewOrders from "./components/ViewOrders";

export const CartContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? null
  );

  return (
    <Router>
      <div className="top">
        <div className="navbar-left">
          <Link to="/">
            <img
              style={{ marginTop: "14px", height: "86px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACPCAMAAAD0vXihAAAArlBMVEX///8Al+rh8PwAmeoAnesAAAAAm+v0+v4AlOmn1PZLru4moetjte9Zs+/3/P5Vru6x2feQy/OZz/XX6/t8vvF4f4nO09bv8fLW2dzj5efGys2Jx/M3p+3E5Pm43/jN6frq9v2dnqUAj+gAACYAGzePl55CR1cpPE9ZZnODjZVru/G5u7xBT16fp62or7QAACFocXsJJj0dMEQAEzErNUgAABZPVF9xc3gAAA42RVYYuttoAAADzElEQVR4nO3XbXOyOBSA4YNE3oIIiITwIlgFAYWCtt36///YBmv3aWc/7Ngv6cyeqzOY6rRzD4REABBCCCGEEEIIIYQQQgghhBBC6L8FluDKrvgjVVRVtWRX/OHojp7SQnbGN4Gay074xlW8YvYvurSenBB6l6afI2pL69FTLQls2w4SQojmtbehupTWAwt1Y3qe57pUo/59aPjyehKVqIr4IYqdBdo01KixkteTGbRNBds0tY9RS6i8+Qwz1c42rrvJXUNNMtc1c3fZyssB3SKWoShammyoaimCpUqcPmJF1AgV95aIyRZkGmhaJrPHV92N6Zt5oJJcDNys1RyZPZlh2WIJbKmmTgMxneVusU67mCw/D8uF1Msl6F/2K13i3nW3WhLrc5PPLLqcSa0BR6FJqmWryUYjQeBLnc6QKRtYGeSD3KXnZmUkjm+0wWShtkVRSA5qFaq0H9fIWSqESD9FbmJ+ThndTH7RAwdCd/FWOP70r3XPn3xbGE1Ld6lzG8zg4SVzvTudruuf9szE1yGNpt+2Mo/q5tPU4doFeMWjPdXHa9jF4hhPRx5GvcN6cdJCfjxCdPuET7+zmPcc4NhF4p3jNHScpe04sDI30z/J/eyfniwvVlCkmwd3ufVLGEVcnKbqeYDhUu0GaHbVy3h+u9RwuLyN55fT8xb61+rlhYe7cbyyt30179n5fNp108oovkQnRkqWBQRKqtqOf+vxnlY+yTVCvAd7LvP5/K94fmRx1O+O7Ph+LM8s2jfQXfhhgOM8hnpk5xLYqY4uZRSV7xGLWXPl0L3zW0+m+vrqycsU08mfXFP0KK5igk9nvpYXD/bcrldznY7DdLystwdg1xLikR8a4PMIyn14Oe/3+3m0CwFEpLhy13Hcj/P+1mNOzz1t6lPxgWXfeoxAfMGlhas9mHPv2T4zcSuUozi+dl961veeaF+GcRyHU099EDlOfYrFO+zW42riuTBdmETMFSUxqWMqCcl/2LMfhmHLx0N3Gvh46k5n1pyBHUTPZeqJpp4dDOduO7D4WfTEr3W378PXph/ERNeXtni2p779lBck9S1VXCNfzJ/EmPmk2CjBg9vcthZK4ENVR8DrqubQD8CGHsKaD1vgYp70NThlVfUQ1dONFZ6qNYP4rRqmGyxIAIqAWuIUzVq6mEGxSDeW4wSBaRd6S80HT9D/AhNnjt9euOyUCWu6uOuaqCmbJpYdI/QhsA7CdRiJhUp2zLStdCxsWNfF0fE39MQsLjkvY8ZZ5PyG64UQQgghhBBCCCGEEEIIIYQQQl/8DVAmW6vxuo7yAAAAAElFTkSuQmCC"
              alt="img"
            />
          </Link>

          <h1 className="header">Fake Store</h1>
        </div>
        <div className="navbar-right">
          <nav className="navbar">
            <Link to="/" className="link">
              Home
            </Link>

            <Link to="/products" className="link">
              Products
            </Link>

            {token ? (
              <Link to="/add" className="link">
                Add Product
              </Link>
            ) : null}
            {token ? (
              <Link to="/view" className="link">
                View Orders
              </Link>
            ) : null}
            <Link to="/cart" className="link">
              <LocalMallSharpIcon fontSize="large" /> <sup>{cart?.length}</sup>
            </Link>
            {token ? (
              <Link to="/profile" className="link">
                <AccountCircleOutlined fontSize="large" />
              </Link>
            ) : null}
          </nav>
        </div>
      </div>{" "}
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile token={token} setToken={setToken} />}
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/view" element={<ViewOrders />} />
          <Route
            path="/cart"
            element={
              token ? <Cart /> : <Login token={token} setToken={setToken} />
            }
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CartContext.Provider>
    </Router>
  );
}
export default App;
