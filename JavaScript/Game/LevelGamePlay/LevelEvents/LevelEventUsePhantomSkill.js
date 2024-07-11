"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventUsePhantomSkill = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUsePhantomSkill extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (e && ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
      var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (
        (void 0 !== e.BlackboardPos &&
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            a.Entity.Id,
            e.BlackboardPos.Key,
            e.BlackboardPos.Value.X ?? 0,
            e.BlackboardPos.Value.Y ?? 0,
            e.BlackboardPos.Value.Z ?? 0,
          ),
        void 0 !== e.BlackboardRot)
      ) {
        if (!Global_1.Global.BaseCharacter) return;
        BlackboardController_1.BlackboardController.SetRotatorValueByEntity(
          a.Entity.Id,
          e.BlackboardRot.Key,
          e.BlackboardRot.Value.Y ?? 0,
          e.BlackboardRot.Value.X ?? 0,
          e.BlackboardRot.Value.Z ?? 0,
        );
      }
      a.Entity.GetComponent(185).AddTag(
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.SkillType),
      );
    }
  }
}
exports.LevelEventUsePhantomSkill = LevelEventUsePhantomSkill;
//# sourceMappingURL=LevelEventUsePhantomSkill.js.map
