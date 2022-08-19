import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import VideoTestScreen from "./screens/VideoTestScreen";
import WebViewScreen from "./screens/WebViewScreen";
import ReactNativeVideoScreen from "./screens/ReactNativeVideoScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  WebView: undefined;
  VideoTest: undefined;
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: "Hypersay WebView Tester" }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="VideoTest"
          options={{ title: "Video Test Pages" }}
          component={VideoTestScreen}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={({ route }) => ({
            title:
              (route?.params as Record<string, string>).title || "Web View",
          })}
        />
        <Stack.Screen
          name="ReactNativeVideo"
          component={ReactNativeVideoScreen}
          options={({ route }) => ({
            title:
              (route?.params as Record<string, string>).title ||
              "React Native Video",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
