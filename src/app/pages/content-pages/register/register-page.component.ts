import { Component, ViewChild ,OnInit, ViewContainerRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {CommonserviceService} from "../../../shared/commonservice.service"
import{ APIURL} from "../../../../URL"
import{UserDataServiceService} from '../../../shared/user-data-service.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as CryptoJS from 'crypto-js';
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {

  logoUrl=APIURL.Image_Path+"1t9Nyb68eNbvi3iNTZbjHfWZDK7suCpWz";
  logoUrlBig=APIURL.Image_Path+"18pqfKpUzYIlkX-w6QEhdRPBfAgJ-VQZn";
    adminToken = null;
    terms=false;
    payload={
        "User":{
            "Name":null,
          
         "EmailID":null,
         "Password":null
       }
    }
    filesToUpload: Array<File> = [];
    @ViewChild('f') registerForm: NgForm;
    @ViewChild('filectrl') fileInputVariable: any;
    constructor(private router: Router, private service :CommonserviceService,vcr: ViewContainerRef,
        private route: ActivatedRoute,private UserService:UserDataServiceService,public toastr: ToastsManager) { 
           
          this.toastr.setRootViewContainerRef(vcr);
          this.GetAdminToken()
        }
    //  On submit click, reset field value
    onSubmit() {
        this.registerForm.reset();
    }

    Signup()
    {

      try
      {
        if(this.terms&&this.payload.User.Name  && this.EmailValid(this.payload.User.EmailID) && this.payload.User.Password)
        {
          var FarePayload= this.payload;
          var pwd = CryptoJS.HmacMD5(FarePayload.User.Password, "H1veB0*l23$`^60030-rgvbkrdlvk38844").toString(CryptoJS.enc.Hex)
          FarePayload.User.Password= pwd;
          this.service.PostMethod (APIURL.CompanySignup, FarePayload,this.adminToken)
          .subscribe(data => {
  
  
              
      console.log(data);
        if(data){
  
          if(data.Response)
          {
              if(data.Response==1)
              {
               this.payload={
                  "User":{
                      "Name":null,
                    
                   "EmailID":null,
                   "Password":null
                 }
              }
                
                this.toastr.success(data.Message);;
  
                setTimeout(()=>{
                  this.router.navigateByUrl("pages/login")
                },2000)
  
                
             
  
              }
              else
              {
                this.toastr.error(data.Message);
  
              }
  
          }
          else
          {
            this.toastr.error(data);
          }
          
    
        }
        });
        }
         
        else
        {
          if(!this.payload.User.Name){
            this.toastr.error("Please Enter Name")
          }else if(!this.payload.User.EmailID){
            this.toastr.error("Please Enter EmailID");
          }else if(!this.EmailValid(this.payload.User.EmailID))
          {
            this.toastr.error("Please Enter valid Email ID");
          }
          
          if(!this.payload.User.Password){
            this.toastr.error("Please Enter Password");  
          }
          if(!this.terms)
          {
            this.toastr.error("Please check terms and conditions checkbox");
          }
        }
      }
      catch(error)
      {
        console.log(error.Message);
      }

     

    }
    
    GetAdminToken() {


      try {

        this.service.getMethod(APIURL.GetAdminToken, this.adminToken)
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
        
      } catch (error) {
        console.log(error)
      }

     
    }

    fileChangeEvent(fileInput: any) {
 
        console.log("file change event");
        //this.filesToUpload
       var fileUploaded  = <Array<File>>fileInput.target.files;
        if(this.checkIsImage(fileUploaded[0].name))
        {
         this.filesToUpload= fileUploaded;
         this.saveTicket();
        }
        else
        {
          this.removeFile();
        //  this.toastr.error("Only JPEG/JPG/PNG image are allowed to upload","oops!")
        }
      
      
      
          }
          removeFile()
          {
          
            this.fileInputVariable.nativeElement.value = "";
          }
          saveTicket()
{

    try{
        var formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        
        if(files.length>0)
        {
        for (var i = 0; i < files.length; i++) {
        formData.append("file" + i, files[i]);
        }
        
        
        
        formData.append("CompanyID", 1);
        //https://assetnestapi.herokuapp.com/api/
        this.service.UploadPostMethod("http://localhost:3000/api/"+"FileUploadDrive", formData)
        .subscribe(results => {
          //results= JSON.parse(results);
        if (results.Response == 1) {
         // this.toastr.success("uploaded successfully");
        //this.toastr.success(results.Message, 'Success!');
         var DocURL = results.Path;
         console.log(results);
         console.log(results.Response);
        //this.customerData.Icon=DocURL;
        //this.saveCustomer();
        //APIURL.API_IMAGE_LOCATION
        //this.tempImage=APIURL.API_IMAGE_LOCATION+DocURL;
        }
        else {
            console.log(results);
            
         // this.tempImage="";
        //this.toastr.error(results.Message);
        }
        })
        }
        else
        {
          //this.saveCustomer();
        }
        
    }
    catch(error)
    {
        console.log(error);
    }





}
checkIsImage(uploadUrl:String) {
 

    var nameSplit= uploadUrl.split('.');
    var fileExtension = nameSplit[nameSplit.length-1];
  
    if(fileExtension.toUpperCase()=="JPEG"||fileExtension.toUpperCase()=="JPG"||fileExtension.toUpperCase()=="PNG")
    {
      return true; 
  
    }
    else
    {
      return false;
    }
  
  }
  EmailValid(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

  }
}