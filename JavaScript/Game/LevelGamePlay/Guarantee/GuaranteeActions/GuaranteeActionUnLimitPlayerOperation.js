"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionUnLimitPlayerOperation = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Global_1 = require("../../../Global"),
  InputController_1 = require("../../../Input/InputController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  LevelEventLockInputState_1 = require("../../LevelEventLockInputState"),
  GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionUnLimitPlayerOperation extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(!0, 0),
      (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []);
    var t,
      r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    r?.Valid &&
      ((r = r.GetComponent(188))?.HasTag((t = 477750727)) &&
        (r.RemoveTag(t), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      r?.HasTag((t = -63548288)) && r.RemoveTag(t),
      r?.HasTag((t = 229513169))) &&
      r.RemoveTag(t),
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
  }
}
exports.GuaranteeActionUnLimitPlayerOperation =
  GuaranteeActionUnLimitPlayerOperation;
//# sourceMappingURL=GuaranteeActionUnLimitPlayerOperation.js.map
