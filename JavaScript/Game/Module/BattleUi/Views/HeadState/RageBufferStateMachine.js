"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RageBufferStateMachine = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const LARGE_TIME = 1e3;
class RageBufferStateMachine {
  constructor() {
    (this.S1t = 0),
      (this.E1t = 0),
      (this.y1t = 0),
      (this.u1t = 0),
      (this.c1t = 0),
      (this.TargetPercent = 0),
      (this.CurrentPercent = 0),
      (this.Cce = 0),
      (this.I1t = 0),
      (this.T1t = 0),
      (this.L1t = 0),
      (this.D1t = !1),
      (this.R1t = void 0),
      (this.U1t = void 0),
      (this.A1t = void 0),
      (this.m1t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitDelayTime")),
      (this.d1t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitRefreshTime")),
      (this.C1t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "HitBufferDisappearTime",
      )),
      (this.Qot =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargePercent",
        ) / 1e4),
      (this.Cce = this.C1t);
  }
  SetUpdateCallback(t, i, s) {
    (this.R1t = t), (this.U1t = i), (this.A1t = s);
  }
  Update(t) {
    let i;
    this.y1t === 2 && ((this.y1t = 0), this.A1t?.()),
      this.S1t === 2
        ? ((i = (this.CurrentPercent - this.TargetPercent) / this.Cce),
          (this.CurrentPercent -= t * i),
          (this.Cce -= t),
          this.Cce <= 0 &&
            ((this.S1t = 0), (this.CurrentPercent = this.TargetPercent)),
          this.R1t?.(this.CurrentPercent, this.TargetPercent, this.D1t))
        : this.S1t === 1 &&
          ((this.u1t += t),
          this.u1t > this.m1t && (this.S1t = 2),
          this.R1t?.(this.CurrentPercent, this.TargetPercent, this.D1t)),
      (this.D1t = !1),
      this.E1t === 2
        ? ((this.L1t -= t),
          this.L1t <= 0 &&
            ((this.E1t = 0),
            (this.T1t = this.I1t),
            this.U1t?.(this.T1t, this.I1t)))
        : this.E1t === 1 &&
          ((this.E1t = 2),
          (this.L1t = LARGE_TIME),
          this.U1t?.(this.T1t, this.I1t));
  }
  GetHit(t, i) {
    i < t ||
      (i > 0 && t <= 0 && (this.y1t = 2),
      i - t >= this.Qot
        ? (((this.E1t = 1) !== this.S1t && this.S1t !== 2) ||
            ((this.S1t = 2),
            (this.Cce = 0),
            (this.CurrentPercent = t),
            (this.TargetPercent = t)),
          (this.T1t = i),
          (this.I1t = t))
        : (this.S1t === 0
            ? ((this.S1t = 1),
              (this.c1t = 1),
              (this.u1t = 0),
              (this.CurrentPercent = i),
              (this.TargetPercent = t),
              (this.Cce = this.C1t))
            : this.S1t === 1
              ? ((this.c1t += 1),
                this.c1t > this.d1t && (this.S1t = 2),
                (this.u1t = 0),
                (this.TargetPercent = t))
              : this.S1t === 2 && (this.TargetPercent = t),
          (this.D1t = !0)));
  }
  Reset() {
    (this.S1t = 0), (this.E1t = 0), (this.y1t = 0);
  }
}
exports.RageBufferStateMachine = RageBufferStateMachine;
// # sourceMappingURL=RageBufferStateMachine.js.map
