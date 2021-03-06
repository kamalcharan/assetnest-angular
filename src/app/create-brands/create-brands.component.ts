import { Component, OnInit,ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{UserDataServiceService} from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL"
import { Router, ActivatedRoute } from "@angular/router";
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
filesToUpload: Array<File> = [];
@ViewChild('filectrl') fileInputVariable: any;
editActive:boolean=false;
StatusBrands=[];
QueryCompanyID=null;
  constructor(private router: Router,
    private route: ActivatedRoute,private modalService: NgbModal,public cms: CommonserviceService,vcr: ViewContainerRef,public toastr: ToastsManager,private UserService:UserDataServiceService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.route.queryParams.subscribe(params => {
      if(params.CompanyID)
      {
        this.QueryCompanyID=Number(params.CompanyID);
      }
    })
   }

  ngOnInit() {
    this.UserData=JSON.parse(this.UserService.getData());
    if(this.QueryCompanyID)
    {
      this.UserData.Company._id= this.QueryCompanyID;
    }
    console.log("this.UserData",this.UserData);
    this.CreateCompanyBrandMapping.CreatedBy=this.UserData._id;
    this.CreateCompanyBrandMapping.CompanyID=this.UserData.Company._id;
    this.CreateCompanyBrandMapping.Type=this.UserData.Company.CompanyType;
    this.getAllCompanyBrands();
    this.GetParentBaseValues(49);


  }
  GetParentBaseValues(val){
    var GroupID=val;
    this.cms.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
    .subscribe(data => {
      console.log("check data",data);
      if(data.Response==1){
        this.StatusBrands=data.Data;
      }
    }) 
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
      DocURL="http://hivebox.in/app_icons/Biomedicals/bloodcellanalyser.jpg";
      fileUploadUrl: any;
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
    
    
    
    formData.append("CompanyID", this.UserData.Company._id);
    this.cms.UploadPostMethod(APIURL.BaseUrl+"FileUploadDrive", formData)
    .subscribe(results => {
    if (results.Response == 1) {
   
     this.DocURL = APIURL.Image_Path+results.Path;
     this.fileUploadUrl=results.Path;
     this.CreateCompanyBrandMapping.Icon=results.Path;
     this.toastr.success(results.Message)
     console.log("results",results);
     console.log(results.Response);
   
    }
    else {
        console.log(results);
     
    }
    })
    }
    else
    {
    }
    
}
catch(error)
{
    console.log(error);
}





}
  modelpop: any;
  CreteBrands(content){
    
    this.modelpop=this.modalService.open(content, {}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    
    }
  allBrands=[];
  getAllCompanyBrands() {
    this.allBrands=[];
    this.cms.getMethod(APIURL.GetAllBrandsForCompany + "/" +Number(this.CreateCompanyBrandMapping.CompanyID),this.UserData.Token).subscribe(data => {
      console.log("createdallbrands", data)
      if (data.Response == 1) {
        this.allBrands = data.Data;
        this.allBrands.forEach(x=>{
          x.Icon=APIURL.Image_Path+x.Icon;
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
      this.cms.PostMethod(APIURL.CreateCompanyBrandMap, this.CreateCompanyBrandMapping,this.UserData.Token).subscribe(data => {
        console.log("create", data)
        if (data.Response == 1) {
         // this.toastr.success(data.Message);
          this.toastr.success(data.Message.MessageContent);
           this.getAllCompanyBrands();
           this.CreateCompanyBrandMapping.Name=null;
           this.CreateCompanyBrandMapping.DisplayName=null;

           this.CreateCompanyBrandMapping.Icon=null;

    //       this.CreateCompanyBrandMapping = {
    //         Name: null,
    // DisplayName: null,
    // Icon: null,
    // BrandID: 0,
    // CompanyID: this.UserData.Company._id,
    // CreatedBy: this.UserData._id,
    // Type: null
    //       }
          
        }
        else {
          this.toastr.error(data.Message.MessageContent);
          this.CreateCompanyBrandMapping.Name=null;
          this.CreateCompanyBrandMapping.DisplayName=null;

          this.CreateCompanyBrandMapping.Icon=null;
    //       this.CreateCompanyBrandMapping = {
    //         Name: null,
    // DisplayName: null,
    // Icon: null,
    // BrandID: 0,
    // CompanyID: this.UserData.Company._id,
    // CreatedBy: this.UserData._id,
    // Type: null
    //       }
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
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload,this.UserData.Token).subscribe(data=>{
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
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload,this.UserData.Token).subscribe(data=>{
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
    this.cms.PostMethod(APIURL.ActiveInactiveBrands,payload,this.UserData.Token).subscribe(data=>{
      console.log("check me please have",data);
      this.toastr.success(data.Message.MessageContent);     

  this.getAllCompanyBrands();

    })
  }
  BackNav(){
    this.router.navigate(['/pages/Settings'])
  
  }

}
