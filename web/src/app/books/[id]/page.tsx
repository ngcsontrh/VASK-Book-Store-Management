"use client";

import { Home } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { booksData } from "~/models/Book.model";
import { useCartStore } from "~/stores/cartStore";
import NotificationModal from "~/components/common/NotificationModal";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const bookId = params.id as string;

  // Tìm thông tin sách dựa trên id
  const book = booksData.find((book) => book.id === bookId);

  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // Xử lý khi không tìm thấy sách
  if (!book) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Không tìm thấy sách</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/books")}
          sx={{ mt: 2 }}
        >
          Quay lại danh sách sách
        </Button>
      </Container>
    );
  }

  // Xử lý thêm sách vào giỏ hàng
  const handleAddToCart = () => {
    addToCart(book, 1);
    setIsSnackOpen(true);
    setSnackMessage(`Sách "${book.title}" đã được thêm vào giỏ hàng`);
  };

  // Xử lý đóng thông báo
  const handleCloseSnack = () => {
    setIsSnackOpen(false);
    setSnackMessage("");
  };

  // Xử lý quay lại
  const handleBack = () => {
    router.back();
  };

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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
          mb: 3,
        }}
      >
        <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
          <MuiLink
            component={NextLink}
            href="/"
            underline="hover"
            color="inherit"
            display="flex"
            alignItems="center"
          >
            <Home fontSize="small" sx={{ mr: 0.5 }} />
            Trang chủ
          </MuiLink>
          <MuiLink
            component={NextLink}
            href="/books"
            underline="hover"
            color="inherit"
          >
            Danh sách sách
          </MuiLink>
          <Typography color="text.primary">{book.title}</Typography>
        </Breadcrumbs>
      </Box>

      {/* Chi tiết sách */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Hình ảnh sách */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 33%" } }}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
              sx={{
                height: { xs: 300, md: 400 },
                objectFit: "cover",
              }}
            />
          </Card>
        </Box>

        {/* Thông tin sách */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 66%" } }}>
          <Box sx={{ height: "100%" }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {book.title}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Tác giả: {book.author}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
              <Rating value={4} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                (4.0/5.0)
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, my: 2 }}>
              <Chip
                label={book.category}
                color="primary"
                variant="outlined"
                size="medium"
              />
              <Chip
                label={book.stock > 0 ? `Còn hàng (${book.stock})` : "Hết hàng"}
                color={book.stock > 0 ? "success" : "error"}
                size="medium"
              />
            </Box>

            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              sx={{ my: 2 }}
            >
              {formatPrice(book.price)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Mô tả:</Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {book.description}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Nhà xuất bản:</strong> {book.publisher}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Ngày xuất bản:</strong> {book.publishedDate}
            </Typography>
            <Typography variant="subtitle1">
              <strong>ISBN:</strong> {book.isbn}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={book.stock <= 0}
                sx={{ paddingX: 4 }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ paddingX: 4 }}
              >
                Quay trở lại
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal thông báo thêm sách vào giỏ hàng */}
      <NotificationModal
        open={isSnackOpen}
        message={snackMessage}
        onClose={handleCloseSnack}
        severity="success"
      />
    </Container>
  );
}
