import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Cookies from 'native-cookies';

const uri = 'http://bing.com/';

export default function App() {
  Cookies.get(uri).then((data) => {
    console.log(`get cookie from ${uri}: ${JSON.stringify(data)}`);
  });
  Cookies.set(uri, 'foo', 'bar').then(() => {
    console.log(`set cookie 'foo=bar' for ${uri}`);
  });
  Cookies.clear(uri).then(() => {
    console.log(`clear all cookie from ${uri}`);
  });

  return <WebView style={styles.container} source={{ uri }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
