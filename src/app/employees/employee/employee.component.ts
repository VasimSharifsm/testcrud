import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import {Employee, Country} from 'src/app/shared/employee.model';
import {EmployeeService} from 'src/app/shared/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empform : any;
  msg =null;
  
  allEmployees: Observable<Employee[]>;  
  allcountry: any;  
  EmpId = null;
  constructor(private fb : FormBuilder, private employeeService:EmployeeService) { }

  ngOnInit() {

    
    this.empform = this.fb.group({
      EmpName :['', [Validators.required]],
      Address :['', [Validators.required, Validators.minLength(5)]],
      Gender:['', [Validators.required]],
      isActive:[''],
      DateOfBirth:[''],
      CountryID:['']
    });
    this.loadallemp();
    this.getcountry();
  }
  onSubmit(){
    debugger;
    const employee = this.empform.value;  
    this.InsertEmp(employee);
    
  }
  InsertEmp(employee:Employee){
    if(this.EmpId == null){
      this.employeeService.InsertData(employee).subscribe(
        () => {
          this.msg = "Record Inserted";
          this.loadallemp();
          this.empform.reset();
        }
      );
    }else{
      employee.EmpId =this.EmpId;
      this.employeeService.UpdateEmployeeDetails(employee).subscribe(
        ()=>{
          this.msg = "Record Updated Successfully";
          this.loadallemp();
          this.empform.reset();
          this.EmpId = null;
        }
      );
    }
    
  }
  loadallemp(){
    this.allEmployees = this.employeeService.getalldata();
    
  }
  getcountry(){
    //console.log("get country")
    // this. = this.employeeService.getCountry();
    this.employeeService
    .getCountry().subscribe(
      data => {         
        if (data) {
          this.allcountry = data;
        }        
      },
      error => {
        console.log('failed to call api');
      }      
    );
  }
  LoadData(EmpId:string){
    //alert(EmpId);
    debugger;
   this.employeeService.GetIdData(EmpId).subscribe(em =>{
     console.log(em)
      this.EmpId = em.EmpId;  
      this.empform.controls['EmpName'].setValue(em.EmpName);
      this.empform.controls['Address'].setValue(em.Address);
      this.empform.controls['Gender'].setValue(em.Gender);
      this.empform.controls['isActive'].setValue(em.isActive);
      this.empform.controls['DateOfBirth'].setValue(em.DateOfBirth);
      this.empform.controls['CountryID'].setValue(em.CountryID);
  
    }
  
    );
  }
  DeleteEmployeeDetails(EmpId:string){
    if(confirm("Are you Sure want to delete it?")){
      debugger;
      this.employeeService.DeleteEmployeeDetails(EmpId).subscribe(
        ()=>{
          this.msg = 'Record Deleted Succefully';  
          this.loadallemp();
        }
      );
    }
  }
 
}
