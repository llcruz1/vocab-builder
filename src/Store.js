import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './components/words/WordsSlice'
import languagesReducer from './components/languages/LanguagesSlice'

export const store = configureStore({
    reducer: {
        words: wordsReducer,
        languages: languagesReducer,
    }
})