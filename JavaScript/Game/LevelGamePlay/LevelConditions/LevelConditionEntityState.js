"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionEntityState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionEntityState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var t;
    return (
      !!e &&
      ((e = e),
      !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        e.EntityId,
      ))?.Valid) &&
      !!(t = t.Entity.GetComponent(177)) &&
      ((t = t.ContainsTagByName(e.State)), "Eq" === e.Compare ? t : !t)
    );
  }
}
exports.LevelConditionEntityState = LevelConditionEntityState;
//# sourceMappingURL=LevelConditionEntityState.js.map
