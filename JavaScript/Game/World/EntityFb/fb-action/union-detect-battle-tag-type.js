"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDetectBattleTagType =
    exports.unionToUnionDetectBattleTagType =
    exports.UnionDetectBattleTagType =
      void 0);
const detect_battle_monster_on_ground_js_1 = require("../fb-action/detect-battle-monster-on-ground.js");
var UnionDetectBattleTagType;
function unionToUnionDetectBattleTagType(t, e) {
  switch (UnionDetectBattleTagType[t]) {
    case "NONE":
      return;
    case "DetectBattleMonsterOnGround":
      return e(
        new detect_battle_monster_on_ground_js_1.DetectBattleMonsterOnGround(),
      );
    default:
      return;
  }
}
function unionListToUnionDetectBattleTagType(t, e, n) {
  switch (UnionDetectBattleTagType[t]) {
    case "NONE":
      return;
    case "DetectBattleMonsterOnGround":
      return e(
        n,
        new detect_battle_monster_on_ground_js_1.DetectBattleMonsterOnGround(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.DetectBattleMonsterOnGround = 1)] = "DetectBattleMonsterOnGround");
})(
  (UnionDetectBattleTagType =
    exports.UnionDetectBattleTagType ||
    (exports.UnionDetectBattleTagType = {})),
),
  (exports.unionToUnionDetectBattleTagType = unionToUnionDetectBattleTagType),
  (exports.unionListToUnionDetectBattleTagType =
    unionListToUnionDetectBattleTagType);
//# sourceMappingURL=union-detect-battle-tag-type.js.map
