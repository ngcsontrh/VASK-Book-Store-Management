"use client";

import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface FilterParams {
  searchTerm?: string;
  category?: string;
}

interface BookFilterProps {
  onFilter: (filters: FilterParams) => void;
}

export const BookFilter: React.FC<BookFilterProps> = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Danh sách các danh mục và màu tương ứng
  const categories = [
    { name: "Tiểu thuyết", color: "#9DBDBA" },
    { name: "Tự truyện", color: "#26599F" },
    { name: "Kỹ năng", color: "#EEA47F" },
    { name: "Kinh doanh", color: "#F8B042" },
    { name: "Khoa học", color: "#00A36C" },
  ];
  const handleSearch = () => {
    onFilter({
      searchTerm,
      category: selectedCategory || "",
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    onFilter({});
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onFilter({ searchTerm });
    } else {
      setSelectedCategory(category);
      onFilter({ searchTerm, category });
    }
  };
  return (
    <Box sx={{ padding: 2, backgroundColor: "white", borderRadius: 1, my: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Bộ lọc sách</Typography>
        <Button variant="outlined" onClick={handleReset}>
          Đặt lại
        </Button>
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm sách..."
          value={searchTerm}
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </Box>
      <Box>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={
              selectedCategory === category.name ? "contained" : "outlined"
            }
            sx={{
              backgroundColor:
                selectedCategory === category.name
                  ? category.color
                  : "transparent",
              color: selectedCategory === category.name ? "#fff" : "inherit",
              marginRight: 1,
              marginBottom: 1,
            }}
            onClick={() => handleCategoryClick(category.name)}
            startIcon={<CategoryIcon />}
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
