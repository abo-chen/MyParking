import React from 'react';
import { Layout } from '@ui-kitten/components';
import MapView from 'react-native-maps';
import { Platform } from 'react-native';

const ParkingScreen = () => (
  <Layout style={{ flex: 1 }}>
    <MapView 
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 51.0447,
        longitude: -114.0719,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={Platform.OS === 'ios' ? MapView.PROVIDER_GOOGLE : null}
    />
  </Layout>
);

export default ParkingScreen;