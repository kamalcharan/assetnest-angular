import { Component, OnInit,ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{UserDataServiceService} from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL"
@Component({
  selector: 'app-region-creation',
  templateUrl: './region-creation.component.html',
  styleUrls: ['./region-creation.component.scss']
})
export class RegionCreationComponent implements OnInit {
  UserData: any;
  closeResult: any;
  region={
    "Name":null
  }
  regionList=[]
  constructor(private modalService: NgbModal,public cms: CommonserviceService,vcr: ViewContainerRef,public toastr: ToastsManager,private UserService:UserDataServiceService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.UserData=JSON.parse(this.UserService.getData());
   }

  ngOnInit() {
    this.getregionDeatils()
  }
  getregionDeatils(){
    this.cms.getMethod(APIURL.GetRegionDetails+ '/'+this.UserData.Company._id,this.UserData.Token).subscribe(list=>{
      console.log("hvdhvds",list)
        this.regionList=list.Data;
    })
  }
  modelpop: any;
  CreateRegion(content){
    
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
    AddRegion(){
      var payload={
        "Name":this.region.Name,
        "CompanyID":this.UserData.Company._id,
        "isLive":this.UserData.IsLive,
        "CreatedBy":this.UserData._id
      }
      this.cms.PostMethod(APIURL.InsertRegions,payload,this.UserData.Token).subscribe(list=>{
        if (list.Response == 1) {
          this.getregionDeatils()
          this.region={
            "Name":null  
          }
          this.toastr.success(list.Message);
        }
      })
    }

}
