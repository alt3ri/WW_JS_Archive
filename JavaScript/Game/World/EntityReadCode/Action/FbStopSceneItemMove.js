"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStopSceneItemMove = void 0);
class FbStopSceneItemMove {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.ZEh = !1),
      (this.eIh = void 0);
  }
  static Create(t) {
    if (t) return new FbStopSceneItemMove(t);
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var e = this.FbDataInternal.entityIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get StopType() {
    return (
      this.ZEh ||
        ((this.ZEh = !0), (this.eIh = this.FbDataInternal.stopType())),
      this.eIh
    );
  }
}
exports.FbStopSceneItemMove = FbStopSceneItemMove;
//# sourceMappingURL=FbStopSceneItemMove.js.map
