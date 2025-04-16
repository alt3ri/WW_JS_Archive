"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherNetworkDetectionModel = void 0);
const LauncherConfigLib_1 = require("../Define/LauncherConfigLib");
class LauncherNetworkDetectionModel {
  static GetGenericErrorCodeTips(e, r, t) {
    let o = "ERROR CODE:";
    switch (e) {
      case 0:
        return (o =
          "" +
          LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
            "NetworkDetection_Proxy_Wrong",
          ) +
          t.Address);
      case 1:
        o = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "NetworkDetection_Domain_Wrong",
        );
        break;
      case 2:
        var n = t;
        o =
          `${LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText("NetworkDetection_Ping_Wrong")} Min:${n.Result.Min},Max:${n.Result.Max},Min:${n.Result.Avg},Loss:` +
          n.Result.Loss;
        break;
      case 3:
        o = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "NetworkDetection_Http_Wrong",
        );
        break;
      case 4:
        o = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "NetworkDetection_Udp_Wrong",
        );
    }
    return "" + o + r;
  }
  static GenerateTraceCode() {
    var r = [];
    for (let e = 0; e < 12; ++e) {
      var t = Math.floor(10 * Math.random());
      r.push(t);
    }
    return r.join("");
  }
}
exports.LauncherNetworkDetectionModel = LauncherNetworkDetectionModel;
//# sourceMappingURL=LauncherNetworkDetectionModel.js.map
