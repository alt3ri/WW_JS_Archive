"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetBattleTagConfig = void 0);
class FbSetBattleTagConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Fvh = !1),
      (this.Nvh = 0),
      (this.Gfh = !1),
      (this.Ofh = 0);
  }
  static Create(t) {
    if (t) return new FbSetBattleTagConfig(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get TagConfigId() {
    return (
      this.Fvh ||
        ((this.Fvh = !0), (this.Nvh = this.FbDataInternal.tagConfigId())),
      this.Nvh
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
}
exports.FbSetBattleTagConfig = FbSetBattleTagConfig;
//# sourceMappingURL=FbSetBattleTagConfig.js.map
