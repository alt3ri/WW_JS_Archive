"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTemplateMatrixRow = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSpawnTemplateEntityConfig_1 = require("./FbSpawnTemplateEntityConfig");
class FbTemplateMatrixRow {
  constructor(t) {
    (this.FbDataInternal = t), (this.tuh = !1), (this.iuh = void 0);
  }
  static Create(t) {
    if (t) return new FbTemplateMatrixRow(t);
  }
  get Items() {
    if (!this.tuh) {
      (this.tuh = !0), (this.iuh = new Array());
      var e = this.FbDataInternal.itemsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.items(
            t,
            new fb_component_1.SpawnTemplateEntityConfig(),
          );
          this.iuh.push(
            FbSpawnTemplateEntityConfig_1.FbSpawnTemplateEntityConfig.Create(i),
          );
        }
    }
    return this.iuh;
  }
}
exports.FbTemplateMatrixRow = FbTemplateMatrixRow;
//# sourceMappingURL=FbTemplateMatrixRow.js.map
