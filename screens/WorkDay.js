import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Pressable, SafeAreaView, ScrollView, View, Text } from 'react-native'

import { selectWorkDayById, saveWorkOut } from '../slices/workOutSlice'
import { selectSetting } from '../slices/settingSlice';
import { COLORS, FONTS, SIZES } from '../constants';
import { BackButton, ButtonLink, ExerciseRow, CustomAlert } from '../components';

const WorkDay = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { id } = route.params
  const workDay = useSelector((state) => selectWorkDayById(state, id))
  const setting = useSelector(selectSetting)
  const [timeWorkOut, setTimeWorkOut] = useState(0);
  const [restTime, setRestTime] = useState(0);

  const [typeExcercises, setTypeExcercise] = useState(workDay?.workLog)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (workDay) {
      setTypeExcercise(workDay?.workLog)
    }
  }, [workDay])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Week ${workDay?.week + 1}`,
      headerStyle: {
        backgroundColor: COLORS.secondary,
      },
      headerTitleStyle: {
        color: COLORS.white
      },
      headerLeft: () => <BackButton handlePress={handleCancelWorkOut} />,
      headerRight: () => <ButtonLink textBtn={workDay.timeWorkOut ? 'Save' :'End workout'} handlePress={handleSaveWorkOut} />,
      headerShadowVisible: false
    })
  }, [timeWorkOut, typeExcercises])

  // useEffect(() => {
  //   if (workDay) {
  //     if (!workDay.timeWorkOut) {
  //       let timeWorkOutInterval = null;
  
  //       timeWorkOutInterval = setInterval(() => {
  //         setTimeWorkOut((timeWorkOut) => timeWorkOut + 1000);
  //       }, 1000);
  
  //       return () => clearInterval(timeWorkOutInterval);
  //     } else {
  //       setTimeWorkOut(workDay.timeWorkOut);
  //     }
  //   } 
  // }, [workDay]);

  useEffect(() => {
    const id = setInterval(() => {
      setRestTime((prevTime) => {
        return prevTime === 0 ? 0 : prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChangeSetDone = useCallback((exerciseRowId, typeSet, indexSet, data) => { // this only handle tick done
    setRestTime(setting?.rest.timer[typeSet])
    const idxNewType = typeExcercises.findIndex(typeEx => typeEx.id === exerciseRowId)
    const newDataTypeEx = update(typeExcercises, { [idxNewType]: { sets: { [indexSet]: { $merge: data } } }})
    setTypeExcercise(newDataTypeEx)
  }, [typeExcercises])

  const handleCancelWorkOut = useCallback(() => {
    if (workDay?.timeWorkOut) { // this mean work out is completed
      navigation.goBack()
      return
    } 
    setModalTitle("Cancel Workout?")
    setModalMessage("This will discard & close the ongoing session")
    setModalVisible(true)
  }, [typeExcercises, workDay])

  const handleSaveWorkOut = useCallback(() => {
    const isHasSetDone = typeExcercises // if dont has any set done => go back, dont save
      .reduce((prev, curr) => prev.concat(curr.sets), [])
      .map(set => set.done)
      .includes(true)
    if (!isHasSetDone) {
      navigation.goBack()
      return
    }

    const data = {
      id: workDay?.id,
      timeWorkOut: timeWorkOut,
      workLog: typeExcercises
    }

    dispatch(saveWorkOut(data))

    navigation.navigate('Home')
  }, [timeWorkOut, typeExcercises, workDay])

  return (
    <>
    <SafeAreaView style={{marginBottom: 50}}>
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={{
            color: COLORS.white,
            fontSize: SIZES.extraLarge
          }}>
            {
              restTime
              ? 
              `Rest: ${("0" + Math.floor((restTime / 60) % 60)).slice(-2)}:${("0" + Math.floor(restTime % 60)).slice(-2)}`
              :
              `${("0" + Math.floor((timeWorkOut / 60000) % 60)).slice(-2)}:${("0" + Math.floor((timeWorkOut / 1000) % 60)).slice(-2)}`
            }
          </Text>
        </View>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: SIZES.large,
          height: '100%'
        }}>
          {
            typeExcercises?.map((exercise, idx) => (
              <ExerciseRow key={idx} idDay={workDay?.id} exercise={exercise} type={exercise.type} week={workDay?.week} typeDay={workDay?.type} handleChangeSetDone={handleChangeSetDone} />
           ))
          }
        
        <Pressable 
          onPress={() => navigation.navigate('Exercises', { id: workDay?.id })}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: SIZES.font,
            marginTop: SIZES.font,
            borderRadius: SIZES.font,
            backgroundColor: COLORS.main,
          }}
        >
          <Text style={{
            color: COLORS.primary,
            fontSize: SIZES.font,
            fontFamily: FONTS.bold
          }}>+ Add Exercise</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
    
    <CustomAlert 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      title={modalTitle}
      message={modalMessage}
      buttons={[{
        text: 'Resume'
      }, {
        text: 'Cancel Workout',
        func: () => { navigation.goBack() },
        styles: {color: 'red'}
      }]}
    />
    </>
  )
}

export default WorkDay