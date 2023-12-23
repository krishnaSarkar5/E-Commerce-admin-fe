import React from "react";
import Swal from "sweetalert2";

const successAlert = (title, message) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: message,
  });
};

export default successAlert;
