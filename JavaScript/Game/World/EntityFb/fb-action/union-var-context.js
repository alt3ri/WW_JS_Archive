"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVarContext =
    exports.unionToUnionVarContext =
    exports.UnionVarContext =
      void 0);
const entity_template_context_js_1 = require("../fb-action/entity-template-context.js"),
  entity_var_context_js_1 = require("../fb-action/entity-var-context.js"),
  level_play_var_context_js_1 = require("../fb-action/level-play-var-context.js"),
  quest_var_context_js_1 = require("../fb-action/quest-var-context.js");
var UnionVarContext;
function unionToUnionVarContext(t, e) {
  switch (UnionVarContext[t]) {
    case "NONE":
      return;
    case "EntityTemplateContext":
      return e(new entity_template_context_js_1.EntityTemplateContext());
    case "EntityVarContext":
      return e(new entity_var_context_js_1.EntityVarContext());
    case "LevelPlayVarContext":
      return e(new level_play_var_context_js_1.LevelPlayVarContext());
    case "QuestVarContext":
      return e(new quest_var_context_js_1.QuestVarContext());
    default:
      return;
  }
}
function unionListToUnionVarContext(t, e, n) {
  switch (UnionVarContext[t]) {
    case "NONE":
      return;
    case "EntityTemplateContext":
      return e(n, new entity_template_context_js_1.EntityTemplateContext());
    case "EntityVarContext":
      return e(n, new entity_var_context_js_1.EntityVarContext());
    case "LevelPlayVarContext":
      return e(n, new level_play_var_context_js_1.LevelPlayVarContext());
    case "QuestVarContext":
      return e(n, new quest_var_context_js_1.QuestVarContext());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.EntityTemplateContext = 1)] = "EntityTemplateContext"),
    (t[(t.EntityVarContext = 2)] = "EntityVarContext"),
    (t[(t.LevelPlayVarContext = 3)] = "LevelPlayVarContext"),
    (t[(t.QuestVarContext = 4)] = "QuestVarContext");
})(
  (UnionVarContext = exports.UnionVarContext || (exports.UnionVarContext = {})),
),
  (exports.unionToUnionVarContext = unionToUnionVarContext),
  (exports.unionListToUnionVarContext = unionListToUnionVarContext);
//# sourceMappingURL=union-var-context.js.map
