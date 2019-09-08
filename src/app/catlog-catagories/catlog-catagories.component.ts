import { Component, OnInit,ViewChild, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import{UserDataServiceService} from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL"
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-catlog-catagories',
  templateUrl: './catlog-catagories.component.html',
  styleUrls: ['./catlog-catagories.component.scss']
})
export class CatlogCatagoriesComponent implements OnInit {
  UserData: any;
  QueryCompanyID=null;
    constructor(private router: Router,
      private route: ActivatedRoute,private modalService: NgbModal,public cms: CommonserviceService,vcr: ViewContainerRef,public toastr: ToastsManager,private UserService:UserDataServiceService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.route.queryParams.subscribe(params => {
      if(params.CompanyID)
      {
        this.QueryCompanyID=Number(params.CompanyID);
      }
    })
    this.UserData=JSON.parse(this.UserService.getData());
    if(  this.QueryCompanyID)
    {
      this.UserData.Company._id=this.QueryCompanyID;
    }
    console.log("this.UserData",this.UserData);
   }

  ngOnInit() {
    this.getSavedroductCategories()
  }
  modelpop: any;
  closeResult: string;
  categoryList=[];
  CategorySavedList=[];
  SubCategoryList=[];
  existData:Boolean=false;
  paylaod={
    "categoryID":null,
    "categoryName":null,
    "SubcategoryID":null,
    "SubcategoryName":null,
    "CompanyID":null,
    "_id":null
  }
  getSavedroductCategories(){
    this.cms.getMethod(APIURL.GetcategoryList+ '/'+ this.UserData.Company._id,this.UserData.Token).subscribe(list=>{
      if(list.Response==1){
        this.CategorySavedList=list.Data;
        console.log("fjskdbfdsf",this.CategorySavedList);
      }
    })
  }
  Cretecategory(content){   
    this.categoryList=[]; 
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
    GetParentsCategories(){
      this.categoryList=[];
      this.cms.getMethod(APIURL.GetproductCategoories,this.UserData.Token).subscribe(list=>{
        if(list.Response==1){
          this.categoryList=list.Data;

        }

      })
    }
    GetSubCategories(){
      this.SubCategoryList=[];
      this.cms.getMethod(APIURL.GetSubCategories+ '/' +this.paylaod.categoryID,this.UserData.Token).subscribe(list=>{
        if(list.Response==1){
          this.SubCategoryList=list.Data
          this.CategorySavedList.forEach(x=>{
            x.SubCategoryList.forEach(y=>{
              this.SubCategoryList.forEach((z,index)=>{
                if(y.SubCategoryID==z._id){
                  this.SubCategoryList.splice(index, 1);
                }
              }) 
            })
          })
        } 
      })
    }
    clickSubCategory(list){
   this.paylaod.SubcategoryID=list._id;
   this.paylaod.SubcategoryName=list.Name
    }
    AddSubCategory(item,content){
     console.log("check",item);
     this.SubCategoryList=[];
     this.paylaod.categoryID=item.FK_CategoryID;
     this.paylaod.categoryName=item.CategoryName;
     this.subCategoryListFinal=item.SubCategoryList;
     this.paylaod._id=item._id;
     this.modelpop=this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
   clickCategory(item){
  this.paylaod.categoryID=item._id;
  this.paylaod.categoryName=item.Name;
    }
    AddCategoryData(){
      var payloadData={
        "CompanyID":this.UserData.Company._id,
        "FK_CategoryID":this.paylaod.categoryID,
        "CategoryName": this.paylaod.categoryName,
        "SubCategoryList":[],
        "CreatedBy":this.UserData._id,
        "UpdatedBy":this.UserData._id,
        "IsLive":this.UserData.IsLive
      }
      console.log("check nsbdjs",payloadData);
      if(this.paylaod.categoryName){
        this.cms.PostMethod(APIURL.InsertCategories,payloadData,this.UserData.Token).subscribe(data=>{
          if(data.Response==1){
            this.toastr.success(data.Message);
            this.getSavedroductCategories()
            this.paylaod={
              "categoryID":null,
              "categoryName":null,
              "SubcategoryID":null,
              "SubcategoryName":null,
              "CompanyID":null,
              "_id":null
            }
          }
        })
      }else{
        this.toastr.error("Please Select Category"); 
      }
     
    }
    subCategoryListFinal=[]
    AddSubCategoryData(){
      var data={
        "SubCategoryID":this.paylaod.SubcategoryID,
        "SubcategoryName":this.paylaod.SubcategoryName
      }
      this.subCategoryListFinal.push(data);
      var payloadData={
        "CompanyID":this.UserData.Company._id,
        "FK_CategoryID":this.paylaod.categoryID,
        "CategoryName": this.paylaod.categoryName,
        "SubCategoryList":this.subCategoryListFinal,
        "CreatedBy":this.UserData._id,
        "UpdatedBy":this.UserData._id,
        "_id":this.paylaod._id
      }
      console.log("check nsbdjs",payloadData);
      this.cms.PostMethod(APIURL.InsertCategories,payloadData,this.UserData.Token).subscribe(data=>{
        if(data.Response==1){
          this.toastr.success(data.Message);
          this.getSavedroductCategories()
          this.paylaod={
            "categoryID":null,
            "categoryName":null,
            "SubcategoryID":null,
            "SubcategoryName":null,
            "CompanyID":null,
            "_id":null

          }
        }
      })
    }
    DownData(item){
    console.log("chek",item);
    this.CategorySavedList.forEach(x=>{
      if(x._id==item._id){
        if(x.existData){
          x.existData=false
        }else{
          x.existData=true
        }
      }
    })
     

    }
    ConfirmDeleted(){
     this.deleteList(this.DeletedItem); 
    }
    deleteList(item){
      this.cms.PostMethod(APIURL.DeleteCategory,item,this.UserData.Token).subscribe(list=>{
        if(list.Response==1){
          this.toastr.success(list.Message);
          this.getSavedroductCategories()
        }
      })
    }
    ConfirmDeletedSub(){
      this.DeleteSubList(this.DeleteSubPopUpData,this.itemvalues); 
 
    }
    DeleteSubList(item,values){
      item.SubCategoryList.forEach((y,index)=>{
          if(y.SubCategoryID==values.SubCategoryID){
            item.SubCategoryList.splice(index,1); 
          }
        })
        var payloadData={
          "CompanyID":this.UserData.Company._id,
          "FK_CategoryID":item.FK_CategoryID,
          "CategoryName": item.CategoryName,
          "SubCategoryList":item.SubCategoryList,
          "CreatedBy":this.UserData._id,
          "UpdatedBy":this.UserData._id,
          "_id":item._id
        }
        console.log("check nsbdjs",payloadData);
        this.cms.PostMethod(APIURL.InsertCategories,payloadData,this.UserData.Token).subscribe(data=>{
          if(data.Response==1){
            this.toastr.success(data.Message);
            this.getSavedroductCategories()
            this.paylaod={
              "categoryID":null,
              "categoryName":null,
              "SubcategoryID":null,
              "SubcategoryName":null,
              "CompanyID":null,
              "_id":null
  
            }
          }
        })
    
     
    }
    DeleteSubPopUpData: any;
    DeletedItem: any;
    itemvalues: any;
    deletePop(item,content){
      this.DeletedItem=item;
      this.modalService.open(content, {}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    DeleteSubPopUp(item,values,content){
      this.DeleteSubPopUpData=item;
      this.itemvalues=values
      this.modalService.open(content, {}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}
