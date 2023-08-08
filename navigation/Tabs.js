import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import Home from "../screens/Home";
import Setting from '../screens/Setting';
import { COLORS } from '../constants';
import { StyleSheet} from 'react-native';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          // headerShown: false,
          tabBarBackground: () => (
            <BlurView tint="dark" intensity={30} style={StyleSheet.absoluteFill} />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.main,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          }
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? `ios-barbell-sharp` : `ios-barbell-outline`} size={size} color={color} />,
          }}
          name="Dashboard"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? `ios-settings-sharp` : `ios-settings-outline`} size={size} color={color} />,
          }}
          name="Settings"
          component={Setting}
        />
      </Tab.Navigator>

    </>
  )
}

export default Tabs