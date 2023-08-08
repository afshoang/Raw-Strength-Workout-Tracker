import { View, Text } from 'react-native'
import { useState } from 'react'
import { COLORS, SIZES, FONTS, NameExercise, SupplementTemplate } from "../constants";
import { Ionicons } from '@expo/vector-icons';
import { ButtonLink } from './Button';
import { useDispatch, useSelector } from 'react-redux'
import { selectCycle, cycleCreated } from '../slices/cycleSlice'

const PROGRESSION = [2.5, 5, 2.5, 5]

const UpcomingCycle = () => {
    const dispatch = useDispatch()
    const dataCycle = useSelector(selectCycle)

    const handleCreateUpcomingCycle = (dataCycle) => {
        const newOneRepMax = dataCycle.orm.map((item, idx) => item + PROGRESSION[idx])
        const newTrainingMax = dataCycle.tm.map((item, idx) => item + PROGRESSION[idx])
        const data = {
            orm: newOneRepMax,
            tm: newTrainingMax,
            tmRatio: dataCycle.tmRatio,
            template: dataCycle.template
        }
        dispatch(cycleCreated(data))
    }

  return (
      <View style={{
          paddingHorizontal: SIZES.font,
          marginTop: SIZES.font
      }}>
          <Text style={{
              color: COLORS.white,
              fontSize: SIZES.medium,
              fontFamily: FONTS.bold,
              textTransform: "uppercase",
              marginBottom: SIZES.base
          }}>Upcoming Cycle</Text>
          <View style={{
              backgroundColor: COLORS.primary,
              padding: SIZES.font,
              borderRadius: SIZES.font,
              marginBottom: SIZES.large,
              paddingHorizontal: SIZES.extraLarge
          }}>
              {
                  dataCycle.tm.map((item, idx) => (
                      <View
                          key={idx}
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 15
                          }}
                      >
                          <Text style={{
                              color: COLORS.white,
                              fontSize: SIZES.font,
                              fontFamily: FONTS.bold,
                          }}>{Object.values(NameExercise)[idx]}</Text>
                          <View style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 10
                          }}>
                              <Text style={{
                                  color: COLORS.white,
                                  fontSize: SIZES.font,
                              }}>{item}</Text>
                              <Ionicons name="ios-arrow-forward" size={20} color="white" />
                              <Text style={{
                                  color: COLORS.white,
                                  fontSize: SIZES.font,
                              }}>{item + PROGRESSION[idx]}</Text>
                          </View>
                      </View>
                  ))
              }
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <ButtonLink textBtn={'Edit'} handlePress={() => navigation.navigate("Cycle", { id: "edit" })} />
                <ButtonLink textBtn={'Create'} handlePress={() => handleCreateUpcomingCycle(dataCycle)} />
              </View>
          </View>
      </View>
  )
}

export default UpcomingCycle