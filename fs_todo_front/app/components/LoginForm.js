import React, { useState } from "react";
import { View, Text, Button} from "react-native";
import { object } from "yup";
import client from "../api/client";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import ForgotPassword from "./ForgotPassword";

const LoginForm = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    register: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { fullname, register, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Мэдээлэл оруулаагүй байна!", setError);
    if (!fullname.trim() || fullname.length)
      
    if (!register.trim() || register.length)
      
    if (!password.trim() || password.length < 8)
      return updateError("Нууц үг 8-аас дээш байх", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post("/sign-in", { ...userInfo });
        if (res.data.success) {
          setUserInfo({ fullname: "", register: "", password: "" });
        }
        if(res.data.success){
            alert("Амжилттай нэвтэрсэн");
            navigation.navigate("inventory");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "fullname")}
        value={fullname}
        label="Нэвтрэх нэр"
        title="fullname"
        placeholder="Нэвтрэх нэр орууулах"
        autoCapitalize="none"
      />
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "register")}
        value={register}
        label="Байгууллагын регистр"
        title="register"
        placeholder="Байгууллагын регистр орууулах"
        autoCapitalize="none"
      />
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "password")}
        value={password}
        label="Нууц үг"
        title="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title="Нэвтрэх" />
      <Text style={{ fontSize: 12, textAlign: "center", padding: 15 }}>
          Нууц үг мартсан?{" "}
          <Text
            style={{ color: "darkred", fontWeight: "bold" }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Нууц үг сэргээх
          </Text>
          </Text>
    </FormContainer>
  );
};

export default LoginForm;
