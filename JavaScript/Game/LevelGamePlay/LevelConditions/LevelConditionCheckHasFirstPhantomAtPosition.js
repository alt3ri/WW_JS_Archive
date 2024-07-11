"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckHasFirstPhantomAtPosition = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasFirstPhantomAtPosition extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    if (1 === parseInt(e.LimitParams.get("IsFull"))) {
      for (const t of o)
        if (
          0 ===
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
            t.GetConfigId,
            0,
          )
        )
          return !1;
      return !0;
    }
    var n = parseInt(e.LimitParams.get("Position")),
      e = 1 === parseInt(e.LimitParams.get("Available"));
    if (n > o.length) return !1;
    const t = o[n - 1];
    return (
      (0 !==
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
          t.GetConfigId,
          0,
        )) ==
      e
    );
  }
}
exports.LevelConditionCheckHasFirstPhantomAtPosition =
  LevelConditionCheckHasFirstPhantomAtPosition;
//# sourceMappingURL=LevelConditionCheckHasFirstPhantomAtPosition.js.map
