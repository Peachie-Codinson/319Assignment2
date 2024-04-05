import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import logo2 from './logo.png';
import productData from './products.json';

const Header = ({ onSearch }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const searchInput = event.target.value;
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
            <button type="button" className="btn btn-outline-light me-2 btn-lg border-0">
              <i className="bi bi-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
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
      <div className="vr vr-blurry"/>
        {filterTitles.map((title, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <div className="vr vr-blurry"/>}
            <button type="button" className="btn btn-sm btn-outline-light border-0 px-2 mx-1 my-1 flex-grow-1" onClick={() => handleClick(title.toLowerCase())}>
              {title}
            </button>
          </React.Fragment>
        ))}
        <div className="vr vr-blurry"/>
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

const ProductCard = ({ product }) => {
  const [cartItems, setCartItems] = useState(0);

  const handleAdd = () => {
    setCartItems(cartItems + 1);
  };

  const handleSubtract = () => {
    if (cartItems > 0) {
      setCartItems(cartItems - 1);
    }
  };


  return (
    <div className="col-md-4 mb-4"> {/* Adjust card width for medium devices */}
      <div className="card h-100 rounded-0 d-flex flex-column"> {/* Set fixed height for the card, reduce corner radius, and use flexbox to align elements */}
        <img src={product.image} className="card-img-top" alt="Product Image" style={{ maxHeight: "200px", objectFit: "contain", minHeight: "150px" }} />

        <div className="card-body flex-fill d-flex flex-column ">
          <h5 className="card-title" style={{ fontSize: "24px" }}>{product.title}</h5>
          <p className="card-text" style={{ fontSize: "16px", lineHeight: "1.5", maxHeight: "3em", overflow: "hidden" }}>{product.description}</p>

          <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center "> {/* Align items at the bottom */}
            <div style={{ padding: "5px" }}>
              <p className="card-text" style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "3px", whiteSpace: "nowrap" }}>Price: ${product.price}</p> {/* Increase font size of price and prevent wrapping */}
              <p className="card-text mb-0" style={{ fontSize: "16px" }}>Rating: {generateStarIcons(product.rating.rate)} ({product.rating.count})</p> {/* Generate star icons for rating */}
            </div>

            <div style={{ padding: "5px" }}>
              <div className="d-flex">
                {cartItems > 0 ? (
                  <div className="btn-group" role="group" aria-label="Add to Cart">
                    <button type="button" className="btn btn-secondary btn-lg" onClick={handleSubtract}>-</button>
                    <span className="text-center d-flex align-items-center justify-content-center border px-3" style={{ height: "100%" }}>{cartItems}</span>
                    <button type="button" className="btn btn-secondary btn-lg" onClick={handleAdd}>+</button>
                  </div>
                ) : (
                  <a className="btn btn-primary btn-lg text-dark" onClick={handleAdd} style={{ backgroundColor: "#ff9900", borderColor: "#ff9900", padding: "0.5rem 1rem" }}>Add to cart</a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const filterProducts = (category) => {
    if (category === "all") {
      setFilteredProducts(productData);
    } 
    else {
      const filtered = productData.filter(product => product.category.toLowerCase() === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (searchQuery) => {
    const searchResults = productData.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(searchResults);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <hr className="hr hr-blurry bg-dark m-0" />
      <FilterBar filterProducts={filterProducts} />
      <div className="container-fluid pt-4">
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default App;
