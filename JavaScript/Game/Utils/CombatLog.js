"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatLog = void 0);
const UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  GlobalData_1 = require("../GlobalData");
class CombatLog {
  static A5(o, r, t, e, a, s) {
    let i = 0,
      c = "",
      _ = "";
    "number" == typeof t
      ? (i = t)
      : ((n = t?.GetComponent(0)) &&
          ((i = n.GetCreatureDataId()),
          (c = Protocol_1.Aki.Protocol.kks[n.GetEntityType()])),
        (n = t?.GetComponent(3))?.Actor?.IsValid() && (_ = n.Actor.GetName()));
    var n,
      g = `[${r}][EntityId:${i}:${c}:${_}] ` + e;
    switch (o) {
      case 0:
        Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, g, ...a);
        break;
      case 1:
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("CombatInfo", 15, g, ...a);
        break;
      case 2:
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("CombatInfo", 15, g, ...a);
        break;
      case 3:
        s
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("CombatInfo", 15, g, s, ...a)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("CombatInfo", 15, g, ...a);
    }
  }
  static Info(o, r, t, ...e) {
    this.A5(0, o, r, t, e);
  }
  static Warn(o, r, t, ...e) {
    this.A5(2, o, r, t, e);
  }
  static Error(o, r, t, ...e) {
    this.A5(3, o, r, t, e);
  }
  static ErrorWithStack(o, r, t, e, ...a) {
    e instanceof Error
      ? this.A5(3, o, r, t, a, e)
      : this.A5(3, o, r, t, [...a, ["error", e]]);
  }
}
(exports.CombatLog = CombatLog).DebugCombatInfo = !1;
//# sourceMappingURL=CombatLog.js.map
