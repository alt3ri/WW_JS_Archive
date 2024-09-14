"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkServer = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  HttpTimeout = 10;
class SdkServerEncodeHelper {
  static MarkData(...t) {
    var r = new Map();
    for (let e = 0; e < t.length; e += 2)
      void 0 !== t[e] &&
        void 0 !== t[e + 1] &&
        r.set(t[e].toString(), t[e + 1]);
    return this.B7a(r);
  }
  static B7a(e) {
    (e = Object.fromEntries(e.entries())),
      (e = JSON.stringify(e)),
      (e = ue_1.KuroStaticLibrary.Base64EncodeWithConvertToUTF8(e));
    let t = "";
    return (t =
      42 < e.length
        ? this.b7a(
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
  static b7a(t, ...r) {
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
    return this.q7a(e, r);
  }
  static q7a(e, t) {
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
    this.uka = e;
  }
  static get IsConnected() {
    return void 0 !== this.aAa;
  }
  static Initialize() {}
  static InitCommonParam(e) {
    (this.lAa = e),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.InitCommonParam",
        ["CommonParam", this.lAa],
      );
  }
  static GenerateCommonHeader() {
    var e = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    return (
      e.Add("Kr-Ver", "1.8.0"),
      e.Add("Content-Type", "application/x-www-form-urlencoded"),
      e.Add("Accept-Language", this.uka),
      e
    );
  }
  static GeneratePayHeader(e, t, r) {
    var a = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
    return (
      a.Add("Content-Type", "application/x-www-form-urlencoded"),
      a.Add(
        "kuro_gid",
        PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig()
          .projectId,
      ),
      a.Add("kuro_app_id", e),
      a.Add("kuro_version", t),
      a.Add("kuro_sdk_version", r),
      a.Add("kuro_lang", this.uka),
      a
    );
  }
  static SwitchUrl() {
    (this.ZUa = !this.ZUa),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.SwitchUrl",
        ["this.IsUseSpareUrl", this.ZUa],
      );
  }
  static aFa(e, t) {
    return e && 200 === t;
  }
  static Connect(e, o) {
    var t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.ZUa) +
        "/v2/sys/conf.lg",
      e = this.lAa + e;
    const s = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.Connect Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
          ? 0 < r.length
            ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
              (a = -3 === (r = e?.code)),
              (r = 0 === r) && (this.aAa = e?.data),
              LauncherLog_1.LauncherLog.Debug(
                "[PlatformSdkNew]PlatformSdkServer.Connect Response Debug",
                ["msg", t],
                ["needReLogin", a],
                ["isSuccess", r],
                ["data", this.aAa],
              ),
              o(t, a, r))
            : (LauncherLog_1.LauncherLog.Error(
                "[PlatformSdkNew]PlatformSdkServer.Connect failed, empty response",
              ),
              o("HttpFail", !1, !1))
          : o("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(s);
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
        (0, puerts_1.toManualReleaseDelegate)(s),
        HttpTimeout,
      );
  }
  static Login(e, o) {
    if (this.IsConnected)
      if (this.uPa)
        LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]PlatformSdkServer.Login duplicate call",
        );
      else {
        this.uPa = !0;
        var t =
            PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.ZUa) +
            "/v2/login/third/psn.lg",
          e = this.lAa + e;
        const s = (e, t, r) => {
          var a;
          LauncherLog_1.LauncherLog.Info(
            "[PlatformSdkNew]PlatformSdkServer.Login Response",
            ["success", e],
            ["code", t],
            ["result", r],
          ),
            (this.uPa = !1),
            this.aFa(e, t)
              ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
                (a = -3 === (r = e?.code)),
                (e = (r = 0 === r) ? e?.data : void 0),
                LauncherLog_1.LauncherLog.Debug(
                  "[PlatformSdkNew]PlatformSdkServer.Login Response Debug",
                  ["msg", t],
                  ["needReLogin", a],
                  ["isSuccess", r],
                  ["data", e],
                ),
                o(t, a, e))
              : o("HttpFail", !1, void 0),
            (0, puerts_1.releaseManualReleaseDelegate)(s);
        };
        var r = this.GenerateCommonHeader();
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkServer.Login",
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
    else
      LauncherLog_1.LauncherLog.Error(
        "[PlatformSdkNew]PlatformSdkServer.Login failed, not connect to server",
      );
  }
  static GetAccessToken(e, o) {
    var t = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig(),
      e =
        this.lAa +
        `&code=${e}&client_id=${t.client_id}&client_secret=${t.client_secret}&grant_type=authorization_code&redirect_uri=1`,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.ZUa) +
        "/v2/auth/getToken.lg";
    const s = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.GetAccessToken Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
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
    var r = this.GenerateCommonHeader();
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
    var e = this.lAa + e,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.ZUa) +
        "/v2/psn/block/states.lg";
    const o = (e, t, r) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.GetSdkRelation Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
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
  static RenewAccessToken(e, a) {
    var e = this.lAa + "&access_token=" + e,
      t =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.ZUa) +
        "/v2/heartbeat/tokenCheck.lg";
    const o = (e, t, r) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (e = -3 === (r = e?.code)),
            (r = 0 === r),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken Response Debug",
              ["msg", t],
              ["needReLogin", e],
              ["isSuccess", r],
            ),
            a(t, e, r))
          : a("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(o);
    };
    var r = this.GenerateCommonHeader();
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken",
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
  static QueryStoreProducts(e, o, ...t) {
    var r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetPayUrl(this.ZUa) +
        "/api/v1/prop/query.lg",
      a = SdkServerEncodeHelper.MarkData(...t),
      s = Math.ceil(Date.now() / 1e3).toString(),
      i = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig(),
      n = i.client_id,
      i = i.projectId,
      n = SdkServerEncodeHelper.MarkSign(
        n,
        "pcode",
        i,
        "data",
        a,
        "timestamp",
        s,
      );
    const c = (e, t, r) => {
      var a;
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (a = 401 === (r = e?.code)),
            (e = (r = 0 === r) ? e?.data : void 0),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts Response Debug",
              ["msg", t],
              ["needReLogin", a],
              ["isSuccess", r],
              ["data", e],
            ),
            o(t, a, e))
          : o("HttpFail", !1, void 0),
        (0, puerts_1.releaseManualReleaseDelegate)(c);
    };
    i = `pcode=${i}&data=${encodeURIComponent(a)}&sign=${n}&timestamp=` + s;
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.QueryStoreProducts",
      ["url", r],
      ["url", e],
      ["params", i],
      ["rawData", t],
    ),
      ue_1.KuroHttp.Post(
        r,
        e,
        i,
        (0, puerts_1.toManualReleaseDelegate)(c),
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
  static RequestCheckoutProduct(a, e, ...t) {
    var r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetPayUrl(this.ZUa) +
        "/api/v1/callback/psn",
      o = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig(),
      s = SdkServerEncodeHelper.MarkData(...t),
      i = Math.ceil(Date.now() / 1e3).toString(),
      n = o.client_id,
      o = o.projectId,
      c = SdkServerEncodeHelper.MarkSign(
        n,
        "pcode",
        o,
        "data",
        s,
        "timestamp",
        i,
      );
    const d = (e, t, r) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct Response",
        ["success", e],
        ["code", t],
        ["result", r],
      ),
        this.aFa(e, t)
          ? ((t = (e = JSON.parse(r))?.msg ?? "HttpFail"),
            (e = 401 === (r = e?.code)),
            (r = 0 === r),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct Response Debug",
              ["msg", t],
              ["needReLogin", e],
              ["isSuccess", r],
            ),
            a(t, e, r))
          : a("HttpFail", !1, !1),
        (0, puerts_1.releaseManualReleaseDelegate)(d);
    };
    o = `pcode=${o}&data=${encodeURIComponent(s)}&sign=${c}&timestamp=` + i;
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.RequestCheckoutProduct",
      ["url", r],
      ["productKey", n],
      ["payHeader", e],
      ["params", o],
      ["rawData", t],
    ),
      ue_1.KuroHttp.Post(
        r,
        e,
        o,
        (0, puerts_1.toManualReleaseDelegate)(d),
        HttpTimeout,
      );
  }
}
((exports.PlatformSdkServer = PlatformSdkServer).ZUa = !1),
  (PlatformSdkServer.uka = "en"),
  (PlatformSdkServer.lAa = ""),
  (PlatformSdkServer.aAa = void 0),
  (PlatformSdkServer.uPa = !1);
//# sourceMappingURL=PlatformSdkServer.js.map
