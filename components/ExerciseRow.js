import { useState } from 'react'
import { Pressable, View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import tw from '../lib/tailwind';

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
      <View
        style={tw`w-full bg-primary p-2.5 rounded-lg mb-3`}
      >
          <Pressable
              onPress={() => setIsPressed(!isPressed)}
              style={tw`felx flex-row justify-between`}
          >
              <View 
                style={tw`flex flex-row`}
              >
                  <View
                      style={tw`flex justify-center ml-2`}
                  >
                      <Text
                          style={tw`text-white text-base`}
                      >
                        {Number(type) + 1}
                        </Text>
                  </View>
                  <View
                      style={tw`ml-6`}
                  >
                      <Text
                          style={tw`text-white text-sm font-bold pb-2`}
                      >
                        {exerciseName?.split('').map((char, idx) => idx === 0 ? char.toUpperCase() : char).join('') }
                      </Text>
                      <Text 
                          style={tw`text-gray`}
                      >
                        {typeEx[type]}
                      </Text>
                  </View>
              </View>

              <View 
                style={tw`flex justify-center`}
              >
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
                          style={tw`border-b-[0.5px] border-gray my-3`}
                      />
                      {/* SET ROW HERE */}
                      <View 
                        style={tw`flex flex-row justify-center`}
                      >
                          <View style={tw`flex flex-row flex-4 justify-center`}>
                              <Text style={tw`text-white`}>Reps</Text>
                          </View>
                          <View style={tw`flex flex-row flex-4 justify-center`}>
                              <Text style={tw`text-white`}>kg</Text>
                          </View>
                          <View style={tw`flex flex-row flex-2 justify-center`}>
                              <Text style={tw`text-white`}>Done</Text>
                          </View>
                      </View>
                      {
                        exercise.sets.map((set, idx) => (
                            <SetRow key={idx} idDay={idDay} exerciseRowId={exercise.id} type={exercise.type} set={set} index={idx} handleChangeSetDone={handleChangeSetDone} />
                        ))
                      }
                      {/* ADD NEW SET FOR THIS EXERCISE */}
                      <Pressable
                        style={tw`flex flex-row justify-center p-4 mt-4 rounded-lg bg-secondary`}
                          onPress={() => dispatch(addSet({ id: idDay, exerciseRowId: exercise.id, typeSet: type }))}
                        >
                          <Text
                            style={tw`text-white text-base`}
                          >
                            Add Set
                        </Text>
                      </Pressable>
                  </>
              )
          }
      </View>
  )
}

export default ExerciseRow