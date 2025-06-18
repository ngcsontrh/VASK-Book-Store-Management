"use client";

import { Home } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { BookCard } from "../components/books/BookCard";
import NotificationModal from "../components/common/NotificationModal";
import { booksData } from "../models/Book.model";
import type { Book } from "../models/Book.model";

export default function Page() {
  // Get the first 4 books to display
  const featuredBooks = booksData.slice(0, 4);
  
  // State for notification
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  // Handle adding a book to cart
  const handleAddToCart = (book: Book) => {
    setNotificationMessage(`Sách "${book.title}" đã được thêm vào giỏ hàng`);
    setIsNotificationOpen(true);
  };
  
  // Handle closing the notification
  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <>
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
              href="/"
              underline="hover"
              color="inherit"
            >
              Trang chủ
            </MuiLink>
          </Box>
        </Breadcrumbs>
      </Box>

      {/* hero section image */}
      <Box
        sx={{
          height: 300,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          my: 3,
        }}
      >
        <NextImage
          src="/static/images/hero.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography
          variant="h6"
          component="h2"
          fontWeight="bold"
          gutterBottom
          bgcolor="white"
          p={1}
          borderRadius={2}
        >
          Sách Nổi Bật
        </Typography>

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
          {featuredBooks.map((book) => (
            <Box key={book.id}>
              <BookCard 
                book={book} 
                onAddToCart={handleAddToCart}
                isDisplayAddToCart={true}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            component={NextLink}
            href="/books"
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1,
              fontSize: '1.1rem',
              fontWeight: 500
            }}
          >
            Xem tất cả sách
          </Button>
        </Box>
      </Box>
      
      {/* Notification Modal for cart additions */}
      <NotificationModal
        open={isNotificationOpen}
        message={notificationMessage}
        onClose={handleCloseNotification}
        severity="success"
      />
    </>
  );
}
