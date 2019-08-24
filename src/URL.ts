//var BaseUrl="hhttps://assetnestapi.herokuapp.com/api/"
var  BaseUrl ="http://localhost:3000/api/"
var version ="1.1"
export const APIURL = {
    BaseUrl: BaseUrl,
    TestAPI:BaseUrl ,
    ValidateLogin : BaseUrl+"users/login",
    CompanySignup :BaseUrl+"users/UserCreation",
    GetCategoryMasters: BaseUrl + "CreateMaster/GetCategoryData",
    GetAdminToken:BaseUrl +"GetAdminToken"

   
  }