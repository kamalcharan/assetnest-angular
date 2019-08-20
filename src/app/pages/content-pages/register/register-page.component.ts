import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {CommonserviceService} from "../../../shared/commonservice.service"
import{ APIURL} from "../../../../URL"
import{UserDataServiceService} from '../../../shared/user-data-service.service'


import * as CryptoJS from 'crypto-js';
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {


    payload={
        "User":{
            "Name":null,
          
         "EmailID":null,
         "Password":null
       }
    }
    @ViewChild('f') registerForm: NgForm;
    constructor(private router: Router, private service :CommonserviceService,
        private route: ActivatedRoute,private UserService:UserDataServiceService) { }
    //  On submit click, reset field value
    onSubmit() {
        this.registerForm.reset();
    }

    Signup()
    {

        var FarePayload= this.payload;
        var pwd = CryptoJS.HmacMD5(FarePayload.User.Password, "H1veB0*l23$`^60030-rgvbkrdlvk38844").toString(CryptoJS.enc.Hex)
        FarePayload.User.Password= pwd;
        this.service.PostMethod (APIURL.CompanySignup, FarePayload)
        .subscribe(data => {


            
    console.log(data);
      if(data){

        if(data.Response)
        {
            if(data.Response==1)
            {

                this.router.navigateByUrl("pages/login")
           

            }
            else
            {

            }

        }
        else
        {

        }
        
  
      }
      });

    }
}