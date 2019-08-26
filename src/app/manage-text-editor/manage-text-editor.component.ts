import { Component, OnInit, ViewContainerRef,ViewChild } from '@angular/core';
import {CommonserviceService} from "../shared/commonservice.service"
import{ APIURL} from "../../URL";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataServiceService } from '../shared/user-data-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Quill from 'quill';
// const Parchment = Quill.import('parchment');
// let Block = Parchment.query('block');
// import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';


import Counter from '../../app/components/extra/editor/counter';
@Component({
  selector: 'app-manage-text-editor',
  templateUrl: './manage-text-editor.component.html',
  styleUrls: ['./manage-text-editor.component.scss']
})
export class ManageTextEditorComponent implements OnInit {

  UserData: any;
  id: any;
  SignleData=[];
  closeResult: string;
  users={
    "id":null,
    "Name":null,
    "type":null,
    "DisplayText":null
  }
  ckeConfig = {
    height: 150,
    language: 'en',
    allowedContent: true,
    toolbar: [
      // tslint:disable-next-line:max-line-length
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'CreateDiv', '-', 'Blockquote', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    ]
  };
  hide = false;
  isReadOnly = false;
  constructor(private user: UserDataServiceService, private commonServices: CommonserviceService, 
    vcr: ViewContainerRef, public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
      this.toastr.setRootViewContainerRef(vcr);
      
      this.UserData=JSON.parse(this.user.getData());
      this.route.queryParams.subscribe(params => {
        console.log("come to params", params);
        this.users.id=params.id;
        this.users.Name=params.Name;
        this.users.type=params.Type;
        this.users.DisplayText=params.Display;
       
      })
  }

  ngOnInit() {
  

  }
  
  BackNav(){
    var val={
      "id": this.users.id
    }
    this.router.navigate(['/pages/Integrations'], { skipLocationChange: false, queryParams: val })

  }
  updateCkeditor(){
    this.commonServices.PostMethod(APIURL.UpdateDefaultText,this.users,this.UserData.Token).subscribe(data=>{
      if (data.Response == 1) {
        this.toastr.success(data.Message);
      }else{
        this.toastr.error(data.Message);
 
      }
    })
  }

}
