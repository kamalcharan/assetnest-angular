//var BaseUrl="https://assetnestapi.herokuapp.com/api/"
var  BaseUrl ="http://localhost:3000/api/"
var version ="1.1"
export const APIURL = {
    BaseUrl: BaseUrl,
    TestAPI:BaseUrl ,
    Image_Path:"https://drive.google.com/uc?export=view&id=",
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
    GetALLMenus:BaseUrl+"Menus/getMenus",
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