"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAdjustPlayerCamera = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderUtil_1 = require("../../Render/Utils/RenderUtil"),
  ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  IMMEDIATELY_FADE_CAMERA_TIME = 0.1,
  noAimGameplayTag = -1036349300;
class LevelEventAdjustPlayerCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.yLe = void 0),
      (this.N4l = () => {
        this.FinishExecute(!0),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.AdjustCameraSync,
            this.N4l,
          ) &&
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AdjustCameraSync,
              this.N4l,
            );
      });
  }
  ExecuteNew(e, t) {
    const o = e;
    if (o)
      if (
        (Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 38, "进入相机调整"),
        this.ILe(o))
      ) {
        let r = !1;
        switch (o.Option.Type) {
          case IAction_1.EAdjustPlayerCamera.Horizontal:
            this.TLe(o, noAimGameplayTag),
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(
                o.Option.SplineEntityId,
                o.Option.YawAngle,
                o.Option.PitchAngle,
                o.Option.FadeInTime,
              ),
              void 0 !== o.Option.DepthOfField
                ? ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(
                    o.Option.DepthOfField.Fstop,
                    o.Option.DepthOfField.Distance,
                    o.Option.DepthOfField.BlurAmount,
                    o.Option.DepthOfField.BlurRadius,
                  )
                : ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitDepthOfField(),
              ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
                !1,
              ),
              RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
            break;
          case IAction_1.EAdjustPlayerCamera.Dialog:
            this.TLe(o, noAimGameplayTag);
            let e = o.Option.PitchAngle,
              t = (void 0 !== e && (e = -e), o.Option.YawAngle);
            void 0 !== t && (t += 180);
            var l = this.yLe.DefaultConfig.get(1);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(
              o.Option.CenterPos,
              e,
              t,
              l,
            );
            break;
          case IAction_1.EAdjustPlayerCamera.Fixed:
            this.TLe(o, noAimGameplayTag);
            var l = Vector_1.Vector.Create(),
              i = Rotator_1.Rotator.Create();
            l.Set(
              o.Option.CenterPos.X ?? 0,
              o.Option.CenterPos.Y ?? 0,
              o.Option.CenterPos.Z ?? 0,
            ),
              i.Set(
                o.Option.CenterRot.Y ?? 0,
                o.Option.CenterRot.Z ?? 0,
                o.Option.CenterRot.X ?? 0,
              ),
              ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(
                l,
                i,
                o.Option.Fov,
                o.Option.FadeInTime,
                o.Option.FadeOutTime,
                1,
                void 0,
                o.Option.BlendIn?.Type,
                o.Option.BlendIn?.BlendExp,
                o.Option.BlendOut?.Type,
                o.Option.BlendOut?.BlendExp,
              );
            break;
          case IAction_1.EAdjustPlayerCamera.Basic:
            o.Option.IsSynchronous &&
              ((r = !0),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AdjustCameraSync,
                this.N4l,
              )),
              this.TLe(o),
              o.Option.SightUi &&
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SetCameraAimVisible,
                  !0,
                  0,
                  o.Option.SightUi,
                );
            break;
          case IAction_1.EAdjustPlayerCamera.AxisLock:
            (l = o.Option.AxisRotate.Y ?? 0), (i = o.Option.AxisRotate.Z ?? 0);
            if (
              (this.yLe.DefaultConfig.set(45, l),
              this.yLe.DefaultConfig.set(46, l),
              this.yLe.DefaultConfig.set(60, i),
              this.yLe.DefaultConfig.set(61, i),
              o.Option.ScreenConfig)
            )
              if (
                Math.abs(
                  ControllerHolder_1.ControllerHolder.CameraController
                    .CameraRotator.Pitch - l,
                ) <= o.Option.ScreenConfig.TriggerAngle &&
                Math.abs(
                  ControllerHolder_1.ControllerHolder.CameraController
                    .CameraRotator.Yaw - i,
                ) <= o.Option.ScreenConfig.TriggerAngle
              )
                this.TLe(o, noAimGameplayTag);
              else {
                l = o.Option.ScreenConfig.FadeInTime;
                const a = o.Option.ScreenConfig.FadeOutTime;
                ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                  0,
                  3,
                  () => {
                    (this.yLe.FadeInTime = IMMEDIATELY_FADE_CAMERA_TIME),
                      this.TLe(o, noAimGameplayTag),
                      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                        0,
                        void 0,
                        a,
                      );
                  },
                  l,
                );
              }
            else this.TLe(o, noAimGameplayTag);
            break;
          case IAction_1.EAdjustPlayerCamera.FirstPerson:
            this.TLe(o, noAimGameplayTag),
              ControllerHolder_1.ControllerHolder.CameraController.SetFirstPersonEnable(
                !0,
              );
        }
        r || this.N4l();
      } else this.FinishExecute(!1);
    else this.FinishExecute(!1);
  }
  ILe(e) {
    var t,
      r =
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera
          .LogicComponent.CameraConfigController;
    return r
      ? ((t = e.Option.Type),
        (r = r.GetCameraConfigByTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t),
        ))
          ? (((this.yLe = r).Priority = e.Option.Priority),
            (r.FadeInTime = e.Option.FadeInTime),
            (r.FadeOutTime = e.Option.FadeOutTime),
            e.Option.FadeInCurve
              ? (r.FadeInCurve =
                  ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
                    e.Option.FadeInCurve,
                  ))
              : (r.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
            e.Option.FadeOutCurve
              ? (r.FadeOutCurve =
                  ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(
                    e.Option.FadeOutCurve,
                  ))
              : (r.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurve(0)),
            e.Option.ArmLength && 0 !== e.Option.ArmLength
              ? r.DefaultConfig.set(1, e.Option.ArmLength)
              : r.DefaultConfig.delete(1),
            e.Option.MinumArmLength && 0 !== e.Option.MinumArmLength
              ? r.DefaultConfig.set(2, e.Option.MinumArmLength)
              : r.DefaultConfig.delete(2),
            e.Option.MaxiumArmLength && 0 !== e.Option.MaxiumArmLength
              ? r.DefaultConfig.set(3, e.Option.MaxiumArmLength)
              : r.DefaultConfig.delete(3),
            e.Option.Offset.X && 0 !== e.Option.Offset.X
              ? r.DefaultConfig.set(6, e.Option.Offset.X)
              : r.DefaultConfig.delete(6),
            e.Option.Offset.Y && 0 !== e.Option.Offset.Y
              ? r.DefaultConfig.set(7, e.Option.Offset.Y)
              : r.DefaultConfig.delete(7),
            e.Option.Offset.Z && 0 !== e.Option.Offset.Z
              ? r.DefaultConfig.set(8, e.Option.Offset.Z)
              : r.DefaultConfig.delete(8),
            e.Option.Fov && 0 !== e.Option.Fov
              ? r.DefaultConfig.set(5, e.Option.Fov)
              : r.DefaultConfig.delete(5),
            void 0 === e.Option.IsDisableResetFocus
              ? r.DefaultConfig.delete(56)
              : r.DefaultConfig.set(56, e.Option.IsDisableResetFocus ? 1 : 0),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 38, "没有找到对应Tag的镜头配置", [
                "tag",
                t,
              ]),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 38, "CameraConfigController不存在"),
        !1);
  }
  TLe(e, t = void 0) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent?.CameraConfigController.EnableHookConfig(
      e.Option.Type,
      t,
    ),
      Global_1.Global.BaseCharacter &&
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          Global_1.Global.BaseCharacter.EntityId,
        )
          ?.Entity?.GetComponent(61)
          ?.InterruptAutoMoving("进入相机调整AdjustPlayerCamera", !0);
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
