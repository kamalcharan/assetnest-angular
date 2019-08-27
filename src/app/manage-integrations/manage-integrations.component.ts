import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-manage-integrations',
  templateUrl: './manage-integrations.component.html',
  styleUrls: ['./manage-integrations.component.scss']
})
export class ManageIntegrationsComponent implements OnInit {
  UserData: any;
  id: any;
  SignleData=[];
  closeResult: string;
  constructor(private modalService: NgbModal,private user: UserDataServiceService, private commonServices: CommonserviceService, 
    vcr: ViewContainerRef, public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
      this.toastr.setRootViewContainerRef(vcr);
      this.UserData=JSON.parse(this.user.getData());
      this.route.queryParams.subscribe(params => {
        console.log("come to params", params);
        this.id=params.id;
      })
  }

  ngOnInit() {
    this.singlepayloadData()

  }
  singlepayloadData(){
    this.commonServices.getMethod(APIURL.GetManageData+'/'+this.id, this.UserData.Token).subscribe(data=>{
     console.log("single latest",data);
     this.SignleData=data.Data;
    })

  }
  DisconnectData(){
    this.commonServices.getMethod(APIURL.DisConnecdData+'/'+this.id, this.UserData.Token).subscribe(data=>{
      console.log("single latest",data);
      if (data.Response == 1) {
        this.toastr.success(data.Message);
      }else{
        this.toastr.error(data.Message);
 
      }
     })
 
   } 
   BackNav(){
    this.router.navigate(['/pages/Settings2'], { skipLocationChange: false })

   }
   Connectarameters(item,content){
     console.log("this.sinad",this.SignleData);
    this.modalService.open(content, {}).result.then((result) => {
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
  checkUpdate(item){
    this.commonServices.PostMethod(APIURL.UpdateTblCompany,item,this.UserData.Token).subscribe(list=>{
      if (list.Response == 1) {
        this.toastr.success(list.Message);
      }else{
        this.toastr.error(list.Message);
 
      }
    })
  }
  
}
