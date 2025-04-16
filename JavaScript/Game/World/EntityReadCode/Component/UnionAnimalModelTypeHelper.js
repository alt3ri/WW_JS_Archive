"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAnimalModelTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbMeshAnimalModel_1 = require("./FbMeshAnimalModel");
class UnionAnimalModelTypeHelper {
  static GetUnionAnimalModelTypeObject(e) {
    if (e === fb_component_1.UnionAnimalModelType.MeshAnimalModel)
      return new fb_component_1.MeshAnimalModel();
  }
  static ReadUnionAnimalModelType(e, n) {
    return void 0 !== n &&
      e === fb_component_1.UnionAnimalModelType.MeshAnimalModel
      ? FbMeshAnimalModel_1.FbMeshAnimalModel.Create(n)
      : void 0;
  }
}
exports.UnionAnimalModelTypeHelper = UnionAnimalModelTypeHelper;
//# sourceMappingURL=UnionAnimalModelTypeHelper.js.map
