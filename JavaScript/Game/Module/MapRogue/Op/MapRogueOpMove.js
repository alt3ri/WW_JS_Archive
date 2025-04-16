"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpMove = void 0);
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpMove extends MapRogueOp_1.MapRogueOp {
  constructor(t) {
    super(),
      (this.LastGridIndex = t),
      (this.StepSize = 1),
      (this.n8 = []),
      (this.o2c = []);
  }
  ToString() {
    return (
      `[Move] IncId:${this.IncId} Step:${this.CurrentStep} StepSize:` +
      this.StepSize
    );
  }
  OnUpdate() {
    var t = this.Data.Jsc?.sac,
      s = this.Data.Jsc?.aac;
    if ((t && ((this.n8 = t), (this.StepSize = this.n8.length)), s))
      for (const i of s) this.o2c.push(i.hac);
  }
  OnStartExecute(t) {
    var s = this.n8[this.n8.length - 1],
      s =
        (0 <= t.CurSelectedIndex &&
          t.CurSelectedIndex !== s &&
          (t.SetMapGridBgStateProxy(t.CurSelectedIndex, !1),
          t.SetMapGridBgStateProxy(s, !0)),
        []);
    s.push(this.LastGridIndex),
      s.push(...this.n8),
      t.CreateGridPathAsync(s).then(() => {
        (t.CurOp = this).Execute(t);
      });
  }
  OnExecute(t) {
    var s = this.n8[this.CurrentStep - 1];
    for (const i of this.o2c[this.CurrentStep - 1]) t.SetGridVisionProxy(i, !0);
    t.MoveOneStep(this.LastGridIndex, s),
      (this.LastGridIndex = s),
      (t.GameStage = 3);
  }
  OnFinish(t) {
    t.SetInteractAvailable(3, !1), t.EndMove();
  }
}
exports.MapRogueOpMove = MapRogueOpMove;
//# sourceMappingURL=MapRogueOpMove.js.map
