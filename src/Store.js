import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './components/words/WordsSlice'

export const store = configureStore({
    reducer: {
        words: wordsReducer,
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})