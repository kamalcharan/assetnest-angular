//var BaseUrl="https://assetnestapi.herokuapp.com/api/"
var  BaseUrl ="http://localhost:3000/api/"
var version ="1.1"
export const APIURL = {
    BaseUrl: BaseUrl,
    TestAPI:BaseUrl ,
    ValidateLogin : BaseUrl +"users/login",
    GetCategoryMasters: BaseUrl + "CreateMaster/GetCategoryData",
    CreateCompanyBrandMap: BaseUrl + "CompanyBrandMap",
    GetAllBrandsForCompany: BaseUrl + "CompanyBrandMap",
    ActiveInactiveBrands: BaseUrl + "CompanyBrandMap/ActiveInactive",
    CompanySignup :BaseUrl+"users/UserCreation",
    GetAdminToken:BaseUrl +"GetAdminToken",  
    SaveUsersData: BaseUrl + "CreateMaster/SaveUSersList",
    GetUSersList: BaseUrl + "CreateMaster/GetUSersList",
    ActiveInactiveUser: BaseUrl + "CreateMaster/InActiveDelete",

    ChangeAPIKeyStatus: BaseUrl + "APIKey/ChangeAPIKeyStatus",
    GenerateNewFullAccessAPIKey: BaseUrl + "APIKey/GenerateNewFullAccessAPIKey",
    ChangeFullAccesKeyStatus: BaseUrl + "APIKey/ChangeFullAccesKeyStatus",
    GenerateNewAPIKey: BaseUrl + "APIKey/GenerateNewAPIKey",
    GetAllAPIkeyData: BaseUrl + "APIKey/GetAllAPIkeyData",
    GetALLMenus:BaseUrl+"Menus/getMenus"
  }