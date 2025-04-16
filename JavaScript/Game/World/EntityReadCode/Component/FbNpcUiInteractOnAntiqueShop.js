"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNpcUiInteractOnAntiqueShop = void 0);
const FbPlayFlow_1 = require("../Action/FbPlayFlow"),
  UnionMontageConfigHelper_1 = require("../Action/UnionMontageConfigHelper");
class FbNpcUiInteractOnAntiqueShop {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.K4h = !1),
      (this.$4h = void 0),
      (this.X4h = !1),
      (this.Y4h = void 0),
      (this.z4h = !1),
      (this.J4h = void 0),
      (this.Z4h = !1),
      (this.e6h = void 0),
      (this.t6h = !1),
      (this.i6h = void 0),
      (this.r6h = !1),
      (this.o6h = void 0),
      (this.n6h = !1),
      (this.s6h = void 0),
      (this.a6h = !1),
      (this.h6h = void 0),
      (this.l6h = !1),
      (this._6h = void 0);
  }
  static Create(t) {
    if (t) return new FbNpcUiInteractOnAntiqueShop(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EnterMontage() {
    return (
      this.K4h ||
        ((this.K4h = !0), (this.$4h = this.FbDataInternal.enterMontage())),
      this.$4h
    );
  }
  get StandByMontage() {
    return (
      this.X4h ||
        ((this.X4h = !0), (this.Y4h = this.FbDataInternal.standByMontage())),
      this.Y4h
    );
  }
  get ShopSuccessMontage() {
    return (
      this.z4h ||
        ((this.z4h = !0),
        (this.J4h = this.FbDataInternal.shopSuccessMontage())),
      this.J4h
    );
  }
  get EnterFlow() {
    return (
      this.Z4h ||
        ((this.Z4h = !0),
        (this.e6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.enterFlow(),
        ))),
      this.e6h
    );
  }
  get ShopFailedFlow() {
    return (
      this.t6h ||
        ((this.t6h = !0),
        (this.i6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.shopFailedFlow(),
        ))),
      this.i6h
    );
  }
  get ShopSuccessFlow() {
    return (
      this.r6h ||
        ((this.r6h = !0),
        (this.o6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.shopSuccessFlow(),
        ))),
      this.o6h
    );
  }
  get UpgradeSequence() {
    return (
      this.n6h ||
        ((this.n6h = !0), (this.s6h = this.FbDataInternal.upgradeSequence())),
      this.s6h
    );
  }
  get ExitMontage() {
    var t, i;
    return (
      !this.a6h &&
        ((this.a6h = !0),
        (t = this.FbDataInternal.exitMontageType()),
        (i =
          UnionMontageConfigHelper_1.UnionMontageConfigHelper.GetUnionMontageConfigObject(
            t,
          ))) &&
        (this.h6h =
          UnionMontageConfigHelper_1.UnionMontageConfigHelper.ReadUnionMontageConfig(
            t,
            this.FbDataInternal.exitMontage(i),
          )),
      this.h6h
    );
  }
  get ExitFlow() {
    return (
      this.l6h ||
        ((this.l6h = !0),
        (this._6h = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.exitFlow(),
        ))),
      this._6h
    );
  }
}
exports.FbNpcUiInteractOnAntiqueShop = FbNpcUiInteractOnAntiqueShop;
//# sourceMappingURL=FbNpcUiInteractOnAntiqueShop.js.map
