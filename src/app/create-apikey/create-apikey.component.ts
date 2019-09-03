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
    IsLive:null,
  
  }
  Userdata:any;
  adminToken=null;
  QueryCompanyID=null;
  constructor(private modalService: NgbModal,private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    vcr: ViewContainerRef,public toastr: ToastsManager) {
      this.toastr.setRootViewContainerRef(vcr);
      this.GetAdminToken();
      this.route.queryParams.subscribe(params => {
        if(params.CompanyID)
        {
          this.QueryCompanyID=Number(params.CompanyID);
        }
      })
      
     }

  ngOnInit() {

    this.Userdata= JSON.parse(this.UserService.getData());
    this.payload.IsLive=this.Userdata.IsLive;
    this.payload.UserID=this.Userdata._id;
    if(this.QueryCompanyID)
      {
        this.Userdata.Company._id=this.QueryCompanyID;
      }
      this.payload.CompanyID=this.Userdata.Company._id;

  }
  modelpop: any;
  closeResult: string;
  popupName(content,Type){
    this.payload.TokenType=Number(Type);

    
    }
    popupName2(content){
     
      if(this.payload.TokenType)
      {
        this.modelpop=this.modalService.open(content, {}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      
      }
      else

      {
        this.toastr.error("Select API key type")
      }
  

      // console.log("val",val);
      // if(val){
      // this.editActive=true
      // this.CreateCompanyBrandMapping.Name=val.Name;
      // this.CreateCompanyBrandMapping.DisplayName=val.DisplayName;
      // }
      
      
      
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
        var Token="";
  
        if(this.payload.TokenType==36)
        {
  
          URL= APIURL.GenerateNewFullAccessAPIKey;
          Token=this.adminToken;
        }
        else
        {
          URL= APIURL.GenerateNewAPIKey;
          Token=this.Userdata.Token
        }
  
  

        this.service.PostMethod (URL, this.payload,Token)
        .subscribe(data => {
  
          if(data)
          {
  
            if(data.Response)
            {
  
              if(data.Response==1)
              {
  

                if(this.payload.TokenType==36)

{

         if(this.QueryCompanyID)
         {
        
         }
         else
         {
          this.UserService.SetToken(data.Data.Token);
         }
 

  
}                this. payload={
                  APIName:null,
                  TokenType:null,
                  CompanyID:null,
                  UserID:null,
                  IsLive:null
                }
                this.payload.CompanyID=this.Userdata.Company._id;
                this.payload.UserID=this.Userdata._id;
                this.payload.IsLive=this.Userdata.IsLive;
                this.toastr.success(data.Message);
                setTimeout(()=>{
                  this.router.navigateByUrl("/pages/ViewAPIKeys");
              },2000)
                
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
    GetAdminToken() {

      try {
        this.service.getMethodWithoutToken(APIURL.GetAdminToken)
        .subscribe(data => {
            console.log(data);
            if (data) {

                if (data.Response) {
                    if (data.Response == 1) {

                        this.adminToken = data.Data.Token

                    }
                    else {

                    }

                }
                else {

                }


            }
        });
      } catch (error) {
        console.log(error);
      }
     
  }

  Cancel()
  {
    this.router.navigateByUrl("/pages/ViewAPIKeys");

  }
    SetKeyType(Type)
    {
     
    }
    BackNav()
    {
    
      if(this.QueryCompanyID)
      {
        this.router.navigate(['/pages/ViewAPIKeys'], { skipLocationChange: false, queryParams: { CompanyID: this.QueryCompanyID} })
      }
      else
      {
        this.router.navigateByUrl("/pages/ViewAPIKeys");
      }
    }
}
