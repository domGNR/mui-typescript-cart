import { useState, MouseEvent } from "react";
import {
  AppBar,
  Badge,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Stack,
  Link,
  Drawer as TempDrawer,
} from "@mui/material/";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Menu as MenuIcon, ShoppingBag } from "@mui/icons-material/";
import { Link as RouterLink } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import { selectCart, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { removeFromCart } from "../reducers/cart-reducer";
import { formatCurrency } from "../utilities/formatCurrency";

const ResponsiveAppBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const cart = useSelector(selectCart);
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useAppDispatch();
  const qtyBadge = cart.products.map((el) => el.qty).reduce((t, n) => t + n, 0);
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* MOBILE MENU */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                </MenuItem>
                <MenuItem>
                  <Link to="/" component={RouterLink}>
                    STORE
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/about" component={RouterLink}>
                    ABOUT
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <DeliveryDiningIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            {/* MOBILE LOGO */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DELIVERY
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {/* DESKTOP LOGO */}
              <Stack
                direction="row"
                alignItems="center"
                sx={{ display: { xs: "none", md: "flex" }, flex: 1 }}
              >
                <DeliveryDiningIcon sx={{ mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  DELIVERY
                </Typography>
              </Stack>

              {/* DESKTOP MENU */}
              <Box sx={{ flex: 1, justifyContent: "center", display: "flex" }}>
                <Button sx={{ my: 2, color: "red" }}>
                </Button>
                <Button sx={{ my: 2, color: "white" }}>
                  <Link
                    sx={{ color: "#f0f0f0" }}
                    to="/"
                    component={RouterLink}
                  >
                    STORE
                  </Link>
                </Button>
                <Button sx={{ my: 2, color: "white" }}>
                  <Link
                    sx={{ color: "#f0f0f0" }}
                    to="/about"
                    component={RouterLink}
                  >
                    ABOUT
                  </Link>
                </Button>
              </Box>

              {/* CART ICON */}
              <Box
                sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <Tooltip title="Cart">
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    <Badge badgeContent={qtyBadge} color="error">
                      <ShoppingBag color="action" />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>

            {/* CART ICON */}
            <Box sx={{ flexGrow:0, display: { xs: "flex", md: "none" }, }}>
              <Tooltip title="Cart">
                <IconButton sx={{ p: 0 }} onClick={() => setIsDrawerOpen(true)}>
                  <Badge badgeContent={qtyBadge} color="error">
                    <ShoppingBag color="action" />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>

      {/* CART DRAWER */}
      <TempDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width="350px" p={2} textAlign="center" role="presentation">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Cart</Typography>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {cart.products.map((el) => {
            return (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Stack direction="row" alignItems="center">
                  <img
                    src={el.imgUrl}
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <Box pl={1} sx={{ textAlign: "left" }}>
                    <Typography variant="h6">
                      {el.name}{" "}
                      <Typography variant="caption" component="span">
                        x{el.qty}
                      </Typography>
                    </Typography>
                    <Typography variant="subtitle2">
                      {formatCurrency(el.price)}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton onClick={() => dispatch(removeFromCart(el.id))}>
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            );
          })}
          <Typography
            sx={{
              position: "fixed",
              bottom: 0,
              marginBottom: "8px",
            }}
          >
            Total: {formatCurrency(cart.total)}
          </Typography>
        </Box>
      </TempDrawer>
    </>
  );
};
export default ResponsiveAppBar;
