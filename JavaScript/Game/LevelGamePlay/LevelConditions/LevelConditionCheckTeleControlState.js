"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTeleControlState = void 0);
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeleControlState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    var n = e,
      e = void 0;
    if (
      !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        n.EntityId,
      ))?.Valid
    )
      return !1;
    e = e.Entity.GetComponent(154);
    if (!e) return !1;
    let o = !1;
    switch (e.GetState()) {
      case 4:
        o = n.State === ICondition_1.ETeleControlState.Hold;
        break;
      case 11:
        o = n.State === ICondition_1.ETeleControlState.LetGo;
        break;
      case 6:
      case 9:
      case 8:
      case 7:
        o = n.State === ICondition_1.ETeleControlState.Throwing;
    }
    return o;
  }
}
exports.LevelConditionCheckTeleControlState =
  LevelConditionCheckTeleControlState;
//# sourceMappingURL=LevelConditionCheckTeleControlState.js.map
