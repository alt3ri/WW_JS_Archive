"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
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
      return o.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Vision
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
    o.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
      (l = o.GetEntityCamp());
    o = 2 * CampUtils_1.CampUtils.GetCampRelationship(r, l);
    return e === t.AttackerActorComp
      ? !!(1 & t.BulletCamp)
      : !!(t.BulletCamp & o);
  }
  static DoesEntityContainsTag(t, e) {
    return (
      !!t &&
      (!!t.GetComponent(177)?.HasTag(e) ||
        (!!(t = t.GetComponent(185)) && t.HasTag(e)))
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
    var e;
    return (
      !!t.AttackerActorComp.IsRoleAndCtrlByMe ||
      !(
        !t.AttackerActorComp.IsAutonomousProxy ||
        !t.BulletDataMain.Render.CameraShakeToSummonOwner ||
        ((t = t.AttackerCreatureDataComp.GetSummonerId()),
        (e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint()
          ?.GetComponent(0)
          ?.GetCreatureDataId()),
        !t) ||
        t !== e
      )
    );
  }
  static SummonBullet(t, e, o, r, l = void 0, a = void 0) {
    var i =
      BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
        11,
      );
    (i.ChildrenType = e),
      (i.Victim = o),
      (i.IsStayInCharacter = r),
      l && (i.ParentImpactPoint = Vector_1.Vector.Create(l)),
      a && (i.ParentLastPosition = Vector_1.Vector.Create(a)),
      BulletController_1.BulletController.GetActionRunner().AddAction(t, i);
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
  static SetTimeScale(t, e, o, r, l, a, i = 0, n = 0) {
    if (l <= 0 || t.BulletDataMain.TimeScale.TimeScaleWithAttacker) return 0;
    if (0 < i && l <= i) return 0;
    var i = Time_1.Time.WorldTimeSeconds - i,
      u = i + l;
    let _ = n;
    0 <= n && ((t.TimeScaleId += 1), (_ = t.TimeScaleId));
    n = new PawnTimeScaleComponent_1.TimeScale(i, u, e, o, r, l, _, a);
    return t.TimeScaleList.Push(n), t.TimeScaleMap.set(_, n), _;
  }
  static RemoveTimeScale(t, e) {
    t = t.TimeScaleMap.get(e);
    t && (t.MarkDelete = !0);
  }
  static GetHitRotator(t, e, o) {
    o.FromUeRotator(e.ActorRotationProxy);
    var r = t.BulletDataMain.Base.RelativeDirection;
    if (3 === r) return !1;
    if (
      (0, RegisterComponent_1.isComponentInstance)(e, 3) &&
      e.Entity.GetComponent(185)?.HasTag(855966206)
    )
      return !1;
    var l = t.AttackerActorComp,
      a = Vector_1.Vector.Create();
    switch (r) {
      case 0:
        a.FromUeVector(l.ActorLocationProxy),
          a.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            a,
            Vector_1.Vector.UpVectorProxy,
            o,
          );
        break;
      case 1:
        a.FromUeVector(t.ActorComponent.ActorLocationProxy),
          a.SubtractionEqual(e.ActorLocationProxy),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            a,
            Vector_1.Vector.UpVectorProxy,
            o,
          );
        break;
      case 2:
        t.MoveInfo.BulletSpeedDir.Equals(
          Vector_1.Vector.ZeroVectorProxy,
          MathCommon_1.MathCommon.KindaSmallNumber,
        )
          ? (a.FromUeVector(t.ActorComponent.ActorForward),
            (a.Z = 0),
            a.MultiplyEqual(-1))
          : a.Set(
              -t.MoveInfo.BulletSpeedDir.X,
              -t.MoveInfo.BulletSpeedDir.Y,
              0,
            ),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            a,
            Vector_1.Vector.UpVectorProxy,
            o,
          );
        break;
      case 4:
        SpaceUtils_1.SpaceUtils.IsLocationInSideBullet(t, e.ActorLocationProxy)
          ? (a.FromUeVector(e.ActorLocationProxy),
            a.SubtractionEqual(t.ActorComponent.ActorLocationProxy))
          : (a.FromUeVector(t.ActorComponent.ActorLocationProxy),
            a.SubtractionEqual(e.ActorLocationProxy)),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            a,
            Vector_1.Vector.UpVectorProxy,
            o,
          );
    }
    return !0;
  }
  static SetHitRotator(t, e, o) {
    var r = Rotator_1.Rotator.Create();
    return (
      BulletUtil.GetHitRotator(t, e, r) &&
        !e.Entity.GetComponent(185)?.HasTag(1447214865) &&
        ((r.Yaw += o),
        e.SetActorRotation(r.ToUeRotator(), this.constructor.name, !1),
        (0, RegisterComponent_1.isComponentInstance)(e, 3)) &&
        e.SetInputRotator(r),
      r.ToUeRotator()
    );
  }
  static GetOverrideHitAnimByAngle(t, e, o) {
    let r = e;
    var e = (0, RegisterComponent_1.isComponentInstance)(t, 182),
      l = ModelManager_1.ModelManager.BulletModel,
      a = l.SelfAdaptBeHitAnim.has(r);
    return (
      (a || e) &&
        ((o =
          (((o - 180 - t.ActorRotationProxy.Yaw + QUARTER_PI_DEGREE) % 360) +
            360) %
          360),
        (t = Math.floor(o / 90)),
        a
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
    return (
      (t.AttackerHandle?.Valid ?? !1) && void 0 !== t.AttackerActorComp?.Actor
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
        a =
          (o.AttackerActorComp.ActorRotationProxy.Clamp(l),
          BulletPool_1.BulletPool.CreateRotator());
      o.MoveInfo.BeginSpeedRotator.Clamp(a);
      let t = a.Pitch,
        e =
          (void 0 !== (n = r.get(0)) &&
            t < MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.min(t, n)),
          void 0 !== (n = r.get(1)) &&
            t > MathCommon_1.MathCommon.FlatAngle &&
            (t = Math.max(t, MathCommon_1.MathCommon.RoundAngle - n)),
          a.Yaw);
      e =
        e > MathCommon_1.MathCommon.FlatAngle
          ? e - MathCommon_1.MathCommon.RoundAngle
          : e;
      var i,
        n = r.get(3),
        u =
          (u = l.Yaw) > MathCommon_1.MathCommon.FlatAngle
            ? u - MathCommon_1.MathCommon.RoundAngle
            : u;
      void 0 !== n &&
        0 < (i = e - u) &&
        i < MathCommon_1.MathCommon.FlatAngle &&
        n < i &&
        (e = Rotator_1.Rotator.ClampAxis(l.Yaw + n)),
        void 0 !== (n = r.get(2)) &&
          0 < (i = u - e) &&
          i < MathCommon_1.MathCommon.FlatAngle &&
          n < i &&
          (e = Rotator_1.Rotator.ClampAxis(l.Yaw - n)),
        BulletPool_1.BulletPool.RecycleRotator(l),
        BulletPool_1.BulletPool.RecycleRotator(a),
        (o.MoveInfo.BeginSpeedRotator.Pitch = t),
        (o.MoveInfo.BeginSpeedRotator.Yaw = e);
    }
  }
  static CreateBulletFromAN(t, e, o, r, l, a, i, n) {
    var u = t.GetEntityNoBlueprint();
    let _ = u?.GetComponent(187);
    n &&
      ((n = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
        u,
        Protocol_1.Aki.Protocol.Oqs.Proto_ESummonTypeConcomitantCustom,
      )?.Entity),
      (_ = n?.GetComponent(187)));
    (u = _?.CreateAnimNotifyContent(void 0, e)),
      (n = BulletController_1.BulletController.CreateBulletCustomTarget(
        t,
        e,
        o,
        {
          SkillId: Number(r),
          SyncType: l ? 1 : 0,
          InitTargetLocation: a,
          LocationOffset: i,
        },
        u,
      ));
    return n ? n.Id : -1;
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
exports.BulletUtil = BulletUtil;
//# sourceMappingURL=BulletUtil.js.map
