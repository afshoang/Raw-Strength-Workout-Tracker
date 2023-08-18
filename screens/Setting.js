import { useCallback, useLayoutEffect, useState } from 'react'
import { Pressable, ScrollView, Switch, SafeAreaView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import tw from '../lib/tailwind';

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, TimerTitle } from '../constants';
import { TimePicker } from '../components';
import { selectSetting, saveRestTimer } from '../slices/settingSlice';

const Setting = () => {
  const navigation = useNavigation()

  const dispatch = useDispatch()
  const settingData = useSelector(selectSetting)

  const [isEnableSound, setIsEnableSound] = useState(settingData?.rest.sound)
  
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [typeTimer, setTypeTimer] = useState(0)

  const handleOpenModalTimerPicker = useCallback((indexTimer) => {
    setTypeTimer(indexTimer)
    setIsVisibleModal(true)
  })

  const handleChangeTimer = useCallback((minutes, seconds) => {
    const totalSeconds = Number(minutes) * 60 + Number(seconds)
    dispatch(saveRestTimer({ indexTimer: typeTimer, seconds: totalSeconds }))
  }, [typeTimer])

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerShown: false
      title: "Setting",
      headerStyle: {
        backgroundColor: COLORS.secondary,
      },
      headerTitleStyle: {
        color: COLORS.white
      },
      headerShadowVisible: false
    })
  }, [])

  function timeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }

  return (
    <SafeAreaView 
      style={tw`flex-1 mt-4`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`px-3.5`}
      >
        <View 
          style={tw`card`}
        >
          <Text
            style={tw`text-card`}
          >
            Rest timer
          </Text>
          {
            settingData?.rest.timer.map((time, idx) => 
              <View
                key={idx}
                style={tw`flex flex-row items-center justify-between bg-primary mb-5`}
              >
                <Text style={tw`text-white`}>{TimerTitle[idx]}</Text>
                <Pressable
                  onPress={() => handleOpenModalTimerPicker(idx)}
                  style={tw`flex flex-row items-center`}
                >
                  <Text style={tw`text-white`}>{timeFormat(time)}</Text>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.white} />
                </Pressable>
              </View>
            )
          }
          <View 
            style={tw`flex flex-row items-center justify-between border-t-[0.5px] border-gray pt-4`}
          >
            <Text style={tw`text-white`}>
              Ring bell
            </Text>
            <View style={tw`flex flex-row items-center gap-2.5`}>
              <Switch
                trackColor={{ true: '#54B435' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnableSound(!isEnableSound)}
                value={isEnableSound}
              />
            </View>
          </View>
        </View>

      </ScrollView>

      <TimePicker isVisibleModal={isVisibleModal} setIsVisibleModal={setIsVisibleModal} duration={settingData?.rest.timer[typeTimer]} handleChange={handleChangeTimer} />
    </SafeAreaView>    
  )
}

export default Setting