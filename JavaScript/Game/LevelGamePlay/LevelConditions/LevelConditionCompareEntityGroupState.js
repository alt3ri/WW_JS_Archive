"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareEntityGroupState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareEntityGroupState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    var t = e.GroupCondition.Count;
    const o = e.GroupCondition.Compare;
    let i = 0;
    return (
      e.GroupCondition.Conditions?.forEach((e) => {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          e.EntityId,
        );
        let t = !0;
        if (void 0 !== e.State) {
          var a = r?.Entity?.GetComponent(177);
          if (!a) return;
          a = a.ContainsTagByName(e.State);
          t = "Eq" === o ? a : !a;
        }
        let n = !0;
        if (void 0 !== e.IsLocked) {
          a = r?.Entity?.GetComponent(115);
          if (!a) return;
          r = e.IsLocked === a.IsLocked;
          n = "Eq" === o ? r : !r;
        }
        t && n && ++i;
      }),
      i === t
    );
  }
}
exports.LevelConditionCompareEntityGroupState =
  LevelConditionCompareEntityGroupState;
//# sourceMappingURL=LevelConditionCompareEntityGroupState.js.map
