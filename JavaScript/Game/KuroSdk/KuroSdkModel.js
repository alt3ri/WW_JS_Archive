"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroSdkModel = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  AchievementAll_1 = require("../../Core/Define/ConfigQuery/AchievementAll"),
  PlayStationActivityConfigAll_1 = require("../../Core/Define/ConfigQuery/PlayStationActivityConfigAll"),
  ModelBase_1 = require("../../Core/Framework/ModelBase"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameSettingsManager_1 = require("../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UiNavigationGlobalData_1 = require("../Module/UiNavigation/New/UiNavigationGlobalData"),
  KuroSdkDefine_1 = require("./KuroSdkDefine"),
  KuroSdkReport_1 = require("./KuroSdkReport"),
  LAGUSANSBOLD = "LaguSansBold.otf",
  MOTOYTA = "MotoyaAporoStdW5.otf",
  SUITEBOLD = "SUITE-Bold.otf",
  H7GBKHEAVY = "H7GBKHeavy.TTF",
  DEFAULTEMPTY = " ";
class KuroSdkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ReportedInitState = !1),
      (this.TSe = void 0),
      (this.LSe = new Map()),
      (this.FBa = new Map()),
      (this.CanUseSdk = !1),
      (this.CurrentPayItemName = ""),
      (this.SdkGetFocusState = !1),
      (this.SdkBlockUserMap = new Map()),
      (this.bxa = !1),
      (this.PlayStationPlayOnlyState = !1),
      (this.UserId = void 0),
      (this.OnlineId = void 0),
      (this.bka = -1),
      (this.qka = void 0),
      (this.AccountId = void 0),
      (this.CurrentPayingOrderId = ""),
      (this.NeedOpenReviewState = !1),
      (this.ReviewDelay = 0),
      (this.NeedReviewConfirmBox = !1),
      (this.QueryPromise = void 0);
  }
  OnInit() {
    return (
      (this.CanUseSdk =
        UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
        BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
          KuroSdkDefine_1.USESDK),
      KuroSdkReport_1.KuroSdkReport.Init(),
      this.VBa(),
      this.InitProgressActivityList(),
      !0
    );
  }
  OnGetSdkBlockUserMap(e) {
    (this.SdkBlockUserMap = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SDK屏蔽好友列表", ["blockUserMap", e]),
      (this.bxa = !0);
  }
  async GetSdkBlockUserMap() {
    return (
      this.bxa ||
        (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser()),
      this.SdkBlockUserMap
    );
  }
  async VBa() {
    var e = AchievementAll_1.configAchievementAll.GetConfigList();
    let t = 0;
    e?.forEach((e) => {
      0 <= e.ThirdPartyTrophyId && t++;
    });
    e =
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkTrophyInfo(
        0,
        t,
      );
    (this.FBa = new Map()),
      e?.forEach((e) => {
        this.FBa.set(e.TrophyId, e);
      });
  }
  GetSdkTrophyInfo() {
    return this.FBa;
  }
  InitProgressActivityList() {
    var t =
      PlayStationActivityConfigAll_1.configPlayStationActivityConfigAll.GetConfigList();
    if (t && 0 !== t.length) {
      var r = t.length;
      this.qka = new Array(r);
      for (let e = 0; e < r; e++) this.qka[e] = t[e];
    }
  }
  UpdateActivityProgress() {
    if (this.qka && 0 !== this.qka.length) {
      var r = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk();
      if (
        (this.bka < 0 &&
          ((this.bka = 0), r.StartActivity(this.qka[0].ActivityStringId)),
        !(this.bka >= this.qka.length - 1))
      ) {
        var a = this.qka.length,
          i = ModelManager_1.ModelManager.QuestNewModel;
        for (let e = this.bka, t = e + 1; t < a; e++, t++) {
          var o = this.qka[e],
            n = this.qka[t];
          if (0 !== n.QuestId && !i.CheckQuestFinished(n.QuestId)) break;
          r.EndActivity(o.ActivityStringId),
            r.StartActivity(n.ActivityStringId),
            (this.bka = t);
        }
      }
    }
  }
  GetNextProgressActivityQuestId() {
    return !this.qka || this.bka < 0 || this.bka + 1 >= this.qka.length
      ? -1
      : this.qka[this.bka + 1].QuestId;
  }
  OnQueryProductInfo(e) {
    e.forEach((e) => {
      this.LSe.set(e.GoodId, e);
    }),
      this.QueryPromise?.SetResult(!0),
      (this.QueryPromise = void 0);
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
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(
        Number(e),
      ).ProductId;
      const r =
        ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(t);
      return r
        ? r.Price
        : PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfShowDefaultPrice()
          ? void 0
          : DEFAULTEMPTY;
    }
    t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(Number(e));
    const r = this.LSe.get(t.ProductId);
    if (r && r.Currency && r.Price) return r.Currency + r.Price;
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
    return this.RJs(e);
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
  RJs(e) {
    return Platform_1.Platform.IsIOSPlatform()
      ? e === LAGUSANSBOLD
        ? "LaguSans-Bold.otf"
        : e === H7GBKHEAVY
          ? "ARFangXinShuH7GBK-Heavy.TTF"
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
  SetPlayStationPlayOnlyState(e) {
    this.PlayStationPlayOnlyState = e;
    var t = this.PlayStationPlayOnlyState ? 1 : 0;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetPlayOnly(
      e,
    ),
      GameSettingsManager_1.GameSettingsManager.SetApplySave(136, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SetPlayStationPlayOnlyState", [
          "state",
          e,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        136,
      );
  }
  GetSdkPackageId() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId()
      : ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
  }
}
exports.KuroSdkModel = KuroSdkModel;
//# sourceMappingURL=KuroSdkModel.js.map
