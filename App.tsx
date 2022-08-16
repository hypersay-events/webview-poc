import * as React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { videoTestHTML } from "./html_fixtures/video-test-html";

const getLink = (slug: string, code: string) =>
  `https://${slug}.hypersay.events?code=${code}`;

const styles = StyleSheet.create({
  area: {
    marginTop: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  goButton: {
    width: 80,
  },
});

enum AppState {
  InputsState = 0,
  WebViewState,
  VideoAutoplay,
}

export default function App() {
  const [state, setState] = React.useState<AppState>(AppState.InputsState);

  const [eventSlug, setEventSlug] = React.useState<string>(
    "architecture-global-event-2022"
  );
  const [ticketCode, setTicketCode] = React.useState<string>("");

  console.log({ eventSlug, ticketCode });

  switch (state) {
    case AppState.InputsState:
      return (
        <SafeAreaView style={styles.area}>
          <TextInput
            style={styles.input}
            onChangeText={setEventSlug}
            value={eventSlug}
          />
          <TextInput
            style={styles.input}
            onChangeText={setTicketCode}
            value={ticketCode}
          />
          <Text></Text>
          <Button
            title="Go"
            disabled={!ticketCode || !eventSlug}
            onPress={() => setState(AppState.WebViewState)}
          />
          <Button
            title="Test Video"
            disabled={!ticketCode || !eventSlug}
            onPress={() => setState(AppState.VideoAutoplay)}
          />
        </SafeAreaView>
      );
    case AppState.WebViewState:
      return (
        <View style={{ flex: 1 }}>
          <WebView
            style={styles.area}
            source={{ uri: getLink(eventSlug, ticketCode) }}
            injectedJavaScript={`
          (()=>{ btn=document.createElement("button"); btn.appendChild(document.createTextNode("Click Me!")); btn.style.position='absolute';btn.style.margin='30px'; btn.onclick = () => window.ReactNativeWebView.postMessage(55); document.body.prepend(btn)})() 
          `}
            onMessage={(event) => {
              Alert.alert("Exit?", undefined, [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Yes", onPress: () => setState(AppState.InputsState) },
              ]);
            }}
          />
        </View>
      );
    case AppState.VideoAutoplay:
      return (
        <View style={{ flex: 1 }}>
          <Button
            title="Go Back"
            onPress={() => setState(AppState.InputsState)}
          />
          <WebView style={styles.area} source={{ html: videoTestHTML() }} />
        </View>
      );
  }
}
