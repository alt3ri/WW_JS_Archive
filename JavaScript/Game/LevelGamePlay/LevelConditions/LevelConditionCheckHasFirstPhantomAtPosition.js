"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckHasFirstPhantomAtPosition = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasFirstPhantomAtPosition extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    const o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
    if (parseInt(e.LimitParams.get("IsFull")) === 1) {
      for (const t of o)
        if (
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
            t.GetConfigId,
            0,
          ) === 0
        )
          return !1;
      return !0;
    }
    const n = parseInt(e.LimitParams.get("Position"));
    var e = parseInt(e.LimitParams.get("Available")) === 1;
    if (n > o.length) return !1;
    const t = o[n - 1];
    return (
      (ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
        t.GetConfigId,
        0,
      ) !==
        0) ==
      e
    );
  }
}
exports.LevelConditionCheckHasFirstPhantomAtPosition =
  LevelConditionCheckHasFirstPhantomAtPosition;
// # sourceMappingURL=LevelConditionCheckHasFirstPhantomAtPosition.js.map
