"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckAnimalParts = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAnimalParts extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o, r) {
    var n = e;
    if (!n)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 39, "参数不合法"),
        !1
      );
    let a = void 0;
    if (n.TargetAnimal)
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        n.TargetAnimal,
      );
    else {
      if (1 !== r?.Type || !r.EntityId)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelCondition", 39, "找不到对应的实体id"),
          !1
        );
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.EntityId);
    }
    if (!a?.Valid)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 39, "对象Entity不合法"),
        !1
      );
    var i = a.Entity.GetComponent(169);
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            39,
            "对象Entity缺少AnimalPerformComponent",
          ),
        !1
      );
    let t = !1;
    switch (n.CheckType) {
      case 0:
        t = !0;
        for (const l of n.Slots) if (!(t &&= i.GetIsPartShow(l))) break;
        break;
      case 1:
        t = !1;
        for (const s of n.Slots) if ((t ||= i.GetIsPartShow(s))) break;
        break;
      case 2:
        t = !0;
        for (const L of n.Slots) if (!(t &&= !i.GetIsPartShow(L))) break;
    }
    return t;
  }
}
exports.LevelConditionCheckAnimalParts = LevelConditionCheckAnimalParts;
//# sourceMappingURL=LevelConditionCheckAnimalParts.js.map
