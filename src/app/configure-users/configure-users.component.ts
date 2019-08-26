import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{UserDataServiceService} from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL"
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-configure-users',
  templateUrl: './configure-users.component.html',
  styleUrls: ['./configure-users.component.scss']
})
export class ConfigureUsersComponent implements OnInit {
Users={
  "Name":null,
  "MobileNo": null,
  "password": null,
  "CompanyID":null,
  "EmailID":null,
  "_id":null
}
closeResult: string;
UserData=null
validation: boolean = true;
constructor(private modalService: NgbModal,public cms: CommonserviceService,vcr: ViewContainerRef,public toastr: ToastsManager,private UserService:UserDataServiceService) {
  this.toastr.setRootViewContainerRef(vcr);
  this.UserData= JSON.parse(UserService.getData()) ;

 }

  ngOnInit() {
    this.getUsers();
  }
  modelpop: any;
  CreteUsers(content){
    this.Users={
      "Name":null,
      "MobileNo": null,
      "password": null,
      "CompanyID":null,
      "EmailID":null,
      "_id":null
    }
    
    this.modelpop=this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  

  }
  UsersList=[];
  getUsers(){
    this.UsersList=[];
    this.cms.getMethod(APIURL.GetUSersList+'/'+this.UserData.Company._id,this.UserData.Token).subscribe(data=>{
   if(data.Response==1){
     this.UsersList=data.Data;
     console.log("usrs list",this.UsersList);
   }
    })
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
  SaveUsers(content){
    var pwd = CryptoJS.HmacMD5(this.Users.password, "H1veB0*l23$`^60030-rgvbkrdlvk38844").toString(CryptoJS.enc.Hex)
this.Users.password=pwd;
this.Users.CompanyID=this.UserData.Company._id;
  if(this.Users.Name && this.Users.MobileNo && this.EmailValid(this.Users.EmailID) && this.Users.password){
  console.log("uaudha",this.Users);
  this.cms.PostMethod(APIURL.SaveUsersData,this.Users,this.UserData.Token).subscribe(data=>{
if (data.Response == 1) {
  this.toastr.success(data.Message);
  this.Users={
    "Name":null,
    "MobileNo": null,
    "password": null,
    "CompanyID":null,
    "EmailID":null,
    "_id":null
  }
  
  this.getUsers();

}else{
  this.toastr.success(data.Message);
  this.Users={
    "Name":null,
    "MobileNo": null,
    "password": null,
    "CompanyID":null,
    "EmailID":null,
    "_id":null
  }
}
  })
  }else{
    if(!this.Users.Name){
      this.toastr.error("Please Enter Name")
    }else if(!this.Users.MobileNo){
      this.toastr.error("Please Enter MobileNo");
    }else if(!this.Users.EmailID){
      this.toastr.error("Please Enter EmailID");
    }else if(!this.Users.password){
      this.toastr.error("Please Enter Password");  
    }
  }
  }
  editActive: boolean=false;
  EditUser(item, content){
  this.Users.Name=item.Name;
  this.Users.EmailID=item.EmailID;
  this.Users.MobileNo=item.MobileNo;
  this.Users.password=item.Password;
  this.Users.CompanyID=item.CompanyID;
  this.Users._id=item._id;
  this.editActive=true
console.log("check him",this.Users);
this.modelpop=this.modalService.open(content, {}).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});

  }
  
  Active(item){
    console.log("item iuten",item);
    var payload={
      "_id":item._id,
      "CompanyID":item.CompanyBrandID,
      "Status":61,
      "OldStatus":item.Status
    }
    this.cms.PostMethod(APIURL.ActiveInactiveUser,payload,this.UserData.Token).subscribe(data=>{
     console.log("check me please have",data)
     this.toastr.success(data.Message);
        this.getUsers(); 

    })
    
  }
  EmailValid(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

  }
  InActive(item){
    console.log("item iuten",item);
    var payload={
      "_id":item._id,
      "CompanyID":item.CompanyBrandID,
      "Status":60,
      "OldStatus":item.Status
    }
    this.cms.PostMethod(APIURL.ActiveInactiveUser,payload,this.UserData.Token).subscribe(data=>{
     console.log("check me please have",data)
     this.toastr.success(data.Message);
        this.getUsers(); 

    })
    
  }
  Deleteitem(item){
    console.log("item iuten",item);
    var payload={
      "_id":item._id,
      "CompanyID":item.CompanyBrandID,
      "Status":62,
      "OldStatus":item.Status
    }
    this.cms.PostMethod(APIURL.ActiveInactiveUser,payload,this.UserData.Token).subscribe(data=>{
     console.log("check me please have",data)
     this.toastr.success(data.Message);
        this.getUsers(); 

    })
    
  }
}
