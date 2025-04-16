"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionUnLimitPlayerOperation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelEventLockInputState_1 = require("../../LevelEventLockInputState"),
  GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionUnLimitPlayerOperation extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
      !0,
      !0,
      !0,
      !0,
    ),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
      (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []);
    var r,
      t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    t?.Valid &&
      ((t = t.GetComponent(203))?.HasTag((r = 477750727)) &&
        (t.RemoveTag(r), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          29,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      t?.HasTag((r = -63548288)) && t.RemoveTag(r),
      t?.HasTag((r = 229513169))) &&
      t.RemoveTag(r),
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
  }
}
exports.GuaranteeActionUnLimitPlayerOperation =
  GuaranteeActionUnLimitPlayerOperation;
//# sourceMappingURL=GuaranteeActionUnLimitPlayerOperation.js.map
