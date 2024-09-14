"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GameUtils = undefined;
// const Log_1 = require("../Core/Common/Log");
// const Stats_1 = require("../Core/Common/Stats");
const ImmutableArray_1 = require("../Core/Container/ImmutableArray");
const ImmutableMap_1 = require("../Core/Container/ImmutableMap");
// const TimerSystem_1 = require("../Core/Timer/TimerSystem");
class GameUtils {
  static async WaitFrame() {
    return new Promise((e) => {
      TimerSystem_1.TimerSystem.Next(() => {
        e();
      });
    });
  }
  static ConvertToArray(r, t, a = undefined) {
    // if (r === 0) {
    //   return this.u_i;
    // }
    var o = new Array();
    for (let e = 0; e < r; e++) {
      if (a) {
        o.push(t.call(a, e));
      } else {
        o.push(t(e));
      }
    }
    return o;
  }
  static ConvertToMap(r, t, a, o = undefined) {
    // if (r === 0) {
    //   return this.BKa;
    // }
    var m = new Map();
    for (let e = 0; e < r; e++) {
      if (o) {
        m.set(t.call(o, e), a.call(o, e));
      } else {
        m.set(t(e), a(e));
      }
    }
    return m;
  }
  static CreateStat(e) {
    // var r = Stats_1.Stat.Create(e);
    // r.Start();
    // r.Stop();
    // if (Log_1.Log.CheckInfo()) {
    //   Log_1.Log.Info("Game", 52, e);
    // }
  }
}
(exports.GameUtils = GameUtils).u_i = new ImmutableArray_1.ImmutableArray();
GameUtils.BKa = new ImmutableMap_1.ImmutableMap(); //# sourceMappingURL=GameUtils.js.map
