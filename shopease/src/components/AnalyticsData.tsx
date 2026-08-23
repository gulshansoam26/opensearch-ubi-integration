import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MouseIcon from "@mui/icons-material/Mouse";

interface AnalyticsData {
  search: number;
  view: number;
  click: number;
}

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsData>({
    search: 0,
    view: 0,
    click: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/events/analytics/summary"
        );

        const buckets = response.data.aggregations.actions.buckets;

        const analytics: AnalyticsData = {
          search: 0,
          view: 0,
          click: 0,
        };

        buckets.forEach(
          (bucket: { key: string; doc_count: number }) => {
            if (bucket.key === "search") {
              analytics.search = bucket.doc_count;
            }

            if (bucket.key === "view") {
              analytics.view = bucket.doc_count;
            }

            if (bucket.key === "click") {
              analytics.click = bucket.doc_count;
            }
          }
        );

        setData(analytics);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };

    fetchAnalytics();
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

      </Container>
    </Box>
  );
};

export default AnalyticsDashboard;