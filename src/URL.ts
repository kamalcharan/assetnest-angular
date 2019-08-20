var BaseUrl="http://localhost:3000/api/"

var version ="1.1"
export const APIURL = {
    TestAPI:BaseUrl ,
    ValidateLogin : BaseUrl+version +"users/login",
    GetCategoryMasters: BaseUrl + "CreateMaster/GetCategoryData"
   
  }