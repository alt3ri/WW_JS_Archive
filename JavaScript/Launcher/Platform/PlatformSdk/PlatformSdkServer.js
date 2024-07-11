"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkServer = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  HttpTimeout = 10;
class PlatformSdkServer {
  static get IsConnected() {
    return void 0 !== this.tIa;
  }
  static Initialize() {
    this.iIa.Add("Kr-Ver", "1.8.0"),
      this.iIa.Add("Content-Type", "application/x-www-form-urlencoded");
  }
  static SetCommonParam(e) {
    (this.rIa = e),
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.SetCommonParam",
        ["commonParam", e],
      );
  }
  static Connect(e) {
    var r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.oIa) +
        "/v2/sys/conf.lg",
      e = this.rIa + e;
    const o = (e, r, t) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.Connect Response",
        ["success", e],
        ["code", r],
        ["result", t],
      ),
        e
          ? ((this.tIa = JSON.parse(t).data),
            LauncherLog_1.LauncherLog.Debug(
              "[PlatformSdkNew]PlatformSdkServer.Connect Response data",
              ["data", this.tIa],
            ))
          : LauncherLog_1.LauncherLog.Error(
              "[PlatformSdkNew]PlatformSdkServer.Connect failed",
            ),
        (0, puerts_1.releaseManualReleaseDelegate)(o);
    };
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.Connect",
      ["url", r],
      ["header", this.iIa],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        r,
        this.iIa,
        e,
        (0, puerts_1.toManualReleaseDelegate)(o),
        HttpTimeout,
      );
  }
  static Login(e, o) {
    if (this.IsConnected) {
      var r =
          PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.oIa) +
          "/v2/login/third/psn.lg",
        e = this.rIa + e;
      const a = (e, r, t) => {
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkServer.Login Response",
          ["success", e],
          ["code", r],
          ["result", t],
        ),
          e
            ? o(JSON.parse(t).data)
            : LauncherLog_1.LauncherLog.Error(
                "[PlatformSdkNew]PlatformSdkServer.Login failed",
              ),
          (0, puerts_1.releaseManualReleaseDelegate)(a);
      };
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.Login",
        ["url", r],
        ["header", this.iIa],
        ["params", e],
      ),
        ue_1.KuroHttp.Post(
          r,
          this.iIa,
          e,
          (0, puerts_1.toManualReleaseDelegate)(a),
          HttpTimeout,
        );
    } else
      LauncherLog_1.LauncherLog.Error(
        "[PlatformSdkNew]PlatformSdkServer.Login failed, not connect to server",
      );
  }
  static GetAccessToken(e, o) {
    var r = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig(),
      e = `code=${e}&client_id=${r.client_id}&client_secret=${r.client_secret}&grant_type=authorization_code&redirect_uri=1`,
      r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.oIa) +
        "/v2/auth/getToken.lg";
    const a = (e, r, t) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.GetAccessToken Response",
        ["success", e],
        ["code", r],
        ["result", t],
      ),
        e
          ? o(JSON.parse(t).data)
          : LauncherLog_1.LauncherLog.Error(
              "[PlatformSdkNew]PlatformSdkServer.GetAccessToken failed",
            ),
        (0, puerts_1.releaseManualReleaseDelegate)(a);
    };
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.GetAccessToken",
      ["url", r],
      ["header", this.iIa],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        r,
        this.iIa,
        e,
        (0, puerts_1.toManualReleaseDelegate)(a),
        HttpTimeout,
      );
  }
  static RenewAccessToken(e, o) {
    var e = "access_token=" + e,
      r =
        PlatformSdkConfig_1.PlatformSdkConfig.GetServerUrl(this.oIa) +
        "/v2/heartbeat/tokenCheck.lg";
    const a = (e, r, t) => {
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken Response",
        ["success", e],
        ["code", r],
        ["result", t],
      ),
        e
          ? o(JSON.parse(t).data)
          : (o(void 0),
            LauncherLog_1.LauncherLog.Error(
              "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken failed",
            )),
        (0, puerts_1.releaseManualReleaseDelegate)(a);
    };
    LauncherLog_1.LauncherLog.Info(
      "[PlatformSdkNew]PlatformSdkServer.RenewAccessToken",
      ["url", r],
      ["header", this.iIa],
      ["params", e],
    ),
      ue_1.KuroHttp.Post(
        r,
        this.iIa,
        e,
        (0, puerts_1.toManualReleaseDelegate)(a),
        HttpTimeout,
      );
  }
}
((exports.PlatformSdkServer = PlatformSdkServer).oIa = !1),
  (PlatformSdkServer.iIa = (0, ue_1.NewMap)(
    ue_1.BuiltinString,
    ue_1.BuiltinString,
  )),
  (PlatformSdkServer.rIa = ""),
  (PlatformSdkServer.tIa = void 0);
//# sourceMappingURL=PlatformSdkServer.js.map
