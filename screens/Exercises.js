import { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Pressable, SafeAreaView, View, Text, TextInput, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import tw from '../lib/tailwind';

import { ExercisesData, ExerciseCategories, COLORS, FONTS, SIZES } from '../constants';
import { BackButton, ModalPicker } from '../components';
import { addExercise } from '../slices/workOutSlice'

const Exercises = () => {
    const route = useRoute()
    const { id } = route.params
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [exercises, setExercises] = useState(ExercisesData)
    const [searchExercise, setSearchExercise] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const [displayPicker, setDisplayPicker] = useState(false)

    const categories = [{
        name: "Categories",
        value: -1
    }].concat(Object.entries(ExerciseCategories).map(([key, value]) => {
        return {
            name: value.split('').map((char, idx) => idx === 0 ? char.toUpperCase() : char).join(''),
            value: key
        }
    }))

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerShown: false
            title: `Add Exercises`,
            headerStyle: {
                backgroundColor: COLORS.secondary,
            },
            headerTitleStyle: {
                color: COLORS.white
            },
            headerLeft: () => <BackButton handlePress={() => navigation.goBack()} />,
            // headerRight: () => <ButtonLink textBtn={'Add'} handlePress={() => console.log('add exercise')} />,
            headerShadowVisible: false
        })
    }, [])

    const handleFilterExercises = (items) => {
        return items
            .filter(ex => ex.name.toLowerCase().includes(searchExercise.toLowerCase()))
            .filter(ex => selectedCategory != -1 ? ex.category == selectedCategory : ex)
    }

  return (
    <>
    <SafeAreaView 
        style={tw`mt-7 mb-40`}
    >
        <View 
            style={tw`flex flex-row items-center gap-3.5`}
        >
            <TextInput
                value={searchExercise}
                onChangeText={(value) => setSearchExercise(value)}
                placeholder='Search'
                placeholderTextColor={COLORS.gray}
                style={tw`relative w-full h-[50px] bg-primary text-base pl-12 rounded-lg text-white`}
            />

            <View 
                style={tw`absolute flex justify-center left-2`}
            >
                <MaterialIcons name="search" size={24} color={COLORS.gray} />
            </View>
        </View>

        <View 
            style={tw`w-2/6 mt-5`}
        >
            <Pressable
                onPress={() => setDisplayPicker(true)}
                style={tw`${selectedCategory !== -1 ? `bg-main` : `bg-primary`} rounded-lg p-2`}
            >
                <Text
                    style={tw`${selectedCategory !== -1 ? `text-primary` : `text-white`} text-base text-center`}
                >
                    {categories.find(cate => cate.value === selectedCategory)?.name}
                </Text>
            </Pressable>
        </View>
        
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={tw`mt-7 h-full`}
        >
            {
                handleFilterExercises(exercises).map((ex) => (
                <View
                    key={ex.name}
                    style={tw`w-full bg-primary rounded-lg p-5 mb-4`}
                >
                    <Pressable
                        onPress={() => {
                            dispatch(addExercise({ id, idExercise: ex.id }))
                            navigation.goBack()
                        }}
                        style={tw`flex flex-row justify-between`}
                    >
                        <Text style={tw`text-white`}>{ex.name.split('').map((char, idx) => idx === 0 ? char.toUpperCase() : char).join('')}</Text>
                    </Pressable>
                </View>
            ))
            }
        </ScrollView>

    </SafeAreaView>
        <ModalPicker data={categories} isVisibleModal={displayPicker} setIsVisibleModal={setDisplayPicker} selectedValue={selectedCategory} handleChange={setSelectedCategory} />
    </>
  )
}

export default Exercises