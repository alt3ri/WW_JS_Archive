"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCaptureStrategicPoint = void 0);
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbCaptureStrategicPoint {
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
      (this._Wh = !1),
      (this.cWh = 0),
      (this.uWh = !1),
      (this.dWh = 0),
      (this.mWh = !1),
      (this.CWh = 0),
      (this.gWh = !1),
      (this.fWh = void 0),
      (this.pWh = !1),
      (this.vWh = void 0);
  }
  static Create(t) {
    if (t) return new FbCaptureStrategicPoint(t);
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
  get IncreaseSpeed() {
    return (
      this._Wh ||
        ((this._Wh = !0), (this.cWh = this.FbDataInternal.increaseSpeed())),
      this.cWh
    );
  }
  get DecreaseSpeed() {
    return (
      this.uWh ||
        ((this.uWh = !0), (this.dWh = this.FbDataInternal.decreaseSpeed())),
      this.dWh
    );
  }
  get UnoccupiedDecreaseSpeed() {
    return (
      this.mWh ||
        ((this.mWh = !0),
        (this.CWh = this.FbDataInternal.unoccupiedDecreaseSpeed())),
      this.CWh
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
  get CaptureType() {
    return (
      this.pWh ||
        ((this.pWh = !0), (this.vWh = this.FbDataInternal.captureType())),
      this.vWh
    );
  }
}
exports.FbCaptureStrategicPoint = FbCaptureStrategicPoint;
//# sourceMappingURL=FbCaptureStrategicPoint.js.map
