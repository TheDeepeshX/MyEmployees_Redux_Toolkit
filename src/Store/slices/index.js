import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from "./EmployeeSlice";

const store=configureStore({
    reducer:{
        employee:EmployeeSlice
    }
})
export default store;