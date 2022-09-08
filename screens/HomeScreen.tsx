import React, { useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flexGrow: 1,
  },
});

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const [ticketCode, setTicketCode] = React.useState("");

  React.useEffect(() => {
    try {
      AsyncStorage.getItem("@ticket_code").then((tc) =>
        setTicketCode(tc || "")
      );
    } catch (e) {
      console.error("Error reading value", e);
    }
  }, []);

  function onTicketCodeChange(text: string) {
    try {
      AsyncStorage.setItem("@ticket_code", text.toUpperCase()).then(() =>
        setTicketCode(text.toUpperCase())
      );
    } catch (e) {
      console.error("Error setting value", e);
    }
  }

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
      case "tunnel-vercel":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: `https://hse-homepage-git-lush-hypersay-events.vercel.app/lush/mid-journey-is-awesome?code=${ticketCode}`,
        });
        break;
      case "tunnel-paul":
        // @ts-ignore
        navigation.push("WebView", {
          title,
          uri: `https://paulbalogh-hs-lush.tunnel.hypersay.com/ro/my-first-lush-event?code=${ticketCode}`,
        });
        break;
      default:
        alert("You pressed: " + key);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Your ticket code"
          onChangeText={onTicketCodeChange}
          value={ticketCode}
        />
      </View>
      <FlatList
        data={[
          { key: "browser-info", label: "Browser Information" },
          { key: "video-test", label: "Video Test Pages" },
          { key: "hypersay-current", label: "Hypersay Current" },
          { key: "tunnel-vercel", label: "Tunnel Vercel" },
          { key: "tunnel-paul", label: "Tunnel Paul" },
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
