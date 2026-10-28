import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import "./App.css";

import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import Header from "./components/functional/Header";
import ProductForm from "./components/functional/ProductForm";
import ProductList from "./components/functional/ProductList";
import InventoryMetrics from "./components/functional/InventoryMetrics";
import AuditLogger from "./components/class/AuditLogger";

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  // load products from localStorage when app starts
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // last thing that happened, this is sent to AuditLogger
  const [lastAction, setLastAction] = useState(null);

  // save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // update the page title with number of active products
  useEffect(() => {
    const active = products.filter((p) => p.stock > 0).length;
    document.title = "Inventory (" + active + " active products)";
  }, [products]);

  // helper to make a log entry
  function addLog(text) {
    setLastAction({ id: Date.now(), text: text });
  }

  const handleAddProduct = useCallback((product) => {
    setProducts((prev) => [...prev, product]);
    addLog("Product added: " + product.title);
  }, []);

  const handleUpdateStock = useCallback((id, change) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = Math.max(0, p.stock + change);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    addLog("Stock updated for product id " + id + " (" + (change > 0 ? "+1" : "-1") + ")");
  }, []);

  const handleDelete = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addLog("Item deleted (id " + id + ")");
  }, []);

  // filter the products (only runs again when something changes)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryOk = categoryFilter === "All" || p.category === categoryFilter;

      let status = "In Stock";
      if (p.stock === 0) status = "Out of Stock";
      else if (p.stock <= 5) status = "Low Stock";

      const statusOk = statusFilter === "All" || status === statusFilter;
      return categoryOk && statusOk;
    });
  }, [products, categoryFilter, statusFilter]);

  // totals
  const totals = useMemo(() => {
    let totalStock = 0;
    let totalValue = 0;
    let lowStockCount = 0;
    products.forEach((p) => {
      totalStock += p.stock;
      totalValue += p.stock * p.price;
      if (p.stock > 0 && p.stock <= 5) lowStockCount++;
    });
    return { totalStock, totalValue, lowStockCount };
  }, [products]);

  return (
    <div className={"app " + theme}>
      <Header totalProducts={products.length} />

      <InventoryMetrics
        totalProducts={products.length}
        totalStock={totals.totalStock}
        totalValue={totals.totalValue}
        lowStockCount={totals.lowStockCount}
      />

      <ProductForm onAddProduct={handleAddProduct} />

      <ProductList
        products={filteredProducts}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onUpdateStock={handleUpdateStock}
        onDelete={handleDelete}
      />

      <AuditLogger lastAction={lastAction} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
