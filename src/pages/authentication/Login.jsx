import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log("submitted", values);
    dispatch(loginUserAction(values));
    navigate("/home");
  };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Field
              as={TextField}
              name="email"
              type="email"
              placeholder="Email"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-5">
            <Field
              as={TextField}
              name="password"
              type="password"
              placeholder="Password"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex gap-2 items-center pt-5">
            <p>if you don't have an account?</p>
            <Button onClick={() => navigate("/register")}>REGISTER</Button>
          </div>
          <Button
            sx={{ padding: "0.8rem 0" }}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
