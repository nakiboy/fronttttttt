import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { isValidObjField, updateError, isValidEmail } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";

import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";
 
const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    register: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Байгууллагын код оруулна уу?"),
   password: Yup.string()
    .trim()
    .min(8, "Нууц үг богино байна!")
    .required("Нууц үг оруулна уу!"),
   confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "Нууц үг таарахгүй байна!"
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    fullname: "",
    register: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { fullname, register, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    if (!fullname.trim() || fullname.length < 3)
      return updateError("Invalid name!", setError);
    if (!register.trim() || register.length < 3)
      return updateError("Invalid register!", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password is less then 8 characters!", setError);
    if (password !== confirmPassword)
      return updateError("Password does not match!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    const res = await client.post("/create-user", {
      ...values,
    });

    if (res.data.success) {
      const signInRes = await client.post("/sign-in", {
        fullname: values.fullname,
        register: values.register,
        password: values.password,
      });
      if (signInRes.data.success) {
        navigation.dispatch(
          StackActions.replace("inventory", {
            token: signInRes.data.token,
          })
        );
      }
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, register, password, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                label="Өөрийн нэр"
                placeholder="Нэр оруулах"
              />
              <FormInput
                value={register}
                error={touched.register && errors.register}
                onChangeText={handleChange("register")}
                onBlur={handleBlur("register")}
                label="Байгууллагын код"
                placeholder="Байгууллагын код оруулах"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Нууц үг"
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Нууц үг давтах"
                placeholder="********"
              />
              <FormSubmitButton
                isSubmitting={isSubmitting}
                onPress={handleSubmit}
                title="Бүртгүүлэх"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
