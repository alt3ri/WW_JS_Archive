"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionDisableAlertConditionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableAlertAreaDungeonCondition_1 = require("./FbDisableAlertAreaDungeonCondition"),
  FbDisableAlertAreaQuestCondition_1 = require("./FbDisableAlertAreaQuestCondition");
class UnionDisableAlertConditionHelper {
  static GetUnionDisableAlertConditionObject(e) {
    switch (e) {
      case fb_action_1.UnionDisableAlertCondition
        .DisableAlertAreaDungeonCondition:
        return new fb_action_1.DisableAlertAreaDungeonCondition();
      case fb_action_1.UnionDisableAlertCondition
        .DisableAlertAreaQuestCondition:
        return new fb_action_1.DisableAlertAreaQuestCondition();
      default:
        return;
    }
  }
  static ReadUnionDisableAlertCondition(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionDisableAlertCondition
          .DisableAlertAreaDungeonCondition:
          return FbDisableAlertAreaDungeonCondition_1.FbDisableAlertAreaDungeonCondition.Create(
            t,
          );
        case fb_action_1.UnionDisableAlertCondition
          .DisableAlertAreaQuestCondition:
          return FbDisableAlertAreaQuestCondition_1.FbDisableAlertAreaQuestCondition.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionDisableAlertConditionHelper = UnionDisableAlertConditionHelper;
//# sourceMappingURL=UnionDisableAlertConditionHelper.js.map
