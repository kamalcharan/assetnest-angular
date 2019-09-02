import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import{UserDataServiceService} from '../../shared/user-data-service.service';
import{CommonserviceService} from '../../shared/commonservice.service';
import { APIURL } from "../../../URL"
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    logoUrl= APIURL.Image_Path+ "1gn0sWfrFhRSQkdNDzOjBBfuYtZ0co3S8";
    public menuItems: any[];

    newMenuItems=[];
    UserData:any;
    currentEnv=null;
    constructor(private router: Router,  private service: CommonserviceService,
        private route: ActivatedRoute,private UserService:UserDataServiceService) {

            this.UserData= JSON.parse(UserService.getData()) ;
            this.currentEnv= this.UserData.IsLive;
            this.getMenuItems();
    }

    ngOnInit() {
       
        $.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    //NGX Wizard - skip url change
    ngxWizardFunction(path: string) {
        if (path.indexOf('forms/ngx') !== -1)
            this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
    LogOut(){
        this.UserService.logoutUser();
        this.router.navigateByUrl("/pages/login")
      }

      getMenuItems()
      {
        this.service.getMethod(APIURL.GetALLMenus,this.UserData.Token).subscribe(data => {


            if(data)
            {
            if(data.Response)
            {
                if(data.Response==1)
                {
                    this.newMenuItems= data.Data;
                    if(this.UserData.Company._id==1)
                    {
                        this.newMenuItems.forEach(x=>{
                            x.class="";
    
                            if(x.SubMenus.length>0)
                            {
                                x.class="has-sub"
                            }
                        })
    
                    }
                    else{


                        this.newMenuItems=   this.newMenuItems.filter(x=>x.Admin==1)
                        this.newMenuItems.forEach(x=>{
                            x.SubMenus= x.SubMenus.filter(x=>x.Admin==1);
                            x.class="";
    
                            if(x.SubMenus.length>0)
                            {
                                x.class="has-sub"
                            }
                        })
    
                    }
                   
                    


                    
                }
            }
            }
            
        },
        error=>{
            console.log(error);
        });

      }
      Select(value)
  {

    this.UserService.SetEnvironment(Number(value));
    this.currentEnv=value;
  //  this.router.navigateByUrl("dashboard/dashboard1");
  }
}
