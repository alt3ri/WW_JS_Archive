"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisplayProductInfo =
    exports.PlatformSdkNew =
    exports.ReportRoleData =
    exports.RequestEmailCodeResponse =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  LOGINCODE = "Sdk_LoginCode";
class RequestEmailCodeResponse {
  constructor() {
    (this.IfSuccess = !1), (this.Code = 0), (this.Msg = "");
  }
}
exports.RequestEmailCodeResponse = RequestEmailCodeResponse;
class ReportRoleData {
  constructor() {
    (this.serverId = ""),
      (this.serverName = ""),
      (this.roleId = ""),
      (this.roleName = ""),
      (this.roleLevel = "");
  }
}
exports.ReportRoleData = ReportRoleData;
class PlatformSdkNew {
  constructor() {
    (this.kPt = !1),
      (this.aba = !1),
      (this.WorldContext = void 0),
      (this.usl = ""),
      (this.InitTime = 0),
      (this.CurrentAccessToken = ""),
      (this.TickInnerState = !0),
      (this.OnWebViewCloseCallBack = void 0),
      (this.ThirdUnionId = ""),
      (this.DataReportInitState = !1);
  }
  Initialize(e) {
    if (((this.WorldContext = e), (this.InitTime = this.adl()), this.kPt))
      LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK重复初始化");
    else {
      if (
        (this.InitPlatformSdkReportData(),
        this.SetServerCommonParam(),
        this.InitWebComponent(),
        !this.OnInit())
      )
        return (
          LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK初始化失败"),
          !1
        );
      this.kPt = !0;
    }
    return !0;
  }
  UnInitialize() {
    return this.kPt
      ? this.OnUnInit()
        ? !(this.kPt = !1)
        : (LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK注销失败"),
          !1)
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]平台SDK注销失败, 未初始化",
        ),
        !1);
  }
  OnInit() {
    return !0;
  }
  OnUnInit() {
    return !0;
  }
  ConnectToServer(e) {}
  NeedPrivacyProtocol() {
    return !1;
  }
  GetPrivacyAgreeState() {
    return !1;
  }
  SavePrivacyAgreeState(e) {}
  GetDeviceId() {
    return "DefaultDeviceId";
  }
  GetProductId() {
    return "DefaultProductId";
  }
  SetServerCommonParam() {}
  Login(e) {}
  BindAccountThenLogin(e, t = 0, r) {}
  GetUserId() {
    return "NotImplement";
  }
  async GetSdkOnlineId(e) {
    return new Promise((e) => {
      e(new Map());
    });
  }
  async GetSdkBlockingUser() {
    return new Promise((e) => {
      e(new Map());
    });
  }
  async GetTargetRelation(e) {
    return new Promise((e) => {
      e(new Map());
    });
  }
  async GetSdkAccountId(e) {
    return new Promise((e) => {
      e(new Map());
    });
  }
  async GetSdkUserIdByAccountId(e) {
    return new Promise((e) => {
      e("");
    });
  }
  NeedShowShopIcon() {
    return !1;
  }
  ShowPlayStationStoreIcon(e) {}
  HidePlayStationStoreIcon() {}
  NeedShowThirdPartyId() {
    return !1;
  }
  SupportSwitchFriendSearchByThirdPartyId() {
    return !1;
  }
  SupportSwitchFriendShowType() {
    return !1;
  }
  async GetSdkTrophyInfo(e = 0, t) {
    return new Promise((e) => {
      e([]);
    });
  }
  async UnlockSdkTrophy(e) {
    return new Promise((e) => {
      e(!1);
    });
  }
  async UpdateSdkTrophyProgress(e, t) {
    return new Promise((e) => {
      e(!1);
    });
  }
  GetSdkFriendOnlyState() {
    return !1;
  }
  SaveSdkFriendOnlyState(e) {}
  OpenWebView(e, t) {}
  PollWebViewClose() {
    return !0;
  }
  InitWebComponent() {}
  async QueryProductInfo(e) {
    return Promise.resolve({
      FailReason: "NotImplement",
      NeedReLogin: !1,
      DataList: void 0,
    });
  }
  OpenCheckoutDialog(e, t, r) {
    return !1;
  }
  NeedCheckPlayOnly() {
    return !1;
  }
  PlayOnly() {
    return !!this.NeedCheckPlayOnly() && this.aba;
  }
  SetPlayOnly(e) {
    this.aba = e;
  }
  PollCheckoutDialogResult() {
    return 0;
  }
  RequestCheckoutProduct(e, t, r) {}
  StartActivity(e) {}
  EndActivity(e) {}
  ChangeActivityAvailability(e, t) {}
  NeedConfirmSdkProductInfo() {
    return !1;
  }
  NeedShowSdkProductInfoBeforePay() {
    return !1;
  }
  async OpenMessageBox(e, t, r) {
    return Promise.resolve(!1);
  }
  GetMessageBoxCurrentState(e) {
    e(0);
  }
  TerminateMessageBox() {}
  GetCommunicationRestricted(e, t) {
    t(0);
  }
  async GetCommunicationRestrictedAsync(e) {
    return Promise.resolve(0);
  }
  GetIfShowDefaultPrice() {
    return !0;
  }
  CheckUserPremium() {
    return 0;
  }
  GetIfNeedQueryProductInfoForce() {
    return !1;
  }
  NotifyPlayStationPremium(e) {}
  CreatePlayerSession(e, t) {
    return "-1";
  }
  SetPlayerSessionJoinAbleUserType(e) {}
  LeavePlayerSession() {}
  JoinPlayerSession(e) {}
  CheckJoinSession() {
    return "-1";
  }
  GetPlayerIdByPlayerSessionId(e) {
    return "-1";
  }
  IsPlatformNetworkReachable() {
    return !0;
  }
  async RequestEmailCode(e) {
    return Promise.resolve(new RequestEmailCodeResponse());
  }
  SupportExternalWebBrowser() {
    return !0;
  }
  OpenExternalUrl(e) {
    this.SupportExternalWebBrowser()
      ? UE.KismetSystemLibrary.LaunchURL(e)
      : this.OpenWebView(e);
  }
  OpenUserCenter(e, t) {}
  RefreshAccessToken(e) {
    this.CurrentAccessToken = e;
  }
  adl() {
    var e = (0, puerts_1.$ref)(0);
    return UE.KuroVariableFunctionLibrary.GetIntValue("Sdk_InitTime", e)
      ? (0, puerts_1.$unref)(e)
      : ((e = Date.now()),
        UE.KuroVariableFunctionLibrary.SetIntValue("Sdk_InitTime", e),
        e);
  }
  GetRunningOnlyCode() {
    var e, t;
    return (
      "" === this.usl &&
        ((e = (0, puerts_1.$ref)("")),
        UE.KuroVariableFunctionLibrary.GetStringValue(LOGINCODE, e)
          ? (this.usl = (0, puerts_1.$unref)(e))
          : ((e = Math.floor(Date.now() / 1e3)),
            (t = Math.floor(1e10 * Math.random())),
            (this.usl = e + "-" + t),
            UE.KuroVariableFunctionLibrary.SetStringValue(
              LOGINCODE,
              this.usl,
            ))),
      this.usl
    );
  }
  OpenCustomerService() {}
  ReportToServer(e, t) {}
  ReportToThirdParty(e) {}
  NotifyCurrentLanguage(e) {}
  BlockServerArea() {
    return !1;
  }
  GetSdkCountry() {
    return "";
  }
  GetGameName() {
    return "wutheringwaves";
  }
  GetGameId() {
    return PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal ? "G153" : "G152";
  }
  GetChannelId() {
    return "";
  }
  GetPackageId() {
    return "";
  }
  OpenNotice() {}
  Tick(e) {}
  SetTickInnerState(e) {
    this.TickInnerState = e;
  }
  BindOnWebViewCloseCallBack(e) {
    this.OnWebViewCloseCallBack = e;
  }
  NeedLimitUserInfoWhenSocialLimit() {
    return !1;
  }
  SetThirdUnionId(e) {
    (this.ThirdUnionId = e), this.InitPlatformSdkReportData();
  }
  InitPlatformSdkReportData() {}
  InitDataReport() {
    (this.DataReportInitState = !0), this.OnInitDataReport();
  }
  OnInitDataReport() {}
}
exports.PlatformSdkNew = PlatformSdkNew;
class DisplayProductInfo {
  constructor() {
    (this.GoodId = void 0),
      (this.ChannelGoodId = void 0),
      (this.GoodLabel = void 0),
      (this.Name = void 0),
      (this.Desc = void 0),
      (this.Price = void 0);
  }
}
exports.DisplayProductInfo = DisplayProductInfo;
//# sourceMappingURL=PlatformSdkNew.js.map
