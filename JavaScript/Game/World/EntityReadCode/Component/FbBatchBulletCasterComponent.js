"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBatchBulletCasterComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPosRot_1 = require("../Action/FbPosRot"),
  FbBatchBulletItem_1 = require("./FbBatchBulletItem");
class FbBatchBulletCasterComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.hXh = !1),
      (this.lXh = void 0),
      (this.QY_ = !1),
      (this.KY_ = void 0),
      (this._Xh = !1),
      (this.cXh = void 0),
      (this.uXh = !1),
      (this.dXh = void 0);
  }
  static Create(t) {
    if (t) return new FbBatchBulletCasterComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get WarningEffect() {
    return (
      this.hXh ||
        ((this.hXh = !0), (this.lXh = this.FbDataInternal.warningEffect())),
      this.lXh
    );
  }
  get MovementType() {
    return (
      this.QY_ ||
        ((this.QY_ = !0), (this.KY_ = this.FbDataInternal.movementType())),
      this.KY_
    );
  }
  get BulletList() {
    if (!this._Xh) {
      (this._Xh = !0), (this.cXh = new Array());
      var i = this.FbDataInternal.bulletListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.bulletList(t, new fb_action_1.PosRot());
          this.cXh.push(FbPosRot_1.FbPosRot.Create(e));
        }
    }
    return this.cXh;
  }
  get BatchList() {
    if (!this.uXh) {
      (this.uXh = !0), (this.dXh = new Array());
      var i = this.FbDataInternal.batchListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.batchList(
            t,
            new fb_component_1.BatchBulletItem(),
          );
          this.dXh.push(FbBatchBulletItem_1.FbBatchBulletItem.Create(e));
        }
    }
    return this.dXh;
  }
}
exports.FbBatchBulletCasterComponent = FbBatchBulletCasterComponent;
//# sourceMappingURL=FbBatchBulletCasterComponent.js.map
