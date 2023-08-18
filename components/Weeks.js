import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ButtonLink } from './Button';
import { SIZES, COLORS, FONTS } from '../constants';
import DayCard from './DayCard';
import tw from '../lib/tailwind';

const Weeks = ({ workOuts, trainningMax }) => {
  const navigation = useNavigation()
  // 0: ohp 1: dl , 2: bench, 3: squat

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: SIZES.font,
      }}
    >
      {/* DAY CARD */}
      <View 
        style={tw`flex flex-row justify-between`}
      >
        <Text 
          style={tw`text-white text-base font-bold uppercase mb-2`}
        >{`WEEK ${workOuts[0]?.week + 1}`}</Text>
        <ButtonLink textBtn={'Edit cycle'} handlePress={() => navigation.navigate("Cycle", { id: "edit" })} />
      </View>
      {
        workOuts?.map((day, index) => (
          <DayCard key={day.type} day={day} trainningMax={trainningMax[index]} />
        ))
      }
    </ScrollView>
  )
}

export default Weeks