"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitMove = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BulletConstant_1 = require("../../Bullet/BulletConstant"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletMoveInfo_1 = require("../Model/BulletMoveInfo"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool"),
  BulletActionBase_1 = require("./BulletActionBase"),
  DEFAULT_GRAVITY = -1e3,
  DEFAULT_UP_DISTANCE = 500,
  PROFILE_AIMED_TOWARD = "BulletMoveAimedToward",
  PROFILE_STICK_GROUND = "BulletMoveStickGround";
class BulletActionInitMove extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.z5o = !1),
      (this.Z5o = void 0),
      (this.eVo = void 0),
      (this.tVo = !1);
  }
  get iVo() {
    return (
      this.z5o ||
        ((this.z5o = !0),
        (this.Z5o = this.oVo(this.rVo, this.Pe.Move.SkeletonComponentName))),
      this.Z5o
    );
  }
  set rVo(t) {
    this.eVo !== t && ((this.eVo = t), (this.z5o = !1), (this.Z5o = void 0));
  }
  get rVo() {
    return this.eVo || (this.eVo = this.BulletInfo.AttackerActorComp), this.eVo;
  }
  Clear() {
    super.Clear(),
      (this.Pe = void 0),
      (this.z5o = !1),
      (this.Z5o = void 0),
      (this.eVo = void 0),
      (this.tVo = !1);
  }
  OnExecute() {
    var t = this.BulletInfo.BulletInitParams;
    const e = this.BulletInfo.BulletDataMain;
    var l = (this.Pe = e).Move,
      o = e.Obstacle,
      i = this.BulletInfo.MoveInfo,
      r = ((i.BulletSpeedRatio = 1), this.BulletInfo.AttackerSkillComp),
      r =
        (this.BulletInfo.TargetActorComp?.Valid &&
          r?.Valid &&
          r.CurrentSkill &&
          r.SkillTargetSocket &&
          (this.BulletInfo.SkillBoneName =
            FNameUtil_1.FNameUtil.GetDynamicFName(r.SkillTargetSocket)),
        (i.BulletSpeed = l.Speed),
        i.ObstaclesOffset.FromUeVector(o.Center),
        BulletActionInitMove.nVo.Start(),
        this.sVo(),
        this.aVo(),
        BulletActionInitMove.nVo.Stop(),
        BulletActionInitMove.hVo.Start(),
        e.Base),
      o = e.Aimed;
    if (
      (!r.StickGround &&
        o.AimedCtrlDir &&
        (t.FromRemote
          ? i.BeginSpeedRotator.FromUeRotator(t.InitialTransform.Rotator())
          : this.lVo(i.BeginSpeedRotator),
        this.BulletInfo.SetActorRotation(i.BeginSpeedRotator.ToUeRotator())),
      this._Vo(),
      this.uVo(),
      this.cVo(),
      this.mVo(),
      0 < l.TrackParams.length)
    ) {
      const e = l.TrackParams[0];
      (i.MinFollowHeight = e.Y),
        (i.SpeedFollowTarget = e.X),
        0 < e.Z && (i.FollowTargetBottom = !1);
    }
    BulletActionInitMove.hVo.Stop(),
      i.LastFramePosition.FromUeVector(this.BulletInfo.GetActorLocation()),
      i.FollowBoneBulletRotator.FromUeRotator(
        this.BulletInfo.GetActorRotation(),
      ),
      this.BulletInfo.ApplyCacheLocationAndRotation();
  }
  oVo(t, e) {
    if (e !== StringUtils_1.NONE_STRING) {
      var l = t.Actor.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        ),
        o = l ? l.Num() : 0;
      for (let t = 0; t < o; t++) {
        var i = l.Get(t);
        if (i?.IsValid() && i.GetName() === e) return i;
      }
    }
    return t.SkeletalMesh;
  }
  dVo(t) {
    var e,
      l,
      o = this.Pe.Move;
    0 === o.FollowType
      ? ((l = this.BulletInfo),
        (e = this.oVo(
          t?.Valid ? t : l.AttackerActorComp,
          o.SkeletonComponentName,
        )),
        o.IsLockScale && l.Actor.RootComponent.SetAbsolute(!1, !1, !0),
        l.ApplyCacheLocationAndRotation(),
        l.ActorComponent.SetAttachToComponent(e, o.BoneName, 1, 1, 1, !0),
        l.InitPosition.FromUeVector(l.ActorComponent.ActorLocationProxy))
      : 3 === o.FollowType &&
        ((e = this.BulletInfo),
        (l = this.oVo(
          t?.Valid ? t : e.AttackerActorComp,
          o.SkeletonComponentName,
        )),
        o.IsLockScale && e.Actor.RootComponent.SetAbsolute(!1, !1, !0),
        e.ApplyCacheLocationAndRotation(),
        e.ActorComponent.SetAttachToComponent(l, o.BoneName, 0, 0, 0, !0),
        e.Actor.K2_SetActorRelativeLocation(
          e.BornLocationOffset.ToUeVector(),
          !1,
          void 0,
          !1,
        ),
        e.Actor.K2_SetActorRelativeRotation(
          Rotator_1.Rotator.ZeroRotator,
          !1,
          void 0,
          !0,
        ),
        e.InitPosition.FromUeVector(e.ActorComponent.ActorLocationProxy));
  }
  sVo() {
    var t = this.BulletInfo;
    switch (this.Pe.Base.BornPositionStandard) {
      case 0:
        this.CVo(t.AttackerActorComp);
        break;
      case 1:
        this.gVo(t.BaseTransformEntity?.Entity?.GetComponent(1));
        break;
      case 7:
      case 8:
      case 5:
      case 10:
      case 9:
      case 4:
        this.fVo(t.BaseTransformEntity);
        break;
      case 3:
        this.vVo(t);
        break;
      case 2:
        this.MVo(MathUtils_1.MathUtils.DefaultTransformProxy);
        break;
      case 6:
        this.EVo();
    }
  }
  CVo(t) {
    this.MVo(void 0), this.dVo(t);
  }
  gVo(t) {
    var e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    this.SVo(t, e),
      this.MVo(e),
      (0, RegisterComponent_1.isComponentInstance)(t, 3) && this.dVo(t);
  }
  fVo(t) {
    var e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1,
      t = t?.Entity?.GetComponent(1);
    (0, RegisterComponent_1.isComponentInstance)(t, 3)
      ? (this.SVo(t, e), (this.rVo = t), this.MVo(e), this.dVo(t))
      : (this.SVo(t, e), this.MVo(e));
  }
  vVo(t) {
    var e, l, o, i, r;
    4 === this.Pe.Move.FollowType
      ? this.yVo(t)
      : ((e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1),
        (o = t.BulletInitParams),
        (i = this.Pe.Base),
        (l = BulletPool_1.BulletPool.CreateVector()),
        e.FromUeTransform(o.InitialTransform),
        l.FromUeVector(e.GetLocation()),
        l.Equals(
          Vector_1.Vector.ZeroVectorProxy,
          MathCommon_1.MathCommon.KindaSmallNumber,
        )
          ? this.MVo(e)
          : ((o = i.BornPositionRandom),
            (i = BulletPool_1.BulletPool.CreateVector()),
            (r = BulletPool_1.BulletPool.CreateVector()),
            o.Equality(Vector_1.Vector.ZeroVectorProxy)
              ? r.FromUeVector(t.BornLocationOffset)
              : (t.BulletInitParams.FromRemote
                  ? r.FromUeVector(t.RandomPosOffset)
                  : ((r.X = this.HY(o.X)),
                    (r.Y = this.HY(o.Y)),
                    (r.Z = this.HY(o.Z)),
                    t.RandomPosOffset.FromUeVector(r)),
                r.AdditionEqual(t.BornLocationOffset)),
            e.TransformPosition(r, i),
            t.SetActorLocation(i),
            t.InitPosition.FromUeVector(i),
            BulletPool_1.BulletPool.RecycleVector(i),
            BulletPool_1.BulletPool.RecycleVector(r)),
        BulletPool_1.BulletPool.RecycleVector(l));
  }
  yVo(t) {
    var e,
      l = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
        t.ParentEntityId,
      );
    l
      ? ((l = l.GetBulletInfo()),
        (t.ParentEffect = l.EffectInfo.Effect),
        (e = EffectSystem_1.EffectSystem.GetSureEffectActor(t.ParentEffect))
          ? BulletUtil_1.BulletUtil.AttachParentEffectSkeleton(
              t,
              e,
              t.ParentEffect,
            ) &&
            t.InitPosition.FromUeVector(t.ActorComponent.ActorLocationProxy)
          : ((e = l.MoveInfo.LastFramePosition),
            t.SetActorLocation(e),
            t.InitPosition.FromUeVector(e),
            BulletController_1.BulletController.AddSimpleAction(t, 10)))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Temp",
            18,
            "子弹为跟随父子弹特效骨骼，但是找不到父子弹",
            ["EntityId", t.BulletEntityId],
            ["BulletRowName", t.BulletRowName],
            ["ParentEntityId", t.ParentEntityId],
          ),
        this.MVo(void 0));
  }
  EVo() {
    var t = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo),
      e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    e.FromUeTransform(t.ActorTransform),
      (this.rVo = t),
      this.MVo(e),
      this.dVo(t);
  }
  MVo(t) {
    var e = this.BulletInfo,
      l = e.MoveInfo,
      o = this.Pe.Base,
      i = this.Pe.Move,
      r = o.BornPositionRandom,
      a = e.AttackerActorComp,
      _ = BulletPool_1.BulletPool.CreateVector(),
      r =
        (r.Equality(Vector_1.Vector.ZeroVectorProxy)
          ? _.FromUeVector(e.BornLocationOffset)
          : (e.BulletInitParams.FromRemote
              ? _.FromUeVector(e.RandomPosOffset)
              : ((_.X = this.HY(r.X)),
                (_.Y = this.HY(r.Y)),
                (_.Z = this.HY(r.Z)),
                e.RandomPosOffset.FromUeVector(_)),
            _.AdditionEqual(e.BornLocationOffset)),
        BulletPool_1.BulletPool.CreateVector()),
      s = BulletPool_1.BulletPool.CreateVector();
    FNameUtil_1.FNameUtil.IsNothing(i.BoneName) || !this.iVo
      ? (0 === o.BornPositionStandard && (_.Z -= a.ScaledHalfHeight),
        (
          t ||
          ((o = BulletMoveInfo_1.BulletMoveInfo.TempTransform1).SetRotation(
            a.ActorQuatProxy,
          ),
          o.SetLocation(a.ActorLocationProxy),
          o.SetScale3D(a.ActorScaleProxy),
          o)
        ).TransformPosition(_, r))
      : (l.SocketTransform.FromUeTransform(
          this.iVo.GetSocketTransform(i.BoneName, 0),
        ),
        r.FromUeVector(l.SocketTransform.GetLocation()),
        a.ActorQuatProxy.RotateVector(_, s),
        r.AdditionEqual(s)),
      e.SetActorLocation(r),
      e.InitPosition.FromUeVector(r),
      BulletPool_1.BulletPool.RecycleVector(_),
      BulletPool_1.BulletPool.RecycleVector(r),
      BulletPool_1.BulletPool.RecycleVector(s);
  }
  SVo(t, e) {
    var l = this.BulletInfo,
      o = l.AttackerActorComp;
    t
      ? (e.FromUeTransform(t.GetSocketTransform(l.SkillBoneName)),
        (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          e.GetLocation(),
        ),
        this.IVo(t),
        e.SetLocation(t),
        BulletPool_1.BulletPool.RecycleVector(t))
      : (e.Reset(),
        (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          o.ActorLocation,
        ),
        this.IVo(l),
        e.SetLocation(l),
        BulletPool_1.BulletPool.RecycleVector(l)),
      e.SetRotation(o.ActorQuat);
  }
  IVo(t) {
    var e,
      l,
      o = this.BulletInfo,
      i = this.BulletInfo.BulletDataMain.Base,
      r = ((this.tVo = !1), BulletPool_1.BulletPool.CreateVector()),
      i = (r.FromUeVector(i.BornDistLimit), r.Y),
      a = r.X,
      _ = r.Z;
    r.IsZero() ||
      ((e = o.AttackerActorComp.ActorLocationProxy),
      r.FromUeVector(t),
      i < (l = Vector_1.Vector.Dist(r, e))
        ? (r.SubtractionEqual(e),
          r.Normalize(),
          r.MultiplyEqual(i),
          r.AdditionEqual(e),
          (this.tVo = !0))
        : l <= a
          ? ((this.tVo = !0),
            o.TargetActorComp?.Valid
              ? (r.SubtractionEqual(e), r.Normalize(), r.MultiplyEqual(a))
              : (r.FromUeVector(o.AttackerActorComp.ActorForward),
                r.MultiplyEqual(_)),
            r.AdditionEqual(e))
          : r.FromUeVector(t),
      t.FromUeVector(r)),
      BulletPool_1.BulletPool.RecycleVector(r);
  }
  lVo(t) {
    var e = this.BulletInfo,
      l = this.BulletInfo.BulletDataMain.Aimed,
      o = Global_1.Global.CharacterCameraManager,
      i = BulletPool_1.BulletPool.CreateVector(),
      r = BulletPool_1.BulletPool.CreateVector(),
      a = BulletPool_1.BulletPool.CreateVector(),
      _ = BulletPool_1.BulletPool.CreateVector(),
      l =
        (i.FromUeVector(o.GetCameraLocation()),
        r.FromUeVector(o.GetActorForwardVector()),
        r.MultiplyEqual(l.DistLimit),
        r.AdditionEqual(i),
        e.MoveInfo.AimedLineTraceElement ||
          (e.MoveInfo.AimedLineTraceElement =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
              ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim,
              e.AttackerId,
              e.CollisionInfo.IgnoreQueries,
            )),
        e.MoveInfo.AimedLineTraceElement),
      s =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, r),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          l,
          PROFILE_AIMED_TOWARD,
        ));
    let n = -1;
    if (s) {
      var h = l.HitResult,
        u = h.GetHitCount(),
        B = BulletPool_1.BulletPool.CreateVector(),
        c = BulletPool_1.BulletPool.CreateVector();
      c.FromUeVector(o.GetActorForwardVector());
      for (let t = 0; t < u; t++) {
        BulletConstant_1.BulletConstant.OpenMoveLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 21, "BulletAimedToward", [
            "ActorLabel",
            GlobalData_1.GlobalData.IsPlayInEditor
              ? h.Actors.Get(t)?.ActorLabel
              : h.Actors.Get(t)?.GetName(),
          ]);
        var v = h.Components.Get(t).GetCollisionProfileName();
        if (!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(v))
          if (
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, t, a),
            B.FromUeVector(a),
            B.SubtractionEqual(e.GetActorLocation()),
            B.Normalize(),
            0 < Vector_1.Vector.DotProduct(c, B))
          ) {
            v = h.Actors?.Get(t);
            if (v?.IsValid()) {
              v = ActorUtils_1.ActorUtils.GetEntityByActor(
                v,
                !1,
              )?.Entity?.GetComponent(3);
              if (!v || BulletUtil_1.BulletUtil.AttackedCondition(e, v)) {
                n = t;
                break;
              }
            }
          }
      }
      BulletPool_1.BulletPool.RecycleVector(B),
        BulletPool_1.BulletPool.RecycleVector(c);
    }
    BulletConstant_1.BulletConstant.OpenMoveLog &&
      UE.KismetSystemLibrary.DrawDebugSphere(
        GlobalData_1.GlobalData.World,
        (n < 0 ? r : a).ToUeVector(),
        10,
        10,
        ColorUtils_1.ColorUtils.LinearGreen,
        10,
      ),
      _.FromUeVector(e.GetActorLocation());
    (s = n < 0 ? r : a),
      _.SubtractionEqual(s),
      _.MultiplyEqual(-1),
      (l = UE.KismetMathLibrary.FindLookAtRotation(
        e.GetActorLocation().ToUeVector(),
        s.ToUeVector(),
      )),
      (o = e.AttackerActorComp?.ActorForwardProxy);
    o && o.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
      _.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
      t.FromUeRotator(l),
      BulletPool_1.BulletPool.RecycleVector(i),
      BulletPool_1.BulletPool.RecycleVector(r),
      BulletPool_1.BulletPool.RecycleVector(a),
      BulletPool_1.BulletPool.RecycleVector(_);
  }
  aVo() {
    var t,
      e,
      l,
      o,
      i,
      r = this.Pe.Aimed,
      a = this.Pe.Move;
    r.AimedCtrlDir ||
      3 === a.FollowType ||
      5 === a.Trajectory ||
      4 === a.Trajectory ||
      ((t = (r = this.BulletInfo).MoveInfo),
      (e = this.Pe.Base),
      this.TVo(t.BeginSpeedRotator),
      (l = BulletPool_1.BulletPool.CreateRotator()),
      a.InitVelocityRot.IsNearlyZero() ||
        (l.FromUeRotator(t.BeginSpeedRotator),
        MathUtils_1.MathUtils.ComposeRotator(
          a.InitVelocityRot,
          l,
          t.BeginSpeedRotator,
        )),
      (o = r.BulletInitParams.BeginRotatorOffset) &&
        ((i = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o),
        l.FromUeRotator(t.BeginSpeedRotator),
        MathUtils_1.MathUtils.ComposeRotator(i, l, t.BeginSpeedRotator),
        BulletPool_1.BulletPool.RecycleRotator(i)),
      (e.StickGround && !e.IgnoreGradient) ||
        (e.Rotator.IsNearlyZero() || (r.IsCollisionRelativeRotationModify = !0),
        a.InitVelocityDirRandom.IsZero() ||
          this.LVo(t.BeginSpeedRotator, a.InitVelocityDirRandom),
        BulletUtil_1.BulletUtil.ClampBeginRotator(r),
        r.SetActorRotation(t.BeginSpeedRotator)),
      BulletPool_1.BulletPool.RecycleRotator(l));
  }
  LVo(t, e) {
    var l, o;
    0 < e.X
      ? ((o = BulletPool_1.BulletPool.CreateVector()),
        this.BulletInfo.BulletInitParams.FromRemote
          ? o.FromUeVector(this.BulletInfo.RandomInitSpeedOffset)
          : ((l = UE.KismetMathLibrary.RandomUnitVectorInConeInDegrees(
              Vector_1.Vector.ForwardVector,
              e.X,
            )),
            o.FromUeVector(l),
            this.BulletInfo.RandomInitSpeedOffset.FromUeVector(o)),
        t.Quaternion().RotateVector(o, o),
        MathUtils_1.MathUtils.VectorToRotator(o, t),
        BulletPool_1.BulletPool.RecycleVector(o))
      : (0 < e.Y || 0 < e.Z) &&
        ((l = BulletPool_1.BulletPool.CreateRotator()),
        this.BulletInfo?.BulletInitParams.FromRemote
          ? l.Set(
              this.BulletInfo.RandomInitSpeedOffset.Y,
              this.BulletInfo.RandomInitSpeedOffset.Z,
              0,
            )
          : ((o = this.HY(e.Y)),
            (e = this.HY(e.Z)),
            l.Set(o, e, 0),
            this.BulletInfo.RandomInitSpeedOffset.Set(0, o, e)),
        (o = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t),
        MathUtils_1.MathUtils.ComposeRotator(l, o, t),
        BulletPool_1.BulletPool.RecycleRotator(l),
        BulletPool_1.BulletPool.RecycleRotator(o));
  }
  TVo(t) {
    let e = void 0;
    var l = this.BulletInfo,
      o = l.MoveInfo,
      i = this.Pe.Move,
      r = i.InitVelocityDirParam;
    switch (i.InitVelocityDirStandard) {
      case 0:
        if (FNameUtil_1.FNameUtil.IsEmpty(i.BoneName) || 0 === i.FollowType)
          return void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
        o.SocketTransform.GetRotation().Rotator(t);
        var a = i.FollowSkeletonRotLimit,
          _ = l.GetActorRotation();
        return (
          1 <= a.X && (t.Roll = _.Roll),
          1 <= a.Y && (t.Pitch = _.Pitch),
          void (
            1 <= a.Z && (t.Yaw = l.AttackerActorComp.ActorRotationProxy.Yaw)
          )
        );
      case 3:
        _ = l.TransformCreate.Rotator();
        if (Rotator_1.Rotator.ZeroRotatorProxy.Equals2(_)) break;
        return void t.FromUeRotator(_);
      case 2:
        a = l.AttackerActorComp;
        if (a)
          return (
            (e =
              r !== StringUtils_1.NONE_STRING
                ? a.Actor.Mesh.GetSocketLocation(
                    FNameUtil_1.FNameUtil.GetDynamicFName(r),
                  )
                : a.ActorLocation),
            void t.FromUeRotator(
              BulletUtil_1.BulletUtil.FindLookAtRot(
                l.GetActorLocation(),
                e,
                i.InitVelocityKeepUp,
              ),
            )
          );
        break;
      case 1:
        return (e = BulletUtil_1.BulletUtil.GetTargetLocation(
          l.TargetActorComp,
          StringUtils_1.StringUtils.IsNothing(r)
            ? l.SkillBoneName
            : FNameUtil_1.FNameUtil.GetDynamicFName(r),
          l,
        ))
          ? void t.FromUeRotator(
              BulletUtil_1.BulletUtil.FindLookAtRot(
                l.GetActorLocation(),
                e,
                i.InitVelocityKeepUp,
              ),
            )
          : void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
      case 4:
        return void t.FromUeRotator(l.GetActorRotation());
      case 5:
      case 8:
      case 9:
      case 11:
      case 6:
      case 10:
        _ = l.GetBaseVelocityTarget();
        return _?.Valid
          ? ((e = _.GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(r),
            )),
            void t.FromUeRotator(
              BulletUtil_1.BulletUtil.FindLookAtRot(
                l.GetActorLocation(),
                e,
                i.InitVelocityKeepUp,
              ),
            ))
          : void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
      case 7:
        a = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo);
        return a?.Valid
          ? ((e = a.GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(r),
            )),
            void t.FromUeRotator(
              BulletUtil_1.BulletUtil.FindLookAtRot(
                l.GetActorLocation(),
                e,
                i.InitVelocityKeepUp,
              ),
            ))
          : void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
    }
    t.FromUeRotator(Rotator_1.Rotator.ZeroRotatorProxy);
  }
  uVo() {
    var e = this.BulletInfo,
      l = e.MoveInfo,
      o = e.BulletDataMain.Move;
    if (3 === o.Trajectory) {
      var i = BulletPool_1.BulletPool.CreateVector();
      let t = 0;
      if (0 === o.TrackTarget || 10 === o.TrackTarget) {
        var r = BulletUtil_1.BulletUtil.GetCurrentRole(e);
        if (!r)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                21,
                "围绕中心旋转子弹获取不到当前玩家控制的角色",
                ["Id", e.BulletRowName],
                ["Attacker", e.AttackerActorComp.Actor.GetName()],
              ),
            BulletController_1.BulletController.DestroyBullet(
              e.BulletEntityId,
              !1,
            ),
            void BulletPool_1.BulletPool.RecycleVector(i)
          );
        l.RoundCenter.FromUeVector(e.InitPosition),
          (t = r.ActorRotation.Yaw),
          i.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      } else {
        r = e.TargetActorComp;
        r?.Valid
          ? (this.DVo(r),
            (t = r.ActorRotation.Yaw),
            i.FromUeVector(r.ActorForward))
          : (l.RoundCenter.FromUeVector(e.InitPosition),
            i.FromUeVector(Vector_1.Vector.ForwardVectorProxy));
      }
      (r = o.TrackParams[0]), (o = BulletPool_1.BulletPool.CreateVector());
      i.RotateAngleAxis(r.Y, Vector_1.Vector.UpVectorProxy, o),
        (o.Z =
          -Math.sin((t + r.Y) * MathCommon_1.MathCommon.DegToRad) *
          Math.tan(r.Z * MathCommon_1.MathCommon.DegToRad)),
        o.Normalize(),
        o.MultiplyEqual(r.X),
        o.AdditionEqual(l.RoundCenter),
        e.SetActorLocation(o),
        l.RoundOnceAxis.Set(
          0,
          Math.sin(r.Z * MathCommon_1.MathCommon.DegToRad),
          Math.cos(r.Z * MathCommon_1.MathCommon.DegToRad),
        ),
        BulletPool_1.BulletPool.RecycleVector(i),
        BulletPool_1.BulletPool.RecycleVector(o);
    }
  }
  DVo(t) {
    var e = this.BulletInfo,
      l = e.MoveInfo;
    e.ClearCacheLocationAndRotation(),
      e.ActorComponent.SetActorTransform(t.ActorTransform),
      l.RoundCenter.FromUeVector(
        t.ActorTransform.TransformPosition(e.BornLocationOffset.ToUeVector()),
      ),
      l.RoundCenterLastLocation.FromUeVector(t.ActorLocation);
  }
  cVo() {
    var r = this.Pe.Move,
      a = r.Trajectory,
      _ = 4 === a;
    if (_ || 5 === a) {
      a = r.TrackParams;
      if (a && !(a.length < 2)) {
        var s = this.BulletInfo,
          n = s.MoveInfo;
        let t = 0,
          e = !1,
          l = 0,
          o = void 0;
        _
          ? ((h = a[2]), (o = a[3]), h && ((t = h.X), (e = 0 < h.Z), (l = h.Y)))
          : ((h = a[1]), (o = a[2]), h && (t = h.Y)),
          n.GravityMoveRotator.Reset();
        var h = s.Attacker?.GetComponent(3),
          u = s.TargetActorComp,
          B = BulletPool_1.BulletPool.CreateVector(),
          c = FNameUtil_1.FNameUtil.GetDynamicFName(r.TrackTargetBlackboardKey),
          c = BulletUtil_1.BulletUtil.GetTargetLocation(
            u,
            FNameUtil_1.FNameUtil.IsNothing(c) ? s.SkillBoneName : c,
            s,
          );
        if (c) {
          u?.Valid && (0, RegisterComponent_1.isComponentInstance)(u, 3)
            ? (B.FromUeVector(c),
              0 !== t &&
                (B.Z += u.Actor.CapsuleComponent.CapsuleHalfHeight * t),
              e &&
                (v = u.Entity?.GetComponent(164)) &&
                (B.Z -= v.GetHeightAboveGround()))
            : B.FromUeVector(c);
          var v = BulletPool_1.BulletPool.CreateVector(!0);
          const C = BulletPool_1.BulletPool.CreateVector();
          switch (r.DestOffsetForward) {
            case 0:
              C.FromUeVector(s.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              B.Subtraction(s.AttackerActorComp.ActorLocationProxy, C),
                (C.Z = 0),
                C.Normalize();
              break;
            case 1:
              C.FromUeVector(u.ActorForwardProxy);
          }
          var c = r.DestOffset.X,
            m = r.DestOffset.Y,
            M = r.DestOffset.Z;
          0 !== m &&
            ((P = BulletPool_1.BulletPool.CreateVector()),
            Vector_1.Vector.CrossProduct(C, Vector_1.Vector.UpVectorProxy, P),
            P.MultiplyEqual(m),
            v.AdditionEqual(P),
            BulletPool_1.BulletPool.RecycleVector(P)),
            0 !== c && (C.MultiplyEqual(c), v.AdditionEqual(C)),
            0 !== M &&
              ((m = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                Vector_1.Vector.UpVectorProxy,
              ),
              m.MultiplyEqual(M),
              v.AdditionEqual(m),
              BulletPool_1.BulletPool.RecycleVector(m)),
            B.AdditionEqual(v),
            BulletPool_1.BulletPool.RecycleVector(v),
            BulletPool_1.BulletPool.RecycleVector(C);
        } else
          B.FromUeVector(h.ActorForwardProxy),
            B.MultiplyEqual(a[0].X),
            B.AdditionEqual(h.ActorLocationProxy);
        let i = 0;
        var P = a[0],
          m =
            (_
              ? ((M = 0 < (c = a[1]).Z ? c.Z : 1),
                (n.Gravity = 0 !== P.Z ? P.Z : DEFAULT_GRAVITY),
                (m = Vector_1.Vector.Dist2D(B, s.GetActorLocation())),
                (m += l),
                (m = Math.max(m, P.X)),
                (m = Math.min(m, P.Y)),
                (n.BulletSpeed2D = m / M),
                (v = B.Z - s.GetActorLocation().Z),
                (v = Math.max(v, c.X)),
                (v = Math.min(v, c.Y)),
                (n.BulletSpeedZ = v / M - 0.5 * n.Gravity * M),
                (n.BulletSpeed = Math.sqrt(
                  Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2),
                )),
                (i =
                  Math.atan(n.BulletSpeedZ / n.BulletSpeed2D) *
                  MathCommon_1.MathCommon.RadToDeg))
              : ((i = a[1].X),
                (n.Gravity = 0 !== P.Z ? P.Z : DEFAULT_GRAVITY),
                (h = Vector_1.Vector.Dist2D(B, s.GetActorLocation())),
                (_ = B.Z - s.GetActorLocation().Z),
                (n.BulletSpeed2D = Math.sqrt(
                  Math.abs(
                    (h * h * n.Gravity) /
                      (2 * _ -
                        2 * Math.tan(i * MathCommon_1.MathCommon.DegToRad) * h),
                  ),
                )),
                (n.BulletSpeedZ =
                  Math.tan(i * MathCommon_1.MathCommon.DegToRad) *
                  n.BulletSpeed2D),
                (n.BulletSpeed = Math.sqrt(
                  Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2),
                )),
                (n.BulletSpeed = Math.max(P.X, n.BulletSpeed)),
                (n.BulletSpeed = Math.min(P.Y, n.BulletSpeed)),
                (n.BulletSpeedZ =
                  Math.sin(i * MathCommon_1.MathCommon.DegToRad) *
                  n.BulletSpeed),
                (n.BulletSpeed2D =
                  Math.cos(i * MathCommon_1.MathCommon.DegToRad) *
                  n.BulletSpeed)),
            n.GravityMoveRotator);
        const C = BulletPool_1.BulletPool.CreateVector();
        B.Subtraction(s.GetActorLocation(), C),
          C.Normalize(),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            C,
            Vector_1.Vector.UpVectorProxy,
            m,
          ),
          BulletPool_1.BulletPool.RecycleVector(C),
          (m.Pitch = i),
          r.InitVelocityRot.IsNearlyZero() ||
            ((c = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(m),
            MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, c, m),
            BulletPool_1.BulletPool.RecycleRotator(c)),
          !o ||
            (1 !== o.X && 2 !== o.X) ||
            (s.SetActorRotation(m), (n.ActorRotateParabola = 2 === o.X)),
          BulletPool_1.BulletPool.RecycleVector(B);
      }
    }
  }
  mVo() {
    var t = this.BulletInfo,
      e = t.MoveInfo,
      l = t.AttackerMoveComp,
      o = this.Pe.Move,
      i = o.FollowType;
    (0 !== i && 3 !== i) || (t.ActorComponent.NeedDetach = !0),
      l?.HasBaseMovement &&
        (0 === o.Speed
          ? t.ActorComponent.NeedDetach ||
            (t.ApplyCacheLocationAndRotation(),
            t.ActorComponent.SetAttachToComponent(
              t.AttackerActorComp.Actor.BasedMovement.MovementBase,
              FNameUtil_1.FNameUtil.NONE,
              1,
              1,
              1,
              !1,
            ),
            (t.ActorComponent.NeedDetach = !0))
          : ((e.IsOnBaseMovement = !0),
            (i = l.DeltaBaseMovementSpeed) &&
              e.LastBaseMovementSpeed.FromUeVector(i)));
  }
  _Vo() {
    var t = this.BulletInfo,
      e = this.Pe.Base;
    if (e.StickGround) {
      var i = BulletPool_1.BulletPool.CreateVector(),
        r = BulletPool_1.BulletPool.CreateVector(),
        a =
          (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||
            (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace =
              BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
                UE.TraceLineElement.StaticClass(),
                QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
              )),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((a = (_ = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(
              this.BulletInfo.Attacker.Id,
            ))
              ? 2
              : 0),
            BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(
              a,
            ),
            _) &&
            (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearGreen,
            ),
            TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearRed,
            )),
          BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace),
        _ = t.BaseTransformEntity?.Entity?.GetComponent(3),
        s =
          (r.FromUeVector(t.GetActorLocation()),
          _?.Valid &&
            !this.tVo &&
            (0, RegisterComponent_1.isComponentInstance)(_, 3));
      let l = 0;
      (l = (
        s
          ? _.GetSocketLocation(t.SkillBoneName)
          : ((r.Z += DEFAULT_UP_DISTANCE), t.GetActorLocation())
      ).Z),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(a, r),
        r.FromUeVector(t.GetActorLocation()),
        (r.Z -= e.StickTraceLen),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(a, r);
      var s = TraceElementCommon_1.TraceElementCommon.LineTrace(
          a,
          PROFILE_STICK_GROUND,
        ),
        n = a.HitResult;
      let o = -1;
      if (s) {
        var h = n.GetHitCount();
        if (0 < h) {
          let e = Math.abs(n.LocationZ_Array.Get(0) - l);
          for (let t = (o = 0); t < h; t++) {
            var u = n.LocationZ_Array.Get(t),
              u = Math.abs(u - l);
            e > u && ((e = u), (o = t));
          }
        }
      }
      0 <= o
        ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, o, i),
          t.SetActorLocation(i),
          e.IgnoreGradient
            ? i.FromUeVector(Vector_1.Vector.UpVectorProxy)
            : TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, o, i))
        : (_?.Valid
            ? (i.FromUeVector(_.ActorLocationProxy),
              (i.Z -= _.ScaledHalfHeight))
            : (i.FromUeVector(t.GetActorLocation()), (i.Z -= e.Size.Z)),
          t.SetActorLocation(i),
          i.FromUeVector(Vector_1.Vector.UpVectorProxy));
      a = BulletPool_1.BulletPool.CreateRotator();
      e.IgnoreGradient ||
        (MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.ForwardVectorProxy,
          i,
          a,
        ),
        t.SetActorRotation(a),
        0 !== t.AttackerActorComp.ActorRotationProxy.Yaw &&
          (a.Set(0, t.AttackerActorComp.ActorRotationProxy.Yaw, 0),
          t.AddBulletLocalRotator(a.ToUeRotator()))),
        BulletPool_1.BulletPool.RecycleVector(i),
        BulletPool_1.BulletPool.RecycleVector(r),
        BulletPool_1.BulletPool.RecycleRotator(a);
    }
  }
  HY(t) {
    return 0 === t ? 0 : Math.random() * t;
  }
}
((exports.BulletActionInitMove = BulletActionInitMove).nVo =
  Stats_1.Stat.Create("BulletInitMoveBase")),
  (BulletActionInitMove.hVo = Stats_1.Stat.Create("BulletInitMoveSpecial"));
//# sourceMappingURL=BulletActionInitMove.js.map
