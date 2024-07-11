"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSetting = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  moduleNetworkState = [];
class BattleSetting {
  static RequestSetModuleNetworkState(t, e) {
    var o = Protocol_1.Aki.Protocol.cis.create();
    (o.Hjn = t),
      (o.Vjn = e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          20,
          "[BattleModule] Request module network mode",
          ["ModuleName", Protocol_1.Aki.Protocol.D4s[t]],
          ["ClientControl", e],
        ),
      Net_1.Net.Call(24709, o, (e) => {
        BattleSetting.ReceiveSetModuleNetworkState(t, e.Vjn);
      });
  }
  static IsModuleClientControl(e) {
    return moduleNetworkState[e] ?? !0;
  }
  static ReceiveSetModuleNetworkState(e, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        20,
        "[BattleModule] Receive module network mode notify",
        ["ModuleName", Protocol_1.Aki.Protocol.D4s[e]],
        ["ClientControl", t],
      ),
      (moduleNetworkState[e] = t);
  }
}
exports.BattleSetting = BattleSetting;
//# sourceMappingURL=BattleSetting.js.map
