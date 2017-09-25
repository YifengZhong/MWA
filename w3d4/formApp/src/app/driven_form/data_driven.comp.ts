import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray
  } from "@angular/forms";
  import {Http,Response,RequestOptions,Headers} from "@angular/http"
  import {HttpSrv} from "../httpSrv/httpSrv.comp"

@Component({
  selector: 'data-driven',
  templateUrl: 'data-driven.component.html',
})
export class DrivenFormComponent {
  myForm: FormGroup;
  name:String = "";
  email:String = "";
  postData:String = "";
  constructor(private formBuilder:FormBuilder,public httpSrv:HttpSrv){
    this.myForm = formBuilder.group({
        'username':['',[Validators.required, this.exampleValidator]],
        'email': ['', [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'postText':['', Validators.required]
    })
  }
  exampleValidator(control:FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') {
      return {example: true};
    }
    return null;
  }
  onSubmit() {
    console.log(this.myForm);
  }  
  onGetData() {

    this.httpSrv.getMyData().subscribe(
      response => {
        let data = response.json();
        this.email = data.email;
        this.name = data.username;
      },
      error => console.error(error),
      null
    );
    this.httpSrv.getPostData().subscribe(
      response => {
        let postData1 = response.json();
        postData1.forEach(x=>{this.postData= this.postData + x.title;});
        console.log(this.postData);
      },
      error => console.error(error),
      null
    );

  }
}