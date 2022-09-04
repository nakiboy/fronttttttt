import {
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {
console.log(window);
  const [getDisabled, setDisabled] = useState(false);
  const [getPhotoURL, setPhotoURL] = useState();
  const [getAllChats, setAllChats] = useState([]);
  const [deleteContact, setDeleteContact] = useState(false);
  const [getDarkMode, setDarkMode] = useState(false);
  const DARK_COLOR = "#212121";
  const LIGHT_COLOR = "#fff";
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => {
        return (
          <View
            style={{
              marginLeft: -10,
              width: 300,
              height: 45,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={getDisabled}
              style={{
                width: "15%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Image style={styles.myLogo} source={{ uri: getPhotoURL }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "85%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Credits");
              }}
            >
              <Text
                style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
              ></Text>
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  deleteContact
                    ? setDeleteContact(false)
                    : setDeleteContact(true);
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  getDarkMode ? setDarkMode(false) : setDarkMode(true);
                }}
              >
                {getDarkMode && getDarkMode ? (
                  <Ionicons name="md-moon-sharp" size={24} color="white" />
                ) : (
                  <Ionicons name="sunny-sharp" size={20} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionTouch}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Entypo name="log-out" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </>
        );
      },
    });
  }, [getPhotoURL, getDarkMode]);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getDarkMode ? DARK_COLOR : LIGHT_COLOR },
      ]}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {getAllChats.length <= 0 ? (
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: getDarkMode ? DARK_COLOR : LIGHT_COLOR,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: getDarkMode ? "#00C853" : "#00838F",
                fontWeight: "bold",
              }}
            ></Text>
          </View>
        ) : (
          getAllChats.map((item, index) => {
            return (
              <CustomList
                navigation={navigation}
                key={index}
                index={index}
                title={item[0]}
                photoURL={item[1]}
                LastMessage={item[2]}
                dateTime={item[3]}
                getDarkMode={getDarkMode}
                deleteContact={deleteContact}
                onPressFunctionDelete={onPressFunctionDelete}
              />
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: getDarkMode ? "#00C853" : "#00838F",
          width: 60,
          height: 60,
          borderRadius: 40,
          position: "absolute",
          top: window.height - 160,
          left: window.width - 75,
          justifyContent: "center",
          alignItems: "center",
          animation: "circle",
        }}

        onPress={() => {
          navigation.navigate("NewChat");
        }}
      >
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={20}
          color="white"
          style={{ transform: [{ scaleX: -1 }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myLogo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  optionContainer: {
    left: 20,
    marginRight: 10,
    width: 100,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionTouch: {
    marginRight: 5,
    marginLeft: 5,
    width: 28,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
