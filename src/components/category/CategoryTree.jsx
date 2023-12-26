import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { ApiCallGateway } from "@/api/gateway/apiCallGateway";

const CategoryTree = () => {
  const [data, setData] = useState({});

  const orgChart = {
    name: "CEO",
    children: [
      {
        name: "Manager",
        attributes: {
          department: "Production",
        },
        children: [
          {
            name: "Foreman",
            attributes: {
              department: "Fabrication",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
          {
            name: "Foreman",
            attributes: {
              department: "Assembly",
            },
            children: [
              {
                name: "Worker",
              },
            ],
          },
        ],
      },
    ],
  };

  const getAllCategoryTree = async () => {
    const response = await ApiCallGateway.category.getAllCategoryTree();

    console.log("++ res ", response?.data?.data?.categoryResponseDtoList);

    let tressStruct = convertToTree(
      response?.data?.data?.categoryResponseDtoList
    );
    setData(tressStruct);

    console.log("++ tree ", tressStruct);
  };
  useEffect(() => {
    getAllCategoryTree();
  }, []);

  return (
    <div style={{ height: "1000px", width: "100%" }}>
      {data && <Tree data={data} orientation="vertical" pathFunc="step" />}
    </div>
  );
};

export default CategoryTree;

function convertToTree(inputData) {
  function convertCategory(category) {
    const convertedCategory = {
      name: category.title,
    };

    if (category.childCategories && category.childCategories.length > 0) {
      convertedCategory.children = category.childCategories.map((child) =>
        convertCategory(child)
      );
    }

    // convertedCategory.attributes = {};

    // let newObject = {};

    // let keys = Object.keys(category);

    // keys.forEach((key) => {
    //   if (key !== "childCategories" && category[key]) {
    //     newObject[key] = category[key];
    //   }
    // });
    // convertedCategory.attributes = newObject;

    return convertedCategory;
  }

  const convertedData = {
    name: "Categories",
    children: [],
  };

  inputData.forEach((category) => {
    convertedData.children.push(convertCategory(category));
  });

  return convertedData;
}
