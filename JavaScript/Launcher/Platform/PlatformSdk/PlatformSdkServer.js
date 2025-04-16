"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkServer = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("./PlatformSdkManagerNew"),
  PlatformSdkReportData_1 = require("./PlatformSdkReportData"),
  HttpTimeout = 10;
class SdkServerEncodeHelper {
  static MarkData(...t) {
    var r = new Map();
    for (let e = 0; e < t.length; e += 2)
      void 0 !== t[e] &&
        void 0 !== t[e + 1] &&
        r.set(t[e].toString(), t[e + 1]);
    return this.qWa(r);
  }
  static qWa(e) {
    (e = Object.fromEntries(e.entries())),
      (e = JSON.stringify(e)),
      (e = ue_1.KuroStaticLibrary.Base64EncodeWithConvertToUTF8(e));
    let t = "";
    return (t =
      42 < e.length
        ? this.OWa(
            e.split("").map((e) => e),
            1,
            33,
            10,
            42,
            18,
            50,
            19,
            51,
          ).join("")
        : e);
  }
  static OWa(t, ...r) {
    for (let e = 0; e < r.length; e += 2) {
      var a,
        o = r[e],
        s = r[e + 1];
      0 <= o &&
        o < t.length &&
        0 <= s &&
        s < t.length &&
        ((a = t[o]), (t[o] = t[s]), (t[s] = a));
    }
    return t;
  }
  static MarkSign(e, ...t) {
    var r = new Map();
    for (let e = 0; e < t.length; e += 2)
      void 0 !== t[e] && void 0 !== t[e + 1] && r.set(t[e], t[e + 1]);
    return this.GWa(e, r);
  }
  static GWa(e, t) {
    var r = Array.from(t.keys()).filter((e) => "sign" !== e);
    r.sort();
    let a = "";
    for (let e = 0; e < r.length; e++) {
      var o = r[e],
        s = t.get(o);
      0 < o.length && (a += o + `=${s}&`);
    }
    e = a += e;
    return ue_1.KuroStaticLibrary.Md5HashAnsiString(e);
  }
}
class PlatformSdkServer {
  static SetLanguage(e) {
    this.dFa = e;
  }
  static get IsConnected() {
    return void 0 !== this.rRa;
  }
  static get IsReportEnable() {
    return this.rRa?.clientSwitch.td;
  }
  static get IsCustomerServiceEnable() {
    return this.rRa?.clientSwitch.kefu;
  }
  static get IsPsnLoginEnable() {
    return 1 === this.rRa?.thirdLogin.psnLogin.enabled;
  }
  static get IsPsnEmailLoginEnable() {
    return 1 === this.rRa?.thirdLogin.psnEmailLogin.enabled;
  }
  static GetUserCenterUrl() {
    return this.rRa?.clientUrl.accCenterUrl;
  }
  static Initialize() {}
  static InitCommonParam(e) {
    (this.nRa = e),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.InitCommonParam",
        ["CommonParam", this.nRa],
      );
  }
  static GenerateCommonHeader() {
    var e = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    return (
      e.Add(
        "Kr-Ver",
        PlatformSdkConfig_1.PlatformSdkConfig.GetSdkServerVersion(),
      ),
      e.Add("Content-Type", "application/x-www-form-urlencoded"),
      e.Add("Accept-Language", this.dFa),
      e
    );
  }
  static GeneratePayHeader(e, t, r) {
    var a = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    return (
      a.Add("Content-Type", "application/x-www-form-urlencoded"),
      a.Add("kuro_gid", PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId()),
      a.Add("kuro_app_id", e),
      a.Add("kuro_version", t),
      a.Add("kuro_sdk_version", r),
      a.Add("kuro_lang", this.dFa),
      a
    );
  }
  static SwitchUrl() {
    (this.rxa = !this.rxa),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.SwitchUrl",
        ["this.IsUseSpareUrl", this.rxa],
      );
  }
  static y4a(e, t) {
    return e && 200 === t;
  }
  static gIl(e) {
    return 0 !== e.length && "{}" !== e && "[]" !== e;
  }
  static Connect(e, i) {
    var t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/sys/conf.lg",
      e = this.nRa + e;
    const n = (e, t, r) => {
      var a, o, s;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.Connect Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t)
          ? this.gIl(r)
            ? ((r = (e = JSON.parse(r))?.msg ?? "HttpFail"),
              (a = -3 === (s = e?.code)),
              (o = 0 === s) && (this.rRa = e?.data),
              LauncherLog_1.LauncherLog.Debug(
                "[PlatformSdkNew]PlatformSdkServer.Connect Response Debug",
                ["msg", r],
                ["needReLogin", a],
                ["isSuccess", o],
                ["data", this.rRa],
              ),
              0 !== s
                ? (((e =
                    new PlatformSdkReportData_1.PlatformReportSdkInitFail()).code =
                    t.toString()),
                  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                    e,
                  ))
                : ((s =
                    new PlatformSdkReportData_1.PlatformReportSdkInitSuccess()),
                  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                    s,
                  )),
              i(r, a, o))
            : (LauncherLog_1.LauncherLog.Error(
                "[PlatformSdkNew]PlatformSdkServer.Connect failed, empty response",
              ),
              i("HttpFail", !1, !1))
          : i("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(n);
    };
    var r = this.GenerateCommonHeader();
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.Connect",
      ["url", t],
      ["header", r],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        t,
        r,
        e,
        (0, puerts_1.toManualReleaseDelegate)(n),
        HttpTimeout,
      );
  }
  static Usl(d, e, l) {
    if (this.IsConnected)
      if (this.CPa)
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]PlatformSdkServer.Login duplicate call",
        );
      else {
        this.CPa = !0;
        var t =
            PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) + d,
          e = this.nRa + e;
        const S = (r, a, o) => {
          if (
            (LauncherLog_1.LauncherLog.Info(
              "[PlatformSdkNew]PlatformSdkServer.Login Response",
              ["success", r],
              ["code", a],
              ["result", o],
            ),
            (this.CPa = !1),
            this.y4a(r, a))
          )
            if (this.gIl(o)) {
              var r = JSON.parse(o),
                a = r?.msg ?? "HttpFail",
                o = r?.code,
                s = -3 === o,
                i = 20180 === o,
                n = 0 === o,
                r = n ? r?.data : void 0;
              PlatformSdkReportData_1.PlatformSdkReportBaseData.SetCuid(
                r?.cuid ?? "",
              ),
                PlatformSdkReportData_1.PlatformSdkReportBaseData.SetPuid(
                  r?.id ?? 0,
                ),
                LauncherLog_1.LauncherLog.Debug(
                  "[PlatformSdkNew]PlatformSdkServer.Login Response Debug",
                  ["msg", a],
                  ["needReLogin", s],
                  ["needSelectLoginFunction", i],
                  ["isSuccess", n],
                  ["data", r],
                ),
                l(a, s, i, r);
              let e = !0,
                t = !1;
              "/v2/login/third/psn.lg" === d && (e = !1),
                "/v2/login/third/psnBind.lg" === d && (t = !0),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetThirdUnionId(
                  r?.thirdUnionId ?? "",
                ),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().InitDataReport(),
                0 === o
                  ? ((n =
                      PlatformSdkReportData_1.PlatformReportLoginSuccess.Create(
                        e,
                        t,
                      )),
                    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                      n,
                    ))
                  : i ||
                    ((s =
                      PlatformSdkReportData_1.PlatformReportLoginFail.Create(
                        e,
                        o.toString(),
                        a,
                      )),
                    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                      s,
                    ));
            } else l("HttpFail", !1, !1, void 0);
          else l("HttpFail", !1, !1, void 0);
          (0, puerts_1.releaseManualReleaseDelegate)(S);
        };
        var r = this.GenerateCommonHeader(),
          a =
            (LauncherLog_1.LauncherLog.Info(
              "[PlatformSdkNew]PlatformSdkServer.Login",
              ["url", t],
              ["header", r],
              ["params", e],
            ),
            new PlatformSdkReportData_1.PlatformReportLogin());
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
          a,
        ),
          ue_1.KuroHttp.Post(
            t,
            r,
            e,
            (0, puerts_1.toManualReleaseDelegate)(S),
            HttpTimeout,
          );
      }
    else
      LauncherLog_1.LauncherLog.Error(
        "[PlatformSdkNew]PlatformSdkServer.Login failed, not connect to server",
      );
  }
  static Login(e, t) {
    this.Usl("/v2/login/third/psn.lg", e, t);
  }
  static BindAccountThenLogin(e, t) {
    this.Usl("/v2/login/third/psnBind.lg", e, t);
  }
  static GetAccessToken(e, o) {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId(),
      r = PlatformSdkConfig_1.PlatformSdkConfig.GetClientSecret(),
      e =
        this.nRa +
        `&code=${e}&client_id=${t}&client_secret=${r}&grant_type=authorization_code&redirect_uri=1`,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/auth/getToken.lg";
    const s = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.GetAccessToken Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t) && this.gIl(r)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (a = -3 === (r = e?.code)),
            (e = (r = 0 === r) ? e?.data : void 0),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.GetAccessToken Response Debug",
              ["msg", t],
              ["needReLogin", a],
              ["isSuccess", r],
              ["data", e],
            ),
            o(t, a, e))
          : o("HttpFail", !1, void 0),
        (0, puerts_1.releaseManualReleaseDelegate)(s);
    };
    r = this.GenerateCommonHeader();
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.GetAccessToken",
      ["url", t],
      ["header", r],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        t,
        r,
        e,
        (0, puerts_1.toManualReleaseDelegate)(s),
        HttpTimeout,
      );
  }
  static GetSdkRelation(e, a) {
    var e = this.nRa + e,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/psn/block/states.lg";
    const o = (e, t, r) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.GetSdkRelation Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t)
          ? ((e = JSON.parse(r)),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.GetSdkRelation Response Debug",
              ["data", e],
              ["msg", r],
            ),
            a(!0, e))
          : a(!1, void 0),
        (0, puerts_1.releaseManualReleaseDelegate)(o);
    };
    var r = this.GenerateCommonHeader();
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.GetSdkRelation",
      ["url", t],
      ["header", r],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        t,
        r,
        e,
        (0, puerts_1.toManualReleaseDelegate)(o),
        HttpTimeout,
      );
  }
  static RenewAccessToken(e, o) {
    var e = this.nRa + "&access_token=" + e,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/heartbeat/tokenCheck.lg";
    const s = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (e = -3 === (r = e?.code)),
            (r = 0 === r),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken Response Debug",
              ["msg", t],
              ["needReLogin", e],
              ["isSuccess", r],
            ),
            e &&
              ((a = new PlatformSdkReportData_1.PlatformReportSdkOffLine()),
              PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                a,
              )),
            o(t, e, r))
          : o("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(s);
    };
    var r = this.GenerateCommonHeader(),
      a =
        (LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken",
          ["url", t],
          ["header", r],
          ["params", e],
        ),
        new PlatformSdkReportData_1.PlatformReportSdkKeepAlive());
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
      a,
    ),
      ue_1.KuroHttp.Post(
        t,
        r,
        e,
        (0, puerts_1.toManualReleaseDelegate)(s),
        HttpTimeout,
      );
  }
  static RequestEmailAddressCode(e, o) {
    var e = this.nRa + e,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/email/psnLogin/send.lg";
    const s = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RequestEmailAddressCode Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t) && this.gIl(r)
          ? ((a = JSON.parse(r)),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RequestEmailAddressCode Response Debug",
              ["data", a],
              ["msg", r],
            ),
            o(e, a.code, a.msg, a.timestamp))
          : o(e, t, "HttpFail", 0),
        (0, puerts_1.releaseManualReleaseDelegate)(s);
    };
    var r = this.GenerateCommonHeader(),
      a =
        (LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkServer.RequestEmailAddressCode",
          ["url", t],
          ["header", r],
          ["params", e],
        ),
        new PlatformSdkReportData_1.PlatformReportClickSendCode());
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
      a,
    ),
      ue_1.KuroHttp.Post(
        t,
        r,
        e,
        (0, puerts_1.toManualReleaseDelegate)(s),
        HttpTimeout,
      );
  }
  static QueryStoreProducts(e, s, ...t) {
    var r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetPayUrl(this.rxa) +
        "/api/v1/prop/query.lg",
      a = SdkServerEncodeHelper.MarkData(...t),
      o = Math.ceil(Date.now() / 1e3).toString(),
      i = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId(),
      n = PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId(),
      i = SdkServerEncodeHelper.MarkSign(
        i,
        "pcode",
        n,
        "data",
        a,
        "timestamp",
        o,
      );
    const d = (e, t, r) => {
      if (
        (LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts Response",
          ["success", e],
          ["code", t],
          ["result", r],
        ),
        this.y4a(e, t))
      ) {
        var e = JSON.parse(r),
          t = e?.msg ?? "HttpFail",
          r = e?.code,
          a = 401 === r,
          o = 0 === r,
          e = o ? e?.data : void 0;
        if (
          (LauncherLog_1.LauncherLog.Debug(
            "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts Response Debug",
            ["msg", t],
            ["needReLogin", a],
            ["isSuccess", o],
            ["data", e],
          ),
          s(t, a, e),
          0 === r)
        ) {
          let t = "",
            r = 0;
          e?.forEach((e) => {
            (t += e.goodsId + ","), r++;
          }),
            (t = t.substring(0, t.length - 1));
          o = new PlatformSdkReportData_1.PlatformReportGetGoodsListSuccess();
          (o.channel_goodsid = t),
            (o.channel_goodsid_count = r),
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
              o,
            );
        } else {
          a = new PlatformSdkReportData_1.PlatformReportGetGoodsListFail();
          (a.code = r.toString()),
            (a.msg = t),
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
              a,
            );
        }
      } else s("HttpFail", !1, void 0);
      (0, puerts_1.releaseManualReleaseDelegate)(d);
    };
    n = `pcode=${n}&data=${encodeURIComponent(a)}&sign=${i}&timestamp=` + o;
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts",
      ["url", r],
      ["url", e],
      ["params", n],
      ["rawData", t],
    ),
      ue_1.KuroHttp.Post(
        r,
        e,
        n,
        (0, puerts_1.toManualReleaseDelegate)(d),
        HttpTimeout,
      );
  }
  static async QueryStoreProductsAsync(e, ...t) {
    return new Promise((a) => {
      this.QueryStoreProducts(
        e,
        (e, t, r) => {
          a([e, t, r]);
        },
        ...t,
      );
    });
  }
  static RequestCheckoutProduct(o, s, i, e, ...t) {
    var r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetPayUrl(this.rxa) +
        "/api/v1/callback/psn",
      a = SdkServerEncodeHelper.MarkData(...t),
      n = Math.ceil(Date.now() / 1e3).toString(),
      d = PlatformSdkConfig_1.PlatformSdkConfig.GetClientId(),
      l = PlatformSdkConfig_1.PlatformSdkConfig.GetProjectId(),
      S = SdkServerEncodeHelper.MarkSign(
        d,
        "pcode",
        l,
        "data",
        a,
        "timestamp",
        n,
      );
    const c = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (e = 401 === (r = e?.code)),
            (a = 0 === r),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct Response Debug",
              ["msg", t],
              ["needReLogin", e],
              ["isSuccess", a],
            ),
            i(t, e, a),
            0 !== r
              ? (((e =
                  new PlatformSdkReportData_1.PlatformReportUploadPsnBillFail()).code =
                  r.toString()),
                (e.msg = t),
                (e.psn_scene = this.Dsl(o)),
                (e.psnenvlssuer = s.toString()),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                  e,
                ))
              : (((a =
                  new PlatformSdkReportData_1.PlatformReportUploadPsnBillSuccess()).psnenvlssuer =
                  s.toString()),
                (a.psn_scene = this.Dsl(o)),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
                  a,
                )))
          : i("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(c);
    };
    (l = `pcode=${l}&data=${encodeURIComponent(a)}&sign=${S}&timestamp=` + n),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct",
        ["url", r],
        ["productKey", d],
        ["payHeader", e],
        ["params", l],
        ["rawData", t],
      ),
      (a = new PlatformSdkReportData_1.PlatformReportUploadPsnBill());
    (a.psn_scene = this.Dsl(o)),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
        a,
      ),
      ue_1.KuroHttp.Post(
        r,
        e,
        l,
        (0, puerts_1.toManualReleaseDelegate)(c),
        HttpTimeout,
      );
  }
  static Dsl(e) {
    let t = "";
    return 0 === e ? (t = "2") : 1 === e ? (t = "1") : 2 === e && (t = "3"), t;
  }
  static RequestReportData(e, t, a) {
    let r = UE.KuroStaticLibrary.Base64EncodeWithSpecifyCharWithConvertToUTF8(
      t,
      "JRps7QAydqSkYFN-T4wnBDhKLr8H3.u69mG2WjPgOxco0avZE5IUflMVbtzeX1iC",
    );
    r = r.replace(/[=]/g, "");
    var o = "rOLe" + t + "jar",
      s = UE.KuroStaticLibrary.Md5HashUTF8String(o).toUpperCase(),
      t =
        (LauncherLog_1.LauncherLog.Debug(
          "[PlatformSdkNew]PlatformSdkServer.RequestReportData",
          ["param", t],
          ["r_role", r],
          ["signUpper", s],
          ["trySignStr", o],
        ),
        `&access_token=${e}&r_role=${r}&r_sign=` + s),
      o = this.nRa + t,
      e =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.rxa) +
        "/v2/user/game/role.lg";
    const i = (e, t, r) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RequestReportData Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.y4a(e, t)
          ? ((e = JSON.parse(r)),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RequestReportData Response Debug",
              ["data", e],
              ["msg", r],
            ),
            a(e.code, e.msg, e.timestamp))
          : a(t, "HttpFail", 0),
        (0, puerts_1.releaseManualReleaseDelegate)(i);
    };
    s = this.GenerateCommonHeader();
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.RequestReportData",
      ["url", e],
      ["header", s],
      ["params", o],
    ),
      ue_1.KuroHttp.Post(
        e,
        s,
        o,
        (0, puerts_1.toManualReleaseDelegate)(i),
        HttpTimeout,
      );
  }
}
((exports.PlatformSdkServer = PlatformSdkServer).rxa = !1),
  (PlatformSdkServer.dFa = "en"),
  (PlatformSdkServer.nRa = ""),
  (PlatformSdkServer.rRa = void 0),
  (PlatformSdkServer.CPa = !1);
//# sourceMappingURL=PlatformSdkServer.js.map
