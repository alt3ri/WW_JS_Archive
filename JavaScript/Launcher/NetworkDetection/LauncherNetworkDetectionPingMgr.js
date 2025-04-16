"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionPingMgr = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue");
class NetworkDetectionPingMgr {
  static async BatchPing(e, r, s) {
    var i = [];
    for (let t = 0; t < s; ++t) {
      var a = await this.Zic(e, r);
      i.push(a);
    }
    return NetworkDetectionPingMgr.erc(i);
  }
  static async Zic(r, a) {
    return new Promise((s, t) => {
      const i = (t, e, r) => {
        s({ IpAddress: t, Time: e, ResponseState: r }),
          (0, puerts_1.releaseManualReleaseDelegate)(i);
      };
      var e = (0, puerts_1.toManualReleaseDelegate)(i);
      UE.KuroStaticLibrary.IcmpPing(r, a, e);
    });
  }
  static erc(s) {
    var i = { Min: 0, Max: 0, Avg: 0, Loss: 0 };
    if (!(s.length <= 0)) {
      let t = 0,
        e = 0,
        r = 0;
      for (const a of s)
        0 === a.ResponseState
          ? ((t += a.Time),
            ++e,
            (i.Min = 0 === i.Min ? a.Time : Math.min(i.Min, a.Time)),
            (i.Max = Math.min(i.Max, a.Time)))
          : ++r;
      (i.Avg = 0 === e ? 0 : t / e), (i.Loss = r / s.length);
    }
    return i;
  }
}
exports.NetworkDetectionPingMgr = NetworkDetectionPingMgr;
//# sourceMappingURL=LauncherNetworkDetectionPingMgr.js.map
