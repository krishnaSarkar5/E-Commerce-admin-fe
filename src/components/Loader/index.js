import React from "react";
import { Grid, CircularProgress } from "@mui/material";

const index = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress size="4rem" sx={{ color: "#2463EB" }} />
    </div>
  );
};

export default index;
