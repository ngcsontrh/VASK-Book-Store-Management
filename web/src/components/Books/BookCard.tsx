"use client";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import type { Book } from "~/models/Book.model";
import { useCartStore } from "~/stores/cartStore";

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
  isDisplayAddToCart?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  isDisplayAddToCart,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(book, 1);
    console.log(`Added ${book.title} to cart`);
    onAddToCart?.(book);
  };

  const handleViewDetails = () => {};

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.imageUrl}
        alt={book.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontWeight="bold"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 1,
          }}
        >
          <Rating value={4} precision={0.5} readOnly size="small" />
        </Box>

        <Stack direction="row" spacing={1} mb={1}>
          <Chip
            label={book.category}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={book.stock > 0 ? "Còn hàng" : "Hết hàng"}
            size="small"
            color={book.stock > 0 ? "success" : "error"}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 2,
          }}
        >
          {book.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: 1,
            mt: 1,
          }}
        >
          <Typography variant="h6" color="green" fontWeight="bold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(book.price)}
          </Typography>{" "}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              component={NextLink}
              href={`/books/${book.id}`}
              variant="outlined"
              size="small"
              onClick={handleViewDetails}
              sx={{ textTransform: "none" }}
            >
              Xem chi tiết
            </Button>
            {isDisplayAddToCart && (
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCartIcon />}
                disabled={book.stock <= 0}
                onClick={handleAddToCart}
              >
                Thêm
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
