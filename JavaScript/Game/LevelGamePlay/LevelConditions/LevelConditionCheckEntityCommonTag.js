"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntityCommonTag = void 0);
const UE = require("ue");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityCommonTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    const t = UE.KismetStringLibrary.Conv_StringToInt64(
      e.LimitParams.get("CreatureGen"),
    );
    const n = parseInt(e.LimitParams.get("EntityConfigId"));
    const a = e.LimitParams.get("EntityCommonTag");
    var e = new Array();
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(t, e);
    for (const i of e) {
      const o = i.Entity.GetComponent(0);
      if (o.GetPbDataId() === n)
        if (!i.Entity.GetComponent(177)?.ContainsTagByName(a)) return !1;
    }
    return !0;
  }
  CheckNew(e, r) {
    if (!e) return !1;
    let t = !1;
    let n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
      e.EntityId,
    );
    return (
      n &&
        (n = EntitySystem_1.EntitySystem.GetComponent(n.Id, 177)) &&
        (t = n.HasTag(e.TagId)),
      e.IsContain ? t : !t
    );
  }
}
exports.LevelConditionCheckEntityCommonTag = LevelConditionCheckEntityCommonTag;
// # sourceMappingURL=LevelConditionCheckEntityCommonTag.js.map
