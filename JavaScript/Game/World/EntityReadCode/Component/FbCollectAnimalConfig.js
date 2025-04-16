"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCollectAnimalConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCollectAnimalPartsConfig_1 = require("./FbCollectAnimalPartsConfig");
class FbCollectAnimalConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.b8h = !1),
      (this.L8h = void 0);
  }
  static Create(t) {
    if (t) return new FbCollectAnimalConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PartsMap() {
    if (!this.b8h) {
      (this.b8h = !0), (this.L8h = new Array());
      var i = this.FbDataInternal.partsMapLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.partsMap(
            t,
            new fb_component_1.CollectAnimalPartsConfig(),
          );
          this.L8h.push(
            FbCollectAnimalPartsConfig_1.FbCollectAnimalPartsConfig.Create(e),
          );
        }
    }
    return this.L8h;
  }
}
exports.FbCollectAnimalConfig = FbCollectAnimalConfig;
//# sourceMappingURL=FbCollectAnimalConfig.js.map
