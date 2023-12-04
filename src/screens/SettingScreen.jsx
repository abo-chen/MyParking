import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({ onLogout }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    onLogout();
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const loadSettings = async () => {
      const storedNotificationsEnabled = await AsyncStorage.getItem(
        "notificationsEnabled"
      );
      const storedShowAdvancedOptions = await AsyncStorage.getItem(
        "showAdvancedOptions"
      );
      const storedFontSize = await AsyncStorage.getItem("fontSize");

      setNotificationsEnabled(storedNotificationsEnabled === "true");
      setShowAdvancedOptions(storedShowAdvancedOptions === "true");
      setFontSize(storedFontSize || "medium");
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem(
      "notificationsEnabled",
      String(notificationsEnabled)
    );
    await AsyncStorage.setItem(
      "showAdvancedOptions",
      String(showAdvancedOptions)
    );
    await AsyncStorage.setItem("fontSize", fontSize);

    console.log("Settings saved:", {
      notificationsEnabled,
      showAdvancedOptions,
      fontSize,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Settings</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Show Advanced Options</Text>
          <Switch
            value={showAdvancedOptions}
            onValueChange={() => setShowAdvancedOptions(!showAdvancedOptions)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Font Size</Text>
          <Text style={{ marginLeft: 10, flex: 1, borderWidth: 1, padding: 8 }}>
            {fontSize}
          </Text>
        </View>

        <TouchableOpacity
          onPress={saveSettings}
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#007BFF",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Save Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#FF3B30",
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Logout</Text>
        </TouchableOpacity>
        <Text  style={{ color: 'red' }}>*  Click Logout to clear the local storage save point status.</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingScreen;
