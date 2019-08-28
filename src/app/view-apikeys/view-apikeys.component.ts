import { Component, ViewChild,ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-view-apikeys',
  templateUrl: './view-apikeys.component.html',
  styleUrls: ['./view-apikeys.component.scss']
})
export class ViewApikeysComponent {

  SelectedKey:null;
  StatusChangeLabel= "";
  StatusContent="";
  ALLAPIkeys=[];
  UserData:any;
  payload = {
    id: null,
    CurrentStatus: null,
    TokenType: null,
    CompanyID: null,
    NewStatus: null,
    UserID: null
  }
  constructor(private modalService: NgbModal,private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,vcr: ViewContainerRef,public toastr: ToastsManager) {


      this.UserData= JSON.parse(this.UserService.getData());
      this.payload.CompanyID=this.UserData.Company._id;
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


  ChangeAPIStatus(item )
  {
    try {
     
      var URL=""

      if(item.TokenType==36)
      {

        URL= APIURL.ChangeFullAccesKeyStatus;
      }
      else
      {
        URL= APIURL.ChangeAPIKeyStatus;
      }


      this.payload.id= item._id;
      this.payload.UserID=this.UserData._id;
      this.payload.TokenType=item.TokenType;
      this.payload.CurrentStatus=item.TokenStatus;
    //  this.payload.NewStatus=Number(NewStatus);
      this.service.PostMethod (URL, this.payload,this.UserData.Token)
      .subscribe(data => {

        if(data)
        {

          if(data.Response)
          {

            if(data.Response==1)
            {

            
              this.toastr.success(data.Message);
              this.getALLAPIkeysData();
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


    ChangesStatusLabel(content,item,NewStatus)
    {
      this.SelectedKey=item;
      this.payload.NewStatus=Number(NewStatus);
      switch (Number(NewStatus)) {
        case 40:
          this.StatusChangeLabel="Enable";
          this.StatusContent="Application which is using this API will be able to Authenticate or communicate with the server.  ";
       
          break;
          case 41:
          this.StatusContent="Application which is using this API willnot be able to Authenticate or communicate with the server. You can Activate it again later for it to work ";
          this.StatusChangeLabel="Disable";

          break;
          case 42:
          this.StatusContent="Application which is using this API will not be able to Authenticate or communicate with the server. This cannot be undone and APIkey will be deleted permanently";
          this.StatusChangeLabel="Delete";
          break;
       
      }

      this.modelpop=this.modalService.open(content, {}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

   
    }

    NavigateToAdd()
    {
      this.router.navigateByUrl("/pages/CreateAPIKey");
    }
}
