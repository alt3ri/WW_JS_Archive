"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCollectAnimalPartsConfig = void 0);
class FbCollectAnimalPartsConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.A8h = !1),
      (this.x8h = void 0),
      (this.R8h = !1),
      (this.w8h = void 0),
      (this.P8h = !1),
      (this.U8h = 0);
  }
  static Create(t) {
    if (t) return new FbCollectAnimalPartsConfig(t);
  }
  get Slot() {
    return (
      this.A8h || ((this.A8h = !0), (this.x8h = this.FbDataInternal.slot())),
      this.x8h
    );
  }
  get Skeleton() {
    return (
      this.R8h ||
        ((this.R8h = !0), (this.w8h = this.FbDataInternal.skeleton())),
      this.w8h
    );
  }
  get CollectEntity() {
    return (
      this.P8h ||
        ((this.P8h = !0), (this.U8h = this.FbDataInternal.collectEntity())),
      this.U8h
    );
  }
}
exports.FbCollectAnimalPartsConfig = FbCollectAnimalPartsConfig;
//# sourceMappingURL=FbCollectAnimalPartsConfig.js.map
