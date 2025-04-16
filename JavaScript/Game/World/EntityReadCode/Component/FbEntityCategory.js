"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityCategory = void 0);
class FbEntityCategory {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.MPh = !1),
      (this.EPh = void 0),
      (this.IPh = !1),
      (this.TPh = void 0),
      (this.bPh = !1),
      (this.LPh = void 0),
      (this.APh = !1),
      (this.xPh = void 0),
      (this.RPh = !1),
      (this.wPh = void 0),
      (this.PPh = !1),
      (this.UPh = void 0),
      (this.DPh = !1),
      (this.BPh = 0),
      (this.qPh = !1),
      (this.kPh = void 0),
      (this.GPh = !1),
      (this.OPh = void 0),
      (this.FPh = !1),
      (this.NPh = void 0),
      (this.VPh = !1),
      (this.jPh = void 0),
      (this.HPh = !1),
      (this.WPh = void 0),
      (this.QPh = !1),
      (this.KPh = void 0),
      (this.$Ph = !1),
      (this.XPh = void 0),
      (this.YPh = !1),
      (this.zPh = void 0),
      (this.JPh = !1),
      (this.ZPh = void 0),
      (this.AXh = !1),
      (this.xXh = void 0),
      (this.cr_ = !1),
      (this.ur_ = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityCategory(t);
  }
  get MainType() {
    return (
      this.MPh ||
        ((this.MPh = !0), (this.EPh = this.FbDataInternal.mainType())),
      this.EPh
    );
  }
  get EntityPlotBindingType() {
    return (
      this.IPh ||
        ((this.IPh = !0),
        (this.TPh = this.FbDataInternal.entityPlotBindingType())),
      this.TPh
    );
  }
  get ControlMatchType() {
    return (
      this.bPh ||
        ((this.bPh = !0), (this.LPh = this.FbDataInternal.controlMatchType())),
      this.LPh
    );
  }
  get MonsterMatchType() {
    return (
      this.APh ||
        ((this.APh = !0), (this.xPh = this.FbDataInternal.monsterMatchType())),
      this.xPh
    );
  }
  get ItemFoundation() {
    return (
      this.RPh ||
        ((this.RPh = !0), (this.wPh = this.FbDataInternal.itemFoundation())),
      this.wPh
    );
  }
  get HideInFlowType() {
    return (
      this.PPh ||
        ((this.PPh = !0), (this.UPh = this.FbDataInternal.hideInFlowType())),
      this.UPh
    );
  }
  get ExploratoryDegree() {
    return (
      this.DPh ||
        ((this.DPh = !0), (this.BPh = this.FbDataInternal.exploratoryDegree())),
      this.BPh
    );
  }
  get TraceMatchType() {
    return (
      this.qPh ||
        ((this.qPh = !0), (this.kPh = this.FbDataInternal.traceMatchType())),
      this.kPh
    );
  }
  get DestructibleType() {
    return (
      this.GPh ||
        ((this.GPh = !0), (this.OPh = this.FbDataInternal.destructibleType())),
      this.OPh
    );
  }
  get CollectType() {
    return (
      this.FPh ||
        ((this.FPh = !0), (this.NPh = this.FbDataInternal.collectType())),
      this.NPh
    );
  }
  get NpcType() {
    return (
      this.VPh || ((this.VPh = !0), (this.jPh = this.FbDataInternal.npcType())),
      this.jPh
    );
  }
  get AnimalType() {
    return (
      this.HPh ||
        ((this.HPh = !0), (this.WPh = this.FbDataInternal.animalType())),
      this.WPh
    );
  }
  get BulletPenetrationType() {
    return (
      this.QPh ||
        ((this.QPh = !0),
        (this.KPh = this.FbDataInternal.bulletPenetrationType())),
      this.KPh
    );
  }
  get MechanismType() {
    return (
      this.$Ph ||
        ((this.$Ph = !0), (this.XPh = this.FbDataInternal.mechanismType())),
      this.XPh
    );
  }
  get InhaledItemType() {
    return (
      this.YPh ||
        ((this.YPh = !0), (this.zPh = this.FbDataInternal.inhaledItemType())),
      this.zPh
    );
  }
  get PullStatueMatchType() {
    return (
      this.JPh ||
        ((this.JPh = !0),
        (this.ZPh = this.FbDataInternal.pullStatueMatchType())),
      this.ZPh
    );
  }
  get VehicleType() {
    return (
      this.AXh ||
        ((this.AXh = !0), (this.xXh = this.FbDataInternal.vehicleType())),
      this.xXh
    );
  }
  get FishingMechanismType() {
    return (
      this.cr_ ||
        ((this.cr_ = !0),
        (this.ur_ = this.FbDataInternal.fishingMechanismType())),
      this.ur_
    );
  }
}
exports.FbEntityCategory = FbEntityCategory;
//# sourceMappingURL=FbEntityCategory.js.map
