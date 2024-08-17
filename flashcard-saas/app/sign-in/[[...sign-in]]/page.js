import React from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Container
      maxWidth="sm"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"

      // sx={{ textAlign: "center", my: 4 }}
    >
      {/* <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/login" passHref>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar> */}
      <Box
        sx={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <SignIn />
      </Box>
    </Container>
  );
}
