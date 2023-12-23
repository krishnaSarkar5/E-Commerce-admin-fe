"use client";
import AppTable from "@/components/table/Table";
import React, { useEffect, useState } from "react";

import { ApiCallGateway } from "@/api/gateway/apiCallGateway";
import failureAlert from "@/components/alert/failureAlert";
import Loader from "@/components/Loader/index";
import CategoryList from "@/components/category/CategoryList";

import { Box } from "@mui/joy";
import CategoryAdd from "@/components/category/CategoryAdd";

const page = () => {
  return (
    <div>
      <Box className="mt-3 ml-3">
        <CategoryAdd />
      </Box>
      <Box className="mt-3 ml-3">
        <CategoryList />
      </Box>
    </div>
  );
};

export default page;
