"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressButton = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  SECOND_0_1 = 100;
class LongPressButton {
  constructor(s, t, e = SECOND_0_1) {
    (this.IRe = void 0),
      (this.VCt = void 0),
      (this.Qqo = () => {
        TimerSystem_1.TimerSystem.Resume(this.IRe);
      }),
      (this.K9t = () => {
        TimerSystem_1.TimerSystem.Pause(this.IRe);
      }),
      s.OnPointDownCallBack.Bind(this.Qqo),
      s.OnPointUpCallBack.Bind(this.K9t),
      s.OnPointExitCallBack.Bind(this.K9t),
      (this.VCt = s),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(t, e)),
      TimerSystem_1.TimerSystem.Pause(this.IRe);
  }
  OnDestroy() {
    this.VCt.OnPointDownCallBack.Unbind(),
      this.VCt.OnPointUpCallBack.Unbind(),
      TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
}
exports.LongPressButton = LongPressButton;
//# sourceMappingURL=LongPressButton.js.map
