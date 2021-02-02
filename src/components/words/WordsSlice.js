import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const wordsAdapter = createEntityAdapter();

const initialState = wordsAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchWords = createAsyncThunk('words/fetchWords', async () => {
    return await httpGet(`${baseUrl}/words`);
});

export const deleteWordServer = createAsyncThunk('words/deleteWordServer', async (idWord) => {
    await httpDelete(`${baseUrl}/words/${idWord}`);
    return idWord;
});

export const addWordServer = createAsyncThunk('words/addWordServer', async (word) => {
    return await httpPost(`${baseUrl}/words`, word);
});

export const updateWordServer = createAsyncThunk('words/updateWordServer', async (word) => {
    return await httpPut(`${baseUrl}/words/${word.id}`, word);
});

export const wordsSlice = createSlice({
    name: 'words',
    initialState: initialState,
    extraReducers: {
       [fetchWords.pending]: (state, action) => {state.status = 'loading'},
       [fetchWords.fulfilled]: (state, action) => {state.status = 'loaded'; wordsAdapter.setAll(state, action.payload);},
       [fetchWords.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteWordServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteWordServer.fulfilled]: (state, action) => {state.status = 'deleted'; wordsAdapter.removeOne(state, action.payload);},
       [addWordServer.pending]: (state, action) => {state.status = 'loading'},
       [addWordServer.fulfilled]: (state, action) => {state.status = 'saved'; wordsAdapter.addOne(state, action.payload);},
       [updateWordServer.pending]: (state, action) => {state.status = 'loading'},
       [updateWordServer.fulfilled]: (state, action) => {state.status = 'saved'; wordsAdapter.upsertOne(state, action.payload);},
    },
})

export default wordsSlice.reducer

export const {
    selectAll: selectAllWords,
    selectById: selectWordsById,
    selectIds: selectWordsIds
} = wordsAdapter.getSelectors(state => state.words)
