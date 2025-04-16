"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraUtility = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  TsAiController_1 = require("../AI/Controller/TsAiController"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  ActorUtils_1 = require("../Utils/ActorUtils"),
  GravityUtils_1 = require("../Utils/GravityUtils"),
  CameraModel_1 = require("./CameraModel"),
  PROFILE_KEY = "CameraUtility_CheckCollision_Camera",
  RESET_FOCUS_TIME = 0.6,
  PITCH_LIMIT_VALUE = 89.9;
class CameraUtility {
  static GetSocketLocation(t, a, e, r = void 0) {
    let i = void 0,
      s = void 0;
    if (t) (i = t), (s = r || ActorUtils_1.ActorUtils.GetEntityByActor(t));
    else {
      if (!r) return void e.Reset();
      if (!(i = r.Entity.GetComponent(1)?.Owner)) return void e.Reset();
      s = r;
    }
    if (this.khe(s))
      return (t = i).Mesh && a?.toString()
        ? void e.FromUeVector(t.Mesh.D_GetSocketLocation(a))
        : void s.Entity.GetComponent(175).GetCameraPosition(e);
    s.Valid && e.DeepCopy(s.Entity.GetComponent(1).ActorLocationProxy);
  }
  static khe(t) {
    return (
      !!t?.Valid &&
      ((t = t.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.kks.Proto_Monster ||
        t === Protocol_1.Aki.Protocol.kks.Proto_Npc ||
        t === Protocol_1.Aki.Protocol.kks.Proto_Player ||
        t === Protocol_1.Aki.Protocol.kks.Proto_Vision)
    );
  }
  static GetRootTransform(t) {
    return t?.Mesh
      ? t.Mesh.D_GetSocketTransform(this.Root)
      : new UE.TransformDouble();
  }
  static TargetCanBeSelect(t) {
    return !(
      !t.Valid ||
      !t.Active ||
      ((t = t.Entity.GetComponent(203)) &&
        (t.HasTag(1008164187) || t.HasTag(-1243968098)))
    );
  }
  static GetCameraTargetEntityHandle() {
    var t = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (t.Valid) {
      t = t.CharacterEntityHandle;
      if (t?.Valid) return t;
    }
  }
  static GetCameraLockOnTargetEntityHandle() {
    var t = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (t.Valid) {
      t = t.TargetEntity;
      if (t?.Valid) return t;
    }
  }
  static GetCameraCharacterRotation(t) {
    t.Reset();
    var a =
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    a?.Valid &&
      a?.Character?.CharacterActorComponent &&
      t.DeepCopy(a.Character.CharacterActorComponent.ActorRotationProxy);
  }
  static GetPlayerTargetAndCameraYawOffset() {
    var t =
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (
      !t?.Valid ||
      !t?.TargetEntity?.Valid ||
      !t?.Character?.CharacterActorComponent
    )
      return 0;
    this.GetSocketLocation(void 0, t.TargetSocketName, this.cz, t.TargetEntity),
      this.cz.SubtractionEqual(
        t.Character.CharacterActorComponent.ActorLocationProxy,
      ),
      CameraUtility.GetVectorInGravity(this.cz, this.cz);
    var t = this.cz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
      a =
        (this.cie.DeepCopy(
          Global_1.Global.CharacterCameraManager.GetCameraRotation(),
        ),
        CameraUtility.GetYawInGravity(this.cie));
    return MathUtils_1.MathUtils.WrapAngle(t - a);
  }
  static GetCameraDefaultFocusRotator() {
    var t,
      a =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "InitialCameraPitch",
        ),
      e = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    return (
      e?.Valid &&
      e?.Character?.IsValid() &&
      e?.Character?.CharacterActorComponent
        ? !(t = e.Character.CharacterActorComponent.Entity.GetComponent(203))
            ?.Valid || t.HasTag(-648310348)
          ? (this.cie.Reset(),
            CameraUtility.SetPitchInGravity(this.cie, a, this.cie))
          : e.IsInNormalGravityMode()
            ? ((t = e.Character.CharacterActorComponent.ActorRotation.Euler()),
              (this.cie.Pitch = a),
              (this.cie.Yaw = t.Z),
              (this.cie.Roll = t.X))
            : CameraUtility.SetPitchInGravity(
                e.Character.CharacterActorComponent.ActorRotationProxy,
                a,
                this.cie,
              )
        : ((this.cie.Pitch = a), (this.cie.Yaw = 0), (this.cie.Roll = 0)),
      this.cie
    );
  }
  static GetCameraDefaultFocusUeRotator() {
    return this.GetCameraDefaultFocusRotator().ToUeRotator();
  }
  static CheckCameraShakeCondition(t) {
    return !!t?.Valid && this.CheckFormationControlState(t, !0, !0);
  }
  static CheckCameraSequenceCondition(t, a = 0) {
    if (!t) return !1;
    switch (a) {
      case 0:
        var e = t.GetEntityNoBlueprint()?.GetComponent(0);
        return e?.IsRole()
          ? !!e?.IsCharacterMonster() || Global_1.Global.BaseCharacter === t
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "SwitchSequenceCamera生效客户端类型`单客户端`只允许在角色身上调用",
              ),
            !1);
      case 1:
        return !0;
      case 3:
        return t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? (e = t.GetController()) instanceof TsAiController_1.default &&
              !!(e =
                e.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                e.Owner instanceof TsBaseCharacter_1.default &&
                e.IsAutonomousProxy &&
                e.Owner === Global_1.Global.BaseCharacter
              )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "SwitchSequenceCamera生效客户端类型`仇恨目标客户端`只允许在怪物身上调用",
              ),
            !1);
      case 4:
        return t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? !!(e = t.GetEntityNoBlueprint()?.GetComponent(39))?.Valid &&
              e.SkillTarget ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(
                  Global_1.Global.BaseCharacter?.EntityId ?? 0,
                )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "SwitchSequenceCamera生效客户端类型`技能目标客户端`只允许在怪物身上调用",
              ),
            !1);
      case 2:
        return t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? !!(e =
              Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                32,
              ))?.Valid &&
              e.GetCurrentTarget() ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                57,
                "SwitchSequenceCamera生效客户端类型`锁定目标客户端`只允许在怪物身上调用",
              ),
            !1);
      default:
        return !1;
    }
  }
  static CheckApplyCameraModifyCondition(t, a, e = 0, r = void 0) {
    return (
      !!t?.Valid &&
      !!this.CheckFormationControlState(t, !1, !a.IsSwitchModifier) &&
      !(!this.Vhe(t, e) || (r && !this.Hhe(r)))
    );
  }
  static CheckFormationControlState(t, a = !1, e = !1) {
    if (!t?.Valid) return !1;
    var r = t.Entity.GetComponent(219);
    if (r?.Valid) return r.IsAutonomousProxy;
    r = t.Entity.GetComponent(0);
    if (r?.Valid) {
      (r =
        r.IsVision() || r.IsMonster()
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityId(
              r.GetSummonerId(),
            )
          : t.Id),
        (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r, {
          ParamType: 1,
        }));
      if (t && ((a && !t.IsMyRole()) || (e && !t.IsControl()))) return !1;
    }
    return !0;
  }
  static Vhe(t, a) {
    if (!t?.Valid) return !1;
    var e,
      r = t.Entity.GetComponent(0);
    if (!r?.Valid) return !1;
    switch (a) {
      case 0:
        return (
          r.GetPlayerId() ===
            ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
          (r.IsRole() || r.IsVision())
        );
      case 1:
        return !0;
      case 3:
        return r.IsMonster()
          ? (e = t.Entity.GetComponent(3).Owner?.GetController()) instanceof
              TsAiController_1.default &&
              !!(e =
                e.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                e.Owner instanceof TsBaseCharacter_1.default &&
                e.IsAutonomousProxy &&
                e.Owner === Global_1.Global.BaseCharacter
              )
          : !1;
      case 4:
        return r.IsMonster()
          ? !!(e = t.Entity.GetComponent(39))?.Valid &&
              e.SkillTarget ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(
                  Global_1.Global.BaseCharacter?.EntityId ?? 0,
                )
          : !1;
      case 6:
      case 2:
        return r.IsMonster()
          ? !(
              !(e =
                Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                  32,
                ))?.Valid ||
              e.ShowTarget !==
                ModelManager_1.ModelManager.CharacterModel.GetHandle(t.Id)
            )
          : !1;
      case 5:
        return r.IsMonster();
      default:
        return !1;
    }
  }
  static Hhe(t = void 0) {
    return !t || this.jhe(t);
  }
  static jhe(a) {
    var e = a.Num();
    for (let t = 0; t < e; ++t) {
      var r = a.Get(t);
      switch (r.ConditionType) {
        case 0:
          if (this.Whe(r)) break;
          return !1;
        case 1:
          if (this.Khe(r)) break;
          return !1;
        case 2:
          if (this.Qhe(r)) break;
          return !1;
        case 3:
          if (this.Xhe(r)) break;
          return !1;
        case 4:
          if (this.$he(r)) break;
          return !1;
        case 5:
          if (this.Yhe(r)) break;
          return !1;
        case 6:
          if (this.Jhe(r)) break;
          return !1;
        case 7:
          if (this.zhe(r)) break;
          return !1;
        case 8:
          if (this.Z5a(r)) break;
          return !1;
        case 9:
          if (this.r7_(r)) break;
          return !1;
        case 10:
          if (this.o7_(r)) break;
          return !1;
        default:
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Camera",
                57,
                "未支持的相机 Modify ConditionType",
                ["ConditionType", r.ConditionType],
              ),
            !1
          );
      }
    }
    return !0;
  }
  static Whe(t) {
    var a =
        Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(203),
      a = t.AnyTag
        ? a.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          )
        : a.HasAllTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          );
    return t.Reverse ? !a : a;
  }
  static Khe(t) {
    let a = !1;
    var e = this.GetCameraLockOnTargetEntityHandle();
    return (
      e &&
        ((e = e.Entity.GetComponent(203)),
        (a = t.AnyTag
          ? e.HasAnyTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                t.TagToCheck,
              ),
            )
          : e.HasAllTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                t.TagToCheck,
              ),
            ))),
      t.Reverse ? !a : a
    );
  }
  static Qhe(t) {
    let a = !1;
    var e = ModelManager_1.ModelManager.CameraModel.FightCameraFinalDistance;
    return (
      e >= t.ArmLengthMin && e <= t.ArmLengthMax && (a = !0), t.Reverse ? !a : a
    );
  }
  static Xhe(t) {
    let a = !1;
    var e,
      r,
      i = this.GetCameraLockOnTargetEntityHandle();
    return (
      i &&
        ((e =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraLocation),
        (r =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraForward),
        i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.cz),
        r.CrossProduct(this.cz, this.cz),
        this.cz.Z < 0) &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static $he(t) {
    let a = !1;
    var e,
      r = this.GetCameraLockOnTargetEntityHandle();
    return (
      r &&
        ((e =
          Global_1.Global.BaseCharacter.CharacterActorComponent.SkeletalMesh.D_GetSocketLocation(
            CharacterNameDefines_1.CharacterNameDefines.ROOT,
          )),
        (r = r.Entity.GetComponent(3).ActorLocationProxy),
        (e = Math.abs(e.Z - r.Z)) >= t.LockTargetDeltaZMin) &&
        e <= t.LockTargetDeltaZMax &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static Yhe(t) {
    let a = !1;
    var e;
    return (
      this.GetCameraLockOnTargetEntityHandle() &&
        (e = Math.abs(this.GetPlayerTargetAndCameraYawOffset())) >=
          t.LockTargetDeltaYawMin &&
        e <= t.LockTargetDeltaYawMax &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static Jhe(t) {
    let a = !1;
    this.cie.DeepCopy(
      Global_1.Global.CharacterCameraManager.GetCameraRotation(),
    );
    var e = CameraUtility.GetPitchInGravity(this.cie);
    return (
      e >= t.LockTargetDeltaPitchMin &&
        e <= t.LockTargetDeltaPitchMax &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static zhe(t) {
    let a = !1;
    var e,
      r,
      i = this.GetCameraLockOnTargetEntityHandle();
    return (
      i &&
        ((e =
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorLocationProxy),
        (i = i.Entity.GetComponent(3).ActorLocationProxy),
        CameraUtility.GetVectorInGravity(e, this.cz),
        CameraUtility.GetVectorInGravity(i, this.gme),
        (e = Vector_1.Vector.DistSquared2D(this.cz, this.gme)),
        (i = t.MinLockDistance * t.MinLockDistance),
        (r = t.MaxLockDistance * t.MaxLockDistance),
        i <= e) &&
        e <= r &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static Z5a(t) {
    let a = !1;
    var e, r;
    return (
      0 < t.CameraTraceRadius &&
        ((e =
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorRotationProxy),
        (r =
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .SkeletalMesh).DoesSocketExist(t.CameraTraceSocket)
          ? this.cz.DeepCopy(r.D_GetSocketLocation(t.CameraTraceSocket))
          : this.cz.DeepCopy(r.D_GetSocketLocation(this.CameraPosition)),
        this.gme.DeepCopy(t.CameraTraceOffset),
        e.Quaternion().RotateVector(this.gme, this.gme),
        this.gme.AdditionEqual(this.cz),
        this.Fse ||
          ((this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
          (this.Fse.bIsSingle = !0),
          (this.Fse.bTraceComplex = !1),
          (this.Fse.bIgnoreSelf = !0),
          this.Fse.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.Camera,
          ),
          (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World)),
        (this.Fse.Radius = t.CameraTraceRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.Fse,
          this.gme,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Fse,
          this.gme,
        ),
        (a = !TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY,
        ))),
      t.Reverse ? !a : a
    );
  }
  static r7_(t) {
    let a = !1;
    var e,
      r = this.GetCameraTargetEntityHandle(),
      i = this.GetCameraLockOnTargetEntityHandle();
    return (
      r &&
        i &&
        ((e =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraLocation),
        (r = r.Entity.GetComponent(3).ActorLocationProxy),
        i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(r, this.cz),
        e.Subtraction(r, this.gme),
        this.gme.CrossProduct(this.cz, this.cz),
        CameraUtility.GetVectorInGravity(this.cz, this.cz),
        0 < this.cz.Z) &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static o7_(t) {
    let a = !1;
    var e,
      r = this.GetCameraTargetEntityHandle(),
      i = this.GetCameraLockOnTargetEntityHandle();
    return (
      r &&
        i &&
        ((e =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraLocation),
        (r = r.Entity.GetComponent(3).ActorLocationProxy),
        i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(r, this.cz),
        e.Subtraction(r, this.gme),
        this.gme.CrossProduct(this.cz, this.cz),
        CameraUtility.GetVectorInGravity(this.cz, this.cz),
        this.cz.Z < 0) &&
        (a = !0),
      t.Reverse ? !a : a
    );
  }
  static CharacterMovementBaseIsMoving() {
    var t =
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera
        ?.LogicComponent?.Character?.BasedMovement?.MovementBase;
    return !(
      !t ||
      2 !== t.Mobility ||
      (t
        .GetComponentVelocity()
        .IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber) &&
        (!(t =
          ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
            t.GetOwner(),
          )?.Entity.GetComponent(137)) ||
          !t.IsMove()))
    );
  }
  static SetCameraRotationWithString(t) {
    var a = [];
    for (const e of t.matchAll(/[+-]?\d+(?<Decimal>\.\d*)?/g)) a.push(e[0]);
    a.length < 2 || CameraUtility.SetCameraRotationWithAxisString(a[0], a[1]);
  }
  static SetCameraRotationWithAxisString(t, a) {
    (t = MathCommon_1.MathCommon.Clamp(
      parseFloat(t || "0"),
      -PITCH_LIMIT_VALUE,
      PITCH_LIMIT_VALUE,
    )),
      (a = MathUtils_1.MathUtils.WrapAngle(parseFloat(a || "0")));
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(
      new UE.Rotator(t, a, 0),
    );
  }
  static ResetFocus(t = RESET_FOCUS_TIME, a = void 0, e = !0, r = 0) {
    var i =
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    i?.Valid &&
      (i.ResetCameraInput(),
      i.PlayCameraEulerRotatorWithCurve(
        CameraUtility.GetCameraDefaultFocusRotator(),
        t,
        a,
        e,
        r,
      ));
  }
  static PrintRotationInNormalGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    e.Valid &&
      (t.Quaternion(this.e7o),
      e.GravityQuat.Multiply(this.e7o, this.k6r),
      this.k6r.Rotator(this.cie),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Camera",
        57,
        a,
        ["rotation", t],
        ["RotatorInNormalGravity", this.cie],
      );
  }
  static PrintRotationInCameraGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    e.Valid &&
      (t.Quaternion(this.e7o),
      e.GravityInverseQuat.Multiply(this.e7o, this.k6r),
      this.k6r.Rotator(this.cie),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Camera",
        57,
        a,
        ["rotation", t],
        ["RotatorInCameraGravity", this.cie],
      );
  }
  static GetRotatorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !e.Valid || e.IsInNormalGravityMode()
        ? a.DeepCopy(t)
        : (t.Quaternion(this.e7o),
          e.GravityInverseQuat.Multiply(this.e7o, this.k6r),
          this.k6r.Rotator(a)),
      a
    );
  }
  static SetRotatorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !e.Valid || e.IsInNormalGravityMode()
        ? t.DeepCopy(a)
        : (a.Quaternion(this.e7o),
          e.GravityQuat.Multiply(this.e7o, this.k6r),
          this.k6r.Rotator(t)),
      t
    );
  }
  static GetRotatorInNormal(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !e.Valid || e.IsInNormalGravityMode()
        ? a.DeepCopy(t)
        : (t.Quaternion(this.e7o),
          e.GravityQuat.Multiply(this.e7o, this.k6r),
          this.k6r.Rotator(a)),
      a
    );
  }
  static GetVectorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !e.Valid || e.IsInNormalGravityMode()
        ? a.DeepCopy(t)
        : e.GravityInverseQuat.RotateVector(t, a),
      a
    );
  }
  static GetVectorInNormal(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !e.Valid || e.IsInNormalGravityMode()
        ? a.DeepCopy(t)
        : e.GravityQuat.RotateVector(t, a),
      a
    );
  }
  static GetPitchInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !a.Valid || a.IsInNormalGravityMode()
        ? t
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            a.GravityInverseQuat,
            this.cie,
          ),
          this.cie)
    ).Pitch;
  }
  static SetPitchInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t),
          (e.Pitch = MathCommon_1.MathCommon.Clamp(
            a,
            -PITCH_LIMIT_VALUE,
            PITCH_LIMIT_VALUE,
          )))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Pitch = MathCommon_1.MathCommon.Clamp(
            a,
            -PITCH_LIMIT_VALUE,
            PITCH_LIMIT_VALUE,
          )),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static AddPitchInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t),
          (e.Pitch = MathCommon_1.MathCommon.Clamp(
            e.Pitch + a,
            -PITCH_LIMIT_VALUE,
            PITCH_LIMIT_VALUE,
          )))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Pitch = MathCommon_1.MathCommon.Clamp(
            this.cie.Pitch + a,
            -PITCH_LIMIT_VALUE,
            PITCH_LIMIT_VALUE,
          )),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static GetYawInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !a.Valid || a.IsInNormalGravityMode()
        ? t
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            a.GravityInverseQuat,
            this.cie,
          ),
          this.cie)
    ).Yaw;
  }
  static SetYawInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.Yaw = MathUtils_1.MathUtils.WrapAngle(a)))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Yaw = MathUtils_1.MathUtils.WrapAngle(a)),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static AddYawInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.Yaw = MathUtils_1.MathUtils.WrapAngle(e.Yaw + a)))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Yaw = MathUtils_1.MathUtils.WrapAngle(this.cie.Yaw + a)),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static GetRollInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !a.Valid || a.IsInNormalGravityMode()
        ? t
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            a.GravityInverseQuat,
            this.cie,
          ),
          this.cie)
    ).Roll;
  }
  static SetRollInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.Roll = MathUtils_1.MathUtils.WrapAngle(a)))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Roll = MathUtils_1.MathUtils.WrapAngle(a)),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static AddRollInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t),
          (e.Roll = MathUtils_1.MathUtils.WrapAngle(e.Roll + a)))
        : (GravityUtils_1.GravityUtils.GetRotatorInGravity(
            t,
            r.GravityInverseQuat,
            this.cie,
          ),
          (this.cie.Roll = MathUtils_1.MathUtils.WrapAngle(this.cie.Roll + a)),
          GravityUtils_1.GravityUtils.GetRotatorInNormal(
            this.cie,
            r.GravityQuat,
            e,
          )),
      e
    );
  }
  static SetXnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.X = a))
        : (GravityUtils_1.GravityUtils.GetVectorInGravity(
            t,
            r.GravityInverseQuat,
            e,
          ),
          (e.X = a),
          GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e)),
      e
    );
  }
  static SetYnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.Y = a))
        : (GravityUtils_1.GravityUtils.GetVectorInGravity(
            t,
            r.GravityInverseQuat,
            e,
          ),
          (e.Y = a),
          GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e)),
      e
    );
  }
  static SetZnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !r.Valid || r.IsInNormalGravityMode()
        ? (e.DeepCopy(t), (e.Z = a))
        : (GravityUtils_1.GravityUtils.GetVectorInGravity(
            t,
            r.GravityInverseQuat,
            e,
          ),
          (e.Z = a),
          GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e)),
      e
    );
  }
  static GetZnInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (
      !a.Valid || a.IsInNormalGravityMode()
        ? t
        : CameraUtility.GetVectorInGravity(t, this.cz)
    ).Z;
  }
  static GetCameraMode(t) {
    switch (t) {
      case 0:
        return CameraModel_1.cameraModeLockOn;
      case 2:
        return CameraModel_1.cameraModeWidget;
      case 1:
        return CameraModel_1.cameraModeSequence;
      case 3:
        return CameraModel_1.cameraModeScene;
      case 4:
        return CameraModel_1.cameraModeOrbital;
      case 5:
        return CameraModel_1.cameraModeFree;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Camera", 57, "Invalid Camera Mode", [
              "cameraMode",
              t,
            ]),
          CameraModel_1.cameraModeDefault
        );
    }
  }
  static GetValidPitchAngle(t, a) {
    return !MathUtils_1.MathUtils.IsNearlyZero(
      t,
      MathCommon_1.MathCommon.KindaSmallNumber,
    ) &&
      MathUtils_1.MathUtils.IsNearlyZero(
        Math.abs(t) % MathCommon_1.MathCommon.RightAngle,
        MathCommon_1.MathCommon.KindaSmallNumber,
      )
      ? 0 < t
        ? PITCH_LIMIT_VALUE
        : -PITCH_LIMIT_VALUE
      : a
        ? Math.max(t, -PITCH_LIMIT_VALUE)
        : Math.min(t, PITCH_LIMIT_VALUE);
  }
}
((exports.CameraUtility = CameraUtility).CameraPosition = new UE.FName(
  "CameraPosition",
)),
  (CameraUtility.HitCase = new UE.FName("HitCase")),
  (CameraUtility.Root = new UE.FName("Root")),
  (CameraUtility.cz = Vector_1.Vector.Create()),
  (CameraUtility.gme = Vector_1.Vector.Create()),
  (CameraUtility.e7o = Quat_1.Quat.Create()),
  (CameraUtility.k6r = Quat_1.Quat.Create()),
  (CameraUtility.cie = Rotator_1.Rotator.Create()),
  (CameraUtility.CapsuleHeightRatio = 0.67),
  (CameraUtility.Fse = void 0);
//# sourceMappingURL=CameraUtility.js.map
