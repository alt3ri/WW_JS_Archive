"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StatSecondsAccumulator = void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log"),
  CycleCounter_1 = require("./CycleCounter");
class StatSecondsAccumulator {
  constructor(t) {
    (this.JWa = ""), (this.JWa = t);
  }
  static Create(t, e = "", o = "") {
    if (!CycleCounter_1.CycleCounter.IsEnabled)
      return StatSecondsAccumulator.ZWa;
    let r = t;
    return (
      r.length > CycleCounter_1.STAT_MAX_NAME_LENGTH &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Stat", 30, "名字过长", ["name", t]),
        (r = t.substring(0, CycleCounter_1.STAT_MAX_NAME_LENGTH))),
      UE.KuroJsStatsLibrary.CreateSimpleSeconds(r, e, o, !0),
      new StatSecondsAccumulator(r)
    );
  }
  Start() {
    CycleCounter_1.CycleCounter.IsEnabled &&
      UE.KuroJsStatsLibrary.StartSimpleSeconds(this.JWa);
  }
  Stop() {
    CycleCounter_1.CycleCounter.IsEnabled &&
      UE.KuroJsStatsLibrary.StopSimpleSeconds(this.JWa);
  }
}
(exports.StatSecondsAccumulator = StatSecondsAccumulator).ZWa =
  new StatSecondsAccumulator("");
//# sourceMappingURL=StatSeconds.js.map
