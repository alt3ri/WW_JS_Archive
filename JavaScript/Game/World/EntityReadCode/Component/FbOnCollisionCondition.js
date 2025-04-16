"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOnCollisionCondition = void 0);
const FbTriggerCountConfig_1 = require("./FbTriggerCountConfig");
class FbOnCollisionCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.p2h = !1),
      (this.v2h = void 0);
  }
  static Create(t) {
    if (t) return new FbOnCollisionCondition(t);
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
  get TriggerCount() {
    return (
      this.p2h ||
        ((this.p2h = !0),
        (this.v2h = FbTriggerCountConfig_1.FbTriggerCountConfig.Create(
          this.FbDataInternal.triggerCount(),
        ))),
      this.v2h
    );
  }
}
exports.FbOnCollisionCondition = FbOnCollisionCondition;
//# sourceMappingURL=FbOnCollisionCondition.js.map
