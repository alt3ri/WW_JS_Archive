"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCameraLookAtPosition = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.LLe = Vector_1.Vector.Create()),
      (this.dae = Vector_1.Vector.Create()),
      (this.pLe = "CameraLookAtPosition Ban Input");
  }
  ExecuteNew(t, e) {
    const r = t;
    if (r) {
      var t = r.Pos.X ?? 0,
        o = r.Pos.Y ?? 0,
        i = r.Pos.Z ?? 0,
        n = r.FadeInTime,
        a = r.StayTime,
        s = r.FadeOutTime,
        l = r.CameraPos?.X,
        m = r.CameraPos?.Y,
        _ = r.CameraPos?.Z,
        u = r.Fov;
      if (isNaN(t) || isNaN(o) || isNaN(i) || isNaN(n) || isNaN(a) || isNaN(s))
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            15,
            "关卡事件[LevelEventCameraLookAtPosition]参数非法",
            ["x", t],
            ["y", o],
            ["z", i],
            ["fadeInTime", n],
            ["stayTime", a],
            ["fadeOutTime", s],
            ["endPositionX", l],
            ["endPositionY", m],
            ["endPositionZ", _],
            ["fov", u],
          ),
          this.FinishExecute(!1);
      else {
        r.BanInput &&
          ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
            !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ForceReleaseInput,
            this.pLe,
          ),
          InputDistributeController_1.InputDistributeController.RefreshInputTag()),
          r.HideUi &&
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
              1,
            ),
          this.LLe.Set(t, o, i);
        let e = void 0;
        r.CameraPos
          ? (e = this.dae).Set(r.CameraPos.X, r.CameraPos.Y, r.CameraPos.Z)
          : (e = void 0),
          CameraController_1.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(),
          CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
            this.LLe,
            n,
            a,
            s,
            r.LockCamera ?? !1,
            e,
            r.Fov,
          ),
          this.IsAsync
            ? (r.BanInput &&
                ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                  !1),
                InputDistributeController_1.InputDistributeController.RefreshInputTag()),
              r.HideUi &&
                ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
                  1,
                ),
              this.FinishExecute(!0))
            : ((l = n + a + s),
              TimerSystem_1.TimerSystem.Delay(() => {
                r.BanInput &&
                  ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                    !1),
                  InputDistributeController_1.InputDistributeController.RefreshInputTag()),
                  r.HideUi &&
                    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
                      1,
                    ),
                  this.FinishExecute(!0);
              }, l * CommonDefine_1.MILLIONSECOND_PER_SECOND));
      }
    } else this.FinishExecute(!1);
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
}
exports.LevelEventCameraLookAtPosition = LevelEventCameraLookAtPosition;
//# sourceMappingURL=LevelEventCameraLookAtPosition.js.map
