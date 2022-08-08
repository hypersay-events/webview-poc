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
  InputsState,
  WebViewState,
}

export default function App() {
  const [state, setState] = React.useState<AppState>(AppState.InputsState);

  const [eventSlug, setEventSlug] = React.useState<string>(
    "architecture-global-event-2022"
  );
  const [ticketCode, setTicketCode] = React.useState<string>("");

  console.log({ eventSlug, ticketCode });

  if (state === AppState.InputsState)
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
      </SafeAreaView>
    );

  console.log("URL:", getLink(eventSlug, ticketCode));

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={styles.area}
        source={{ uri: getLink(eventSlug, ticketCode) }}
        injectedJavaScript={`
        (()=>{ btn=document.createElement("button"); btn.appendChild(document.createTextNode("Click Me!")); btn.style.position='absolute';btn.style.margin='30px'; btn.onclick = () => window.ReactNativeWebView.postMessage(55); document.body.prepend(btn)})() 
        `}
        onMessage={(event) => {
          Alert.alert("Exit?", null, [
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
}
