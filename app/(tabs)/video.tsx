
import CONSTANT from "@/constants/constant";
import { useFocusEffect } from "@react-navigation/native";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { memo, useEffect, useRef, useState } from "react";
import { AppState, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const VideoScreen = () => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({} as AVPlaybackStatus);
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const appState = useRef(AppState.currentState);

  const isPlaying = status.isLoaded && status.isPlaying;

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        video.current?.playAsync();
      }, 300);

      return () => {
        video.current?.pauseAsync();
      };
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (appState.current !== nextState) {
        if (nextState === "background" || nextState === "inactive") {
          video.current?.pauseAsync();
        } else if (nextState === "active") {
          video.current?.playAsync();
        }
      }
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  const switchStream = () => {
    const nextIndex = (currentStreamIndex + 1) % CONSTANT.videos.length;
    setCurrentStreamIndex(nextIndex);

    setTimeout(() => {
      if (isPlaying) video.current?.playAsync();
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Video Player</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: CONSTANT.videos[currentStreamIndex].uri }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(s) => setStatus(s)}
      />

      <View style={styles.controls}>
        <Text style={styles.streamName}>
          Now Playing: {CONSTANT.videos[currentStreamIndex].name}
        </Text>

        <View style={styles.buttons}>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={() =>
              isPlaying
                ? video.current?.pauseAsync()
                : video.current?.playAsync()
            }
          />

          <Button title="Switch Stream" onPress={switchStream} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default memo(VideoScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
    borderRadius: 10,
  },
  controls: { marginTop: 20, alignItems: "center" },
  streamName: { fontSize: 16, marginBottom: 10, color: "#333" },
  buttons: { flexDirection: "row", gap: 10 },
});
