"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetWeatherLockState = void 0);
class FbSetWeatherLockState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ibh = !1),
      (this.rbh = void 0),
      (this.g5h = !1),
      (this.f5h = void 0);
  }
  static Create(t) {
    if (t) return new FbSetWeatherLockState(t);
  }
  get LockState() {
    return (
      this.ibh ||
        ((this.ibh = !0), (this.rbh = this.FbDataInternal.lockState())),
      this.rbh
    );
  }
  get AreaIds() {
    if (!this.g5h) {
      (this.g5h = !0), (this.f5h = new Array());
      var e = this.FbDataInternal.areaIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.f5h.push(this.FbDataInternal.areaIds(t));
    }
    return this.f5h;
  }
}
exports.FbSetWeatherLockState = FbSetWeatherLockState;
//# sourceMappingURL=FbSetWeatherLockState.js.map
