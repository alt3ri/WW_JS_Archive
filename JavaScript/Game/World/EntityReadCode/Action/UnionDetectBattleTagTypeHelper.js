"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDetectBattleTagTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDetectBattleMonsterOnGround_1 = require("./FbDetectBattleMonsterOnGround");
class UnionDetectBattleTagTypeHelper {
  static GetUnionDetectBattleTagTypeObject(t) {
    if (t === fb_action_1.UnionDetectBattleTagType.DetectBattleMonsterOnGround)
      return new fb_action_1.DetectBattleMonsterOnGround();
  }
  static ReadUnionDetectBattleTagType(t, e) {
    return void 0 !== e &&
      t === fb_action_1.UnionDetectBattleTagType.DetectBattleMonsterOnGround
      ? FbDetectBattleMonsterOnGround_1.FbDetectBattleMonsterOnGround.Create(e)
      : void 0;
  }
}
exports.UnionDetectBattleTagTypeHelper = UnionDetectBattleTagTypeHelper;
//# sourceMappingURL=UnionDetectBattleTagTypeHelper.js.map
