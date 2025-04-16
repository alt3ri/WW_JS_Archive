"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionExecBattleOption =
    exports.unionToUnionExecBattleOption =
    exports.UnionExecBattleOption =
      void 0);
const set_battle_tags_js_1 = require("../fb-action/set-battle-tags.js"),
  set_monster_move_target_js_1 = require("../fb-action/set-monster-move-target.js");
var UnionExecBattleOption;
function unionToUnionExecBattleOption(t, e) {
  switch (UnionExecBattleOption[t]) {
    case "NONE":
      return;
    case "SetBattleTags":
      return e(new set_battle_tags_js_1.SetBattleTags());
    case "SetMonsterMoveTarget":
      return e(new set_monster_move_target_js_1.SetMonsterMoveTarget());
    default:
      return;
  }
}
function unionListToUnionExecBattleOption(t, e, n) {
  switch (UnionExecBattleOption[t]) {
    case "NONE":
      return;
    case "SetBattleTags":
      return e(n, new set_battle_tags_js_1.SetBattleTags());
    case "SetMonsterMoveTarget":
      return e(n, new set_monster_move_target_js_1.SetMonsterMoveTarget());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.SetBattleTags = 1)] = "SetBattleTags"),
    (t[(t.SetMonsterMoveTarget = 2)] = "SetMonsterMoveTarget");
})(
  (UnionExecBattleOption =
    exports.UnionExecBattleOption || (exports.UnionExecBattleOption = {})),
),
  (exports.unionToUnionExecBattleOption = unionToUnionExecBattleOption),
  (exports.unionListToUnionExecBattleOption = unionListToUnionExecBattleOption);
//# sourceMappingURL=union-exec-battle-option.js.map
