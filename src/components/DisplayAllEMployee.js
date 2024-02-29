import * as React from "react";
import Swal from 'sweetalert2'
import { useSelector,useDispatch } from "react-redux"
import MaterialTable from "@material-table/core";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  Alert,
} from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllEmployee() {
  var dispatch=useDispatch()

    const data=useSelector((state)=>{
      return state.employee
    })
    var list=Object.values(data)
    console.log("data in Display featch",list);
    const [refresh,setRefresh]=useState(false)
    const [Employeeid,setEmployeeid]=useState('');
    const [Employeename,setEmployeename]=useState('');
    const [Employeepost,setEmployeepost]=useState('');
    const [Employeesalary,setEmployeesalary]=useState('');
    const [Picture,setPicture]=useState('')
    const [open,setopen]=useState(false)

    const handleEditTask=(data)=>{
    setEmployeeid(data.taskid)
    setEmployeename(data.taskname)
    setEmployeepost(data.AssignDate)
    setEmployeesalary(data.finishDate)
    setPicture(data.Picture)
    setopen(true)
    }

    const handleUpdate=()=>{
      var body={
        Employeeid,
        Employeename,
        Employeepost,
        Employeesalary,
        Picture,
      }
      dispatch({ type: "EDIT-TASK", payload: [Employeeid, body] });
    }
    const handleDelete=(data)=>{
    var id=data.taskid
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch({type:"DELETE-TASK",payload:[id]})
        Swal.fire("Deleted!", "Task", "success");
        setRefresh(true)
      } else if (result.isDenied) {
        Swal.fire("Cancle Delete", "", "info");
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
            {"Product Edit Dialog"}
          </DialogTitle>
          <DialogContent>
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
              {/* <Grid item xs={6}>
                <Button component="label" >
                  <input onChange={handlePicture} multiple  type="file" hidden accept="image/*"  />
                 Upload Picture
                </Button>
              </Grid>
              <Grid item xs={6}>
                <img src={`${Picture}`} style={{width:100,height:'auto',background:'white',borderRadius:10}} />
              </Grid> */}
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
