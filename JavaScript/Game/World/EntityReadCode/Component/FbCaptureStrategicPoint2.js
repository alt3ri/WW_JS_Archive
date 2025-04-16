"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCaptureStrategicPoint2 = void 0);
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbCaptureStrategicPoint2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.nWh = !1),
      (this.Fke = 0),
      (this.sWh = !1),
      (this.aWh = 0),
      (this.hWh = !1),
      (this.lWh = 0),
      (this.gWh = !1),
      (this.fWh = void 0),
      (this.yWh = !1),
      (this.SWh = 0),
      (this.MWh = !1),
      (this.EWh = 0),
      (this.IWh = !1),
      (this.TWh = 0),
      (this.bWh = !1),
      (this.LWh = 0);
  }
  static Create(t) {
    if (t) return new FbCaptureStrategicPoint2(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaxValue() {
    return (
      this.nWh ||
        ((this.nWh = !0), (this.Fke = this.FbDataInternal.maxValue())),
      this.Fke
    );
  }
  get InitValue() {
    return (
      this.sWh ||
        ((this.sWh = !0), (this.aWh = this.FbDataInternal.initValue())),
      this.aWh
    );
  }
  get ProgressPerformanceAttribute() {
    return (
      this.hWh ||
        ((this.hWh = !0),
        (this.lWh = this.FbDataInternal.progressPerformanceAttribute())),
      this.lWh
    );
  }
  get EnemyEntitiyMatch() {
    return (
      this.gWh ||
        ((this.gWh = !0),
        (this.fWh = FbStaticEntitiyMatch_1.FbStaticEntitiyMatch.Create(
          this.FbDataInternal.enemyEntitiyMatch(),
        ))),
      this.fWh
    );
  }
  get PlayerInMonsterOutCaptureSpeed() {
    return (
      this.yWh ||
        ((this.yWh = !0),
        (this.SWh = this.FbDataInternal.playerInMonsterOutCaptureSpeed())),
      this.SWh
    );
  }
  get PlayerInMonsterInCaptureSpeed() {
    return (
      this.MWh ||
        ((this.MWh = !0),
        (this.EWh = this.FbDataInternal.playerInMonsterInCaptureSpeed())),
      this.EWh
    );
  }
  get PlayerOutMonsterOutCaptureSpeed() {
    return (
      this.IWh ||
        ((this.IWh = !0),
        (this.TWh = this.FbDataInternal.playerOutMonsterOutCaptureSpeed())),
      this.TWh
    );
  }
  get PlayerOutMonsterInCaptureSpeed() {
    return (
      this.bWh ||
        ((this.bWh = !0),
        (this.LWh = this.FbDataInternal.playerOutMonsterInCaptureSpeed())),
      this.LWh
    );
  }
}
exports.FbCaptureStrategicPoint2 = FbCaptureStrategicPoint2;
//# sourceMappingURL=FbCaptureStrategicPoint2.js.map
