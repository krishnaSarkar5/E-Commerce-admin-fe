"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

import Loader from "@/components/Loader/index";
import { ApiCallGateway } from "@/api/gateway/apiCallGateway";
import { useState } from "react";
import failureAlert from "../alert/failureAlert";
import successAlert from "@/components/alert/sucessAlert";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (value, { resetForm }) => {
    console.log("final object ", value);

    const request = { ...value, channel: "WEB" };

    setLoading(true);

    const response = await ApiCallGateway.login(request);

    console.log("api call end");

    setLoading(false);

    console.log("login response :  ", response);

    if (response?.status !== 200) {
      failureAlert("Login Failed", response?.data);
    } else {
      successAlert("Success", "Welcome Back");
      // localStorage.setItem("token", response?.data?.data);
      setCookie("token", response?.data?.data);
      router.push("/dashboard");
    }

    resetForm();
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    formik.handleSubmit(event); // Manually call the formik handleSubmit function
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="flex justify-center mb-2">
          <h1 className="text-3xl text-blue-500 font-bold">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            placeholder="Email Address"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className=" mt-2 text-red-700 text-sm ">
              {formik.errors.email}
            </span>
          )}
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <span className=" mt-2 text-red-700 text-sm">
              {formik.errors.password}
            </span>
          )}
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-[80px]"
              type="submit"
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
}
