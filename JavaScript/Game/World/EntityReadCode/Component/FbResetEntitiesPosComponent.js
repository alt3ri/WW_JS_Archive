"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetEntitiesPosComponent = void 0);
const UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbResetEntitiesPosComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbResetEntitiesPosComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Range() {
    var t, e;
    return (
      !this.M_h &&
        ((this.M_h = !0),
        (t = this.FbDataInternal.rangeType()),
        (e =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(
            t,
          ))) &&
        (this.E_h =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(
            t,
            this.FbDataInternal.range(e),
          )),
      this.E_h
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var e = this.FbDataInternal.entityIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbResetEntitiesPosComponent = FbResetEntitiesPosComponent;
//# sourceMappingURL=FbResetEntitiesPosComponent.js.map
