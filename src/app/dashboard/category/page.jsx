"use client";
import AppTable from "@/components/table/Table";
import React, { useEffect, useState } from "react";

import { ApiCallGateway } from "@/api/gateway/apiCallGateway";
import failureAlert from "@/components/alert/failureAlert";
import Loader from "@/components/Loader/index";
import CategoryList from "@/components/category/CategoryList";
import { Stack } from "@mui/joy";

import { Box } from "@mui/joy";
import CategoryAdd from "@/components/category/CategoryAdd";
import { ButtonGroup, Button } from "@mui/material";
import CategoryTree from "@/components/category/CategoryTree";

const page = () => {
  const [refreshData, setRefreshData] = useState(true);
  const [view, setView] = useState("list");

  console.log("+-+ view ", view);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        className="mt-3 ml-3"
        direction={"row"}
        justifyContent={"space-between"}
      >
        <CategoryAdd setRefreshData={setRefreshData} />
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => {
              setView("list");
              setRefreshData(true);
            }}
          >
            List
          </Button>
          <Button onClick={() => setView("tree")}>Tree</Button>
        </ButtonGroup>
      </Stack>
      <Box className="mt-3 ml-3">
        {view === "list" ? (
          <CategoryList
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        ) : (
          <CategoryTree />
        )}
        {/* {view === "tree" ? <h1>tree</h1> : <h1>list</h1>} */}
      </Box>
    </Box>
  );
};

export default page;
