import ProductCard from "./ProductCard";

function ProductList(props) {
  return (
    <div>
      <h3>Products</h3>

      {/* filters */}
      <div>
        <label>Category: </label>
        <select
          value={props.categoryFilter}
          onChange={(e) => props.setCategoryFilter(e.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
          <option>Home</option>
        </select>

        <label> Stock Status: </label>
        <select
          value={props.statusFilter}
          onChange={(e) => props.setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* ternary for empty state */}
      {props.products.length === 0 ? (
        <p>No products found. Add some products!</p>
      ) : (
        props.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateStock={props.onUpdateStock}
            onDelete={props.onDelete}
          />
        ))
      )}
    </div>
  );
}

export default ProductList;
