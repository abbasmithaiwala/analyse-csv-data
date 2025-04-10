import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  Grid,
} from "@mui/material";
import { FileUpload, TableChart, AutoGraph } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FeatureIcon = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  borderRadius: "50%",
  padding: theme.spacing(2),
  display: "inline-flex",
  marginBottom: theme.spacing(2),
}));

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", textAlign: "left" }}
          >
            DynamicCSV Viewer
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={4} alignItems="center" sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 4, textAlign: "left" }}
            >
              Transform CSV to
              <Box component="span" sx={{ color: "#FE6B8B" }}>
                {" "}
                Dynamic Tables
              </Box>
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, textAlign: "left" }}>
              Upload any CSV file and instantly view it as a beautifully
              formatted, interactive table.
            </Typography>
            <Link to="/upload">
              <Button
                variant="contained"
                size="large"
                sx={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                  px: 4,
                  py: 2,
                  fontSize: "1.2rem"
                }}
              >
                Try It Now
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <Box
              component="img"
              alt="DynamicCSV Viewer"
              src="https://res.cloudinary.com/dyvpwgeza/image/upload/v1726293604/qnfgj9l5uzs64htj9ssq.png"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "1000px",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>

        <Grid
          direction={"row"}
          container
          spacing={isMobile ? 4 : 8}
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              icon: FileUpload,
              title: "Easy CSV Upload",
              desc: "Simply drag and drop or select your CSV file to get started.",
            },
            {
              icon: TableChart,
              title: "Dynamic Table Generation",
              desc: "Automatically creates interactive tables from your CSV data.",
            },
            {
              icon: AutoGraph,
              title: "Flexible Data Handling",
              desc: "Works with various CSV structures and data types.",
            },
          ].map((feature) => (
            <Grid item key={feature.title}>
              <Box sx={{ textAlign: "center" }}>
                <FeatureIcon>
                  <feature.icon sx={{ fontSize: 40, color: "white" }} />
                </FeatureIcon>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ maxWidth: isMobile ? "100%" : "330px" }}
                >
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 