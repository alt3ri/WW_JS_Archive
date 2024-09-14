"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTrialUiConfig = void 0);
class RoleTrialUiConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Color1() {
    return this.color1();
  }
  get Color2() {
    return this.color2();
  }
  get Color3() {
    return this.color3();
  }
  get Color4() {
    return this.color4();
  }
  get Color5() {
    return this.color5();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsRoleTrialUiConfig(t, r) {
    return (r || new RoleTrialUiConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  color1(t) {
    var r = this.J7.__offset(this.z7, 6);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  color2(t) {
    var r = this.J7.__offset(this.z7, 8);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  color3(t) {
    var r = this.J7.__offset(this.z7, 10);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  color4(t) {
    var r = this.J7.__offset(this.z7, 12);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  color5(t) {
    var r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
}
exports.RoleTrialUiConfig = RoleTrialUiConfig;
//# sourceMappingURL=RoleTrialUiConfig.js.map
