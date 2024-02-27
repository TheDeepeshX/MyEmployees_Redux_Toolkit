import { createSlice } from "@reduxjs/toolkit";
const userSclice=createSlice({
    name:'Employee',
    initialState:{},
    reducers:{
        addEmployee(state,action){
            state[action.payload[0]]=action.payload[1]
        }, 
        editEmployee(state,action){
            state[action.payload[0]]=action.payload[1]
        },
        RemoveEmployee(state,action){
           delete state[action.payload[0]]
        },
        clearAllEmployee(state,action)
        {
            return {};
        }
    }
}) 
console.log(userSclice.actions);
export default userSclice.reducer
export const{addEmployee,editEmployee,RemoveEmployee,clearAllEmployee}=userSclice.actions