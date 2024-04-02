import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ApiserviceService} from '../apiservice.service' ;
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
     constructor(private service:ApiserviceService,private router:ActivatedRoute) { } 
     errormsg:any;
     successmsg:any;
     getparamid:any;


     ngOnInit(): void {
      
      this.getparamid = this.router.snapshot.paramMap.get('id');
      if(this.getparamid){
        this.service.getSingleData(this.getparamid).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.patchValue({
            productid:res.data[0].productid,
            productname:res.data[0].productname,
            categoryid:res.data[0].categoryid,
            categoryname:res.data[0].categoryname
          });
  
        });

      }
     
       
     }
     userForm = new FormGroup({
       'productid':new FormControl('',Validators.required),
       'productname':new FormControl('',Validators.required),
       'categoryid':new FormControl('',Validators.required),
       'categoryname':new FormControl('',Validators.required)
     })
       //create newuser
     userSubmit(){
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.reset();
          this.successmsg = res.message;
        })
      }
      else{
        this.errormsg = 'all field is required!';
      }
     }

     //updatedata
     userUpdate(){
        console.log(this.userForm.value,'updatedform');


        if(this.userForm.valid){
          this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
            console.log(res,'resupdated');
            this.successmsg = res.message;
          })
        } else{
                this.errormsg='all field is required';
        }
     }
}
