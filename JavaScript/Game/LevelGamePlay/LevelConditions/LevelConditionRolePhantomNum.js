"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionRolePhantomNum = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRolePhantomNum extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (e.LimitParams) {
      var a = Number(e.LimitParams.get("RoleId"));
      if (void 0 !== a) {
        var o = Number(e.LimitParams.get("Value")),
          n = e.LimitParams.get("Op");
        if (n) {
          if (0 < a) return this.mLe(a, o, n);
          for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
            if (this.mLe(t.GetRoleId(), o, n)) return !0;
        }
      }
    }
    return !1;
  }
  mLe(e, r, a) {
    return (
      !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) &&
      this.CheckCompareValue(
        a,
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
          e,
        ).GetEquippedNum(),
        r,
      )
    );
  }
}
exports.LevelConditionRolePhantomNum = LevelConditionRolePhantomNum;
//# sourceMappingURL=LevelConditionRolePhantomNum.js.map
