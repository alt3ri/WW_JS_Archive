"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDynamicPortalCreatorComponent = void 0);
const UnionDynamicPortalCreateHelper_1 = require("./UnionDynamicPortalCreateHelper");
class FbDynamicPortalCreatorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.I$h = !1),
      (this.T$h = void 0);
  }
  static Create(t) {
    if (t) return new FbDynamicPortalCreatorComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Model() {
    var t, e;
    return (
      !this.I$h &&
        ((this.I$h = !0),
        (t = this.FbDataInternal.modelType()),
        (e =
          UnionDynamicPortalCreateHelper_1.UnionDynamicPortalCreateHelper.GetUnionDynamicPortalCreateObject(
            t,
          ))) &&
        (this.T$h =
          UnionDynamicPortalCreateHelper_1.UnionDynamicPortalCreateHelper.ReadUnionDynamicPortalCreate(
            t,
            this.FbDataInternal.model(e),
          )),
      this.T$h
    );
  }
}
exports.FbDynamicPortalCreatorComponent = FbDynamicPortalCreatorComponent;
//# sourceMappingURL=FbDynamicPortalCreatorComponent.js.map
