"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionModelType =
    exports.unionToUnionModelType =
    exports.UnionModelType =
      void 0);
const animal_model_js_1 = require("../fb-component/animal-model.js"),
  level_prefab_js_1 = require("../fb-component/level-prefab.js"),
  model_id_js_1 = require("../fb-component/model-id.js"),
  npc_model_js_1 = require("../fb-component/npc-model.js");
var UnionModelType;
function unionToUnionModelType(e, n) {
  switch (UnionModelType[e]) {
    case "NONE":
      return;
    case "AnimalModel":
      return n(new animal_model_js_1.AnimalModel());
    case "LevelPrefab":
      return n(new level_prefab_js_1.LevelPrefab());
    case "ModelId":
      return n(new model_id_js_1.ModelId());
    case "NpcModel":
      return n(new npc_model_js_1.NpcModel());
    default:
      return;
  }
}
function unionListToUnionModelType(e, n, o) {
  switch (UnionModelType[e]) {
    case "NONE":
      return;
    case "AnimalModel":
      return n(o, new animal_model_js_1.AnimalModel());
    case "LevelPrefab":
      return n(o, new level_prefab_js_1.LevelPrefab());
    case "ModelId":
      return n(o, new model_id_js_1.ModelId());
    case "NpcModel":
      return n(o, new npc_model_js_1.NpcModel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.AnimalModel = 1)] = "AnimalModel"),
    (e[(e.LevelPrefab = 2)] = "LevelPrefab"),
    (e[(e.ModelId = 3)] = "ModelId"),
    (e[(e.NpcModel = 4)] = "NpcModel");
})((UnionModelType = exports.UnionModelType || (exports.UnionModelType = {}))),
  (exports.unionToUnionModelType = unionToUnionModelType),
  (exports.unionListToUnionModelType = unionListToUnionModelType);
//# sourceMappingURL=union-model-type.js.map
