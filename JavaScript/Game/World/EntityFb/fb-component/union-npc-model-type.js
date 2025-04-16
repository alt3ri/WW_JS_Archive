"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionNpcModelType =
    exports.unionToUnionNpcModelType =
    exports.UnionNpcModelType =
      void 0);
const da_npc_model_js_1 = require("../fb-component/da-npc-model.js"),
  mesh_npc_model_js_1 = require("../fb-component/mesh-npc-model.js");
var UnionNpcModelType;
function unionToUnionNpcModelType(e, o) {
  switch (UnionNpcModelType[e]) {
    case "NONE":
      return;
    case "DaNpcModel":
      return o(new da_npc_model_js_1.DaNpcModel());
    case "MeshNpcModel":
      return o(new mesh_npc_model_js_1.MeshNpcModel());
    default:
      return;
  }
}
function unionListToUnionNpcModelType(e, o, n) {
  switch (UnionNpcModelType[e]) {
    case "NONE":
      return;
    case "DaNpcModel":
      return o(n, new da_npc_model_js_1.DaNpcModel());
    case "MeshNpcModel":
      return o(n, new mesh_npc_model_js_1.MeshNpcModel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DaNpcModel = 1)] = "DaNpcModel"),
    (e[(e.MeshNpcModel = 2)] = "MeshNpcModel");
})(
  (UnionNpcModelType =
    exports.UnionNpcModelType || (exports.UnionNpcModelType = {})),
),
  (exports.unionToUnionNpcModelType = unionToUnionNpcModelType),
  (exports.unionListToUnionNpcModelType = unionListToUnionNpcModelType);
//# sourceMappingURL=union-npc-model-type.js.map
