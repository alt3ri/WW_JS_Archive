"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameUtils = void 0);
const Log_1 = require("../Core/Common/Log"),
  Stats_1 = require("../Core/Common/Stats"),
  ImmutableArray_1 = require("../Core/Container/ImmutableArray"),
  ImmutableMap_1 = require("../Core/Container/ImmutableMap"),
  TimerSystem_1 = require("../Core/Timer/TimerSystem");
class GameUtils {
  static async WaitFrame() {
    return new Promise((e) => {
      TimerSystem_1.TimerSystem.Next(() => {
        e();
      });
    });
  }
  static ConvertToArray(r, t, a = void 0) {
    if (0 === r) return this.u_i;
    var o = new Array();
    for (let e = 0; e < r; e++) a ? o.push(t.call(a, e)) : o.push(t(e));
    return o;
  }
  static ConvertToMap(r, t, a, o = void 0) {
    if (0 === r) return this.BKa;
    var m = new Map();
    for (let e = 0; e < r; e++)
      o ? m.set(t.call(o, e), a.call(o, e)) : m.set(t(e), a(e));
    return m;
  }
  static CreateStat(e) {
    var r = Stats_1.Stat.Create(e);
    r.Start(), r.Stop(), Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 52, e);
  }
}
((exports.GameUtils = GameUtils).u_i = new ImmutableArray_1.ImmutableArray()),
  (GameUtils.BKa = new ImmutableMap_1.ImmutableMap());
//# sourceMappingURL=GameUtils.js.map
