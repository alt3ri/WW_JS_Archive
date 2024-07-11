"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLevelPlayRewardState = void 0);
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLevelPlayRewardState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t) {
    return (
      !!(
        e &&
        ObjectUtils_1.ObjectUtils.IsValid(t) &&
        (t =
          (t =
            (t = ActorUtils_1.ActorUtils.GetEntityByActor(t)) &&
            ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(t)) &&
          ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfoByRewardEntityId(
            t,
          ))
      ) && ((t = !1 === (t.CanGetReward ?? !1)), e.Compare === "Eq" ? t : !t)
    );
  }
}
exports.LevelConditionCheckLevelPlayRewardState =
  LevelConditionCheckLevelPlayRewardState;
// # sourceMappingURL=LevelConditionCheckLevelPlayRewardState.js.map
