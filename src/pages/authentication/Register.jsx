import React from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "female",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const dispath = useDispatch();
  const handleSubmit = (values) => {
    console.log("submitted", values);
    dispath(registerUserAction(values));
  };

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Field
              as={TextField}
              name="firstName"
              type="text"
              placeholder="First Name"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="space-y-5">
            <Field
              as={TextField}
              name="lastName"
              type="text"
              placeholder="Last Name"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>
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
            <Field
              name="gender"
              as={RadioGroup}
              aria-labelledby="gender"
              defaultValue="female"
              className="flex"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </Field>
          </div>

          <div className="flex gap-2 items-center pt-5">
            <p>if you alredy have an account?</p>
            <Button onClick={() => navigate("/login")}>LOGIN</Button>
          </div>

          <Button
            sx={{ padding: "0.8rem 0" }}
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
