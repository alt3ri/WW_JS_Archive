"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayStation5Sdk = exports.AuthCodeData = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  ue_1 = require("ue"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  PlatformSdkNew_1 = require("./PlatformSdkNew"),
  PlatformSdkReportData_1 = require("./PlatformSdkReportData"),
  PlatformSdkServer_1 = require("./PlatformSdkServer"),
  PlayStationTrophy_1 = require("./PlayStationTrophy"),
  UniversalDataSystemManager_1 = require("./UniversalDataSystemManager"),
  SDKMAXBLOCKUSER = 2e3,
  CACHEAGREEKEY = "AgreeState",
  AGREEVALUE = "1",
  EXIT_WAIT_TIME = 1,
  MAX_PENDING_LOG = 1e3,
  SEND_HTTP_TIMEOUT = 1e4,
  CALIBRATE_INTERVAL = 10,
  CALIBRATE_STOP_TIMER = !0;
class AuthCodeData {
  constructor(t, e) {
    (this.AuthCode = t), (this.IssuerId = e);
  }
}
exports.AuthCodeData = AuthCodeData;
class PlayStation5Sdk extends PlatformSdkNew_1.PlatformSdkNew {
  constructor() {
    super(...arguments),
      (this.Vwa = void 0),
      (this.hba = void 0),
      (this.CFa = void 0),
      (this.V3a = !1),
      (this.Yza = new Map()),
      (this.zza = 0),
      (this.Vrh = new Map()),
      (this.Hrh = new Map()),
      (this.jrh = new Map()),
      (this.wsh = ""),
      (this.Rqe = void 0),
      (this.Rsl = new Map()),
      (this.Asl = 0),
      (this.xsl = 0),
      (this.FSr = ""),
      (this.Psl = 50),
      (this.wsl = ""),
      (this.Bsl = new Array()),
      (this.uSl = !1),
      (this.Szl = ""),
      (this.Mzl = ""),
      (this.gFa = void 0),
      (this.pFa = 0);
  }
  OnInit() {
    var t,
      e = this.ZAa("psn:s2s openid id_token:psn.basic_claims");
    return (
      !!e &&
      ((t = this.GetUserId()),
      (this.Vwa =
        new UniversalDataSystemManager_1.UniversalDataSystemManager()),
      this.Vwa.Initialize(t),
      this.Vwa.Start(),
      (this.hba = new PlayStationTrophy_1.PlayStationTrophy()),
      this.hba.Init(this.Vwa, this),
      (this.CFa = e),
      (t = ue_1.KuroStaticPS5Library.GetCacheMapElement(CACHEAGREEKEY)) &&
        t === AGREEVALUE &&
        (this.V3a = !0),
      (e = new PlatformSdkReportData_1.PlatformReportLaunchGame()),
      this.ReportToThirdParty(e),
      !0)
    );
  }
  InitPlatformSdkReportData() {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.GetProductId(),
      e = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg(),
      r = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId(),
      a = this.GetRunningOnlyCode(),
      o = UE.KuroLauncherLibrary.GetAppVersion(),
      i = PlatformSdkConfig_1.PlatformSdkConfig.GetSdkVersion(),
      n = this.dic(),
      s = this.qsl(),
      d = this.InitTime.toString(),
      u = this.GetGameId(),
      h = this.ThirdUnionId;
    PlatformSdkReportData_1.PlatformSdkReportBaseData.InitSdkBaseValue(
      t,
      e,
      r,
      "PlayStation",
      "",
      s,
      a,
      o,
      i,
      n,
      d,
      u,
      h,
    );
  }
  OnInitDataReport() {
    var t, e, r;
    UE.ThinkingAnalytics.HasInstanceInitialized(this.Psl) ||
      ((t = PlatformSdkConfig_1.PlatformSdkConfig.GetDataReportUrl()),
      (e = PlatformSdkConfig_1.PlatformSdkConfig.GetDataReportId()),
      (r =
        PlatformSdkReportData_1.PlatformSdkReportBaseData.GetPuid().toString()),
      (r = new UE.CreateInstanceParam(
        this.Psl,
        t,
        e,
        UE.ThinkingAnalytics.GetMachineID(),
        r,
        "SdkData",
        "",
        1e3,
        0,
        0,
        0,
        !0,
        !1,
        !1,
        !0,
        EXIT_WAIT_TIME,
        MAX_PENDING_LOG,
        SEND_HTTP_TIMEOUT,
        !0,
        CALIBRATE_INTERVAL,
        CALIBRATE_STOP_TIMER,
        !1,
      )),
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] InitDataReport",
        ["url", t],
        ["appId", e],
      ),
      UE.ThinkingAnalytics.CreateSimpleInstance(r)),
      this.zQl();
  }
  zQl() {
    if (0 < this.Bsl.length) {
      for (const t of this.Bsl) this.jhl(t);
      this.Bsl = [];
    }
  }
  dic() {
    var t = this.GetIdToken(
      "psn:s2s openid id_token:psn.basic_claims id_token:duid",
    );
    return (t = t && this.Osl(t))
      ? (LauncherLog_1.LauncherLog.Debug(
          "[PlatformSdkNew][PlayStation5Sdk] DeviceId",
          ["DeviceId", this.FSr],
        ),
        t.duid)
      : "";
  }
  Osl(t) {
    var t = t.split(".")[1];
    if (t)
      return (
        (t = ue_1.KuroStaticLibrary.Base64Decode(t)),
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] TryDecodeJtwToken",
          ["decodedPayload", t],
        ),
        JSON.parse(t)
      );
  }
  ksl(t) {
    this.Asl++, this.Rsl.set(this.Asl, t), this.Nsl();
  }
  Nsl() {
    !this.Rqe &&
      this.TickInnerState &&
      ((this.Rqe = new UE.KuroTickManager(this.WorldContext)),
      this.Rqe.AddTick(
        0,
        (0, puerts_1.toManualReleaseDelegate)((t) => {
          this.J_(t);
        }),
      ));
  }
  J_(t) {
    if (0 !== this.Rsl.size) {
      var e,
        r,
        a = [];
      for ([e, r] of this.Rsl) -1 === r() && a.push(e);
      for (const o of a) this.Rsl.delete(o);
      0 === this.Rsl.size && this.Fsl();
    }
  }
  Fsl() {
    this.Rqe &&
      this.TickInnerState &&
      (this.Rqe.ClearTick(), (this.Rqe = void 0));
  }
  InitWebComponent() {
    var t = this.GetUserId();
    ue_1.KuroStaticPS5Library.InitWebApi((0, puerts_1.$ref)(t));
  }
  OnUnInit() {
    return this.Vwa?.Stop(), !0;
  }
  ConnectToServer(a) {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg();
    PlatformSdkServer_1.PlatformSdkServer.Connect("&pkg=" + t, (t, e, r) => {
      a(t, e, r);
    });
  }
  ZAa(t) {
    var e = (0, puerts_1.$ref)(
        PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformClientId(),
      ),
      t = (0, puerts_1.$ref)(t),
      r = (0, puerts_1.$ref)(""),
      a = (0, puerts_1.$ref)(0),
      e = ue_1.KuroStaticPS5Library.GetAuthCode(e, t, r, a);
    if (0 === e)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode",
          ["result", e],
          ["authCode", r],
          ["issuerId", a],
        ),
        (t = new PlatformSdkReportData_1.PlatformReportGetPsnAuth()),
        this.ReportToThirdParty(t),
        new AuthCodeData((0, puerts_1.$unref)(r), (0, puerts_1.$unref)(a))
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode failed",
      ["result", e],
    );
  }
  GetIdToken(t) {
    var e = (0, puerts_1.$ref)(
        PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformClientId(),
      ),
      r = (0, puerts_1.$ref)(
        PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformClientSecret(),
      ),
      t = (0, puerts_1.$ref)(t),
      a = (0, puerts_1.$ref)(""),
      e = ue_1.KuroStaticPS5Library.GetIdToken(e, r, t, a);
    if (0 === e)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetIdToken",
          ["result", e],
          ["idToken", a],
        ),
        (r = new PlatformSdkReportData_1.PlatformReportPsnAccessId()),
        this.ReportToThirdParty(r),
        (0, puerts_1.$unref)(a)
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetIdToken failed",
      ["result", e],
    );
  }
  NeedPrivacyProtocol() {
    return !0;
  }
  GetDeviceId() {
    var t,
      e,
      r,
      a = new PlatformSdkReportData_1.PlatformReportGetDid();
    return (
      this.ReportToThirdParty(a),
      "" === this.FSr &&
        ((a = this.dic()),
        (this.FSr = a),
        (a = new PlatformSdkReportData_1.PlatformReportFirstGetDid()),
        (r = PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId()),
        (t = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId()),
        (e = this.FSr),
        (a.first_check_id = r + `_${t}_` + e),
        this.ReportToThirdParty(a)),
      "" === this.FSr
        ? (LauncherLog_1.LauncherLog.Debug(
            "[PlatformSdkNew][PlayStation5Sdk] GetDeviceId failed, empty DeviceId",
          ),
          "")
        : ((r = new PlatformSdkReportData_1.PlatformReportGetDidSuccess()),
          this.ReportToThirdParty(r),
          this.FSr)
    );
  }
  Login(t) {
    var e,
      r,
      a = this.ZAa("psn:s2s openid id_token:psn.basic_claims");
    a
      ? ((e = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg()),
        (r = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId()),
        (a = `&psnCode=${a?.AuthCode}&psnEnvIssuerId=${a?.IssuerId}&pkg=${e}&client_id=${r}&redirect_uri=1&response_type=code`),
        PlatformSdkServer_1.PlatformSdkServer.Login(a, t))
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] Login failed, empty authCode",
        ),
        t("PsnAuthFail", !1, !1, void 0));
  }
  BindAccountThenLogin(e, r = "", a = "") {
    var o = this.ZAa("psn:s2s openid id_token:psn.basic_claims");
    if (o) {
      var i = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg(),
        n = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId();
      let t = `&psnCode=${o?.AuthCode}&psnEnvIssuerId=${o?.IssuerId}&pkg=${i}&client_id=${n}&redirect_uri=1&response_type=code`;
      "" !== r && "" !== a && (t += `&email=${r}&emailCode=` + a),
        PlatformSdkServer_1.PlatformSdkServer.BindAccountThenLogin(t, e);
    } else
      LauncherLog_1.LauncherLog.Error(
        "[PlatformSdkNew][PlayStation5Sdk] BindAccountThenLogin failed, empty authCode",
      ),
        e("PsnAuthFail", !1, !1, void 0);
  }
  SetServerCommonParam() {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.GetProductId(),
      e = PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId(),
      r = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatform(),
      a = PlatformSdkConfig_1.PlatformSdkConfig.GetSdkVersion(),
      o = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId();
    PlatformSdkServer_1.PlatformSdkServer.InitCommonParam(
      `productId=${t}&projectId=${e}&deviceNum=${this.GetDeviceId()}&platform=${r}&sdkVersion=${a}&channelId=` +
        o,
    );
  }
  GetUserId() {
    return ue_1.KuroStaticPS5Library.GetUserId();
  }
  async Bsh() {
    var t;
    return (
      "" === this.wsh &&
        (t = (await this.GetSdkAccountId([this.GetUserId()])).get(
          this.GetUserId(),
        )) &&
        (this.wsh = t),
      this.wsh
    );
  }
  GetPrivacyAgreeState() {
    var t, e;
    return (
      !!this.V3a ||
      (!!(e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
      )) &&
        ((t = this.qsl()), !!(e = e.get(this.GetUserId()))) &&
        ((e = e.get(t)) &&
          ue_1.KuroStaticPS5Library.AddCacheMapElement(
            CACHEAGREEKEY,
            AGREEVALUE,
          ),
        e))
    );
  }
  SavePrivacyAgreeState(t) {
    var e = new PlatformSdkReportData_1.PlatformReportAgreementClick();
    this.ReportToThirdParty(e);
    let r = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
    );
    r = r || new Map();
    e = this.qsl();
    r.get(this.GetUserId()) || r.set(this.GetUserId(), new Map()),
      r.get(this.GetUserId()).set(e, t),
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.UserProtocolAgreeState,
        r,
      ),
      ue_1.KuroStaticPS5Library.AddCacheMapElement(CACHEAGREEKEY, AGREEVALUE);
  }
  async GetSdkOnlineId(t) {
    const r = new Map();
    t = t.map(async (t) => {
      var e = await this.GetPlayStationOnlineId(t);
      0 === e.ResultCode && r.set(t, e.OnlineId);
    });
    return (
      await Promise.all(t),
      LauncherLog_1.LauncherLog.Debug("当前获取的onlineIdMap", ["map", r]),
      r
    );
  }
  async GetSdkBlockingUser() {
    var t = Date.now();
    return (
      t - this.zza < 12e4 && this.uSl
        ? LauncherLog_1.LauncherLog.Debug(
            "频繁调用，直接返回缓存的屏蔽用户列表",
          )
        : ((this.zza = t),
          LauncherLog_1.LauncherLog.Debug("GetSdkBlockingUser"),
          (this.Yza = new Map()),
          await new Promise((a) => {
            const o = (t) => {
              (0, puerts_1.releaseManualReleaseDelegate)(o);
              var e = t;
              if (
                (LauncherLog_1.LauncherLog.Debug("当前获取的blockingUser", [
                  "num",
                  e.blockUsers.Num(),
                ]),
                e && e.blockUsers)
              ) {
                var r = e.blockUsers.Num();
                for (let t = 0; t < r; t++)
                  this.Yza.set(e.blockUsers.Get(t), !0);
              }
              (this.uSl = !0), a(this.Yza);
            };
            var t = (0, puerts_1.$ref)(0),
              e = (0, puerts_1.$ref)(SDKMAXBLOCKUSER);
            ue_1.KuroStaticPS5Library.GetBlockUserListAsync(
              t,
              e,
              (0, puerts_1.toManualReleaseDelegate)(o),
            );
          })),
      this.Yza
    );
  }
  async GetSdkAccountId(t) {
    const r = new Map();
    t = t.map(async (t) => {
      var e = await this.GetPlayStationAccountId(t);
      0 === e.ResultCode && r.set(t, e.AccountId);
    });
    return await Promise.all(t), r;
  }
  async GetSdkUserIdByAccountId(t) {
    return new Promise((t) => {
      t("");
    });
  }
  ShowPlayStationStoreIcon(t) {
    return ue_1.KuroStaticPS5Library.ShowPsStoreIcon(t);
  }
  HidePlayStationStoreIcon() {
    return ue_1.KuroStaticPS5Library.HidePsStoreIcon();
  }
  async GetPlayStationOnlineId(e) {
    return new Promise((t) => {
      t({
        OnlineId: ue_1.KuroStaticPS5Library.GetOnlineIdByUserId(
          (0, puerts_1.$ref)(e),
        ),
        ResultCode: 0,
      });
    });
  }
  async GetPlayStationAccountId(e) {
    return new Promise((t) => {
      t({
        AccountId: ue_1.KuroStaticPS5Library.GetAccountIdByUserId(
          (0, puerts_1.$ref)(e),
        ),
        ResultCode: 0,
      });
    });
  }
  async GetSdkTrophyInfo(t = 0, e = 0) {
    return this.hba?.GetSdkTrophyInfo(t, e) ?? [];
  }
  async UnlockSdkTrophy(t) {
    return this.hba?.UnlockSdkTrophy(t) ?? !1;
  }
  async UpdateSdkTrophyProgress(t, e) {
    return this.hba?.UpdateSdkTrophyProgress(t, e) ?? !1;
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
    var t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayStationFriendOnly,
    );
    return t || !1;
  }
  SaveSdkFriendOnlyState(t) {
    LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.PlayStationFriendOnly,
      t,
    );
  }
  GetProductId() {
    return PlatformSdkConfig_1.PlatformSdkConfig.GetProductId();
  }
  OpenWebView(t, e) {
    const r = () => {
      e?.(), this.OnWebViewCloseCallBack?.();
    };
    LauncherLog_1.LauncherLog.Info("OpenWebView", ["url", t]),
      ue_1.KuroStaticPS5Library.OpenWebBrowser((0, puerts_1.$ref)(t)),
      this.ksl(() => (this.PollWebViewClose() ? (r(), -1) : 0));
  }
  NeedCheckPlayOnly() {
    return !0;
  }
  NeedShowShopIcon() {
    return !0;
  }
  StartActivity(t) {
    this.Vwa?.StartActivity(t);
  }
  EndActivity(t) {
    this.Vwa?.EndActivity(t);
  }
  ChangeActivityAvailability(t, e) {
    this.Vwa?.ChangeActivityAvailability(t, e);
  }
  PollWebViewClose() {
    return ue_1.KuroStaticPS5Library.PollWebBrowser();
  }
  fFa() {
    var t = Date.now();
    return (
      3e4 < t - this.pFa &&
        ((this.pFa = t),
        (this.gFa = ue_1.KuroStaticPS5Library.GetStoreProducts())),
      this.gFa
    );
  }
  async QueryProductInfo(e) {
    var t = new PlatformSdkReportData_1.PlatformReportGetEntitlementLabelList(),
      r = (this.ReportToThirdParty(t), this.fFa());
    if (!r || 0 === r.Num())
      return (
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo error, psnProducts is empty",
        ),
        ((t =
          new PlatformSdkReportData_1.PlatformReportGetEntitlementLabelListFail()).code =
          "-1"),
        (t.msg = "psnProducts is empty"),
        this.ReportToThirdParty(t),
        {
          FailReason: "psnProducts is empty",
          NeedReLogin: !1,
          DataList: void 0,
        }
      );
    for (let t = 0; t < r.Num(); t++) {
      var a = r.Get(t);
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo psnProducts",
        ["index", t],
        ["id", a.id],
        ["displayName", a.displayName],
        ["displayPrice", a.displayPrice],
      );
    }
    let o = "";
    var i = e.length;
    for (let t = 0; t < i; t++) (o += e[t]), t !== i - 1 && (o += ",");
    var t =
        new PlatformSdkReportData_1.PlatformReportGetEntitlementLabelListSuccess(),
      t =
        ((t.channel_goodsid = o),
        (t.channel_goodsid_count = i),
        this.ReportToThirdParty(t),
        PlatformSdkConfig_1.PlatformSdkConfig.GetProductId()),
      n = PlatformSdkConfig_1.PlatformSdkConfig.GetVersion(),
      s = PlatformSdkConfig_1.PlatformSdkConfig.GetSdkVersion(),
      d = PlatformSdkServer_1.PlatformSdkServer.GeneratePayHeader(t, n, s),
      u = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId(),
      h = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg(),
      _ = new PlatformSdkReportData_1.PlatformReportGetGoodsList(),
      [_, d, S] =
        ((_.goodsid = o),
        (_.goodsid_count = i),
        this.ReportToThirdParty(_),
        await PlatformSdkServer_1.PlatformSdkServer.QueryStoreProductsAsync(
          d,
          ["productId"],
          t,
          ["channelId"],
          u,
          ["dn"],
          this.GetDeviceId(),
          ["pkg"],
          h,
          ["vn"],
          n,
          ["svn"],
          s,
          ["plat"],
          4,
          ["goodsIds"],
          o,
        ));
    if (!S)
      return (
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo error, serverData is undefined",
        ),
        { FailReason: _, NeedReLogin: d, DataList: void 0 }
      );
    LauncherLog_1.LauncherLog.Debug(
      "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo",
      ["serverData", S],
    );
    let l = !1;
    var c = [];
    for (let t = 0; t < r.Num(); t++) {
      var P = r.Get(t);
      const m = P.id;
      var f,
        p = S.find((t) => t.channelGoodsId === m);
      p
        ? (((f = new PlatformSdkNew_1.DisplayProductInfo()).GoodId = p.goodsId),
          (f.Price = P.displayPrice),
          (f.ChannelGoodId = m),
          (f.GoodLabel = P.label),
          (f.Desc = P.description),
          (f.Name = P.displayName),
          c.push(f))
        : (LauncherLog_1.LauncherLog.Error(
            "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo Error, PSN商品信息在SDK商品配置中找不到",
            ["PSN商品信息 psnId", m],
            ["PSN商品信息 displayName", P.displayName],
            ["PSN商品信息 displayPrice", P.displayPrice],
          ),
          (l = !0));
    }
    if (l) {
      LauncherLog_1.LauncherLog.Error(
        "QueryProductInfo Error, PSN商品信息与SDK商品配置不一致",
        ["SDK商品列表", S],
      );
      for (let t = 0; t < r.Num(); t++) {
        var k = r.Get(t);
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] PSN商品列表",
          ["index", t],
          ["id", k.id],
          ["displayName", k.displayName],
          ["displayPrice", k.displayPrice],
        );
      }
    }
    return (
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] QueryProductInfo result",
        ["resultList", c],
      ),
      { FailReason: _, NeedReLogin: !1, DataList: c }
    );
  }
  OpenCheckoutDialog(t, e, r) {
    var a = new PlatformSdkReportData_1.PlatformReportOpenPsnCheckOut(),
      r =
        ((a.product_id = r),
        (a.goodsId = e),
        (a.psnenvlssuer = this.CFa.IssuerId.toString()),
        (this.Szl = r),
        (this.Mzl = e),
        this.ReportToThirdParty(a),
        ue_1.KuroStaticPS5Library.OpenCheckoutDialog((0, puerts_1.$ref)(t)));
    return (
      LauncherLog_1.LauncherLog.Debug(
        "[PlatformSdkNew][PlayStation5Sdk] OpenCheckoutDialog",
        ["ret", r],
      ),
      0 === r
    );
  }
  PollCheckoutDialogResult() {
    switch (ue_1.KuroStaticPS5Library.PollCheckoutDialogResult()) {
      case -1:
        return 1;
      case 2:
        return this.Vsl(), 2;
      default:
        return this.Vsl(), 0;
    }
  }
  Vsl() {
    var t = new PlatformSdkReportData_1.PlatformReportClosePsnCheckOut();
    (t.product_id = this.Szl),
      (t.goodsId = this.Mzl),
      (t.psnenvlssuer = this.CFa.IssuerId.toString()),
      this.ReportToThirdParty(t);
  }
  RequestCheckoutProduct(t, e, r) {
    var a = PlatformSdkConfig_1.PlatformSdkConfig.GetProductId(),
      o = PlatformSdkConfig_1.PlatformSdkConfig.GetVersion(),
      i = PlatformSdkConfig_1.PlatformSdkConfig.GetSdkVersion(),
      n = PlatformSdkServer_1.PlatformSdkServer.GeneratePayHeader(a, o, i),
      s = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId(),
      d = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg(),
      u = this.CFa.IssuerId;
    PlatformSdkServer_1.PlatformSdkServer.RequestCheckoutProduct(
      r,
      u,
      e,
      n,
      ["productId"],
      a,
      ["channelId"],
      s,
      ["dn"],
      this.GetDeviceId(),
      ["pkg"],
      d,
      ["vn"],
      o,
      ["svn"],
      i,
      ["plat"],
      4,
      ["access_token"],
      t.AccessToken,
      ["psnEnvIssuerId"],
      this.CFa.IssuerId,
      ["serverId"],
      t.ServerId,
      ["serverName"],
      t.ServerName,
      ["roleId"],
      t.RoleId,
      ["roleName"],
      t.RoleName,
    );
  }
  NeedConfirmSdkProductInfo() {
    return !0;
  }
  NeedShowSdkProductInfoBeforePay() {
    return !0;
  }
  GetMessageBoxCurrentState(e) {
    const r = (t) => {
      (0, puerts_1.releaseManualReleaseDelegate)(r), e(t);
    };
    ue_1.KuroStaticPS5Library.GetMessageDialogStateAsync(
      (0, puerts_1.toManualReleaseDelegate)(r),
    );
  }
  async OpenMessageBox(t, a, o) {
    return (
      LauncherLog_1.LauncherLog.Debug("打开messageBox"),
      new Promise((e) => {
        const r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r);
          t = 0 === t;
          e(t),
            t &&
              ((this.xsl = 0),
              this.ksl(
                () => (
                  this.GetMessageBoxCurrentState((t) => {
                    3 === (this.xsl = t) && this.TerminateMessageBox();
                  }),
                  3 === this.xsl ? -1 : 0
                ),
              ));
        };
        ue_1.KuroStaticPS5Library.OpenMessageDialog(
          (0, puerts_1.$ref)(t),
          a,
          o,
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  GetCommunicationRestricted(t, r) {
    t || r(0);
    const a = (t, e) => {
      (0, puerts_1.releaseManualReleaseDelegate)(a),
        LauncherLog_1.LauncherLog.Debug("GetCommunicationRestricted", [
          "ret",
          t,
        ]),
        r(1 === e ? 1 : 0);
    };
    ue_1.KuroStaticPS5Library.GetCommunicationRestrictionStatusAsync(
      (0, puerts_1.$ref)(t),
      (0, puerts_1.toManualReleaseDelegate)(a),
    );
  }
  async GetCommunicationRestrictedAsync(t) {
    return new Promise((e) => {
      this.GetCommunicationRestricted(t, (t) => {
        e(t);
      });
    });
  }
  GetIfShowDefaultPrice() {
    return !1;
  }
  CheckUserPremium() {
    var t = this.GetUserId();
    return ue_1.KuroStaticPS5Library.CheckUserPremium((0, puerts_1.$ref)(t));
  }
  NotifyPlayStationPremium(t) {
    var e = this.GetUserId();
    ue_1.KuroStaticPS5Library.NotifyPremiumFeature((0, puerts_1.$ref)(e), t);
  }
  TerminateMessageBox() {
    ue_1.KuroStaticPS5Library.TerminateMessageDialog();
  }
  CreatePlayerSession(t, e) {
    return ue_1.KuroStaticPS5Library.CreatePlayerSession(
      t,
      (0, puerts_1.$ref)(e.toString()),
    );
  }
  SetPlayerSessionJoinAbleUserType(t) {
    ue_1.KuroStaticPS5Library.SetPlayerSessionJoinableUserType(t);
  }
  LeavePlayerSession() {
    ue_1.KuroStaticPS5Library.LeavePlayerSession();
  }
  JoinPlayerSession(t) {
    ue_1.KuroStaticPS5Library.JoinPlayerSession((0, puerts_1.$ref)(t));
  }
  CheckJoinSession() {
    return ue_1.KuroStaticPS5Library.CheckJoinSession();
  }
  GetPlayerIdByPlayerSessionId(t) {
    return ue_1.KuroStaticPS5Library.GetPlayerIdByPlayerSessionId(
      (0, puerts_1.$ref)(t),
    );
  }
  IsPlatformNetworkReachable() {
    var t = this.GetUserId(),
      e = (0, puerts_1.$ref)(0);
    return 0 !==
      ue_1.KuroStaticPS5Library.SceNpGetNpReachabilityState(
        (0, puerts_1.$ref)(t),
        e,
      )
      ? (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] SceNpGetNpReachabilityState failed",
        ),
        !1)
      : 2 === (0, puerts_1.$unref)(e);
  }
  async GetTargetRelation(t) {
    const e = await this.Bsh();
    let r = t.filter((t) => t !== e).filter((t) => !this.Vrh.has(t));
    if (0 === r.length) return this.Vrh;
    if (0 === (r = r.filter((t) => "" !== t)).length) return this.Vrh;
    const a = r.join(",");
    if (
      (LauncherLog_1.LauncherLog.Debug("GetTargetRelation", ["checkStr", a]),
      this.Hrh.has(a))
    )
      return (
        LauncherLog_1.LauncherLog.Debug("重复获取,等待任务结束"),
        await this.Hrh.get(a),
        LauncherLog_1.LauncherLog.Debug("任务结束"),
        this.Vrh
      );
    t = new Promise((t) => {
      this.jrh.set(a, t);
    });
    LauncherLog_1.LauncherLog.Debug("开始获取任务"), this.Hrh.set(a, t);
    const o = this.ZAa("psn:s2s openid id_token:psn.basic_claims");
    return o
      ? (LauncherLog_1.LauncherLog.Debug("AuthCode", ["authCode", o]),
        new Promise((r) => {
          var t =
            `&access_token=${this.CurrentAccessToken}&psnEnvIssuerId=${o?.IssuerId}&accountIds=` +
            a;
          PlatformSdkServer_1.PlatformSdkServer.GetSdkRelation(t, (t, e) => {
            t &&
              e &&
              e.data &&
              e.data.blockList &&
              e.data.blockList.forEach((t) => {
                var e = t.isBlocked || t.isBlocking;
                this.Vrh.set(t.accountId, e ? 5 : 0);
              }),
              this.jrh.get(a)(this.Vrh),
              r(this.Vrh);
          });
        }))
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] Login failed, empty authCode",
        ),
        this.Vrh);
  }
  GetIfNeedQueryProductInfoForce() {
    return !1;
  }
  async RequestEmailCode(t) {
    const e = "&actionType=PSN_EMAIL_LOGIN&emailTo=" + t;
    return new Promise((o) => {
      PlatformSdkServer_1.PlatformSdkServer.RequestEmailAddressCode(
        e,
        (t, e, r, a) => {
          LauncherLog_1.LauncherLog.Debug(
            "RequestEmailCode",
            ["success", t],
            ["msg", r],
            ["timestamp", a],
          );
          a = new PlatformSdkNew_1.RequestEmailCodeResponse();
          (a.Code = e), (a.Msg = r), (a.IfSuccess = t), o(a);
        },
      );
    });
  }
  SupportExternalWebBrowser() {
    return !1;
  }
  OpenUserCenter(t, e) {
    var r = new PlatformSdkReportData_1.PlatformReportClickAccountCenter(),
      r =
        (this.ReportToThirdParty(r),
        PlatformSdkServer_1.PlatformSdkServer.GetUserCenterUrl()),
      a = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId(),
      o = PlatformSdkConfig_1.PlatformSdkConfig.GetProductId(),
      i = PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId(),
      n = PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId(),
      s = this.qsl(),
      d = PlatformSdkConfig_1.PlatformSdkConfig.GetPlatformPkg(),
      u = this.CurrentAccessToken,
      h = this.GetDeviceId(),
      _ = PlatformSdkConfig_1.PlatformSdkConfig.GetSdkVersion(),
      S = this.GetRunningOnlyCode(),
      r =
        r +
        `?__e__=1&accessToken=${u}&response_type=code&redirect_uri=1&language=${s}&isSDK=1&pkg=${d}&userID=${t}&client_id=${a}&deviceNum=${h}&gameName=${this.GetGameName()}&channelId=${n}&productId=${o}&accountType=0&projectId=${i}&sdkVersion=${_}&loginId=` +
        S;
    LauncherLog_1.LauncherLog.Info("打开用户中心开始", ["url", r]),
      this.OpenWebView(r, () => {
        LauncherLog_1.LauncherLog.Info("打开用户中心结束"), e?.();
      });
  }
  OpenCustomerService() {
    var t = new PlatformSdkReportData_1.PlatformReportClickCustomerService(),
      t =
        (this.ReportToThirdParty(t),
        PlatformSdkServer_1.PlatformSdkServer.IsCustomerServiceEnable);
    t
      ? ((t =
          PlatformSdkConfig_1.PlatformSdkConfig.GetCustomServiceUrl() +
          `?productId=${PlatformSdkConfig_1.PlatformSdkConfig.GetProductId()}&channelId=${PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId()}&projectId=${PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId()}&language=` +
          this.qsl()),
        LauncherLog_1.LauncherLog.Info("打开客服", ["url", t]),
        this.OpenWebView(t))
      : LauncherLog_1.LauncherLog.Info("关闭了客服");
  }
  ReportToServer(t, e) {
    var r = JSON.stringify(e),
      a = e.roleId,
      o = e.roleName,
      i = e.serverId,
      n = e.serverName;
    PlatformSdkReportData_1.PlatformSdkReportBaseData.InitSdkRoleValue(
      a,
      o,
      i,
      n,
    ),
      PlatformSdkServer_1.PlatformSdkServer.RequestReportData(
        this.CurrentAccessToken,
        r,
        (t, e, r) => {
          LauncherLog_1.LauncherLog.Debug(
            "ReportToServer",
            ["code", t],
            ["msg", e],
            ["timestamp", r],
          );
        },
      ),
      0 === t
        ? ((a = new PlatformSdkReportData_1.PlatformReportCreateRole()),
          this.ReportToThirdParty(a))
        : 2 === t
          ? ((o = new PlatformSdkReportData_1.PlatformReportUpgradeRole()),
            this.ReportToThirdParty(o))
          : 1 === t &&
            (((i =
              new PlatformSdkReportData_1.PlatformReportLoginRole()).level =
              e.roleLevel),
            this.ReportToThirdParty(i));
  }
  ReportToThirdParty(t) {
    this.DataReportInitState ? this.jhl(t) : this.Bsl.push(t);
  }
  jhl(t) {
    var e;
    PlatformSdkServer_1.PlatformSdkServer.IsReportEnable
      ? ((e = t.GetReportEventName()),
        (t = t.GetReportData()),
        LauncherLog_1.LauncherLog.Debug(
          "ReportToThirdParty",
          ["eventName", e],
          ["data", t],
        ),
        cpp_1.FThinkingAnalyticsForPuerts.Track(e, t, this.Psl))
      : LauncherLog_1.LauncherLog.Debug("关闭了数数上报");
  }
  NotifyCurrentLanguage(t) {
    var e = new PlatformSdkReportData_1.PlatformReportGetGameLanguage();
    this.ReportToThirdParty(e),
      PlatformSdkReportData_1.PlatformSdkReportBaseData.ChangeLanguage(t),
      PlatformSdkServer_1.PlatformSdkServer.SetLanguage(t),
      (this.wsl = t);
  }
  qsl() {
    return "" === this.wsl
      ? LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage()
      : this.wsl;
  }
  BlockServerArea() {
    return (
      "Development" !== cpp_1.KuroApplication.GetAppReleaseType() &&
      (LauncherLog_1.LauncherLog.Info(
        "开启了锁区，注意服务器列表配置（将CDN服务器region字段修改成当前国家码可显示）",
      ),
      !0)
    );
  }
  GetChannelId() {
    return PlatformSdkConfig_1.PlatformSdkConfig.GetChannelId();
  }
  GetPackageId() {
    return PlatformSdkConfig_1.PlatformSdkConfig.GetProductId();
  }
  GetSdkCountry() {
    var t = this.GetUserId(),
      t = ue_1.KuroStaticPS5Library.GetCountryCodeByUserId(
        (0, puerts_1.$ref)(t),
      );
    return (
      LauncherLog_1.LauncherLog.Debug("GetSdkCountry", ["countryCode", t]), t
    );
  }
  Tick(t) {
    this.J_(t);
  }
  NeedLimitUserInfoWhenSocialLimit() {
    return !0;
  }
}
exports.PlayStation5Sdk = PlayStation5Sdk;
//# sourceMappingURL=PlayStation5Sdk.js.map
