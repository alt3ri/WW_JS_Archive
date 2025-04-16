"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBaseInfoComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCustomAoizRadius_1 = require("./FbCustomAoizRadius"),
  FbEntityCategory_1 = require("./FbEntityCategory"),
  FbEntityGravityConfig_1 = require("./FbEntityGravityConfig"),
  FbEntityScanFunction_1 = require("./FbEntityScanFunction"),
  FbHeadInfoChangeData_1 = require("./FbHeadInfoChangeData"),
  FbHeadStateViewConfig_1 = require("./FbHeadStateViewConfig"),
  FbFixProcessor_1 = require("../FixProcessor/FbFixProcessor");
class FbBaseInfoComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bwh = !1),
      (this.Lwh = void 0),
      (this.Awh = !1),
      (this.xwh = !1),
      (this.Rwh = !1),
      (this.wwh = void 0),
      (this.Pwh = !1),
      (this.Uwh = void 0),
      (this.Dwh = !1),
      (this.Bwh = 0),
      (this.qwh = !1),
      (this.kwh = void 0),
      (this.Gwh = !1),
      (this.Owh = void 0),
      (this.Fwh = !1),
      (this.Nwh = void 0),
      (this.cy1 = !1),
      (this.dy1 = !1),
      (this.Vwh = !1),
      (this.jwh = void 0),
      (this.Hwh = !1),
      (this.Wwh = 0),
      (this.Qwh = !1),
      (this.Kwh = 0),
      (this.$wh = !1),
      (this.Xwh = void 0),
      (this.Ywh = !1),
      (this.zwh = void 0),
      (this.Jwh = !1),
      (this.Zwh = 0),
      (this.ePh = !1),
      (this.tPh = 0),
      (this.iPh = !1),
      (this.rPh = void 0),
      (this.oPh = !1),
      (this.nPh = !1),
      (this.sPh = !1),
      (this.aPh = void 0),
      (this.hPh = !1),
      (this.lPh = void 0),
      (this._Ph = !1),
      (this.cPh = void 0),
      (this.uPh = !1),
      (this.dPh = !1),
      (this.Kq_ = !1),
      (this.Xq_ = void 0),
      (this.mPh = !1),
      (this.CPh = void 0),
      (this.gPh = !1),
      (this.fPh = void 0),
      (this.pPh = !1),
      (this.vPh = void 0),
      (this.yPh = !1),
      (this.SPh = void 0),
      (this.NZ_ = !1),
      (this.VZ_ = void 0);
  }
  static Create(t) {
    if (t) return new FbBaseInfoComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TidName() {
    return (
      this.bwh || ((this.bwh = !0), (this.Lwh = this.FbDataInternal.tidName())),
      this.Lwh
    );
  }
  get IsShowNameOnHead() {
    return (
      this.Awh ||
        ((this.Awh = !0), (this.xwh = this.FbDataInternal.isShowNameOnHead())),
      this.xwh
    );
  }
  get Category() {
    return (
      this.Rwh ||
        ((this.Rwh = !0),
        (this.wwh = FbEntityCategory_1.FbEntityCategory.Create(
          this.FbDataInternal.category(),
        ))),
      this.wwh
    );
  }
  get ScanFunction() {
    return (
      this.Pwh ||
        ((this.Pwh = !0),
        (this.Uwh = FbEntityScanFunction_1.FbEntityScanFunction.Create(
          this.FbDataInternal.scanFunction(),
        ))),
      this.Uwh
    );
  }
  get HeadInfo() {
    return (
      this.Dwh ||
        ((this.Dwh = !0), (this.Bwh = this.FbDataInternal.headInfo())),
      this.Bwh
    );
  }
  get Camp() {
    return (
      this.qwh || ((this.qwh = !0), (this.kwh = this.FbDataInternal.camp())),
      this.kwh
    );
  }
  get AoiLayer() {
    return (
      this.Gwh ||
        ((this.Gwh = !0), (this.Owh = this.FbDataInternal.aoiLayer())),
      this.Owh
    );
  }
  get AoiZRadius() {
    return (
      this.Fwh ||
        ((this.Fwh = !0), (this.Nwh = this.FbDataInternal.aoiZRadius())),
      this.Nwh
    );
  }
  get IsAoiFitterPlatform() {
    return (
      this.cy1 ||
        ((this.cy1 = !0),
        (this.dy1 = this.FbDataInternal.isAoiFitterPlatform())),
      this.dy1
    );
  }
  get CustomAoiZRadius() {
    return (
      this.Vwh ||
        ((this.Vwh = !0),
        (this.jwh = FbCustomAoizRadius_1.FbCustomAoizRadius.Create(
          this.FbDataInternal.customAoiZRadius(),
        ))),
      this.jwh
    );
  }
  get MapIcon() {
    return (
      this.Hwh || ((this.Hwh = !0), (this.Wwh = this.FbDataInternal.mapIcon())),
      this.Wwh
    );
  }
  get PackId() {
    return (
      this.Qwh || ((this.Qwh = !0), (this.Kwh = this.FbDataInternal.packId())),
      this.Kwh
    );
  }
  get Occupation() {
    return (
      this.$wh ||
        ((this.$wh = !0), (this.Xwh = this.FbDataInternal.occupation())),
      this.Xwh
    );
  }
  get HeadStateViewConfig() {
    return (
      this.Ywh ||
        ((this.Ywh = !0),
        (this.zwh = FbHeadStateViewConfig_1.FbHeadStateViewConfig.Create(
          this.FbDataInternal.headStateViewConfig(),
        ))),
      this.zwh
    );
  }
  get EntityPropertyId() {
    return (
      this.Jwh ||
        ((this.Jwh = !0), (this.Zwh = this.FbDataInternal.entityPropertyId())),
      this.Zwh
    );
  }
  get FocusPriority() {
    return (
      this.ePh ||
        ((this.ePh = !0), (this.tPh = this.FbDataInternal.focusPriority())),
      this.tPh
    );
  }
  get OnlineInteractType() {
    return (
      this.iPh ||
        ((this.iPh = !0),
        (this.rPh = this.FbDataInternal.onlineInteractType())),
      this.rPh
    );
  }
  get NotAllowHidedByTargetRange() {
    return (
      this.oPh ||
        ((this.oPh = !0),
        (this.nPh = this.FbDataInternal.notAllowHidedByTargetRange())),
      this.nPh
    );
  }
  get LowerNpcDensity() {
    return (
      this.sPh ||
        ((this.sPh = !0), (this.aPh = this.FbDataInternal.lowerNpcDensity())),
      this.aPh
    );
  }
  get DataLayers() {
    if (!this.hPh) {
      (this.hPh = !0), (this.lPh = new Array());
      var i = this.FbDataInternal.dataLayersLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.lPh.push(this.FbDataInternal.dataLayers(t));
    }
    return this.lPh;
  }
  get ChildEntityIds() {
    if (!this._Ph) {
      (this._Ph = !0), (this.cPh = new Array());
      var i = this.FbDataInternal.childEntityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.cPh.push(this.FbDataInternal.childEntityIds(t));
    }
    return this.cPh;
  }
  get IsOnlineStandalone() {
    return (
      this.uPh ||
        ((this.uPh = !0),
        (this.dPh = this.FbDataInternal.isOnlineStandalone())),
      this.dPh
    );
  }
  get SpecifiedOnlineStandaloneParentUids() {
    if (!this.Kq_) {
      (this.Kq_ = !0), (this.Xq_ = new Array());
      var i = this.FbDataInternal.specifiedOnlineStandaloneParentUidsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Xq_.push(
            this.FbDataInternal.specifiedOnlineStandaloneParentUids(t),
          );
    }
    return this.Xq_;
  }
  get FixProcessor() {
    return (
      this.mPh ||
        ((this.mPh = !0),
        (this.CPh = FbFixProcessor_1.FbFixProcessor.Create(
          this.FbDataInternal.fixProcessor(),
        ))),
      this.CPh
    );
  }
  get EntityUpdateStrategy() {
    return (
      this.gPh ||
        ((this.gPh = !0),
        (this.fPh = this.FbDataInternal.entityUpdateStrategy())),
      this.fPh
    );
  }
  get TimeScaleModifyStrategy() {
    return (
      this.pPh ||
        ((this.pPh = !0),
        (this.vPh = this.FbDataInternal.timeScaleModifyStrategy())),
      this.vPh
    );
  }
  get GravityConfig() {
    return (
      this.yPh ||
        ((this.yPh = !0),
        (this.SPh = FbEntityGravityConfig_1.FbEntityGravityConfig.Create(
          this.FbDataInternal.gravityConfig(),
        ))),
      this.SPh
    );
  }
  get HeadInfoChangeConfig() {
    if (!this.NZ_) {
      (this.NZ_ = !0), (this.VZ_ = new Array());
      var i = this.FbDataInternal.headInfoChangeConfigLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.headInfoChangeConfig(
            t,
            new fb_component_1.HeadInfoChangeData(),
          );
          this.VZ_.push(FbHeadInfoChangeData_1.FbHeadInfoChangeData.Create(s));
        }
    }
    return this.VZ_;
  }
}
exports.FbBaseInfoComponent = FbBaseInfoComponent;
//# sourceMappingURL=FbBaseInfoComponent.js.map
