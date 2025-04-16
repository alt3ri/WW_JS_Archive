"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveBuffFromPlayer = void 0);
class FbRemoveBuffFromPlayer {
  constructor(e) {
    (this.FbDataInternal = e), (this.Vph = !1), (this.jph = void 0);
  }
  static Create(e) {
    if (e) return new FbRemoveBuffFromPlayer(e);
  }
  get BuffIds() {
    if (!this.Vph) {
      (this.Vph = !0), (this.jph = new Array());
      var t = this.FbDataInternal.buffIdsLength();
      if (t)
        for (let e = 0; e < t; ++e)
          this.jph.push(Number(this.FbDataInternal.buffIds(e) ?? 0));
    }
    return this.jph;
  }
}
exports.FbRemoveBuffFromPlayer = FbRemoveBuffFromPlayer;
//# sourceMappingURL=FbRemoveBuffFromPlayer.js.map
