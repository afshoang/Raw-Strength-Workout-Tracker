import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    cycle: [],
    // status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    // error: null
}

export const cycleSlice = createSlice({
    name: 'cycle',
    initialState,
    reducers: {
        cycleCreated: {
            reducer(state, action) {
                const updatedStatusCycles = state.cycle.map(cy => {
                    cy.status = 1
                    return cy
                })
                state.cycle = updatedStatusCycles.concat(action.payload)
            },
            prepare(data) {
                return {
                    payload: {
                        id: nanoid(),
                        createdAt: new Date().toISOString(),
                        status: 0, // 0 doing 1 done
                        ...data,
                    }
                }
            }
        },
        cycleUpdated: {
            reducer(state, action) {
                const idx = state.cycle.findIndex(cy => action.payload.id === cy.id)
                if (idx > -1) {
                    state.cycle[idx] = action.payload
                }
            },
            prepare(data) {
                return {
                    payload: {
                        updatedAt: new Date().toISOString(),
                        ...data,
                    }
                }
            }
        },
        cycleDeleted: {
            reducer(state, action) {
                const idx = state.cycle.findIndex(cy => action.payload === cy.id)
                if (idx > -1) {
                    state.cycle.splice(idx, 1)
                }
            }
        }
    },
})

export const { cycleCreated, cycleUpdated, cycleDeleted } = cycleSlice.actions

// SELECTOR
// export const selectCycleStatus = (state) => state.cycle.status 
// export const selectCycleError = (state) => state.cycle.error 
export const selectAllCycle = (state) => state.cycle.cycle // need to change name 😏😏😏
export const selectCycle = (state) => state.cycle.cycle?.find(cy => cy.status === 0) // need to change name 😏😏😏
export const selectCycleById = (state, id) => state.cycle.cycle?.find(cy => cy.id === id)

export default cycleSlice.reducer

