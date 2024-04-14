import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";

const rootReducer = combineReducers({
  search: searchReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}