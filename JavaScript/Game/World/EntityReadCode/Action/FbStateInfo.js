"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStateInfo = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo"),
  FbPosA_1 = require("./FbPosA");
class FbStateInfo {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.Gxh = !1),
      (this.Oxh = !1),
      (this.PH_ = !1),
      (this.xH_ = !1),
      (this.DH_ = !1),
      (this.BH_ = !1),
      (this.Fxh = !1),
      (this.Nxh = !1),
      (this.Vxh = !1),
      (this.jxh = !1),
      (this.lu_ = !1),
      (this._u_ = !1),
      (this.Y_1 = !1),
      (this.z_1 = !1),
      (this.Hxh = !1),
      (this.Wxh = !1),
      (this.Qxh = !1),
      (this.Kxh = void 0),
      (this.$xh = !1),
      (this.Xxh = void 0);
  }
  static Create(t) {
    if (t) return new FbStateInfo(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
  get KeepBgm() {
    return (
      this.Gxh || ((this.Gxh = !0), (this.Oxh = this.FbDataInternal.keepBgm())),
      this.Oxh
    );
  }
  get OnlyPlayOnce() {
    return (
      this.PH_ ||
        ((this.PH_ = !0), (this.xH_ = this.FbDataInternal.onlyPlayOnce())),
      this.xH_
    );
  }
  get KeepInVehicle() {
    return (
      this.DH_ ||
        ((this.DH_ = !0), (this.BH_ = this.FbDataInternal.keepInVehicle())),
      this.BH_
    );
  }
  get AllowMultiReference() {
    return (
      this.Fxh ||
        ((this.Fxh = !0),
        (this.Nxh = this.FbDataInternal.allowMultiReference())),
      this.Nxh
    );
  }
  get IgnoreInPlotHandBook() {
    return (
      this.Vxh ||
        ((this.Vxh = !0),
        (this.jxh = this.FbDataInternal.ignoreInPlotHandBook())),
      this.jxh
    );
  }
  get DontInterruptMatch() {
    return (
      this.lu_ ||
        ((this.lu_ = !0),
        (this._u_ = this.FbDataInternal.dontInterruptMatch())),
      this._u_
    );
  }
  get IsPreloadFlow() {
    return (
      this.Y_1 ||
        ((this.Y_1 = !0), (this.z_1 = this.FbDataInternal.isPreloadFlow())),
      this.z_1
    );
  }
  get _showImport() {
    return (
      this.Hxh ||
        ((this.Hxh = !0), (this.Wxh = this.FbDataInternal.showImport())),
      this.Wxh
    );
  }
  get PlotPos() {
    return (
      this.Qxh ||
        ((this.Qxh = !0),
        (this.Kxh = FbPosA_1.FbPosA.Create(this.FbDataInternal.plotPos()))),
      this.Kxh
    );
  }
  get _SelectedIndexes() {
    if (!this.$xh) {
      (this.$xh = !0), (this.Xxh = new Array());
      var i = this.FbDataInternal.selectedIndexesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Xxh.push(this.FbDataInternal.selectedIndexes(t));
    }
    return this.Xxh;
  }
}
exports.FbStateInfo = FbStateInfo;
//# sourceMappingURL=FbStateInfo.js.map
