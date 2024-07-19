import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Real-Time Route Calculation",
    description:
      "Utilizes the Mapbox Directions API to calculate and visualize real-time routes from ride locations to passenger sources and from passenger sources to their destinations",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Interactive Map Visualization",
    description:
      "Employs Mapbox GL JS to create an interactive map interface, displaying passenger and ride locations with markers and custom icons",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Responsive and User-Friendly Interface",
    description:
      "Delivers a responsive front-end built with React, providing a user-friendly experience for visualizing and interacting with the simulation data.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "RESTful API Backend",
    description:
      "Implements a RESTful API using Django REST Framework to handle requests and responses for the ride simulation, ensuring robust data management and communication.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Error Handling and Validation",
    description:
      "Includes comprehensive error handling and input validation to ensure the integrity of the data and the robustness of the application.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Reusable Components",
    description:
      "Builds reusable React components for markers and map, promoting code reusability and maintainability.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            This project leverages React, Mapbox GL, and Django REST Framework
            to create an Ride Tracking Simulator. It features real-time
            geolocation, passenger-to-ride matching, custom marker icons,
            efficient state management, and secure API communication.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
