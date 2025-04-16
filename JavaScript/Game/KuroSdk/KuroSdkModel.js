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
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine"),
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
      (this.rba = new Map()),
      (this.CanUseSdk = !1),
      (this.CurrentPayItemName = ""),
      (this.SdkGetFocusState = !1),
      (this.SdkBlockUserMap = new Map()),
      (this.kxa = !1),
      (this.PlayStationPlayOnlyState = !1),
      (this.UserId = void 0),
      (this.OnlineId = void 0),
      (this.OFa = -1),
      (this.kFa = void 0),
      (this.AccountId = void 0),
      (this.CurrentPayingOrderId = ""),
      (this.NeedOpenReviewState = !1),
      (this.ReviewDelay = 0),
      (this.CurrentReviewId = 0),
      (this.NeedReviewConfirmBox = !1),
      (this.QueryPromise = void 0),
      (this.W3l = void 0),
      (this.NoticeRedDotState = !1),
      (this.NoticeSign = "1");
  }
  OnInit() {
    return (
      (this.CanUseSdk =
        UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
        BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
          KuroSdkDefine_1.USESDK),
      KuroSdkReport_1.KuroSdkReport.Init(),
      this.oba(),
      this.InitProgressActivityList(),
      !0
    );
  }
  OnGetSdkBlockUserMap(e) {
    (this.SdkBlockUserMap = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "SDK屏蔽好友列表", ["blockUserMap", e]),
      (this.kxa = !0);
  }
  async GetSdkBlockUserMap() {
    return (
      this.kxa ||
        (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkBlockingUser()),
      this.SdkBlockUserMap
    );
  }
  async oba() {
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
    (this.rba = new Map()),
      e?.forEach((e) => {
        this.rba.set(e.TrophyId, e);
      });
  }
  GetSdkTrophyInfo() {
    return this.rba;
  }
  InitProgressActivityList() {
    var t =
      PlayStationActivityConfigAll_1.configPlayStationActivityConfigAll.GetConfigList();
    if (t && 0 !== t.length) {
      var r = t.length;
      this.kFa = new Array(r);
      for (let e = 0; e < r; e++) this.kFa[e] = t[e];
    }
  }
  UpdateActivityProgress() {
    if (this.kFa && 0 !== this.kFa.length) {
      var e = this.OFa,
        r = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk();
      if (
        (this.OFa < 0 &&
          ((this.OFa = 0), r.StartActivity(this.kFa[0].ActivityStringId)),
        !(this.OFa >= this.kFa.length - 1))
      ) {
        var i = this.kFa.length,
          a = ModelManager_1.ModelManager.QuestNewModel;
        for (let e = this.OFa, t = e + 1; t < i; e++, t++) {
          var o = this.kFa[e],
            n = this.kFa[t];
          if (0 !== n.QuestId && !a.CheckQuestFinished(n.QuestId)) break;
          r.EndActivity(o.ActivityStringId),
            r.StartActivity(n.ActivityStringId),
            (this.OFa = t);
        }
      }
      e !== this.OFa && this.UpdateActivityAvailability();
    }
  }
  UpdateActivityAvailability() {
    if (!(!this.kFa || this.OFa < 0 || this.OFa >= this.kFa.length)) {
      var t = UE.NewArray(UE.BuiltinString),
        r = UE.NewArray(UE.BuiltinString);
      for (let e = 0; e < this.kFa.length; e++)
        (e === this.OFa ? t : r).Add(this.kFa[e].ActivityStringId);
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ChangeActivityAvailability(
        t,
        r,
      );
    }
  }
  GetNextProgressActivityQuestId() {
    return !this.kFa || this.OFa < 0 || this.OFa + 1 >= this.kFa.length
      ? -1
      : this.kFa[this.OFa + 1].QuestId;
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
    return Platform_1.Platform.IsIOSPlatform() ||
      Platform_1.Platform.IsMacPlatform()
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
        Log_1.Log.Info("KuroSdk", 27, "OnSdkFocusChange", ["state", e]),
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
    (this.PlayStationPlayOnlyState = e),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetPlayOnly(
        e,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "SetPlayStationPlayOnlyState", [
          "state",
          e,
        ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        GameSettingsDefine_1.EFunction.PlayStationOnly,
      );
  }
  GetSdkPackageId() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId()
      : ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
  }
  SetEntryPointData(e) {
    this.W3l = e;
  }
  GetEntryPointData() {
    return this.W3l;
  }
  GetNoticePlatformId() {
    return Platform_1.Platform.IsAndroidPlatform()
      ? 2
      : Platform_1.Platform.IsIOSPlatform()
        ? 3
        : Platform_1.Platform.IsPs5Platform()
          ? 4
          : Platform_1.Platform.IsMacPlatform()
            ? 5
            : 1;
  }
  FilterCurrentNeedShowNoticeContent(e, t) {
    var r = [],
      i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId(),
      a = e.game,
      e = e.activity,
      a = a.concat(e),
      o = this.GetNoticePlatformId();
    for (const s of a) {
      var n = "0" !== t;
      this.Q3l(s) &&
        this.K3l(s, t) &&
        (0 !== s.permanent || n) &&
        this.$3l(s, i) &&
        this.X3l(s, o) &&
        r.push(s);
    }
    return r;
  }
  Q3l(e) {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      r = e.startTimeMs / 1e3,
      e = e.endTimeMs / 1e3;
    return r <= t && t <= e;
  }
  K3l(e, t) {
    let r = !0;
    if (0 < e.whiteList.length) {
      for (const i of e.whiteList) if (i === Number(t)) return !0;
      r = !1;
    }
    return r;
  }
  $3l(e, t) {
    let r = !0;
    if (0 < e.channel.length) {
      for (const i of e.channel) if (i === t) return !0;
      r = !1;
    }
    return r;
  }
  X3l(e, t) {
    let r = !0;
    if (0 < e.platform.length) {
      for (const i of e.platform) if (i === t) return !0;
      r = !1;
    }
    return r;
  }
  GetNoticeContentUrl(e) {
    var t;
    return ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()
      ? e >=
        (t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData())
          .contentUrl.length
        ? t.contentUrl[e - 1]
        : t.contentUrl[e]
      : "";
  }
  GetQueryNoticeReadStateUrl() {
    return ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()
      ? ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().apiUrl +
          `/notice/read-ids/list?uid=${void 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetId() ? "0" : ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()}&sign=${ModelManager_1.ModelManager.KuroSdkModel.NoticeSign}&serverId=` +
          ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()
      : "";
  }
  GetEntryPointUrl() {
    var e =
      ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
    return `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/${e}/entrypoint.json`;
  }
  Y3l(e = 0) {
    var t;
    return ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData()
      ? e >=
        (t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData())
          .h5AppUrl.length
        ? t.h5AppUrl[e - 1]
        : t.h5AppUrl[e]
      : "";
  }
  GetPlatformStr() {
    return Platform_1.Platform.IsAndroidPlatform()
      ? "Android"
      : Platform_1.Platform.IsIOSPlatform()
        ? "iOS"
        : Platform_1.Platform.IsMacPlatform()
          ? "Mac"
          : Platform_1.Platform.IsPs5Platform()
            ? "PS5"
            : "PC";
  }
  GetNoticeUrl(e = 0) {
    var e = this.Y3l(e),
      t =
        ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId(),
      r = LanguageSystem_1.LanguageSystem.PackageLanguage,
      i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetDeviceDid(),
      a = ModelManager_1.ModelManager.PlayerInfoModel;
    return (
      e +
      `?server_id=${t}&lang=${r}&did=${i}&role_id=${void 0 === a.GetId() ? "0" : a.GetId().toString()}&svr_area=${ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? "global" : "cn"}&game_id=${PublicUtil_1.PublicUtil.GetGameId()}&channel=${ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId()}&platform=${this.GetPlatformStr()}&user_id=${ModelManager_1.ModelManager.LoginModel.GetSdkLoginInfo()?.Uid}&sign=` +
      ModelManager_1.ModelManager.KuroSdkModel.NoticeSign
    );
  }
}
exports.KuroSdkModel = KuroSdkModel;
//# sourceMappingURL=KuroSdkModel.js.map
