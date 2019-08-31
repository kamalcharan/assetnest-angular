import { Component, ViewChild , ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../../../shared/commonservice.service"
import { APIURL } from "../../../../URL"
import { UserDataServiceService } from '../../../shared/user-data-service.service'
import * as CryptoJS from 'crypto-js';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {
   
    logoUrl=APIURL.Image_Path+"1t9Nyb68eNbvi3iNTZbjHfWZDK7suCpWz";
    logoUrlBig=APIURL.Image_Path+"18pqfKpUzYIlkX-w6QEhdRPBfAgJ-VQZn";
    payload = {
        Email: null,
        Password: null
    };
    adminToken = null;

    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router, private service: CommonserviceService,
        private route: ActivatedRoute, private UserService: UserDataServiceService,
        vcr: ViewContainerRef,
        public toastr: ToastsManager

        ) {
            this.toastr.setRootViewContainerRef(vcr);
        this.GetAdminToken()
    }

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
    login() {

        if(this.payload.Email&&this.payload.Password)
        {
            var FarePayload = this.payload;
            var pwd = CryptoJS.HmacMD5(FarePayload.Password, "H1veB0*l23$`^60030-rgvbkrdlvk38844").toString(CryptoJS.enc.Hex)
            FarePayload.Password = pwd;
            this.service.PostMethod(APIURL.ValidateLogin, FarePayload, this.adminToken)
                .subscribe((data: any)=> {
    
    
    
                    console.log(data);
                    if (data) {
    
                        if (data.Response) {
                            if (data.Response == 1) {
    
                                var Responsedata = data.Data;
                                var userObject = {
                                    "_id": data.Data._id,
                                    "Name": data.Data.Name,
                                    "EmailID": data.Data.EmailID,
                                    "Token":data.TokenData.Token,
                                    "IsLive":null,
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
    
                                this.toastr.success(data.Message);;
    
                                setTimeout(()=>{
                                    this.router.navigateByUrl("/pages/Environment")
                                },2000)
                               
    
                               // this.router.navigateByUrl("/dashboard/dashboard1");
    
                            }
                            else {
                                this.toastr.error(data.Message);;
                            }
    
                        }
                        else {
                            this.toastr.error(data);;
                        }
    
    
                    }
                }
                ,
                error=>{
                    console.log(error);
                });
        }
        else
        {

            if(!this.payload.Email)
            {
                this.toastr.error("Enter Email ID");
            }
            if(!this.payload.Password)
            {
                this.toastr.error("Enter password");
            }
        }
       
       
    }

    GetAdminToken() {

        this.service.getMethodWithoutToken(APIURL.GetAdminToken)
            .subscribe(data => {
                console.log(data);
                if (data) {

                    if (data.Response) {
                        if (data.Response == 1) {

                            this.adminToken = data.Data.Token

                        }
                        else {

                        }

                    }
                    else {

                    }


                }
            });
    }
}
