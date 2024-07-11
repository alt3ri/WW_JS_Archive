"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressButton = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  SECOND_0_1 = 100;
class LongPressButton {
  constructor(s, t, e = SECOND_0_1) {
    (this.IRe = void 0),
      (this.e0t = void 0),
      (this.jGo = () => {
        TimerSystem_1.TimerSystem.Resume(this.IRe);
      }),
      (this.K7t = () => {
        TimerSystem_1.TimerSystem.Pause(this.IRe);
      }),
      s.OnPointDownCallBack.Bind(this.jGo),
      s.OnPointUpCallBack.Bind(this.K7t),
      s.OnPointExitCallBack.Bind(this.K7t),
      (this.e0t = s),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(t, e)),
      TimerSystem_1.TimerSystem.Pause(this.IRe);
  }
  OnDestroy() {
    this.e0t.OnPointDownCallBack.Unbind(),
      this.e0t.OnPointUpCallBack.Unbind(),
      TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
}
exports.LongPressButton = LongPressButton;
//# sourceMappingURL=LongPressButton.js.map
