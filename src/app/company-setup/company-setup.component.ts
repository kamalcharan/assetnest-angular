import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss']
})
export class CompanySetupComponent implements OnInit {

  CompanyTempImage = null;
  Userdata: any;
  payload = {
Company:
{
  id: null,
    CompanyID: null,
    Name: null,
    Alias_Name: null,
    LogoURL: null,
    Country: null,
    State: null,
    City: null,
    Address: null,
    Pincode: null,
    CompanyType: null,
    BusinessModelStatus: null
}
  


  }
  filesToUpload: Array<File> = [];
  @ViewChild('f') registerForm: NgForm;
  @ViewChild('filectrl') fileInputVariable: any;
  constructor(private modalService: NgbModal, private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    vcr: ViewContainerRef, public toastr: ToastsManager) { }

  ngOnInit() {

    this.Userdata = JSON.parse(this.UserService.getData());
    this.getCompanyData();
  }

  getCompanyData() {

    var dataPayload = {
      CompanyID: this.Userdata.Company._id
    }
    this.service.PostMethod(APIURL.GetCompanyDetails, dataPayload, this.Userdata.Token)
      .subscribe(data => {



        console.log(data);
        if (data) {

          if (data.Response) {
            if (data.Response == 1) {

              var ResponseCompanyData = data.Data;



              this.payload.Company.id = ResponseCompanyData._id
              this.payload.Company.CompanyID = ResponseCompanyData.CompanyID
              this.payload.Company.Name = ResponseCompanyData.Name
              this.payload.Company.Alias_Name = ResponseCompanyData.Alias_Name
              this.payload.Company.LogoURL = ResponseCompanyData.LogoURL
              this.payload.Company.Country = ResponseCompanyData.Country
              this.payload.Company.State = ResponseCompanyData.State
              this.payload.Company.City = ResponseCompanyData.City
              this.payload.Company.Address = ResponseCompanyData.Address
              this.payload.Company.Pincode = ResponseCompanyData.Pincode
              this.payload.Company.CompanyType = ResponseCompanyData.CompanyType+"";
              this.payload.Company.BusinessModelStatus = ResponseCompanyData.BusinessModelStatus
              this.CompanyTempImage = APIURL.Image_Path + this.payload.Company.LogoURL



            }
            else {
              this.toastr.error(data.Message);

            }

          }
          else {
            this.toastr.error(data);
          }


        }
      });
  }

  UpdateCompanyData() {

    console.log(this.payload);

    if(this.payload.Company.CompanyType&&this.payload.Company.Address&&this.payload.Company.Alias_Name
      &&this.payload.Company.City&&this.payload.Company.Country&&this.payload.Company.Name&&
      this.payload.Company.Pincode&&this.payload.Company.State)
      {

        this.service.PostMethod(APIURL.GetCompanyUpdate, this.payload, this.Userdata.Token)
        .subscribe(data => {
  
  
  
          console.log(data);
          if (data) {
  
            if (data.Response) {
              if (data.Response == 1) {
  
                this.toastr.success(data.Message);

                this.getCompanyData();
                // var ResponseCompanyData = data.Data;
  
  
  
                // this.payload.id = ResponseCompanyData._id
                // this.payload.CompanyID = ResponseCompanyData.CompanyID
                // this.payload.Name = ResponseCompanyData.Name
                // this.payload.Alias_Name = ResponseCompanyData.Alias_Name
                // this.payload.LogoURL = ResponseCompanyData.LogoURL
                // this.payload.Country = ResponseCompanyData.Country
                // this.payload.State = ResponseCompanyData.State
                // this.payload.City = ResponseCompanyData.City
                // this.payload.Address = ResponseCompanyData.Address
                // this.payload.Pincode = ResponseCompanyData.CompanyID
                // this.payload.CompanyType = ResponseCompanyData.CompanyType
                // this.payload.BusinessModelStatus = ResponseCompanyData.BusinessModelStatus
                // this.CompanyTempImage = APIURL.Image_Path + this.payload.LogoURL
  
  
  
              }
              else {
                this.toastr.error(data.Message);
  
              }
  
            }
            else {
              this.toastr.error(data);
            }
  
  
          }
        });
      }
      else
      {
        if(!this.payload.Company.Name)
        {
          this.toastr.error("Company Name is required");
        }
        else 
        if(!this.payload.Company.Alias_Name)
        {
          this.toastr.error("Company  Alias Name is required");
        }
        
        else if(!this.payload.Company.Country)
        {
          this.toastr.error("Country is required");
        }
        
        else if(!this.payload.Company.State)
        {
          this.toastr.error("State is required");
        }
        
        else if(!this.payload.Company.City)
        {
          this.toastr.error("City is required");
        }
        else 
        
        if(!this.payload.Company.Pincode)
        {
          this.toastr.error("Pincode is required");
        }
        else 
        
        if(!this.payload.Company.Address)
        {
          this.toastr.error("Address is required");
        }

      }
      
      

  }
  fileChangeEvent(fileInput: any) {

    console.log("file change event");
    //this.filesToUpload
    var fileUploaded = <Array<File>>fileInput.target.files;
    if (this.checkIsImage(fileUploaded[0].name)) {
      this.filesToUpload = fileUploaded;
      this.saveTicket();
    }
    else {
      this.removeFile();
      this.toastr.error("Only JPEG/JPG/PNG image are allowed to upload")
    }



  }
  removeFile() {

    this.fileInputVariable.nativeElement.value = "";
  }
  saveTicket() {

    try {
      var formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;

      if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          formData.append("file" + i, files[i]);
        }



        formData.append("CompanyID", this.Userdata.Company._id);
        //https://assetnestapi.herokuapp.com/api/
        this.service.UploadPostMethod(APIURL.BaseUrl + "FileUploadDrive", formData)
          .subscribe(results => {
            //results= JSON.parse(results);
            if (results.Response == 1) {
              this.toastr.success("uploaded successfully");
              //this.toastr.success(results.Message, 'Success!');
              var DocURL = results.Path;
              console.log(results);
              console.log(results.Response);
              this.payload.Company.LogoURL = DocURL;
              //this.saveCustomer();
              //APIURL.API_IMAGE_LOCATION
              this.CompanyTempImage = APIURL.Image_Path + DocURL;
            }
            else {
              console.log(results);

              // this.tempImage="";
              //this.toastr.error(results.Message);
            }
          })
      }
      else {
        //this.saveCustomer();
      }

    }
    catch (error) {
      console.log(error);
    }





  }
  checkIsImage(uploadUrl: String) {


    var nameSplit = uploadUrl.split('.');
    var fileExtension = nameSplit[nameSplit.length - 1];

    if (fileExtension.toUpperCase() == "JPEG" || fileExtension.toUpperCase() == "JPG" || fileExtension.toUpperCase() == "PNG") {
      return true;

    }
    else {
      return false;
    }

  }
}
