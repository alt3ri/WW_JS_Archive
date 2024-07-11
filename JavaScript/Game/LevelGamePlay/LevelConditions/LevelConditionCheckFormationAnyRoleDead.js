"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckFormationAnyRoleDead = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFormationAnyRoleDead extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
      if (r.IsDead()) return !0;
    return !1;
  }
}
exports.LevelConditionCheckFormationAnyRoleDead =
  LevelConditionCheckFormationAnyRoleDead;
//# sourceMappingURL=LevelConditionCheckFormationAnyRoleDead.js.map
