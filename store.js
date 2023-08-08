import { combineReducers } from "redux"
import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import cycleReducer from './slices/cycleSlice'
import workOutReducer from './slices/workOutSlice'
import settingReducer from './slices/settingSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
    cycle: cycleReducer,
    workOut: workOutReducer,
    setting: settingReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

let persistor = persistStore(store)

export { store, persistor }