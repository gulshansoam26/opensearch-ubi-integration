import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#071A33",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ minHeight: "70px !important" }}>

          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ShoppingCartOutlinedIcon
              sx={{
                color: "#2F75FF",
                fontSize: 28,
              }}
            />

            <Typography
              sx={{
                color: "white",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              Shop
              <Box
                component="span"
                sx={{
                  color: "#2F75FF",
                }}
              >
                Ease
              </Box>
            </Typography>
          </Box>

          {/* Navigation */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              ml: 6,
            }}
          >
            <Typography
              component={Link}
              to="/"
              sx={{
                color: "#2F75FF",
                cursor: "pointer",
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Home
            </Typography>

            <Typography
              sx={{
                color: "#D9E2EF",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Products
            </Typography>

            <Typography
              sx={{
                color: "#D9E2EF",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              About
            </Typography>

            {/* Insights */}
            <Typography
              component={Link}
              to="/insights"
              sx={{
                color: "#D9E2EF",
                cursor: "pointer",
                fontSize: "15px",
                textDecoration: "none",
                "&:hover": {
                  color: "#2F75FF",
                },
              }}
            >
              Insights
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;