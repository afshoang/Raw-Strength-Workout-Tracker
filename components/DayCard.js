import { useNavigation } from '@react-navigation/native'
import { View, Text, Pressable } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, NameExercise } from '../constants';
import tw from '../lib/tailwind';

const DayCard = ({ day, trainningMax }) => {
  const navigation = useNavigation()
  function roundInt(value, toNearest) {
    return Math.round(value / toNearest) * toNearest;
  }
  const weightPercen = {
    0: 0.85,
    1: 0.9,
    2: 0.95
  }
  const weight = roundInt(trainningMax * weightPercen[day.week], 2.5)

  return (
      <View 
        style={tw`w-full bg-primary rounded-lg px-5 py-2 mb-2`}
      >
        <Pressable
          onPress={() => navigation.navigate("WorkDay", { id: day.id })}
          style={tw`flex flex-row justify-between`}
        >
          <View 
            style={tw`flex flex-row`}
          >
            <View 
              style={tw`flex justify-center ml-2`}
            >
              {
                day.timeWorkOut !== null
                ?
                <MaterialIcons name="done" size={24} color={COLORS.main} />
                :
                <Ionicons name="ios-barbell" size={24} color={COLORS.white} />
              }
            </View>
            <View 
              style={tw`ml-6`}
            >
              <Text
                style={tw`font-bold text-white text-sm pb-2`}
              >{Object.values(NameExercise)[day.type]}</Text>
              <Text
                style={tw`text-gray`}
            >{day.week < 3 && `PR:` } 
              <Text
                style={tw`text-white`} 
              >
                {day.week < 3 ? `${day.week === 0 ? `5+` : day.week === 1 ? `3+` : `1+`} x ${weight}` : `Deload`}
              </Text> 
              </Text>
            </View>
          </View>

          <View 
            style={tw`flex justify-center`}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.white} />
          </View>
        </Pressable>
      </View>
  )
}

export default DayCard