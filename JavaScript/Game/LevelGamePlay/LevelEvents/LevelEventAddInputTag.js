"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddInputTag = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../../Game/Global"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  InputController_1 = require("../../Input/InputController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddInputTag extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.pLe = "Input Limited Action");
  }
  ExecuteNew(t, e) {
    if (t) {
      var n = t;
      let e = void 0;
      var o = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
      switch (
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ForceReleaseInput,
          this.pLe,
        ),
        n.Type.Type)
      ) {
        case IAction_1.ELimitPlayOperation.AllowCamera:
          e = "FightInputRoot.FightInput.AxisInput.CameraInput";
          break;
        case IAction_1.ELimitPlayOperation.AllowAction:
          e = "FightInputRoot.FightInput.ActionInput";
          break;
        case IAction_1.ELimitPlayOperation.AllowMove:
          n.Type.IsOnlyForward &&
            InputController_1.InputController.SetMoveControlEnabled(
              !0,
              !1,
              !1,
              !1,
            ),
            (e = "FightInputRoot.FightInput.AxisInput.MoveInput");
          break;
        case IAction_1.ELimitPlayOperation.AllowMoveNew:
          InputController_1.InputController.SetMoveControlEnabled(
            n.Type.Forward,
            n.Type.Back,
            n.Type.Left,
            n.Type.Right,
          ),
            (e = "FightInputRoot.FightInput.AxisInput.MoveInput"),
            o?.Valid &&
              (o.GetComponent(185)?.AddTag(477750727),
              Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "Test",
                30,
                "[LevelEventAddInputTag.ExecuteNew] AddTag 禁止冲刺",
              );
          break;
        case IAction_1.ELimitPlayOperation.AllowUi:
          e = "UiInputRoot";
          break;
        case IAction_1.ELimitPlayOperation.AllowMouse:
          e = "UiInputRoot.MouseInputTag";
          break;
        case IAction_1.ELimitPlayOperation.BlockAll:
          e = "BlockAllInputTag";
          break;
        default:
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              25,
              "没有定义ELimitPlayOperation对应什么InputTag!",
              ["ELimitPlayOperation", n.Type],
            )
          );
      }
      LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()
        ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(
            e,
          ),
          InputDistributeController_1.InputDistributeController.RefreshInputTag())
        : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
            e,
          ),
          LevelEventLockInputState_1.LevelEventLockInputState.Lock([e]));
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.AddGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "UnLimitPlayerOperation" },
    );
  }
}
exports.LevelEventAddInputTag = LevelEventAddInputTag;
//# sourceMappingURL=LevelEventAddInputTag.js.map
