import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const stackScreenOptions = {
  headerBackTitle: "Back",
  headerShown: false,
};

const screenOptions = {
  tabs: { headerShown: false },
  auth: { headerShown: false },
  modal: { presentation: "modal" as const },
};

const statusBarStyle = "light" as const;
const statusBarBg = "transparent";

function RootLayoutNav() {
  return (
    <>
      <StatusBar style={statusBarStyle} backgroundColor={statusBarBg} translucent />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="(tabs)" options={screenOptions.tabs} />
        <Stack.Screen name="auth/login" options={screenOptions.auth} />
        <Stack.Screen name="auth/signup" options={screenOptions.auth} />
        <Stack.Screen name="cart" options={screenOptions.auth} />
        <Stack.Screen name="checkout" options={screenOptions.auth} />
        <Stack.Screen name="modal" options={screenOptions.modal} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});