import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({ onLogout }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    onLogout();
  };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <Text category="h1">Setting</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Layout>
  );
};

export default SettingScreen;
