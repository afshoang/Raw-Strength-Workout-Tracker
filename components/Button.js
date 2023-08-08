import { COLORS, SIZES } from "../constants";
import { Text, Pressable } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

export const ButtonLink = ({ textBtn, handlePress, ...props }) => {
    return (
        <Pressable onPress={handlePress}>
            <Text style={{
                color: COLORS.main,
                fontSize: SIZES.medium,
                ...props
            }}>{textBtn}</Text>
        </Pressable>
    )
}

export const BackButton = ({ handlePress }) => {
    return (
        <Pressable onPress={handlePress}>
            <MaterialIcons name="arrow-back-ios" size={24} color={COLORS.blue} />
        </Pressable>
    )
}