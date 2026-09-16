import { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post<string>(
        "http://localhost:8080/api/insights/ask",
        { question: question.trim() }
      );
      setAnswer(response.data);
    } catch (error) {
      console.error("Failed to get AI answer:", error);
      setAnswer("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#071A33", mb: 3 }}>
        Ask AI About Your Insights
      </Typography>

      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          handleAsk();
        }}
        sx={{ display: "flex", gap: 1, maxWidth: 700 }}
      >
        <TextField
          fullWidth
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="e.g. what's trending this week?"
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={!question.trim() || loading}
          sx={{ minWidth: 100, textTransform: "none", fontWeight: 600 }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Ask"}
        </Button>
      </Box>

      {answer && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            maxWidth: 700,
            backgroundColor: "#F5F9FF",
            borderRadius: 2,
            border: "1px solid #E4E7EC",
          }}
        >
          <Typography sx={{ color: "#12233F", whiteSpace: "pre-line" }}>
            {answer}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AskAI;