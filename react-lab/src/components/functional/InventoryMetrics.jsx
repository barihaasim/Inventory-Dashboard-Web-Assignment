import CardWrapper from "./CardWrapper";

function InventoryMetrics(props) {
  return (
    <CardWrapper title="Inventory Metrics">
      <p>Total Products: {props.totalProducts}</p>
      <p>Total Stock: {props.totalStock} units</p>
      <p>Total Value: ${props.totalValue}</p>
      <p>Low Stock Items: {props.lowStockCount}</p>
    </CardWrapper>
  );
}

export default InventoryMetrics;
