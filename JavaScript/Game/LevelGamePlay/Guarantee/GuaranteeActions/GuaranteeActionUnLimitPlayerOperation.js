"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionUnLimitPlayerOperation = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const InputController_1 = require("../../../Input/InputController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const LevelEventLockInputState_1 = require("../../LevelEventLockInputState");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionUnLimitPlayerOperation extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    InputController_1.InputController.SetMoveControlEnabled(!0, !0, !0, !0),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      InputDistributeController_1.InputDistributeController.RefreshInputTag(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetActiveBattleViewSkill,
        !0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SetEnableStateBattleViewSkill,
        !0,
      ),
      (LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = []);
    let t;
    let n = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    n?.Valid &&
      ((n = n.GetComponent(185))?.HasTag((t = 477750727)) &&
        (n.RemoveTag(t), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Test",
          30,
          "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺",
        ),
      n?.HasTag((t = -63548288)) && n.RemoveTag(t),
      n?.HasTag((t = 229513169))) &&
      n.RemoveTag(t),
      ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, !0);
  }
}
exports.GuaranteeActionUnLimitPlayerOperation =
  GuaranteeActionUnLimitPlayerOperation;
// # sourceMappingURL=GuaranteeActionUnLimitPlayerOperation.js.map
