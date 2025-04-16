"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFollowShooterComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityCategory_1 = require("./FbEntityCategory");
class FbFollowShooterComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.bK_ = !1),
      (this.LK_ = void 0);
  }
  static Create(t) {
    if (t) return new FbFollowShooterComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    return (
      this.bSh || ((this.bSh = !0), (this.TAe = this.FbDataInternal.config())),
      this.TAe
    );
  }
  get LockableCategories() {
    if (!this.bK_) {
      (this.bK_ = !0), (this.LK_ = new Array());
      var e = this.FbDataInternal.lockableCategoriesLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.lockableCategories(
            t,
            new fb_component_1.EntityCategory(),
          );
          this.LK_.push(FbEntityCategory_1.FbEntityCategory.Create(o));
        }
    }
    return this.LK_;
  }
}
exports.FbFollowShooterComponent = FbFollowShooterComponent;
//# sourceMappingURL=FbFollowShooterComponent.js.map
