"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityBundleComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityBundleChildInfo_1 = require("./FbEntityBundleChildInfo");
class FbEntityBundleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.j9l = !1),
      (this.H9l = 0),
      (this.W9l = !1),
      (this.Q9l = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityBundleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get BundleId() {
    return (
      this.j9l ||
        ((this.j9l = !0), (this.H9l = this.FbDataInternal.bundleId())),
      this.H9l
    );
  }
  get ChildInfos() {
    if (!this.W9l) {
      (this.W9l = !0), (this.Q9l = new Array());
      var i = this.FbDataInternal.childInfosLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.childInfos(
            t,
            new fb_component_1.EntityBundleChildInfo(),
          );
          this.Q9l.push(
            FbEntityBundleChildInfo_1.FbEntityBundleChildInfo.Create(e),
          );
        }
    }
    return this.Q9l;
  }
}
exports.FbEntityBundleComponent = FbEntityBundleComponent;
//# sourceMappingURL=FbEntityBundleComponent.js.map
