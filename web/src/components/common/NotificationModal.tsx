"use client";

import { 
  Modal, 
  Box, 
  Typography, 
  IconButton,
  Paper
} from "@mui/material";
import { 
  CheckCircle, 
  Error as ErrorIcon, 
  Warning, 
  Info, 
  Close as CloseIcon
} from "@mui/icons-material";
import { useEffect } from "react";

interface NotificationModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
}

export default function NotificationModal({
  open,
  message,
  onClose,
  severity = "success",
  autoHideDuration = 3000,
}: NotificationModalProps) {
  // Auto hide the notification after the specified duration
  useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  // Icon mapping based on severity
  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircle sx={{ color: "#2e7d32", fontSize: 42 }} />;
      case "error":
        return <ErrorIcon sx={{ color: "#d32f2f", fontSize: 42 }} />;
      case "warning":
        return <Warning sx={{ color: "#ed6c02", fontSize: 42 }} />;
      case "info":
        return <Info sx={{ color: "#0288d1", fontSize: 42 }} />;
      default:
        return <Info sx={{ color: "#0288d1", fontSize: 42 }} />;
    }
  };

  // Background color based on severity (with gray as base)
  const getBgColor = () => {
    switch (severity) {
      case "success":
        return "rgba(237, 247, 237, 0.95)";
      case "error":
        return "rgba(253, 237, 237, 0.95)";
      case "warning":
        return "rgba(255, 244, 229, 0.95)";
      case "info":
        return "rgba(229, 246, 253, 0.95)";
      default:
        return "rgba(229, 246, 253, 0.95)";
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="notification-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "550px", // Increased from 400px
          backgroundColor: getBgColor(),
          borderRadius: 3, // Increased from 2
          p: 4, // Increased padding
          outline: "none", // Remove default focus outline
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ mr: 3, mt: 0.5 }}>{getIcon()}</Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              id="notification-modal-title"
              variant="h6" // Increased from subtitle1
              component="div"
              sx={{ fontWeight: 600, mb: 1 }} // Increased margin bottom
            >
              Thông báo
            </Typography>
            <Typography 
              variant="body1" // Increased from body2
              sx={{ fontSize: '1.1rem', lineHeight: 1.5 }} // Increased font size
            >
              {message}
            </Typography>
          </Box>
          <IconButton
            size="medium" // Increased from small
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 12, // Increased from 8
              top: 12, // Increased from 8
              color: "text.secondary",
            }}
          >
            <CloseIcon fontSize="medium" /> {/* Increased from small */}
          </IconButton>
        </Box>
      </Paper>
    </Modal>
  );
}
