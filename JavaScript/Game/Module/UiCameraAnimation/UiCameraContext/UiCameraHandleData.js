"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraHandleData = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraHandleData {
  constructor() {
    (this.DPo = void 0),
      (this.RPo = void 0),
      (this.UPo = void 0),
      (this.XAo = void 0),
      (this.APo = void 0),
      (this.PPo = void 0),
      (this.xPo = new UE.Vector()),
      (this.wPo = new Map()),
      (this.BPo = UE.NewArray(UE.Actor)),
      (this.bPo = void 0),
      (this.qPo = void 0),
      (this.GPo = new UE.Transform()),
      (this.NPo = Vector_1.Vector.Create()),
      (this.OPo = Vector_1.Vector.Create()),
      (this.kPo = Vector_1.Vector.Create()),
      (this.FPo = void 0),
      (this.VPo = void 0),
      (this.IsEmptyState = !1),
      (this.ReplaceCameraTag = void 0);
  }
  ToString() {
    return `UniqueId:${this.DPo},HandleName:${this.PPo},ViewName:` + this.RPo;
  }
  static NewByHandleName(t, i) {
    var e =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId(),
      r = new UiCameraHandleData();
    return (
      (r.UniqueId = e),
      (r.HandleName = t),
      i?.IsValid() && (r.APo = i),
      r.Refresh(),
      r
    );
  }
  static NewByView(t, i) {
    var e,
      r,
      a =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(
          t,
        );
    if (a)
      return (
        (e = UiManager_1.UiManager.GetViewByName(t)),
        ((r = new UiCameraHandleData()).UniqueId = e
          ? e.GetViewId()
          : UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId()),
        (r.HandleName = a.GetSourceHandleName()),
        (r.ViewName = t),
        (r.UiCameraMappingConfig = a.GetUiCameraMappingConfig()),
        (r.APo = i),
        r.Refresh(),
        r
      );
  }
  Reset() {
    (this.DPo = void 0),
      (this.RPo = void 0),
      (this.UPo = void 0),
      (this.PPo = void 0),
      (this.xPo = void 0),
      this.wPo.clear(),
      (this.bPo = void 0),
      (this.FPo = void 0),
      (this.VPo = void 0),
      this.BPo.Empty(),
      (this.XAo = void 0);
  }
  Refresh() {
    var t, i;
    (this.XAo =
      ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(
        this.HandleName,
      )),
      this.XAo &&
        ((i = this.XAo.TargetType),
        (this.IsEmptyState = this.XAo.IsEmptyState),
        (this.FPo =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActor(
            i,
          )),
        (this.VPo =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActorSkeletalMesh(
            i,
          )),
        (this.ReplaceCameraTag = this.XAo.ReplaceCameraTag),
        StringUtils_1.StringUtils.IsEmpty(this.ReplaceCameraTag)
          ? ((this.bPo = void 0), (this.qPo = void 0))
          : ((i = FNameUtil_1.FNameUtil.GetDynamicFName(this.ReplaceCameraTag)),
            (t = (0, puerts_1.$ref)(this.BPo)),
            UE.GameplayStatics.GetAllActorsOfClassWithTag(
              GlobalData_1.GlobalData.World,
              UE.CineCameraActor.StaticClass(),
              i,
              t,
            ),
            !(i = (0, puerts_1.$unref)(t)) ||
              i.Num() < 1 ||
              ((this.bPo = i.Get(0)),
              (this.qPo = this.bPo?.GetCineCameraComponent()))));
  }
  set UniqueId(t) {
    this.DPo = t;
  }
  get UniqueId() {
    return this.DPo;
  }
  set HandleName(t) {
    this.PPo = t;
  }
  get HandleName() {
    return this.PPo;
  }
  set ViewName(t) {
    this.RPo = t;
  }
  get ViewName() {
    return this.RPo;
  }
  set UiCameraMappingConfig(t) {
    this.UPo = t;
  }
  get UiCameraMappingConfig() {
    return this.UPo;
  }
  get ExternalTransform() {
    return this.APo;
  }
  GetHandleName() {
    return this.PPo;
  }
  IsEqual(t) {
    return (
      this.HandleName === t.HandleName &&
      this.ReplaceCameraTag === t.ReplaceCameraTag &&
      this.ViewName === t.ViewName &&
      this.UniqueId === t.UniqueId
    );
  }
  GetUiCameraAnimationConfig() {
    return this.XAo;
  }
  GetTargetActor() {
    return this.FPo;
  }
  GetTargetSkeletalMesh() {
    return this.VPo;
  }
  GetTargetSkeletalMeshTransform() {
    var t = this.GetTargetSkeletalMesh();
    if (t)
      return (
        this.GPo.SetLocation(t.K2_GetComponentLocation()),
        this.GPo.SetRotation(t.K2_GetComponentQuaternion()),
        this.GPo.SetScale3D(t.K2_GetComponentScale()),
        this.GPo
      );
  }
  GetTargetSkeletalMeshSocketTransform() {
    var t = this.GetUiCameraAnimationConfig(),
      t = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),
      i = this.GetTargetSkeletalMesh();
    if (i) return i.GetSocketTransform(t);
  }
  GetTargetArmLength() {
    var t, i;
    return this.bPo
      ? (t = this.GetTargetActor())?.IsValid() && this.XAo.bTargetActorAsCenter
        ? ((t = Vector_1.Vector.Create(t.K2_GetActorLocation())),
          (i = Vector_1.Vector.Create(this.bPo.K2_GetActorLocation())),
          Vector_1.Vector.Dist2D(t, i))
        : 0
      : this.GetUiCameraAnimationConfig().ArmLength;
  }
  GetTargetArmOffsetLocation() {
    return this.qPo
      ? Vector_1.Vector.ZeroVector
      : this.GetUiCameraAnimationConfig().ArmOffsetLocation;
  }
  GetTargetArmOffsetRotation() {
    if (this.bPo && this.XAo.bTargetActorAsCenter) {
      var t = this.GetTargetActor();
      if (t)
        return (
          (t = this.HPo(
            t.K2_GetActorLocation(),
            this.bPo.K2_GetActorLocation(),
            this.bPo.K2_GetActorRotation(),
          )),
          UE.KismetMathLibrary.FindLookAtRotation(
            this.bPo.K2_GetActorLocation(),
            t,
          )
        );
    }
    return this.GetUiCameraAnimationConfig().ArmOffsetRotation;
  }
  GetTargetArmCollisionTest() {
    return !this.bPo && this.GetUiCameraAnimationConfig().ArmCollisionTest;
  }
  GetTargetFieldOfView() {
    return this.qPo
      ? this.qPo.FieldOfView
      : this.GetUiCameraAnimationConfig().CameraFieldOfView;
  }
  GetTargetFocalDistance() {
    return this.qPo
      ? this.qPo.FocusSettings.ManualFocusDistance
      : this.GetUiCameraAnimationConfig().FocalDistance;
  }
  GetTargetAperture() {
    return this.qPo
      ? this.qPo.CurrentAperture
      : this.GetUiCameraAnimationConfig().Aperture;
  }
  GetDefaultLocation() {
    var t, i;
    return this.ExternalTransform
      ? this.ExternalTransform.GetLocation()
      : (t = this.GetUiCameraAnimationConfig())
        ? (3 === (i = t.TargetType) || 4 === i || 5 === i) &&
          RenderModuleController_1.RenderModuleController
            .DebugNewUiSceneWorkflow &&
          RenderModuleController_1.RenderModuleController
            .DebugInUiSceneRendering
          ? (((i = new UE.Vector()).X =
              t.Location.X +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.X),
            (i.Y =
              t.Location.Y +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.Y),
            (i.Z =
              t.Location.Z +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.Z),
            i)
          : t.Location
        : void 0;
  }
  HPo(t, i, e) {
    this.NPo.DeepCopy(t), this.OPo.DeepCopy(i);
    (t = Vector_1.Vector.Dist2D(this.NPo, this.OPo)),
      (i = e.Pitch),
      (e = MathCommon_1.MathCommon.WrapAngle(i)),
      (i = MathCommon_1.MathCommon.DegreeToRadian(e)),
      (e = t * Math.tan(i) + this.OPo.Z);
    return this.kPo.Set(this.NPo.X, this.NPo.Y, e), this.kPo.ToUeVector();
  }
  GetTargetLocation() {
    if (this.ExternalTransform) return this.ExternalTransform.GetLocation();
    var t = this.XAo?.ReplaceCameraTag;
    if (!StringUtils_1.StringUtils.IsEmpty(t))
      return this.bPo?.IsValid()
        ? (t = this.GetTargetActor())?.IsValid() &&
          this.XAo.bTargetActorAsCenter
          ? this.HPo(
              t.K2_GetActorLocation(),
              this.bPo.K2_GetActorLocation(),
              this.bPo.K2_GetActorRotation(),
            )
          : this.bPo.K2_GetActorLocation()
        : void 0;
    var i = this.GetDefaultLocation();
    switch (this.XAo.LocationType) {
      case 0:
        return i;
      case 1:
        var e,
          r = this.GetTargetSkeletalMeshTransform();
        return r
          ? (a = (e = this.GetTargetSkeletalMesh()).GetOwner())?.IsValid()
            ? a
                .K2_GetActorLocation()
                .Equals(
                  e.K2_GetComponentLocation(),
                  MathUtils_1.MathUtils.SmallNumber,
                )
              ? i
              : UE.KismetMathLibrary.TransformLocation(r, i)
            : void 0
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CameraAnimation",
                8,
                "播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画",
              )
            );
      case 2:
        var a = this.GetTargetSkeletalMeshSocketTransform();
        return a
          ? UE.KismetMathLibrary.TransformLocation(a, i)
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CameraAnimation",
                8,
                "播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画",
              )
            );
    }
  }
  GetDefaultRotation() {
    var t = this.ExternalTransform;
    if (t) return t.GetRotation().Rotator();
    t = this.GetUiCameraAnimationConfig();
    if (t) {
      if (this.bPo) return this.bPo.K2_GetActorRotation();
      if (!t.IsTrack) return t.Rotation;
      var i = CameraController_1.CameraController.CameraLocation;
      if (t.IsTrackWorldLocation) {
        var e = t.TrackLocation;
        const a = UE.KismetMathLibrary.FindLookAtRotation(i.ToUeVector(), e);
        return t.bOverrideTrackPitch && (a.Pitch = t.TrackPitchOverride), a;
      }
      e = this.GetTargetActor();
      if (!e) return t.Rotation;
      if (this.xPo) {
        var r = t.TrackLocation,
          e = e.K2_GetActorLocation();
        (this.xPo.X = e.X + r.X),
          (this.xPo.Y = e.Y + r.Y),
          (this.xPo.Z = e.Z + r.Z);
        const a = UE.KismetMathLibrary.FindLookAtRotation(
          i.ToUeVector(),
          this.xPo,
        );
        return t.bOverrideTrackPitch && (a.Pitch = t.TrackPitchOverride), a;
      }
    }
  }
  GetTargetRotation() {
    var t = this.ExternalTransform;
    if (t) return t.GetRotation().Rotator();
    t = this.XAo?.ReplaceCameraTag;
    if (!StringUtils_1.StringUtils.IsEmpty(t))
      return this.bPo?.IsValid()
        ? this.GetTargetActor()?.IsValid() && this.XAo.bTargetActorAsCenter
          ? Rotator_1.Rotator.ZeroRotator
          : this.bPo.K2_GetActorRotation()
        : void 0;
    var i = this.GetDefaultRotation();
    switch (this.XAo.RotationType) {
      case 0:
        return i;
      case 2:
        var e = this.GetTargetActor();
        return e
          ? ((e = e.GetTransform()),
            (r = Rotator_1.Rotator.Create(0, i.Yaw, 0)),
            UE.KismetMathLibrary.TransformRotation(e, r.ToUeRotator()))
          : i;
      case 1:
        e =
          CameraController_1.CameraController.FightCamera.GetComponent(5)
            .CameraRotation.Yaw;
        return Rotator_1.Rotator.Create(0, e, 0).ToUeRotator();
      case 3:
        var r = this.GetTargetActor();
        return r
          ? ((e = r.GetTransform()),
            (r = this.GetTargetSkeletalMesh())
              ? ((r = r.RelativeRotation),
                (r = Rotator_1.Rotator.Create(
                  r.Pitch + i.Pitch,
                  r.Yaw + i.Yaw,
                  r.Roll + i.Roll,
                )),
                UE.KismetMathLibrary.TransformRotation(e, r.ToUeRotator()))
              : void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "CameraAnimation",
                    8,
                    "播放Ui镜头获得对应相机旋转时，拿不到对应的Actor骨骼，不播放镜头动画",
                  )
                ))
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "CameraAnimation",
                8,
                "播放Ui镜头获得对应相机旋转时，拿不到对应的Actor，不播放镜头动画",
              )
            );
    }
  }
  GetTargetPostProcessBlendWeight() {
    return (this.qPo || this.GetUiCameraAnimationConfig())
      .PostProcessBlendWeight;
  }
  GetReplaceCameraActor() {
    return this.bPo;
  }
  GetReplaceCameraComponent() {
    return this.qPo;
  }
  CanApplyAnimationHandle() {
    var t = this.GetUiCameraAnimationConfig();
    if (!t) return !1;
    var i = t.TargetType,
      e = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),
      t = 2 === t.LocationType;
    if (2 === i || 1 === i) {
      if (!this.VPo) return !1;
      if (t) {
        if (FNameUtil_1.FNameUtil.IsEmpty(e)) return !1;
        if (!this.VPo.DoesSocketExist(e)) return !1;
      }
    }
    return !0;
  }
}
exports.UiCameraHandleData = UiCameraHandleData;
//# sourceMappingURL=UiCameraHandleData.js.map
