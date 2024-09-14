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
  ModelManager_1 = require("../../../Manager/ModelManager"),
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
  static NewByHandleName(t, e) {
    var i =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId(),
      r = new UiCameraHandleData();
    return (
      (r.UniqueId = i),
      (r.HandleName = t),
      e?.IsValid() && (r.APo = e),
      r.Refresh(),
      r
    );
  }
  static NewByView(t, e) {
    var i,
      r,
      a =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(
          t,
        );
    if (a)
      return (
        (i = UiManager_1.UiManager.GetViewByName(t)),
        ((r = new UiCameraHandleData()).UniqueId = i
          ? i.GetViewId()
          : UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId()),
        (r.HandleName = a.GetSourceHandleName()),
        (r.ViewName = t),
        (r.UiCameraMappingConfig = a.GetUiCameraMappingConfig()),
        (r.APo = e),
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
    var t, e;
    (this.XAo =
      ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(
        this.HandleName,
      )),
      this.XAo &&
        ((e = this.XAo.TargetType),
        (this.IsEmptyState = this.XAo.IsEmptyState),
        (this.FPo =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActor(
            e,
          )),
        (this.VPo =
          UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActorSkeletalMesh(
            e,
          )),
        (this.ReplaceCameraTag = this.XAo.ReplaceCameraTag),
        StringUtils_1.StringUtils.IsEmpty(this.ReplaceCameraTag)
          ? ((this.bPo = void 0), (this.qPo = void 0))
          : ((e = FNameUtil_1.FNameUtil.GetDynamicFName(this.ReplaceCameraTag)),
            (t = (0, puerts_1.$ref)(this.BPo)),
            UE.GameplayStatics.GetAllActorsOfClassWithTag(
              GlobalData_1.GlobalData.World,
              UE.CineCameraActor.StaticClass(),
              e,
              t,
            ),
            !(e = (0, puerts_1.$unref)(t)) ||
              e.Num() < 1 ||
              ((this.bPo = e.Get(0)),
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
      e = this.GetTargetSkeletalMesh();
    if (e) return e.GetSocketTransform(t);
  }
  GetTargetArmLength() {
    var t, e;
    return ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings()
      ? 0
      : this.bPo
        ? (t = this.GetTargetActor())?.IsValid() &&
          this.XAo.bTargetActorAsCenter
          ? ((t = Vector_1.Vector.Create(t.K2_GetActorLocation())),
            (e = Vector_1.Vector.Create(this.bPo.K2_GetActorLocation())),
            Vector_1.Vector.Dist2D(t, e))
          : 0
        : this.GetUiCameraAnimationConfig().ArmLength;
  }
  GetTargetArmOffsetLocation() {
    return ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings() ||
      this.qPo
      ? Vector_1.Vector.ZeroVector
      : this.GetUiCameraAnimationConfig().ArmOffsetLocation;
  }
  GetTargetArmOffsetRotation() {
    if (ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings())
      return Rotator_1.Rotator.ZeroRotator;
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
    return (
      !ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings() &&
      !this.bPo &&
      this.GetUiCameraAnimationConfig().ArmCollisionTest
    );
  }
  GetTargetFieldOfView() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    return t
      ? t.FieldOfView
      : this.qPo
        ? this.qPo.FieldOfView
        : this.GetUiCameraAnimationConfig().CameraFieldOfView;
  }
  GetTargetFocalDistance() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    return t
      ? t.FocusSettings.ManualFocusDistance
      : this.qPo
        ? this.qPo.FocusSettings.ManualFocusDistance
        : this.GetUiCameraAnimationConfig().FocalDistance;
  }
  GetTargetAperture() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    return t
      ? t.CurrentAperture
      : this.qPo
        ? this.qPo.CurrentAperture
        : this.GetUiCameraAnimationConfig().Aperture;
  }
  GetDefaultLocation() {
    var t, e;
    return this.ExternalTransform
      ? this.ExternalTransform.GetLocation()
      : (t = this.GetUiCameraAnimationConfig())
        ? (3 === (e = t.TargetType) || 4 === e || 5 === e) &&
          RenderModuleController_1.RenderModuleController
            .DebugNewUiSceneWorkflow &&
          RenderModuleController_1.RenderModuleController
            .DebugInUiSceneRendering
          ? (((e = new UE.Vector()).X =
              t.Location.X +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.X),
            (e.Y =
              t.Location.Y +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.Y),
            (e.Z =
              t.Location.Z +
              RenderModuleController_1.RenderModuleController
                .DebugUiSceneLoadOffset.Z),
            e)
          : t.Location
        : void 0;
  }
  HPo(t, e, i) {
    this.NPo.DeepCopy(t), this.OPo.DeepCopy(e);
    (t = Vector_1.Vector.Dist2D(this.NPo, this.OPo)),
      (e = i.Pitch),
      (i = MathCommon_1.MathCommon.WrapAngle(e)),
      (e = MathCommon_1.MathCommon.DegreeToRadian(i)),
      (i = t * Math.tan(e) + this.OPo.Z);
    return this.kPo.Set(this.NPo.X, this.NPo.Y, i), this.kPo.ToUeVector();
  }
  GetTargetLocation() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) return t.CameraLocation;
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
    var e = this.GetDefaultLocation();
    switch (this.XAo.LocationType) {
      case 0:
        return e;
      case 1:
        var i,
          r = this.GetTargetSkeletalMeshTransform();
        return r
          ? (a = (i = this.GetTargetSkeletalMesh()).GetOwner())?.IsValid()
            ? a
                .K2_GetActorLocation()
                .Equals(
                  i.K2_GetComponentLocation(),
                  MathUtils_1.MathUtils.SmallNumber,
                )
              ? e
              : UE.KismetMathLibrary.TransformLocation(r, e)
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
          ? UE.KismetMathLibrary.TransformLocation(a, e)
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
      var e = CameraController_1.CameraController.CameraLocation;
      if (t.IsTrackWorldLocation) {
        var i = t.TrackLocation;
        const a = UE.KismetMathLibrary.FindLookAtRotation(e.ToUeVector(), i);
        return t.bOverrideTrackPitch && (a.Pitch = t.TrackPitchOverride), a;
      }
      i = this.GetTargetActor();
      if (!i) return t.Rotation;
      if (this.xPo) {
        var r = t.TrackLocation,
          i = i.K2_GetActorLocation();
        (this.xPo.X = i.X + r.X),
          (this.xPo.Y = i.Y + r.Y),
          (this.xPo.Z = i.Z + r.Z);
        const a = UE.KismetMathLibrary.FindLookAtRotation(
          e.ToUeVector(),
          this.xPo,
        );
        return t.bOverrideTrackPitch && (a.Pitch = t.TrackPitchOverride), a;
      }
    }
  }
  GetTargetRotation() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) return t.CameraRotation;
    t = this.ExternalTransform;
    if (t) return t.GetRotation().Rotator();
    t = this.XAo?.ReplaceCameraTag;
    if (!StringUtils_1.StringUtils.IsEmpty(t))
      return this.bPo?.IsValid()
        ? this.GetTargetActor()?.IsValid() && this.XAo.bTargetActorAsCenter
          ? Rotator_1.Rotator.ZeroRotator
          : this.bPo.K2_GetActorRotation()
        : void 0;
    var e = this.GetDefaultRotation();
    switch (this.XAo.RotationType) {
      case 0:
        return e;
      case 2:
        var i = this.GetTargetActor();
        return i
          ? ((i = i.GetTransform()),
            (r = Rotator_1.Rotator.Create(0, e.Yaw, 0)),
            UE.KismetMathLibrary.TransformRotation(i, r.ToUeRotator()))
          : e;
      case 1:
        i =
          CameraController_1.CameraController.FightCamera.GetComponent(5)
            .CameraRotation.Yaw;
        return Rotator_1.Rotator.Create(0, i, 0).ToUeRotator();
      case 3:
        var r = this.GetTargetActor();
        return r
          ? ((i = r.GetTransform()),
            (r = this.GetTargetSkeletalMesh())
              ? ((r = r.RelativeRotation),
                (r = Rotator_1.Rotator.Create(
                  r.Pitch + e.Pitch,
                  r.Yaw + e.Yaw,
                  r.Roll + e.Roll,
                )),
                UE.KismetMathLibrary.TransformRotation(i, r.ToUeRotator()))
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
    var e = t.TargetType,
      i = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),
      t = 2 === t.LocationType;
    if (2 === e || 1 === e) {
      if (!this.VPo) return !1;
      if (t) {
        if (FNameUtil_1.FNameUtil.IsEmpty(i)) return !1;
        if (!this.VPo.DoesSocketExist(i)) return !1;
      }
    }
    return !0;
  }
}
exports.UiCameraHandleData = UiCameraHandleData;
//# sourceMappingURL=UiCameraHandleData.js.map
