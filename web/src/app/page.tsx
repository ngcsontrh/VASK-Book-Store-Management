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
import { BookCard } from "../components/Books/BookCard";
import { booksData } from "../models/Book.model";

export default function Page() {
  // Get the first 4 books to display
  const featuredBooks = booksData.slice(0, 4);

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
              <BookCard book={book} />
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
          >
            Xem tất cả sách
          </Button>
        </Box>
      </Box>
    </>
  );
}
