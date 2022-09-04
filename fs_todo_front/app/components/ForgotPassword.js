import React, { useState } from "react";
import { View, Text, Button} from "react-native";
import { object } from "yup";
import client from "../api/client";
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";

const ForgotPassword = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
  });

  const { email } = userInfo;
  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Мэдээлэл оруулаагүй байна!", setError);
    if (!isValidEmail(email)) return updateError("Имайл оруулна уу!", setError);
    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        const res = await client.post("/forgot-password", { ...userInfo });
        if (res.data.success) {
          setUserInfo({ email: ""});
        }
        if(res.data.success){
          // console.log("Screen soligdono");
            alert("Амжилттай нууц үг солигдлоо");
            navigation.navigate("LoginForm");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30, padding: 50}}>Нууц үг сэргээх</Text>
      <FormInput
        onChangeText={(value) => handleOnChangeText(value, "email")}
        value={email}
        label="Имайл"
        title="Email"
        placeholder="Имайл орууулах"
        autoCapitalize="none"
      />
      <FormSubmitButton onPress={submitForm} title="Send Email" />
    </FormContainer>
  );
};

export default ForgotPassword;
