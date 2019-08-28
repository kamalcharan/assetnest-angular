import { Component,OnInit, ViewChild,ViewContainerRef } from '@angular/core';
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

  Userdata:any;
  payload={
    
      "_id" : null, 
      "CompanyID" : null, 
      "Name" : null, 
      "Alias_Name" : null, 
      "LogoURL" : null, 
      "Country" : null, 
      "State" : null, 
      "City" : null, 
      "Address" : null, 
      "Pincode" : null, 
      "CompanyType" : null, 
      "BusinessModelStatus" : null, 
    
  
  }
  constructor(private modalService: NgbModal,private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    vcr: ViewContainerRef,public toastr: ToastsManager) { }

  ngOnInit() {
    
    this.Userdata= JSON.parse(this.UserService.getData());
    this.getCompanyData();
  }

  getCompanyData()
  {

    var dataPayload={
      CompanyID:this.Userdata.Company._id
    }
    this.service.PostMethod (APIURL.GetCompanyDetails, dataPayload,this.Userdata.Token)
    .subscribe(data => {


        
console.log(data);
  if(data){

    if(data.Response)
    {
        if(data.Response==1)
        {
         
          var ResponseCompanyData= data.Data;


         
          this.payload._id  =ResponseCompanyData._id
          this.payload.CompanyID=ResponseCompanyData.CompanyID
          this.payload.Name=ResponseCompanyData.Name
          this.payload.Alias_Name =ResponseCompanyData.Alias_Name
          this.payload.LogoURL=ResponseCompanyData.LogoURL
          this.payload.Country =ResponseCompanyData.Country
          this.payload.State =ResponseCompanyData.State
          this.payload.City=ResponseCompanyData.City
          this.payload.Address =ResponseCompanyData.Address 
          this.payload.Pincode=ResponseCompanyData.CompanyID
          this.payload.CompanyType=ResponseCompanyData.CompanyType
          this.payload.BusinessModelStatus=ResponseCompanyData.BusinessModelStatus
       
          
       

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

  UpdateCompanyData()
  {
    
  }

}
