import * as React from "react";
import Swal from 'sweetalert2'
import { useSelector,useDispatch } from "react-redux"
import MaterialTable from "@material-table/core";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { editEmployee ,RemoveEmployee} from "../Store/slices/EmployeeSlice";

export default function DisplayAllEmployee() {
  var dispatch=useDispatch()

    const data=useSelector((state)=>{
      return state.employee
    })
    var list=Object.values(data)
    const [refresh,setRefresh]=useState(false)
    const [Employeeid,setEmployeeid]=useState('');
    const [Employeename,setEmployeename]=useState('');
    const [Employeepost,setEmployeepost]=useState('');
    const [Employeesalary,setEmployeesalary]=useState('');
    const [Picture,setPicture]=useState('')
    const [open,setopen]=useState(false)

    const handleEditTask=(data)=>{
    setEmployeeid(data.Employeeid)
    setEmployeename(data.Employeename)
    setEmployeepost(data.Employeepost)
    setEmployeesalary(data.Employeesalary)
    setPicture(data.Picture)
    setopen(true)
    }
    const handlePicture=(event)=>{
      setPicture(URL.createObjectURL(event.target.files[0]))
    }

    const handleUpdate=()=>{
      var body={
        Employeeid,
        Employeename,
        Employeepost,
        Employeesalary,
        Picture,
      }
      dispatch(editEmployee([Employeeid,body]));
      setopen(false)
    }
    const handleDelete=(data)=>{
    var id=data.Employeeid
    Swal.fire({
      title: "Do you want to Remove?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Remove ",
      denyButtonText: `Don't Remove`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(RemoveEmployee([id]))
        Swal.fire("Remove!", "Employee", "success");
        setRefresh(true)
      } else if (result.isDenied) {
        Swal.fire("Cancle Remove", "", "info");
      }
    });
   }

const handleClose = () => {
  setopen(false);
};

    //dioloag 
  const showDiloagEmployee = () => {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Employee Edit."}
          </DialogTitle>
          <DialogContent>
          <Grid container spacing={2}>
              <Grid item xs={12} style={{marginTop:5}}>
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
                <Button variant="contained" fullWidth onClick={handleUpdate}>
                  Update Employee
                </Button>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  };
  // end diolg
 var navigate=useNavigate()
  const Display = () => {
    return (
      <MaterialTable
        title="Task Details"
        columns={[
          { title: "Employee ID", field: "Employeeid" },
          { title: "Employee Name", field: "Employeename" },
          { title: "Employee Post", field: "Employeepost" },
          { title: "Employee Salary", field: "Employeesalary" },
          { title: "image", render:(rowData)=><img src={`${rowData.Picture}`} style={{width:50,height:'auto',background:'white',borderRadius:10}} /> },
          
        ]}
        data={list}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Task",
            onClick: (event,rowData) => handleEditTask(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete Task",
            onClick: (event, rowData) =>handleDelete(rowData),
          },
          {
            icon: "add",
            tooltip: "Add Task",
            isFreeAction: true,
            onClick: (event, rowData) =>navigate('/Addemployee'),
          }
        ]}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b2bec3",
        height:'100vh'
      }}
    >
      {Display()}
    {showDiloagEmployee()}
    </div>
  );
}
