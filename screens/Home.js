import { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, Text, View, Pressable, ScrollView, Dimensions } from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  LineChart
} from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { selectAllCycle, selectCycle } from '../slices/cycleSlice'
import { selectAllWorkOut, selectWorkOutByCycleId } from '../slices/workOutSlice';
import { COLORS, SIZES, FONTS } from "../constants";
import { Weeks, UpcomingCycle } from '../components';

const Home = () => {
  const navigation = useNavigation()
  const tabBarheight = useBottomTabBarHeight();
  const dispatch = useDispatch()
  
  const dataCycle = useSelector(selectCycle)
  const allCycles = useSelector(selectAllCycle)

  const workOuts = useSelector(selectAllWorkOut)
  const currentCycleWorkOut = useSelector(selectWorkOutByCycleId)

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

  const labels = allCycles?.map(cy => cy.createdAt).map(time => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const index = new Date(time).getMonth()
    return months[index]
  })
  
  const hehexD = allCycles?.map(cy => cy.tm)?.reduce((acc, curr) => {
    curr.forEach((item, idx) => {
      if (!acc[idx]) {
        acc[idx] = []
      }
      acc[idx].push(item)
    })
    return acc
  }, {})

  const datasets = Object.values(hehexD).map(tm => {
    function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }
    var color = random_rgba();
    return {
      data: tm,
      // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      color: (opacity = 1) => `${color}`,
    }
  })

  const dataChartProgress = {
    labels: labels,
    datasets: datasets,
    legend: ['Press', 'Deadlift', 'Bench', 'Squat'],
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView>
      {/* HEADER */}
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.font,
        marginTop: SIZES.extraLarge
      }}>
        <View>
          <Text style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.extraLarge,
            color: COLORS.white,
            marginBottom: SIZES.font
          }}>RAW STRENGTH</Text>
        </View>
      </View>

      {/* CYLCE */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: tabBarheight },
        ]}
        style={{
          height: '100%'
        }}
      >
      {
        (dataCycle && dataCycle !== null && currentCycleWorkOut?.length)
        ? 
          <>
            <View style={{
              paddingHorizontal: SIZES.font,
              marginBottom: SIZES.large
            }}>
              <SegmentedControlTab
                tabsContainerStyle={{
                  backgroundColor: COLORS.primary,
                  height: 30,
                  borderColor: COLORS.primary,
                  borderRadius: SIZES.base
                }}
                tabStyle={{
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                  color: COLORS.white,
                }}
                tabTextStyle={{
                  color: COLORS.white
                }}
                activeTabStyle={{
                  backgroundColor: COLORS.main,
                  borderRadius: SIZES.base
                }}
                activeTabTextStyle={{
                  color: COLORS.primary,
                  fontSize: SIZES.font,
                }}
                values={["Week 1", "Week 2", "Week 3", "Week 4"]}
                selectedIndex={selectedTabIndex}
                onTabPress={(index) => setSelectedTabIndex(index)}
              />
            </View>
              <Weeks workOuts={currentCycleWorkOut.filter(work => work.week === selectedTabIndex)} trainningMax={dataCycle?.tm} />

            {/* UPCOMMING CYCLE */}
            {!currentCycleWorkOut?.map(work => work.timeWorkOut).includes(null) && (
              <UpcomingCycle />
            )}
          
            {/* CHART */}
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
              }}>Progress</Text>
              <LineChart
                data={dataChartProgress}
                onDataPointClick={(data) => {
                  // check if we have clicked on the same point again
                  let isSamePoint = (tooltipPos.x === data.x
                    && tooltipPos.y === data.y)

                  // if clicked on the same point again toggle visibility
                  // else,render tooltip to new position and update its value
                  isSamePoint ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    }
                  })
                    :
                    setTooltipPos({
                      x: data.x,
                      value: data.value, y: data.y,
                      visible: true
                    });
                }}
                decorator={() => 
                  tooltipPos.visible ? 
                    <View>
                        <Svg>
                          <Rect x={tooltipPos.x - 15} y={tooltipPos.y + 10} width="40"
                            height="30" fill="black" />
                          <TextSVG
                            x={tooltipPos.x + 5}
                            y={tooltipPos.y + 30}
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle">
                            {tooltipPos.value}
                          </TextSVG>
                        </Svg>
                    </View> 
                  : null
                }
                width={Dimensions.get("window").width - 28}
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundGradientFrom: COLORS.primary,
                    backgroundGradientFromOpacity: 0.8,
                    backgroundGradientTo: COLORS.primary,
                    backgroundGradientToOpacity: 0.7,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 10
                  },
                  propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                  }
                }}
                style={{
                  marginTop: 8,
                  borderRadius: 10,
                }}
              />
            </View>
          </>
        :
          <View
            style={{
            paddingHorizontal: SIZES.font,
          }}
          >
            <View style={{
              width: "100%",
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.font,
              padding: SIZES.extraLarge,
            }}>
              <Text style={{
                fontSize: SIZES.font,
                color: COLORS.white
              }}>Your workouts will show up here after you create your first cycle</Text>
              <Pressable
                onPress={() => navigation.navigate("Cycle", { id: "add" })}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderRadius: 4,
                  elevation: 3,
                  backgroundColor: COLORS.main,
                  marginTop: 16
                }}
              >
                <Text style={{
                  color: COLORS.black,
                  fontSize: SIZES.large,
                  fontFamily: FONTS.bold
                }}>Create first cycle</Text>
              </Pressable>
            </View>
          </View>
      }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home