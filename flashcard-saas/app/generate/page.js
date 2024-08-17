"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { writeBatch } from "firebase/firestore";
import { doc, getDoc, collection } from "firebase/firestore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flipped, setFlipped] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const router = useRouter();

  const steps = ["Enter Text", "Generate Flashcards", "Review and Save"];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (tutorialSeen) {
      setShowTutorial(false);
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      setFlashcards(data);
      setActiveStep(1);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveFlashcards = async () => {
    if (!name) {
      setError("Please enter a name for your flashcard set.");
      return;
    }
    setLoading(true);
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          setError("A flashcard set with that name already exists.");
          return;
        } else {
          collections.push(name);
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }

      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      setError("Failed to save flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialSeen", "true");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Generate Flashcards
          <Tooltip title="How to use this page">
            <IconButton onClick={() => setShowTutorial(true)}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ mb: 4 }}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            sx={{ mb: 2 }}
            disabled={loading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ height: 56 }}
            fullWidth
            disabled={loading || text.trim().length === 0}
          >
            {loading ? <CircularProgress size={24} /> : "GENERATE FLASHCARDS"}
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",

                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box
                        sx={{
                          perspective: "1000px",
                          "& > div": {
                            transition: "transform 0.6s",
                            transformStyle: "preserve-3d",
                            position: "relative",
                            width: "100%",
                            height: "250px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                          },
                          "& > div > div": {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 2,
                            boxSizing: "border-box",
                          },
                          "& > div > div:nth-of-type(2)": {
                            transform: "rotateY(180deg)",
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Save Flashcards
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Dialog open={showTutorial} onClose={closeTutorial}>
        <DialogTitle>How to Generate Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            1. Enter your text in the provided area.
            <br />
            2. Click "GENERATE FLASHCARDS" to create flashcards from your text.
            <br />
            3. Review the generated flashcards.
            <br />
            4. Click "Save Flashcards" to save your set.
            <br />
            5. Enter a name for your flashcard set and click "Save".
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTutorial} color="primary">
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
