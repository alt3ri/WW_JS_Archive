"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpringComponent = void 0);
const FbSettingSpringDir_1 = require("./FbSettingSpringDir");
class FbSpringComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Tqh = !1),
      (this.bqh = !1),
      (this.Lqh = !1),
      (this.Aqh = !1),
      (this.xqh = !1),
      (this.Rqh = void 0),
      (this.wqh = !1),
      (this.Pqh = 0);
  }
  static Create(t) {
    if (t) return new FbSpringComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get IsNormalSpring() {
    return (
      this.Tqh ||
        ((this.Tqh = !0), (this.bqh = this.FbDataInternal.isNormalSpring())),
      this.bqh
    );
  }
  get IsHitNormalSpring() {
    return (
      this.Lqh ||
        ((this.Lqh = !0), (this.Aqh = this.FbDataInternal.isHitNormalSpring())),
      this.Aqh
    );
  }
  get SettingDir() {
    return (
      this.xqh ||
        ((this.xqh = !0),
        (this.Rqh = FbSettingSpringDir_1.FbSettingSpringDir.Create(
          this.FbDataInternal.settingDir(),
        ))),
      this.Rqh
    );
  }
  get SpringPow() {
    return (
      this.wqh ||
        ((this.wqh = !0), (this.Pqh = this.FbDataInternal.springPow())),
      this.Pqh
    );
  }
}
exports.FbSpringComponent = FbSpringComponent;
//# sourceMappingURL=FbSpringComponent.js.map
