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
  static A5(o, r, e, t, a, s) {
    let i = 0,
      c = "",
      _ = "";
    "number" == typeof e
      ? (i = e)
      : ((n = e?.GetComponent(0)) &&
          ((i = n.GetCreatureDataId()),
          (c = Protocol_1.Aki.Protocol.kks[n.GetEntityType()])),
        (n = e?.GetComponent(3))?.Actor?.IsValid() && (_ = n.Actor.GetName()));
    var n,
      g = `[${r}][EntityId:${i}:${c}:${_}] ` + t;
    switch (o) {
      case 0:
        Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 14, g, ...a);
        break;
      case 1:
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("CombatInfo", 14, g, ...a);
        break;
      case 2:
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("CombatInfo", 14, g, ...a);
        break;
      case 3:
        s
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("CombatInfo", 14, g, s, ...a)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("CombatInfo", 14, g, ...a);
    }
  }
  static Info(o, r, e, ...t) {
    this.A5(0, o, r, e, t);
  }
  static Warn(o, r, e, ...t) {
    this.A5(2, o, r, e, t);
  }
  static Error(o, r, e, ...t) {
    this.A5(3, o, r, e, t);
  }
  static ErrorWithStack(o, r, e, t, ...a) {
    t instanceof Error
      ? this.A5(3, o, r, e, a, t)
      : this.A5(3, o, r, e, [...a, ["error", t]]);
  }
}
(exports.CombatLog = CombatLog).DebugCombatInfo = new Set();
//# sourceMappingURL=CombatLog.js.map
