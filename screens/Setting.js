import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Pressable, ScrollView, Switch, SafeAreaView, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { MaterialIcons } from '@expo/vector-icons';

import { COLORS, SIZES, FONTS, TimerTitle } from '../constants';
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
    <SafeAreaView style={{
      flex: 1,
      marginTop: SIZES.large
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: SIZES.font,
        }}
      >
        <View style={{
          backgroundColor: COLORS.primary,
          padding: SIZES.font,
          borderRadius: SIZES.font,
          marginTop: SIZES.large,
          marginBottom: SIZES.large
        }}>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
              marginBottom: SIZES.font
            }}
          >
            Rest timer
          </Text>
          {
            settingData?.rest.timer.map((time, idx) => 
              <View
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: COLORS.primary,
                  marginBottom: SIZES.extraLarge
                }}
              >
                <Text style={{
                  color: COLORS.white
                }}>{TimerTitle[idx]}</Text>
                <Pressable
                  onPress={() => handleOpenModalTimerPicker(idx)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color: COLORS.white
                    }}>{timeFormat(time)}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.white} />
                  </View>
                </Pressable>
              </View>
            )
          }
          <View style={{
            borderTopColor: COLORS.gray,
            borderTopWidth: 0.5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: SIZES.font,
          }}>
            <Text style={{
              color: COLORS.white
            }}>Ring bell</Text>
            <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}>
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