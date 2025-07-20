import {
  TextField,
  Box,
  Button,
  Stack,
  Snackbar,
  
} from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { CHAT_CONFIG, ARIA_LABELS } from "../../config/constants";
import useChatHistory from "../../hooks/useChatHistory ";

export default function ChatInput({
  generateResponse,
  setScroll,
  chat,
  clearChat,
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // const { saveChatHistory } = useChatHistory();

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim()) {
      generateResponse(input);
      setInput("");
      setScroll((prev) => !prev);
    }
  }, [input, generateResponse, setScroll]);

  const handleSave = () => {
    const chat_history = JSON.parse(localStorage.getItem("chat")) || [];
    const date = new Date();
    localStorage.setItem(
      "chat",
      JSON.stringify([{ chat: chat, datetime: date }, ...chat_history])
    );
    clearChat();
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 3 }} pb={{ xs: 1, md: 3 }}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Stack direction={"row"} spacing={{ xs: 0.5, md: 2 }}>
          <TextField
            placeholder="Message Bot AI..." 
            sx={{
              flex: 1,
              bgcolor: "primary.light",
              borderRadius: 1,
              "& input": {
                fontSize: { xs: 12, md: 16 },
                paddingLeft: { xs: 1, md: 2 },
                paddingRight: { xs: 1, md: 2 },
              },
            }}
            value={input}
            onChange={handleInputChange}
            required
            inputRef={inputRef}
            aria-label={ARIA_LABELS.MESSAGE_INPUT}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
            aria-label={ARIA_LABELS.SEND_MESSAGE}
          >
            Ask
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={handleSave}
            disabled={!chat.length > 0}
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
            aria-label={ARIA_LABELS.SAVE_CHAT}
          >
            Save
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={showSnackbar}
        message={"Chat saved."}
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}
        action={
          <Link to="/history">
            <Button size="small">See past conversations</Button>
          </Link>
        }
      />
    </Box>
  );
}
