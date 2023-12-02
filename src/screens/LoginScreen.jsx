import React, { useState } from "react";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // More complex validation logic can be added here
    await AsyncStorage.setItem("isLoggedIn", "true");
    onLogin();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Text category="h1">Login</Text>
        <Input
          value={username}
          placeholder="Username"
          onChangeText={setUsername}
          style={{ marginVertical: 10 }}
        />
        <Input
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={{ marginVertical: 10 }}
        />
        <Button onPress={handleLogin}>Login</Button>
        <Text>* You can just press Login.</Text>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
