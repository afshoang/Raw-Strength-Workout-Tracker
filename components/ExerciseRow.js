import { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, ExercisesData, FONTS, SIZES } from '../constants';
import SetRow from './SetRow';
import { addSet } from '../slices/workOutSlice'

const ExerciseRow = ({ idDay, exercise, type, handleChangeSetDone }) => {
    const exerciseName = ExercisesData.find(ex => ex.id === exercise.exerciseId)?.name
    const dispatch = useDispatch()
    const [isPressed, setIsPressed] = useState(false)

    const typeEx = {
        0: "Warm up",
        1: "Main",
        2: "Supplemental",
        3: "Assistance"
    }

  return (
      <View style={{
          width: "100%",
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.font,
          paddingHorizontal: SIZES.small,
          paddingVertical: SIZES.base,
          marginBottom: SIZES.base
      }}>
          <Pressable
              onPress={() => setIsPressed(!isPressed)}
              style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
              }}
          >
              <View style={{
                  display: "flex",
                  flexDirection: "row",
              }}>
                  <View style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: SIZES.base
                  }}>
                      <Text style={{ color: COLORS.white, fontSize: SIZES.large }}>{Number(type) + 1}</Text>
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
                      >{exerciseName?.split('').map((char, idx) => idx === 0 ? char.toUpperCase() : char).join('') }</Text>
                      <Text style={{
                          color: COLORS.gray,
                      }}>{typeEx[type]}<Text style={{
                          color: COLORS.white,
                      }}></Text>
                      </Text>
                  </View>
              </View>

              <View style={{
                  display: "flex",
                  justifyContent: "center"
              }}>
                    {
                        isPressed
                        ? 
                            <MaterialIcons name="keyboard-arrow-down" size={24} color={COLORS.white} />
                        :
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.white} />
                    }
              </View>
          </Pressable>

          {
              isPressed && (
                  <>
                      <View
                          style={{
                              borderBottomColor: COLORS.gray,
                              borderBottomWidth: 0.5,
                              marginVertical: SIZES.base,
                          }}
                      />
                      {/* SET ROW HERE */}
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                      }}>
                          <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center' }}>
                              <Text style={{ color: COLORS.white }}>Reps</Text>
                          </View>
                          <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center' }}>
                              <Text style={{ color: COLORS.white }}>kg</Text>
                          </View>
                          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                              <Text style={{ color: COLORS.white }}>Done</Text>
                          </View>
                      </View>
                      {
                        exercise.sets.map((set, idx) => (
                            <SetRow key={idx} idDay={idDay} exerciseRowId={exercise.id} type={exercise.type} set={set} index={idx} handleChangeSetDone={handleChangeSetDone} />
                        ))
                      }
                      {/* ADD NEW SET FOR THIS EXERCISE */}
                      <Pressable
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: SIZES.font,
                            marginTop: SIZES.font,
                            borderRadius: SIZES.font,
                            backgroundColor: COLORS.secondary,
                        }}
                          onPress={() => dispatch(addSet({ id: idDay, exerciseRowId: exercise.id, typeSet: type }))}
                        >
                          <Text style={{
                            color: COLORS.white,
                            fontSize: SIZES.medium
                          }}>Add Set</Text>
                      </Pressable>
                  </>
              )
          }
      </View>
  )
}

export default ExerciseRow