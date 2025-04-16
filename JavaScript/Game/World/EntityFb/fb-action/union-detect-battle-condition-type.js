"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDetectBattleConditionType =
    exports.unionToUnionDetectBattleConditionType =
    exports.UnionDetectBattleConditionType =
      void 0);
const detect_battle_tag_js_1 = require("../fb-action/detect-battle-tag.js");
var UnionDetectBattleConditionType;
function unionToUnionDetectBattleConditionType(t, e) {
  switch (UnionDetectBattleConditionType[t]) {
    case "NONE":
      return;
    case "DetectBattleTag":
      return e(new detect_battle_tag_js_1.DetectBattleTag());
    default:
      return;
  }
}
function unionListToUnionDetectBattleConditionType(t, e, n) {
  switch (UnionDetectBattleConditionType[t]) {
    case "NONE":
      return;
    case "DetectBattleTag":
      return e(n, new detect_battle_tag_js_1.DetectBattleTag());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"), (t[(t.DetectBattleTag = 1)] = "DetectBattleTag");
})(
  (UnionDetectBattleConditionType =
    exports.UnionDetectBattleConditionType ||
    (exports.UnionDetectBattleConditionType = {})),
),
  (exports.unionToUnionDetectBattleConditionType =
    unionToUnionDetectBattleConditionType),
  (exports.unionListToUnionDetectBattleConditionType =
    unionListToUnionDetectBattleConditionType);
//# sourceMappingURL=union-detect-battle-condition-type.js.map
