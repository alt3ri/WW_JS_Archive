"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventUsePhantomSkill = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUsePhantomSkill extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (e && ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (
        (void 0 !== e.BlackboardPos &&
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
            r.Entity.Id,
            e.BlackboardPos.Key,
            e.BlackboardPos.Value.X ?? 0,
            e.BlackboardPos.Value.Y ?? 0,
            e.BlackboardPos.Value.Z ?? 0,
          ),
        void 0 !== e.BlackboardRot)
      ) {
        if (!Global_1.Global.BaseCharacter) return;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetRotatorValueByEntity(
          r.Entity.Id,
          e.BlackboardRot.Key,
          e.BlackboardRot.Value.Y ?? 0,
          e.BlackboardRot.Value.X ?? 0,
          e.BlackboardRot.Value.Z ?? 0,
        );
      }
      r.Entity.GetComponent(203).AddTag(
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.SkillType),
      );
    }
  }
}
exports.LevelEventUsePhantomSkill = LevelEventUsePhantomSkill;
//# sourceMappingURL=LevelEventUsePhantomSkill.js.map
