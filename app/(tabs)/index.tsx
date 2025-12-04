import CONSTANT from "@/constants/constant";
import {
  registerForPushNotifications,
  scheduleNotification,
} from "@/constants/notifications";
import { Colors } from "@/constants/theme";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const onWebViewLoad = () => {
    scheduleNotification("WebView Loaded", "The website has finished loading!");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <WebView
        source={{ uri: CONSTANT.WEBVIEW_URL }}
        style={styles.webview}
        onLoadEnd={onWebViewLoad}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Notify in 2s"
          onPress={() =>
            scheduleNotification(
              "Hello House of Edtech",
              "This is your 2s notification.",
              2
            )
          }
        />
        <Button
          title="Notify in 5s"
          onPress={() =>
            scheduleNotification(
              "Greetings House of Edtech",
              "This is your 5s notification.",
              5
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 40,
    left: 0,
    width: "100%",
    backgroundColor: Colors.light.background,
    borderRadius: 300,
  },
});
