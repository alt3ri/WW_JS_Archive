"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayRegisteredMontage = void 0);
class FbPlayRegisteredMontage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Rfh = !1),
      (this.wfh = 0),
      (this.Pfh = !1),
      (this.Ufh = !1),
      (this.Qfh = !1),
      (this.Kfh = 0),
      (this._Ah = !1),
      (this.cAh = 0),
      (this.uAh = !1),
      (this.dAh = 0),
      (this.px_ = !1),
      (this.vx_ = !1),
      (this.Uf1 = !1),
      (this.Df1 = !1);
  }
  static Create(t) {
    if (t) return new FbPlayRegisteredMontage(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0), (this.wfh = this.FbDataInternal.montageId())),
      this.wfh
    );
  }
  get IsAbpMontage() {
    return (
      this.Pfh ||
        ((this.Pfh = !0), (this.Ufh = this.FbDataInternal.isAbpMontage())),
      this.Ufh
    );
  }
  get FaceExpressionId() {
    return (
      this.Qfh ||
        ((this.Qfh = !0), (this.Kfh = this.FbDataInternal.faceExpressionId())),
      this.Kfh
    );
  }
  get LoopDuration() {
    return (
      this._Ah ||
        ((this._Ah = !0), (this.cAh = this.FbDataInternal.loopDuration())),
      this.cAh
    );
  }
  get RepeatTimes() {
    return (
      this.uAh ||
        ((this.uAh = !0), (this.dAh = this.FbDataInternal.repeatTimes())),
      this.dAh
    );
  }
  get KeepMontageWhenEnd() {
    return (
      this.px_ ||
        ((this.px_ = !0),
        (this.vx_ = this.FbDataInternal.keepMontageWhenEnd())),
      this.vx_
    );
  }
  get KeepMontageAfterFlow() {
    return (
      this.Uf1 ||
        ((this.Uf1 = !0),
        (this.Df1 = this.FbDataInternal.keepMontageAfterFlow())),
      this.Df1
    );
  }
}
exports.FbPlayRegisteredMontage = FbPlayRegisteredMontage;
//# sourceMappingURL=FbPlayRegisteredMontage.js.map
