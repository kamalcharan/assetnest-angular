//var BaseUrl="https://assetnestapi.azurewebsites.net/api/"
var BaseUrl="http://localhost:3000/api/"
var version ="1.1"
export const APIURL = {
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
    GetParentData: BaseUrl + "CreateMaster/getParentData",
    CategoryMastersList: BaseUrl + "CreateMaster/GetCategoryMastersList",
    getSingleIntegrations: BaseUrl + "CreateMaster/getSingleIntegrations",
    InsertCompanyIntegration: BaseUrl + "CreateMaster/insertCompanyIntegration",
    AppsConnectedData: BaseUrl + "CreateMaster/AppsConnectedData",
    GetManageData: BaseUrl + "CreateMaster/GetManageData",
    DisConnecdData: BaseUrl + "CreateMaster/DisConnecdData",
    UpdateTblCompany: BaseUrl + "CreateMaster/UpdateTblCompany",
    UpdateDefaultText: BaseUrl + "CreateMaster/UpdateDefaultText",
    getSingleManageIntegrate: BaseUrl + "CreateMaster/getSingleManageIntegrate"
  }