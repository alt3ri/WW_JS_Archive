"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionNpcModelTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbDaNpcModel_1 = require("./FbDaNpcModel"),
  FbMeshNpcModel_1 = require("./FbMeshNpcModel");
class UnionNpcModelTypeHelper {
  static GetUnionNpcModelTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionNpcModelType.DaNpcModel:
        return new fb_component_1.DaNpcModel();
      case fb_component_1.UnionNpcModelType.MeshNpcModel:
        return new fb_component_1.MeshNpcModel();
      default:
        return;
    }
  }
  static ReadUnionNpcModelType(e, o) {
    if (void 0 !== o)
      switch (e) {
        case fb_component_1.UnionNpcModelType.DaNpcModel:
          return FbDaNpcModel_1.FbDaNpcModel.Create(o);
        case fb_component_1.UnionNpcModelType.MeshNpcModel:
          return FbMeshNpcModel_1.FbMeshNpcModel.Create(o);
        default:
          return;
      }
  }
}
exports.UnionNpcModelTypeHelper = UnionNpcModelTypeHelper;
//# sourceMappingURL=UnionNpcModelTypeHelper.js.map
