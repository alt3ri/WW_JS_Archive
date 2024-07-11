"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckAiState = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAiState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o, n) {
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 30, "参数不合法"),
        !1
      );
    if (!n)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 30, "上下文不合法"),
        !1
      );
    n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n.EntityId);
    if (!n?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 30, "对象Entity不合法"),
        !1
      );
    const i = n.Entity.GetComponent(185);
    let r = !1;
    switch (e.StateType) {
      case ICondition_1.EAiStateType.AnimalRandomAction:
        r = i?.HasTag(502364103) || !1;
        break;
      case ICondition_1.EAiStateType.AnimalStandUp:
        r = i?.HasTag(1900394806) || i?.HasTag(379545977) || !1;
        break;
      case ICondition_1.EAiStateType.AnimalSitDown:
        r = i?.HasTag(393622611) || i?.HasTag(276015887) || !1;
    }
    return e.Compare === "Eq" ? r : !r;
  }
}
exports.LevelConditionCheckAiState = LevelConditionCheckAiState;
// # sourceMappingURL=LevelConditionCheckAiState.js.map
