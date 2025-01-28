// SnackbarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar as MUISnackbar, Alert, SnackbarCloseReason } from "@mui/material";

type SnackbarContextType = {
  showSnackbar: (message: string, severity: "success" | "error" | "info" | "warning") => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("info");

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <MUISnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert icon={false} onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MUISnackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
