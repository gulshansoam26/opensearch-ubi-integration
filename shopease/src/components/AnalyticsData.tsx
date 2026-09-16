import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MouseIcon from "@mui/icons-material/Mouse";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AskAI from "./AskAI";

interface AnalyticsData {
  search: number;
  view: number;
  click: number;
  filter: number;
}

interface KeywordCount {
  keyword: string;
  count: number;
}

interface ProductClickCount {
  productName: string;
  count: number;
}

interface CategoryFilterCount {
  category: string;
  count: number;
}

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData>({
    search: 0,
    view: 0,
    click: 0,
    filter: 0,
  });

  const [topQueries, setTopQueries] = useState<KeywordCount[]>([]);

  const [topProducts, setTopProducts] = useState<ProductClickCount[]>([]);

  const [topCategories, setTopCategories] = useState<CategoryFilterCount[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get<Record<string, number>>(
          "http://localhost:8080/api/analytics/summary"
        );

        setData({
      search: response.data.search ?? 0,
      view: response.data.view ?? 0,
      click: response.data.click ?? 0,
      filter: response.data.filter ?? 0,
    });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };

    const fetchTopQueries = async () => {
    try {
      const response = await axios.get<KeywordCount[]>(
        "http://localhost:8080/api/analytics/top-queries",
  { params: { size: 5 } }
      );
      setTopQueries(response.data);
    } catch (error) {
      console.error("Failed to fetch top queries:", error);
    }
  };

  const fetchTopProducts = async () => {
  try {
    const response = await axios.get<ProductClickCount[]>(
      "http://localhost:8080/api/analytics/top-clicked-products",
      { params: { size: 5 } }
    );
    setTopProducts(response.data);
  } catch (error) {
    console.error("Failed to fetch top products:", error);
  }
};

const fetchTopCategories = async () => {
  try {
    const response = await axios.get<CategoryFilterCount[]>(
      "http://localhost:8080/api/analytics/top-filtered-categories",
      { params: { size: 5 } }
    );
    setTopCategories(response.data);
  } catch (error) {
    console.error("Failed to fetch top categories:", error);
  }
};

    fetchAnalytics();
    fetchTopQueries();
    fetchTopProducts();
    fetchTopCategories();
  }, []);

  const cards = [
    {
      title: "Searches",
      value: data.search,
      icon: <SearchIcon sx={{ fontSize: 38 }} />,
      description: "Search interactions",
    },
    {
      title: "Views",
      value: data.view,
      icon: <VisibilityIcon sx={{ fontSize: 38 }} />,
      description: "Pages viewed",
    },
    {
      title: "Clicks",
      value: data.click,
      icon: <MouseIcon sx={{ fontSize: 38 }} />,
      description: "User clicks",
    },
    { 
      title: "Filters", 
      value: data.filter, 
      icon: <FilterAltIcon sx={{ fontSize:38 }} />, 
      description: "Category filters applied" 
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#F5F7FA",
        py: 6,
      }}
    >
      <Container maxWidth="lg">

        {/* Heading */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#071A33",
              mb: 1,
            }}
          >
            User Behavior Insights
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#667085",
            }}
          >
            Overview of user interactions collected through UBI.
          </Typography>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #E4E7EC",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>

                  {/* Icon */}
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 2,
                      backgroundColor: "#EAF1FF",
                      color: "#2F75FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {card.icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#667085",
                      fontWeight: 500,
                      mb: 1,
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Number */}
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#071A33",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {card.value}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#98A2B3",
                    }}
                  >
                    {card.description}
                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
<Grid container spacing={4} sx={{ mt: 6 }}>

  {/* Top Searched Keywords */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Typography variant="h5" sx={{ fontWeight: 700, color: "#071A33", mb: 3 }}>
      Top Searched Keywords
    </Typography>
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #E4E7EC", borderRadius: 3, maxWidth: 500 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }}>
              Keyword
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }} align="right">
              Searches
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {topQueries.map((item) => (
            <TableRow key={item.keyword}>
              <TableCell sx={{ color: "#12233F" }}>
                {item.keyword}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#2F75FF" }}>
                {item.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>

  {/* Most Clicked Products */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Typography variant="h5" sx={{ fontWeight: 700, color: "#071A33", mb: 3 }}>
      Most Clicked Products
    </Typography>
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #E4E7EC", borderRadius: 3, maxWidth: 500 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }}>
              Product
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }} align="right">
              Clicks
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {topProducts.map((item) => (
            <TableRow key={item.productName}>
              <TableCell sx={{ color: "#12233F" }}>
                {item.productName}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#2F75FF" }}>
                {item.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>

  <Grid size={{ xs: 12, md: 6 }}>
  <Typography variant="h5" sx={{ fontWeight: 700, color: "#071A33", mb: 3 }}>
    Most Filtered Categories
  </Typography>

  {topCategories.length === 0 ? (
    <Typography sx={{ color: "#98A2B3" }}>
      No category filters recorded yet.
    </Typography>
  ) : (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #E4E7EC", borderRadius: 3, maxWidth: 500 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }}>
              Category
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "#12233F" }} align="right">
              Filters
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {topCategories.map((item) => (
            <TableRow key={item.category}>
              <TableCell sx={{ color: "#12233F" }}>{item.category}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#2F75FF" }}>
                {item.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</Grid>

</Grid>

<AskAI></AskAI>
      </Container>
    </Box>
  );
};

export default AnalyticsDashboard;