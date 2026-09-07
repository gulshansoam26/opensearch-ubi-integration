import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import AnalyticsDashboard from "./components/AnalyticsData";

import type { Product } from "./types/Product";
import { captureEvent } from "./services/eventTracker";
import axios from "axios";
import { Box } from "@mui/material";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

   const fetchProducts = async (search = "") => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:8080/api/products",
        {
          params: {
            search: search || undefined,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

  const handleSearch = (query: string) => {
    fetchProducts(query);
    if (query.trim()) {
    captureEvent("search", {
      query: query.trim(),
    });
  }
  };


 const viewTracked = useRef(false);

useEffect(() => {
  if (!viewTracked.current) {
    captureEvent("view");
    viewTracked.current = true;
  }
}, []);

  return (
    <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Navbar />

  <SearchBar onSearch={handleSearch} />

  <Box sx={{ flex: 1 }}>
    {products.length > 0 ? (
      <ProductList products={products} />
    ) : (
      <Box sx={{ textAlign: "center", py: 8 }}>
        No products found.
      </Box>
    )}
  </Box>

  <Footer />
</Box>
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