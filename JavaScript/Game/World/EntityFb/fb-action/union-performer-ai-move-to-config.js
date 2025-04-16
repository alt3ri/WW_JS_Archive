"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPerformerAiMoveToConfig =
    exports.unionToUnionPerformerAiMoveToConfig =
    exports.UnionPerformerAiMoveToConfig =
      void 0);
const performer_ai_move_to_entity_js_1 = require("../fb-action/performer-ai-move-to-entity.js"),
  performer_ai_move_to_player_js_1 = require("../fb-action/performer-ai-move-to-player.js"),
  performer_ai_move_to_position_js_1 = require("../fb-action/performer-ai-move-to-position.js");
var UnionPerformerAiMoveToConfig;
function unionToUnionPerformerAiMoveToConfig(e, o) {
  switch (UnionPerformerAiMoveToConfig[e]) {
    case "NONE":
      return;
    case "PerformerAiMoveToEntity":
      return o(new performer_ai_move_to_entity_js_1.PerformerAiMoveToEntity());
    case "PerformerAiMoveToPlayer":
      return o(new performer_ai_move_to_player_js_1.PerformerAiMoveToPlayer());
    case "PerformerAiMoveToPosition":
      return o(
        new performer_ai_move_to_position_js_1.PerformerAiMoveToPosition(),
      );
    default:
      return;
  }
}
function unionListToUnionPerformerAiMoveToConfig(e, o, r) {
  switch (UnionPerformerAiMoveToConfig[e]) {
    case "NONE":
      return;
    case "PerformerAiMoveToEntity":
      return o(
        r,
        new performer_ai_move_to_entity_js_1.PerformerAiMoveToEntity(),
      );
    case "PerformerAiMoveToPlayer":
      return o(
        r,
        new performer_ai_move_to_player_js_1.PerformerAiMoveToPlayer(),
      );
    case "PerformerAiMoveToPosition":
      return o(
        r,
        new performer_ai_move_to_position_js_1.PerformerAiMoveToPosition(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.PerformerAiMoveToEntity = 1)] = "PerformerAiMoveToEntity"),
    (e[(e.PerformerAiMoveToPlayer = 2)] = "PerformerAiMoveToPlayer"),
    (e[(e.PerformerAiMoveToPosition = 3)] = "PerformerAiMoveToPosition");
})(
  (UnionPerformerAiMoveToConfig =
    exports.UnionPerformerAiMoveToConfig ||
    (exports.UnionPerformerAiMoveToConfig = {})),
),
  (exports.unionToUnionPerformerAiMoveToConfig =
    unionToUnionPerformerAiMoveToConfig),
  (exports.unionListToUnionPerformerAiMoveToConfig =
    unionListToUnionPerformerAiMoveToConfig);
//# sourceMappingURL=union-performer-ai-move-to-config.js.map
