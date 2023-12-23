"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import AppModal from "../modal/AppModal";

import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl, Input, Stack } from "@mui/joy";
import { FormLabel, FormHelperText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { InfoOutlined } from "@mui/icons-material";
import { Checkbox } from "@mui/joy";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { ApiCallGateway } from "@/api/gateway/apiCallGateway";

const CategoryAdd = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setShow(true)}>
        Add Category{" "}
      </Button>

      {show && (
        <AppModal setShow={setShow} show={show} title="Create New Category">
          <CategoryAddForm />
        </AppModal>
      )}
    </>
  );
};

export default CategoryAdd;

const CategoryAddForm = () => {
  const [rootCategory, setRootCategory] = useState(true);

  const [categoryList, setCategoryList] = useState([]);

  const initialValues = {
    title: "",
    parentCategoryId: "",
    searchFields: [],
  };

  const [searchFieldInput, setSearchFieldInput] = useState([
    { field: "", dataType: "" },
  ]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    searchFields: Yup.array()
      .of(
        Yup.object().shape({
          // Define validation rules for each item object if needed
          // Example:
          field: Yup.string().required("field name is required"),
          dataType: Yup.string().required("data type is required"),
          // Add more fields as needed
        })
      )
      .test(
        "at-least-one-item",
        "At least one item is required",
        (value) => value && value.length > 0
      ),
  });

  const onSubmit = (event) => {
    console.log("event ", event);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  console.log("formik ", formik);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("1213");
    formik.handleSubmit(event); // Manually call the formik handleSubmit function
  };

  const getAllCategoryTree = async () => {
    const response = await ApiCallGateway.category.getAllCategoryTree();

    if (response?.status === 200) {
      console.log("+-+- ", response?.data?.data?.categoryResponseDtoList);
      setCategoryList(response?.data?.data?.categoryResponseDtoList);
    }
  };

  useEffect(() => {
    getAllCategoryTree();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl
            className="mt-2"
            error={formik.touched.title && formik.errors.title}
          >
            <FormLabel className="mb-2">Title</FormLabel>
            <Input placeholder="Enter title" />
            {formik.touched.title && formik.errors.title && (
              <FormHelperText sx={{ color: "#c70c0c" }}>
                <InfoOutlined color="#c70c0c" />
                {formik.errors.title}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <Stack direction={"row"} justifyContent={"flex-start"} spacing={4}>
              <FormLabel className="mb-2">Root Category</FormLabel>
              <Checkbox
                color="primary"
                onChange={() => setRootCategory((prev) => !prev)}
                defaultChecked
              />
            </Stack>
          </FormControl>
          <SubCategorySelect disable={rootCategory} data={categoryList} />

          {/* <FormControl className="mt-2"> */}
          <Stack direction={"row"} justifyContent="space-between">
            <FormLabel>Search Field</FormLabel>

            <AddIcon
              sx={{
                cursor: "pointer",
                backgroundColor: "#e3e3e3",
                borderRadius: "5px",
                ":hover": { backgroundColor: "#d6d6d6" },
              }}
              onClick={() => {
                const temp = { field: "", dataType: "" };
                const arr = [...searchFieldInput];
                arr.push(temp);
                setSearchFieldInput(arr);
              }}
            />
          </Stack>

          <Stack spacing={2}>
            {searchFieldInput?.map((item, index) => (
              <Stack direction={"row"} spacing={2}>
                <Input placeholder="Field Name" />
                <Input placeholder="Data Type" />
                {index > 0 && (
                  <DeleteIcon
                    sx={{ color: "maroon", cursor: "pointer" }}
                    onClick={() => {
                      let arr = [...searchFieldInput];
                      arr.splice(index, 1);
                      setSearchFieldInput(arr);
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
          {/* </FormControl> */}
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

const SubCategorySelect = ({ disable, data }) => {
  const [selectItem, setSelectItem] = useState(null);

  useEffect(() => {
    setSelectItem(null);
  }, [data]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose Parent Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          disabled={disable}
          // value={op}
          // label="Parent"
          // defaultValue={10}
          onChange={(e) => setSelectItem(e.target.value)}
        >
          {data &&
            data?.map((item) => (
              <MenuItem value={item}>{item?.title}</MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectItem && selectItem?.childCategories?.length > 0 && (
        <SubCategorySelect
          disable={disable}
          data={selectItem?.childCategories}
        />
      )}
    </>
  );
};
