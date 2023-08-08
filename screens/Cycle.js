import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import SegmentedControlTab from "react-native-segmented-control-tab";

import { MaterialIcons } from '@expo/vector-icons';

import { cycleCreated, cycleUpdated, cycleDeleted, selectCycle, selectCycleById } from '../slices/cycleSlice'
import { CycleData, COLORS, SIZES, FONTS, NameExercise, SupplementTemplate, InputOneRepMax } from '../constants';
import { BackButton, ButtonLink, ModalPicker } from '../components';

const Cycle = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()

    const dataCycle = useSelector(selectCycle)
    const dataCycle1 = useSelector((state) => selectCycleById(state, route.params.id))

    const [oneRepMax, setOneRepMax] = useState([])
    const [tmRatio, setTMRatio] = useState('85')
    
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [tmRatioSupplemental, setTMRatioSupplemental] = useState('')

    const [displayPicker, setDisplayPicker] = useState(false)
    const [typeDisplayPicker, setTypeDisplayPicker] = useState(0) // 0 template 1 variant

    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    
    const [weightUnit, setWeightUnit] = useState('kg')
    const dataVariant = SupplementTemplate.find(temp => temp.value === selectedTemplate)?.variant
   
    useEffect(() => {
        if (route.params?.id === "edit" && dataCycle) {
            const { tmRatio, template: supplementTemplate } = dataCycle
            const oneRepMax = InputOneRepMax.map((day, idx) => {
                day.weight = dataCycle.orm[idx].toString()
                day.oneRepMax = dataCycle.orm[idx].toString()
                day.trainingMax = dataCycle.tm[idx]
                return day
            })
            setOneRepMax(oneRepMax)
            setSelectedTemplate(supplementTemplate.name)
            setTMRatio(String(tmRatio * 100))
            setTMRatioSupplemental(String(supplementTemplate.tmRatioSupplemental * 100))
            if (supplementTemplate.variant) {
                setSelectedVariant(supplementTemplate.variant)
            }
        } else {
            setOneRepMax(InputOneRepMax)
            const { tmRatio, template: supplementTemplate } = CycleData
            setSelectedTemplate(supplementTemplate.name)
            setTMRatio(String(tmRatio * 100))
            setTMRatioSupplemental(String(supplementTemplate.tmRatioSupplemental * 100))
            if (supplementTemplate.variant) {
                setSelectedVariant(supplementTemplate.variant)
            }
        }
    }, [route, dataCycle])

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerShown: false
            title: route.params?.id === "edit" ? "Edit cycle" : "New cycle",
            headerStyle: {
                backgroundColor: COLORS.secondary,
            },
            headerTitleStyle: {
                color: COLORS.white
            },
            headerLeft: () => <BackButton handlePress={() => navigation.goBack()} />,
            headerRight: () => <ButtonLink textBtn={'Save'} handlePress={handleSaveCycle} />,
            headerShadowVisible: false
        })
    }, [selectedTemplate, selectedVariant, oneRepMax, tmRatioSupplemental, tmRatio, dataCycle, route])

    const handleSaveCycle = useCallback(() => {
        // CACULATE ONE REP MAX and Trainning max
        const ORM = oneRepMax.map(day => {
            let reps = Number(day.reps)
            if (reps < 1) reps = 1
            let weight = Number(day.weight)
            if (weight < 20) weight = 20
            let tm = weight
            if (reps > 1) {
                tm = (weight * reps * 0.0333 + weight)
            }
            return round(tm, 2);
        })
        const TM = ORM.map(lift => round(lift * (Number(tmRatio) / 100), 1))

        // CACULATE SUPPLEMENT WORK
        const currVariant = SupplementTemplate.find(temp => temp.value === selectedTemplate)?.variant.find(vari => vari.value === selectedVariant)
        let sets = {}
        
        if (!currVariant) {
           sets = SupplementTemplate.find(temp => temp.value === selectedTemplate)?.work
        } else {
            sets = currVariant.work
        }

        const data = {
            orm: ORM,
            tm: TM,
            tmRatio: Number(tmRatio) / 100,
            template: {
                name: selectedTemplate,
                variant: SupplementTemplate.find(temp => temp.value === selectedTemplate)?.variant.map(vari => vari.value).includes(selectedVariant) ? selectedVariant : null,
                tmRatioSupplemental: Number(tmRatioSupplemental) / 100,
            },
        }

        if (route.params.id === 'add') {
            dispatch(cycleCreated(data))
        } else {
            let dateForUpdate = {
                ...dataCycle,
                ...data
            }
            dispatch(cycleUpdated(dateForUpdate))
        }

        navigation.navigate('Home')
    }, [selectedTemplate, selectedVariant, oneRepMax, tmRatioSupplemental, tmRatio, dataCycle, route])

    const handleDeleteCycle = () => {
        dispatch(cycleDeleted(dataCycle?.id))
        navigation.navigate('Home')
    }

    const handleChangeTemplate = (itemValue) => {
        setSelectedTemplate(itemValue)
        if (!selectedVariant) {
            const defaultVariant = SupplementTemplate.find(temp => temp.value === itemValue)?.variant[0]?.value
            if (defaultVariant) {
                setSelectedVariant(defaultVariant)
            }
        }
    }
    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    const handleChangeORM = (id, typeDay, value) => { // id = reps || weight
        const newData = oneRepMax.find(day => day.typeDay === typeDay)
        newData[id] = value
        // caculate tm
        // tm = (weight * reps * 0.0333 + weight)
        const { weight, reps } = newData
        let newOrm = Number(weight)
        if (Number(reps) > 1) {
            newOrm = Number(weight) * Number(reps) * 0.0333 + Number(weight)
        }
        newData.oneRepMax = newOrm
        newData.trainingMax = round(newOrm * (Number(tmRatio) / 100), 2)
        setOneRepMax(oneRepMax.map(day => day.typeDay === typeDay ? newData : day))
    }

    const handleOpenModal = (typeModal) => {
        setDisplayPicker(!displayPicker)
        setTypeDisplayPicker(typeModal)
    }

  return (
    <>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    paddingHorizontal: SIZES.font,
                    height: '100%'
                }}
            >
            {/* SET UP TRAINNING MAX */}
            <View style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.font,
                borderRadius: SIZES.font,
                marginTop: SIZES.large,
                marginBottom: SIZES.large
            }}>
                <View style={{
                    marginBottom: SIZES.font
                }}>
                    <SegmentedControlTab
                        tabsContainerStyle={{
                            backgroundColor: COLORS.secondary,
                            height: 30,
                            borderColor: COLORS.primary,
                            borderRadius: SIZES.base
                        }}
                        tabStyle={{
                            backgroundColor: COLORS.secondary,
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
                        values={["1 rep max", "Traning max"]}
                        selectedIndex={selectedTabIndex}
                        onTabPress={(index) => setSelectedTabIndex(index)}
                    />
                </View>
                <View>
                    {
                        oneRepMax.map(({typeDay, reps, weight, trainingMax}) =>
                            <View
                                key={typeDay}
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: COLORS.primary,
                                    marginBottom: 15
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: SIZES.medium
                                    }}>
                                    {NameExercise[typeDay]}
                                </Text>

                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    {
                                        selectedTabIndex === 0
                                        &&
                                            <>
                                                <TextInput
                                                    value={reps}
                                                    onChangeText={(value) => handleChangeORM("reps", typeDay, value)}
                                                    keyboardType="numeric"
                                                    style={{
                                                        height: 35,
                                                        width: 35,
                                                        borderRadius: 10,
                                                        backgroundColor: COLORS.white,
                                                        textAlign: "center",
                                                        fontSize: SIZES.font
                                                    }}
                                                />
                                                <Text
                                                    style={{
                                                        color: COLORS.white
                                                    }}>
                                                    rep x
                                                </Text>
                                            </>
                                    }
                                    <TextInput
                                        value={selectedTabIndex === 0 ? weight : trainingMax.toString()}
                                        onChangeText={(value) => handleChangeORM("weight", typeDay, value)}
                                        keyboardType="numeric"
                                        style={{
                                            height: 35,
                                            width: 60,
                                            borderRadius: 10,
                                            backgroundColor: COLORS.white,
                                            textAlign: "center",
                                            fontSize: SIZES.font
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: COLORS.white
                                        }}>
                                        {weightUnit}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                {
                    selectedTabIndex === 0
                    &&
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
                        }}>Training Max Ratio </Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <TextInput
                                value={tmRatio}
                                onChangeText={(value) => setTMRatio(value)}
                                keyboardType="numeric"
                                style={{
                                    height: 35,
                                    width: 60,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.white,
                                    textAlign: "center",
                                    fontSize: SIZES.font
                                }}
                            />
                            <Text style={{
                                color: COLORS.white
                            }}>%</Text>
                        </View>
                    </View>
                }
            </View>

            {/* TEMPLATE */}
            <View style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.font,
                borderRadius: SIZES.font,
                marginBottom: SIZES.large
            }}>
                <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.large
                    }}
                >
                    TEMPLATE
                </Text>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={{
                        color: COLORS.white,
                    }}>Template</Text>
                    <Pressable
                        onPress={() => handleOpenModal(0)}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            color: COLORS.white,
                        }}>{SupplementTemplate.find(temp => temp.value === selectedTemplate)?.name}</Text>
                        
                        <MaterialIcons name="keyboard-arrow-right" size={20} color={COLORS.white} />
                    </Pressable>
                </View>

                
            </View>

            {/* VARIANT OF TEMPLATE */}
            {
                (selectedTemplate === 'bbb') && (
                    <View style={{
                        backgroundColor: COLORS.primary,
                        padding: SIZES.font,
                        borderRadius: SIZES.font,
                        marginBottom: SIZES.large
                    }}>
                        <>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    fontFamily: FONTS.bold,
                                    fontSize: SIZES.large
                                }}
                            >
                                BORING BUT BIG
                            </Text>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: COLORS.white,
                                }}>Variant</Text>
                                <Pressable
                                    onPress={() => handleOpenModal(1)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={{
                                        color: COLORS.white,
                                    }}>{SupplementTemplate.find(temp => temp.value === selectedTemplate)?.variant.find(vari => vari.value === selectedVariant)?.name}</Text>

                                    <MaterialIcons name="keyboard-arrow-right" size={20} color={COLORS.white} />
                                </Pressable>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 20
                            }}>
                                <Text style={{
                                    color: COLORS.white,
                                }}>{selectedVariant === 'original' ? '5 x 10' : '3 x 10'}</Text>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <TextInput
                                        value={tmRatioSupplemental}
                                        onChangeText={(value) => setTMRatioSupplemental(value)}
                                        keyboardType="numeric"
                                        style={{
                                            height: 35,
                                            width: 60,
                                            borderRadius: 10,
                                            backgroundColor: COLORS.white,
                                            textAlign: "center",
                                            fontSize: SIZES.font
                                        }}
                                    />
                                    <Text style={{
                                        color: COLORS.white
                                    }}>%</Text>
                                </View>
                            </View>
                        </>
                    </View>
                )
            }
            

            {/* ASSISTANCE */}
            {/* <View style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.font,
                borderRadius: SIZES.font,
            }}>
                <Text
                    style={{
                        color: COLORS.white,
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.large
                    }}
                >
                    Assistance
                </Text>
            </View> */}
        {dataCycle && <View style={{ alignItems: 'center', marginTop: SIZES.base }}><ButtonLink textBtn="Delete Cycle" color="red" handlePress={handleDeleteCycle} /></View> }
            </ScrollView>
        </KeyboardAvoidingView>
        <ModalPicker data={typeDisplayPicker === 0 ? SupplementTemplate : dataVariant} isVisibleModal={displayPicker} setIsVisibleModal={setDisplayPicker} selectedValue={typeDisplayPicker === 0 ? selectedTemplate : selectedVariant} handleChange={typeDisplayPicker === 0 ? handleChangeTemplate : setSelectedVariant} />
    </> 
  )
}

export default Cycle