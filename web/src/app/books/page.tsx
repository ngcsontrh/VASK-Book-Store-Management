"use client";

import { Home } from "@mui/icons-material";
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Pagination,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import { useState } from "react";
import { BookCard } from "~/components/books/BookCard";
import { BookFilter } from "~/components/books/BookFilter";
import { type Book, booksData } from "~/models/Book.model";

export const Metadata = {
  title: "Danh sách sách | VASK Book Store",
  description:
    "Khám phá bộ sưu tập sách đa dạng tại VASK Book Store, nơi bạn có thể tìm thấy những cuốn sách yêu thích nhất.",
};

export default function BooksPage() {
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // Tính toán sách hiển thị trên trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Xử lý khi thay đổi trang
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // Xử lý khi áp dụng bộ lọc
  const handleFilter = (filters: {
    searchTerm?: string;
    category?: string;
  }) => {
    let results = booksData;

    // Lọc theo từ khóa tìm kiếm
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.description.toLowerCase().includes(searchTerm),
      );
    }

    // Lọc theo thể loại
    if (filters.category && filters.category.length > 0) {
      results = results.filter((book) =>
        book.category
          .toLowerCase()
          .includes(filters.category?.toLowerCase() || ""),
      );
    }

    setFilteredBooks(results);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi lọc
  };

  // Xử lý khi thêm sách vào giỏ hàng
  const handleAddToCart = (book: Book) => {
    setIsSnackOpen(true);
    setSnackMessage(`Sách "${book.title}" đã được thêm vào giỏ hàng`);
  };

  // Đóng snackbar
  const handleCloseSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage("");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          borderBottom: "1px solid",
          borderBottomColor: "divider",
          paddingY: 1,
        }}
      >
        <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
          <Box display="flex " alignItems="center">
            <Home fontSize="small" />
          </Box>
          <Box display="flex " alignItems="center">
            <MuiLink
              component={NextLink}
              href="/books"
              underline="hover"
              color="inherit"
            >
              Danh sách sách
            </MuiLink>
          </Box>
        </Breadcrumbs>
      </Box>

      {/* Bộ lọc tìm kiếm */}
      <BookFilter onFilter={handleFilter} />

      {/* Hiển thị số kết quả */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">
          Hiển thị {currentBooks.length} trên {filteredBooks.length} kết quả
        </Typography>
      </Box>

      {/* Grid hiển thị sách */}
      <Box sx={{ mb: 4 }}>
        {currentBooks.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {currentBooks.map((book) => (
              <Box key={book.id}>
                <BookCard
                  book={book}
                  onAddToCart={handleAddToCart}
                  isDisplayAddToCart={true}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ py: 5, width: "100%", textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy sách phù hợp với tiêu chí tìm kiếm
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar thông báo thêm sách vào giỏ hàng */}
      <Snackbar
        open={isSnackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="Sách đã được thêm vào giỏ hàng"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>

      {/* Phân trang */}
      {filteredBooks.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredBooks.length / booksPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
}
