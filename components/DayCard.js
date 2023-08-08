import { useNavigation } from '@react-navigation/native'
import { View, Text, Pressable } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES, NameExercise } from '../constants';

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
      <View style={{
          width: "100%",
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.font,
          paddingHorizontal: SIZES.large,
          paddingVertical: SIZES.base,
          marginBottom: SIZES.base
      }}>
        <Pressable
          onPress={() => navigation.navigate("WorkDay", { id: day.id })}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{
            flexDirection: "row",
          }}>
            <View style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: SIZES.base
            }}>
              {
                day.timeWorkOut !== null
                ?
                <MaterialIcons name="done" size={24} color={COLORS.main} />
                :
                <Ionicons name="ios-barbell" size={24} color={COLORS.white} />
              }
            </View>
            <View style={{
              marginLeft: SIZES.extraLarge
            }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.font,
                  fontFamily: FONTS.bold,
                  paddingBottom: SIZES.base
                }}
              >{Object.values(NameExercise)[day.type]}</Text>
              <Text style={{
                color: COLORS.gray,
            }}>{day.week < 3 && `PR:` } 
              <Text style={{
                color: COLORS.white,
              }}>
                {day.week < 3 ? `${day.week === 0 ? `5+` : day.week === 1 ? `3+` : `1+`} x ${weight}` : `Deload`}
              </Text> 
              </Text>
            </View>
          </View>

          <View style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.white} />
          </View>
        </Pressable>
      </View>
  )
}

export default DayCard