import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from 'src/navigator';
import store from 'src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
