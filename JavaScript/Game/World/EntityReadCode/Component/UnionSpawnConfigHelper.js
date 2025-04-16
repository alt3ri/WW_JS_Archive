"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpawnConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbTemplateMatrix_1 = require("./FbTemplateMatrix");
class UnionSpawnConfigHelper {
  static GetUnionSpawnConfigObject(e) {
    if (e === fb_component_1.UnionSpawnConfig.TemplateMatrix)
      return new fb_component_1.TemplateMatrix();
  }
  static ReadUnionSpawnConfig(e, n) {
    return void 0 !== n && e === fb_component_1.UnionSpawnConfig.TemplateMatrix
      ? FbTemplateMatrix_1.FbTemplateMatrix.Create(n)
      : void 0;
  }
}
exports.UnionSpawnConfigHelper = UnionSpawnConfigHelper;
//# sourceMappingURL=UnionSpawnConfigHelper.js.map
