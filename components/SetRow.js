import { useRef, useState } from 'react';
import { Pressable, View, Text, TextInput } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux'

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { COLORS, SIZES } from '../constants';
import { updateSet, deleteSet } from '../slices/workOutSlice'

const SetRow = ({ idDay, exerciseRowId, type, set, index, handleChangeSetDone }) => {
  const dispatch = useDispatch()
  const inputRepRef = useRef(null)
  const swipeRowRef = useRef(null)
  const [isInputRepFocused, setIsInputRepFocused] = useState(false)
  const [isRowOpened, setIsRowOpened] = useState(false)

  const closeOpenRow = () => {
    if (swipeRowRef.current && swipeRowRef.current.closeRow) {
      swipeRowRef.current.closeRow();
    }
  };
  const inputWeightRef = useRef(null)
  const [isInputWeightFocused, setIsInputWeightFocused] = useState(false)

  return (
    <SwipeRow
      ref={swipeRowRef}
      leftOpenValue={100}
      rightOpenValue={-100}
      onRowOpen={() => setIsRowOpened(true)}
      onRowClose={() => setIsRowOpened(false)}
    >
      <View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
      }}>
        <View style={{
          opacity: isRowOpened ? 1 : 0,
          justifyContent: 'center'
        }}>
          <Text style={{
            color: COLORS.white,
            textAlign: 'left',
            fontSize: SIZES.medium
          }}>Plate caculator</Text>
        </View>
        <View style={{
          width: 70,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isRowOpened ? 1 : 0
        }}>
          <Pressable
            onPress={() => dispatch(deleteSet({ id: idDay, exerciseRowId, indexSet: index }))}
          >
            <FontAwesome name="trash-o" size={25} color="red" />
          </Pressable>
        </View>
      </View>
      
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 5
        }}
      >
        <View style={{ flex: 4 }}>
          <Pressable
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              inputRepRef.current.focus()
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: SIZES.font,
              marginTop: SIZES.font,
              borderRadius: SIZES.font,
              backgroundColor: COLORS.secondary,
              borderColor: isInputRepFocused ? COLORS.main : COLORS.secondary,
              borderWidth: 0.5
            }}
          >
            <TextInput
              style={{ height: 0, width: 0, borderWidth: 0 }}
              ref={inputRepRef}
              onChangeText={(value) => dispatch(updateSet({ id: idDay, exerciseRowId, indexSet: index, keyDataChange: 'reps', valueDataChange: Number(value) }))}
              value={set.reps.toString()}
              keyboardType="number-pad"
              onFocus={() => setIsInputRepFocused(true)}
              onBlur={() => setIsInputRepFocused(false)}
            />
            <Text style={{ color: isInputRepFocused ? COLORS.gray : COLORS.white, fontSize: SIZES.large }}>{set.reps}{(type === 1 && index === 2) ? '+' : ''}</Text>
          </Pressable>
        </View>
        <View style={{ flex: 4 }}>
          <Pressable
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              inputWeightRef.current.focus()
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: SIZES.font,
              marginTop: SIZES.font,
              borderRadius: SIZES.font,
              backgroundColor: COLORS.secondary,
              borderColor: isInputWeightFocused ? COLORS.main : COLORS.secondary,
              borderWidth: 0.5
            }}
          >
            <TextInput
              style={{ height: 0, width: 0, borderWidth: 0 }}
              ref={inputWeightRef}
              onChangeText={(value) => dispatch(updateSet({ id: idDay, exerciseRowId, indexSet: index, keyDataChange: 'weightRound', valueDataChange: Number(value) }))}
              value={set.weightRound.toString()}
              keyboardType="decimal-pad"
              onFocus={() => setIsInputWeightFocused(true)}
              onBlur={() => setIsInputWeightFocused(false)}
            />
            <Text style={{ color: isInputWeightFocused ? COLORS.gray : COLORS.white, fontSize: SIZES.large }}>{set.weightRound}</Text>
          </Pressable>
        </View>
        <View style={{ flex: 2 }}>
          <Pressable 
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              handleChangeSetDone(exerciseRowId, type, index, { done: !set.done })
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: SIZES.font,
              marginTop: SIZES.font,
              borderRadius: SIZES.font,
              backgroundColor: Boolean(set.done) ? COLORS.main : COLORS.secondary,
            }}
          >
            <MaterialIcons name="done" size={22} color={Boolean(set.done) ? COLORS.primary : COLORS.white} />
          </Pressable>
        </View>
      </View>
    </SwipeRow>
  )
}

export default SetRow