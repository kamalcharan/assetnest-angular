var BaseUrl="https://assetnestapi.azurewebsites.net/api/"

var version ="1.1"
export const APIURL = {
    TestAPI:BaseUrl ,
    ValidateLogin : BaseUrl+"users/login",
    CompanySignup :BaseUrl+"users/UserCreation",
    GetCategoryMasters: BaseUrl + "CreateMaster/GetCategoryData",
    GetAdminToken:BaseUrl +"GetAdminToken"

   
  }