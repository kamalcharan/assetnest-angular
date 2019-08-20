import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {CommonserviceService} from "../../../shared/commonservice.service"
import{ APIURL} from "../../../../URL"
import{UserDataServiceService} from '../../../shared/user-data-service.service'
import * as CryptoJS from 'crypto-js';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
    payload={
        Email:null,
        Password:null
    }

    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router, private service :CommonserviceService,
        private route: ActivatedRoute,private UserService:UserDataServiceService) { }

    // On submit button click    
    onSubmit() {
        this.loginForm.reset();
    }
    
    // On Forgot password link click
   // //
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
    login()
    {
    //     this.service.PostMethod('/api/MUser/LogIn',this.payload)
    //     .subscribe(data => {
    //   console.log("data",data);
    //   if(data.Data){
    //       this.toastr.success(data.Message);
    //       this.UserService.logoutUser();
    //       this.UserService.setData({
    //           UserNumber:data.Data[0].UserNumber,
    //     UserCode:data.Data[0].UserCode,
    //     Name:data.Data[0].Name,
    //     Phone:data.Data[0].Phone,
    //     EmailID:data.Data[0].EmailID,
    //     Address:data.Data[0].Address,
    //     City:data.Data[0].City,
    //     GeoLocation:data.Data[0].GeoLocation,
    //     UserType:data.Data[0].UserType,
    //     UserID:data.Data[0]._id,
    //     Password:data.Data[0].Password,
    //     PrimaryOAuthID:data.Data[0].PrimaryOAuthID
    //         })
    //       this.router.navigate(['Dashboard'], { relativeTo: this.route.parent });
  
    //   }else{
    //       this.toastr.error(data.Message);
    //   }
    //   });
    var FarePayload= this.payload;
    var pwd = CryptoJS.HmacMD5(FarePayload.Password, "H1veB0*l23$`^60030-rgvbkrdlvk38844").toString(CryptoJS.enc.Hex)
    FarePayload.Password= pwd;
        this.service.PostMethod (APIURL.ValidateLogin, FarePayload)
        .subscribe(data => {


            
    console.log(data);
      if(data){

        if(data.Response)
        {
            if(data.Response==1)
            {

                var Responsedata= data.Data;
              var userObject=  {
                    "_id": data.Data._id,
                    "Name": data.Data.Name,
                    "EmailID": data.Data.EmailID,
                    "Company": {
                        "CompanyID": data.Data.CompanyID.CompanyID,
                        "Name": data.Data.CompanyID.Name,
                        "Alias_Name": data.Data.CompanyID.Alias_Name,
                        "LogoURL": data.Data.CompanyID.LogoURL,
                        "Country": data.Data.CompanyID.Country,
                        "State": data.Data.CompanyID.State,
                        "City": data.Data.CompanyID.City,
                        "Address": data.Data.CompanyID.Address,
                        "Pincode": data.Data.CompanyID.Pincode,
                        "CompanyType": data.Data.CompanyID.CompanyType,
                        "BusinessModelStatus": data.Data.CompanyID.BusinessModelStatus,
                        "Status": data.Data.CompanyID.Status,
                        "_id": data.Data.CompanyID._id
                    },
                    "Status": data.Data.Status
                  }

                  this.UserService.logoutUser();
                  this.UserService.setData(userObject);

                  this.router.navigateByUrl("/dashboard/dashboard1");

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