"use client";
import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShareIcon from "@mui/icons-material/Share";
import SpeedIcon from "@mui/icons-material/Speed";

import getStripe from "../utils/get-stripe";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create Flashcard from your text" />
      </Head>
      <AppBar position="static" width="100%">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Sign In
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          textAlign: "center",
          my: 8,
          position: "relative",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Master Any Subject with Flashcards
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Create, study, and share flashcards effortlessly
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 4 }}
          href="/flashcards"
        >
          View Demo
        </Button>
      </Box>
      <Box sx={{ my: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 4 }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <AutoStoriesIcon />,
              title: "Easy to Use",
              description: "Just paste your text and click generate.",
            },
            {
              icon: <CloudUploadIcon />,
              title: "Export to Anki",
              description:
                "Download your flashcards as a CSV file to import into Anki.",
            },
            {
              icon: <ShareIcon />,
              title: "Share with Friends",
              description: "Share your flashcards with friends or classmates.",
            },
            {
              icon: <SpeedIcon />,
              title: "Fast Generation",
              description:
                "Generate flashcards in seconds using AI technology.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  {React.cloneElement(feature.icon, {
                    fontSize: "large",
                    color: "primary",
                    sx: { mb: 2 },
                  })}
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 4 }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Free",
              price: "$0/month",
              features: [
                "100 flashcards/month",
                "Basic support",
                "Export to CSV",
              ],
            },
            {
              title: "Pro",
              price: "$5/month",
              features: [
                "Unlimited flashcards",
                "Priority support",
                "Export to CSV & Anki",
                "Collaboration features",
              ],
              highlighted: true,
            },
            {
              title: "Team",
              price: "$15/month",
              features: [
                "Everything in Pro",
                "Team management",
                "Analytics",
                "API access",
              ],
            },
          ].map((plan, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  ...(plan.highlighted && {
                    border: "2px solid",
                    borderColor: "primary.main",
                  }),
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Typography variant="h4" component="div" gutterBottom>
                    {plan.price}
                  </Typography>
                  {plan.features.map((feature, fIndex) => (
                    <Typography key={fIndex} variant="body2" sx={{ mb: 1 }}>
                      {feature}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    variant={plan.highlighted ? "contained" : "outlined"}
                    color="primary"
                  >
                    Choose Plan
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: 4 }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              name: "Alex Johnson",
              role: "Student",
              quote:
                "Flashcard SaaS has revolutionized my study routine. I've improved my grades significantly!",
            },
            {
              name: "Sarah Lee",
              role: "Teacher",
              quote:
                "As an educator, I find this tool invaluable for creating engaging study materials for my students.",
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    "{testimonial.quote}"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to boost your learning?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          href="/sign-up"
        >
          Get Started Now
        </Button>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ mt: 8, py: 4, borderTop: 1, borderColor: "divider" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Flashcard SaaS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Empowering learning through smart flashcards.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <Button color="inherit" href="/about">
                About
              </Button>
              <Button color="inherit" href="/contact">
                Contact
              </Button>
              <Button color="inherit" href="/privacy">
                Privacy Policy
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            {/* Add social media icons here */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
