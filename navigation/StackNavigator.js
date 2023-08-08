import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cycle from "../screens/Cycle";
import Exercises from '../screens/Exercises';
import WorkDay from '../screens/WorkDay';

import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Cycle" component={Cycle} />
            <Stack.Screen name='WorkDay' component={WorkDay} />
            <Stack.Screen name='Exercises' component={Exercises} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };