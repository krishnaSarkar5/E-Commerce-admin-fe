"use client";

import React, { useEffect, useState } from "react";
import failureAlert from "../alert/failureAlert";
import Loader from "@/components/Loader/index";
import AppTable from "../table/Table";
import { ApiCallGateway } from "@/api/gateway/apiCallGateway";
import confirmAlert from "../alert/confirmAlert";

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

  {
    columnName: "Temp",
    fieldName: "parentCategoryTitle",
    columnType: "String",
    sorting: false,
    searching: false,
    options: [],
  },
];

const CategoryList = ({ refreshData, setRefreshData }) => {
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
    if (refreshData) {
      getAllCategoryData();
      setRefreshData(false);
    }
  }, [refreshData]);

  const activeDeleteAction = (category) => {
    console.log("+8+8 ", category);
    return category?.noOfChildCategories === 0;
  };

  const deleteAction = async (category) => {
    const request = {
      id: category?.id,
    };
    const response = await ApiCallGateway.category.deteteCategory(request);
  };

  const confirmAndDelete = async (category) => {
    await confirmAlert(deleteAction, category);

    let newArr = data?.filter((item) => item.id !== category.id);

    let parentCat = newArr.filter(
      (cat) => cat.id === category.parentCategoryId
    );

    console.log("++ parent found ", parentCat);

    if (parentCat && parentCat?.length > 0) {
      console.log("++ inside if parent found ", parentCat);
      let parent = parentCat[0];
      parent.noOfChildCategories =
        parent.noOfChildCategories > 0
          ? parent.noOfChildCategories - 1
          : parent.noOfChildCategories;

      let arr = newArr.filter((cat) => cat.id !== parent.id);
      arr.push(parent);
      console.log("++ inside if parent found ", arr);
      setData(arr);
    } else {
      console.log("++ inside else parent found ", parentCat);
      setData(newArr);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AppTable
      data={data}
      tableConfig={tableConfig}
      activeDeleteAction={activeDeleteAction}
      deleteAction={confirmAndDelete}
    />
  );
};

export default CategoryList;
