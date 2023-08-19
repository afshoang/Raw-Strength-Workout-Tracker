import { useRef, useState } from 'react';
import { Pressable, View, Text, TextInput } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux'
import tw from '../lib/tailwind';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { COLORS } from '../constants';
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
      leftOpenValue={130}
      rightOpenValue={-100}
      onRowOpen={() => setIsRowOpened(true)}
      onRowClose={() => setIsRowOpened(false)}
    >
      <View 
        style={tw`flex flex-row justify-between p-3`}
      >
        <View 
          style={tw`${isRowOpened ? `opacity-100` : `opacity-0`} flex justify-center`}
        >
          <Text 
            style={tw`text-white text-left text-base`}
          >Plate caculator</Text>
        </View>
        <View 
          style={tw`${isRowOpened ? `opacity-100` : `opacity-0`} flex justify-center items-center w-[70px] h-[45px]`}
        >
          <Pressable
            onPress={() => dispatch(deleteSet({ id: idDay, exerciseRowId, indexSet: index }))}
          >
            <FontAwesome name="trash-o" size={25} color="red" />
          </Pressable>
        </View>
      </View>
      
      <View
        style={tw`flex flex-row gap-2`}
      >
        <View style={tw`flex-4`}>
          <Pressable
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              inputRepRef.current.focus()
            }}
            style={tw`flex flex-row justify-center p-3 mt-3.5 rounded-lg bg-secondary ${isInputRepFocused ? `border-main` : `border-secondary`} border-[0.5px]`}
          >
            <TextInput
              style={tw`h-0 w-0 border-0`}
              ref={inputRepRef}
              onChangeText={(value) => dispatch(updateSet({ id: idDay, exerciseRowId, indexSet: index, keyDataChange: 'reps', valueDataChange: Number(value) }))}
              value={set.reps.toString()}
              keyboardType="number-pad"
              onFocus={() => setIsInputRepFocused(true)}
              onBlur={() => setIsInputRepFocused(false)}
            />
            <Text
              style={tw`${isInputRepFocused ? `text-gray` : `text-white`} text-lg`}
            >
              {set.reps}{(type === 1 && index === 2) ? '+' : ''}
            </Text>
          </Pressable>
        </View>
        <View 
          style={tw`flex-4`}
        >
          <Pressable
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              inputWeightRef.current.focus()
            }}
            style={tw`flex flex-row justify-center p-3 mt-3.5 rounded-lg bg-secondary ${isInputWeightFocused ? `border-main` : `border-secondary`} border-[0.5px]`}
          >
            <TextInput
              style={tw`h-0 w-0 border-0`}
              ref={inputWeightRef}
              onChangeText={(value) => dispatch(updateSet({ id: idDay, exerciseRowId, indexSet: index, keyDataChange: 'weightRound', valueDataChange: Number(value) }))}
              value={set.weightRound.toString()}
              keyboardType="decimal-pad"
              onFocus={() => setIsInputWeightFocused(true)}
              onBlur={() => setIsInputWeightFocused(false)}
            />
            <Text
              style={tw`${isInputWeightFocused ? `text-gray` : `text-white`} text-lg`}
            >
              {set.weightRound}
            </Text>
          </Pressable>
        </View>
        <View style={tw`flex-2`}>
          <Pressable 
            onPress={() => {
              if (isRowOpened) {
                closeOpenRow()
                return
              }
              handleChangeSetDone(exerciseRowId, type, index, { done: !set.done })
            }}
            style={tw`flex flex-row justify-center p-3 mt-3.5 rounded-lg bg-secondary ${Boolean(set.done) ? `bg-main` : `bg-secondary`}`}
          >
            <MaterialIcons name="done" size={28} color={Boolean(set.done) ? COLORS.primary : COLORS.white} />
          </Pressable>
        </View>
      </View>
    </SwipeRow>
  )
}

export default SetRow