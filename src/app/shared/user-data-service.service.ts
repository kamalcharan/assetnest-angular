import { Injectable } from '@angular/core';

@Injectable()
export class UserDataServiceService {
userData={
  "_id": null,
  "Name": null,
  "EmailID": null,
  "Company": {
      "CompanyID": null,
      "Name": null,
      "Alias_Name": null,
      "LogoURL": null,
      "Country": null,
      "State": null,
      "City": null,
      "Address": null,
      "Pincode": null,
      "CompanyType": null,
      "BusinessModelStatus": null,
      "Status": null,
      "_id": null
  },
  "Status": null
}
  constructor() { }

  setData(user)
  {
    localStorage.clear();
    localStorage.setItem("UserData", JSON.stringify(user));
  }

  getData()
  {
    let myItem = localStorage.getItem("UserData");

    
    return myItem;

  }
  isUserDataExists()
  {
    if (localStorage.length > 0) {
      if(localStorage.getItem("UserData"))
      {

        return true;
      }
      else{
        return false
      }

      // We have items
    } else {
      return false;
    }
  }
  logoutUser()
  {
    localStorage.clear();
  }

}
