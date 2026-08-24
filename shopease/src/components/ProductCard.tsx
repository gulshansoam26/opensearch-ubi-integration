import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
   position: number;
  onViewDetails: (product: Product,position: number) => void;
}

const ProductCard = ({ product, onViewDetails ,position}: ProductCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid #E5E9EF",
        borderRadius: 2,
        boxShadow: "none",
        transition: "0.2s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="210"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ p: 2.2 }}>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 600,
            color: "#12233F",
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#718096",
            mb: 1.2,
          }}
        >
          {product.category}
        </Typography>

        <Typography
          sx={{
            fontSize: "19px",
            fontWeight: 700,
            color: "#1262ED",
            mb: 2,
          }}
        >
          ₹{product.price.toLocaleString("en-IN")}
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => onViewDetails(product,position)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
            color: "#1764E8",
            borderColor: "#2670F5",

            "&:hover": {
              borderColor: "#1764E8",
              backgroundColor: "#EDF4FF",
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;