"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayStation5Sdk = exports.AuthCodeData = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  PlatformSdkNew_1 = require("./PlatformSdkNew"),
  PlatformSdkServer_1 = require("./PlatformSdkServer"),
  PlayStationTrophy_1 = require("./PlayStationTrophy"),
  UniversalDataSystemManager_1 = require("./UniversalDataSystemManager"),
  SDKMAXBLOCKUSER = 2e3,
  CACHEAGREEKEY = "AgreeState",
  AGREEVALUE = "1";
class AuthCodeData {
  constructor(e, t) {
    (this.AuthCode = e), (this.IssuerId = t);
  }
}
var EPlayStaionScope;
(exports.AuthCodeData = AuthCodeData),
  (function (e) {
    (e.DeviceId = "psn:s2s openid id_token:psn.basic_claims id_token:duid"),
      (e.Login = "psn:s2s openid id_token:psn.basic_claims");
  })((EPlayStaionScope = EPlayStaionScope || {}));
class PlayStation5Sdk extends PlatformSdkNew_1.PlatformSdkNew {
  constructor() {
    super(...arguments),
      (this.Lwa = void 0),
      (this.QBa = void 0),
      (this.cka = void 0),
      (this.kNa = !1),
      (this.T$a = new Map()),
      (this.L$a = 0),
      (this.$za = ""),
      (this.Xza = new Map()),
      (this.Yza = new Map()),
      (this.zza = new Map()),
      (this.SZa = ""),
      (this.mka = void 0),
      (this.dka = 0);
  }
  OnInit() {
    var e,
      t = this.rAa(EPlayStaionScope.Login);
    return (
      !!t &&
      ((e = this.GetUserId()),
      (this.Lwa =
        new UniversalDataSystemManager_1.UniversalDataSystemManager()),
      this.Lwa.Initialize(e),
      this.Lwa.Start(),
      (this.QBa = new PlayStationTrophy_1.PlayStationTrophy()),
      this.QBa.Init(this.Lwa, this),
      (this.cka = t),
      (e = ue_1.KuroStaticPS5Library.GetCacheMapElement(CACHEAGREEKEY)) &&
        e === AGREEVALUE &&
        (this.kNa = !0),
      !0)
    );
  }
  InitWebComponent() {
    var e = this.GetUserId();
    ue_1.KuroStaticPS5Library.InitWebApi((0, puerts_1.$ref)(e));
  }
  OnUnInit() {
    return this.Lwa?.Stop(), !0;
  }
  ConnectToServer(e) {
    PlatformSdkServer_1.PlatformSdkServer.Connect(
      "&pkg=" + PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5.pkg,
      e,
    );
  }
  rAa(e) {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      t = (0, puerts_1.$ref)(t.client_id),
      e = (0, puerts_1.$ref)(e),
      r = (0, puerts_1.$ref)(""),
      a = (0, puerts_1.$ref)(0),
      t = ue_1.KuroStaticPS5Library.GetAuthCode(t, e, r, a);
    if (0 === t)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode",
          ["result", t],
          ["authCode", r],
          ["issuerId", a],
        ),
        new AuthCodeData((0, puerts_1.$unref)(r), (0, puerts_1.$unref)(a))
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode failed",
      ["result", t],
    );
  }
  GetIdToken(e) {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      r = (0, puerts_1.$ref)(t.client_id),
      t = (0, puerts_1.$ref)(t.client_secret),
      e = (0, puerts_1.$ref)(e),
      a = (0, puerts_1.$ref)(""),
      r = ue_1.KuroStaticPS5Library.GetIdToken(r, t, e, a);
    if (0 === r)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetIdToken",
          ["result", r],
          ["idToken", a],
        ),
        (0, puerts_1.$unref)(a)
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetIdToken failed",
      ["result", r],
    );
  }
  NeedPrivacyProtocol() {
    return !0;
  }
  GetDeviceId() {
    return "test_deviceId";
  }
  Login(e) {
    var t,
      r,
      a = this.rAa(EPlayStaionScope.Login);
    a
      ? ((t = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5),
        (r = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig()),
        (a = `&psnCode=${a?.AuthCode}&psnEnvIssuerId=${a?.IssuerId}&pkg=${t.pkg}&client_id=${r.client_id}&redirect_uri=1&response_type=code`),
        PlatformSdkServer_1.PlatformSdkServer.Login(a, e))
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] Login failed, empty authCode",
        ),
        e("PsnAuthFail", !1, void 0));
  }
  SetServerCommonParam() {
    var e = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      t = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig();
    PlatformSdkServer_1.PlatformSdkServer.InitCommonParam(
      `productId=${e.productId}&projectId=${t.projectId}&deviceNum=${this.GetDeviceId()}&platform=${e.platform}&sdkVersion=${e.sdkVersion}&channelId=` +
        e.channelId,
    );
  }
  GetUserId() {
    return ue_1.KuroStaticPS5Library.GetUserId();
  }
  async yZa() {
    var e;
    return (
      "" === this.SZa &&
        (e = (await this.GetSdkAccountId([this.GetUserId()])).get(
          this.GetUserId(),
        )) &&
        (this.SZa = e),
      this.SZa
    );
  }
  GetPrivacyAgreeState() {
    var e, t;
    return (
      !!this.kNa ||
      (!!(t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
      )) &&
        ((e = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()),
        !!(t = t.get(this.GetUserId()))) &&
        t.get(e))
    );
  }
  SavePrivacyAgreeState(e) {
    let t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
    );
    t = t || new Map();
    var r = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage();
    t.get(this.GetUserId()) || t.set(this.GetUserId(), new Map()),
      t.get(this.GetUserId()).set(r, e),
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
        t,
      ),
      ue_1.KuroStaticPS5Library.AddCacheMapElement(CACHEAGREEKEY, AGREEVALUE);
  }
  async GetSdkOnlineId(e) {
    const r = new Map();
    e = e.map(async (e) => {
      var t = await this.GetPlayStationOnlineId(e);
      0 === t.ResultCode && r.set(e, t.OnlineId);
    });
    return (
      await Promise.all(e),
      LauncherLog_1.LauncherLog.Debug("当前获取的onlineIdMap", ["map", r]),
      r
    );
  }
  async GetSdkBlockingUser() {
    var e = Date.now();
    return (
      e - this.L$a < 12e4
        ? LauncherLog_1.LauncherLog.Debug(
            "频繁调用，直接返回缓存的屏蔽用户列表",
          )
        : ((this.L$a = e),
          LauncherLog_1.LauncherLog.Debug("GetSdkBlockingUser"),
          (this.T$a = new Map()),
          await new Promise((a) => {
            const n = (e) => {
              (0, puerts_1.releaseManualReleaseDelegate)(n);
              var t = e;
              if (
                (LauncherLog_1.LauncherLog.Debug("当前获取的blockingUser", [
                  "num",
                  t.blockUsers.Num(),
                ]),
                t && t.blockUsers)
              ) {
                var r = t.blockUsers.Num();
                for (let e = 0; e < r; e++)
                  this.T$a.set(t.blockUsers.Get(e), !0);
              }
              a(this.T$a);
            };
            var e = (0, puerts_1.$ref)(0),
              t = (0, puerts_1.$ref)(SDKMAXBLOCKUSER);
            ue_1.KuroStaticPS5Library.GetBlockUserListAsync(
              e,
              t,
              (0, puerts_1.toManualReleaseDelegate)(n),
            );
          })),
      this.T$a
    );
  }
  async GetSdkAccountId(e) {
    const r = new Map();
    e = e.map(async (e) => {
      var t = await this.GetPlayStationAccountId(e);
      0 === t.ResultCode && r.set(e, t.AccountId);
    });
    return await Promise.all(e), r;
  }
  async GetSdkUserIdByAccountId(e) {
    return new Promise((e) => {
      e("");
    });
  }
  ShowPlayStationStoreIcon(e) {
    return ue_1.KuroStaticPS5Library.ShowPsStoreIcon(e);
  }
  HidePlayStationStoreIcon() {
    return ue_1.KuroStaticPS5Library.HidePsStoreIcon();
  }
  async GetPlayStationOnlineId(t) {
    return new Promise((e) => {
      e({
        OnlineId: ue_1.KuroStaticPS5Library.GetOnlineIdByUserId(
          (0, puerts_1.$ref)(t),
        ),
        ResultCode: 0,
      });
    });
  }
  async GetPlayStationAccountId(t) {
    return new Promise((e) => {
      e({
        AccountId: ue_1.KuroStaticPS5Library.GetAccountIdByUserId(
          (0, puerts_1.$ref)(t),
        ),
        ResultCode: 0,
      });
    });
  }
  async GetSdkTrophyInfo(e = 0, t = 0) {
    return this.QBa?.GetSdkTrophyInfo(e, t) ?? [];
  }
  async UnlockSdkTrophy(e) {
    return this.QBa?.UnlockSdkTrophy(e) ?? !1;
  }
  async UpdateSdkTrophyProgress(e, t) {
    return this.QBa?.UpdateSdkTrophyProgress(e, t) ?? !1;
  }
  NeedShowThirdPartyId() {
    return !0;
  }
  SupportSwitchFriendSearchByThirdPartyId() {
    return !0;
  }
  SupportSwitchFriendShowType() {
    return !0;
  }
  GetSdkFriendOnlyState() {
    var e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayStationFriendOnly,
    );
    return e || !1;
  }
  SaveSdkFriendOnlyState(e) {
    LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayStationFriendOnly,
      e,
    );
  }
  GetProductId() {
    return PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5.productId;
  }
  OpenWebView(e) {
    LauncherLog_1.LauncherLog.Debug("OpenWebView", ["url", e]),
      ue_1.KuroStaticPS5Library.OpenWebBrowser((0, puerts_1.$ref)(e));
  }
  NeedCheckPlayOnly() {
    return !0;
  }
  NeedShowShopIcon() {
    return !0;
  }
  StartActivity(e) {
    this.Lwa?.StartActivity(e);
  }
  EndActivity(e) {
    this.Lwa?.EndActivity(e);
  }
  Clear() {
    LauncherLog_1.LauncherLog.Info("Clear PlayStationSdk"),
      this.QBa && this.QBa.Clear();
  }
  OpenWebBrowser(e) {
    return 0 === ue_1.KuroStaticPS5Library.OpenWebView((0, puerts_1.$ref)(e));
  }
  PollWebViewClose() {
    return ue_1.KuroStaticPS5Library.PollWebBrowser();
  }
  Cka() {
    var e = Date.now();
    return (
      3e4 < e - this.dka &&
        ((this.dka = e),
        (this.mka = ue_1.KuroStaticPS5Library.GetStoreProducts())),
      this.mka
    );
  }
  async QueryProductInfo(t) {
    var r = this.Cka();
    if (!r || 0 === r.Num())
      return (
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo error, psnProducts is empty",
        ),
        {
          FailReason: "psnProducts is empty",
          NeedReLogin: !1,
          DataList: void 0,
        }
      );
    for (let e = 0; e < r.Num(); e++) {
      var a = r.Get(e);
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo psnProducts",
        ["index", e],
        ["id", a.id],
        ["displayName", a.displayName],
        ["displayPrice", a.displayPrice],
      );
    }
    let n = "";
    var o = t.length;
    for (let e = 0; e < o; e++) (n += t[e]), e !== o - 1 && (n += ",");
    var e = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      i = PlatformSdkServer_1.PlatformSdkServer.GeneratePayHeader(
        e.productId,
        e.version,
        e.sdkVersion,
      ),
      [i, e, s] =
        await PlatformSdkServer_1.PlatformSdkServer.QueryStoreProductsAsync(
          i,
          ["productId"],
          e.productId,
          ["channelId"],
          e.channelId,
          ["dn"],
          this.GetDeviceId(),
          ["pkg"],
          e.pkg,
          ["vn"],
          e.version,
          ["svn"],
          e.sdkVersion,
          ["plat"],
          4,
          ["goodsIds"],
          n,
        );
    if (!s)
      return (
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo error, serverData is undefined",
        ),
        { FailReason: i, NeedReLogin: e, DataList: void 0 }
      );
    LauncherLog_1.LauncherLog.Debug(
      "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo",
      ["serverData", s],
    );
    let u = !1;
    var d = [];
    for (let e = 0; e < r.Num(); e++) {
      var S = r.Get(e);
      const _ = S.id;
      var c,
        h = s.find((e) => e.channelGoodsId === _);
      h
        ? (((c = new PlatformSdkNew_1.DisplayProductInfo()).GoodId = h.goodsId),
          (c.Price = S.displayPrice),
          (c.ChannelGoodId = _),
          (c.GoodLabel = S.label),
          (c.Desc = S.description),
          (c.Name = S.displayName),
          d.push(c))
        : (LauncherLog_1.LauncherLog.Error(
            "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo Error, PSN商品信息在SDK商品配置中找不到",
            ["PSN商品信息 psnId", _],
            ["PSN商品信息 displayName", S.displayName],
            ["PSN商品信息 displayPrice", S.displayPrice],
          ),
          (u = !0));
    }
    if (u) {
      LauncherLog_1.LauncherLog.Error(
        "QueryProductInfo Error, PSN商品信息与SDK商品配置不一致",
        ["SDK商品列表", s],
      );
      for (let e = 0; e < r.Num(); e++) {
        var l = r.Get(e);
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] PSN商品列表",
          ["index", e],
          ["id", l.id],
          ["displayName", l.displayName],
          ["displayPrice", l.displayPrice],
        );
      }
    }
    return (
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo result",
        ["resultList", d],
      ),
      { FailReason: i, NeedReLogin: !1, DataList: d }
    );
  }
  OpenCheckoutDialog(e) {
    e = ue_1.KuroStaticPS5Library.OpenCheckoutDialog((0, puerts_1.$ref)(e));
    return (
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] OpenCheckoutDialog",
        ["ret", e],
      ),
      0 === e
    );
  }
  PollCheckoutDialogResult() {
    switch (ue_1.KuroStaticPS5Library.PollCheckoutDialogResult()) {
      case -1:
        return 1;
      case 2:
        return 2;
      default:
        return 0;
    }
  }
  RequestCheckoutProduct(e, t) {
    var r = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      a = PlatformSdkServer_1.PlatformSdkServer.GeneratePayHeader(
        r.productId,
        r.version,
        r.sdkVersion,
      );
    PlatformSdkServer_1.PlatformSdkServer.RequestCheckoutProduct(
      t,
      a,
      ["productId"],
      r.productId,
      ["channelId"],
      r.channelId,
      ["dn"],
      this.GetDeviceId(),
      ["pkg"],
      r.pkg,
      ["vn"],
      r.version,
      ["svn"],
      r.sdkVersion,
      ["plat"],
      4,
      ["access_token"],
      e.AccessToken,
      ["psnEnvIssuerId"],
      this.cka.IssuerId,
      ["serverId"],
      e.ServerId,
      ["serverName"],
      e.ServerName,
      ["roleId"],
      e.RoleId,
      ["roleName"],
      e.RoleName,
    );
  }
  NeedConfirmSdkProductInfo() {
    return !0;
  }
  NeedShowSdkProductInfoBeforePay() {
    return !0;
  }
  GetMessageBoxCurrentState(t) {
    const r = (e) => {
      (0, puerts_1.releaseManualReleaseDelegate)(r), t(e);
    };
    ue_1.KuroStaticPS5Library.GetMessageDialogStateAsync(
      (0, puerts_1.toManualReleaseDelegate)(r),
    );
  }
  async OpenMessageBox(e, a, n) {
    return (
      LauncherLog_1.LauncherLog.Debug("打开messageBox"),
      new Promise((t) => {
        const r = (e) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r), t(0 === e);
        };
        ue_1.KuroStaticPS5Library.OpenMessageDialog(
          (0, puerts_1.$ref)(e),
          a,
          n,
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  GetCommunicationRestricted(e, r) {
    e || r(0);
    const a = (e, t) => {
      (0, puerts_1.releaseManualReleaseDelegate)(a),
        LauncherLog_1.LauncherLog.Debug("GetCommunicationRestricted", [
          "ret",
          e,
        ]),
        r(1 === t ? 1 : 0);
    };
    ue_1.KuroStaticPS5Library.GetCommunicationRestrictionStatusAsync(
      (0, puerts_1.$ref)(e),
      (0, puerts_1.toManualReleaseDelegate)(a),
    );
  }
  async GetCommunicationRestrictedAsync(e) {
    return new Promise((t) => {
      this.GetCommunicationRestricted(e, (e) => {
        t(e);
      });
    });
  }
  GetIfShowDefaultPrice() {
    return !1;
  }
  CheckUserPremium() {
    var e = this.GetUserId();
    return ue_1.KuroStaticPS5Library.CheckUserPremium((0, puerts_1.$ref)(e));
  }
  NotifyPlayStationPremium(e) {
    var t = this.GetUserId();
    ue_1.KuroStaticPS5Library.NotifyPremiumFeature((0, puerts_1.$ref)(t), e);
  }
  CreatePlayerSession(e, t) {
    return ue_1.KuroStaticPS5Library.CreatePlayerSession(
      e,
      (0, puerts_1.$ref)(t.toString()),
    );
  }
  SetPlayerSessionJoinAbleUserType(e) {
    ue_1.KuroStaticPS5Library.SetPlayerSessionJoinableUserType(e);
  }
  LeavePlayerSession() {
    ue_1.KuroStaticPS5Library.LeavePlayerSession();
  }
  JoinPlayerSession(e) {
    ue_1.KuroStaticPS5Library.JoinPlayerSession((0, puerts_1.$ref)(e));
  }
  CheckJoinSession() {
    return ue_1.KuroStaticPS5Library.CheckJoinSession();
  }
  GetPlayerIdByPlayerSessionId(e) {
    return ue_1.KuroStaticPS5Library.GetPlayerIdByPlayerSessionId(
      (0, puerts_1.$ref)(e),
    );
  }
  TerminateMessageBox() {
    ue_1.KuroStaticPS5Library.TerminateMessageDialog();
  }
  IsPlatformNetworkReachable() {
    var e = this.GetUserId(),
      t = (0, puerts_1.$ref)(0);
    return 0 !==
      ue_1.KuroStaticPS5Library.SceNpGetNpReachabilityState(
        (0, puerts_1.$ref)(e),
        t,
      )
      ? (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] SceNpGetNpReachabilityState failed",
        ),
        !1)
      : 2 === (0, puerts_1.$unref)(t);
  }
  async GetTargetRelation(e) {
    const t = await this.yZa();
    e = e.filter((e) => e !== t).filter((e) => !this.Xza.has(e));
    if (0 === e.length) return this.Xza;
    const a = e.join(",");
    if (
      (LauncherLog_1.LauncherLog.Debug("GetTargetRelation", ["checkStr", a]),
      this.Yza.has(a))
    )
      return (
        LauncherLog_1.LauncherLog.Debug("重复获取,等待任务结束"),
        await this.Yza.get(a),
        LauncherLog_1.LauncherLog.Debug("任务结束"),
        this.Xza
      );
    e = new Promise((e) => {
      this.zza.set(a, e);
    });
    LauncherLog_1.LauncherLog.Debug("开始获取任务"), this.Yza.set(a, e);
    const n = this.rAa(EPlayStaionScope.Login);
    return n
      ? (LauncherLog_1.LauncherLog.Debug("AuthCode", ["authCode", n]),
        new Promise((r) => {
          var e =
            `&access_token=${this.$za}&psnEnvIssuerId=${n?.IssuerId}&accountIds=` +
            a;
          PlatformSdkServer_1.PlatformSdkServer.GetSdkRelation(e, (e, t) => {
            e &&
              t &&
              t.data &&
              t.data.blockList &&
              t.data.blockList.forEach((e) => {
                var t = e.isBlocked || e.isBlocking;
                this.Xza.set(e.accountId, t ? 5 : 0);
              }),
              this.zza.get(a)(this.Xza),
              r(this.Xza);
          });
        }))
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] Login failed, empty authCode",
        ),
        this.Xza);
  }
  RefreshAccessToken(e) {
    this.$za = e;
  }
}
exports.PlayStation5Sdk = PlayStation5Sdk;
//# sourceMappingURL=PlayStation5Sdk.js.map
