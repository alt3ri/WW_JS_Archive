"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAdjustPlayerCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  RenderUtil_1 = require("../../Render/Utils/RenderUtil"),
  ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  IMMEDIATELY_FADE_CAMERA_TIME = 0.1,
  noAimGameplayTag = -1036349300;
class LevelEventAdjustPlayerCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.yLe = void 0);
  }
  ExecuteNew(e, r) {
    const t = e;
    if (
      (t || this.FinishExecute(!1),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 39, "进入相机调整"),
      this.ILe(t))
    )
      switch (t.Option.Type) {
        case IAction_1.EAdjustPlayerCamera.Horizontal:
          this.TLe(t, noAimGameplayTag),
            CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(
              t.Option.SplineEntityId,
              t.Option.YawAngle,
              t.Option.PitchAngle,
              t.Option.FadeInTime,
            ),
            void 0 !== t.Option.DepthOfField
              ? CameraController_1.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(
                  t.Option.DepthOfField.Fstop,
                  t.Option.DepthOfField.Distance,
                  t.Option.DepthOfField.BlurAmount,
                  t.Option.DepthOfField.BlurRadius,
                )
              : CameraController_1.CameraController.FightCamera.LogicComponent.ExitDepthOfField(),
            CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
              !1,
            ),
            RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
          break;
        case IAction_1.EAdjustPlayerCamera.Dialog:
          this.TLe(t);
          let e = t.Option.PitchAngle,
            r = (void 0 !== e && (e = -e), t.Option.YawAngle);
          void 0 !== r && (r += 180);
          var o = this.yLe.DefaultConfig.get(1);
          CameraController_1.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(
            t.Option.CenterPos,
            e,
            r,
            o,
          );
          break;
        case IAction_1.EAdjustPlayerCamera.Fixed:
          this.TLe(t);
          var o = Vector_1.Vector.Create(),
            a = Rotator_1.Rotator.Create();
          o.Set(
            t.Option.CenterPos.X ?? 0,
            t.Option.CenterPos.Y ?? 0,
            t.Option.CenterPos.Z ?? 0,
          ),
            a.Set(
              t.Option.CenterRot.Y ?? 0,
              t.Option.CenterRot.Z ?? 0,
              t.Option.CenterRot.X ?? 0,
            ),
            CameraController_1.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(
              o,
              a,
              t.Option.Fov,
              t.Option.FadeInTime,
              t.Option.FadeOutTime,
              1,
            );
          break;
        case IAction_1.EAdjustPlayerCamera.Basic:
          this.TLe(t),
            t.Option.SightUi &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SetCameraAimVisible,
                !0,
                0,
                t.Option.SightUi,
              );
          break;
        case IAction_1.EAdjustPlayerCamera.AxisLock:
          (o = t.Option.AxisRotate.Y ?? 0), (a = t.Option.AxisRotate.Z ?? 0);
          if (
            (this.yLe.DefaultConfig.set(45, o),
            this.yLe.DefaultConfig.set(46, o),
            this.yLe.DefaultConfig.set(60, a),
            this.yLe.DefaultConfig.set(61, a),
            t.Option.ScreenConfig)
          )
            if (
              Math.abs(
                CameraController_1.CameraController.CameraRotator.Pitch - o,
              ) <= t.Option.ScreenConfig.TriggerAngle &&
              Math.abs(
                CameraController_1.CameraController.CameraRotator.Yaw - a,
              ) <= t.Option.ScreenConfig.TriggerAngle
            )
              this.TLe(t, noAimGameplayTag);
            else {
              o = t.Option.ScreenConfig.FadeInTime;
              const i = t.Option.ScreenConfig.FadeOutTime;
              LevelLoadingController_1.LevelLoadingController.OpenLoading(
                0,
                3,
                () => {
                  (this.yLe.FadeInTime = IMMEDIATELY_FADE_CAMERA_TIME),
                    this.TLe(t, noAimGameplayTag),
                    LevelLoadingController_1.LevelLoadingController.CloseLoading(
                      0,
                      void 0,
                      i,
                    );
                },
                o,
              );
            }
          else this.TLe(t, noAimGameplayTag);
      }
    else this.FinishExecute(!1);
  }
  ILe(e) {
    var r,
      t =
        CameraController_1.CameraController.FightCamera.LogicComponent
          .CameraConfigController;
    return t
      ? ((r = e.Option.Type),
        (t = t.GetCameraConfigByTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r),
        ))
          ? (((this.yLe = t).Priority = e.Option.Priority),
            (t.FadeInTime = e.Option.FadeInTime),
            (t.FadeOutTime = e.Option.FadeOutTime),
            e.Option.FadeInCurve
              ? (t.FadeInCurve =
                  ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
                    e.Option.FadeInCurve,
                  ))
              : (t.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
            e.Option.FadeOutCurve
              ? (t.FadeOutCurve =
                  ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
                    e.Option.FadeOutCurve,
                  ))
              : (t.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
            e.Option.ArmLength && 0 !== e.Option.ArmLength
              ? t.DefaultConfig.set(1, e.Option.ArmLength)
              : t.DefaultConfig.delete(1),
            e.Option.MinumArmLength && 0 !== e.Option.MinumArmLength
              ? t.DefaultConfig.set(2, e.Option.MinumArmLength)
              : t.DefaultConfig.delete(2),
            e.Option.MaxiumArmLength && 0 !== e.Option.MaxiumArmLength
              ? t.DefaultConfig.set(3, e.Option.MaxiumArmLength)
              : t.DefaultConfig.delete(3),
            e.Option.Offset.X && 0 !== e.Option.Offset.X
              ? t.DefaultConfig.set(6, e.Option.Offset.X)
              : t.DefaultConfig.delete(6),
            e.Option.Offset.Y && 0 !== e.Option.Offset.Y
              ? t.DefaultConfig.set(7, e.Option.Offset.Y)
              : t.DefaultConfig.delete(7),
            e.Option.Offset.Z && 0 !== e.Option.Offset.Z
              ? t.DefaultConfig.set(8, e.Option.Offset.Z)
              : t.DefaultConfig.delete(8),
            e.Option.Fov && 0 !== e.Option.Fov
              ? t.DefaultConfig.set(5, e.Option.Fov)
              : t.DefaultConfig.delete(5),
            void 0 === e.Option.IsDisableResetFocus
              ? t.DefaultConfig.delete(56)
              : t.DefaultConfig.set(56, e.Option.IsDisableResetFocus ? 1 : 0),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 39, "没有找到对应Tag的镜头配置", [
                "tag",
                r,
              ]),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 39, "CameraConfigController不存在"),
        !1);
  }
  TLe(e, r = 0) {
    CameraController_1.CameraController.FightCamera.LogicComponent?.CameraConfigController.EnableHookConfig(
      e.Option.Type,
      noAimGameplayTag,
    );
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.AddGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "RestorePlayerCameraAdjustment" },
      !0,
    );
  }
}
exports.LevelEventAdjustPlayerCamera = LevelEventAdjustPlayerCamera;
//# sourceMappingURL=LevelEventAdjustPlayerCamera.js.map
