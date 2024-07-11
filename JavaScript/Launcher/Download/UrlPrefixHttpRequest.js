"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UrlPrefixHttpRequest = exports.httpRequest = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const LauncherLog_1 = require("../Util/LauncherLog");
const UrlPrefixDownload_1 = require("./UrlPrefixDownload");
const TimeOut = 3;
async function httpRequest(e) {
  return new Promise((s) => {
    const o = (e, t, r) => {
      s({ Code: t, Result: r }), (0, puerts_1.releaseManualReleaseDelegate)(o);
    };
    UE.KuroHttp.Get(
      e,
      UE.KuroHttp.GetDefaultHeader(),
      (0, puerts_1.toManualReleaseDelegate)(o),
      TimeOut,
    );
  });
}
exports.httpRequest = httpRequest;
class UrlPrefixHttpRequest {
  static async HttpRequest(e) {
    let t = void 0;
    for (const r of UrlPrefixDownload_1.UrlPrefixSelector.GetAllPrefixList()) {
      if ((t = await httpRequest(r + e)).Code === 200) break;
      LauncherLog_1.LauncherLog.Error(
        "带cdn前缀http请求失败！",
        ["prefix", r],
        ["file", e],
        ["ErrorCode", t.Code],
      );
    }
    return t;
  }
}
exports.UrlPrefixHttpRequest = UrlPrefixHttpRequest;
// # sourceMappingURL=UrlPrefixHttpRequest.js.map
