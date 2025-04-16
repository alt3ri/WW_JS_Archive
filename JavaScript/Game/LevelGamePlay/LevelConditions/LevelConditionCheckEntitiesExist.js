"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntitiesExist = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntitiesExist extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var t = e;
    if (!t) return !1;
    let a = !0;
    for (const s of t.EntityIds) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (((n?.Valid && n?.Entity?.Valid) ?? !1) !== t.IsExist) {
        a = !1;
        break;
      }
    }
    return a;
  }
}
exports.LevelConditionCheckEntitiesExist = LevelConditionCheckEntitiesExist;
//# sourceMappingURL=LevelConditionCheckEntitiesExist.js.map
