"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemoveBuffToTriggeredEntity = void 0);
class FbRemoveBuffToTriggeredEntity {
  constructor(t) {
    (this.FbDataInternal = t), (this.Vph = !1), (this.jph = void 0);
  }
  static Create(t) {
    if (t) return new FbRemoveBuffToTriggeredEntity(t);
  }
  get BuffIds() {
    if (!this.Vph) {
      (this.Vph = !0), (this.jph = new Array());
      var e = this.FbDataInternal.buffIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.jph.push(Number(this.FbDataInternal.buffIds(t) ?? 0));
    }
    return this.jph;
  }
}
exports.FbRemoveBuffToTriggeredEntity = FbRemoveBuffToTriggeredEntity;
//# sourceMappingURL=FbRemoveBuffToTriggeredEntity.js.map
