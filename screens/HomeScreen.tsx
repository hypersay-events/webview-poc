import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

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

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const onPress = (key: string, title: string) => {
    switch (key) {
      case "browser-info":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: "https://www.whatsmybrowser.org/",
        });
        break;
      case "video-test":
        navigation.push("VideoTest");
        break;
      case "hypersay-current":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: "https://architecture-global-event-2022.hypersay.events/",
        });
        break;
      case "tunnel":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: "https://tunnel.hypersay.com/",
        });
        break;
      default:
        alert("You pressed: " + key);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "browser-info", label: "Browser Information" },
          { key: "video-test", label: "Video Test Pages" },
          { key: "hypersay-current", label: "Hypersay Current" },
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
