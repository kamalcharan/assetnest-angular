import { Component, OnInit } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service'

@Component({
  selector: 'app-categorieslist',
  templateUrl: './categorieslist.component.html',
  styleUrls: ['./categorieslist.component.scss']
})
export class CategorieslistComponent implements OnInit {
  UserData=null;
  SalesList=[];
  SalesForceChildList=[];
  CustomerServiceList=[];
  CustomerchildList=[];
  AccountingData=[];
  AccountingListData=[];
  AnalyticsData=[];
  AnalyticsList=[];
  MarketingData=[];
  MarketingList=[];
  SalesForceList=[];
  AppConnectedList=[];
  constructor(private service :CommonserviceService,private router: Router,
    private route: ActivatedRoute,private UserService: UserDataServiceService) {
      this.UserData= JSON.parse(UserService.getData()) ;
      console.log(" this.UserData", this.UserData);
     }

  ngOnInit() {
    // this.parentData(54);
    // this.parentData1(55);
    // this.parentData2(56) ;
    // this.parentData3(57);
    // this.parentData4(58);
    this.GetParentValueList(53);

  }
  AppConnectedData(){
    this.service.getMethod(APIURL.AppsConnectedData+'/'+this.UserData.Company._id,this.UserData.Token).subscribe(list=>{

      if(list.Response==1){
this.AppConnectedList=list.Data;
console.log("check data mobile test",this.AppConnectedList);
console.log("check him splice it this.AppConnectedList this.AppConnectedList",this.AppConnectedList)   

if(this.AppConnectedList.length){
  this.AppConnectedList.forEach(x=>{
    this.SalesForceList.forEach(y => {  
      console.log("check him splice it",y.ChildList)   
      y.ChildList.forEach((z, index) => {     
        if (x.ParentCategory === z._id) {
          y.ChildList.splice(index, 1);
        }
      });
    });
    
  })
}
      } 
    })
  } 
GetParentValueList(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
  .subscribe(data => {
    if(data.Response==1){
      this.SalesForceList=data.Data;
      this.SalesForceList.forEach(x=>{
       x.ChildList=[];
        this.service.getMethod(APIURL.CategoryMastersList + '/' + x._id,this.UserData.Token)
        .subscribe(data => {
          if(data.Response==1){
            this.SalesForceChildList=data.Data;
            x.ChildList=data.Data;
            this.AppConnectedData()

      
          }
        }) 
      })
    }
  }) 
 
}
ClickManage(list){
console.log("sdsd",item);
var item={
  "id":list._id
}
this.router.navigate(['/pages/Manage'], { skipLocationChange: false, queryParams: item })
}
SingleIntegrate(list){
 console.log("list",list);
 var item={
   "id":list._id
 }
 this.router.navigate(['/pages/Integrations'], { skipLocationChange: false, queryParams: item })

 
}

}
