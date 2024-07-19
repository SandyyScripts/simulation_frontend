import { alpha } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MapSection from "./MapSection";

export default function Hero() {
  const [passenger, setPassenger] = useState("");
  const [rides, setRides] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [simulateNow, setSimulateNow] = useState(false);

  const handleChange1 = (event) => {
    const value = event.target.value;
    setPassenger(value);
    if (value < 0 || value > 100) {
      setError1(true);
    } else {
      setError1(false);
    }
  };

  const handleChange2 = (event) => {
    const value = event.target.value;
    setRides(value);
    if (value < 0 || value > 100) {
      setError2(true);
    } else {
      setError2(false);
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(2.5rem, 8vw, 2rem)",
            }}
          >
            Ride Tracking&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(2.5rem, 8vw, 2rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Simulator
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            This project visualizes ride and passenger data on a map, assigns
            passengers to rides , and displays routes using Mapbox and a Django
            backend API.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic-1"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter number of Passengers"
              placeholder="Enter number of Passengers"
              type="number"
              value={passenger}
              onChange={handleChange1}
              error={error1}
              helperText={error1 ? "Value must be between 0 and 100" : ""}
              inputProps={{
                min: 0,
                max: 100,
                autoComplete: "off",
                "aria-label": "Enter number of Passengers",
              }}
            />
            <TextField
              id="outlined-basic-2"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter number of Rides"
              placeholder="Enter number of Rides"
              type="number"
              value={rides}
              onChange={handleChange2}
              error={error2}
              helperText={error2 ? "Value must be between 0 and 100" : ""}
              inputProps={{
                min: 0,
                max: 100,
                autoComplete: "off",
                "aria-label": "Enter number of Rides",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSimulateNow(true)}
            >
              Simulate
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Simulate&quot; N rides will be assigned to M
            passengers&nbsp; .
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: { xs: 200, sm: 700 },
            width: "100%",
            // backgroundImage:
            //   theme.palette.mode === "light"
            //     ? 'url("/static/images/templates/templates-images/hero-light.png")'
            //     : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          <MapSection
            passengers={passenger}
            rides={rides}
            simulateNow={simulateNow}
            setSimulateNow={setSimulateNow}
          />
        </Box>
      </Container>
    </Box>
  );
}
