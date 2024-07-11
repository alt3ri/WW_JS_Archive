"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckPositionRolePhantomSkillEquip = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPositionRolePhantomSkillEquip extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    var e = parseInt(e.LimitParams.get("Pos"));
    const r =
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[e - 1];
    return (
      !!r?.IsMyRole() &&
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
        r.GetConfigId,
        e - 1,
      ) !== 0
    );
  }
}
exports.LevelConditionCheckPositionRolePhantomSkillEquip =
  LevelConditionCheckPositionRolePhantomSkillEquip;
// # sourceMappingURL=LevelConditionCheckPositionRolePhantomSkillEquip.js.map
