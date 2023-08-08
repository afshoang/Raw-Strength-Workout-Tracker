import { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Pressable, SafeAreaView, View, Text, TextInput, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';


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
    <SafeAreaView style={{ marginTop: 30, marginBottom: 150 }}>
        <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        }}>
            <TextInput
                value={searchExercise}
                onChangeText={(value) => setSearchExercise(value)}
                placeholder='Search'
                placeholderTextColor={COLORS.gray} 
                style={{
                    position: 'relative',
                    height: 50,
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: COLORS.primary,
                    fontSize: SIZES.medium,
                    paddingLeft: 50,
                    color: COLORS.white
                }}
            />

            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                left: SIZES.small
            }}>
                <MaterialIcons name="search" size={24} color={COLORS.gray} />
            </View>
        </View>

        <View style={{ marginTop: SIZES.large, width: '30%' }}>
            <Pressable
                onPress={() => setDisplayPicker(true)}
                style={{
                    backgroundColor: selectedCategory !== -1 ? COLORS.main : COLORS.primary,
                    borderRadius: SIZES.small,
                    padding: SIZES.base
                }}
            >
                <Text style={{ color: selectedCategory !== -1 ? COLORS.primary : COLORS.white, fontSize: SIZES.medium, textAlign: 'center' }}>{categories.find(cate => cate.value === selectedCategory)?.name}</Text>
            </Pressable>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 30, height: '100%' }}>
            {
                handleFilterExercises(exercises).map((ex) => (
                <View
                    key={ex.name}
                    style={{
                        width: "100%",
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.small,
                        paddingHorizontal: SIZES.large,
                        paddingVertical: SIZES.large,
                        marginBottom: SIZES.font
                    }}
                >
                    <Pressable
                        onPress={() => {
                            dispatch(addExercise({ id, idExercise: ex.id }))
                            navigation.goBack()
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ color: COLORS.white }}>{ex.name.split('').map((char, idx) => idx === 0 ? char.toUpperCase() : char).join('')}</Text>
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