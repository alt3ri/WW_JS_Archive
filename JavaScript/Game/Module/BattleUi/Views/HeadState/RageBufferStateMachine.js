"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RageBufferStateMachine = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  LARGE_TIME = 1e3;
class RageBufferStateMachine {
  constructor() {
    (this.w_t = 0),
      (this.B_t = 0),
      (this.b_t = 0),
      (this.y_t = 0),
      (this.I_t = 0),
      (this.TargetPercent = 0),
      (this.CurrentPercent = 0),
      (this.Cce = 0),
      (this.q_t = 0),
      (this.G_t = 0),
      (this.N_t = 0),
      (this.O_t = !1),
      (this.k_t = void 0),
      (this.F_t = void 0),
      (this.V_t = void 0),
      (this.T_t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitDelayTime")),
      (this.L_t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitRefreshTime")),
      (this.D_t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "HitBufferDisappearTime",
      )),
      (this.nnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargePercent",
        ) / 1e4),
      (this.Cce = this.D_t);
  }
  SetUpdateCallback(t, i, s) {
    (this.k_t = t), (this.F_t = i), (this.V_t = s);
  }
  Update(t) {
    var i;
    2 === this.b_t && ((this.b_t = 0), this.V_t?.()),
      2 === this.w_t
        ? ((i = (this.CurrentPercent - this.TargetPercent) / this.Cce),
          (this.CurrentPercent -= t * i),
          (this.Cce -= t),
          this.Cce <= 0 &&
            ((this.w_t = 0), (this.CurrentPercent = this.TargetPercent)),
          this.k_t?.(this.CurrentPercent, this.TargetPercent, this.O_t))
        : 1 === this.w_t &&
          ((this.y_t += t),
          this.y_t > this.T_t && (this.w_t = 2),
          this.k_t?.(this.CurrentPercent, this.TargetPercent, this.O_t)),
      (this.O_t = !1),
      2 === this.B_t
        ? ((this.N_t -= t),
          this.N_t <= 0 &&
            ((this.B_t = 0),
            (this.G_t = this.q_t),
            this.F_t?.(this.G_t, this.q_t)))
        : 1 === this.B_t &&
          ((this.B_t = 2),
          (this.N_t = LARGE_TIME),
          this.F_t?.(this.G_t, this.q_t));
  }
  GetHit(t, i) {
    i < t ||
      (0 < i && t <= 0 && (this.b_t = 2),
      i - t >= this.nnt
        ? (((this.B_t = 1) !== this.w_t && 2 !== this.w_t) ||
            ((this.w_t = 2),
            (this.Cce = 0),
            (this.CurrentPercent = t),
            (this.TargetPercent = t)),
          (this.G_t = i),
          (this.q_t = t))
        : (0 === this.w_t
            ? ((this.w_t = 1),
              (this.I_t = 1),
              (this.y_t = 0),
              (this.CurrentPercent = i),
              (this.TargetPercent = t),
              (this.Cce = this.D_t))
            : 1 === this.w_t
              ? ((this.I_t += 1),
                this.I_t > this.L_t && (this.w_t = 2),
                (this.y_t = 0),
                (this.TargetPercent = t))
              : 2 === this.w_t && (this.TargetPercent = t),
          (this.O_t = !0)));
  }
  Reset() {
    (this.w_t = 0), (this.B_t = 0), (this.b_t = 0);
  }
}
exports.RageBufferStateMachine = RageBufferStateMachine;
//# sourceMappingURL=RageBufferStateMachine.js.map
