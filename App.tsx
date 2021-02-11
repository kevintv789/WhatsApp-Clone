import Amplify from 'aws-amplify'
import Navigation from './navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import config from './src/aws-exports.js'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

Amplify.configure(config)

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
