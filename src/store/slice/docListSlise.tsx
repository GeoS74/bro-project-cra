import { createSlice } from "@reduxjs/toolkit";

const docListSlice = createSlice({
    name: "docList",
    initialState: {
        setShowForm: undefined,
         addDoc: undefined
    },
    reducers: {
        setDocList: state => {
            state.theme === "dark" ? state.theme = "light" : state.theme = "dark"
            document.documentElement.dataset.theme = state.theme;
            localStorage.setItem("theme", state.theme);
        },

        getDocList: state => {state}
    },
});

export const {setDocList} = docListSlice.actions

export default docListSlice.reducer