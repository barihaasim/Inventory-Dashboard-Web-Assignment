import { useState, useRef, useEffect } from "react";
import CardWrapper from "./CardWrapper";

function ProductForm(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // ref for the title input so we can focus it
  const titleRef = useRef(null);

  // focus the title input when the form first shows
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || price === "" || stock === "") {
      alert("Please fill all the fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: title,
      category: category,
      price: Number(price),
      stock: Number(stock),
    };

    // send the product up to App using the callback prop
    props.onAddProduct(newProduct);

    // clear the form
    setTitle("");
    setPrice("");
    setStock("");

    // move focus back to the title input
    titleRef.current.focus();
  }

  return (
    <CardWrapper title="Add New Product">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Home</option>
          </select>
        </div>

        <div>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Stock: </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </CardWrapper>
  );
}

export default ProductForm;
