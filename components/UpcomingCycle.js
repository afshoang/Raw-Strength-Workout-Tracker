import { View, Text } from 'react-native'
import { COLORS, SIZES, FONTS, NameExercise } from "../constants";
import { Ionicons } from '@expo/vector-icons';
import { ButtonLink } from './Button';
import { useDispatch, useSelector } from 'react-redux'
import { selectCycle, cycleCreated } from '../slices/cycleSlice'
import tw from '../lib/tailwind';

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
      <View
        style={tw`px-4 mt-4`}
      >
          <Text
              style={tw`text-white text-base font-bold uppercase mb-2`}
          >
            Upcoming Cycle
        </Text>
          <View
            style={tw`bg-primary p-4 rounded-lg mb-5 px-6`}
          >
              {
                  dataCycle.tm.map((item, idx) => (
                      <View
                          key={idx}
                          style={tw`flex flex-row justify-between`}
                      >
                          <Text 
                              style={tw`text-white text-sm font-bold`}
                          >{Object.values(NameExercise)[idx]}</Text>
                          <View
                              style={tw`flex flex-row items-center gap-2`}
                          >
                              <Text
                                  style={tw`text-white text-sm`}
                              >{item}</Text>
                              <Ionicons name="ios-arrow-forward" size={20} color="white" />
                              <Text style={tw`text-white text-sm`}>
                                {item + PROGRESSION[idx]}
                            </Text>
                          </View>
                      </View>
                  ))
              }
              <View
                  style={tw`flex flex-row justify-around`}
              >
                <ButtonLink textBtn={'Edit'} handlePress={() => navigation.navigate("Cycle", { id: "edit" })} />
                <ButtonLink textBtn={'Create'} handlePress={() => handleCreateUpcomingCycle(dataCycle)} />
              </View>
          </View>
      </View>
  )
}

export default UpcomingCycle