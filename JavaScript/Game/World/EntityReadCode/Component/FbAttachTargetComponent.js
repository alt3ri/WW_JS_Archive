"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAttachTargetComponent = void 0);
const UnionAttachTargetHelper_1 = require("./UnionAttachTargetHelper");
class FbAttachTargetComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.S7h = !1),
      (this.M7h = void 0),
      (this.E7h = !1),
      (this.I7h = void 0),
      (this.T7h = !1),
      (this.b7h = void 0);
  }
  static Create(t) {
    if (t) return new FbAttachTargetComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AttachTarget() {
    var t, e;
    return (
      !this.S7h &&
        ((this.S7h = !0),
        (t = this.FbDataInternal.attachTargetType()),
        (e =
          UnionAttachTargetHelper_1.UnionAttachTargetHelper.GetUnionAttachTargetObject(
            t,
          ))) &&
        (this.M7h =
          UnionAttachTargetHelper_1.UnionAttachTargetHelper.ReadUnionAttachTarget(
            t,
            this.FbDataInternal.attachTarget(e),
          )),
      this.M7h
    );
  }
  get PosRule() {
    return (
      this.E7h || ((this.E7h = !0), (this.I7h = this.FbDataInternal.posRule())),
      this.I7h
    );
  }
  get RotRule() {
    return (
      this.T7h || ((this.T7h = !0), (this.b7h = this.FbDataInternal.rotRule())),
      this.b7h
    );
  }
}
exports.FbAttachTargetComponent = FbAttachTargetComponent;
//# sourceMappingURL=FbAttachTargetComponent.js.map
