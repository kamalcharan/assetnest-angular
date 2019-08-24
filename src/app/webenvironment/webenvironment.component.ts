import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'

@Component({
  selector: 'app-webenvironment',
  templateUrl: './webenvironment.component.html',
  styleUrls: ['./webenvironment.component.scss']
})
export class WebenvironmentComponent  {

  CompanyName=null;
  UserData:any;
  LogoURL=null;
  constructor(private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService) { 


      this.UserData= JSON.parse(this.UserService.getData());

      console.log("this.UserData",this.UserData);
      this.CompanyName= this.UserData.Company.Name;
      this.LogoURL=this.UserData.Company.LogoURL;
    }

  ngOnInit() {

  }
  Select(value)
  {

    this.UserService.SetEnvironment(Number(value));
    this.router.navigateByUrl("dashboard/dashboard1");
  }
  logout()
  {
    this.UserService.logoutUser();
    this.router.navigateByUrl("/pages/login")
  }

}
