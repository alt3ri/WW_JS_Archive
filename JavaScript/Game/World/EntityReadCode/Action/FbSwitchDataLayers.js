"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSwitchDataLayers = void 0);
class FbSwitchDataLayers {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.YTh = !1),
      (this.zTh = void 0),
      (this.JTh = !1),
      (this.ZTh = void 0);
  }
  static Create(t) {
    if (t) return new FbSwitchDataLayers(t);
  }
  get LoadDataLayers() {
    if (!this.YTh) {
      (this.YTh = !0), (this.zTh = new Array());
      var s = this.FbDataInternal.loadDataLayersLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.zTh.push(this.FbDataInternal.loadDataLayers(t));
    }
    return this.zTh;
  }
  get UnloadDataLayers() {
    if (!this.JTh) {
      (this.JTh = !0), (this.ZTh = new Array());
      var s = this.FbDataInternal.unloadDataLayersLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.ZTh.push(this.FbDataInternal.unloadDataLayers(t));
    }
    return this.ZTh;
  }
}
exports.FbSwitchDataLayers = FbSwitchDataLayers;
//# sourceMappingURL=FbSwitchDataLayers.js.map
