"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPatrol = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPatrolAction_1 = require("./FbPatrolAction");
class FbPatrol {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.QRh = !1),
      (this.KRh = !1),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbPatrol(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get IsCircle() {
    return (
      this.QRh ||
        ((this.QRh = !0), (this.KRh = this.FbDataInternal.isCircle())),
      this.KRh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(
            t,
            new fb_component_1.PatrolAction(),
          );
          this.A_h.push(FbPatrolAction_1.FbPatrolAction.Create(s));
        }
    }
    return this.A_h;
  }
}
exports.FbPatrol = FbPatrol;
//# sourceMappingURL=FbPatrol.js.map
