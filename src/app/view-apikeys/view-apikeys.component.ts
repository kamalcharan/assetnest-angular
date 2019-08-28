import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'

@Component({
  selector: 'app-view-apikeys',
  templateUrl: './view-apikeys.component.html',
  styleUrls: ['./view-apikeys.component.scss']
})
export class ViewApikeysComponent {

  ALLAPIkeys=[];
  UserData:any;
  constructor(private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService) {


      this.UserData= JSON.parse(this.UserService.getData());
     }

  ngOnInit() {
    this.getALLAPIkeysData();
  }

  getALLAPIkeysData()
  {
    this.ALLAPIkeys=[];
    var payload={
      CompanyID:this.UserData._id
    }
    this.service.PostMethod(APIURL.GetAllAPIkeyData,payload,this.UserData.Token).subscribe(data => {
      
      //40 Active
      //41 disable
      // 42 delete

      if(data)
      {
        if(data.Response)
        {
          if (data.Response == 1) {
            this.ALLAPIkeys = data.Data;
          
            this.ALLAPIkeys.forEach(x=>{
              x.Name="";
              if(x.TokenType==36)
              {

                x.Name="Full Access"
              }
              else if(x.TokenType==37)
              {

                x.Name="Publishable "
              }
              else if(x.TokenType==38)
              {

                x.Name="Read Only  Access"
              }
            })
          }
        }
      }

    
    })
  }
  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  ChangeAPIStatus(item)
  {
    
  }
}
