import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-single-omini-channals',
  templateUrl: './single-omini-channals.component.html',
  styleUrls: ['./single-omini-channals.component.scss']
})
export class SingleOminiChannalsComponent implements OnInit {
  UserData:any;
  id: any;
  SignlePanelList=[];
  CategoriesList=[];
  RegionsList=[];
  MobileNumberList=[];
  ListOfMobileList=[];
  QueryCompanyID=null
  constructor(private user: UserDataServiceService, private commonServices: CommonserviceService,
    vcr: ViewContainerRef, public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {

    this.toastr.setRootViewContainerRef(vcr);
    this.UserData = JSON.parse(this.user.getData());
    this.route.queryParams.subscribe(params => {
      console.log("come to params", params);
      this.id = params.id;
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
    this.singlePanel();
    this.SavedListPanel()
  }
  SavedListPanel(){
    var payload={
      "_id":this.id,
      "CompanyID":this.UserData.Company._id
    }
    this.commonServices.PostMethod(APIURL.GET_PANAL_LIST,payload,this.UserData.Token).subscribe(list=>{
      console.log("check mjdn",list);
      this.ListOfMobileList=list.Data;
      this.ListOfMobileList.forEach(x=>{
        x.catLength=x.CategoriesList.length;
      })
    })
  }
  singlePanel(){
    this.commonServices.getMethod(APIURL.GET_SINGLE_PANEL+'/'+ this.id, this.UserData.Token).subscribe(data=>{
      console.log("check",data);
      this.SignlePanelList=data.Data;
      
      //this.CategoriesList=data
    })
  }

  GoToPage(item){

    //this.router.navigateByUrl('/pages/PanelList')
    var val=null
    // this.router.navigateByUrl("/pages/Panel");

    if(this.QueryCompanyID)
    {
      val={
        "id":item._id,
        "CompanyID":this.QueryCompanyID
      }
      
      this.router.navigate(["pages/PanelList"], { skipLocationChange: false, queryParams:val })

    }
    else
    {
      val={
        "id":item._id
      }
      this.router.navigate(['/pages/PanelList'], { skipLocationChange: false, queryParams: val })
    }

    
  }
  ClickPanelEdit(item){
console.log("check",item);
var val=null

if(this.QueryCompanyID)
    {
      val={
        "_id":item._id,
        "Type":"Edit",
        "CompanyID":this.QueryCompanyID
      }
      
      this.router.navigate(["/pages/PanelList"], { skipLocationChange: false, queryParams:val })

    }
    else
    {
      val={
        "_id":item._id,
        "Type":"Edit"
      }
      this.router.navigate(['/pages/PanelList'], { skipLocationChange: false, queryParams: val })
    }
  
}
BackNav()
  {
    
    if(this.QueryCompanyID)
    {
    var  val={
        
        "CompanyID":this.QueryCompanyID
      }
      
      this.router.navigate(["/pages/OMNIChannel"], { skipLocationChange: false, queryParams:val })

    }
    else
    {
      
      this.router.navigate(['/pages/OMNIChannel'])
    }

  }
}
