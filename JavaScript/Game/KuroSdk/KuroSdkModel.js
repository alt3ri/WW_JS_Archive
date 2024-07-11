"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroSdkModel = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  ModelBase_1 = require("../../Core/Framework/ModelBase"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  UiNavigationGlobalData_1 = require("../Module/UiNavigation/New/UiNavigationGlobalData"),
  KuroSdkDefine_1 = require("./KuroSdkDefine"),
  KuroSdkReport_1 = require("./KuroSdkReport"),
  LAGUSANSBOLD = "LaguSansBold.otf",
  MOTOYTA = "MotoyaAporoStdW5.otf",
  SUITEBOLD = "SUITE-Bold.otf",
  H7GBKHEAVY = "H7GBKHeavy.TTF";
class KuroSdkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ReportedInitState = !1),
      (this.TSe = void 0),
      (this.LSe = new Map()),
      (this.CanUseSdk = !1),
      (this.CurrentPayItemName = ""),
      (this.SdkGetFocusState = !1);
  }
  OnInit() {
    return (
      (this.CanUseSdk =
        UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
        BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
          KuroSdkDefine_1.USESDK),
      KuroSdkReport_1.KuroSdkReport.Init(),
      !0
    );
  }
  OnQueryProductInfo(e) {
    e.forEach((e) => {
      this.LSe.set(e.GoodId, e);
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnQueryProductInfo,
      );
  }
  GetQueryProductCurrency(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
      (e = this.LSe.get(e.ProductId));
    return e && e.Currency ? e.Currency : "";
  }
  GetQueryProductPrice(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
      (e = this.LSe.get(e.ProductId));
    return e && e.Price ? e.Price : 0;
  }
  GetQueryProductShowPrice(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
      (e = this.LSe.get(e.ProductId));
    if (e && e.Currency && e.Price) return e.Currency + e.Price;
  }
  GetQueryProductName(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
      (e = this.LSe.get(e.ProductId));
    if (e) return e.Name;
  }
  GetQueryProductDesc(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e))),
      (e = this.LSe.get(e.ProductId));
    if (e) return e.Desc;
  }
  GetBasicInfo() {
    if (this.CanUseSdk)
      return (
        this.TSe?.bIsValid || (this.TSe = UE.KuroSDKManager.GetBasicInfo()),
        this.TSe
      );
  }
  GetDeviceFontAsset() {
    var e = this.GetFontAsset();
    return this.BXs(e);
  }
  GetFontAsset() {
    switch (LanguageSystem_1.LanguageSystem.PackageLanguage) {
      case "en":
        return LAGUSANSBOLD;
      case "ja":
        return MOTOYTA;
      case "ko":
        return SUITEBOLD;
      case "ru":
      case "de":
      case "es":
      case "pt":
      case "id":
      case "fr":
      case "vi":
      case "th":
        return LAGUSANSBOLD;
      default:
        return H7GBKHEAVY;
    }
  }
  BXs(e) {
    return "IOS" === UE.GameplayStatics.GetPlatformName()
      ? e === LAGUSANSBOLD
        ? "LaguSans-Bold.otf"
        : e === H7GBKHEAVY
          ? "ARFangXinShuH7GBK-HV.ttf"
          : e === MOTOYTA
            ? "MotoyaAporoStd-W5.otf"
            : e === SUITEBOLD
              ? "SUITE-Bold.otf"
              : e
      : e;
  }
  GetCurrentFontName() {
    switch (this.GetFontAsset()) {
      case LAGUSANSBOLD:
        return "Lagu Sans";
      case H7GBKHEAVY:
        return "文鼎方新书H7GBK_H";
      case MOTOYTA:
        return "Motoya Aporo Std W5";
      case SUITEBOLD:
        return "SUITE";
      default:
        return "文鼎方新书H7GBK_H";
    }
  }
  OnSdkFocusChange(e) {
    (this.SdkGetFocusState = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "OnSdkFocusChange", ["state", e]),
      this.SdkGetFocusState
        ? UiNavigationGlobalData_1.UiNavigationGlobalData.AddBlockListenerFocusTag(
            "SdkFocus",
          )
        : UiNavigationGlobalData_1.UiNavigationGlobalData.DeleteBlockListenerFocusTag(
            "SdkFocus",
          ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSdkFocusStateChange,
        this.SdkGetFocusState,
      );
  }
  GetSdkFocusState() {
    return this.SdkGetFocusState;
  }
}
exports.KuroSdkModel = KuroSdkModel;
//# sourceMappingURL=KuroSdkModel.js.map
