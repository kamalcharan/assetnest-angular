import { Component, ViewChild,ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-create-apikey',
  templateUrl: './create-apikey.component.html',
  styleUrls: ['./create-apikey.component.scss']
})
export class CreateApikeyComponent  {


  payload={
    APIName:null,
    TokenType:null,
    CompanyID:null,
    UserID:null,
    IsLive:null
  }
  Userdata:any;
  constructor(private modalService: NgbModal,private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    vcr: ViewContainerRef,public toastr: ToastsManager) { }

  ngOnInit() {

    this.Userdata= JSON.parse(this.UserService.getData());
    this.payload.IsLive=this.Userdata.IsLive;
    this.payload.CompanyID=this.Userdata.Company._id;

  }
  modelpop: any;
  closeResult: string;
  popupName(content,Type){
    this.payload.TokenType=Number(Type);

    // console.log("val",val);
    // if(val){
    // this.editActive=true
    // this.CreateCompanyBrandMapping.Name=val.Name;
    // this.CreateCompanyBrandMapping.DisplayName=val.DisplayName;
    // }
    this.modelpop=this.modalService.open(content, {}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
    
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    createAPIKey()
    {
      try {
        console.log(this.payload);

        var URL=""
  
        if(this.payload.TokenType==36)
        {
  
          URL= APIURL.GenerateNewFullAccessAPIKey;
        }
        else
        {
          URL= APIURL.GenerateNewAPIKey;
        }
  
  
        this.service.PostMethod (URL, this.payload,this.Userdata.Token)
        .subscribe(data => {
  
          if(data)
          {
  
            if(data.Response)
            {
  
              if(data.Response==1)
              {
  
               this. payload={
                  APIName:null,
                  TokenType:null,
                  CompanyID:null,
                  UserID:null,
                  IsLive:null
                }
                this.payload.IsLive=this.Userdata.IsLive;
                this.toastr.success(data.Message);
              }
              else
  
              {
                this.toastr.error(data.Message);
              }
            }
            else
            {
  this.toastr.error(data);
            }
  
          }
  
        },
        error=>{
          console.log(error);
        }
        )
        
      } catch (error) {
       
        console.log(error)
      }
    
      // if(this.payload.TokenType==36)
      // {

      //   x.Name="Full Access"
      // }
      // else 
      // else if(this.payload.TokenType==38)
      // {

      //   x.Name="Read Only  Access"
      // }
    }

    SetKeyType(Type)
    {
     
    }
}
