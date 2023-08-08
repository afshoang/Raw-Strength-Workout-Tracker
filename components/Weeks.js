import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ButtonLink } from './Button';
import { SIZES, COLORS, FONTS } from '../constants';
import DayCard from './DayCard';

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
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Text style={{
          color: COLORS.white,
          fontSize: SIZES.medium,
          fontFamily: FONTS.bold,
          textTransform: "uppercase",
          marginBottom: SIZES.base
        }}
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