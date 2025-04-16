"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedAngleTurntable = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFixedAngleItem_1 = require("./FbFixedAngleItem");
class FbFixedAngleTurntable {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.B2h = !1),
      (this.q2h = 0),
      (this.l7h = !1),
      (this._7h = void 0);
  }
  static Create(t) {
    if (t) return new FbFixedAngleTurntable(t);
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
            new fb_component_1.FixedAngleItem(),
          );
          this._7h.push(FbFixedAngleItem_1.FbFixedAngleItem.Create(i));
        }
    }
    return this._7h;
  }
}
exports.FbFixedAngleTurntable = FbFixedAngleTurntable;
//# sourceMappingURL=FbFixedAngleTurntable.js.map
