
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import useLogout from "../../hooks/useLogout";

const pages = ["Home", "Operations"];



const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const signout = useLogout() 

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page) => {
    if (page.target.value === "Home") navigate("/user/myaccount");
    if (page.target.value === "Operations") navigate("/user/myaccount/operations");
  };

  const handleNavMenu = (e) => {
    if (e.target.textContent === "Home") navigate("/user/myaccount");
    if (e.target.textContent === "Operations") navigate("/user/myaccount/operations");
  };

  const handleLogout = async() => {
    await signout()
    Cookies.remove('jwt')
    navigate("/")
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Money Tracker
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
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "column"
              }}>
              <MenuItem key="Ho" onClick={handleCloseNavMenu} sx={{flex: 1, margin: "10px"}}>
                <Typography onClick={handleNavMenu} textAlign="center" sx={{flex: 1, margin:"0.5rem"}}>
                  Home
                </Typography>
              </MenuItem>
              <MenuItem key="Op" onClick={handleCloseNavMenu} sx={{flex: 1}}>
                <Typography onClick={handleNavMenu} textAlign="center" sx={{flex: 1, margin:"0.5rem"}}>
                  Operations
                </Typography>
              </MenuItem>
              </Box>
            </Menu>
          </Box>
          <AccountBalanceWalletIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
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
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Money Tracker
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                value={page}
                onClick={(e) => {
                  handleCloseNavMenu(e);
                  handleNavigate(e);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Button variant="contained" startIcon={<LogoutIcon /> } onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "block", md: "none" } }}>
            <IconButton aria-label="logout" style={{ color: "white" }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
