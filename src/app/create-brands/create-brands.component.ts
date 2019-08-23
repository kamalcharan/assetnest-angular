import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{UserDataServiceService} from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL"
@Component({
  selector: 'app-create-brands',
  templateUrl: './create-brands.component.html',
  styleUrls: ['./create-brands.component.scss']
})
export class CreateBrandsComponent implements OnInit {
UserData: any;
closeResult: string;
CreateCompanyBrandMapping = {
  Name: null,
  DisplayName: null,
  Icon: null,
  BrandID: 0,
  CompanyID: null,
  CreatedBy: null,
  Type: null
}
editActive:boolean=false;
StatusBrands=[];
  constructor(private modalService: NgbModal,public cms: CommonserviceService,vcr: ViewContainerRef,public toastr: ToastsManager,private UserService:UserDataServiceService) {
    this.toastr.setRootViewContainerRef(vcr);

   }

  ngOnInit() {
    this.UserData=JSON.parse(this.UserService.getData());
    console.log("this.UserData",this.UserData);
    this.CreateCompanyBrandMapping.CreatedBy=this.UserData._id;
    this.CreateCompanyBrandMapping.CompanyID=this.UserData.Company._id;
    this.CreateCompanyBrandMapping.Type=this.UserData.Company.CompanyType;
    this.getAllCompanyBrands();
    this.GetParentBaseValues(49);


  }
  GetParentBaseValues(val){
    var GroupID=val;
    this.cms.getMethod(APIURL.GetCategoryMasters + '/' + GroupID)
    .subscribe(data => {
      console.log("check data",data);
      if(data.Response==1){
        this.StatusBrands=data.Data;
      }
    }) 
  }
  modelpop: any;
  CreteBrands(val,content){
    console.log("val",val);
    if(val){
      this.editActive=true
      this.CreateCompanyBrandMapping.Name=val.Name;
      this.CreateCompanyBrandMapping.DisplayName=val.DisplayName;  
      //this.CreateCompanyBrandMapping.BrandID=val.BrandID;
    }
    this.modelpop=this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.toastr.success("Created Brands");
    // this.toastr.error("Created Brands");
    // this.toastr.info("Created Brands");

  }
  allBrands=[];
  getAllCompanyBrands() {
    this.allBrands=[];
    this.cms.getMethod(APIURL.GetAllBrandsForCompany + "/" +Number(this.CreateCompanyBrandMapping.CompanyID)).subscribe(data => {
      console.log("createdallbrands", data)
      if (data.Response == 1) {
        this.allBrands = data.Data;
        this.allBrands.forEach(x=>{
          this.StatusBrands.forEach(y=>{
            if(x.Status==y._id){
              x.Status=y._id;
              x.StatusName=y.Name;
            }
          })
        })

      }
    })
  }
  SaveBrands(content){
   
    console.log("this.CreateCompanyBrandMapping",this.CreateCompanyBrandMapping);
    if(this.CreateCompanyBrandMapping.Name && this.CreateCompanyBrandMapping.DisplayName){
      this.cms.PostMethod(APIURL.CreateCompanyBrandMap, this.CreateCompanyBrandMapping).subscribe(data => {
        console.log("create", data)
        if (data.Response == 1) {
         // this.toastr.success(data.Message);
          this.toastr.success(data.Message.MessageContent);
           this.getAllCompanyBrands();
          this.CreateCompanyBrandMapping = {
            Name: null,
    DisplayName: null,
    Icon: null,
    BrandID: 0,
    CompanyID: null,
    CreatedBy: null,
    Type: null
          }
          
        }
        else {
          this.toastr.error(data.Message.MessageContent);
          this.CreateCompanyBrandMapping = {
            Name: null,
    DisplayName: null,
    Icon: null,
    BrandID: 0,
    CompanyID: null,
    CreatedBy: null,
    Type: null
          }
        }
      })
    }else{
      if(!this.CreateCompanyBrandMapping.Name){
        this.toastr.error("Please Enter BrandName")
      }else if(!this.CreateCompanyBrandMapping.DisplayName){
        this.toastr.error("Please Enter AliasName")
      }
    }
  
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  Active(item){
    console.log("item iuten",item);
    var payload={
      "brandID":item.BrandID,
      "CompanyID":item.CompanyBrandID,
      "Status":51
    }
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload).subscribe(data=>{
     console.log("check me please have",data)
     this.toastr.success(data.Message.MessageContent);
        this.getAllCompanyBrands(); 

    })
    
  }
  InActive(item){
    console.log("item iuten",item);
    var payload={
      "brandID":item.BrandID,
      "CompanyID":item.CompanyBrandID,
      "Status":50
    }
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload).subscribe(data=>{
      console.log("check me please have",data);
      this.toastr.success(data.Message.MessageContent);
  this.getAllCompanyBrands();
    })
    
  }
  Deleteitem(item){
    var payload={
      "brandID":item.BrandID,
      "CompanyID":item.CompanyBrandID,
      "Status":52
    }
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload).subscribe(data=>{
      console.log("check me please have",data);
      this.toastr.success(data.Message.MessageContent);     

  this.getAllCompanyBrands();

    })
  }

}
