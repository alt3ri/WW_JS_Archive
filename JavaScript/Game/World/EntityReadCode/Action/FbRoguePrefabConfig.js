"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRoguePrefabConfig = void 0);
class FbRoguePrefabConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Afh = !1),
      (this.V_i = 0);
  }
  static Create(t) {
    if (t) return new FbRoguePrefabConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Index() {
    return (
      this.Afh || ((this.Afh = !0), (this.V_i = this.FbDataInternal.index())),
      this.V_i
    );
  }
}
exports.FbRoguePrefabConfig = FbRoguePrefabConfig;
//# sourceMappingURL=FbRoguePrefabConfig.js.map
