import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import AnalyticsDashboard from "./components/AnalyticsData";

import { products } from "./data/products";
import { captureEvent } from "./services/eventTracker";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    captureEvent("search", {
      query: query,
    });
  };

  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

 const viewTracked = useRef(false);

useEffect(() => {
  if (!viewTracked.current) {
    captureEvent("view");
    viewTracked.current = true;
  }
}, []);

  return (
    <>
      <Navbar />

      <SearchBar onSearch={handleSearch} />

      <ProductList products={filteredProducts} />

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/insights"
          element={<AnalyticsDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;