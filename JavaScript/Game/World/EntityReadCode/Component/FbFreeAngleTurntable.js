"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFreeAngleTurntable = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFreeAngleItem_1 = require("./FbFreeAngleItem");
class FbFreeAngleTurntable {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.B2h = !1),
      (this.q2h = 0),
      (this.l7h = !1),
      (this._7h = void 0),
      (this.f7h = !1),
      (this.p7h = 0);
  }
  static Create(t) {
    if (t) return new FbFreeAngleTurntable(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RotationSpeed() {
    return (
      this.B2h ||
        ((this.B2h = !0), (this.q2h = this.FbDataInternal.rotationSpeed())),
      this.q2h
    );
  }
  get ItemConfig() {
    if (!this.l7h) {
      (this.l7h = !0), (this._7h = new Array());
      var e = this.FbDataInternal.itemConfigLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.itemConfig(
            t,
            new fb_component_1.FreeAngleItem(),
          );
          this._7h.push(FbFreeAngleItem_1.FbFreeAngleItem.Create(i));
        }
    }
    return this._7h;
  }
  get IntervalAngle() {
    return (
      this.f7h ||
        ((this.f7h = !0), (this.p7h = this.FbDataInternal.intervalAngle())),
      this.p7h
    );
  }
}
exports.FbFreeAngleTurntable = FbFreeAngleTurntable;
//# sourceMappingURL=FbFreeAngleTurntable.js.map
