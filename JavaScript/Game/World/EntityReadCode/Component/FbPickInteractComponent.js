"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPickInteractComponent = void 0);
const UnionPickInteractionHelper_1 = require("./UnionPickInteractionHelper");
class FbPickInteractComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.F$h = !1),
      (this.N$h = void 0);
  }
  static Create(t) {
    if (t) return new FbPickInteractComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get PickInteractType() {
    var t, e;
    return (
      !this.F$h &&
        ((this.F$h = !0),
        (t = this.FbDataInternal.pickInteractTypeType()),
        (e =
          UnionPickInteractionHelper_1.UnionPickInteractionHelper.GetUnionPickInteractionObject(
            t,
          ))) &&
        (this.N$h =
          UnionPickInteractionHelper_1.UnionPickInteractionHelper.ReadUnionPickInteraction(
            t,
            this.FbDataInternal.pickInteractType(e),
          )),
      this.N$h
    );
  }
}
exports.FbPickInteractComponent = FbPickInteractComponent;
//# sourceMappingURL=FbPickInteractComponent.js.map
