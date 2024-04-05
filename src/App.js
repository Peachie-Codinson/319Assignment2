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

const CartItemCard = ({ productId, product, cartItems, handleAdd, handleSubtract, handleDelete }) => {
  return (
    <div key={productId} className="card mb-3 mt-3 me-2 ms-2">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              className="card-img-top pt-2 pb-2"
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h5 className="card-title mt-4">Price: ${product.price}</h5>
            </div>
            
          </div>

          <div className='col-md-3'>
            <div className='d-flex flex-column'>
            <div className="d-flex align-items-end flex-column mt-4 me-3">
              <div className="btn-group " role="group">
                <button type="button" className="btn btn-secondary btn-md" onClick={() => handleAdd(productId)}>+</button>
                <div className="container col-md-5 d-flex align-items-center justify-content-center border">
                  <span className="text-center align-self-center">{cartItems[productId]}</span>
                </div>
                <button type="button" className="btn btn-secondary btn-md" onClick={() => handleSubtract(productId)}>-</button>
              </div>
            </div>
            <div className="mt-4 mb-2 me-2 align-self-end">
            <button type="button" className=" btn btn-secondary btn-md" onClick={() => handleDelete(productId)}>
              <i className="bi bi-trash"></i>
            </button>

            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

//temporary cart view
const Sidebar = ({ isOpen, toggleSidebar, cartItems, handleAdd, handleSubtract, handleDelete, calculateTotal }) => {
  return (
    <>
      {isOpen && <div className="overlay"></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className="container d-flex flex-column vh-100">

          <hr className="hr hr-blurry bg-dark m-0 mt-3" />

          <div className="d-flex justify-content-between align-content-center no-wrap">
            <h1 className="text-left mt-3 mb-3 ms-2" style={{ whiteSpace: 'nowrap' }}>
              <i className="bi bi-cart me-md-4 me-sm-3" style={{ fontSize: '2.5rem' }}></i>
              <span className="d-none d-md-inline">Your Cart</span>
              <span className="d-inline d-md-none" style={{ fontSize: '1.5rem' }}>Your Cart</span>
            </h1>

            <button className="btn btn-outline-secondary align-self-center rounded-circle ms-md-3 me-sm-2 me-md-3 me-sm-2" onClick={toggleSidebar}>
              <i className="bi bi-x" style={{ fontSize: '1.3rem' }}></i>
            </button>
          </div>

          <hr className="hr hr-blurry bg-dark m-0" />

          <div className="cart-items overflow-auto  me-1 mt-2 mb-2">
            {Object.keys(cartItems).map(productId => {
              const product = productData.find(item => item.id === parseInt(productId, 10));
              if (product) {
                return (
                  <CartItemCard
                    key={productId}
                    productId={productId}
                    product={product}
                    cartItems={cartItems}
                    handleAdd={handleAdd}
                    handleSubtract={handleSubtract}
                    handleDelete = {handleDelete}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>

          <hr className="mt-auto hr hr-blurry  bg-dark m-0" />
          <div className='d-flex flex-row justify-content-between mt-2 mb-3'>
              <h3 className="card-title ">Subtotal:</h3>
              <h3 className="card-title me-2">${calculateTotal()}</h3>
          </div>
          
          <hr className="hr hr-blurry  bg-dark m-0 mb-3" />
          <div className="mb-3 d-flex  justify-content-center">
            <button className="btn btn-primary btn-lg checkout-btn w-100 text-dark" style={{ backgroundColor: "#ff9900", borderColor: "#ff9900" }}>Proceed to Payment & Checkout</button>
          </div>

        </div>
      </div>
    </>
  );
};




//Search by filters, located udner header
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

//Generate stars based on numerical rating
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

//Contains the body that hold all cards
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

//Contains the card
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

  const handleDelete = (productId) => {
    setCartItems(prevState => {
      const updatedCart = { ...prevState };
      updatedCart[productId] = 0; // Set count to 0
      delete updatedCart[productId]; // Remove item from cart
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cartItems).forEach(productId => {
      const product = productData.find(item => item.id === parseInt(productId, 10));
      if (product) {
        total += product.price * cartItems[productId];
      }
    });
    return total.toFixed(2);
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

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        cartItems={cartItems}
        handleAdd={handleAdd}
        handleSubtract={handleSubtract}
        handleDelete = {handleDelete}        
        calculateTotal={calculateTotal}
      />


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
