"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimationHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiCameraAnimationManager_1 = require("./UiCameraAnimationManager"),
  UiCameraLoadingAnimation_1 = require("./UiCameraLoadingAnimation");
class UiCameraAnimationHandle {
  constructor() {
    (this.XAo = void 0),
      (this.$Ao = void 0),
      (this.ZRo = !1),
      (this.YAo = void 0),
      (this.JAo = void 0),
      (this.IsViewInLoading = !1),
      (this.zAo = !1),
      (this.ZAo = !1),
      (this.ePo = () => {
        this.tPo();
      });
  }
  Initialize() {
    (this.JAo = new UiCameraLoadingAnimation_1.UiCameraLoadingAnimation()),
      this.JAo.Initialize(),
      (this.ZRo = !1);
  }
  Reset() {
    this.Deactivate(),
      (this.$Ao = void 0),
      (this.XAo = void 0),
      (this.JAo = void 0),
      (this.IsViewInLoading = !1),
      (this.zAo = !1),
      (this.YAo = void 0);
  }
  Tick(a) {
    this.JAo?.Tick(a);
  }
  SetHandleData(a) {
    this.$Ao = a;
  }
  Activate(a, i = !0, e = !0) {
    (this.$Ao = a),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("CameraAnimation", 8, "激活界面镜头状态", [
          "HandleData",
          this.$Ao.ToString(),
        ]);
    var t = this.$Ao.GetUiCameraAnimationConfig();
    if (t)
      if (a.IsEmptyState)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "激活界面镜头状态时，激活了一个空状态",
            ["HandleData", this.$Ao.ToString()],
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
            a,
          );
      else {
        (this.XAo = t), (this.ZAo = !1);
        var n = this.iPo(
          t.BlendInCameraSequence,
          t.BlendInCameraSequencePlayRate,
          t.bRevertBlendInCameraSequence,
          () => {
            (this.ZAo = !1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnUiBlendInCameraSequenceFinished,
                a,
              );
          },
        );
        if (2 === n)
          (this.ZAo = !1),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "激活界面镜头状态时，填了BlendInCameraSequence，但是目标Actor无法找到，直接休眠UI相机状态",
                ["HandleData", this.$Ao.ToString()],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
              this.$Ao,
            ),
            this.Deactivate();
        else if (0 === n)
          (this.ZAo = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "激活界面镜头状态时，填了BlendInCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
                ["HandleData", this.$Ao.ToString()],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
              a,
            );
        else if (UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera) {
          this.zAo = !1;
          var n = this.$Ao.GetTargetLocation(),
            r = this.$Ao.GetTargetRotation();
          if (n && r) {
            this.StopSequence(),
              this.SetUiCameraAnimationRotation(r),
              this.SetUiCameraAnimationLocation(n),
              this.SetSpringArmLength(this.$Ao.GetTargetArmLength()),
              this.SetSpringArmRelativeLocation(
                this.$Ao.GetTargetArmOffsetLocation(),
              ),
              this.SetSprintArmRelativeRotation(
                this.$Ao.GetTargetArmOffsetRotation(),
              ),
              this.oPo(this.$Ao.GetTargetArmCollisionTest()),
              this.SetCameraFieldOfView(this.$Ao.GetTargetFieldOfView()),
              this.SetCameraPostProcessBlendWeight(
                this.$Ao.GetTargetPostProcessBlendWeight(),
              ),
              this.SetWidgetCameraAttachToAnimationActor(),
              UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
                i ? t.BlendInTime : 0,
                t.BlendInFunction,
                t.BlendInExp,
              );
            this.XAo.bResetCameraTransform &&
              UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation();
            (r = this.$Ao.ViewName), (n = this.$Ao.UiCameraMappingConfig);
            if (
              r &&
              UiManager_1.UiManager.IsViewCreating(r) &&
              n?.bPlayLoadingCameraAnimation
            )
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "激活界面镜头状态时，当前界面在加载中，过渡到模糊镜头效果",
                  ["HandleData", this.$Ao.ToString()],
                ),
                this.JAo.Play(
                  UiCameraAnimationManager_1.UiCameraAnimationManager
                    .LoadingViewCameraAnimationLength,
                  UiCameraAnimationManager_1.UiCameraAnimationManager
                    .LoadingViewManualFocusDistance,
                  UiCameraAnimationManager_1.UiCameraAnimationManager
                    .LoadingViewAperture,
                ),
                (this.IsViewInLoading = !0);
            else {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "CameraAnimation",
                  8,
                  "激活界面镜头状态时，当前界面不在加载中，所以停止模糊效果",
                  ["HandleData", this.$Ao.ToString()],
                ),
                (this.IsViewInLoading = !1),
                this.JAo.Stop();
              const s = ModelManager_1.ModelManager.CameraModel,
                m = s.GetSavedSeqCameraThings();
              m ||
                this.SetCameraFocalDistance(this.$Ao.GetTargetFocalDistance()),
                this.SetCameraAperture(this.$Ao.GetTargetAperture()),
                e &&
                  this.rPo(
                    t.BlendInSequence,
                    t.BlendInPlayRate,
                    t.bBlendInSequenceReverse,
                  );
            }
            this.ZRo = !0;
            const s = ModelManager_1.ModelManager.CameraModel,
              m = s.GetSavedSeqCameraThings();
            m && s.ResetSavedSeqCameraThings(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnActivateUiCameraAnimationHandle,
                a,
              );
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "CameraAnimation",
                8,
                "激活界面镜头状态时，找不到对应位置或旋转，可能是对应目标无法找到",
                ["HandleData", this.$Ao.ToString()],
                ["ReplaceCameraTag", this.$Ao.ReplaceCameraTag],
                [
                  "ReplaceCameraIsValid",
                  this.$Ao.GetReplaceCameraActor()?.IsValid(),
                ],
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
                this.$Ao,
              ),
              this.Deactivate();
        } else
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
            this.$Ao,
          ),
            this.Deactivate();
      }
    else
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnActivateUiCameraAnimationHandleFail,
        this.$Ao,
      );
  }
  Deactivate() {
    this.ZRo && (this.JAo?.IsPlaying && this.JAo.Stop(), (this.ZRo = !1));
  }
  GetHandleData() {
    return this.$Ao;
  }
  GetIsActivate() {
    return this.ZRo;
  }
  Revert(a = !0, i = void 0) {
    var e,
      t,
      n,
      r,
      s,
      m,
      o = this.$Ao.GetUiCameraAnimationConfig();
    o
      ? ((e = (this.XAo = o).BlendOutCameraSequence),
        (t = o.BlendOutCameraSequencePlayRate),
        (o = o.bRevertBlendOutCameraSequence),
        (this.YAo = i),
        0 ===
        this.iPo(e, t, o, () => {
          this.tPo();
        })
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "CameraAnimation",
              8,
              "还原界面镜头状态时，填了BlendOutCameraSequence，会直接播放Sequence而不会进行其他线性变化计算",
              ["HandleData", this.$Ao.ToString()],
            )
          : ((e = this.XAo.BlendOutTime),
            (t = this.XAo.BlendOutFunction),
            (o = this.XAo.BlendOutExp),
            (n = this.XAo.bResetCameraTransform),
            (r = this.XAo.BlendOutSequence),
            (s = this.XAo.bBlendOutSequenceReverse),
            (m = this.XAo.BlendOutPlayRate),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("CameraAnimation", 8, "还原镜头至战斗镜头", [
                "HandleData",
                this.$Ao.ToString(),
              ]),
            n &&
              UiCameraAnimationManager_1.UiCameraAnimationManager.ResetFightCameraRotation(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Exit(
              e,
              t,
              o,
            ),
            (this.zAo = !0),
            a && UE.KismetSystemLibrary.IsValidSoftObjectReference(r)
              ? this.rPo(r, m, s).then(
                  () => {
                    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.AddUiCameraSequenceFinishedCallback(
                      this.ePo,
                    );
                  },
                  () => {},
                )
              : this.tPo()))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CameraAnimation",
            8,
            "找不到镜头配置，强制还原镜头至战斗镜头",
            ["HandleData", this.$Ao.ToString()],
          ),
        i && i(),
        this.Reset());
  }
  tPo() {
    this.$Ao
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "界面镜头状态 Revert(BlendOut) 完成",
            ["HandleData", this.$Ao.ToString()],
          ),
        this.YAo && this.YAo(),
        this.Reset())
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "界面镜头状态 Revert(BlendOut) 完成时已被重置",
        );
  }
  GetIsPendingRevert() {
    return this.zAo;
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
    return this.$Ao?.ViewName;
  }
  GetIsPlayingBlendInSequence() {
    return this.ZAo;
  }
  get GetUiCameraAnimationActor() {
    return UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.GetOwnActor();
  }
  iPo(a, i, e, t) {
    var n;
    return UE.KismetSystemLibrary.IsValidSoftObjectReference(a)
      ? (n = this.$Ao.GetTargetActor())?.IsValid()
        ? (this.SetWidgetCameraDetachFromAnimationActor(),
          this.rPo(a, i, e, n).then(
            () => {
              var a = this.$Ao.GetUiCameraAnimationConfig();
              UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera.Enter(
                a.BlendInTime,
                a.BlendInFunction,
                a.BlendInExp,
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
  SetUiCameraAnimationLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorLocation(
      a,
    );
  }
  SetUiCameraAnimationRelativeLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRelativeLocation(
      a,
    );
  }
  SetUiCameraAnimationRotation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetActorRotation(
      a,
    );
  }
  SetSpringArmLength(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmLength(
      a,
    );
  }
  SetSprintArmRelativeRotation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSprintArmRelativeRotation(
      a,
    );
  }
  SetSpringArmRelativeLocation(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetSpringArmRelativeLocation(
      a,
    );
  }
  oPo(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSpringStructure.SetCollisionTest(
      a,
    );
  }
  SetCameraFieldOfView(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFieldOfView(
      a,
    );
  }
  SetCameraFocalDistance(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraFocalDistance(
      a,
    );
  }
  SetCameraCurrentFocalLength(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraCurrentFocalLength(
      a,
    );
  }
  SetCameraAperture(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraAperture(
      a,
    );
  }
  SetCameraPostProcessBlendWeight(a) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraPostEffectComponent.SetCameraPostProcessBlendWeight(
      a,
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
  async rPo(a, i, e, t) {
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a))
      return (
        this.StopSequence(),
        UiCameraAnimationManager_1.UiCameraAnimationManager.UiCameraSequenceComponent.LoadAndPlayUiCameraSequence(
          a,
          i,
          e,
          t,
        )
      );
  }
}
exports.UiCameraAnimationHandle = UiCameraAnimationHandle;
//# sourceMappingURL=UiCameraAnimationHandle.js.map
