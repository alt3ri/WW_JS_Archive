"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraUtility = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils"),
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
  static GetSocketLocation(e, t, r, a = void 0) {
    let i = void 0,
      o = void 0;
    if (e) (i = e), (o = a || ActorUtils_1.ActorUtils.GetEntityByActor(e));
    else {
      if (!a) return void r.Reset();
      if (!(i = a.Entity.GetComponent(1)?.Owner)) return void r.Reset();
      o = a;
    }
    if (this.khe(o))
      return (e = i).Mesh && t?.toString()
        ? void r.FromUeVector(e.Mesh.GetSocketLocation(t))
        : void o.Entity.GetComponent(160).GetCameraPosition(r);
    o.Valid && r.DeepCopy(o.Entity.GetComponent(1).ActorLocationProxy);
  }
  static khe(e) {
    return (
      !!e?.Valid &&
      ((e = e.Entity.GetComponent(0).GetEntityType()) ===
        Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        e === Protocol_1.Aki.Protocol.HBs.Proto_Npc ||
        e === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        e === Protocol_1.Aki.Protocol.HBs.Proto_Vision)
    );
  }
  static GetRootTransform(e) {
    return e?.Mesh ? e.Mesh.GetSocketTransform(this.Root) : new UE.Transform();
  }
  static TargetCanBeSelect(e) {
    return !(
      !e.Valid ||
      !e.Active ||
      ((e = e.Entity.GetComponent(185)) &&
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
          ? (r = e.GetController()) instanceof TsAiController_1.default &&
              !!(r =
                r.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                r.Owner instanceof TsBaseCharacter_1.default &&
                r.IsAutonomousProxy &&
                r.Owner === Global_1.Global.BaseCharacter
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
          ? !!(r = e.GetEntityNoBlueprint()?.GetComponent(33))?.Valid &&
              r.SkillTarget ===
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
        var r;
        return e.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()
          ? !!(r =
              Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                29,
              ))?.Valid &&
              r.GetCurrentTarget() ===
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
  static CheckApplyCameraModifyCondition(e, t, r = 0, a = void 0) {
    return (
      !!e?.Valid &&
      !!this.Fhe(e, !1, !t.IsSwitchModifier) &&
      !(!this.Vhe(e, r) || (a && !this.Hhe(r, a)))
    );
  }
  static Fhe(e, t = !1, r = !1) {
    if (!e?.Valid) return !1;
    var a = e.Entity.GetComponent(0);
    if (a?.Valid) {
      (a =
        a.IsVision() || a.IsMonster()
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityId(
              a.GetSummonerId(),
            )
          : e.Id),
        (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(a, {
          ParamType: 1,
        }));
      if (e && ((t && !e.IsMyRole()) || (r && !e.IsControl()))) return !1;
    }
    return !0;
  }
  static Vhe(e, t) {
    if (!e?.Valid) return !1;
    var r,
      a = e.Entity.GetComponent(0);
    if (!a?.Valid) return !1;
    switch (t) {
      case 0:
        return (
          a.GetPlayerId() ===
            ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
          (a.IsRole() || a.IsVision())
        );
      case 1:
        return !0;
      case 3:
        return a.IsMonster()
          ? (r = e.Entity.GetComponent(3).Owner?.GetController()) instanceof
              TsAiController_1.default &&
              !!(r =
                r.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(
                  3,
                ))?.Valid &&
              !!(
                r.Owner instanceof TsBaseCharacter_1.default &&
                r.IsAutonomousProxy &&
                r.Owner === Global_1.Global.BaseCharacter
              )
          : !1;
      case 4:
        return a.IsMonster()
          ? !!(r = e.Entity.GetComponent(33))?.Valid &&
              r.SkillTarget ===
                ModelManager_1.ModelManager.CharacterModel.GetHandle(
                  Global_1.Global.BaseCharacter?.EntityId ?? 0,
                )
          : !1;
      case 6:
      case 2:
        return a.IsMonster()
          ? !(
              !(r =
                Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(
                  29,
                ))?.Valid ||
              r.ShowTarget !==
                ModelManager_1.ModelManager.CharacterModel.GetHandle(e.Id)
            )
          : !1;
      case 5:
        return a.IsMonster();
      default:
        return !1;
    }
  }
  static Hhe(e, t = void 0) {
    return !t || 0 !== e || this.jhe(t);
  }
  static jhe(t) {
    var r = t.Num();
    for (let e = 0; e < r; ++e) {
      var a = t.Get(e);
      switch (a.ConditionType) {
        case 0:
          if (this.Whe(a)) break;
          return !1;
        case 1:
          if (this.Khe(a)) break;
          return !1;
        case 2:
          if (this.Qhe(a)) break;
          return !1;
        case 3:
          if (this.Xhe(a)) break;
          return !1;
        case 4:
          if (this.$he(a)) break;
          return !1;
        case 5:
          if (this.Yhe(a)) break;
          return !1;
        case 6:
          if (this.Jhe(a)) break;
          return !1;
        case 7:
          if (this.zhe(a)) break;
          return !1;
        default:
          return (
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Camera",
                58,
                "未支持的相机 Modify ConditionType",
                ["ConditionType", a.ConditionType],
              ),
            !1
          );
      }
    }
    return !0;
  }
  static Whe(e) {
    var t =
        Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(185),
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
    var r = this.GetCameraTargetEntityHandle();
    return (
      r &&
        ((r = r.Entity.GetComponent(185)),
        (t = e.AnyTag
          ? r.HasAnyTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                e.TagToCheck,
              ),
            )
          : r.HasAllTag(
              GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
                e.TagToCheck,
              ),
            ))),
      e.Reverse ? !t : t
    );
  }
  static Qhe(e) {
    let t = !1;
    var r = ModelManager_1.ModelManager.CameraModel.FightCameraFinalDistance;
    return (
      r >= e.ArmLengthMin && r <= e.ArmLengthMax && (t = !0), e.Reverse ? !t : t
    );
  }
  static Xhe(e) {
    let t = !1;
    var r,
      a,
      i = this.GetCameraTargetEntityHandle();
    return (
      i &&
        ((r =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraLocation),
        (a =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CameraForward),
        i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(r, this.cz),
        a.CrossProduct(this.cz, this.cz),
        this.cz.Z < 0) &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static $he(e) {
    let t = !1;
    var r,
      a = this.GetCameraTargetEntityHandle();
    return (
      a &&
        ((r =
          Global_1.Global.BaseCharacter.CharacterActorComponent.SkeletalMesh.GetSocketLocation(
            CharacterNameDefines_1.CharacterNameDefines.ROOT,
          )),
        (a = a.Entity.GetComponent(3).ActorLocationProxy),
        (r = Math.abs(r.Z - a.Z)) >= e.LockTargetDeltaZMin) &&
        r <= e.LockTargetDeltaZMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static Yhe(e) {
    let t = !1;
    var r;
    return (
      this.GetCameraTargetEntityHandle() &&
        (r = Math.abs(this.GetPlayerTargetAndCameraYawOffset())) >=
          e.LockTargetDeltaYawMin &&
        r <= e.LockTargetDeltaYawMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static Jhe(e) {
    let t = !1;
    var r = Global_1.Global.CharacterCameraManager.GetCameraRotation().Pitch;
    return (
      r >= e.LockTargetDeltaPitchMin &&
        r <= e.LockTargetDeltaPitchMax &&
        (t = !0),
      e.Reverse ? !t : t
    );
  }
  static zhe(e) {
    let t = !1;
    var r,
      a,
      i = this.GetCameraTargetEntityHandle();
    return (
      i &&
        ((r =
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorLocationProxy),
        (i = i.Entity.GetComponent(3).ActorLocationProxy),
        (r = Vector_1.Vector.DistSquared2D(r, i)),
        (i = e.MinLockDistance * e.MinLockDistance),
        (a = e.MaxLockDistance * e.MaxLockDistance),
        i <= r) &&
        r <= a &&
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
          )?.Entity.GetComponent(123)) ||
          !e.IsMove()))
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
