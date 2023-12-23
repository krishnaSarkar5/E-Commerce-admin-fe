"use client";

import React, { useEffect, useState } from "react";
import failureAlert from "../alert/failureAlert";
import Loader from "@/components/Loader/index";
import AppTable from "../table/Table";
import { ApiCallGateway } from "@/api/gateway/apiCallGateway";

const tableConfig = [
  {
    columnName: "Id",
    fieldName: "id",
    columnType: "Long",
    sorting: false,
    searching: false,
    options: [],
  },
  {
    columnName: "Title",
    fieldName: "title",
    columnType: "String",
    sorting: false,
    searching: false,
    options: [],
  },
  {
    columnName: "Parent Id",
    fieldName: "parentCategoryId",
    columnType: "Long",
    sorting: false,
    searching: false,
    options: [],
  },
  {
    columnName: "Parent Title",
    fieldName: "parentCategoryTitle",
    columnType: "String",
    sorting: false,
    searching: false,
    options: [],
  },
];

const CategoryList = () => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const getAllCategoryData = async () => {
    const requestBody = {
      offset: 0,
      pageSize: 20,
      searchCriteriaList: [],
      orderByField: "id",
      orderType: "asc",
    };
    setIsLoading(true);
    const response = await ApiCallGateway.category.getAllCategory(requestBody);
    setIsLoading(false);
    console.log("+-+-+-  ", response);
    if (response.status === 200) {
      setData(response?.data?.data?.categoryResponseDtoList);
    } else {
      failureAlert("Error", "Error fetching get all category");
    }
  };

  useEffect(() => {
    getAllCategoryData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <AppTable data={data} tableConfig={tableConfig} />
  );
};

export default CategoryList;
