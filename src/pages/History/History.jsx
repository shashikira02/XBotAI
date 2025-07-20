import {
  Typography,
  Box,
  Stack,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChatHistoryCard from "../../components/ChatHistoryCard/ChatHistoryCard";
import ChatFilter from '../../components/ChatFilter/ChatFilter'
import Navbar from "../../components/Navbar/Navbar";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function History() {
  const [chats] = useLocalStorage('chat', []);
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <Box
      height={"100vh"}
      overflow={"hidden"}
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(151, 133, 186,0.4)",
          borderRadius: "8px",
        },
      }}
    >
      <Navbar />

      <Box p={{ xs: 2, md: 3 }}>
        <div>
          <Typography variant="h1" fontSize={{ xs: 20, md: 28 }} fontWeight={700}>
            Past Conversations
          </Typography>
        </div>

        {chats.length > 0 && (
          <ChatFilter allChats={chats} filterChats={setFilteredChats} />
        )}

        {chats.length == 0 && (
          <Typography
            textAlign={"center"}
            p={3}
            bgcolor={"primary.light"}
            borderRadius={2}
          >
            No saved chats.
          </Typography>
        )}

        {chats.length > 0 && filteredChats.length == 0 && (
          <Typography
            textAlign={"center"}
            p={3}
            bgcolor={"primary.light"}
            borderRadius={2}
          >
            No such chats.
          </Typography>
        )}

        {filteredChats.length > 0 && (
          <Stack
            spacing={4}
            divider={
              <Divider sx={{ borderColor: "primary.bg", opacity: 0.4 }} />
            }
          >
            {filteredChats.map((item, index) => (
              <ChatHistoryCard details={item} key={index} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
