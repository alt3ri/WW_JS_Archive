"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiNiagaraItem = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  DEFAULT_DURATION = 1e3;
class BattleUiNiagaraItem {
  constructor(t) {
    (this.IRe = void 0),
      (this.q7e = () => {
        (this.IRe = void 0), this.Oot();
      }),
      (this.Item = t),
      (this.Duration = DEFAULT_DURATION);
  }
  Play() {
    this.Item.SetUIActive(!0),
      this.Item.ActivateSystem(!0),
      this.xHe(),
      this.kot();
  }
  Stop() {
    this.IRe && (this.xHe(), this.Oot());
  }
  Oot() {
    this.Item.SetUIActive(!1);
  }
  kot() {
    this.IRe = TimerSystem_1.TimerSystem.Delay(this.q7e, this.Duration);
  }
  xHe() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
  }
}
exports.BattleUiNiagaraItem = BattleUiNiagaraItem;
//# sourceMappingURL=BattleUiNiagaraItem.js.map
