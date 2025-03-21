import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name:"userSlice",
    initialState:{
        value : {role:undefined,isLoginStatus:false,user:undefined,token:undefined},
        business:{business:undefined}
    },
    reducers:{
        checkUserStatus:(state,action)=>{
            var userData = action.payload
            state.value = userData
        },
        checkBusiness:(state,action)=>{
            var businessDetails = action.payload
            state.business = businessDetails
        }
    }
})

export const {checkUserStatus,checkBusiness} = slice.actions 
export default slice.reducer