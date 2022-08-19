import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Picker } from "@react-native-picker/picker";

const uris = [
  "http://media.developer.dolby.com/DolbyVision_Atmos/profile5_HLS/master.m3u8",
  "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8",
  "https://euronews.alteox.app/hls/it_stream.m3u8",
  "https://stream2.xdevel.com/video1s3-7/stream/playlist.m3u8",
  "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8",
  "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
  "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-multiple-subtitles.ism/.m3u8",
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel-rfc5646.ism/.m3u8",
];

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [selectedURI, setSelectedURI] = React.useState(uris[0]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedURI}
        onValueChange={(itemValue) => setSelectedURI(itemValue)}
      >
        {uris.map((uri) => (
          <Picker.Item label={uri} value={uri} key={uri} />
        ))}
      </Picker>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: selectedURI,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video?.current?.pauseAsync()
              : video?.current?.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: "90%",
    height: 400,
    maxHeight: "80%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
