"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPasserbyNpcFixIntervalSpawn = void 0);
class FbPasserbyNpcFixIntervalSpawn {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DQh = !1),
      (this.BQh = 0),
      (this.qQh = !1),
      (this.kQh = 0),
      (this.W6h = !1),
      (this.e6o = 0);
  }
  static Create(t) {
    if (t) return new FbPasserbyNpcFixIntervalSpawn(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaxSpawnCount() {
    return (
      this.DQh ||
        ((this.DQh = !0), (this.BQh = this.FbDataInternal.maxSpawnCount())),
      this.BQh
    );
  }
  get MinDistance() {
    return (
      this.qQh ||
        ((this.qQh = !0), (this.kQh = this.FbDataInternal.minDistance())),
      this.kQh
    );
  }
  get Interval() {
    return (
      this.W6h ||
        ((this.W6h = !0), (this.e6o = this.FbDataInternal.interval())),
      this.e6o
    );
  }
}
exports.FbPasserbyNpcFixIntervalSpawn = FbPasserbyNpcFixIntervalSpawn;
//# sourceMappingURL=FbPasserbyNpcFixIntervalSpawn.js.map
