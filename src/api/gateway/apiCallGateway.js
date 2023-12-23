import AuthInstance from "@/api/config/auth";
import CategoryInstance from "@/api/config/category";
import { LOGIN_URL, LOGOUT_URL } from "../urls/authurl";
import {
  GET_ALL_CATEGORY_TREE,
  GET_ALL_CATEGORY,
  CREATE_CATEGORY,
} from "../urls/categoryurl";

const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Origin: "http://localhost:8081",
  },
};

export const ApiCallGateway = {
  login: async (request) => {
    const response = await AuthInstance.post(LOGIN_URL, request, headers);
    return response;
  },
  logout: async () => {
    const response = await AuthInstance.post(LOGOUT_URL, headers);
    return response;
  },

  category: {
    getAllCategoryTree: async () => {
      const response = await CategoryInstance.get(
        GET_ALL_CATEGORY_TREE,
        headers
      );
      return response;
    },
    getAllCategory: async (request) => {
      const response = await CategoryInstance.post(
        GET_ALL_CATEGORY,
        request,
        headers
      );
      return response;
    },

    createCategory: async (request) => {
      const response = await CategoryInstance.post(
        CREATE_CATEGORY,
        request,
        headers
      );
      return response;
    },
  },
};
