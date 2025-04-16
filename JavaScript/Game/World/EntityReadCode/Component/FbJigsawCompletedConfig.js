"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbJigsawCompletedConfig = void 0);
class FbJigsawCompletedConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.PNh = !1),
      (this.UNh = !1),
      (this.DNh = !1),
      (this.BNh = !1);
  }
  static Create(t) {
    if (t) return new FbJigsawCompletedConfig(t);
  }
  get IsSilentPiece() {
    return (
      this.PNh ||
        ((this.PNh = !0), (this.UNh = this.FbDataInternal.isSilentPiece())),
      this.UNh
    );
  }
  get IsSilentFoundation() {
    return (
      this.DNh ||
        ((this.DNh = !0),
        (this.BNh = this.FbDataInternal.isSilentFoundation())),
      this.BNh
    );
  }
}
exports.FbJigsawCompletedConfig = FbJigsawCompletedConfig;
//# sourceMappingURL=FbJigsawCompletedConfig.js.map
