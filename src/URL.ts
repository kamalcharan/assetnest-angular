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
    getSingleManageIntegrate: BaseUrl + "CreateMaster/getSingleManageIntegrate",
    GetproductCategoories: BaseUrl + "CreateMaster/GetproductCategories",
    InsertCategories: BaseUrl + "CreateMaster/InsertProductCategories",
    GetcategoryList: BaseUrl + "CreateMaster/GetcategoryList",
    GetSubCategories: BaseUrl + "CreateMaster/GetSubCategories",
    DeleteCategory: BaseUrl + "CreateMaster/DeleteCategory",
    InsertRegions: BaseUrl + "CreateMaster/InsertRegions",
    GetRegionDetails: BaseUrl + "CreateMaster/GetRegionDetails",
    DeleteRegionUpdate: BaseUrl + "CreateMaster/DeleteRegionUpdate",
    GetMobileList:BaseUrl + "CreateMaster/GetMobileList",
    GET_SINGLE_PANEL: BaseUrl + "CreateMaster/GetSinglePanel",
    SAVE_MOBILE_LIST: BaseUrl + "CreateMaster/SaveMobileAnelList",
    GET_PANAL_LIST: BaseUrl + "CreateMaster/GetPanelList",
    GET_API_DATA: BaseUrl + "APIKey/GetAllAPIkeyData"
  }