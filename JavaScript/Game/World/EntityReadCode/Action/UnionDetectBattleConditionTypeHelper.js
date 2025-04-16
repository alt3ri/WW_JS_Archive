"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDetectBattleConditionTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDetectBattleTag_1 = require("./FbDetectBattleTag");
class UnionDetectBattleConditionTypeHelper {
  static GetUnionDetectBattleConditionTypeObject(t) {
    if (t === fb_action_1.UnionDetectBattleConditionType.DetectBattleTag)
      return new fb_action_1.DetectBattleTag();
  }
  static ReadUnionDetectBattleConditionType(t, e) {
    return void 0 !== e &&
      t === fb_action_1.UnionDetectBattleConditionType.DetectBattleTag
      ? FbDetectBattleTag_1.FbDetectBattleTag.Create(e)
      : void 0;
  }
}
exports.UnionDetectBattleConditionTypeHelper =
  UnionDetectBattleConditionTypeHelper;
//# sourceMappingURL=UnionDetectBattleConditionTypeHelper.js.map
