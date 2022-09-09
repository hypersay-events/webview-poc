import React from "react";
import { Button, View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import WebView from "react-native-webview";

import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "WebView"
>;

interface WebViewScreenParams {
  route: { params: { title: string; uri: string } };
}
export default function WebViewScreen(params: WebViewScreenParams) {
  const uri = params.route.params.uri;
  return (
    <WebView
      source={{
        uri,
      }}
      allowsInlineMediaPlayback
      allowsLinkPreview={false}
      allowsBackForwardNavigationGestures={false}
    />
  );
}
