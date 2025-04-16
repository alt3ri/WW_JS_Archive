"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntityHasSceneItemAttributeTag = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityHasSceneItemAttributeTag extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t) {
    var r = e,
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        r.EntityId,
      )?.Entity?.GetComponent(203);
    if (a)
      switch (r.CheckType) {
        case 0:
          return a.HasAllTag(r.Tags);
        case 1:
          return a.HasAnyTag(r.Tags);
        case 2:
          return !a.HasAnyTag(r.Tags);
      }
    return !1;
  }
}
exports.LevelConditionCheckEntityHasSceneItemAttributeTag =
  LevelConditionCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=LevelConditionCheckEntityHasSceneItemAttributeTag.js.map
