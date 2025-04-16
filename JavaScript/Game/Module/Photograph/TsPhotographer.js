"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPhotographer = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  PhotographController_1 = require("./PhotographController"),
  PhotographDefine_1 = require("./PhotographDefine"),
  CONFIG_PATH =
    "/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig",
  MOBILE_CONFIG_PATH =
    "/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile",
  MIN_DITHER = 0.01,
  HIDE_DISTANCE_OFFSET = 50;
class TsPhotographer extends UE.Actor {
  constructor() {
    super(...arguments),
      (this.CapsuleCollision = void 0),
      (this.CameraArm = void 0),
      (this.CameraActor = void 0),
      (this.RelativeVectorCache = void 0),
      (this.PlayerSourceLocation = void 0),
      (this.CameraInitializeTransform = void 0),
      (this.DefaultRotation = void 0),
      (this.SourceMaxPitch = 0),
      (this.SourceMinPitch = 0),
      (this.Character = void 0),
      (this.StartDitherValue = 0),
      (this.StartHidePitch = 0),
      (this.CompleteHidePitch = 0),
      (this.IsLoadingConfigCompleted = !1),
      (this.CurrentDither = 0),
      (this.PlayerLocation = void 0),
      (this.CameraLocation = void 0),
      (this.StartHideDistance = 0),
      (this.CompleteHideDistance = 0),
      (this.CameraUpAndDownMaxDistance = 0),
      (this.CameraLeftAndRightMaxDistance = 0),
      (this.CurCameraUpAndDownDistance = 0),
      (this.CurCameraLeftAndRightDistance = 0),
      (this.PitchInput = 0),
      (this.YawInput = 0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.TmpRotator2 = Rotator_1.Rotator.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.TmpQuat2 = Quat_1.Quat.Create()),
      (this.TmpQuat3 = Quat_1.Quat.Create()),
      (this.GravityQuat = Quat_1.Quat.Create()),
      (this.InverseGravityQuat = Quat_1.Quat.Create());
  }
  Constructor() {
    (this.CameraActor = void 0),
      (this.RelativeVectorCache = void 0),
      (this.PlayerSourceLocation = void 0),
      (this.CameraInitializeTransform = void 0),
      (this.DefaultRotation = void 0),
      (this.SourceMaxPitch = 0),
      (this.SourceMinPitch = 0),
      (this.Character = void 0),
      (this.StartDitherValue = 0),
      (this.StartHidePitch = 0),
      (this.CompleteHidePitch = 0),
      (this.IsLoadingConfigCompleted = !1),
      (this.CurrentDither = 0),
      (this.PlayerLocation = void 0),
      (this.CameraLocation = void 0),
      (this.StartHideDistance = 0),
      (this.CompleteHideDistance = 0),
      (this.PitchInput = 0),
      (this.YawInput = 0),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create()),
      (this.TmpRotator2 = Rotator_1.Rotator.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.TmpQuat2 = Quat_1.Quat.Create()),
      (this.TmpQuat3 = Quat_1.Quat.Create()),
      (this.GravityQuat = Quat_1.Quat.Create()),
      (this.InverseGravityQuat = Quat_1.Quat.Create());
  }
  Initialize() {
    (this.RelativeVectorCache = new UE.Vector()),
      (this.DefaultRotation = new UE.Rotator(0, 0, 0)),
      (this.CameraLocation = Vector_1.Vector.Create()),
      (this.PlayerLocation = Vector_1.Vector.Create()),
      (this.SourceMaxPitch =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CameraSourceMaxPitch",
        )),
      (this.SourceMinPitch =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CameraSourceMinPitch",
        )),
      (this.CameraUpAndDownMaxDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CameraUpAndDownDistance",
        )),
      (this.CameraLeftAndRightMaxDistance =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "CameraLeftAndRightDistance",
        )),
      (this.CurCameraUpAndDownDistance = 0),
      (this.CurCameraLeftAndRightDistance = 0),
      (this.CurrentDither = 0),
      (this.Character = Global_1.Global.BaseCharacter),
      this.PlayerLocation.FromUeVector(this.Character.D_K2_GetActorLocation()),
      GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(
        this.Character.CharacterActorComponent,
        this.GravityQuat,
      ),
      this.GravityQuat.Inverse(this.InverseGravityQuat),
      (this.IsLoadingConfigCompleted = !1);
    var t = Info_1.Info.IsMobilePlatform() ? MOBILE_CONFIG_PATH : CONFIG_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t,
      UE.BP_FightCameraConfig_C,
      (t) => {
        var t = t.基础,
          i = ((this.StartHidePitch = t.Get(42)), t.Get(40)),
          h = t.Get(41);
        (this.StartHideDistance = Math.max(i, h) + HIDE_DISTANCE_OFFSET),
          (this.CompleteHideDistance = Math.min(i, h) + HIDE_DISTANCE_OFFSET),
          (this.CompleteHidePitch = t.Get(43)),
          (this.StartDitherValue = t.Get(44)),
          (this.IsLoadingConfigCompleted = !0);
      },
    ),
      this.RefreshDitherEffect();
  }
  ReceiveDestroyed() {
    (this.Character = void 0), (this.IsLoadingConfigCompleted = !1);
  }
  ReceiveTick(t) {
    this.RefreshPlayerLocation(),
      this.RefreshDitherEffect(),
      this.RefreshCameraArm();
  }
  RefreshPlayerLocation() {
    this.PlayerLocation &&
      this.PlayerLocation.ToUeVector().Equals(
        this.Character.D_K2_GetActorLocation(),
        0.01,
      ) &&
      this.PlayerLocation.FromUeVector(this.Character.D_K2_GetActorLocation());
  }
  RefreshDitherEffect() {
    var t;
    this.IsLoadingConfigCompleted &&
      this.CameraActor &&
      this.CameraArm &&
      ((t = this.CameraActor.D_K2_GetActorLocation()),
      this.CameraLocation.FromUeVector(t),
      (t = Vector_1.Vector.Dist(this.PlayerLocation, this.CameraLocation)),
      (t = this.GetPlayerDither(t, this.GetArmPitch())),
      this.CurrentDither !== t) &&
      ((this.CurrentDither = t), this.Character.SetDitherEffect(t, 1));
  }
  RefreshCameraArm() {
    var t;
    (0 === this.PitchInput && 0 === this.YawInput) ||
      (this.TmpRotator.DeepCopy(
        this.CapsuleCollision.K2_GetComponentRotation(),
      ),
      this.TmpRotator.Quaternion(this.TmpQuat),
      (t = GravityUtils_1.GravityUtils.GetGravityUpForActor(
        Global_1.Global.BaseCharacter?.CharacterActorComponent,
      )),
      Quat_1.Quat.ConstructorByAxisAngle(
        t,
        this.YawInput * MathUtils_1.MathUtils.DegToRad,
        this.TmpQuat2,
      ),
      this.TmpQuat2.Multiply(this.TmpQuat, this.TmpQuat3),
      this.TmpQuat.DeepCopy(this.TmpQuat3),
      (t = this.GetArmPitch()),
      (t =
        MathUtils_1.MathUtils.Clamp(
          this.PitchInput + t,
          this.SourceMinPitch,
          this.SourceMaxPitch,
        ) - t),
      Math.abs(t) > MathUtils_1.MathUtils.SmallNumber &&
        (this.TmpRotator2.Set(t, 0, 0),
        this.TmpRotator2.Quaternion(this.TmpQuat2),
        this.TmpQuat.Multiply(this.TmpQuat2, this.TmpQuat3),
        this.TmpQuat.DeepCopy(this.TmpQuat3)),
      this.TmpQuat.Rotator(this.TmpRotator),
      this.CapsuleCollision.K2_SetRelativeRotation(
        this.TmpRotator.ToUeRotator(),
        !1,
        void 0,
        !1,
      ),
      (this.PitchInput = 0),
      (this.YawInput = 0));
  }
  GetArmPitch() {
    var t = GravityUtils_1.GravityUtils.GetGravityUpForActor(
      Global_1.Global.BaseCharacter?.CharacterActorComponent,
    );
    return (
      this.TmpVector.DeepCopy(this.CapsuleCollision.GetForwardVector()),
      Math.asin(this.TmpVector.DotProduct(t)) * MathUtils_1.MathUtils.RadToDeg
    );
  }
  GetPlayerDither(t, i) {
    let h = 1;
    t < this.StartHideDistance &&
      (h = MathUtils_1.MathUtils.RangeClamp(
        t,
        this.StartHideDistance,
        this.CompleteHideDistance,
        this.StartDitherValue,
        MIN_DITHER,
      ));
    t = MathUtils_1.MathUtils.WrapAngle(i);
    let s = 1;
    return (
      t > this.StartHidePitch &&
        (s = MathUtils_1.MathUtils.RangeClamp(
          t,
          this.StartHidePitch,
          this.CompleteHidePitch,
          this.StartDitherValue,
          MIN_DITHER,
        )),
      Math.min(h, s)
    );
  }
  SetPlayerSourceLocation(t) {
    this.PlayerSourceLocation = t;
  }
  SetCameraInitializeTransform(t) {
    this.CameraInitializeTransform = t;
  }
  GetCameraInitializeTransform() {
    return this.CameraInitializeTransform;
  }
  ActivateCamera(t) {
    t.K2_AttachToComponent(
      this.CameraArm,
      FNameUtil_1.FNameUtil.NONE,
      2,
      2,
      2,
      !1,
    ),
      (this.CameraActor = t),
      this.SetFov(PhotographDefine_1.DEFAULT_FOV);
  }
  DeactivateCamera() {
    this.CameraActor?.IsValid() && this.CameraActor.K2_DetachFromActor(1, 1, 1),
      (this.CameraActor = void 0);
  }
  SetCameraTransform(t) {
    var t = t.GetTranslation(),
      i = this.CameraActor.D_K2_GetActorLocation();
    (this.RelativeVectorCache.X = t.X - i.X),
      (this.RelativeVectorCache.Y = t.Y - i.Y),
      (this.RelativeVectorCache.Z = t.Z - i.Z),
      this.K2_AddActorWorldOffset(this.RelativeVectorCache, !1, void 0, !1);
  }
  MoveUp(t) {
    var i;
    Math.abs(this.CurCameraUpAndDownDistance + t) <
      this.CameraUpAndDownMaxDistance &&
      ((i = GravityUtils_1.GravityUtils.GetVectorInGravity(
        Vector_1.Vector.UpVectorProxy,
        this.GravityQuat,
        this.TmpVector,
      )),
      (this.CurCameraUpAndDownDistance += t),
      (i = i.Multiply(t, this.TmpVector)),
      GravityUtils_1.GravityUtils.GetVectorInNormal(
        i,
        this.InverseGravityQuat,
        this.TmpVector2,
      ),
      (this.CameraArm.SocketOffset = this.CameraArm.SocketOffset.op_Addition(
        this.TmpVector2.ToUeVectorOld(),
      )));
  }
  MoveRight(t) {
    var i;
    Math.abs(this.CurCameraLeftAndRightDistance + t) <
      this.CameraLeftAndRightMaxDistance &&
      ((i = GravityUtils_1.GravityUtils.GetVectorInGravity(
        Vector_1.Vector.RightVectorProxy,
        this.GravityQuat,
        this.TmpVector,
      )),
      (this.CurCameraLeftAndRightDistance += t),
      (i = i.Multiply(t, this.TmpVector)),
      GravityUtils_1.GravityUtils.GetVectorInNormal(
        i,
        this.InverseGravityQuat,
        this.TmpVector2,
      ),
      (this.CameraArm.SocketOffset = this.CameraArm.SocketOffset.op_Addition(
        this.TmpVector2.ToUeVectorOld(),
      )));
  }
  AddCameraArmPitchInput(t) {
    var i;
    0 === t ||
      ((i = this.CameraArm.GetTargetRotation().Pitch),
      0 < t && i <= this.SourceMinPitch) ||
      (t < 0 && i >= this.SourceMaxPitch) ||
      (this.PitchInput = t);
  }
  AddCameraArmYawInput(t) {
    0 !== t && (this.YawInput = t);
  }
  SetFov(t) {
    let i = 50;
    (i = PhotographController_1.PhotographController.CheckIfInEntityCamera()
      ? MathUtils_1.MathUtils.Clamp(
          t,
          PhotographController_1.PhotographController.MinFov
            ? PhotographController_1.PhotographController.MinFov.Value
            : PhotographDefine_1.MIN_FOV,
          PhotographController_1.PhotographController.MaxFov
            ? PhotographController_1.PhotographController.MaxFov.Value
            : PhotographDefine_1.MAX_FOV,
        )
      : MathUtils_1.MathUtils.Clamp(
          t,
          PhotographDefine_1.MIN_FOV,
          PhotographDefine_1.MAX_FOV,
        )),
      this.CameraActor.CameraComponent.SetFieldOfView(i);
  }
  GetFov() {
    return this.CameraActor.CameraComponent.FieldOfView;
  }
  ResetCamera() {
    this.CapsuleCollision.K2_SetRelativeRotation(
      this.DefaultRotation,
      !0,
      void 0,
      !1,
    ),
      this.D_K2_SetActorTransform(
        this.CameraInitializeTransform,
        !0,
        void 0,
        !1,
      ),
      this.D_K2_SetActorLocation(this.PlayerSourceLocation, !0, void 0, !1),
      this.SetFov(PhotographDefine_1.DEFAULT_FOV),
      (this.CameraArm.SocketOffset = Vector_1.Vector.ZeroVector),
      (this.CurCameraUpAndDownDistance = 0),
      (this.CurCameraLeftAndRightDistance = 0),
      (this.CurrentDither = 0),
      (this.PitchInput = 0),
      (this.YawInput = 0);
  }
  SetCameraLUT(t) {
    this.CameraActor &&
      (0 === t.length
        ? (this.CameraActor.CameraComponent.PostProcessSettings.bOverride_ColorGradingLUT =
            !1)
        : ((this.CameraActor.CameraComponent.PostProcessSettings.bOverride_ColorGradingLUT =
            !0),
          ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, (t) => {
            this.CameraActor.CameraComponent.PostProcessSettings.ColorGradingLUT =
              t;
          })));
  }
}
(exports.TsPhotographer = TsPhotographer), (exports.default = TsPhotographer);
//# sourceMappingURL=TsPhotographer.js.map
