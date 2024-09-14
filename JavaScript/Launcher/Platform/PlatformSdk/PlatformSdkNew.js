"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisplayProductInfo = exports.PlatformSdkNew = void 0);
const LauncherLog_1 = require("../../Util/LauncherLog");
class PlatformSdkNew {
  constructor() {
    (this.kPt = !1), (this.WBa = !1);
  }
  Initialize() {
    if (this.kPt)
      LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK重复初始化");
    else {
      if (
        (this.SetServerCommonParam(), this.InitWebComponent(), !this.OnInit())
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
  async GetSdkTrophyInfo(e = 0, r) {
    return new Promise((e) => {
      e([]);
    });
  }
  async UnlockSdkTrophy(e) {
    return new Promise((e) => {
      e(!1);
    });
  }
  async UpdateSdkTrophyProgress(e, r) {
    return new Promise((e) => {
      e(!1);
    });
  }
  GetSdkFriendOnlyState() {
    return !1;
  }
  SaveSdkFriendOnlyState(e) {}
  OpenWebView(e) {}
  OpenWebBrowser(e) {
    return !1;
  }
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
  OpenCheckoutDialog(e) {
    return !1;
  }
  NeedCheckPlayOnly() {
    return !1;
  }
  PlayOnly() {
    return this.WBa;
  }
  SetPlayOnly(e) {
    this.WBa = e;
  }
  PollCheckoutDialogResult() {
    return 0;
  }
  RequestCheckoutProduct(e, r) {}
  StartActivity(e) {}
  EndActivity(e) {}
  NeedConfirmSdkProductInfo() {
    return !1;
  }
  NeedShowSdkProductInfoBeforePay() {
    return !1;
  }
  async OpenMessageBox(e, r, t) {
    return Promise.resolve(!1);
  }
  GetMessageBoxCurrentState(e) {
    e(0);
  }
  TerminateMessageBox() {}
  GetCommunicationRestricted(e, r) {
    r(0);
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
  CreatePlayerSession(e, r) {
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
  RefreshAccessToken(e) {}
  Clear() {}
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
