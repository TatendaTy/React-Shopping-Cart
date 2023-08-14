import React, { useState, useEffect } from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "./components/ShoppingCart";
import RatingStars from "./components/RatingStars";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy",
    description: "Feel the power of tech",
    rating: 4.3,
    price: 199,
    image: require("./assets/images/product-1.png"),
  },
  {
    id: 2,
    name: "Iphone",
    description: "Tech in hand",
    rating: 4.2,
    price: 229,
    image: require("./assets/images/product-2.png"),
  },
  {
    id: 3,
    name: "White Smart Watch",
    rating: 3.2,
    description: "Smart in white",
    price: 99,
    image: require("./assets/images/product-3.png"),
  },
  {
    id: 4,
    name: "Black Smart Watch",
    rating: 4.8,
    description: "Smart in black",
    price: 119,
    image: require("./assets/images/product-4.png"),
  },
  {
    id: 5,
    name: "Second Hand Phones",
    rating: 4.5,
    description: "Second hand phones in good condition",
    price: 85,
    image: require("./assets/images/product-5.jpg"),
  },
  {
    id: 6,
    name: "Headphones",
    rating: 3.8,
    description: "Headphones for your music",
    price: 149,
    image: require("./assets/images/product-6.png"),
  },
];

function App() {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart"))
  );
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item.id === product.id
      );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div className="App">
      <ShoppingCart
        visibility={cartVisibility}
        products={productsInCart}
        onClose={() => setCartVisibility(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove}
      />
      <div className="navbar">
        <h3 className="logo">Swiss Electronics</h3>
        <button
          className="btn shopping-cart-btn"
          onClick={() => setCartVisibility(true)}
        >
          <GiShoppingBag size={24} />
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
      </div>
      <main>
        <h2 className="title">Products</h2>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <h4 className="product-name">{product.name}</h4>
              <RatingStars rating={product.rating} />
              <p>{product.description}</p>
              <span className="product-price">${product.price}</span>
              <div className="buttons">
                <button className="btn">Detail</button>
                <button
                  className="btn"
                  onClick={() => addProductToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
