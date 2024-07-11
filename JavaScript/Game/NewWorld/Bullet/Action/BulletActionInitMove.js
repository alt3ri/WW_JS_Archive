"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitMove = void 0);
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletConstant_1 = require("../../Bullet/BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletMoveInfo_1 = require("../Model/BulletMoveInfo");
const BulletPool_1 = require("../Model/BulletPool");
const BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool");
const BulletActionBase_1 = require("./BulletActionBase");
const DEFAULT_GRAVITY = -1e3;
const DEFAULT_UP_DISTANCE = 500;
const PROFILE_AIMED_TOWARD = "BulletMoveAimedToward";
const PROFILE_STICK_GROUND = "BulletMoveStickGround";
class BulletActionInitMove extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.t5o = !1),
      (this.i5o = void 0),
      (this.o5o = void 0),
      (this.r5o = !1);
  }
  get n5o() {
    return (
      this.t5o ||
        ((this.t5o = !0),
        (this.i5o = this.s5o(this.a5o, this.Pe.Move.SkeletonComponentName))),
      this.i5o
    );
  }
  set a5o(t) {
    this.o5o !== t && ((this.o5o = t), (this.t5o = !1), (this.i5o = void 0));
  }
  get a5o() {
    return this.o5o || (this.o5o = this.BulletInfo.AttackerActorComp), this.o5o;
  }
  Clear() {
    super.Clear(),
      (this.Pe = void 0),
      (this.t5o = !1),
      (this.i5o = void 0),
      (this.o5o = void 0),
      (this.r5o = !1);
  }
  OnExecute() {
    const t = this.BulletInfo.BulletInitParams;
    const e = this.BulletInfo.BulletDataMain;
    const l = (this.Pe = e).Move;
    var o = e.Obstacle;
    const i = this.BulletInfo.MoveInfo;
    var r = ((i.BulletSpeedRatio = 1), this.BulletInfo.AttackerSkillComp);
    var r =
      (this.BulletInfo.TargetActorComp?.Valid &&
        r?.Valid &&
        r.CurrentSkill &&
        r.SkillTargetSocket &&
        (this.BulletInfo.SkillBoneName = FNameUtil_1.FNameUtil.GetDynamicFName(
          r.SkillTargetSocket,
        )),
      (i.BulletSpeed = l.Speed),
      i.ObstaclesOffset.FromUeVector(o.Center),
      this.l5o(),
      this._5o(),
      e.Base);
    var o = e.Aimed;
    if (
      (!r.StickGround &&
        o.AimedCtrlDir &&
        (t.FromRemote
          ? i.BeginSpeedRotator.FromUeRotator(t.InitialTransform.Rotator())
          : this.c5o(i.BeginSpeedRotator),
        this.BulletInfo.SetActorRotation(i.BeginSpeedRotator.ToUeRotator())),
      this.m5o(),
      this.d5o(),
      this.C5o(),
      this.g5o(),
      l.TrackParams.length > 0)
    ) {
      const e = l.TrackParams[0];
      (i.MinFollowHeight = e.Y), (i.SpeedFollowTarget = e.X);
    }
    i.LastFramePosition.FromUeVector(this.BulletInfo.GetActorLocation()),
      i.FollowBoneBulletRotator.FromUeRotator(
        this.BulletInfo.GetActorRotation(),
      ),
      this.BulletInfo.ApplyCacheLocationAndRotation();
  }
  s5o(t, e) {
    if (e !== StringUtils_1.NONE_STRING) {
      const l = t.Actor.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      );
      const o = l ? l.Num() : 0;
      for (let t = 0; t < o; t++) {
        const i = l.Get(t);
        if (i?.IsValid() && i.GetName() === e) return i;
      }
    }
    return t.SkeletalMesh;
  }
  f5o(t) {
    let e;
    let l;
    const o = this.Pe.Move;
    o.FollowType === 0
      ? ((l = this.BulletInfo),
        (e = this.s5o(
          t?.Valid ? t : l.AttackerActorComp,
          o.SkeletonComponentName,
        )),
        o.IsLockScale && l.Actor.RootComponent.SetAbsolute(!1, !1, !0),
        l.ApplyCacheLocationAndRotation(),
        l.ActorComponent.SetAttachToComponent(e, o.BoneName, 1, 1, 1, !0),
        l.InitPosition.FromUeVector(l.ActorComponent.ActorLocationProxy))
      : o.FollowType === 3 &&
        ((e = this.BulletInfo),
        (l = this.s5o(
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
  l5o() {
    const t = this.BulletInfo;
    switch (this.Pe.Base.BornPositionStandard) {
      case 0:
        this.p5o(t.AttackerActorComp);
        break;
      case 1:
        this.v5o(t.BaseTransformEntity?.Entity?.GetComponent(1));
        break;
      case 7:
      case 8:
      case 5:
      case 10:
      case 9:
      case 4:
        this.M5o(t.BaseTransformEntity);
        break;
      case 3:
        this.E5o(t);
        break;
      case 2:
        this.y5o(MathUtils_1.MathUtils.DefaultTransformProxy);
        break;
      case 6:
        this.I5o();
    }
  }
  p5o(t) {
    this.y5o(void 0), this.f5o(t);
  }
  v5o(t) {
    const e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    this.T5o(t, e),
      this.y5o(e),
      (0, RegisterComponent_1.isComponentInstance)(t, 3) && this.f5o(t);
  }
  M5o(t) {
    const e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    var t = t?.Entity?.GetComponent(1);
    (0, RegisterComponent_1.isComponentInstance)(t, 3)
      ? (this.T5o(t, e), (this.a5o = t), this.y5o(e), this.f5o(t))
      : (this.T5o(t, e), this.y5o(e));
  }
  E5o(t) {
    let e, l, o, i, r;
    this.Pe.Move.FollowType === 4
      ? this.L5o(t)
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
          ? this.y5o(e)
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
  L5o(t) {
    let e;
    let l = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
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
        this.y5o(void 0));
  }
  I5o() {
    const t = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo);
    const e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    e.FromUeTransform(t.ActorTransform),
      (this.a5o = t),
      this.y5o(e),
      this.f5o(t);
  }
  y5o(t) {
    const e = this.BulletInfo;
    const l = e.MoveInfo;
    let o = this.Pe.Base;
    const i = this.Pe.Move;
    var r = o.BornPositionRandom;
    const a = e.AttackerActorComp;
    const _ = BulletPool_1.BulletPool.CreateVector();
    var r =
      (r.Equality(Vector_1.Vector.ZeroVectorProxy)
        ? _.FromUeVector(e.BornLocationOffset)
        : (e.BulletInitParams.FromRemote
            ? _.FromUeVector(e.RandomPosOffset)
            : ((_.X = this.HY(r.X)),
              (_.Y = this.HY(r.Y)),
              (_.Z = this.HY(r.Z)),
              e.RandomPosOffset.FromUeVector(_)),
          _.AdditionEqual(e.BornLocationOffset)),
      BulletPool_1.BulletPool.CreateVector());
    const s = BulletPool_1.BulletPool.CreateVector();
    FNameUtil_1.FNameUtil.IsEmpty(i.BoneName) || !this.n5o
      ? (o.BornPositionStandard !== 1 && (_.Z -= a.ScaledHalfHeight),
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
          this.n5o.GetSocketTransform(i.BoneName, 0),
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
  T5o(t, e) {
    let l = this.BulletInfo;
    const o = l.AttackerActorComp;
    t
      ? (e.FromUeTransform(t.GetSocketTransform(l.SkillBoneName)),
        (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          e.GetLocation(),
        ),
        this.D5o(t),
        e.SetLocation(t),
        BulletPool_1.BulletPool.RecycleVector(t))
      : (e.Reset(),
        (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          o.ActorLocation,
        ),
        this.D5o(l),
        e.SetLocation(l),
        BulletPool_1.BulletPool.RecycleVector(l)),
      e.SetRotation(o.ActorQuat);
  }
  D5o(t) {
    let e;
    let l;
    const o = this.BulletInfo;
    var i = this.BulletInfo.BulletDataMain.Base;
    const r = ((this.r5o = !1), BulletPool_1.BulletPool.CreateVector());
    var i = (r.FromUeVector(i.BornDistLimit), r.Y);
    const a = r.X;
    const _ = r.Z;
    r.IsZero() ||
      ((e = o.AttackerActorComp.ActorLocationProxy),
      r.FromUeVector(t),
      i < (l = Vector_1.Vector.Dist(r, e))
        ? (r.SubtractionEqual(e),
          r.Normalize(),
          r.MultiplyEqual(i),
          r.AdditionEqual(e),
          (this.r5o = !0))
        : l <= a
          ? ((this.r5o = !0),
            o.TargetActorComp?.Valid
              ? (r.SubtractionEqual(e), r.Normalize(), r.MultiplyEqual(a))
              : (r.FromUeVector(o.AttackerActorComp.ActorForward),
                r.MultiplyEqual(_)),
            r.AdditionEqual(e))
          : r.FromUeVector(t),
      t.FromUeVector(r)),
      BulletPool_1.BulletPool.RecycleVector(r);
  }
  c5o(t) {
    const e = this.BulletInfo;
    var l = this.BulletInfo.BulletDataMain.Aimed;
    let o = Global_1.Global.CharacterCameraManager;
    const i = BulletPool_1.BulletPool.CreateVector();
    const r = BulletPool_1.BulletPool.CreateVector();
    const a = BulletPool_1.BulletPool.CreateVector();
    const _ = BulletPool_1.BulletPool.CreateVector();
    var l =
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
      e.MoveInfo.AimedLineTraceElement);
    let s =
      (TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, i),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, r),
      TraceElementCommon_1.TraceElementCommon.LineTrace(
        l,
        PROFILE_AIMED_TOWARD,
      ));
    let h = -1;
    if (s) {
      const n = l.HitResult;
      const u = n.GetHitCount();
      const B = BulletPool_1.BulletPool.CreateVector();
      const m = BulletPool_1.BulletPool.CreateVector();
      m.FromUeVector(o.GetActorForwardVector());
      for (let t = 0; t < u; t++) {
        BulletConstant_1.BulletConstant.OpenMoveLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 21, "BulletAimedToward", [
            "ActorLabel",
            GlobalData_1.GlobalData.IsPlayInEditor
              ? n.Actors.Get(t)?.ActorLabel
              : n.Actors.Get(t)?.GetName(),
          ]);
        let c = n.Components.Get(t).GetCollisionProfileName();
        if (!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(c))
          if (
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, t, a),
            B.FromUeVector(a),
            B.SubtractionEqual(e.GetActorLocation()),
            B.Normalize(),
            Vector_1.Vector.DotProduct(m, B) > 0)
          ) {
            c = n.Actors?.Get(t);
            if (c?.IsValid()) {
              c = ActorUtils_1.ActorUtils.GetEntityByActor(
                c,
                !1,
              )?.Entity?.GetComponent(3);
              if (!c || BulletUtil_1.BulletUtil.AttackedCondition(e, c)) {
                h = t;
                break;
              }
            }
          }
      }
      BulletPool_1.BulletPool.RecycleVector(B),
        BulletPool_1.BulletPool.RecycleVector(m);
    }
    BulletConstant_1.BulletConstant.OpenMoveLog &&
      UE.KismetSystemLibrary.DrawDebugSphere(
        GlobalData_1.GlobalData.World,
        (h < 0 ? r : a).ToUeVector(),
        10,
        10,
        ColorUtils_1.ColorUtils.LinearGreen,
        10,
      ),
      _.FromUeVector(e.GetActorLocation());
    (s = h < 0 ? r : a),
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
  _5o() {
    let t;
    let e;
    let l;
    let o = this.Pe.Aimed;
    const i = this.Pe.Move;
    o.AimedCtrlDir ||
      i.FollowType === 3 ||
      i.Trajectory === 5 ||
      i.Trajectory === 4 ||
      ((t = (o = this.BulletInfo).MoveInfo),
      (e = this.Pe.Base),
      this.R5o(t.BeginSpeedRotator),
      (l = BulletPool_1.BulletPool.CreateRotator()),
      i.InitVelocityRot.IsNearlyZero() ||
        (l.FromUeRotator(t.BeginSpeedRotator),
        MathUtils_1.MathUtils.ComposeRotator(
          i.InitVelocityRot,
          l,
          t.BeginSpeedRotator,
        )),
      (e.StickGround && !e.IgnoreGradient) ||
        (e.Rotator.IsNearlyZero() || (o.IsCollisionRelativeRotationModify = !0),
        i.InitVelocityDirRandom.IsZero() ||
          this.U5o(t.BeginSpeedRotator, i.InitVelocityDirRandom),
        BulletUtil_1.BulletUtil.ClampBeginRotator(o),
        o.SetActorRotation(t.BeginSpeedRotator)),
      BulletPool_1.BulletPool.RecycleRotator(l));
  }
  U5o(t, e) {
    let l, o;
    e.X > 0
      ? ((o = BulletPool_1.BulletPool.CreateVector()),
        this.BulletInfo.BulletInitParams.FromRemote
          ? o.FromUeVector(this.BulletInfo.RandomInitSpeedOffset)
          : ((l = UE.KismetMathLibrary.RandomUnitVectorInConeInDegrees(
              Vector_1.Vector.OneVector,
              e.X,
            )),
            o.FromUeVector(l),
            this.BulletInfo.RandomInitSpeedOffset.FromUeVector(o)),
        t.Quaternion().RotateVector(o, o),
        MathUtils_1.MathUtils.VectorToRotator(o, t),
        BulletPool_1.BulletPool.RecycleVector(o))
      : (e.Y > 0 || e.Z > 0) &&
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
  R5o(t) {
    let e = void 0;
    const l = this.BulletInfo;
    const o = l.MoveInfo;
    const i = this.Pe.Move;
    const r = i.InitVelocityDirParam;
    switch (i.InitVelocityDirStandard) {
      case 0:
        if (FNameUtil_1.FNameUtil.IsEmpty(i.BoneName) || i.FollowType === 0)
          return void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
        o.SocketTransform.GetRotation().Rotator(t);
        var a = i.FollowSkeletonRotLimit;
        var _ = l.GetActorRotation();
        return (
          a.X >= 1 && (t.Roll = _.Roll),
          a.Y >= 1 && (t.Pitch = _.Pitch),
          void (
            a.Z >= 1 && (t.Yaw = l.AttackerActorComp.ActorRotationProxy.Yaw)
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
  d5o() {
    const e = this.BulletInfo;
    const l = e.MoveInfo;
    let o = e.BulletDataMain.Move;
    if (o.Trajectory === 3) {
      const i = BulletPool_1.BulletPool.CreateVector();
      let t = 0;
      if (o.TrackTarget === 0 || o.TrackTarget === 10) {
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
          ? (this.A5o(r),
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
  A5o(t) {
    const e = this.BulletInfo;
    const l = e.MoveInfo;
    e.ClearCacheLocationAndRotation(),
      e.ActorComponent.SetActorTransform(t.ActorTransform),
      l.RoundCenter.FromUeVector(
        t.ActorTransform.TransformPosition(e.BornLocationOffset.ToUeVector()),
      ),
      l.RoundCenterLastLocation.FromUeVector(t.ActorLocation);
  }
  C5o() {
    const i = this.Pe.Move;
    let r = i.Trajectory;
    let a = r === 4;
    if (a || r === 5) {
      r = i.TrackParams;
      if (r && !(r.length < 2)) {
        const _ = this.BulletInfo;
        const s = _.MoveInfo;
        let t = 0;
        let e = !1;
        let l = 0;
        a
          ? (h = r[2]) && ((t = h.X), (e = h.Z > 0), (l = h.Y))
          : (h = r[1]) && (t = h.Y),
          s.GravityMoveRotator.Reset();
        var h = _.Attacker?.GetComponent(3);
        const n = _.TargetActorComp;
        const u = BulletPool_1.BulletPool.CreateVector();
        var B = FNameUtil_1.FNameUtil.GetDynamicFName(
          i.TrackTargetBlackboardKey,
        );
        var B = BulletUtil_1.BulletUtil.GetTargetLocation(
          n,
          FNameUtil_1.FNameUtil.IsNothing(B) ? _.SkillBoneName : B,
          _,
        );
        if (B) {
          n?.Valid && (0, RegisterComponent_1.isComponentInstance)(n, 3)
            ? (u.FromUeVector(B),
              t !== 0 &&
                (u.Z += n.Actor.CapsuleComponent.CapsuleHalfHeight * t),
              e &&
                (m = n.Entity?.GetComponent(161)) &&
                (u.Z -= m.GetHeightAboveGround()))
            : u.FromUeVector(B);
          var m = BulletPool_1.BulletPool.CreateVector(!0);
          const P = BulletPool_1.BulletPool.CreateVector();
          switch (i.DestOffsetForward) {
            case 0:
              P.FromUeVector(_.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              u.Subtraction(_.AttackerActorComp.ActorLocationProxy, P),
                (P.Z = 0),
                P.Normalize();
              break;
            case 1:
              P.FromUeVector(n.ActorForwardProxy);
          }
          var B = i.DestOffset.X;
          var c = i.DestOffset.Y;
          var v = i.DestOffset.Z;
          c !== 0 &&
            ((M = BulletPool_1.BulletPool.CreateVector()),
            Vector_1.Vector.CrossProduct(P, Vector_1.Vector.UpVectorProxy, M),
            M.MultiplyEqual(c),
            m.AdditionEqual(M),
            BulletPool_1.BulletPool.RecycleVector(M)),
            B !== 0 && (P.MultiplyEqual(B), m.AdditionEqual(P)),
            v !== 0 &&
              ((c = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                Vector_1.Vector.UpVectorProxy,
              ),
              c.MultiplyEqual(v),
              m.AdditionEqual(c),
              BulletPool_1.BulletPool.RecycleVector(c)),
            u.AdditionEqual(m),
            BulletPool_1.BulletPool.RecycleVector(m),
            BulletPool_1.BulletPool.RecycleVector(P);
        } else
          u.FromUeVector(h.ActorForwardProxy),
            u.MultiplyEqual(r[0].X),
            u.AdditionEqual(h.ActorLocationProxy);
        let o = 0;
        var M = r[0];
        var c =
          (a
            ? ((v = (B = r[1]).Z > 0 ? B.Z : 1),
              (s.Gravity = M.Z !== 0 ? M.Z : DEFAULT_GRAVITY),
              (c = Vector_1.Vector.Dist2D(u, _.GetActorLocation())),
              (c += l),
              (c = Math.max(c, M.X)),
              (c = Math.min(c, M.Y)),
              (s.BulletSpeed2D = c / v),
              (m = u.Z - _.GetActorLocation().Z),
              (m = Math.max(m, B.X)),
              (m = Math.min(m, B.Y)),
              (s.BulletSpeedZ = m / v - 0.5 * s.Gravity * v),
              (s.BulletSpeed = Math.sqrt(
                Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2),
              )),
              (o =
                Math.atan(s.BulletSpeedZ / s.BulletSpeed2D) *
                MathCommon_1.MathCommon.RadToDeg))
            : ((o = r[1].X),
              (s.Gravity = M.Z !== 0 ? M.Z : DEFAULT_GRAVITY),
              (h = Vector_1.Vector.Dist2D(u, _.GetActorLocation())),
              (a = u.Z - _.GetActorLocation().Z),
              (s.BulletSpeed2D = Math.sqrt(
                Math.abs(
                  (h * h * s.Gravity) /
                    (2 * a -
                      2 * Math.tan(o * MathCommon_1.MathCommon.DegToRad) * h),
                ),
              )),
              (s.BulletSpeedZ =
                Math.tan(o * MathCommon_1.MathCommon.DegToRad) *
                s.BulletSpeed2D),
              (s.BulletSpeed = Math.sqrt(
                Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2),
              )),
              (s.BulletSpeed = Math.max(M.X, s.BulletSpeed)),
              (s.BulletSpeed = Math.min(M.Y, s.BulletSpeed)),
              (s.BulletSpeedZ =
                Math.sin(o * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed),
              (s.BulletSpeed2D =
                Math.cos(o * MathCommon_1.MathCommon.DegToRad) *
                s.BulletSpeed)),
          s.GravityMoveRotator);
        const P = BulletPool_1.BulletPool.CreateVector();
        u.Subtraction(_.GetActorLocation(), P),
          P.Normalize(),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            P,
            Vector_1.Vector.UpVectorProxy,
            c,
          ),
          BulletPool_1.BulletPool.RecycleVector(P),
          (c.Pitch = o),
          i.InitVelocityRot.IsNearlyZero() ||
            ((B = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(c),
            MathUtils_1.MathUtils.ComposeRotator(i.InitVelocityRot, B, c),
            BulletPool_1.BulletPool.RecycleRotator(B)),
          BulletPool_1.BulletPool.RecycleVector(u);
      }
    }
  }
  g5o() {
    const t = this.BulletInfo;
    const e = t.MoveInfo;
    const l = t.AttackerMoveComp;
    const o = this.Pe.Move;
    let i = o.FollowType;
    (i !== 0 && i !== 3) || (t.ActorComponent.NeedDetach = !0),
      l?.HasBaseMovement &&
        (o.Speed === 0
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
  m5o() {
    const t = this.BulletInfo;
    const e = this.Pe.Base;
    if (e.StickGround) {
      const i = BulletPool_1.BulletPool.CreateVector();
      const r = BulletPool_1.BulletPool.CreateVector();
      var a =
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
        BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace);
      var _ = t.BaseTransformEntity?.Entity?.GetComponent(3);
      var s =
        (r.FromUeVector(t.GetActorLocation()),
        _?.Valid &&
          !this.r5o &&
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
      );
      const h = a.HitResult;
      let o = -1;
      if (s) {
        const n = h.GetHitCount();
        if (n > 0) {
          let e = Math.abs(h.LocationZ_Array.Get(0) - l);
          for (let t = (o = 0); t < n; t++) {
            var u = h.LocationZ_Array.Get(t);
            var u = Math.abs(u - l);
            e > u && ((e = u), (o = t));
          }
        }
      }
      o >= 0
        ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, o, i),
          t.SetActorLocation(i),
          e.IgnoreGradient
            ? i.FromUeVector(Vector_1.Vector.UpVectorProxy)
            : TraceElementCommon_1.TraceElementCommon.GetImpactNormal(h, o, i))
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
        t.AttackerActorComp.ActorRotationProxy.Yaw !== 0 &&
          (a.Set(0, t.AttackerActorComp.ActorRotationProxy.Yaw, 0),
          t.AddBulletLocalRotator(a.ToUeRotator()))),
        BulletPool_1.BulletPool.RecycleVector(i),
        BulletPool_1.BulletPool.RecycleVector(r),
        BulletPool_1.BulletPool.RecycleRotator(a);
    }
  }
  HY(t) {
    return t === 0 ? 0 : Math.random() * t;
  }
}
((exports.BulletActionInitMove = BulletActionInitMove).h5o = void 0),
  (BulletActionInitMove.u5o = void 0);
// # sourceMappingURL=BulletActionInitMove.js.map
