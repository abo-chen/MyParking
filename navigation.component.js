import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Layout, Text } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const LoginIcon = (props) => (
  <Icon {...props} name='log-in-outline' />
);

const ParkingIcon = (props) => (
  <Icon {...props} name='car-outline' />
);

const SettingsIcon = (props) => (
  <Icon {...props} name='settings-outline' />
);

const LoginScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Login</Text>
  </Layout>
);

const ParkingScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Parking</Text>
  </Layout>
);

const SettingScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>Setting</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Login' icon={LoginIcon}/>
    <BottomNavigationTab title='Parking' icon={ParkingIcon}/>
    <BottomNavigationTab title='Setting' icon={SettingsIcon}/>
  </BottomNavigation>
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