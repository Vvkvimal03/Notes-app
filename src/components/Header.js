import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@mui/material";
import {
  Logout as LogoutIcon,
  StickyNote2 as NotesIcon
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Header = ({ title = "My Notes" }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" className="bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg">
      <Toolbar>
        <NotesIcon className="mr-3" />
        <Typography variant="h6" className="flex-grow font-semibold">
          {title}
        </Typography>
        <div className="flex items-center space-x-4">
          <Typography variant="body2" className="hidden sm:block">
            Welcome, {user?.name || user?.email}
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            className="hover:bg-white/20 transition-colors"
          >
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;