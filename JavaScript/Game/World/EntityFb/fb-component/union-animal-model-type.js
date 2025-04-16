"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAnimalModelType =
    exports.unionToUnionAnimalModelType =
    exports.UnionAnimalModelType =
      void 0);
const mesh_animal_model_js_1 = require("../fb-component/mesh-animal-model.js");
var UnionAnimalModelType;
function unionToUnionAnimalModelType(e, n) {
  switch (UnionAnimalModelType[e]) {
    case "NONE":
      return;
    case "MeshAnimalModel":
      return n(new mesh_animal_model_js_1.MeshAnimalModel());
    default:
      return;
  }
}
function unionListToUnionAnimalModelType(e, n, o) {
  switch (UnionAnimalModelType[e]) {
    case "NONE":
      return;
    case "MeshAnimalModel":
      return n(o, new mesh_animal_model_js_1.MeshAnimalModel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.MeshAnimalModel = 1)] = "MeshAnimalModel");
})(
  (UnionAnimalModelType =
    exports.UnionAnimalModelType || (exports.UnionAnimalModelType = {})),
),
  (exports.unionToUnionAnimalModelType = unionToUnionAnimalModelType),
  (exports.unionListToUnionAnimalModelType = unionListToUnionAnimalModelType);
//# sourceMappingURL=union-animal-model-type.js.map
