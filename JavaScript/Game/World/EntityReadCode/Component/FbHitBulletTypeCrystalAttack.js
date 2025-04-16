"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHitBulletTypeCrystalAttack = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbHitBulletTypeCrystalAttack {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.rOh = !1),
      (this.oOh = void 0);
  }
  static Create(t) {
    if (t) return new FbHitBulletTypeCrystalAttack(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TrackOffset() {
    return (
      this.rOh ||
        ((this.rOh = !0),
        (this.oOh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.trackOffset(),
        ))),
      this.oOh
    );
  }
}
exports.FbHitBulletTypeCrystalAttack = FbHitBulletTypeCrystalAttack;
//# sourceMappingURL=FbHitBulletTypeCrystalAttack.js.map
