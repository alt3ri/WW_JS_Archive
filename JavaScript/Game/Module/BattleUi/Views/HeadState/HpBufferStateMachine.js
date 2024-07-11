"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HpBufferStateMachine = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class HpBufferStateMachine {
  constructor() {
    (this.Mke = 0),
      (this.u1t = 0),
      (this.c1t = 0),
      (this.TargetPercent = 0),
      (this.CurrentPercent = 0),
      (this.Cce = 0),
      (this.m1t = -0),
      (this.d1t = -0),
      (this.C1t = -0),
      (this.m1t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitDelayTime")),
      (this.d1t =
        CommonParamById_1.configCommonParamById.GetIntConfig("HitRefreshTime")),
      (this.C1t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "HitBufferDisappearTime",
      )),
      (this.Cce = this.C1t);
  }
  UpdateParams(t) {
    t === 6 &&
      ((this.m1t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "DurabilityHitDelayTime",
      )),
      (this.C1t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "DurabilityHitBufferDisappearTime",
      )));
  }
  UpdatePercent(t) {
    let i;
    return this.Mke === 2
      ? ((i = (this.CurrentPercent - this.TargetPercent) / this.Cce),
        (this.CurrentPercent -= t * i),
        (this.Cce -= t),
        this.Cce <= 0
          ? ((this.Mke = 0), this.TargetPercent)
          : this.CurrentPercent)
      : this.Mke === 1
        ? ((this.u1t += t),
          this.u1t > this.m1t && (this.Mke = 2),
          this.CurrentPercent)
        : -1;
  }
  GetHit(t, i) {
    i < t ||
      (this.Mke === 0
        ? ((this.Mke = 1),
          (this.c1t = 1),
          (this.u1t = 0),
          (this.CurrentPercent = i),
          (this.TargetPercent = t),
          (this.Cce = this.C1t))
        : this.Mke === 1
          ? ((this.c1t += 1),
            this.c1t > this.d1t && (this.Mke = 2),
            (this.u1t = 0),
            (this.TargetPercent = t))
          : this.Mke === 2 &&
            ((this.TargetPercent = t), (this.Cce = this.C1t)));
  }
  Reset() {
    this.Mke = 0;
  }
  IsOriginState() {
    return this.Mke === 0;
  }
}
exports.HpBufferStateMachine = HpBufferStateMachine;
// # sourceMappingURL=HpBufferStateMachine.js.map
