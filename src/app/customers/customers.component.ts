import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  payload={
    _id :null, 
    CompanyID : null, 
    Name : null, 
    Alias_Name: null, 
    LogoURL : null, 
    Country : null, 
    State : null, 
    City : null, 
    Address : null, 
    Pincode : null, 
    CompanyType :null, 
    BusinessModelStatus: null
 
  }

  SearchType=null;
  SearchKey=null;
  constructor(private modalService: NgbModal, private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    vcr: ViewContainerRef, public toastr: ToastsManager) { 


      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
  }

}
