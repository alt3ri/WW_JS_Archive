"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckEntityLocked = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityLocked extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    var n = e;
    for (const a of n.Entities) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
      if (!t?.Valid) return !1;
      t = t.Entity.GetComponent(177);
      if (!t) return !1;
      if (t.HasTag(-662723379)) {
        if (!n.IsLocked) return !1;
      } else if (n.IsLocked) return !1;
    }
    return !0;
  }
}
exports.LevelConditionCheckEntityLocked = LevelConditionCheckEntityLocked;
//# sourceMappingURL=LevelConditionCheckEntityLocked.js.map
