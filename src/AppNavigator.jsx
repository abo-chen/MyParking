import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { SafeAreaView  } from 'react-native';
import { LoginIcon, ParkingIcon, SettingsIcon } from './icons';
import LoginScreen from './screens/LoginScreen';
import ParkingScreen from './screens/ParkingScreen';
import SettingScreen from './screens/SettingScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <SafeAreaView>
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Login' icon={LoginIcon}/>
    <BottomNavigationTab title='Parking' icon={ParkingIcon}/>
    <BottomNavigationTab title='Setting' icon={SettingsIcon}/>
  </BottomNavigation>
  </SafeAreaView>
);

const TabNavigator = () => (
  <Navigator initialRouteName="Parking" tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Login' options={{ headerShown: false }} component={LoginScreen}/>
    <Screen name='Parking' options={{ headerShown: false }} component={ParkingScreen}/>
    <Screen name='Setting' options={{ headerShown: false }} component={SettingScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);
