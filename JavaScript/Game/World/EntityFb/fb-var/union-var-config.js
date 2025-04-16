"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVarConfig =
    exports.unionToUnionVarConfig =
    exports.UnionVarConfig =
      void 0);
const boolean_value_js_1 = require("../fb-var/boolean-value.js"),
  entity_value_js_1 = require("../fb-var/entity-value.js"),
  float_value_js_1 = require("../fb-var/float-value.js"),
  int_value_js_1 = require("../fb-var/int-value.js"),
  prefab_value_js_1 = require("../fb-var/prefab-value.js"),
  quest_state_value_js_1 = require("../fb-var/quest-state-value.js"),
  quest_value_js_1 = require("../fb-var/quest-value.js"),
  string_value_js_1 = require("../fb-var/string-value.js"),
  transform_value_js_1 = require("../fb-var/transform-value.js");
var UnionVarConfig;
function unionToUnionVarConfig(e, a) {
  switch (UnionVarConfig[e]) {
    case "NONE":
      return;
    case "BooleanValue":
      return a(new boolean_value_js_1.BooleanValue());
    case "IntValue":
      return a(new int_value_js_1.IntValue());
    case "StringValue":
      return a(new string_value_js_1.StringValue());
    case "FloatValue":
      return a(new float_value_js_1.FloatValue());
    case "EntityValue":
      return a(new entity_value_js_1.EntityValue());
    case "QuestValue":
      return a(new quest_value_js_1.QuestValue());
    case "QuestStateValue":
      return a(new quest_state_value_js_1.QuestStateValue());
    case "TransformValue":
      return a(new transform_value_js_1.TransformValue());
    case "PrefabValue":
      return a(new prefab_value_js_1.PrefabValue());
    default:
      return;
  }
}
function unionListToUnionVarConfig(e, a, u) {
  switch (UnionVarConfig[e]) {
    case "NONE":
      return;
    case "BooleanValue":
      return a(u, new boolean_value_js_1.BooleanValue());
    case "IntValue":
      return a(u, new int_value_js_1.IntValue());
    case "StringValue":
      return a(u, new string_value_js_1.StringValue());
    case "FloatValue":
      return a(u, new float_value_js_1.FloatValue());
    case "EntityValue":
      return a(u, new entity_value_js_1.EntityValue());
    case "QuestValue":
      return a(u, new quest_value_js_1.QuestValue());
    case "QuestStateValue":
      return a(u, new quest_state_value_js_1.QuestStateValue());
    case "TransformValue":
      return a(u, new transform_value_js_1.TransformValue());
    case "PrefabValue":
      return a(u, new prefab_value_js_1.PrefabValue());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.BooleanValue = 1)] = "BooleanValue"),
    (e[(e.IntValue = 2)] = "IntValue"),
    (e[(e.StringValue = 3)] = "StringValue"),
    (e[(e.FloatValue = 4)] = "FloatValue"),
    (e[(e.EntityValue = 5)] = "EntityValue"),
    (e[(e.QuestValue = 6)] = "QuestValue"),
    (e[(e.QuestStateValue = 7)] = "QuestStateValue"),
    (e[(e.TransformValue = 8)] = "TransformValue"),
    (e[(e.PrefabValue = 9)] = "PrefabValue");
})((UnionVarConfig = exports.UnionVarConfig || (exports.UnionVarConfig = {}))),
  (exports.unionToUnionVarConfig = unionToUnionVarConfig),
  (exports.unionListToUnionVarConfig = unionListToUnionVarConfig);
//# sourceMappingURL=union-var-config.js.map
