import React from "react";
import Swal from "sweetalert2";

const failureAlert = (title, message) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: message,
  });
};

export default failureAlert;
