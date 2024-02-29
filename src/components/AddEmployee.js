import React from "react";
import uuid4 from "uuid4";
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../Store/slices/EmployeeSlice";

function AddEmployee(){
  var dispatch = useDispatch();
  var navigate=useNavigate();
const [Employeename,setEmployeename]=useState('');
const [Employeepost,setEmployeepost]=useState('');
const [Employeesalary,setEmployeesalary]=useState('');
const [Picture,setPicture]=useState('logo192.png')

const handlePicture=(event)=>{
    setPicture(URL.createObjectURL(event.target.files[0]))
  }

  const handleadd = () => {
    alert("Add Employee work")
    var unique_id = uuid4();
    var Employeeid = unique_id.slice(0, 5);
    var body = {
      Employeeid,
      Employeename,
      Employeepost,
      Employeesalary,
      Picture
    };
    console.log("data to dispatch >>", body);
    dispatch(addEmployee(Employeeid,body));
    setEmployeename("");
    setEmployeepost("");
    setEmployeesalary("");
    setPicture('logo192.png')
  };
return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#b2bec3",
            display: "flex",
            justifyContent:'center',
            alignItems:'center'
          }}>  
          <div style={{ width: 500, height: "auto", padding: 10, margin: 10 }}>
             <p style={{fontSize:20,fontWeight:500,color:'#000',justifyContent:'center'}}>Add Employee</p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee Name"
                  onChange={(e) => setEmployeename(e.target.value)}
                  value={Employeename}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee Post"
                  onChange={(e) => setEmployeepost(e.target.value)}
                  value={Employeepost}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Employee Salary"
                  onChange={(e) => setEmployeesalary(e.target.value)}
                  value={Employeesalary}
                />
              </Grid>
              <Grid item xs={6}>
                <Button component="label" >
                  <input onChange={handlePicture} multiple  type="file" hidden accept="image/*"  />
                 Upload Picture
                </Button>
              </Grid>
              <Grid item xs={6}>
                <img src={`${Picture}`} style={{width:100,height:'auto',background:'white',borderRadius:10}} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth onClick={handleadd}>
                  Add Employee
                </Button>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={()=>navigate('/displayallemployee')}>
                  Display All Employee
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>)
}

export default AddEmployee;