"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import {
  Grid,
  Container,
  Typography,
  CardActionArea,
  CardContent,
  Card,
} from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        console.log("Fetched flashcard sets:", collections);
        setFlashcardSets(collections);
      }
    }
    getFlashcardSets();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  const handleCardClick = (setName) => {
    router.push(`/flashcard?id=${setName}`);
  };

  console.log("Current flashcardSets state:", flashcardSets);

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcardSets.map((set, index) => {
          console.log("Current set in map:", set);
          return (
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
                <CardActionArea onClick={() => handleCardClick(set)}>
                  <CardContent>
                    {/* <Typography variant="h6">{JSON.stringify(set)}</Typography> */}
                    <Typography variant="h6">{set}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
