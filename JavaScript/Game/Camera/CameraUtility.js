"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraUtility = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsAiController_1 = require("../AI/Controller/TsAiController"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines"),
  ActorUtils_1 = require("../Utils/ActorUtils"),
  CameraController_1 = require("./CameraController");
class CameraUtility {
  static GetSocketLocation(e, t, a, r = void 0) {
    let i = void 0,
      o = void 0;
    if (e) (i = e), (o = r || ActorUtils_1.ActorUtils.GetEntityByActor(e));
    else {
      if (!r) return void a.Reset();
      if (!(i = r.Entity.GetComponent(1)?.Owner)) return void a.Reset();
      o = r;
    }
    if (this.khe(o))
      return (e = i).Mesh && t?.toString()
        ? void a.FromUeVector(e.Mesh.GetSocketLocation(t))
        : void o.Entity.GetComponent(162).GetCameraPosition(a);
    o.Valid && a.DeepCopy(o.Entity.GetComponent(1).ActorLocationProxy);
  }
  static khe(e) {
    return (
      !!e?.Valid &&
      ((e = e.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.wks.Proto_Monster ||
        e === Protocol_1.Aki.Protocol.wks.Proto_Npc ||
        e === Protocol_1.Aki.Protocol.wks.Proto_Player ||
        e === Protocol_1.Aki.Protocol.wks.Proto_Vision)
    );
  }
  static GetRootTransform(e) {
    return e?.Mesh ? e.Mesh.GetSocketTransform(this.Root) : new UE.Transform();
  }
  static TargetCanBeSelect(e) {
    return !(
      !e.Valid ||
      !e.Active ||
      ((e = e.Entity.GetComponent(188)) &&
        (e.HasTag(1008164187) || e.HasTag(-1243968098)))
    );
  }
  static GetCameraTargetEntityHandle() {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (e.Valid) {
      e = e.TargetEntity;
      if (e?.Valid) return e;
    }
  }
  static GetPlayerTargetAndCameraYawOffset() {
    var e =
      ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (
      !e?.Valid ||
      !e?.TargetEntity?.Valid ||
      !e?.Character?.CharacterActorComponent
    )
      return 0;
    this.GetSocketLocation(void 0, e.TargetSocketName, this.cz, e.TargetEntity),
      this.cz.SubtractionEqual(
        e.Character.CharacterActorComponent.ActorLocationProxy,
      );
    var e = this.cz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg,
      t = Global_1.Global.CharacterCameraManager.GetCameraRotation().Yaw;
    return MathUtils_1.MathUtils.WrapAngle(e - t);
  }
  static GetCameraDefaultFocusRotator() {
    var e =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "InitialCameraPitch",
        ),
      t = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    return (
      t?.Valid &&
      t?.Character?.IsValid() &&
      t?.Character?.CharacterActorComponent
        ? ((t = t.Character.CharacterActorComponent.ActorRotation.Euler()),
          (this.cie.Pitch = e),
          (this.cie.Yaw = t.Z),
          (this.cie.Roll = t.X))
        : ((this.cie.Pitch = e), (this.cie.Yaw = 0), (this.cie.Roll = 0)),
      this.cie
    );
  }
  static GetCameraDefaultFocusUeRotator() {
    return this.GetCameraDefaultFocusRotator().ToUeRotator();
  }
  static CheckCameraShakeCondition(e) {
    return !!e?.Valid && this.Fhe(e, !0, !0);
  }
  static CheckCameraSequenceCondition(e, t = 0) {
    if (!e) return !1;
    switch (t) {
      case 0:
        return e.GetEntityNoBlueprint()?.GetComponent(0)?.IsRole()
          ? Global_1.Global.BaseCharacter === e
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "SwitchSequenceCamera生效客户端类型`单客户端`只允许在角色身上调用",
              ),
            !1);
      case 1:
        return !0;
      case 3:
        return e.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? (a = e.GetController()) instanceof TsAiController_1.default &&
              !!(a =
                a.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                a.Owner instanceof TsBaseCharacter_1.default &&
                a.IsAutonomousProxy &&
                a.Owner === Global_1.Global.BaseCharacter
              )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "SwitchSequenceCamera生效客户端类型`仇恨目标客户端`只允许在怪物身上调用",
              ),
            !1);
      case 4:
        return e.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? !!(a = e.GetEntityNoBlueprint()?.GetComponent(33))?.Valid &&
              a.SkillTarget ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(
                  Global_1.Global.BaseCharacter?.EntityId ?? 0,
                )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "SwitchSequenceCamera生效客户端类型`技能目标客户端`只允许在怪物身上调用",
              ),
            !1);
      case 2:
        var a;
        return e.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? !!(a =
              Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                29,
              ))?.Valid &&
              a.GetCurrentTarget() ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(e.EntityId)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Camera",
                58,
                "SwitchSequenceCamera生效客户端类型`锁定目标客户端`只允许在怪物身上调用",
              ),
            !1);
      default:
        return !1;
    }
  }
  static CheckApplyCameraModifyCondition(e, t, a = 0, r = void 0) {
    return (
      !!e?.Valid &&
      !!this.Fhe(e, !1, !t.IsSwitchModifier) &&
      !(!this.Vhe(e, a) || (r && !this.Hhe(a, r)))
    );
  }
  static Fhe(e, t = !1, a = !1) {
    if (!e?.Valid) return !1;
    var r = e.Entity.GetComponent(0);
    if (r?.Valid) {
      (r =
        r.IsVision() || r.IsMonster()
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityId(
              r.GetSummonerId(),
            )
          : e.Id),
        (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r, {
          ParamType: 1,
        }));
      if (e && ((t && !e.IsMyRole()) || (a && !e.IsControl()))) return !1;
    }
    return !0;
  }
  static Vhe(e, t) {
    if (!e?.Valid) return !1;
    var a,
      r = e.Entity.GetComponent(0);
    if (!r?.Valid) return !1;
    switch (t) {
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
          ? (a = e.Entity.GetComponent(3).Owner?.GetController()) instanceof
              TsAiController_1.default &&
              !!(a =
                a.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                a.Owner instanceof TsBaseCharacter_1.default &&
                a.IsAutonomousProxy &&
                a.Owner === Global_1.Global.BaseCharacter
              )
          : !1;
      case 4:
        return r.IsMonster()
          ? !!(a = e.Entity.GetComponent(33))?.Valid &&
              a.SkillTarget ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(
                  Global_1.Global.BaseCharacter?.EntityId ?? 0,
                )
          : !1;
      case 6:
      case 2:
        return r.IsMonster()
          ? !(
              !(a =
                Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                  29,
                ))?.Valid ||
              a.ShowTarget !==
                ModelManager_1.ModelManager.CharacterModel.GetHandle(e.Id)
            )
          : !1;
      case 5:
        return r.IsMonster();
      default:
        return !1;
    }
  }
  static Hhe(e, t = void 0) {
    return !t || 0 !== e || this.jhe(t);
  }
  static jhe(t) {
    var a = t.Num();
    for (let e = 0; e < a; ++e) {
      var r = t.Get(e);
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
        default:
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Camera",
                58,
                "未支持的相机 Modify ConditionType",
                ["ConditionType", r.ConditionType],
              ),
            !1
          );
      }
    }
    return !0;
  }
  static Whe(e) {
    var t =
        Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(188),
      t = e.AnyTag
        ? t.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              e.TagToCheck,
            ),
          )
        : t.HasAllTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              e.TagToCheck,
            ),
          );
    return e.Reverse ? !t : t;
  }
  static Khe(e) {
    let t = !1;
    var a = this.GetCameraTargetEntityHandle();
    return (
      a &&
        ((a = a.Entity.GetComponent(188)),
        (t = e.AnyTag
          ? a.HasAnyTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                e.TagToCheck,
              ),
            )
          : a.HasAllTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                e.TagToCheck,
              ),
            ))),
      e.Reverse ? !t : t
    );
  }
  static Qhe(e) {
    let t = !1;
    var a = ModelManager_1.ModelManager.CameraModel.FightCameraFinalDistance;
    return (
      a >= e.ArmLengthMin && a <= e.ArmLengthMax && (t = !0), e.Reverse ? !t : t
    );
  }
  static Xhe(e) {
    let t = !1;
    var a,
      r,
      i = this.GetCameraTargetEntityHandle();
    return (
      i &&
        ((a =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraLocation),
        (r =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraForward),
        i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(a, this.cz),
        r.CrossProduct(this.cz, this.cz),
        this.cz.Z < 0) &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static $he(e) {
    let t = !1;
    var a,
      r = this.GetCameraTargetEntityHandle();
    return (
      r &&
        ((a =
          Global_1.Global.BaseCharacter.CharacterActorComponent.SkeletalMesh.GetSocketLocation(
            CharacterNameDefines_1.CharacterNameDefines.ROOT,
          )),
        (r = r.Entity.GetComponent(3).ActorLocationProxy),
        (a = Math.abs(a.Z - r.Z)) >= e.LockTargetDeltaZMin) &&
        a <= e.LockTargetDeltaZMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static Yhe(e) {
    let t = !1;
    var a;
    return (
      this.GetCameraTargetEntityHandle() &&
        (a = Math.abs(this.GetPlayerTargetAndCameraYawOffset())) >=
          e.LockTargetDeltaYawMin &&
        a <= e.LockTargetDeltaYawMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static Jhe(e) {
    let t = !1;
    var a = Global_1.Global.CharacterCameraManager.GetCameraRotation().Pitch;
    return (
      a >= e.LockTargetDeltaPitchMin &&
        a <= e.LockTargetDeltaPitchMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static zhe(e) {
    let t = !1;
    var a,
      r,
      i = this.GetCameraTargetEntityHandle();
    return (
      i &&
        ((a =
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorLocationProxy),
        (i = i.Entity.GetComponent(3).ActorLocationProxy),
        (a = Vector_1.Vector.DistSquared2D(a, i)),
        (i = e.MinLockDistance * e.MinLockDistance),
        (r = e.MaxLockDistance * e.MaxLockDistance),
        i <= a) &&
        a <= r &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static CharacterMovementBaseIsMoving() {
    var e =
      CameraController_1.CameraController.FightCamera?.LogicComponent?.Character
        ?.BasedMovement?.MovementBase;
    return !(
      !e ||
      2 !== e.Mobility ||
      (e
        .GetComponentVelocity()
        .IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber) &&
        (!(e =
          ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
            e.GetOwner(),
          )?.Entity.GetComponent(125)) ||
          !e.IsMove()))
    );
  }
  static SetCameraRotationWithString(e) {
    var t = [];
    for (const a of e.matchAll(/[+-]?\d+(?<Decimal>\.\d*)?/g)) t.push(a[0]);
    t.length < 2 || CameraUtility.SetCameraRotationWithAxisString(t[0], t[1]);
  }
  static SetCameraRotationWithAxisString(e, t) {
    (e = MathCommon_1.MathCommon.Warp(
      parseFloat(e || "0"),
      -MathCommon_1.MathCommon.RightAngle,
      MathCommon_1.MathCommon.RightAngle,
    )),
      (t = MathUtils_1.MathUtils.WrapAngle(parseFloat(t || "0")));
    CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
      new UE.Rotator(e, t, 0),
    );
  }
}
((exports.CameraUtility = CameraUtility).CameraPosition = new UE.FName(
  "CameraPosition",
)),
  (CameraUtility.HitCase = new UE.FName("HitCase")),
  (CameraUtility.Root = new UE.FName("Root")),
  (CameraUtility.cz = Vector_1.Vector.Create()),
  (CameraUtility.cie = Rotator_1.Rotator.Create()),
  (CameraUtility.CapsuleHeightRatio = 0.67);
//# sourceMappingURL=CameraUtility.js.map
