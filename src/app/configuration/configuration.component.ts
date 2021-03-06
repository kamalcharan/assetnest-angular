import { Component, OnInit } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service'
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
UserData=null
QueryCompanyID=null;
  constructor(private service :CommonserviceService,private router: Router,
    private route: ActivatedRoute,private UserService: UserDataServiceService) {


      this.UserData= JSON.parse(UserService.getData()) ;
      console.log(" this.UserData", this.UserData);
      this.route.queryParams.subscribe(params => {
        if(params.CompanyID)
        {
          this.QueryCompanyID=Number(params.CompanyID);
        }
      })
     }

  ngOnInit() {
    this.GetParentBaseValues(1);
    this.GetParentBaseValuesAdmin(7);
    this.getMobilePanelData(10);
    this.getApiHooks(43);

    
}
getApiHooks(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
  .subscribe(data => {
    console.log("check data mobile",data);
    if(data.Response==1){
      this.getApiHooksList=data.Data;
    }
  }) 
}
ClickOmini(item){
console.log("ClickOmini",item);
if(this.QueryCompanyID)
{
  if(item._id==10){
    this.router.navigate(['/pages/OMNIChannel'], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })
  }else if(item._id==2){
    this.router.navigate(['/pages/Brands'], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })
  }else if(item._id==4){
    this.router.navigate(['/pages/Catlog'], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })

  }else if(item._id==3){
    this.router.navigate(['/pages/Region'], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })

  
  }
}
else{
  if(item._id==10){
    this.router.navigateByUrl("/pages/OMNIChannel");
  
  }else if(item._id==2){
    this.router.navigateByUrl("/pages/Brands");
  }else if(item._id==4){
    this.router.navigateByUrl("/pages/Catlog");
  
  }else if(item._id==3){
    this.router.navigateByUrl("/pages/Region");
  
  }
}

}
getMobilePanelData(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
  .subscribe(data => {
    console.log("check data mobile",data);
    if(data.Response==1){
      this.MobileList=data.Data;
    }
  }) 
}
GetParentBaseValues(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
  .subscribe(data => {
    console.log("check data",data);
    if(data.Response==1){
      this.CustomerFacingList=data.Data;
    }
  }) 
}
GetParentBaseValuesAdmin(val){
  var GroupID=val;
  this.service.getMethod(APIURL.GetCategoryMasters + '/' + GroupID,this.UserData.Token)
  .subscribe(data => {
    console.log("check data",data);
    if(data.Response==1){
      this.AdminList=data.Data;
    }
  }) 
}

AdminNavigate(item){
console.log("item",item);

if(this.QueryCompanyID)
{
  if(item._id==8){
   
    this.router.navigate(["/pages/Users"], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })
  }
  if(item._id==44){
      this.router.navigate(["/pages/ViewAPIKeys"], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })

  }
  if(item._id==6){
    this.router.navigate(["/pages/CompanySetup"], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })

  }
}
else
{
  if(item._id==8){
    this.router.navigateByUrl("/pages/Users"); 
  }
  if(item._id==44){
    this.router.navigateByUrl("/pages/ViewAPIKeys"); 
  }
  if(item._id==6){
    this.router.navigateByUrl("/pages/CompanySetup"); 
  }
}

}
}
