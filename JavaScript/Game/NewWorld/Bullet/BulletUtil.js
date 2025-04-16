"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  SpaceUtils_1 = require("../../../Core/Utils/SpaceUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  CharacterUtils_1 = require("../Character/CharacterUtils"),
  CampUtils_1 = require("../Character/Common/Blueprint/Utils/CampUtils"),
  PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent"),
  BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("./Model/BulletPool"),
  QUARTER_PI_DEGREE = 45;
class BulletUtil {
  static GetTargetLocation(t, e, o) {
    return 10 === o.BulletDataMain.Move.TrackTarget
      ? o.BulletInitParams.InitTargetLocation
      : t?.Valid
        ? t.GetSocketLocation(e)
        : void 0;
  }
  static VictimInValid(t) {
    return (
      !t?.Valid ||
      this.DoesEntityContainsTag(t, 1008164187) ||
      this.DoesEntityContainsTag(t, -208062360)
    );
  }
  static AttackedCondition(t, e) {
    return !this.VictimInValid(e?.Entity) && this.AttackedCampCondition(t, e);
  }
  static AttackedCampCondition(t, e) {
    var o = e.Entity.GetComponent(0);
    if (11 === t.BulletCamp)
      return o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? o.GetPlayerId() === t.AttackerPlayerId
        : ((l = ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
                t.AttackerPlayerId,
                { ParamType: 2, IsControl: !0 },
              ).EntityHandle.Id
            : Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
          ModelManager_1.ModelManager.CharacterModel.IsValid(l)
            ? l === e.Entity.Id
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Bullet",
                  20,
                  "子弹对小队攻击，找不到当前控制玩家",
                  ["Id", t.BulletRowName],
                  ["Attacker", t.AttackerActorComp?.Actor?.GetName()],
                  ["CurrentEntityId", l],
                ),
              !1));
    var l = t.AttackerCamp;
    let r = 0;
    o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
      (r = o.GetEntityCamp());
    o = 2 * CampUtils_1.CampUtils.GetCampRelationship(l, r);
    return e === t.AttackerActorComp
      ? !!(1 & t.BulletCamp)
      : !(
          !(t.BulletCamp & o) ||
          (4 == o && this.DoesEntityContainsTag(e.Entity, -149285150))
        );
  }
  static DoesEntityContainsTag(t, e) {
    return (
      !!t &&
      (!!t.GetComponent(194)?.HasTag(e) ||
        (!!(t = t.GetComponent(203)) && t.HasTag(e)))
    );
  }
  static GetCurrentRole(t) {
    return ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
          t.AttackerPlayerId,
          { ParamType: 2, IsControl: !0 },
        ).EntityHandle?.Entity?.GetComponent(3)
      : Global_1.Global.BaseCharacter?.CharacterActorComponent;
  }
  static ShakeTest(t, e) {
    if (
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        t.AttackerHandle,
      )
    )
      return !1;
    let o = !1;
    var l = t.BulletDataMain.Render;
    return (
      (0, RegisterComponent_1.isComponentInstance)(e, 3) &&
        e.IsRoleAndCtrlByMe &&
        0 < l.VictimCameraShakeOnHit.length &&
        l.CameraShakeCountMax > t.ShakeNumbers &&
        (o = !0),
      (o =
        t.Attacker &&
        t.IsAutonomousProxy &&
        (0 < l.AttackerCameraShakeOnHit.length ||
          0 < l.AttackerCameraShakeOnHitWeakPoint.length) &&
        l.CameraShakeCountMax > t.ShakeNumbers &&
        BulletUtil.IsPlayerOrSummons(t)
          ? !0
          : o) && t.ShakeNumbers++,
      o
    );
  }
  static IsPlayerOrSummons(t) {
    return (
      !!t.AttackerActorComp.IsRoleAndCtrlByMe ||
      !(
        !t.AttackerActorComp.IsAutonomousProxy ||
        !t.BulletDataMain.Render.CameraShakeToSummonOwner ||
        !(t = t.AttackerCreatureDataComp.GetSummonerPlayerId()) ||
        t !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      )
    );
  }
  static SummonBullet(t, e, o, l, r = void 0, a = void 0, i = !0) {
    var n =
      ControllerHolder_1.ControllerHolder.BulletController.GetActionCenter().CreateBulletActionInfo(
        11,
      );
    (n.ChildrenType = e),
      (n.Victim = o),
      (n.IsStayInCharacter = l),
      (n.CreateOnAuthority = i),
      r && (n.ParentImpactPoint = Vector_1.Vector.Create(r)),
      a && (n.ParentLastPosition = Vector_1.Vector.Create(a)),
      ControllerHolder_1.ControllerHolder.BulletController.GetActionRunner().AddAction(
        t,
        n,
      );
  }
  static CheckSupport(t, e) {
    t = t.BulletDataMain.Execution.SupportCamp;
    if (t && 0 < t.length) for (const o of t) if (o === e) return !0;
    return !1;
  }
  static ProcessHandOverEffectToSon(t, e) {
    e?.Valid &&
      (e = e.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect &&
      BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(t, e);
  }
  static FrozenBulletTime(t, e) {
    (t.FrozenTime = e * TimeUtil_1.TimeUtil.InverseMillisecond),
      BulletUtil.BulletFrozen(t);
  }
  static BulletFrozen(t) {
    t.IsFrozen = !0;
    var e = t.ActorComponent;
    e &&
      (e.SetBulletCustomTimeDilation(0),
      BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
        t.EffectInfo,
        0,
      ));
  }
  static BulletUnfrozen(t) {
    (t.IsFrozen = !1),
      t.ActorComponent.SetBulletCustomTimeDilation(1),
      BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(
        t.EffectInfo,
        1,
      );
  }
  static FrozenCharacterBullet(t, e, o = 0) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const r of t) {
        var l = r.GetBulletInfo();
        (!StringUtils_1.StringUtils.IsEmpty(e) &&
          l.BulletDataMain.BulletName !== e) ||
          BulletUtil.FrozenBulletTime(l, o);
      }
  }
  static UnFrozenCharacterBullet(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const l of t) {
        var o = l.GetBulletInfo();
        (!StringUtils_1.StringUtils.IsEmpty(e) &&
          o.BulletDataMain.BulletName !== e) ||
          BulletUtil.BulletUnfrozen(o);
      }
  }
  static SetTimeScale(t, e, o, l, r, a, i = 0, n = 0) {
    if (r <= 0 || t.BulletDataMain.TimeScale.TimeScaleWithAttacker) return 0;
    if (0 < i && r <= i) return 0;
    var i = Time_1.Time.WorldTimeSeconds - i,
      _ = i + r;
    let u = n;
    0 <= n && ((t.TimeScaleId += 1), (u = t.TimeScaleId));
    n = new PawnTimeScaleComponent_1.TimeScale(
      i,
      _,
      e,
      o,
      l,
      r,
      u,
      a,
      (0, PawnTimeScaleComponent_1.getSourceGroup)(a),
    );
    return t.TimeScaleList.Push(n), t.TimeScaleMap.set(u, n), u;
  }
  static RemoveTimeScale(t, e) {
    t = t.TimeScaleMap.get(e);
    t && (t.MarkDelete = !0);
  }
  static SetVictimTimeScale(t, e, o, l, r, a, i, n, _, u = !1) {
    i <= 0 ||
      ((o = o.SetTimeScale(l, r, a, i, n, u)),
      _ &&
        0 < o &&
        (l =
          EntitySystem_1.EntitySystem.Get(t)?.GetBulletInfo().CollisionInfo) &&
        l.HitTimeScaleEntityMap.set(e, o));
  }
  static GetHitRotator(t, e, o) {
    o.FromUeRotator(e.ActorRotationProxy);
    var l = t.BulletDataMain.Base.RelativeDirection;
    if (3 === l) return !1;
    if (
      (0, RegisterComponent_1.isComponentInstance)(e, 3) &&
      e.Entity.GetComponent(203)?.HasTag(855966206)
    )
      return !1;
    var r = t.AttackerActorComp,
      a = Vector_1.Vector.Create();
    switch (l) {
      case 0:
        a.FromUeVector(r.ActorLocationProxy),
          a.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(a, e.ActorUpProxy, o);
        break;
      case 1:
        a.FromUeVector(t.ActorComponent.ActorLocationProxy),
          a.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(a, e.ActorUpProxy, o);
        break;
      case 2:
        var i = t.AttackerMoveComp?.IsStandardGravity ?? !0;
        t.MoveInfo.BulletSpeedDir.Equals(
          Vector_1.Vector.ZeroVectorProxy,
          MathCommon_1.MathCommon.KindaSmallNumber,
        )
          ? (i
              ? (a.FromUeVector(t.ActorComponent.ActorForward), (a.Z = 0))
              : Vector_1.Vector.VectorPlaneProject(
                  t.ActorComponent.ActorForwardProxy,
                  t.AttackerMoveComp.GravityUp,
                  a,
                ),
            a.MultiplyEqual(-1))
          : i
            ? a.Set(
                -t.MoveInfo.BulletSpeedDir.X,
                -t.MoveInfo.BulletSpeedDir.Y,
                0,
              )
            : (Vector_1.Vector.VectorPlaneProject(
                t.MoveInfo.BulletSpeedDir,
                t.AttackerMoveComp.GravityUp,
                a,
              ),
              a.MultiplyEqual(-1)),
          MathUtils_1.MathUtils.LookRotationUpFirst(a, e.ActorUpProxy, o);
        break;
      case 4:
        SpaceUtils_1.SpaceUtils.IsLocationInSideBullet(t, e.ActorLocationProxy)
          ? (a.FromUeVector(e.ActorLocationProxy),
            a.SubtractionEqual(t.ActorComponent.ActorLocationProxy))
          : (a.FromUeVector(t.ActorComponent.ActorLocationProxy),
            a.SubtractionEqual(e.ActorLocationProxy)),
          MathUtils_1.MathUtils.LookRotationUpFirst(a, e.ActorUpProxy, o);
    }
    return !0;
  }
  static SetHitRotator(t, e, o) {
    return (
      BulletUtil.GetHitRotator(t, e, this.TmpRotator) &&
        !e.Entity.GetComponent(203)?.HasTag(1447214865) &&
        (this.TmpRotator2.Set(0, o, 0),
        this.TmpRotator.Quaternion(this.TmpQuat),
        this.TmpRotator2.Quaternion(this.TmpQuat2),
        this.TmpQuat.Multiply(this.TmpQuat2, this.TmpQuat),
        this.TmpQuat.Rotator(this.TmpRotator),
        e.SetActorRotation(
          this.TmpRotator.ToUeRotator(),
          this.constructor.name,
          !1,
        ),
        (0, RegisterComponent_1.isComponentInstance)(e, 3)) &&
        e.SetInputRotator(this.TmpRotator),
      this.TmpRotator.ToUeRotator()
    );
  }
  static GetOverrideHitAnimByAngle(t, e, o) {
    let l = e;
    var e = (0, RegisterComponent_1.isComponentInstance)(t, 200),
      r = ModelManager_1.ModelManager.BulletModel,
      a = r.SelfAdaptBeHitAnim.has(l);
    return (
      (a || e) &&
        ((o =
          (((o - 180 - t.ActorRotationProxy.Yaw + QUARTER_PI_DEGREE) % 360) +
            360) %
          360),
        (t = Math.floor(o / 90)),
        a
          ? (l = (
              r.HeavyHitAnim.has(l)
                ? r.Index2HeavyHitAnimMap
                : r.Index2LightHitAnimMap
            )[t])
          : e && (l = r.Index2HeavyHitAnimMap[t])),
      l
    );
  }
  static CheckBulletAttackerExist(t) {
    var e;
    return !(
      !t.AttackerHandle?.Valid ||
      ((!(e = t.AttackerCreatureDataComp?.GetCreatureDataId()) ||
        e !== ModelManager_1.ModelManager.BulletModel?.SceneBulletOwnerId) &&
        void 0 === t.AttackerActorComp?.Actor)
    );
  }
  static FindLookAtRotDouble(t, e, o, l) {
    var r = BulletPool_1.BulletPool.CreateVector(),
      e = (r.FromUeVector(e), BulletPool_1.BulletPool.CreateVector());
    if ((e.FromUeVector(t), r.SubtractionEqual(e), o)) {
      const a = UE.KismetMathLibrary.D_MakeRotFromZX(l, r.ToUeVector(!0));
      return (
        BulletPool_1.BulletPool.RecycleVector(r),
        BulletPool_1.BulletPool.RecycleVector(e),
        a
      );
    }
    r.Normalize();
    (t = BulletPool_1.BulletPool.CreateVector()),
      (o = BulletPool_1.BulletPool.CreateVector());
    t.FromUeVector(l),
      Vector_1.Vector.CrossProduct(t, r, o),
      o.Normalize(),
      Vector_1.Vector.CrossProduct(r, o, t);
    const a = UE.KismetMathLibrary.D_MakeRotFromZX(
      t.ToUeVector(),
      r.ToUeVector(!0),
    );
    return (
      BulletPool_1.BulletPool.RecycleVector(t),
      BulletPool_1.BulletPool.RecycleVector(o),
      BulletPool_1.BulletPool.RecycleVector(r),
      BulletPool_1.BulletPool.RecycleVector(e),
      a
    );
  }
  static FindLookAtRotDoubleStandard(t, e, o) {
    var l, r;
    return o
      ? ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e),
        (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t),
        o.SubtractionEqual(l),
        (r = UE.KismetMathLibrary.D_MakeRotFromZX(
          Vector_1.Vector.UpVectorDouble,
          o.ToUeVector(!0),
        )),
        BulletPool_1.BulletPool.RecycleVector(o),
        BulletPool_1.BulletPool.RecycleVector(l),
        r)
      : UE.KismetMathLibrary.D_FindLookAtRotation(t.ToUeVector(!0), e);
  }
  static ClampBeginRotator(t) {
    var e,
      o,
      l = t.BulletDataMain.Move.BeginVelocityLimitMap;
    l.size <= 0 ||
      ((t.AttackerMoveComp?.IsStandardGravity ?? !0)
        ? BulletUtil.Da1(t)
        : (t.MoveInfo.BeginSpeedRotator.Vector(BulletUtil.Ua1),
          t.AttackerActorComp.ActorQuatProxy.UnRotateVector(
            BulletUtil.Ua1,
            BulletUtil.Ua1,
          ),
          BulletUtil.Ua1.Rotation(BulletUtil.Ba1),
          (e = -1 * (l.get(1) ?? MathCommon_1.MathCommon.RightAngle)),
          (o = l.get(0) ?? MathCommon_1.MathCommon.RightAngle),
          (BulletUtil.Ba1.Pitch = MathUtils_1.MathUtils.ClampAngle(
            BulletUtil.Ba1.Pitch,
            e,
            o,
          )),
          (e = -1 * (l.get(2) ?? MathCommon_1.MathCommon.RightAngle)),
          (o = l.get(3) ?? MathCommon_1.MathCommon.RightAngle),
          (BulletUtil.Ba1.Yaw = MathUtils_1.MathUtils.ClampAngle(
            BulletUtil.Ba1.Yaw,
            e,
            o,
          )),
          BulletUtil.Ba1.Vector(BulletUtil.Ua1),
          t.AttackerActorComp.ActorQuatProxy.RotateVector(
            BulletUtil.Ua1,
            BulletUtil.Ua1,
          ),
          BulletUtil.Ua1.Rotation(t.MoveInfo.BeginSpeedRotator)));
  }
  static Da1(o) {
    var l = o.BulletDataMain.Move.BeginVelocityLimitMap;
    if (!(l.size <= 0)) {
      var r = BulletPool_1.BulletPool.CreateRotator(),
        a =
          (o.AttackerActorComp.ActorRotationProxy.Clamp(r),
          BulletPool_1.BulletPool.CreateRotator());
      o.MoveInfo.BeginSpeedRotator.Clamp(a);
      let t = a.Pitch,
        e =
          (void 0 !== (n = l.get(0)) &&
            t < MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.min(t, n)),
          void 0 !== (n = l.get(1)) &&
            t > MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.max(t, MathCommon_1.MathCommon.RoundAngle - n)),
          a.Yaw);
      e =
        e > MathCommon_1.MathCommon.FlatAngle
          ? e - MathCommon_1.MathCommon.RoundAngle
          : e;
      var i,
        n = l.get(3),
        _ =
          (_ = r.Yaw) > MathCommon_1.MathCommon.FlatAngle
            ? _ - MathCommon_1.MathCommon.RoundAngle
            : _;
      void 0 !== n &&
        0 < (i = e - _) &&
        i < MathCommon_1.MathCommon.FlatAngle &&
        n < i &&
        (e = Rotator_1.Rotator.ClampAxis(r.Yaw + n)),
        void 0 !== (n = l.get(2)) &&
          0 < (i = _ - e) &&
          i < MathCommon_1.MathCommon.FlatAngle &&
          n < i &&
          (e = Rotator_1.Rotator.ClampAxis(r.Yaw - n)),
        BulletPool_1.BulletPool.RecycleRotator(r),
        BulletPool_1.BulletPool.RecycleRotator(a),
        (o.MoveInfo.BeginSpeedRotator.Pitch = t),
        (o.MoveInfo.BeginSpeedRotator.Yaw = e);
    }
  }
  static GetSkillContextId(e, o) {
    e = e?.GetComponent(38);
    if (e) {
      let t = e?.GetSkill(o)?.LFc;
      if (!t && e?.Entity?.Id) {
        var l = EntitySystem_1.EntitySystem.GetComponent(
          e?.Entity?.Id,
          0,
        ).GetSummonerId();
        if (0 < l) {
          const e =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(l)?.Entity;
          l = e?.GetComponent(38);
          t = l?.GetSkill(o)?.LFc;
        } else {
          l = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
            e?.Entity,
            Protocol_1.Aki.Protocol.Summon.x3s
              .Proto_ESummonTypeConcomitantCustom,
          )?.Entity?.GetComponent(38);
          t = l?.GetSkill(o)?.LFc;
        }
      }
      return t;
    }
  }
  static CreateBulletFromAN(t, e, o, l, r, a, i, n, _) {
    var u = t.GetEntityNoBlueprint(),
      l = Number(l),
      u = this.GetSkillContextId(u, l),
      e =
        ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(
          t,
          e,
          o,
          {
            SkillId: l,
            SkillContextId: u,
            SyncType: r ? 1 : 0,
            InitTargetLocation: i,
            LocationOffset: n,
            BeginRotatorOffset: _,
            BattleFlags: t.GetEntityNoBlueprint()?.GetComponent(38)?.GetSkill(l)
              ?.BattleFlags,
          },
          a,
        );
    return e ? ((e.GetBulletInfo().CreateSource = 1), e.Id) : 0;
  }
  static AttachParentEffectSkeleton(t, e, o) {
    var l = t.BulletDataMain.Move;
    return (
      l.IsLockScale && t.Actor.RootComponent.SetAbsolute(!1, !1, !0),
      t.ClearCacheLocationAndRotation(),
      t.ActorComponent.ResetAllCachedTime(),
      (t.ActorComponent.NeedDetach = !0),
      EffectSystem_1.EffectSystem.AttachToEffectSkeletalMesh(
        o,
        t.Actor,
        l.BoneName,
        0,
      ),
      t.Actor.D_K2_SetActorRelativeLocation(
        t.BornLocationOffset.ToUeVector(),
        !1,
        void 0,
        !1,
      ),
      t.Actor.K2_SetActorRelativeRotation(
        Rotator_1.Rotator.ZeroRotator,
        !1,
        void 0,
        !0,
      ),
      !0
    );
  }
  static AroundBulletAxisAndBeginVector(t, e, o, l, r, a = void 0) {
    var i;
    r
      ? ((i = BulletPool_1.BulletPool.CreateVector()),
        0 < e.X
          ? (i.Set(
              Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
              0,
              Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
            ),
            r.ActorQuatProxy.RotateVector(i, o),
            l.FromUeVector(r.ActorRightProxy))
          : 0 < e.Y
            ? (i.Set(
                Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
                Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
                0,
              ),
              r.ActorQuatProxy.RotateVector(i, o),
              l.FromUeVector(r.ActorUpProxy))
            : (i.Set(
                0,
                Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
                Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
              ),
              r.ActorQuatProxy.RotateVector(i, o),
              l.FromUeVector(r.ActorForwardProxy)),
        BulletPool_1.BulletPool.RecycleVector(i))
      : a
        ? ((r = t.Z),
          0 < e.X
            ? (Vector_1.Vector.Lerp(
                Vector_1.Vector.ForwardVectorProxy,
                a,
                MathUtils_1.MathUtils.Clamp(r, 0, 180),
                o,
              ),
              a.CrossProduct(Vector_1.Vector.ForwardVectorProxy, l))
            : 0 < e.Y
              ? ((i = BulletPool_1.BulletPool.CreateVector()),
                a.CrossProduct(Vector_1.Vector.ForwardVectorProxy, i),
                Vector_1.Vector.Lerp(
                  i,
                  Vector_1.Vector.ForwardVectorProxy,
                  MathUtils_1.MathUtils.Clamp(r, 0, 180),
                  o,
                ),
                BulletPool_1.BulletPool.RecycleVector(i),
                l.FromUeVector(a))
              : ((i = BulletPool_1.BulletPool.CreateVector()),
                a.CrossProduct(Vector_1.Vector.ForwardVectorProxy, i),
                Vector_1.Vector.Lerp(
                  a,
                  i,
                  MathUtils_1.MathUtils.Clamp(r, 0, 180),
                  o,
                ),
                BulletPool_1.BulletPool.RecycleVector(i),
                l.FromUeVector(Vector_1.Vector.ForwardVectorProxy)))
        : 0 < e.X
          ? (o.Set(
              Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
              0,
              Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
            ),
            l.FromUeVector(Vector_1.Vector.RightVectorProxy))
          : 0 < e.Y
            ? (o.Set(
                Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
                Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
                0,
              ),
              l.FromUeVector(Vector_1.Vector.UpVectorProxy))
            : (o.Set(
                0,
                Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad),
                Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad),
              ),
              l.FromUeVector(Vector_1.Vector.ForwardVectorProxy));
  }
  static TagStackCountCondition(t, e) {
    e = e.split("#").map((t) => t.trim());
    if (2 !== e.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "子弹数组Tag条件 格式错误! 参数需要2个!",
          ),
        !1
      );
    var o = Number(e[1]);
    if (isNaN(o))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            20,
            "子弹数组Tag条件 格式错误! 参数需要是数字!",
          ),
        !1
      );
    if (o <= 0) return !0;
    switch (e[0]) {
      case ">":
        return o < t;
      case ">=":
        return o <= t;
      case "<":
        return t < o;
      case "<=":
        return t <= o;
      case "==":
        return t === o;
      case "!=":
        return t !== o;
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "子弹数组Tag条件 格式错误! 不支持的操作符!",
            ),
          !1
        );
    }
  }
}
((exports.BulletUtil = BulletUtil).TmpRotator = Rotator_1.Rotator.Create()),
  (BulletUtil.TmpRotator2 = Rotator_1.Rotator.Create()),
  (BulletUtil.TmpQuat = Quat_1.Quat.Create()),
  (BulletUtil.TmpQuat2 = Quat_1.Quat.Create()),
  (BulletUtil.TmpVector = Vector_1.Vector.Create()),
  (BulletUtil.Ua1 = Vector_1.Vector.Create()),
  (BulletUtil.Ba1 = Rotator_1.Rotator.Create());
//# sourceMappingURL=BulletUtil.js.map
