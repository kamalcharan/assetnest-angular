import { Component, OnInit, ViewChild,TemplateRef, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CommonserviceService } from "../shared/commonservice.service"
import { APIURL } from "../../URL"
import { UserDataServiceService } from '../shared/user-data-service.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('buttonsTemplate') buttonsTemplate: TemplateRef<any>;
  CompanyData=[];
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
  rows = [];
  temp = [];
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles { prop: 'Alias_Name' },
    columns = [
      
        
        

    ];
    
  
  SearchType="";
  SearchKey=null;
  UserData:any;
  pageSize=10
  sorts="[ {prop: 'ID', dir: 'asc'},{prop: 'Name', dir: 'asc'},{prop: 'Country', dir: 'asc'} ,{prop: 'State', dir: 'asc'},{prop: 'City', dir: 'asc'},{prop: 'Pincode', dir: 'asc'},{prop: 'CompanyCategory', dir: 'asc'},{prop: 'BusinessPlan', dir: 'asc'}]" 
  constructor(private modalService: NgbModal, private router: Router, private service: CommonserviceService,
    private route: ActivatedRoute, private UserService: UserDataServiceService,
    private titlecasePipe:TitleCasePipe,
    vcr: ViewContainerRef, public toastr: ToastsManager) { 


      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
   this. columns = [
      
      {prop:'SLID',name:'ID'},
      { prop: 'Name' },
      { prop: 'CompanyID' },
      // { prop: 'Country' },
      { prop: 'State' },
      { prop: 'City' },
     
     
      { prop: 'Category' },
      { prop: 'BusinessPlan' },
      {prop :'Actions', name: 'Actions', cellTemplate: this.buttonsTemplate,}
      

  ];
    this.UserData= JSON.parse(this.UserService.getData()) ;
    this.Search();
  }
  parameterChange()
  {
    this.payload={
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
  }
  Search()
  {

    // <option value="Name">Company Name</option>
    // <option value="Country">Country</option>
    // <option value="State">State</option>
    // <option value="City">City</option>
    // <option value="Pincode">Pincode</option>
    try {

      if(this.SearchType=="Name")
      {
        this.payload.Name=this.SearchKey;
      }
      if(this.SearchType=="Country")
      {
        this.payload.Country=this.SearchKey;
      }
      if(this.SearchType=="State")
      {
        this.payload.State=this.SearchKey;
      }

      if(this.SearchType=="City")
      {
        this.payload.City=this.SearchKey;
      }
      if(this.SearchType=="Pincode")
      {
        this.payload.Pincode=this.SearchKey;
      }

      this.service.PostMethod(APIURL.CompanySearch,this.payload, this.UserData.Token).subscribe(
        data=>{
          if(data)
          {
            if(data.Response==1)
            {

              this.CompanyData=data.Data;
              this.CompanyData.forEach((x,index)=>{
              x.Name=this.titlecasePipe.transform(x.Name)
               
               x.Country=this.titlecasePipe.transform(x.Country)
              x.State=this.titlecasePipe.transform(x.State)
               x.City=this.titlecasePipe.transform(x.City)

                //;
                x.SLID=index+1;
               
                x.BusinessPlan=""


                if(x.BusinessModelStatus)
                {
                  if(x.BusinessModelStatus.Name)
                  {
                    x.BusinessPlan=x.BusinessModelStatus.Name
                  }
                }
                x.Category ="";

                if(x.CompanyType)
                {
                  if(x.CompanyType.Name)
                  {
                    x.Category=x.CompanyType.Name
                  }
                }
              


              })
              this.rows = this.CompanyData;
              this.temp=[...this.CompanyData];
              setTimeout(() => { this.loadingIndicator = false; }, 1500);

            }
            else if(data.Response==3)
            {
              this.CompanyData=[];
              this.temp=[];
              this.rows=[];
            }
            else if(data.Response==2)
            {
              this.toastr.error(data.Message);

            }

          }
          else{
            this.toastr.error(data);
          }

        },
        error=>{
          console.log(error);
        }
      )
    


      
    } catch (error) {
console.log(error);

      
    }
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    this.temp.filter((obj: any) => {
      return Object.keys(obj).some((key) => {
        if (obj[key]) {
          const tempKey = obj[key].toString().toLowerCase();
          const tempSearch = val.toLowerCase();
          return tempKey.includes(tempSearch);
        }
      });
    });
    // filter our data
    // const temp = this.temp.filter(function (d) {
    //     return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    const temp= this.temp.filter((obj: any) => {
      return Object.keys(obj).some((key) => {
        if (obj[key]) {
          const tempKey = obj[key].toString().toLowerCase();
          const tempSearch = val.toLowerCase();
          return tempKey.includes(tempSearch);
        }
      });
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}

OnbuttonClick(value)
{
  console.log(value);

  this.router.navigate(['pages/Settings'], { skipLocationChange: false, queryParams: { CompanyID: value._id} })
}
}
