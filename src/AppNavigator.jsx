import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";
import { ParkingIcon, SettingsIcon } from "./icons";  // Ensure correct path
import ParkingScreen from "./screens/ParkingScreen";  // Ensure correct path
import SettingScreen from "./screens/SettingScreen";  // Ensure correct path

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <SafeAreaView>
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="Parking" icon={ParkingIcon} />
      <BottomNavigationTab title="Setting" icon={SettingsIcon} />
    </BottomNavigation>
  </SafeAreaView>
);

const TabNavigator = ({ onLogout }) => (
  <Navigator
    initialRouteName="Parking"
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen
      name="Parking"
      options={{ headerShown: false }}
      component={ParkingScreen}
    />
    <Screen
      name="Setting"
      options={{ headerShown: false }}
      children={() => <SettingScreen onLogout={onLogout} />}
    />
  </Navigator>
);

const AppNavigator = ({ onLogout }) => <TabNavigator onLogout={onLogout} />;

export default AppNavigator;
