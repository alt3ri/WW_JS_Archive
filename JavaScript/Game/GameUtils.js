"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameUtils = void 0);
const Log_1 = require("../Core/Common/Log");
const Stats_1 = require("../Core/Common/Stats");
const TimerSystem_1 = require("../Core/Timer/TimerSystem");
class GameUtils {
  static async WaitFrame() {
    return new Promise((e) => {
      TimerSystem_1.TimerSystem.Next(() => {
        e();
      });
    });
  }
  static ConvertToArray(r, t) {
    const o = new Array();
    for (let e = 0; e < r; e++) o.push(t(e));
    return o;
  }
  static ConvertToMap(r, t, o) {
    const a = new Map();
    for (let e = 0; e < r; e++) a.set(t(e), o(e));
    return a;
  }
  static CreateStat(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 52, e);
  }
}
exports.GameUtils = GameUtils;
// # sourceMappingURL=GameUtils.js.map
