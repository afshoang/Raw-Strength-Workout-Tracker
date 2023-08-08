import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from './store';
import { COLORS } from './constants';
import { MainStackNavigator } from './navigation/StackNavigator';
import { ActivityIndicator, View } from 'react-native'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.secondary,
  }
}
// console.log("👌👌👌👌", store.getState());
// export const purgeData = async () => {
//   await persistor.purge();
// };
// purgeData()

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  
  return (
    <Provider store={store}>
      <PersistGate loading={<View>
        <ActivityIndicator size="large" color={COLORS.main} />
      </View>} persistor={persistor}>
        <NavigationContainer theme={theme}>
          <MainStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App
