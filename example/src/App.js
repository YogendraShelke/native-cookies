import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import Cookies from "native-cookies";

const uri = "http://bing.com/";

export default function App() {
  Cookies.set(uri, "foo", "bar").then(() => {
    console.log(`set cookie 'foo=bar' for ${uri}`);
  });

  Cookies.get(uri).then((data) => {
    console.log(`get cookie from ${uri}: ${JSON.stringify(data)}`);
  });

  Cookies.clear(uri).then(() => {
    console.log(`clear cookie from ${uri}`);
  });

  Cookies.clearAll().then(() => {
    console.log(`clear all cookies`);
  });

  return <WebView style={styles.container} source={{ uri }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
