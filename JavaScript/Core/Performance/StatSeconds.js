"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StatSecondsAccumulator = void 0);
const UE = require("ue"),
  Log_1 = require("../Common/Log"),
  CycleCounter_1 = require("./CycleCounter");
class StatSecondsAccumulator {
  constructor(t) {
    (this.Y7a = ""), (this.Y7a = t);
  }
  static Create(t, e = "", o = "") {
    if (!CycleCounter_1.CycleCounter.IsEnabled)
      return StatSecondsAccumulator.z7a;
    let r = t;
    return (
      r.length > CycleCounter_1.STAT_MAX_NAME_LENGTH &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Stat", 31, "名字过长", ["name", t]),
        (r = t.substring(0, CycleCounter_1.STAT_MAX_NAME_LENGTH))),
      UE.KuroJsStatsLibrary.CreateSimpleSeconds(r, e, o, !0),
      new StatSecondsAccumulator(r)
    );
  }
  Start() {
    CycleCounter_1.CycleCounter.IsEnabled &&
      UE.KuroJsStatsLibrary.StartSimpleSeconds(this.Y7a);
  }
  Stop() {
    CycleCounter_1.CycleCounter.IsEnabled &&
      UE.KuroJsStatsLibrary.StopSimpleSeconds(this.Y7a);
  }
}
(exports.StatSecondsAccumulator = StatSecondsAccumulator).z7a =
  new StatSecondsAccumulator("");
//# sourceMappingURL=StatSeconds.js.map
