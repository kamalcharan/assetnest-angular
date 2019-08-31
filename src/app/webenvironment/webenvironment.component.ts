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
  logoUrl=APIURL.Image_Path+"1t9Nyb68eNbvi3iNTZbjHfWZDK7suCpWz";
  logoUrlBig=APIURL.Image_Path+"18pqfKpUzYIlkX-w6QEhdRPBfAgJ-VQZn";
  constructor(private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService) { 


      this.UserData= JSON.parse(this.UserService.getData());

      console.log("this.UserData",this.UserData);
      this.CompanyName= this.UserData.Company.Name;
      this.LogoURL=APIURL.Image_Path+this.UserData.Company.LogoURL;
    }

  ngOnInit() {
    window.scrollTo(0, 0);
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
