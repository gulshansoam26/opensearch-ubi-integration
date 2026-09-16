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
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

   const fetchProducts = async (search = "", category = "") => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:8080/api/products",
        {
          params: {
            search: search || undefined,
            category: category || undefined,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<string[]>(
        "http://localhost:8080/api/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); 

  const handleSearch = (query: string) => {
  setSearchQuery(query);
  fetchProducts(query, selectedCategory);

  if (query.trim()) {
    captureEvent("search", {
      query: query.trim(),
    });
  }
};

const handleCategoryChange = (category: string) => {
  setSelectedCategory(category);
  fetchProducts(searchQuery, category);

  if (category) {
  const position = categories.indexOf(category) + 1;

    captureEvent("filter", {
      attributes: {
        category: category,
        position: {
          ordinal: position,
        },
      },
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

  <SearchBar 
    onSearch={handleSearch}
    categories={categories}
    selectedCategory={selectedCategory}
    onCategoryChange={handleCategoryChange}
    />

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