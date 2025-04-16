"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEffectAreaComponent = void 0);
const UnionEffectAreaConfigHelper_1 = require("./UnionEffectAreaConfigHelper");
class FbEffectAreaComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbEffectAreaComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionEffectAreaConfigHelper_1.UnionEffectAreaConfigHelper.GetUnionEffectAreaConfigObject(
            e,
          ))) &&
        (this.TAe =
          UnionEffectAreaConfigHelper_1.UnionEffectAreaConfigHelper.ReadUnionEffectAreaConfig(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbEffectAreaComponent = FbEffectAreaComponent;
//# sourceMappingURL=FbEffectAreaComponent.js.map
