import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpPut, httpGet, httpPost} from '../../utils'
import {baseUrl} from '../../baseUrl'

const languagesAdapter = createEntityAdapter();

const initialState = languagesAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
    return await httpGet(`${baseUrl}/languages`);
});

export const deleteLanguageServer = createAsyncThunk('languages/deleteLanguageServer', async (idLanguage) => {
    await httpDelete(`${baseUrl}/languages/${idLanguage}`);
    return idLanguage;
});

export const addLanguageServer = createAsyncThunk('languages/addLanguageServer', async (language) => {
    return await httpPost(`${baseUrl}/languages`, language);
});

export const updateLanguageServer = createAsyncThunk('languages/updateLanguageServer', async (language) => {
    return await httpPut(`${baseUrl}/languages/${language.id}`, language);
});

export const languagesSlice = createSlice({
    name: 'languages',
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {state.status = action.payload}
    },
    extraReducers: {
       [fetchLanguages.pending]: (state, action) => {state.status = 'loading'},
       [fetchLanguages.fulfilled]: (state, action) => {state.status = 'loaded'; languagesAdapter.setAll(state, action.payload);},
       [fetchLanguages.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteLanguageServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteLanguageServer.fulfilled]: (state, action) => {state.status = 'deleted'; languagesAdapter.removeOne(state, action.payload);},
       [addLanguageServer.pending]: (state, action) => {state.status = 'loading'},
       [addLanguageServer.fulfilled]: (state, action) => {state.status = 'saved'; languagesAdapter.addOne(state, action.payload);},
       [updateLanguageServer.pending]: (state, action) => {state.status = 'loading'},
       [updateLanguageServer.fulfilled]: (state, action) => {state.status = 'saved'; languagesAdapter.upsertOne(state, action.payload);},
    },
})

export const { setStatus } = languagesSlice.actions

export default languagesSlice.reducer

export const {
    selectAll: selectAllLanguages,
    selectById: selectLanguagesById,
    selectIds: selectLanguagesIds
} = languagesAdapter.getSelectors(state => state.languages)
