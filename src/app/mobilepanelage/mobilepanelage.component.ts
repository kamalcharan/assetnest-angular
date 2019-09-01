import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-mobilepanelage',
  templateUrl: './mobilepanelage.component.html',
  styleUrls: ['./mobilepanelage.component.scss']
})
export class MobilepanelageComponent implements OnInit {

  UserData: any;
  CategorySavedList=[];
  CategoryActive: Boolean=false;
  regionList=[];
  SignlePanelList=[];
  id: any;
  _id: any;
  FinalSelectionList=[];
  ApiList=[];
  panelData={
    "ContactNo":[],
    "Email" :null,
    "ServiceName": null,
    "ApiName":null,
    "ApiID":null,
    "CompalintName": null,
    "Token":null,
    "AMCName":null,
    "OthersName":null,
    "BillingName":null,
    "_id":null
  }
  finalID=0;
  userArray=[];
  QueryCompanyID=null;
  constructor(private service :CommonserviceService,vcr: ViewContainerRef,private router: Router,public toastr: ToastsManager,
    private route: ActivatedRoute,private UserService: UserDataServiceService) {
      this.UserData= JSON.parse(UserService.getData()) ;
      this.toastr.setRootViewContainerRef(vcr);
      console.log(" this.UserData", this.UserData);
      this.route.queryParams.subscribe(params => {
        console.log("come to params", params);
        if(params._id){
          this._id = params._id;
          this.SavedData()
        }else{
          this.id = params.id;
        }
        if(params.CompanyID)
        {
          this.QueryCompanyID=Number(params.CompanyID);
          
        }
      })
     
     
     }

  ngOnInit() {
    if(this.QueryCompanyID)
    {
      this.UserData.Company._id= this.QueryCompanyID;
    }
    this.AddFields(0);
    this.getSavedroductCategories();
    this.getregionDeatils();
    this.singlePanel();
      this.ApiData();
  }
  count=0;
  AddFields(i) {
    var obj = {
      "ContactNo":null
    }
    this.userArray[i] = obj;
    this.count++;

  }
  SavedData(){
    this.service.getMethod(APIURL.getSavedPanels+'/'+ this._id,this.UserData.Token).subscribe(data=>{
  console.log("hello alll",data);
  this.finalID=data.Data[0].FK_ID;
  this.FinalRegionList=data.Data[0].RegionList;
  this.FinalSelectionList=data.Data[0].CategoriesList;
  this.panelData.Email=data.Data[0].Data.Email;
  this.panelData.AMCName=data.Data[0].Data.AMCName;
  this.panelData.BillingName=data.Data[0].Data.BillingName;
  this.panelData.ServiceName=data.Data[0].Data.ServiceName;
  this.panelData.ApiID=data.Data[0].ApiID;
  this.panelData.ApiName=data.Data[0].ApiName;
  this.panelData.Token=data.Data[0].Token;
  this.panelData.CompalintName=data.Data[0].Data.ComplaintsName;
  this.panelData.OthersName=data.Data[0].Data.OthersName;
  if(this.finalID==1){
    this.userArray=data.Data[0].Data.ContactList;

  }else if(this.finalID==2){
    this.userArray=data.Data[0].Data.EmergencyContactList;
 
  }
  this.panelData._id=data.Data[0]._id;


  this.checkFinishList();
    })

  }
  checkFinishList(){
    this.service.getMethod(APIURL.GET_SINGLE_PANEL+'/'+ this.finalID,this.UserData.Token).subscribe(data=>{
      console.log("check meee hhhhh",data);
      this.SignlePanelList=data.Data;

    })
  }
  ApiData(){
    var payload={
      "CompanyID":this.UserData.Company._id
    }
    this.service.PostMethod(APIURL.GET_API_DATA,payload,this.UserData.Token).subscribe(list=>{
console.log("Get API Data",list);
this.ApiList=list.Data;
    })
  }
  singlePanel(){
    this.service.getMethod(APIURL.GET_SINGLE_PANEL+'/'+ this.id, this.UserData.Token).subscribe(data=>{
      console.log("check meee",data);
      this.SignlePanelList=data.Data;
    })
  }
  getregionDeatils(){
    this.regionList=[];
    this.service.getMethod(APIURL.GetRegionDetails+ '/'+this.UserData.Company._id,this.UserData.Token).subscribe(list=>{
      console.log("hvdhvds",list)
        this.regionList=list.Data;
    })
  }
  getSavedroductCategories(){
    this.service.getMethod(APIURL.GetcategoryList+ '/'+ this.UserData.Company._id,this.UserData.Token).subscribe(list=>{
      if(list.Response==1){
        this.CategorySavedList=list.Data;
        this.CategoryActive=true;
        console.log("fjskdbfdsf",this.CategorySavedList);
      }
    })
  }
  SelectedCategory(item){
    this.CategorySavedList.forEach((x,index)=>{
      if(x._id==item._id){
        this.CategorySavedList.splice(index,1);
      }
    })
    this.FinalSelectionList.push(item);
  }
  FinalRegionList=[];
  SelectedRegions(item){
    this.regionList.forEach((x,index)=>{
      if(x._id==item._id){
        this.regionList.splice(index,1);
      }
    })
    this.FinalRegionList.push(item);
    console.log("dssad",this.FinalRegionList)
  }
  
