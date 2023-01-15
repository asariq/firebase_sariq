import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore';
import { Alert } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/config";

export const signUp = createAsyncThunk(
    'signUp',
    async (arg) => {

        createUserWithEmailAndPassword(auth, arg.email, arg.password)
            .then((userCredential) => {
                Alert.alert("Success","Sign Up Successful now move to login to enter app")
            })
            .catch((error) => {

                const errorMessage = error.message;
                Alert.alert("Sign Up failed", errorMessage)
            })
    },
);

export const getDbData = createAsyncThunk(
    'getDbData',
    async () => {
        try {
            const data = await firestore()
                .collection('market')
                .get()
                .then(querySnapshot => {
                    return querySnapshot
                });
            return data
        } catch (err) {
            Alert.alert("failed to get Data");
        }
    },
);

export const updateData = createAsyncThunk(
    'updateData',
    async (arg) => {

        try {
            const data = await firestore()
                .collection('market')
                .doc(arg.id)
                .update(arg);
            Alert.alert("updated Product")
        } catch (err) {
            Alert.alert("not updated Product")
        }

    },

);

export const deleteData = createAsyncThunk(
    'deleteData',
    async (itemId) => {

        try {
            await firestore()
                .collection('market')
                .doc(itemId)
                .delete()
            Alert.alert("User deleted")
        } catch (err) {
            Alert("User Not deleted")
        }

    },

);

export const addData = createAsyncThunk(
    'addData',
    async (item) => {
        try {
            await firestore()
                .collection('market')
                .add(item)
            Alert.alert("product Added")
        } catch (err) {
            Alert.alert("product not Added")
        }

    },
);


export const apiSlice = createSlice({
    name: 'api',
    initialState: {

        dbData: [],
        isSucess: false,
        loading: false,
    },
    reducers: {},
    extraReducers: {

        [getDbData.pending]: (state) => {
            state.loading = true

        },
        [getDbData.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isSucess = true
            state.dbData = payload

        },
        [getDbData.rejected]: (state) => {
            state.loading = false
            state.isSucess = false
        },
        [updateData.pending]: (state) => {
            state.loading = true

        },
        [updateData.fulfilled]: (state) => {
            state.loading = false
            state.isSucess = true

        },
        [updateData.rejected]: (state) => {
            state.loading = false
            state.isSucess = false
        },
        [deleteData.pending]: (state) => {
            state.loading = true

        },
        [deleteData.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.isSucess = true
            state.deleted = payload

        },
        [deleteData.rejected]: (state) => {
            state.loading = false
            state.isSucess = false
        },

    },

})


export default apiSlice.reducer