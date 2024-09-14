"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
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
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  CampUtils_1 = require("../Character/Common/Blueprint/Utils/CampUtils"),
  PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent"),
  BulletController_1 = require("./BulletController"),
  BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("./Model/BulletPool"),
  QUARTER_PI_DEGREE = 45;
class BulletUtil {
  static GetTargetLocation(t, e, o) {
    return 10 === o.BulletDataMain.Move.TrackTarget
      ? o.BulletInitParams.InitTargetLocation
      : t?.Valid && t.Entity?.IsInit
        ? t.GetSocketLocation(e)
        : void 0;
  }
  static AttackedCondition(t, e) {
    if (
      !e?.Entity?.Valid ||
      this.DoesEntityContainsTag(e.Entity, 1008164187) ||
      this.DoesEntityContainsTag(e.Entity, -208062360)
    )
      return !1;
    var o = e.Entity.GetComponent(0);
    if (11 === t.BulletCamp)
      return o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? o.GetPlayerId() === t.AttackerPlayerId
        : ((r = ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
                t.AttackerPlayerId,
                { ParamType: 2, IsControl: !0 },
              ).EntityHandle.Id
            : Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
          ModelManager_1.ModelManager.CharacterModel.IsValid(r)
            ? r === e.Entity.Id
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Bullet",
                  21,
                  "子弹对小队攻击，找不到当前控制玩家",
                  ["Id", t.BulletRowName],
                  ["Attacker", t.AttackerActorComp?.Actor?.GetName()],
                  ["CurrentEntityId", r],
                ),
              !1));
    var r = t.AttackerCamp;
    let l = 0;
    o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player &&
      (l = o.GetEntityCamp());
    o = 2 * CampUtils_1.CampUtils.GetCampRelationship(r, l);
    return e === t.AttackerActorComp
      ? !!(1 & t.BulletCamp)
      : !!(t.BulletCamp & o);
  }
  static DoesEntityContainsTag(t, e) {
    return (
      !!t &&
      (!!t.GetComponent(181)?.HasTag(e) ||
        (!!(t = t.GetComponent(190)) && t.HasTag(e)))
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
    let o = !1;
    var r = t.BulletDataMain.Render;
    return (
      (0, RegisterComponent_1.isComponentInstance)(e, 3) &&
        e.IsRoleAndCtrlByMe &&
        0 < r.VictimCameraShakeOnHit.length &&
        r.CameraShakeCountMax > t.ShakeNumbers &&
        (o = !0),
      (o =
        t.Attacker &&
        t.IsAutonomousProxy &&
        (0 < r.AttackerCameraShakeOnHit.length ||
          0 < r.AttackerCameraShakeOnHitWeakPoint.length) &&
        r.CameraShakeCountMax > t.ShakeNumbers &&
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
  static SummonBullet(t, e, o, r, l = void 0, i = void 0, a = !0) {
    var n =
      BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
        11,
      );
    (n.ChildrenType = e),
      (n.Victim = o),
      (n.IsStayInCharacter = r),
      (n.CreateOnAuthority = a),
      l && (n.ParentImpactPoint = Vector_1.Vector.Create(l)),
      i && (n.ParentLastPosition = Vector_1.Vector.Create(i)),
      BulletController_1.BulletController.GetActionRunner().AddAction(t, n);
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
      for (const l of t) {
        var r = l.GetBulletInfo();
        (!StringUtils_1.StringUtils.IsEmpty(e) &&
          r.BulletDataMain.BulletName !== e) ||
          BulletUtil.FrozenBulletTime(r, o);
      }
  }
  static UnFrozenCharacterBullet(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const r of t) {
        var o = r.GetBulletInfo();
        (!StringUtils_1.StringUtils.IsEmpty(e) &&
          o.BulletDataMain.BulletName !== e) ||
          BulletUtil.BulletUnfrozen(o);
      }
  }
  static SetTimeScale(t, e, o, r, l, i, a = 0, n = 0) {
    if (l <= 0 || t.BulletDataMain.TimeScale.TimeScaleWithAttacker) return 0;
    if (0 < a && l <= a) return 0;
    var a = Time_1.Time.WorldTimeSeconds - a,
      s = a + l;
    let u = n;
    0 <= n && ((t.TimeScaleId += 1), (u = t.TimeScaleId));
    n = new PawnTimeScaleComponent_1.TimeScale(
      a,
      s,
      e,
      o,
      r,
      l,
      u,
      i,
      (0, PawnTimeScaleComponent_1.getSourceGroup)(i),
    );
    return t.TimeScaleList.Push(n), t.TimeScaleMap.set(u, n), u;
  }
  static RemoveTimeScale(t, e) {
    t = t.TimeScaleMap.get(e);
    t && (t.MarkDelete = !0);
  }
  static SetVictimTimeScale(t, e, o, r, l, i, a, n, s) {
    a <= 0 ||
      ((o = o.SetTimeScale(r, l, i, a, n)),
      s &&
        0 < o &&
        (r =
          EntitySystem_1.EntitySystem.Get(t)?.GetBulletInfo().CollisionInfo) &&
        r.HitTimeScaleEntityMap.set(e, o));
  }
  static GetHitRotator(t, e, o) {
    o.FromUeRotator(e.ActorRotationProxy);
    var r = t.BulletDataMain.Base.RelativeDirection;
    if (3 === r) return !1;
    if (
      (0, RegisterComponent_1.isComponentInstance)(e, 3) &&
      e.Entity.GetComponent(190)?.HasTag(855966206)
    )
      return !1;
    var l = t.AttackerActorComp,
      i = Vector_1.Vector.Create();
    switch (r) {
      case 0:
        i.FromUeVector(l.ActorLocationProxy),
          i.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 1:
        i.FromUeVector(t.ActorComponent.ActorLocationProxy),
          i.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 2:
        t.MoveInfo.BulletSpeedDir.Equals(
          Vector_1.Vector.ZeroVectorProxy,
          MathCommon_1.MathCommon.KindaSmallNumber,
        )
          ? (i.FromUeVector(t.ActorComponent.ActorForward),
            (i.Z = 0),
            i.MultiplyEqual(-1))
          : i.Set(
              -t.MoveInfo.BulletSpeedDir.X,
              -t.MoveInfo.BulletSpeedDir.Y,
              0,
            ),
          MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 4:
        SpaceUtils_1.SpaceUtils.IsLocationInSideBullet(t, e.ActorLocationProxy)
          ? (i.FromUeVector(e.ActorLocationProxy),
            i.SubtractionEqual(t.ActorComponent.ActorLocationProxy))
          : (i.FromUeVector(t.ActorComponent.ActorLocationProxy),
            i.SubtractionEqual(e.ActorLocationProxy)),
          MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
    }
    return !0;
  }
  static SetHitRotator(t, e, o) {
    return (
      BulletUtil.GetHitRotator(t, e, this.TmpRotator) &&
        !e.Entity.GetComponent(190)?.HasTag(1447214865) &&
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
    let r = e;
    var e = (0, RegisterComponent_1.isComponentInstance)(t, 187),
      l = ModelManager_1.ModelManager.BulletModel,
      i = l.SelfAdaptBeHitAnim.has(r);
    return (
      (i || e) &&
        ((o =
          (((o - 180 - t.ActorRotationProxy.Yaw + QUARTER_PI_DEGREE) % 360) +
            360) %
          360),
        (t = Math.floor(o / 90)),
        i
          ? (r = (
              l.HeavyHitAnim.has(r)
                ? l.Index2HeavyHitAnimMap
                : l.Index2LightHitAnimMap
            )[t])
          : e && (r = l.Index2HeavyHitAnimMap[t])),
      r
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
  static FindLookAtRot(t, e, o) {
    var r, l;
    return o
      ? ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e),
        (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t),
        o.SubtractionEqual(r),
        (l = UE.KismetMathLibrary.MakeRotFromZX(
          Vector_1.Vector.UpVector,
          o.ToUeVector(!0),
        )),
        BulletPool_1.BulletPool.RecycleVector(o),
        BulletPool_1.BulletPool.RecycleVector(r),
        l)
      : UE.KismetMathLibrary.FindLookAtRotation(t.ToUeVector(!0), e);
  }
  static ClampBeginRotator(o) {
    var r = o.BulletDataMain.Move.BeginVelocityLimitMap;
    if (!(r.size <= 0)) {
      var l = BulletPool_1.BulletPool.CreateRotator(),
        i =
          (o.AttackerActorComp.ActorRotationProxy.Clamp(l),
          BulletPool_1.BulletPool.CreateRotator());
      o.MoveInfo.BeginSpeedRotator.Clamp(i);
      let t = i.Pitch,
        e =
          (void 0 !== (n = r.get(0)) &&
            t < MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.min(t, n)),
          void 0 !== (n = r.get(1)) &&
            t > MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.max(t, MathCommon_1.MathCommon.RoundAngle - n)),
          i.Yaw);
      e =
        e > MathCommon_1.MathCommon.FlatAngle
          ? e - MathCommon_1.MathCommon.RoundAngle
          : e;
      var a,
        n = r.get(3),
        s =
          (s = l.Yaw) > MathCommon_1.MathCommon.FlatAngle
            ? s - MathCommon_1.MathCommon.RoundAngle
            : s;
      void 0 !== n &&
        0 < (a = e - s) &&
        a < MathCommon_1.MathCommon.FlatAngle &&
        n < a &&
        (e = Rotator_1.Rotator.ClampAxis(l.Yaw + n)),
        void 0 !== (n = r.get(2)) &&
          0 < (a = s - e) &&
          a < MathCommon_1.MathCommon.FlatAngle &&
          n < a &&
          (e = Rotator_1.Rotator.ClampAxis(l.Yaw - n)),
        BulletPool_1.BulletPool.RecycleRotator(l),
        BulletPool_1.BulletPool.RecycleRotator(i),
        (o.MoveInfo.BeginSpeedRotator.Pitch = t),
        (o.MoveInfo.BeginSpeedRotator.Yaw = e);
    }
  }
  static CreateBulletFromAN(t, e, o, r, l, i, a, n, s) {
    var u = t.GetEntityNoBlueprint();
    let _ = u?.GetComponent(194);
    s &&
      ((s = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        u,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
      )?.Entity),
      (_ = s?.GetComponent(194)));
    (u = _?.CreateAnimNotifyContent(void 0, e)),
      (s = BulletController_1.BulletController.CreateBulletCustomTarget(
        t,
        e,
        o,
        {
          SkillId: Number(r),
          SyncType: l ? 1 : 0,
          InitTargetLocation: i,
          LocationOffset: a,
          BeginRotatorOffset: n,
        },
        u,
      ));
    return s ? s.Id : -1;
  }
  static AttachParentEffectSkeleton(t, e, o) {
    var r = t.BulletDataMain.Move;
    return (
      r.IsLockScale && t.Actor.RootComponent.SetAbsolute(!1, !1, !0),
      t.ClearCacheLocationAndRotation(),
      t.ActorComponent.ResetAllCachedTime(),
      (t.ActorComponent.NeedDetach = !0),
      EffectSystem_1.EffectSystem.AttachToEffectSkeletalMesh(
        o,
        t.Actor,
        r.BoneName,
        0,
      ),
      t.Actor.K2_SetActorRelativeLocation(
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
}
((exports.BulletUtil = BulletUtil).TmpRotator = Rotator_1.Rotator.Create()),
  (BulletUtil.TmpRotator2 = Rotator_1.Rotator.Create()),
  (BulletUtil.TmpQuat = Quat_1.Quat.Create()),
  (BulletUtil.TmpQuat2 = Quat_1.Quat.Create()),
  (BulletUtil.TmpVector = Vector_1.Vector.Create());
//# sourceMappingURL=BulletUtil.js.map
