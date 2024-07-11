"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTickConditionModule = void 0);
const Log_1 = require("../../Core/Common/Log"),
  TickSystem_1 = require("../../Core/Tick/TickSystem");
class UiTickConditionModule {
  constructor(i) {
    (this.HDe = void 0),
      (this.gzo = void 0),
      (this.yzt = void 0),
      (this.sgr = 0),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.r6 = (i) => {
        this.yzt?.(i)
          ? (this.HDe?.(this.sgr), this.gzo?.(this.sgr), this.agr())
          : (this.sgr += i);
      }),
      (this.lZo = i);
  }
  StartTick(i, t, s) {
    (this.yzt = i),
      (this.gzo = t),
      (this.HDe = s),
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.r6,
        "UiTickConditionModule",
        0,
        !0,
      ).Id);
  }
  ManualStopTick() {
    this.gzo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiTickConditionModule",
          11,
          "手动停止Tick,执行停止回调",
          ["标识", this.lZo],
        ),
      this.gzo?.(this.sgr),
      this.agr());
  }
  agr() {
    this.S0t(),
      (this.sgr = 0),
      (this.yzt = void 0),
      (this.gzo = void 0),
      (this.HDe = void 0);
  }
  S0t() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Remove(this.sKe);
  }
}
exports.UiTickConditionModule = UiTickConditionModule;
//# sourceMappingURL=UiTickConditionModule.js.map
