import { Component, OnInit } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
CustomerFacingList=[];
AdminList=[];
MobileList=[];
getApiHooksList=[];
  constructor(private service :CommonserviceService,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetParentBaseValues(1);
    this.GetParentBaseValuesAdmin(7);
    this.getMobilePanelData(10);
    this.getApiHooks(43);

    
}
getApiHooks(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID)
  .subscribe(data => {
    console.log("check data mobile",data);
    if(data.Response==1){
      this.getApiHooksList=data.Data;
    }
  }) 
}
ClickOmini(item){
console.log("ClickOmini",item);
if(item._id==10){
  this.router.navigateByUrl("/pages/OmniChanal");

}else if(item._id==2){
  this.router.navigateByUrl("/pages/Brands");
}
}
getMobilePanelData(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID)
  .subscribe(data => {
    console.log("check data mobile",data);
    if(data.Response==1){
      this.MobileList=data.Data;
    }
  }) 
}
GetParentBaseValues(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID)
  .subscribe(data => {
    console.log("check data",data);
    if(data.Response==1){
      this.CustomerFacingList=data.Data;
    }
  }) 
}
GetParentBaseValuesAdmin(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID)
  .subscribe(data => {
    console.log("check data",data);
    if(data.Response==1){
      this.AdminList=data.Data;
    }
  }) 
}

 
}
