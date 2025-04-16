"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFireBullet = void 0);
const UnionFireBulletHelper_1 = require("./UnionFireBulletHelper");
class FbFireBullet {
  constructor(e) {
    (this.FbDataInternal = e), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(e) {
    if (e) return new FbFireBullet(e);
  }
  get Type() {
    var e, t;
    return (
      !this.u_h &&
        ((this.u_h = !0),
        (e = this.FbDataInternal.typeType()),
        (t =
          UnionFireBulletHelper_1.UnionFireBulletHelper.GetUnionFireBulletObject(
            e,
          ))) &&
        (this.f8o =
          UnionFireBulletHelper_1.UnionFireBulletHelper.ReadUnionFireBullet(
            e,
            this.FbDataInternal.type(t),
          )),
      this.f8o
    );
  }
}
exports.FbFireBullet = FbFireBullet;
//# sourceMappingURL=FbFireBullet.js.map
