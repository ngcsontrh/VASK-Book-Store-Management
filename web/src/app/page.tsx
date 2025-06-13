import { Home } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

export default function Page() {
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
          <Home />
          <MuiLink
            component={NextLink}
            href="/"
            underline="hover"
            color="inherit"
          >
            Trang chủ
          </MuiLink>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          bgcolor: "blue",
          height: 200,
          marginY: 3,
        }}
      >
        Giới thiệu cửa hàng khuyến mãi
      </Box>

      <Box
        sx={{
          bgcolor: "gray",
          height: 50,
        }}
      >
        Các loại sách
      </Box>

      <Grid container spacing={4} marginY={3}>
        <Grid size={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
