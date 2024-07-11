"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimationHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiCameraAnimationManager_1 = require("./UiCameraAnimationManager"),
  UiCameraLoadingAnimation_1 = require("./UiCameraLoadingAnimation");
class UiCameraAnimationHandle {
  constructor() {
    (this.JUo = void 0),
      (this.zUo = void 0),
      (this.iRo = !1),
      (this.ZUo = void 0),
      (this.eAo = void 0),
      (this.IsViewInLoading = !1),
      (this.tAo = !1),
      (this.iAo = !1),
      (this.oAo = () => {
        this.rAo();
      });
  }
  Initialize() {
    (this.eAo = new UiCameraLoadingAnimation_1.UiCameraLoadingAnimation()),
      this.eAo.Initialize(),
      (this.iRo = !1);
  }
  Reset() {
    this.Deactivate(),
      (this.zUo = void 0),
      (this.JUo = void 0),
      (this.eAo = void 0),
      (this.IsViewInLoading = !1),
      (this.tAo = !1),
      (this.ZUo = void 0);
  }
  Tick(i) {
    this.eAo?.Tick(i);
  }
  SetHandleData(i) {
    this.zUo = i;
  }
  Activate(i, a = !0, e = !0) {
    (this.zUo = i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("CameraAnimation", 8, "激活界面镜头状态", [
          "HandleData",
          this.zUo.ToString(),
        ]);
    var t,
      n,
      r = this.zUo.GetUiCameraAnimationConfig();
    r
      ? i.IsEmptyState
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "激活界面镜头状态时，激活了一个空状态",
              ["HandleData", this.zUo.ToString()],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
            i,
          ))
        : ((this.JUo = r),
          (this.iAo = !1),
          2 ===
          (n = this.nAo(
            r.BlendInCameraSequence,
            r.BlendInCameraSequencePlayRate,
            r.bRevertBlendInCameraSequence,
            () => {
              (this.iAo = !1),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnUiBlendInCameraSequenceFinished,
                  i,
                );
            },
          ))
            ? ((this.iAo = !1),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "激活界面镜头状态时，填了BlendInCameraSequence，但是目标Actor无法找到，直接休眠UI相机状态",
                  ["HandleData", this.zUo.ToString()],
                ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
                this.zUo,
              ),
              this.Deactivate())
            : 0 === n
              ? ((this.iAo = !0),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "CameraAnimation",
                    8,
                    "激活界面镜头状态时，填了BlendInCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
                    ["HandleData", this.zUo.ToString()],
                  ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
                  i,
                ))
              : UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera
                ? ((this.tAo = !1),
                  (n = this.zUo.GetTargetLocation()),
                  (t = this.zUo.GetTargetRotation()),
                  n && t
                    ? (this.StopSequence(),
                      this.SetUiCameraAnimationRotation(t),
                      this.SetUiCameraAnimationLocation(n),
                      this.SetSpringArmLength(this.zUo.GetTargetArmLength()),
                      this.SetSpringArmRelativeLocation(
                        this.zUo.GetTargetArmOffsetLocation(),
                      ),
                      this.SetSprintArmRelativeRotation(
                        this.zUo.GetTargetArmOffsetRotation(),
                      ),
                      this.sAo(this.zUo.GetTargetArmCollisionTest()),
                      this.SetCameraFieldOfView(
                        this.zUo.GetTargetFieldOfView(),
                      ),
                      this.SetCameraPostProcessBlendWeight(
                        this.zUo.GetTargetPostProcessBlendWeight(),
                      ),
                      this.SetWidgetCameraAttachToAnimationActor(),
                      UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
                        a ? r.BlendInTime : 0,
                        r.BlendInFunction,
                        r.BlendInExp,
                      ),
                      this.JUo.bResetCameraTransform &&
                        UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation(),
                      (t = this.zUo.ViewName),
                      (n = this.zUo.UiCameraMappingConfig),
                      t &&
                      UiManager_1.UiManager.IsViewCreating(t) &&
                      n?.bPlayLoadingCameraAnimation
                        ? (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "CameraAnimation",
                              8,
                              "激活界面镜头状态时，当前界面在加载中，过渡到模糊镜头效果",
                              ["HandleData", this.zUo.ToString()],
                            ),
                          this.eAo.Play(
                            UiCameraAnimationManager_1.UiCameraAnimationManager
                              .LoadingViewCameraAnimationLength,
                            UiCameraAnimationManager_1.UiCameraAnimationManager
                              .LoadingViewManualFocusDistance,
                            UiCameraAnimationManager_1.UiCameraAnimationManager
                              .LoadingViewAperture,
                          ),
                          (this.IsViewInLoading = !0))
                        : (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "CameraAnimation",
                              8,
                              "激活界面镜头状态时，当前界面不在加载中，所以停止模糊效果",
                              ["HandleData", this.zUo.ToString()],
                            ),
                          (this.IsViewInLoading = !1),
                          this.eAo.Stop(),
                          this.SetCameraFocalDistance(
                            this.zUo.GetTargetFocalDistance(),
                          ),
                          this.SetCameraAperture(this.zUo.GetTargetAperture()),
                          e &&
                            this.aAo(
                              r.BlendInSequence,
                              r.BlendInPlayRate,
                              r.bBlendInSequenceReverse,
                            )),
                      (this.iRo = !0),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName
                          .OnActivateUiCameraAnimationHandle,
                        i,
                      ))
                    : (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "CameraAnimation",
                          8,
                          "激活界面镜头状态时，找不到对应位置或旋转，可能是对应目标无法找到",
                          ["HandleData", this.zUo.ToString()],
                          ["ReplaceCameraTag", this.zUo.ReplaceCameraTag],
                          [
                            "ReplaceCameraIsValid",
                            this.zUo.GetReplaceCameraActor()?.IsValid(),
                          ],
                        ),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName
                          .OnActivateUiCameraAnimationHandleFail,
                        this.zUo,
                      ),
                      this.Deactivate()))
                : (EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .OnActivateUiCameraAnimationHandleFail,
                    this.zUo,
                  ),
                  this.Deactivate()))
      : EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
          this.zUo,
        );
  }
  Deactivate() {
    this.iRo && (this.eAo?.IsPlaying && this.eAo.Stop(), (this.iRo = !1));
  }
  GetHandleData() {
    return this.zUo;
  }
  GetIsActivate() {
    return this.iRo;
  }
  Revert(i = !0, a = void 0) {
    var e,
      t,
      n,
      r,
      s,
      m,
      o = this.zUo.GetUiCameraAnimationConfig();
    o
      ? ((e = (this.JUo = o).BlendOutCameraSequence),
        (t = o.BlendOutCameraSequencePlayRate),
        (o = o.bRevertBlendOutCameraSequence),
        (this.ZUo = a),
        0 ===
        this.nAo(e, t, o, () => {
          this.rAo();
        })
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "还原界面镜头状态时，填了BlendOutCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
              ["HandleData", this.zUo.ToString()],
            )
          : ((e = this.JUo.BlendOutTime),
            (t = this.JUo.BlendOutFunction),
            (o = this.JUo.BlendOutExp),
            (n = this.JUo.bResetCameraTransform),
            (r = this.JUo.BlendOutSequence),
            (s = this.JUo.bBlendOutSequenceReverse),
            (m = this.JUo.BlendOutPlayRate),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("CameraAnimation", 8, "还原镜头至战斗镜头", [
                "HandleData",
                this.zUo.ToString(),
              ]),
            n &&
              UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Exit(
              e,
              t,
              o,
            ),
            (this.tAo = !0),
            i && UE.KismetSystemLibrary.IsValidSoftObjectReference(r)
              ? this.aAo(r, m, s).then(
                  () => {
                    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(
                      this.oAo,
                    );
                  },
                  () => {},
                )
              : this.rAo()))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CameraAnimation",
            8,
            "找不到镜头配置，强制还原镜头至战斗镜头",
            ["HandleData", this.zUo.ToString()],
          ),
        a && a(),
        this.Reset());
  }
  rAo() {
    this.zUo
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "界面镜头状态 Revert(BlendOut) 完成",
            ["HandleData", this.zUo.ToString()],
          ),
        this.ZUo && this.ZUo(),
        this.Reset())
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "界面镜头状态 Revert(BlendOut) 完成时已被重置",
        );
  }
  GetIsPendingRevert() {
    return this.tAo;
  }
  StopSequence() {
    UiCameraAnimationManager_1.UiCameraAnimationManager
      .UiCameraSequenceComponent &&
      UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.DestroyUiCameraSequence(
        !0,
        1,
      );
  }
  GetViewName() {
    return this.zUo?.ViewName;
  }
  GetIsPlayingBlendInSequence() {
    return this.iAo;
  }
  get GetUiCameraAnimationActor() {
    return UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.GetOwnActor();
  }
  nAo(i, a, e, t) {
    var n;
    return UE.KismetSystemLibrary.IsValidSoftObjectReference(i)
      ? (n = this.zUo.GetTargetActor())?.IsValid()
        ? (this.SetWidgetCameraDetachFromAnimationActor(),
          this.aAo(i, a, e, n).then(
            () => {
              var i = this.zUo.GetUiCameraAnimationConfig();
              UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
                i.BlendInTime,
                i.BlendInFunction,
                i.BlendInExp,
              );
            },
            () => {},
          ),
          UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(
            t,
          ),
          0)
        : 2
      : 1;
  }
  SetUiCameraAnimationLocation(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorLocation(
      i,
    );
  }
  SetUiCameraAnimationRelativeLocation(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRelativeLocation(
      i,
    );
  }
  SetUiCameraAnimationRotation(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRotation(
      i,
    );
  }
  SetSpringArmLength(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmLength(
      i,
    );
  }
  SetSprintArmRelativeRotation(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSprintArmRelativeRotation(
      i,
    );
  }
  SetSpringArmRelativeLocation(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmRelativeLocation(
      i,
    );
  }
  sAo(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCollisionTest(
      i,
    );
  }
  SetCameraFieldOfView(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFieldOfView(
      i,
    );
  }
  SetCameraFocalDistance(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFocalDistance(
      i,
    );
  }
  SetCameraAperture(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraAperture(
      i,
    );
  }
  SetCameraPostProcessBlendWeight(i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraPostProcessBlendWeight(
      i,
    );
  }
  SetWidgetCameraAttachToAnimationActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorAttachToSpringActor(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCameraActorRelativeLocation(
        Vector_1.Vector.ZeroVector,
      );
  }
  SetWidgetCameraDetachFromAnimationActor() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.CameraActorDetachFromSpringActor();
  }
  async aAo(i, a, e, t) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(i))
      return (
        this.StopSequence(),
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.LoadAndPlayUiCameraSequence(
          i,
          a,
          e,
          t,
        )
      );
  }
}
exports.UiCameraAnimationHandle = UiCameraAnimationHandle;
//# sourceMappingURL=UiCameraAnimationHandle.js.map
