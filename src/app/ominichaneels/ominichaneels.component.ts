import { Component, OnInit } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service'
@Component({
  selector: 'app-ominichaneels',
  templateUrl: './ominichaneels.component.html',
  styleUrls: ['./ominichaneels.component.scss']
})
export class OminichaneelsComponent implements OnInit {

  UserData=null;
  AllMobileList=[];
  constructor(private service :CommonserviceService,private router: Router,
    private route: ActivatedRoute,private UserService: UserDataServiceService) {
      this.UserData= JSON.parse(UserService.getData()) ;
      console.log(" this.UserData", this.UserData);
     }

  ngOnInit() {
  this.GetMobileList();
  }
  ClickOmini(item){
    var val={
      "id":item._id
    }
    // this.router.navigateByUrl("/pages/Panel");
    this.router.navigate(['/pages/Panel'], { skipLocationChange: false, queryParams: val })


  }
  GetMobileList(){
this.service.getMethod(APIURL.GetMobileList,this.UserData.Token).subscribe(data=>{
  console.log("chek ghfgd",data);
  this.AllMobileList=data.Data;
})
  }

}
