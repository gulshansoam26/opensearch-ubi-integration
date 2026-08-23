import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "../types/Product";
import { captureEvent } from "../services/eventTracker";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {

  const handleViewDetails = (product: Product) => {
    captureEvent("click", {
     attributes: {
      object: {
        object_id: product.id,
        object_id_type: "product",
      },
      product_name: product.name,
      category: product.category,
    },
  });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#12233F",
          mb: 3,
        }}
      >
        All Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={product.id}
          >
            <ProductCard
              product={product}
              onViewDetails={handleViewDetails}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;