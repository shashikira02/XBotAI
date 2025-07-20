import { Box, Select, MenuItem, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function ChatFilter({ allChats, filterChats }) {
  const [option, setOption] = useState("All Ratings");

  const handleChange = useCallback((e) => {
    setOption(e.target.value);
  }, []);

  const filteredResults = useMemo(() => {
    if (option === "All Ratings") {
      return allChats;
    }
    
    return allChats.filter((item) => {
      return item.chat.some((ch) => ch.rating === option);
    });
  }, [option, allChats]);

  useEffect(() => {
    filterChats(filteredResults);
  }, [filteredResults, filterChats]);

  return (
    <Box mb={3}>
      <Typography fontSize={12} mb={0.5}>
        Filter by rating
      </Typography>
      <Select
        value={option}
        onChange={handleChange}
        size="small"
        sx={{
          minWidth: { xs: 1, md: 160 },
        }}
        aria-label="Filter chats by rating"
      >
        <MenuItem value="All Ratings">All Ratings</MenuItem>
        <MenuItem value={1}>1 Star</MenuItem>
        <MenuItem value={2}>2 Stars</MenuItem>
        <MenuItem value={3}>3 Stars</MenuItem>
        <MenuItem value={4}>4 Stars</MenuItem>
        <MenuItem value={5}>5 Stars</MenuItem>
      </Select>
    </Box>
  );
}
