"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWeaponLevel = void 0);
const UnionWeaponLevelHelper_1 = require("./UnionWeaponLevelHelper");
class FbWeaponLevel {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(e) {
    if (e) return new FbWeaponLevel(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    var e, t;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (e = this.FbDataInternal.optionType()),
        (t =
          UnionWeaponLevelHelper_1.UnionWeaponLevelHelper.GetUnionWeaponLevelObject(
            e,
          ))) &&
        (this.Hye =
          UnionWeaponLevelHelper_1.UnionWeaponLevelHelper.ReadUnionWeaponLevel(
            e,
            this.FbDataInternal.option(t),
          )),
      this.Hye
    );
  }
}
exports.FbWeaponLevel = FbWeaponLevel;
//# sourceMappingURL=FbWeaponLevel.js.map
