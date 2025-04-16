"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAddBuffToPlayer = void 0);
class FbAddBuffToPlayer {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Vph = !1),
      (this.jph = void 0),
      (this.Qph = !1),
      (this.Kph = void 0);
  }
  static Create(t) {
    if (t) return new FbAddBuffToPlayer(t);
  }
  get BuffIds() {
    if (!this.Vph) {
      (this.Vph = !0), (this.jph = new Array());
      var s = this.FbDataInternal.buffIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
    }
    return this.jph;
  }
  get PersistOnDestroyBuffIds() {
    if (!this.Qph) {
      (this.Qph = !0), (this.Kph = new Array());
      var s = this.FbDataInternal.persistOnDestroyBuffIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Kph.push(
            Number(this.FbDataInternal.persistOnDestroyBuffIds(t) ?? 0),
          );
    }
    return this.Kph;
  }
}
exports.FbAddBuffToPlayer = FbAddBuffToPlayer;
//# sourceMappingURL=FbAddBuffToPlayer.js.map
