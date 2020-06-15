import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Cookies from 'native-cookies';

const url = 'http://bing.com/';

export default function App() {
  Cookies.get(url).then((data) => {
    console.log(`get cookie from ${url}: ${JSON.stringify(data)}`);
  });
  Cookies.set(url, 'foo', 'bar').then(() => {
    console.log(`set cookie 'foo=bar' for ${url}`);
  });

  Cookies.clear(url).then(() => {
    console.log(`clear all cookie from ${url}`);
  });

  return <WebView style={styles.container} source={{ uri: url }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
