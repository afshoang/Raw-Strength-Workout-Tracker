import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit'
import { cycleCreated, cycleUpdated, cycleDeleted } from './cycleSlice';
import { SupplementTemplate } from "../constants";
import update from 'immutability-helper';

export const initialState = {
    workOut: []
}

export const workOutSlice = createSlice({
    name: 'workOut',
    initialState,
    reducers: {
        addExercise: (state, action) => {
            // find workday
            const data = action.payload
            const workDay = state?.workOut.find(work => work.id === data.id)
            // {"id": data.idExercise, "sets": [{ single set }], "type": data.typeExercise}
            const newExercise = {
                id: nanoid(),
                exerciseId: data.idExercise,
                sets: [{ "done": false, "name": null, "reps": 0, "type": data.typeSet || 3, "weight": 0, "weightRound": 0 }],
                type: data.typeSet || 3
            }
            workDay.workLog.push(newExercise)
        },
        addSet: (state, action) => {
            // find workday
            const data = action.payload
            const workDay = state?.workOut.find(work => work.id === data.id)
            if (workDay) {
                const exercise = workDay.workLog.find(ex => ex.id === data.exerciseRowId)
                if (exercise) {
                    // newSet = {"done": false, "name": null, idExercise: data.idExercise, "reps": 0, "type": data.typeSet, "weight": 0, "weightRound": 0}
                    if (exercise.sets.length) {
                        const lastSet = Object.assign({}, exercise.sets[exercise.sets.length - 1])
                        lastSet.done = false
                        exercise.sets.push(lastSet)
                    } else {
                        exercise.sets.push(Object.assign({}, { "done": false, "name": null, "reps": 0, "type": data.typeSet, "weight": 0, "weightRound": 0 }))
                    }
                }
            }
        },
        updateSet: (state, action) => {
            // find workday
            const data = action.payload
            const workDay = state?.workOut.find(work => work.id === data.id)
            if (workDay) {
                const exercise = workDay.workLog.find(ex => ex.id === data.exerciseRowId)
                if (exercise) {
                    let set = exercise.sets.find((s, idx) => idx === data.indexSet)
                    set[data.keyDataChange] = data.valueDataChange
                }
            }
        },
        deleteSet: (state, action) => {
            // find workday
            const data = action.payload
            const workDay = state?.workOut.find(work => work.id === data.id)
            if (workDay) {
                const exercise = workDay.workLog.find(ex => ex.id === data.exerciseRowId)
                if (exercise) {
                    // if (exercise.sets.length < 2) { // delete this exercise
                    //     const idx = workDay.workLog.findIndex(ex => ex.id === data.exerciseRowId)
                    //     workDay.workLog.splice(idx, 1);
                    // } else 
                    // {
                    // }
                    let set = exercise.sets.find((s, idx) => idx === data.indexSet)
                    if (set) {
                        exercise.sets.splice(data.indexSet, 1);
                    }
                }
            }
        },
        saveWorkOut: (state, action) => {
            const idx = state.workOut.findIndex(work => work.id === action.payload.id)
            if (idx > -1) {
                const newWorkOut = update(state.workOut[idx], { $merge: action.payload })
                newWorkOut.updatedAt = new Date().toISOString()
                state.workOut[idx] = newWorkOut
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(cycleCreated, (state, action) => {
                // get cycle id and caculate workout
                const { tm: trainingMax, template, id: cycleId } = action.payload
                let supplementScheme = getSupplementScheme(template.name, template.variant)
                let workOuts = generateWorkOut(trainingMax, supplementScheme)
                workOuts = workOuts.map(work => {
                    work.cycleId = cycleId
                    work.id = nanoid()
                    work.createdAt = new Date().toISOString()
                    return work
                })
                state.workOut = state.workOut.concat(workOuts)
            })
            .addCase(cycleUpdated, (state, action) => {
                // get cycle id and caculate workout
                const { tm: trainingMax, template } = action.payload
                // do not overide completed work out
                let supplementScheme = getSupplementScheme(template.name, template.variant)
                let workOuts = generateWorkOut(trainingMax, supplementScheme)

                const workOutsNeedUpdate = state.workOut
                    .filter(workOut => (workOut.cycleId === action.payload.id))

                const mergedWorkOuts = workOutsNeedUpdate.map((work) => {
                    if (typeof work.timeWorkOut !== "undefined" && work.timeWorkOut === null) { // this mean work out not complete yet
                        // update this work out
                        const foundWorkOut = workOuts.find(w => w.type === work.type && w.week === work.week)
                        const updatedWorkOut = update(work, { $merge: foundWorkOut })
                        updatedWorkOut.updatedAt = new Date().toISOString()
                        return updatedWorkOut
                    }
                    return work
                })

                state.workOut = state.workOut.filter(work => work.cycleId !== action.payload.id).concat(mergedWorkOuts)
            })
            .addCase(cycleDeleted, (state, action) => {
                state.workOut = state.workOut.filter(work => work.cycleId !== action.payload)
            })
    }
})

export const { addExercise, addSet, updateSet, deleteSet, saveWorkOut } = workOutSlice.actions

// SELECTOR
export const selectAllWorkOut = (state) => state.workOut.workOut

export const selectWorkOutByCycleId = createSelector(
    [selectAllWorkOut, (state) => state.cycle?.cycle.find(cy=> cy.status === 0)?.id],
    (workOuts, cycleId) => workOuts.filter(work => work.cycleId === cycleId)
)
export const selectWorkDayById = (state, id) => state.workOut.workOut?.find(workDay => workDay.id === id)

function generateWorkOut(trainingMax, supplementScheme) {
    // traning max
    // supplement scheme
    // old work data => compare and dont overide
    function roundInt(value, toNearest = 2.5) {
        return Math.round(value / toNearest) * toNearest;
    }

    let workOut = [] // array of 16 day work out

    const warmUpScheme = {
        reps: [5, 5, 3],
        percentage: [0.4, 0.5, 0.6]
    }

    const mainSetScheme = [
        {
            reps: [5, 5, 5],
            percentage: [0.65, 0.75, 0.85]
        },
        {
            reps: [3, 3, 3],
            percentage: [0.7, 0.8, 0.9]
        },
        {
            reps: [5, 3, 1],
            percentage: [0.75, 0.85, 0.95],
        },
        {
            reps: [5, 3, 1, 1],
            percentage: [0.7, 0.8, 0.9, 1]
        }
    ]

    // compare with old data
    mainSetScheme.forEach((week, index) => {
        // must return 4 day
        const days = [0, 1, 2, 3].map(day => { // trainning max here
            // warm up main supplemental
            const warmUpSets = warmUpScheme.reps.map((rep, idx) => {
                return {
                    type: 0,
                    reps: rep,
                    weight: warmUpScheme.percentage[idx] * trainingMax[day],
                    weightRound: roundInt(warmUpScheme.percentage[idx] * trainingMax[day]),
                    done: false,
                }
            })

            const mainSets = week.reps.map((rep, idx) => {
                return {
                    type: 1,
                    reps: rep,
                    weight: week.percentage[idx] * trainingMax[day],
                    weightRound: roundInt(week.percentage[idx] * trainingMax[day]),
                    done: false,
                }
            })

            let supplementalSets = []
            if (index !== 3) { // deload
                supplementalSets = supplementScheme[index].reps.map((rep, idx) => {
                    return {
                        type: 2,
                        reps: rep,
                        weight: supplementScheme[index].percentage[idx] * trainingMax[day],
                        weightRound: roundInt(supplementScheme[index].percentage[idx] * trainingMax[day]),
                        done: false,
                    }
                })
            }

            const dayObj = { // a day look like this
                week: index,
                type: day,
                timeWorkOut: null,
                workLog: [
                    {
                        id: nanoid(),
                        exerciseId: day, // day meaning id of exercise
                        type: 0, // type sets 0 warm up, 1 main, 2 assistance
                        sets: warmUpSets
                    },
                    {
                        id: nanoid(),
                        exerciseId: day,
                        type: 1,
                        sets: mainSets
                    },
                    {
                        id: nanoid(),
                        exerciseId: day,
                        type: 2,
                        sets: supplementalSets
                    },
                ]
            }

            return dayObj
        })
        workOut = [
            ...workOut,
            ...days
        ]
    })

    return workOut
}

function getSupplementScheme(templateName, variantName) {
    const currVariant = SupplementTemplate.find(temp => temp.value === templateName)?.variant.find(vari => vari.value === variantName)
    let supplementScheme = {}

    if (!currVariant) {
        supplementScheme = SupplementTemplate.find(temp => temp.value === templateName)?.work
    } else {
        supplementScheme = currVariant.work
    }
    return supplementScheme
}

export default workOutSlice.reducer

