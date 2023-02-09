import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
const Setting = () => {
  return (
    <ScrollView style={styles.container}>
      <Button
        title="open"
        onPress={() => {
          WebBrowser.openBrowserAsync("https://www.google.com/");
        }}
      />
      <Text>This is setting view</Text>
    </ScrollView>
  );
};
export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
