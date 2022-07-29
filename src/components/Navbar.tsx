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
  Drawer as TempDrawer,
} from "@mui/material/";
import AdbIcon from "@mui/icons-material/Adb";
import { Menu as MenuIcon, ShoppingBag } from "@mui/icons-material/";
import { Link } from "react-router-dom";
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
  const qtyBadge = (cart.products.map( el => el.qty )).reduce( ( t,n ) => t+n,0 )
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

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
                  <Link to="/">HOME</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/store">STORE</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/about">ABOUT</Link>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/">HOME</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/store">STORE</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/about">ABOUT</Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
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
                <Stack direction='row' alignItems='center'>
                <img
                  src={el.imgUrl}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <Box pl={1} sx={{textAlign:'left'}}>
                  <Typography variant='h6'>{el.name} <Typography variant='caption' component='span'>x{el.qty}</Typography></Typography>
                  <Typography variant='subtitle2'>{formatCurrency(el.price)}</Typography>
                </Box>
                </Stack>
                <IconButton onClick={() => dispatch(removeFromCart(el.id))}>
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            );
          })}
          <Typography sx={{
            position:'fixed',bottom:0,marginBottom:'8px'
          }}>
          Total: {formatCurrency(cart.total)}
          </Typography>
        </Box>
      </TempDrawer>
    </>
  );
};
export default ResponsiveAppBar;
