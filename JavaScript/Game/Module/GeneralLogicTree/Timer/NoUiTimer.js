"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoUiTimer = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil"),
  LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class NoUiTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor() {
    super(...arguments), (this.MYt = -0);
  }
  StartShowTimer(e) {
    this.MYt = e;
  }
  GetRemainTime() {
    return (this.MYt - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / 1e3;
  }
}
exports.NoUiTimer = NoUiTimer;
//# sourceMappingURL=NoUiTimer.js.map
