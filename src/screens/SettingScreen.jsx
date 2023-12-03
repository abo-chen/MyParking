import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button, Switch } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const SettingScreen = () => {
  const [username, setUsername] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedNotificationsEnabled = await AsyncStorage.getItem('notificationsEnabled');

      setUsername(storedUsername || '');
      setNotificationsEnabled(storedNotificationsEnabled === 'true');
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('notificationsEnabled', String(notificationsEnabled));

    console.log('Settings saved:', { username, notificationsEnabled });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}
      >
        <Text category="h1">Settings</Text>

        <Input
          value={username}
          placeholder="Enter your username"
          onChangeText={setUsername}
          style={{ marginVertical: 10 }}
        />

        <Layout style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text category="label">Enable Notifications:</Text>
          <Switch
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </Layout>

        <Button onPress={saveSettings}>Save Settings</Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

export default SettingScreen;
