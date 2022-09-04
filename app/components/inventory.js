import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { validateUserProduct, productVlidation } from "../utils/methods";

import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";

const ProductSplit = () => {
  console.log("");
}

const validationSchema = Yup.object({
  productName: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productCode: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productQuantity: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productPrice: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productDate: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productRegister: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),

    productAccount: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),
    productproductOwner: Yup.string()
    .trim()
    .min(3, "Буруу байна!")
    .required("Нэр оруулна уу?"),
});

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [object, setobject] = useState(
    {productField : {
        productName:"",
        productCode:"",
        productQuantity:"",
        productPrice:"",
        productDate:"",
        productRegister:"",
        productAccount:"",
        productOwner:""
      }
    }
  );
  ProductSplit();

  const [text, setText] = useState("QR Уншуулах");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const product = "";
  // cola#1234#10#10000#2022/08/28#123456#210513#naki
  console.log(` ${product}` )
  const name =  (product.split("#").map(s => s.split(/\s+/g).join(","))[0]);

  useEffect(() => {
    askForCameraPermission();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    const name =  (data.split("||").map(s => s.split(/\s+/g).join(","))[0]);
    const code = (data.split("||").map(s => s.split(/\s+/g).join(","))[1])
    const quantity = (data.split("||").map(s => s.split(/\s+/g).join(","))[2])
    const price = (data.split("||").map(s => s.split(/\s+/g).join(","))[3])
    const date = (data.split("||").map(s => s.split(/\s+/g).join(","))[4])
    const register = (data.split("||").map(s => s.split(/\s+/g).join(","))[5])
    const account = (data.split("||").map(s => s.split(/\s+/g).join(","))[6])
    const owner = (data.split("||").map(s => s.split(/\s+/g).join(","))[7])
    const product =  {
      productField : {
        productName:name,
        productCode:code,
        productQuantity:quantity,
        productPrice:price,
        productDate:date,
        productRegister:register,
        productAccount:account,
        productOwner:owner
      }
    }
    console.log(product.productField.productName);
    console.log(product.productField.productCode);
    console.log(product.productField.productQuantity);
    console.log(product.productField.productPrice);
    console.log(product.productField.productDate);
    console.log(product.productField.productRegister);
    console.log(product.productField.productAccount);
    console.log(product.productField.productOwner);
  };

  const Product = async (values, formikActions) => {
    const res = await client.post("/create-product", {
      ...values,
    });

    if (res.data.success) {
      if (productRes.data.success) {
      }
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };


  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View> 
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 700, width: 700 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <Button
          title={"Дахин уншуулах"}
          onPress={() => setScanned(false)}
          color="#B161F9"
        />
      )}
    </View>
  );
  return (
    <FormContainer>
      <Formik
        initialValues={productInfo}
        validationSchema={validationSchema}
        onSubmit={product}
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
          const { productName,
            productCode,
            productQuantity,
            productPrice,
            productDate,
            productRegister,
            productAccount,
            productOwner } = values;
          return (
            <>
              <FormInput
                value={productName}
                error={touched.productName && errors.productName}
              />
              <FormInput
                value={productCode}
                error={touched.productCode && errors.productCode}
              />
              <FormInput
                value={productQuantity}
                error={touched.productQuantity && errors.productQuantity}
              />
              <FormInput
                value={productPrice}
                error={touched.productPrice && errors.productPrice}
              />
              <FormInput
                value={productDate}
                error={touched.productDate && errors.productDate}
              />
              <FormInput
                value={productRegister}
                error={touched.productRegister && errors.productRegister}
              />
              <FormInput
                value={productAccount}
                error={touched.productAccount && errors.productAccount}
              />
              <FormInput
                value={productOwner}
                error={touched.productOwner && errors.productOwner}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 320,
    width: 310,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "black",
  },
  Button: {
    padding: 20,
    width: 170,
  },
});
