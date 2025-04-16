"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleControl2 = void 0);
const FbBulletCfg_1 = require("./FbBulletCfg"),
  FbDestroyCfg_1 = require("./FbDestroyCfg"),
  FbHoldCfg_1 = require("./FbHoldCfg"),
  FbSearchTargetCfg_1 = require("./FbSearchTargetCfg"),
  FbTeleControlBaseCfg_1 = require("./FbTeleControlBaseCfg"),
  FbThrowCfg_1 = require("./FbThrowCfg");
class FbTeleControl2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.QNh = !1),
      (this.KNh = void 0),
      (this.$Nh = !1),
      (this.XNh = void 0),
      (this.YNh = !1),
      (this.zNh = void 0),
      (this.JNh = !1),
      (this.ZNh = void 0),
      (this.e2h = !1),
      (this.t2h = void 0),
      (this.i2h = !1),
      (this.r2h = void 0),
      (this.fGh = !1),
      (this.pGh = 0);
  }
  static Create(t) {
    if (t) return new FbTeleControl2(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get BaseCfg() {
    return (
      this.QNh ||
        ((this.QNh = !0),
        (this.KNh = FbTeleControlBaseCfg_1.FbTeleControlBaseCfg.Create(
          this.FbDataInternal.baseCfg(),
        ))),
      this.KNh
    );
  }
  get SearchTargetCfg() {
    return (
      this.$Nh ||
        ((this.$Nh = !0),
        (this.XNh = FbSearchTargetCfg_1.FbSearchTargetCfg.Create(
          this.FbDataInternal.searchTargetCfg(),
        ))),
      this.XNh
    );
  }
  get BulletCfg() {
    return (
      this.YNh ||
        ((this.YNh = !0),
        (this.zNh = FbBulletCfg_1.FbBulletCfg.Create(
          this.FbDataInternal.bulletCfg(),
        ))),
      this.zNh
    );
  }
  get DestroyCfg() {
    return (
      this.JNh ||
        ((this.JNh = !0),
        (this.ZNh = FbDestroyCfg_1.FbDestroyCfg.Create(
          this.FbDataInternal.destroyCfg(),
        ))),
      this.ZNh
    );
  }
  get HoldCfg() {
    return (
      this.e2h ||
        ((this.e2h = !0),
        (this.t2h = FbHoldCfg_1.FbHoldCfg.Create(
          this.FbDataInternal.holdCfg(),
        ))),
      this.t2h
    );
  }
  get ThrowCfg() {
    return (
      this.i2h ||
        ((this.i2h = !0),
        (this.r2h = FbThrowCfg_1.FbThrowCfg.Create(
          this.FbDataInternal.throwCfg(),
        ))),
      this.r2h
    );
  }
  get PlayerStateRestritionId() {
    return (
      this.fGh ||
        ((this.fGh = !0),
        (this.pGh = this.FbDataInternal.playerStateRestritionId())),
      this.pGh
    );
  }
}
exports.FbTeleControl2 = FbTeleControl2;
//# sourceMappingURL=FbTeleControl2.js.map
