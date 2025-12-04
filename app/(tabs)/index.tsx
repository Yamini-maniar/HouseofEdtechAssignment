import CONSTANT from "@/constants/constant";
import {
  registerForPushNotifications,
  scheduleNotification,
} from "@/constants/notifications";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <WebView
        source={{ uri: CONSTANT.WEBVIEW_URL }}
        style={styles.webview}
      />
      <View style={styles.floatingContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
          onPress={() =>
            scheduleNotification(
              "Hello House of Edtech",
              "This is your 2s notification.",
              2
            )
          }
        >
          <Text style={styles.buttonText}>Notify in 2s</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.buttonSecondary,
            pressed && { transform: [{ scale: 0.97 }] },
          ]}
          onPress={() =>
            scheduleNotification(
              "Greetings House of Edtech",
              "This is your 5s notification.",
              5
            )
          }
        >
          <Text style={styles.buttonText}>Notify in 5s</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },

  floatingContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    padding: 12,
    backgroundColor: "#ffffffee",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
  },

  buttonSecondary: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  }
});
