"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRangeComponent = void 0);
const UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbRangeComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.nRh = !1),
      (this.c6o = void 0),
      (this.Zkh = !1),
      (this.eGh = 0);
  }
  static Create(e) {
    if (e) return new FbRangeComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Shape() {
    var e, t;
    return (
      !this.nRh &&
        ((this.nRh = !0),
        (e = this.FbDataInternal.shapeType()),
        (t =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(
            e,
          ))) &&
        (this.c6o =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(
            e,
            this.FbDataInternal.shape(t),
          )),
      this.c6o
    );
  }
  get ExtraRange() {
    return (
      this.Zkh ||
        ((this.Zkh = !0), (this.eGh = this.FbDataInternal.extraRange())),
      this.eGh
    );
  }
}
exports.FbRangeComponent = FbRangeComponent;
//# sourceMappingURL=FbRangeComponent.js.map
