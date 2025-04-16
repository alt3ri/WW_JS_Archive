"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFireBulletAddBuff = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbFireBulletAddBuff {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.p0h = !1),
      (this.nXs = 0),
      (this.b5h = !1),
      (this.L5h = void 0);
  }
  static Create(t) {
    if (t) return new FbFireBulletAddBuff(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BulletId() {
    return (
      this.p0h ||
        ((this.p0h = !0), (this.nXs = Number(this.FbDataInternal.bulletId()))),
      this.nXs
    );
  }
  get BulletOffset() {
    return (
      this.b5h ||
        ((this.b5h = !0),
        (this.L5h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.bulletOffset(),
        ))),
      this.L5h
    );
  }
}
exports.FbFireBulletAddBuff = FbFireBulletAddBuff;
//# sourceMappingURL=FbFireBulletAddBuff.js.map
