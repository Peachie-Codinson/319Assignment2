import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import logo2 from './logo.png';
import productData from './products.json';

const Header = ({ onSearch, clearCart, toggleSidebar, isSidebarOpen }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      const searchInput = event.target.closest('.input-group').querySelector('input').value;
      onSearch(searchInput);
    }
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
          <img src={logo2} minHeight="35" className="my-auto mx-3 py-2" alt="Logo" />
          <div className="col-12 col-lg-auto d-flex mb-3 mb-lg-0 me-lg-auto py-3">
            <div className="input-group">
              <input
                id="searchInput"
                type="search"
                className="form-control form-control-dark"
                style={{ width: '350px' }}
                placeholder="Search for products..."
                aria-label="Search"
                onKeyDown={handleSearch}
              />
              <button className="btn btn-outline-secondary" type="button" style={{ backgroundColor: '#ff9900', borderColor: '#ff9900' }} onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2 btn-lg border-1" onClick={clearCart}>
              Clear Cart
            </button>
            <button type="button" className="btn btn-outline-light me-2 btn-lg border-0" onClick={toggleSidebar} disabled={isSidebarOpen}>
              <i className="bi bi-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ isOpen, toggleSidebar, cartItems }) => {
  return (
    <>
      {isOpen && <div className="overlay"></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className="container d-flex flex-column vh-100">


          <hr className="hr hr-blurry bg-dark m-0 mt-3" />

          <div className="d-flex justify-content-between">
            <h1 className="text-left mt-3 mb-3 ms-2">
              <i className="bi bi-cart me-4" style={{ fontSize: '2.5rem' }}></i>
              Your Cart
            </h1>
            <button className="btn btn-outline-secondary align-self-center rounded-circle me-5" onClick={toggleSidebar}>
              <i className="bi bi-x" style={{ fontSize: '1.3rem' }}></i>
            </button>
          </div>

          <hr className="hr hr-blurry bg-dark m-0" />

          <div className="cart-items overflow-auto">
            {Object.keys(cartItems).map(productId => (
              <div key={productId} className="card mb-3">
                <img src={cartItems[productId].image} className="card-img-top" alt={cartItems[productId].title} />
                <div className="card-body">
                  <h5 className="card-title">{cartItems[productId].title}</h5>
                  <p className="card-text">Count: {cartItems[productId].count}</p>
                </div>
              </div>
            ))}
          </div>
          <hr className="mt-auto hr hr-blurry  bg-dark m-0 mb-3" />
          <div className="mb-3 d-flex  justify-content-center">
              
              <button className="btn btn-primary btn-lg checkout-btn w-100 text-dark" style={{ backgroundColor: "#ff9900", borderColor: "#ff9900"}}>Proceed to Payment & Checkout</button>
          </div>

        </div>


      </div>
    </>
  );
};



const FilterBar = ({ filterProducts }) => {
  const filterTitles = ["All", "Jewelery", "Men's clothing", "Women's clothing", "Electronics"];

  const handleClick = (category) => {
    filterProducts(category);
  };

  return (
    <div className="bg-dark text-white">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="vr vr-blurry" />
        {filterTitles.map((title, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="vr vr-blurry" />}
            <button type="button" className="btn btn-outline-light border-0 px-2 mx-1 my-1 flex-grow-1" onClick={() => handleClick(title.toLowerCase())}>
              {title}
            </button>
          </React.Fragment>
        ))}
        <div className="vr vr-blurry" />
      </div>
    </div>
  );
};

const generateStarIcons = (rating) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    } else if (hasHalfStar && i === filledStars) {
      stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
    } else {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>);
    }
  }

  return stars;
};

const ProductCard = ({ product, handleAdd, handleSubtract, cartItems }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 rounded-0 d-flex flex-column">
        <img src={product.image} className="card-img-top" alt="Product Image" style={{ maxHeight: "200px", objectFit: "contain", minHeight: "150px" }} />
        <ProductCardBody
          product={product}
          handleAdd={handleAdd}
          handleSubtract={handleSubtract}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
};

const ProductCardBody = ({ product, handleAdd, handleSubtract, cartItems }) => {
  return (
    <div className="card-body flex-fill d-flex flex-column ">
      <h5 className="card-title" style={{ fontSize: "24px" }}>{product.title}</h5>
      <p className="card-text" style={{ fontSize: "16px", lineHeight: "1.5", maxHeight: "3em", overflow: "hidden" }}>{product.description}</p>
      <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center ">
        <div>
          <p className="card-text" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "3px", whiteSpace: "nowrap" }}>Price: ${product.price}</p>
          <p className="card-text mb-0" style={{ fontSize: "16px" }}>Rating: {generateStarIcons(product.rating.rate)} ({product.rating.count})</p>
        </div>
        <div>
          <div className="d-flex pt-2">
            {cartItems > 0 ? (
              <div className="btn-group" role="group" aria-label="Add to Cart">
                <button type="button" className="btn btn-secondary btn-lg" onClick={handleAdd}>+</button>
                <span className="text-center d-flex align-items-center justify-content-center border" style={{ height: "100%", width: "45px" }}>{cartItems}</span>
                <button type="button" className="btn btn-secondary btn-lg" onClick={handleSubtract}>-</button>
              </div>
            ) : (
              <a className="btn btn-primary btn-lg text-dark" onClick={handleAdd} style={{ backgroundColor: "#ff9900", borderColor: "#ff9900", padding: "0.5rem 1rem" }}>Add to cart</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {

  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [cartItems, setCartItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clearCart = () => {
    setCartItems({});
  };

  const filterProducts = (category) => {
    if (category === "all") {
      setFilteredProducts(productData);
    } else {
      const filtered = productData.filter(product => product.category.toLowerCase() === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (searchQuery) => {
    const searchResults = productData.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(searchResults);
  };

  const handleAdd = (productId) => {
    setCartItems(prevState => ({
      ...prevState,
      [productId]: (prevState[productId] || 0) + 1
    }));
  };

  const handleSubtract = (productId) => {
    if (cartItems[productId] > 0) {
      setCartItems(prevState => {
        const updatedCart = { ...prevState };
        updatedCart[productId] = updatedCart[productId] - 1;
        if (updatedCart[productId] === 0) {
          delete updatedCart[productId];
        }
        return updatedCart;
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} clearCart={clearCart} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} cartItems={cartItems} />
      <hr className="hr hr-blurry bg-dark m-0" />
      <FilterBar filterProducts={filterProducts} />

      <div className="container-fluid pt-4">
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAdd={() => handleAdd(product.id)}
              handleSubtract={() => handleSubtract(product.id)}
              cartItems={cartItems[product.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
