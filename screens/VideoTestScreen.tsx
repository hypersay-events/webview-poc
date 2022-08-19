import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VideoTest"
>;

function getUri(key: string): string {
  return `https://ir7eh6.csb.app/${key}.html`;
}

function VideoTestScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const onPress = (key: string, title: string) => {
    switch (key) {
      case "vanilla":
      case "vanilla-config":
      case "videojs":
      case "videojs-nomux":
      case "muxplayer":
      case "standard-latency":
      case "low-latency":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: getUri(key),
        });
        break;
      default:
        // @ts-ignore
        navigation.push("ReactNativeVideo", {
          title,
          uri: getUri(key),
        });
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "vanilla", label: "HTML Video Element - no config" },
          { key: "vanilla-config", label: "HTML Video Element - some config" },
          { key: "videojs-nomux", label: "VideoJS Vanilla Player" },
          { key: "videojs", label: "VideoJS MUX Player" },
          { key: "muxplayer", label: "Mux Player" },
          { key: "standard-latency", label: "Mux Standard Latency" },
          { key: "low-latency", label: "Mux Low Latency" },
          { key: "react-native-video", label: "React Native Video Element" },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item.key, item.label)}>
            <Text style={styles.item} key={item.key}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default VideoTestScreen;
