"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPortalComponent = void 0);
const UnionPortalConfigHelper_1 = require("./UnionPortalConfigHelper");
class FbPortalComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbPortalComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    var t, i;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (i =
          UnionPortalConfigHelper_1.UnionPortalConfigHelper.GetUnionPortalConfigObject(
            t,
          ))) &&
        (this.TAe =
          UnionPortalConfigHelper_1.UnionPortalConfigHelper.ReadUnionPortalConfig(
            t,
            this.FbDataInternal.config(i),
          )),
      this.TAe
    );
  }
}
exports.FbPortalComponent = FbPortalComponent;
//# sourceMappingURL=FbPortalComponent.js.map
