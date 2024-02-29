import { createSlice } from "@reduxjs/toolkit";
const userSclice=createSlice({
    name:'Employee',
    initialState:{},
    reducers:{
        addEmployee(state,action){
            console.log("state>>",state,"action >>",action);
            state[action.payload[0]]=action.payload[1]
        }, 
        editEmployee(state,action){
            console.log(state,action);
            state[action.payload[0]]=action.payload[1]
        },
        RemoveEmployee(state,action){
            console.log(state,action);
           delete state[action.payload[0]]
        },
        clearAllEmployee(state,action)
        {
            console.log(state,action);
            return {};
        }
    }
}) 
console.log(userSclice.actions);
export default userSclice.reducer
export const{addEmployee,editEmployee,RemoveEmployee,clearAllEmployee}=userSclice.actions