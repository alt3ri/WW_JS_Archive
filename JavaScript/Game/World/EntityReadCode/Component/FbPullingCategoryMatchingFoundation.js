"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPullingCategoryMatchingFoundation = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCategoryMatchingConfigBase_1 = require("./FbCategoryMatchingConfigBase");
class FbPullingCategoryMatchingFoundation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sFh = !1),
      (this.aFh = 0),
      (this.hFh = !1),
      (this.lFh = void 0);
  }
  static Create(t) {
    if (t) return new FbPullingCategoryMatchingFoundation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get InitMatchEntity() {
    return (
      this.sFh ||
        ((this.sFh = !0), (this.aFh = this.FbDataInternal.initMatchEntity())),
      this.aFh
    );
  }
  get MatchingConfigs() {
    if (!this.hFh) {
      (this.hFh = !0), (this.lFh = new Array());
      var i = this.FbDataInternal.matchingConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchingConfigs(
            t,
            new fb_component_1.CategoryMatchingConfigBase(),
          );
          this.lFh.push(
            FbCategoryMatchingConfigBase_1.FbCategoryMatchingConfigBase.Create(
              e,
            ),
          );
        }
    }
    return this.lFh;
  }
}
exports.FbPullingCategoryMatchingFoundation =
  FbPullingCategoryMatchingFoundation;
//# sourceMappingURL=FbPullingCategoryMatchingFoundation.js.map
