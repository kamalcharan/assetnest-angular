import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CommonserviceService {
  providerDetails = new Subject<any>();
  private loderStatus = new Subject<Boolean>();
  public SendMessages$ = this.loderStatus.asObservable();
  constructor(private myRoute: Router,
    private http: Http,private httpc: HttpClient) { }
    createObservable() {
      return this.providerDetails.asObservable();
  }
 
   //headers.append('Content-Type', 'application/json');
  getMethod(url, token) {
  
      let myHeaders = new Headers(); 
      myHeaders.set('Content-Type', 'application/json');
  
      myHeaders.set('accesstoken', token); 
    
      let options = new RequestOptions({ headers: myHeaders });
    //this.loderStatus.next(true);
    return this.http.get(url,options)
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

PostMethod(url, data,token) {
    let myHeaders = new Headers(); 
    myHeaders.set('Content-Type', 'application/json');
   
    myHeaders.set('accesstoken', token); 
   
    let options = new RequestOptions({ headers: myHeaders });
    this.loderStatus.next(true);
    return this.http.post(url, data,options)
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
getMethodWithoutToken(url) {
  
    // let myHeaders = new Headers(); 
    // myHeaders.set('Content-Type', 'application/json');
    // myHeaders.set('Accept', 'text/plain');  
    // myHeaders.set('accesstoken', token); 
    // let myParams = new URLSearchParams();
    // let options = new RequestOptions({ headers: myHeaders, params: myParams });
  //this.loderStatus.next(true);
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


PostWithClient(url, data,token)
{
    
    const header = {'accesstoken':token , 'content-type': 'application/json'} ;

    return this.httpc.request("post", url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    }).map((res:any) => {
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
}
