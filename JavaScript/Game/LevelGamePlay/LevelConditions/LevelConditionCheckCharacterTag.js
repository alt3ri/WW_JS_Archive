"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckCharacterTag = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCharacterTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    let r;
    return (
      !!(
        e.LimitParams &&
        (e = e.LimitParams.get("Tag")) &&
        (r =
          (r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) &&
          r.Entity.GetComponent(185))
      ) && r.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))
    );
  }
  CheckNew(e, a) {
    if (!e) return !1;
    let r = !1;
    let l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      l && (l = l.Entity.GetComponent(185)) && (r = l.HasTag(e.TagId)),
      e.IsContain ? r : !r
    );
  }
}
exports.LevelConditionCheckCharacterTag = LevelConditionCheckCharacterTag;
// # sourceMappingURL=LevelConditionCheckCharacterTag.js.map
