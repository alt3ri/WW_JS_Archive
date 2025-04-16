"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSphereTriggerShape = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSphereTriggerShape {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nIh = !1),
      (this.n9o = void 0),
      (this.sIh = !1),
      (this.s9o = 0);
  }
  static Create(t) {
    if (t) return new FbSphereTriggerShape(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Center() {
    return (
      this.nIh ||
        ((this.nIh = !0),
        (this.n9o = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.center(),
        ))),
      this.n9o
    );
  }
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
}
exports.FbSphereTriggerShape = FbSphereTriggerShape;
//# sourceMappingURL=FbSphereTriggerShape.js.map
