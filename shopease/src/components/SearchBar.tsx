import { Box, Button, TextField, Typography } from "@mui/material";
import {  useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({
  onSearch,
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
        sx={{
          fontWeight: 700,
          color: "#12233F",
          mb: 1,
        }}
      >
        Search Products
      </Typography>

      <Typography
        sx={{
          color: "#66758A",
          mb: 4,
        }}
      >
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
          maxWidth: 700,
          mx: "auto",
          px: 2,
        }}
      >
        <TextField
          fullWidth
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for products, books..."
          variant="outlined"
          size="medium"
          sx={{
            backgroundColor: "#fff",

            "& .MuiOutlinedInput-root": {
              borderRadius: "8px 0 0 8px",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            minWidth: 110,
            borderRadius: "0 8px 8px 0",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#2168EE",

            "&:hover": {
              backgroundColor: "#1758D0",
            },
          }}
        >
          Search
        </Button>
      </Box>
      <Button onClick={handleClearSearch}>
  All Products
</Button>
    </Box>
  );
};

export default SearchBar;