"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckPlayerStateRestriction = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  PlayerStateRestrictionById_1 = require("../../../Core/Define/ConfigQuery/PlayerStateRestrictionById"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPlayerStateRestriction extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (!t)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelCondition",
            37,
            "[CheckPlayerStateRestriction]无法获取当前角色",
          ),
        !1
      );
    var a = t.Entity.GetComponent(185);
    if (!a)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelCondition",
            37,
            "[CheckPlayerStateRestriction]无法获取当前角色BaseTagComponent组件",
          ),
        !1
      );
    t = PlayerStateRestrictionById_1.configPlayerStateRestrictionById.GetConfig(
      e.RestrictionId,
    );
    if (t) {
      for (const o of t.IncludedTags)
        if (!a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o)))
          return !1;
      for (const i of t.ExcludedTags)
        if (a.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)))
          return !1;
    }
    return !0;
  }
}
exports.LevelConditionCheckPlayerStateRestriction =
  LevelConditionCheckPlayerStateRestriction;
//# sourceMappingURL=LevelConditionCheckPlayerStateRestriction.js.map
