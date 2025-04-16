"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOnThrowTriggerTimeCondition = void 0);
class FbOnThrowTriggerTimeCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.M2h = !1),
      (this.E2h = 0);
  }
  static Create(t) {
    if (t) return new FbOnThrowTriggerTimeCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get TriggerTime() {
    return (
      this.M2h ||
        ((this.M2h = !0), (this.E2h = this.FbDataInternal.triggerTime())),
      this.E2h
    );
  }
}
exports.FbOnThrowTriggerTimeCondition = FbOnThrowTriggerTimeCondition;
//# sourceMappingURL=FbOnThrowTriggerTimeCondition.js.map
