import { memo } from "react";
import CardWrapper from "./CardWrapper";

// works out the stock status text
function getStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  } else if (stock <= 5) {
    return "Low Stock";
  } else {
    return "In Stock";
  }
}

function ProductCard(props) {
  const p = props.product;
  const status = getStatus(p.stock);

  return (
    <CardWrapper>
      <h4>{p.title}</h4>
      <p>Category: {p.category}</p>
      <p>Price: ${p.price}</p>
      <p>Stock: {p.stock}</p>

      {/* status badge using && */}
      {status === "In Stock" && <span className="badge green">In Stock</span>}
      {status === "Low Stock" && <span className="badge orange">Low Stock</span>}
      {status === "Out of Stock" && <span className="badge red">Out of Stock</span>}

      <div>
        <button onClick={() => props.onUpdateStock(p.id, 1)}>+ Stock</button>
        <button onClick={() => props.onUpdateStock(p.id, -1)}>- Stock</button>
        <button onClick={() => props.onDelete(p.id)}>Delete</button>
      </div>
    </CardWrapper>
  );
}

// memo stops the card re-rendering if its props did not change
export default memo(ProductCard);
