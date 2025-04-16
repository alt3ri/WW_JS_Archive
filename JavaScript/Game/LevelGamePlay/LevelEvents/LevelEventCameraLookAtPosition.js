"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCameraLookAtPosition = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.LLe = Vector_1.Vector.Create()),
      (this.dae = Vector_1.Vector.Create()),
      (this.pLe = "CameraLookAtPosition Ban Input"),
      (this.Ctc = !0);
  }
  ExecuteNew(o, e) {
    this.Ctc &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Camera",
        57,
        "[CameraLookAt] LevelEventCameraLookAtPosition Start",
      );
    const a = o;
    if (a) {
      var o = a.Pos.X ?? 0,
        t = a.Pos.Y ?? 0,
        r = a.Pos.Z ?? 0,
        i = a.FadeInTime,
        n = a.StayTime,
        s = a.FadeOutTime,
        l = a.CameraPos?.X,
        m = a.CameraPos?.Y,
        _ = a.CameraPos?.Z,
        L = a.Fov;
      if (isNaN(o) || isNaN(t) || isNaN(r) || isNaN(i) || isNaN(n) || isNaN(s))
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            14,
            "关卡事件[LevelEventCameraLookAtPosition]参数非法",
            ["x", o],
            ["y", t],
            ["z", r],
            ["fadeInTime", i],
            ["stayTime", n],
            ["fadeOutTime", s],
            ["endPositionX", l],
            ["endPositionY", m],
            ["endPositionZ", _],
            ["fov", L],
          ),
          this.FinishExecute(!1);
      else {
        a.BanInput &&
          (this.Ctc &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Camera",
              57,
              "[CameraLookAt] LevelEventCameraLookAtPosition BanInput",
            ),
          (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ForceReleaseInput,
            this.pLe,
          ),
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
          a.HideUi &&
            (this.Ctc &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Camera",
                57,
                "[CameraLookAt] LevelEventCameraLookAtPosition HideUi",
              ),
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
              1,
            )),
          this.LLe.Set(o, t, r);
        let e = void 0;
        if (
          (a.CameraPos
            ? (e = this.dae).Set(a.CameraPos.X, a.CameraPos.Y, a.CameraPos.Z)
            : (e = void 0),
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(),
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
            this.LLe,
            i,
            n,
            s,
            a.LockCamera ?? !1,
            e,
            a.Fov,
            a.CancelBuffer ?? !1,
          ),
          this.IsAsync)
        )
          a.BanInput &&
            ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
              !1),
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
            a.HideUi &&
              ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
                1,
              ),
            this.FinishExecute(!0),
            this.Ctc &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Camera",
                57,
                "[CameraLookAt] LevelEventCameraLookAtPosition Stop",
                ["params.BanInput", a.BanInput],
                ["params.HideUi", a.HideUi],
                ["params.CancelBlendOut", a.CancelBlendOut],
              );
        else {
          let e = i + n;
          a.CancelBlendOut || (e += s),
            TimerSystem_1.TimerSystem.Delay(() => {
              a.BanInput &&
                ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                  !1),
                ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
                a.HideUi &&
                  ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
                    1,
                  ),
                this.FinishExecute(!0),
                this.Ctc &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Camera",
                    57,
                    "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync Finish",
                    ["params.BanInput", a.BanInput],
                    ["params.HideUi", a.HideUi],
                    ["params.CancelBlendOut", a.CancelBlendOut],
                    ["endTime", e],
                  );
            }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND),
            this.Ctc &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Camera",
                57,
                "[CameraLookAt] LevelEventCameraLookAtPosition Stop !IsAsync",
                ["params.BanInput", a.BanInput],
                ["params.HideUi", a.HideUi],
                ["params.CancelBlendOut", a.CancelBlendOut],
                ["endTime", e],
              );
        }
        Global_1.Global.BaseCharacter &&
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(
            Global_1.Global.BaseCharacter.EntityId,
          )
            ?.Entity?.GetComponent(61)
            ?.InterruptAutoMoving("进入相机调整LookAtPosition", !0);
      }
    } else this.FinishExecute(!1);
  }
  ExecuteInGm(e, o) {
    this.FinishExecute(!0);
  }
}
exports.LevelEventCameraLookAtPosition = LevelEventCameraLookAtPosition;
//# sourceMappingURL=LevelEventCameraLookAtPosition.js.map
