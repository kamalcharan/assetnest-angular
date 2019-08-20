import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class CommonserviceService {
  providerDetails = new Subject<any>();
  private loderStatus = new Subject<Boolean>();
  public SendMessages$ = this.loderStatus.asObservable();
  constructor(private myRoute: Router,
    private http: Http) { }
    createObservable() {
      return this.providerDetails.asObservable();
  }
  getMethod(url) {
    this.loderStatus.next(true);
    return this.http.get(url)
        .map((res) => {
            this.loderStatus.next(false);
            try {
                let data = res.json();
            
                if (data) {
                    if (data.Response) {
                        if (data.Response == 403) {
                            var err = {
                                status: data.Response,
                                statusText: "token exire"
                            }
                           // this.ErrorHandler(err);
                           return Observable.throw(err);
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        return data;
                    }
                }
                else {
                    return data;
                }
               
            } catch (err) {
                this.ErrorHandler(err);
            }

        })
        .catch(this.ErrorHandler);
}

PostMethod(url, data) {
    this.loderStatus.next(true);
    return this.http.post(url, data)
        .map((res) => {
            try {
                this.loderStatus.next(false);
                let data = res.json();
                if (data) {
                    if (data.Response) {
                        if (data.Response == 403) {
                            var err = {
                                status: data.Response,
                                statusText: "token exire"
                            }
                           // this.ErrorHandler(err);
                           return Observable.throw(err);
                        }
                        else {
                            return data;
                        }
                    }
                    else {
                        return data;
                    }
                }
                else {
                    return data;
                }
            } catch (err) {
                this.ErrorHandler(err);
            }
        })
        .catch(this.ErrorHandler);
}
private ErrorHandler(err) {

  // this.loderStatus.next({Condition:true});
  var obj = {
      code: err.status,
      Message: err.statusText,
  };

  if(!obj.Message)
  {
      obj.Message = 404;
      obj.code =err.message;
      
  }
  // ;
  //  console.log(obj)
  // this.myRoute.navigate(["login"]);
  return Observable.throw(obj);
}

}