  DeleteBack(item){
    this.FinalSelectionList.forEach((x,index)=>{
      if(x._id==item._id){
        this.FinalSelectionList.splice(index,1);
      }
    })
    this.CategorySavedList.push(item);
  }
  
  DeleteRegionBack(item){
    this.FinalRegionList.forEach((x,index)=>{
      if(x._id==item._id){
        this.FinalRegionList.splice(index,1);
      }
    })
    this.regionList.push(item);
  }
  ClickSave(item){
    console.log("check",item);
    var data;
    if(item._id==1){
      data={
        "ContactList":this.userArray,
        "Email":this.panelData.Email
      }
    }else if(item._id==2){
      data={
        "EmergencyContactList":this.userArray,
        "Email":this.panelData.Email
      }
    }else if(item._id==3){
      data={
        "EmergencyContactList":this.userArray,
        "Email":this.panelData.Email,
        "ComplaintsName":this.panelData.CompalintName
      }
    }else if(item._id==4){
      data={
        "EmergencyContactList":this.userArray,
        "Email":this.panelData.Email,
        "ServiceName":this.panelData.ServiceName
      }
    }else if(item._id==5){
      data={
        "EmergencyContactList":this.userArray,
        "Email":this.panelData.Email,
        "AMCName":this.panelData.AMCName
      }
    }
    else if(item._id==6){
      data={
        "EmergencyContactList":this.userArray,
        "Email":this.panelData.Email,
        "BillingName":this.panelData.BillingName
      }
    }else{
      data={
        "ContactList":this.userArray,
        "Email":this.panelData.Email,
        "OthersName":this.panelData.OthersName
      }
    }
    
    var payload={
      "FK_ID":item._id,
      "Name":item.Name,
      "CategoriesList":this.FinalSelectionList,
      "RegionList": this.FinalRegionList,
      "Data":data,
      "CompanyID":this.UserData.Company._id,
      "IsLive":this.UserData.IsLive,
      "CreatedBy":this.UserData._id,
      "ApiID":this.panelData.ApiID,
      "ApiName":this.panelData.ApiName,
       "_id":this.panelData._id
    }
    this.service.PostMethod(APIURL.SAVE_MOBILE_LIST,payload,this.UserData.Token).subscribe(data=>{
      if(data.Response==1){
        this.toastr.success(data.Message);
      }
    })
  }
  SelectedApi(val){
    alert(val)
    this.panelData.ApiID=val;
    this.ApiList.forEach(x=>{
      if(x._id==val){
        this.panelData.Token=x.Token;
        this.panelData.ApiName=x.APIName;
      }
    })
   

  }
  BackNav(){
    var val;
   
    if(this.QueryCompanyID)
    {
      if(this.finalID){
        val={
          "id":this.finalID,
          "CompanyID":this.QueryCompanyID
        }
      }else{
        val={
          "id":this.id,
          "CompanyID":this.QueryCompanyID
        }
      }
    
      
      this.router.navigate(['/pages/Panel'], { skipLocationChange: false, queryParams: val })

    }
    else
    {
      if(this.finalID){
        val={
          "id":this.finalID
        }
      }else{
        val={
          "id":this.id
        }
      }
      this.router.navigate(['/pages/Panel'], { skipLocationChange: false, queryParams: val })
    }
    
    // this.router.navigateByUrl("/pages/Panel");
 

  }
  
}
