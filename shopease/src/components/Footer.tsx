import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#071A33",
        color: "#D9E2EF",
        py: 3,
        mt: 5,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          align="center"
          sx={{
            fontSize: "14px",
          }}
        >
          © 2026 ShopEase. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;