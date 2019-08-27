import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-single-integrations',
  templateUrl: './single-integrations.component.html',
  styleUrls: ['./single-integrations.component.scss']
})
export class SingleIntegrationsComponent implements OnInit {
  UserData: any;
  id: any;
  SignleData = [];
  ManageData = [];
  editActive:Boolean=false;
  constructor(private user: UserDataServiceService, private commonServices: CommonserviceService,
    vcr: ViewContainerRef, public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {

    this.toastr.setRootViewContainerRef(vcr);
    this.UserData = JSON.parse(this.user.getData());
    this.route.queryParams.subscribe(params => {
      console.log("come to params", params);
      this.id = params.id;
    })
  }

  ngOnInit() {
    this.singlepayloadData();
    this.SignleManageData();

  }
  singlepayloadData() {
    this.commonServices.getMethod(APIURL.getSingleIntegrations + '/' + this.id, this.UserData.Token).subscribe(data => {
      console.log("single latest", data);
      this.SignleData = data.Data;
    })

  }
  SignleManageData() {
    this.commonServices.getMethod(APIURL.getSingleManageIntegrate + '/' + this.id, this.UserData.Token).subscribe(data => {
      console.log("single latest", data);
      this.ManageData = data.Data;
      if (this.ManageData.length) {
        this.editActive=true;
        this.SignleData.forEach(x => {
          this.ManageData.forEach(y => {
            if (x._id == y.ParentCategory) {
              x.Parameters = y.Parameters;
              x.id=y._id
            }
          })
        })
      }
    })
  }
  Connectarameters(item) {
    console.log("item", item);
    var payload = {
      "CompanyID": this.UserData.Company._id,
      "Item": item
    }
    this.commonServices.PostMethod(APIURL.InsertCompanyIntegration, payload, this.UserData.Token).subscribe(data => {
      if (data.Response == 1) {
        this.toastr.success(data.Message);
      } else {
        this.toastr.error(data.Message);

      }
    })
  }
  BackNav() {
    this.router.navigate(['/pages/Settings2'], { skipLocationChange: false })

  }
  clickHeader(valname, type) {
    console.log("check,", valname)
    var textValue;
    if (type == 'Header') {
      textValue = valname.DisplayText
    } else {
      textValue = valname.FooterText;

    }
    var val = {
      "Type": type,
      "Name": valname.Name,
      "id": valname._id,
      "Display": textValue
    }
    this.router.navigate(['/pages/Editor'], { skipLocationChange: false, queryParams: val })

  }
  UpdateConnect(item)
  {
    this.commonServices.PostMethod(APIURL.UpdateTblCompany,item,this.UserData.Token).subscribe(list=>{
      if (list.Response == 1) {
        this.toastr.success(list.Message);
      }else{
        this.toastr.error(list.Message);
 
      }
    })
  }

}
