"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetSelfPosComponent = void 0);
class FbResetSelfPosComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.pQh = !1),
      (this.vQh = 0),
      (this.yQh = !1),
      (this.SQh = !1),
      (this.MQh = !1),
      (this.EQh = !1),
      (this.IQh = !1),
      (this.TQh = 0);
  }
  static Create(t) {
    if (t) return new FbResetSelfPosComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ResetRadius() {
    return (
      this.pQh ||
        ((this.pQh = !0), (this.vQh = this.FbDataInternal.resetRadius())),
      this.vQh
    );
  }
  get IsDisableResetPosAfterThrow() {
    return (
      this.yQh ||
        ((this.yQh = !0),
        (this.SQh = this.FbDataInternal.isDisableResetPosAfterThrow())),
      this.SQh
    );
  }
  get IsResetPosAfterThrow() {
    return (
      this.MQh ||
        ((this.MQh = !0),
        (this.EQh = this.FbDataInternal.isResetPosAfterThrow())),
      this.EQh
    );
  }
  get ResetPosDelayTime() {
    return (
      this.IQh ||
        ((this.IQh = !0), (this.TQh = this.FbDataInternal.resetPosDelayTime())),
      this.TQh
    );
  }
}
exports.FbResetSelfPosComponent = FbResetSelfPosComponent;
//# sourceMappingURL=FbResetSelfPosComponent.js.map
