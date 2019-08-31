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
  FinalSelectionList=[];
  ApiList=[];
  panelData={
    "ContactNo":[],
    "Email" :null,
    "ServiceName": null,
    "ApiName":null,
    "ApiID":null,
    "CompalintName": null
  }
  userArray=[];
  constructor(private service :CommonserviceService,vcr: ViewContainerRef,private router: Router,public toastr: ToastsManager,
    private route: ActivatedRoute,private UserService: UserDataServiceService) {
      this.UserData= JSON.parse(UserService.getData()) ;
      this.toastr.setRootViewContainerRef(vcr);
      console.log(" this.UserData", this.UserData);
      this.route.queryParams.subscribe(params => {
        console.log("come to params", params);
        this.id = params.id;
      })
     }

  ngOnInit() {
    this.AddFields(0);
    this.getSavedroductCategories();
    this.getregionDeatils();
    this.singlePanel();
    if(this.id==3){
      this.ApiData()
    }


  }
  count=0;
  AddFields(i) {
    var obj = {
      "ContactNo":null
    }
    this.userArray[i] = obj;
    this.count++;

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
      console.log("check",data);
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
    }else{
      data={
        "ContactList":this.userArray,
        "Email":this.panelData.Email
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
      "ApiName":this.panelData.ApiName
    }
    this.service.PostMethod(APIURL.SAVE_MOBILE_LIST,payload,this.UserData.Token).subscribe(data=>{
      if(data.Response==1){
        this.toastr.success(data.Message);
      }
    })
  }
  SelectedApi(val){
    this.panelData.ApiName=val.Token;
    this.panelData.ApiID=val._id

  }
  
}
