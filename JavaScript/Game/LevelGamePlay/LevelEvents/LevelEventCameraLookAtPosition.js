"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCameraLookAtPosition = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.LLe = Vector_1.Vector.Create()),
      (this.dae = Vector_1.Vector.Create()),
      (this.pLe = "CameraLookAtPosition Ban Input");
  }
  Execute(e, t) {
    let i, r, o, a, s, n;
    e
      ? ((n = parseFloat(e.get("X"))),
        (i = parseFloat(e.get("Y"))),
        (r = parseFloat(e.get("Z"))),
        (o = parseFloat(e.get("FadeInTime"))),
        (a = parseFloat(e.get("StayTime"))),
        (s = parseFloat(e.get("FadeOutTime"))),
        (e = e.get("LockCameraInput") === StringUtils_1.ONE_STRING),
        isNaN(n) || isNaN(i) || isNaN(r) || isNaN(o) || isNaN(a) || isNaN(s)
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                15,
                "关卡事件[LevelEventCameraLookAtPosition]参数非法",
                ["x", n],
                ["y", i],
                ["z", r],
                ["fadeInTime", o],
                ["stayTime", a],
                ["fadeOutTime", s],
              ),
            this.FinishExecute(!1))
          : (this.LLe.Set(n, i, r),
            CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
              this.LLe,
              o,
              a,
              s,
              e,
              void 0,
              -1,
            ),
            this.IsWaitEnd
              ? ((n = o + a + s + 0.5),
                TimerSystem_1.TimerSystem.Delay(() => {
                  this.FinishExecute(!0);
                }, n * CommonDefine_1.MILLIONSECOND_PER_SECOND))
              : this.FinishExecute(!0)))
      : this.FinishExecute(!1);
  }
  ExecuteNew(t, e) {
    const i = t;
    if (i) {
      var t = i.Pos.X;
      const r = i.Pos.Y;
      const o = i.Pos.Z;
      const a = i.FadeInTime;
      const s = i.StayTime;
      const n = i.FadeOutTime;
      let l = i.CameraPos?.X;
      const m = i.CameraPos?.Y;
      const _ = i.CameraPos?.Z;
      const C = i.Fov;
      if (
        !t ||
        !r ||
        !o ||
        isNaN(t) ||
        isNaN(r) ||
        isNaN(o) ||
        isNaN(a) ||
        isNaN(s) ||
        isNaN(n)
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Camera",
            15,
            "关卡事件[LevelEventCameraLookAtPosition]参数非法",
            ["x", t],
            ["y", r],
            ["z", o],
            ["fadeInTime", a],
            ["stayTime", s],
            ["fadeOutTime", n],
            ["endPositionX", l],
            ["endPositionY", m],
            ["endPositionZ", _],
            ["fov", C],
          ),
          this.FinishExecute(!1);
      else {
        i.BanInput &&
          ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
            !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ForceReleaseInput,
            this.pLe,
          )),
          i.HideUi &&
            ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(
              1,
            ),
          this.LLe.Set(t, r, o);
        let e = void 0;
        i.CameraPos
          ? (e = this.dae).Set(i.CameraPos.X, i.CameraPos.Y, i.CameraPos.Z)
          : (e = void 0),
          CameraController_1.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(),
          CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(
            this.LLe,
            a,
            s,
            n,
            i.LockCamera ?? !1,
            e,
            i.Fov,
          ),
          this.IsAsync
            ? (i.BanInput &&
                ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                  !1),
                InputDistributeController_1.InputDistributeController.RefreshInputTag()),
              i.HideUi &&
                ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(
                  1,
                ),
              this.FinishExecute(!0))
            : ((l = a + s + n),
              TimerSystem_1.TimerSystem.Delay(() => {
                i.BanInput &&
                  ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
                    !1),
                  InputDistributeController_1.InputDistributeController.RefreshInputTag()),
                  i.HideUi &&
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
// # sourceMappingURL=LevelEventCameraLookAtPosition.js.map
