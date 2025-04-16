"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionHasNotInvitedRoleInSpring25 = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHasNotInvitedRoleInSpring25 extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !ModelManager_1.ModelManager.Spring25Model.IsLetterListViewAvailable;
  }
}
exports.LevelConditionHasNotInvitedRoleInSpring25 =
  LevelConditionHasNotInvitedRoleInSpring25;
//# sourceMappingURL=LevelConditionHasNotInvitedRoleInSpring25.js.map
