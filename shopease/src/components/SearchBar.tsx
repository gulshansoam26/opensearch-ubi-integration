import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchBar = ({
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
}: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F9FF",
        py: 6,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#12233F", mb: 1 }}
      >
        Search Products
      </Typography>

      <Typography sx={{ color: "#66758A", mb: 4 }}>
        Find the best products that you are looking for
      </Typography>

      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        sx={{
          display: "flex",
          maxWidth: 900,
          mx: "auto",
          px: 2,
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by product name"
          variant="outlined"
          size="medium"
          sx={{
            flex: "1 1 350px",
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          slotProps={{
            input: {
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl sx={{ minWidth: 200, backgroundColor: "#fff" }}>
          <Select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Categories</MenuItem>

            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disabled={!search.trim()}
          sx={{
            minWidth: 110,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#2168EE",
            "&:hover": { backgroundColor: "#1758D0" },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;