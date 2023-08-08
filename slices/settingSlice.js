import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    rest: {
        timer: [160, 170, 180, 190], // warmup, main, supplemental, assistance
        sound: true
    }
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        saveRestTimer: (state, action) => {
            state.rest.timer[action.payload.indexTimer] = action.payload.seconds
        }
    }
})

export const { saveRestTimer } = settingSlice.actions

// SELECTOR
export const selectSetting = (state) => state.setting

export default settingSlice.reducer

