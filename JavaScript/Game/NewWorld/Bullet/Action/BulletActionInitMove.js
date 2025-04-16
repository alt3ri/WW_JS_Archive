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
  PROFILE_STICK_GROUND = "BulletMoveStickGround",
  PROFILE_STICK_WATER = "BulletMoveStickWater";
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
      _ = ((i.BulletSpeedRatio = 1), this.BulletInfo.AttackerSkillComp),
      _ =
        (this.BulletInfo.TargetActorComp?.Valid &&
          _?.Valid &&
          (1 === this.BulletInfo.CreateSource || _.CurrentSkill) &&
          _.SkillTargetSocket &&
          (this.BulletInfo.SkillBoneName =
            FNameUtil_1.FNameUtil.GetDynamicFName(_.SkillTargetSocket)),
        (i.BulletSpeed = l.Speed),
        i.ObstaclesOffset.FromUeVector(o.Center),
        BulletActionInitMove.nVo.Start(),
        this.sVo(),
        this.aVo(),
        BulletActionInitMove.nVo.Stop(),
        BulletActionInitMove.hVo.Start(),
        e.Base),
      o = e.Aimed,
      _ =
        (!_.StickGround &&
          o.AimedCtrlDir &&
          (t.FromRemote
            ? i.BeginSpeedRotator.FromUeRotator(t.InitialTransform.Rotator())
            : this.lVo(i.BeginSpeedRotator),
          this.BulletInfo.SetActorRotation(i.BeginSpeedRotator.ToUeRotator())),
        this.BulletInfo.AttackerMoveComp?.IsStandardGravity ?? !0);
    if (
      (_ ? this.TNc() : this._Vo(),
      this.uVo(),
      _ ? this.bNc() : this.cVo(),
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
        e.Actor.D_K2_SetActorRelativeLocation(
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
      case 11:
        this.fVo(t.BaseTransformEntity, !0);
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
    BulletConstant_1.BulletConstant.OpenMoveLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Bullet",
        20,
        "BulletActionInitMove OnStartBaseLocation",
        ["Bullet", this.BulletInfo?.BulletRowName],
        ["Location", this.BulletInfo?.GetActorLocation()],
      );
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
  fVo(t, e = !1) {
    var l = BulletMoveInfo_1.BulletMoveInfo.TempTransform1,
      t = t?.Entity?.GetComponent(1);
    (0, RegisterComponent_1.isComponentInstance)(t, 3)
      ? (this.SVo(t, l, e),
        (this.rVo = t),
        e ? this.j2a(l) : this.MVo(l),
        this.dVo(t))
      : (this.SVo(t, l), this.MVo(l));
  }
  vVo(t) {
    var e, l, o, i;
    4 === this.Pe.Move.FollowType
      ? this.yVo(t)
      : ((e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1),
        (o = t.BulletInitParams),
        (i = this.Pe.Base),
        (l = BulletPool_1.BulletPool.CreateVector()),
        e.FromUeTransform(o.InitialTransform),
        l.FromUeVector(e.GetLocation()),
        l.Equals(Vector_1.Vector.ZeroVectorProxy)
          ? this.MVo(e)
          : (t.BulletInitParams.FromRemote ||
              ((o = i.BornPositionRandom),
              (i = BulletPool_1.BulletPool.CreateVector(!0)),
              o.Equals(Vector_1.Vector.ZeroVectorProxy) ||
                ((i.X = this.HY(o.X)),
                (i.Y = this.HY(o.Y)),
                (i.Z = this.HY(o.Z))),
              t.BornLocationOffset.Equals(Vector_1.Vector.ZeroVectorProxy) ||
                i.AdditionEqual(t.BornLocationOffset),
              i.Equals(Vector_1.Vector.ZeroVectorProxy) ||
                e.TransformPosition(i, l),
              BulletPool_1.BulletPool.RecycleVector(i)),
            t.SetActorLocation(l),
            t.InitPosition.FromUeVector(l)),
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
            17,
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
  j2a(t) {
    var e = this.BulletInfo,
      l = this.Pe.Base,
      o = BulletPool_1.BulletPool.CreateVector(),
      l = l.BornPositionRandom,
      l =
        (l.Equality(Vector_1.Vector.ZeroVectorProxy)
          ? o.FromUeVector(e.BornLocationOffset)
          : (e.BulletInitParams.FromRemote
              ? o.FromUeVector(e.RandomPosOffset)
              : ((o.X = this.HY(l.X)),
                (o.Y = this.HY(l.Y)),
                (o.Z = this.HY(l.Z)),
                e.RandomPosOffset.FromUeVector(o)),
            o.AdditionEqual(e.BornLocationOffset)),
        BulletPool_1.BulletPool.CreateVector());
    t.TransformPosition(o, l),
      e.SetActorLocation(l),
      e.InitPosition.FromUeVector(l),
      BulletPool_1.BulletPool.RecycleVector(o),
      BulletPool_1.BulletPool.RecycleVector(l);
  }
  MVo(t) {
    var e = this.BulletInfo,
      l = e.MoveInfo,
      o = this.Pe.Base,
      i = this.Pe.Move,
      _ = o.BornPositionRandom,
      r = e.AttackerActorComp,
      a = BulletPool_1.BulletPool.CreateVector(),
      _ =
        (_.Equality(Vector_1.Vector.ZeroVectorProxy)
          ? a.FromUeVector(e.BornLocationOffset)
          : (e.BulletInitParams.FromRemote
              ? a.FromUeVector(e.RandomPosOffset)
              : ((a.X = this.HY(_.X)),
                (a.Y = this.HY(_.Y)),
                (a.Z = this.HY(_.Z)),
                e.RandomPosOffset.FromUeVector(a)),
            a.AdditionEqual(e.BornLocationOffset)),
        BulletPool_1.BulletPool.CreateVector()),
      s = BulletPool_1.BulletPool.CreateVector();
    FNameUtil_1.FNameUtil.IsNothing(i.BoneName) || !this.iVo
      ? (0 === o.BornPositionStandard && (a.Z -= r.ScaledHalfHeight),
        (
          t ||
          ((o = BulletMoveInfo_1.BulletMoveInfo.TempTransform1).SetRotation(
            r.ActorQuatProxy,
          ),
          o.SetLocation(r.ActorLocationProxy),
          o.SetScale3D(r.ActorScaleProxy),
          o)
        ).TransformPosition(a, _))
      : (l.SocketTransform.FromUeTransform(
          this.iVo.D_GetSocketTransform(i.BoneName, 0),
        ),
        _.FromUeVector(l.SocketTransform.GetLocation()),
        r.ActorQuatProxy.RotateVector(a, s),
        _.AdditionEqual(s)),
      e.SetActorLocation(_),
      e.InitPosition.FromUeVector(_),
      BulletPool_1.BulletPool.RecycleVector(a),
      BulletPool_1.BulletPool.RecycleVector(_),
      BulletPool_1.BulletPool.RecycleVector(s);
  }
  SVo(t, e, l = !1) {
    var o = this.BulletInfo,
      i = o.AttackerActorComp;
    t?.Valid
      ? (e.FromUeTransform(t.GetSocketTransform(o.SkillBoneName)),
        (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          e.GetLocation(),
        ),
        this.IVo(t),
        e.SetLocation(t),
        BulletPool_1.BulletPool.RecycleVector(t))
      : (l &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            20,
            "出生位置需要完全基于目标, 但是目标不存在",
            ["子弹ID", o.BulletRowName],
          ),
        e.Reset(),
        (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
          i.ActorLocation,
        ),
        this.IVo(t),
        e.SetLocation(t),
        BulletPool_1.BulletPool.RecycleVector(t)),
      l || e.SetRotation(i.ActorQuat);
  }
  IVo(t) {
    var e,
      l,
      o = this.BulletInfo,
      i = this.BulletInfo.BulletDataMain.Base,
      _ = ((this.tVo = !1), BulletPool_1.BulletPool.CreateVector()),
      i = (_.FromUeVector(i.BornDistLimit), _.Y),
      r = _.X,
      a = _.Z;
    _.IsZero() ||
      ((e = o.AttackerActorComp.ActorLocationProxy),
      _.FromUeVector(t),
      i < (l = Vector_1.Vector.Dist(_, e))
        ? (_.SubtractionEqual(e),
          _.Normalize(),
          _.MultiplyEqual(i),
          _.AdditionEqual(e),
          (this.tVo = !0))
        : l <= r
          ? ((this.tVo = !0),
            o.TargetActorComp?.Valid
              ? (_.SubtractionEqual(e), _.Normalize(), _.MultiplyEqual(r))
              : (_.FromUeVector(o.AttackerActorComp.ActorForward),
                _.MultiplyEqual(a)),
            _.AdditionEqual(e))
          : _.FromUeVector(t),
      t.FromUeVector(_)),
      BulletPool_1.BulletPool.RecycleVector(_);
  }
  lVo(t) {
    var e = this.BulletInfo,
      l = this.BulletInfo.BulletDataMain.Aimed,
      o = Global_1.Global.CharacterCameraManager,
      i = BulletPool_1.BulletPool.CreateVector(),
      _ = BulletPool_1.BulletPool.CreateVector(),
      r = BulletPool_1.BulletPool.CreateVector(),
      a = BulletPool_1.BulletPool.CreateVector(),
      l =
        (i.FromUeVector(o.D_GetCameraLocation()),
        _.FromUeVector(o.GetActorForwardVector()),
        _.MultiplyEqual(l.DistLimit),
        _.AdditionEqual(i),
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
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, _),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          l,
          PROFILE_AIMED_TOWARD,
        ));
    let n = -1;
    if (s) {
      var u = l.HitResult,
        h = u.GetHitCount(),
        B = BulletPool_1.BulletPool.CreateVector(),
        c = BulletPool_1.BulletPool.CreateVector();
      c.FromUeVector(o.GetActorForwardVector());
      for (let t = 0; t < h; t++) {
        BulletConstant_1.BulletConstant.OpenMoveLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 20, "BulletAimedToward", [
            "ActorLabel",
            GlobalData_1.GlobalData.IsPlayInEditor
              ? u.Actors.Get(t)?.ActorLabel
              : u.Actors.Get(t)?.GetName(),
          ]);
        var m = u.Components.Get(t).GetCollisionProfileName();
        if (!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(m))
          if (
            (TraceElementCommon_1.TraceElementCommon.GetHitLocation(u, t, r),
            B.FromUeVector(r),
            B.SubtractionEqual(e.GetActorLocation()),
            B.Normalize(),
            0 < Vector_1.Vector.DotProduct(c, B))
          ) {
            m = u.Actors?.Get(t);
            if (m?.IsValid()) {
              m = ActorUtils_1.ActorUtils.GetEntityByActor(
                m,
                !1,
              )?.Entity?.GetComponent(3);
              if (!m || BulletUtil_1.BulletUtil.AttackedCondition(e, m)) {
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
      UE.KismetSystemLibrary.D_DrawDebugSphere(
        GlobalData_1.GlobalData.World,
        (n < 0 ? _ : r).ToUeVector(),
        10,
        10,
        ColorUtils_1.ColorUtils.LinearGreen,
        10,
      ),
      a.FromUeVector(e.GetActorLocation());
    (s = n < 0 ? _ : r),
      a.SubtractionEqual(s),
      a.MultiplyEqual(-1),
      (l = UE.KismetMathLibrary.FindLookAtRotation(
        e.GetActorLocation().ToUeVectorOld(),
        s.ToUeVectorOld(),
      )),
      (o = e.AttackerActorComp?.ActorForwardProxy);
    o && o.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
      a.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
      t.FromUeRotator(l),
      BulletPool_1.BulletPool.RecycleVector(i),
      BulletPool_1.BulletPool.RecycleVector(_),
      BulletPool_1.BulletPool.RecycleVector(r),
      BulletPool_1.BulletPool.RecycleVector(a);
  }
  aVo() {
    var t,
      e,
      l,
      o,
      i,
      _ = this.Pe.Aimed,
      r = this.Pe.Move;
    _.AimedCtrlDir ||
      3 === r.FollowType ||
      5 === r.Trajectory ||
      4 === r.Trajectory ||
      ((t = (_ = this.BulletInfo).MoveInfo),
      (e = this.Pe.Base),
      this.TVo(t.BeginSpeedRotator),
      (l = BulletPool_1.BulletPool.CreateRotator()),
      r.InitVelocityRot.IsNearlyZero() ||
        (l.FromUeRotator(t.BeginSpeedRotator),
        MathUtils_1.MathUtils.ComposeRotator(
          r.InitVelocityRot,
          l,
          t.BeginSpeedRotator,
        )),
      (o = _.BulletInitParams.BeginRotatorOffset) &&
        ((i = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o),
        l.FromUeRotator(t.BeginSpeedRotator),
        MathUtils_1.MathUtils.ComposeRotator(i, l, t.BeginSpeedRotator),
        BulletPool_1.BulletPool.RecycleRotator(i)),
      e.StickGround && !e.IgnoreGradient
        ? BulletPool_1.BulletPool.RecycleRotator(l)
        : (e.Rotator.IsNearlyZero() ||
            (_.IsCollisionRelativeRotationModify = !0),
          r.InitVelocityDirRandom.IsZero() ||
            this.LVo(t.BeginSpeedRotator, r.InitVelocityDirRandom),
          BulletUtil_1.BulletUtil.ClampBeginRotator(_),
          _.SetActorRotation(t.BeginSpeedRotator),
          BulletPool_1.BulletPool.RecycleRotator(l),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "BulletActionInitMove OnStartSpeedRotator",
              ["Bullet", _.BulletRowName],
              ["Rot", _.GetActorRotation()],
            )));
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
      _ = i.InitVelocityDirParam;
    switch (i.InitVelocityDirStandard) {
      case 0:
        if (FNameUtil_1.FNameUtil.IsEmpty(i.BoneName) || 0 === i.FollowType)
          return void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
        o.SocketTransform.GetRotation().Rotator(t);
        var r = i.FollowSkeletonRotLimit,
          a = l.GetActorRotation();
        return (
          1 <= r.X && (t.Roll = a.Roll),
          1 <= r.Y && (t.Pitch = a.Pitch),
          void (
            1 <= r.Z && (t.Yaw = l.AttackerActorComp.ActorRotationProxy.Yaw)
          )
        );
      case 3:
        a = l.TransformCreate.Rotator();
        if (Rotator_1.Rotator.ZeroRotatorProxy.Equals2(a)) break;
        return void t.FromUeRotator(a);
      case 2:
        r = l.AttackerActorComp;
        if (r)
          return (
            (e =
              _ !== StringUtils_1.NONE_STRING
                ? r.Actor.Mesh.D_GetSocketLocation(
                    FNameUtil_1.FNameUtil.GetDynamicFName(_),
                  )
                : r.ActorLocation),
            void t.FromUeRotator(
              (l.AttackerMoveComp?.IsStandardGravity ?? !0)
                ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                  )
                : BulletUtil_1.BulletUtil.FindLookAtRotDouble(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                    l.AttackerMoveComp?.GravityUp.ToUeVector() ??
                      Vector_1.Vector.UpVectorDouble,
                  ),
            )
          );
        break;
      case 1:
        return (e = BulletUtil_1.BulletUtil.GetTargetLocation(
          l.TargetActorComp,
          StringUtils_1.StringUtils.IsNothing(_)
            ? l.SkillBoneName
            : FNameUtil_1.FNameUtil.GetDynamicFName(_),
          l,
        ))
          ? void t.FromUeRotator(
              (l.AttackerMoveComp?.IsStandardGravity ?? !0)
                ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                  )
                : BulletUtil_1.BulletUtil.FindLookAtRotDouble(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                    l.AttackerMoveComp?.GravityUp.ToUeVector() ??
                      Vector_1.Vector.UpVectorDouble,
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
        a = l.GetBaseVelocityTarget();
        return a?.Valid
          ? ((e = a.GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(_),
            )),
            void t.FromUeRotator(
              (l.AttackerMoveComp?.IsStandardGravity ?? !0)
                ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                  )
                : BulletUtil_1.BulletUtil.FindLookAtRotDouble(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                    l.AttackerMoveComp?.GravityUp.ToUeVector() ??
                      Vector_1.Vector.UpVectorDouble,
                  ),
            ))
          : void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
      case 12:
        r = l.GetBaseVelocityTarget();
        return r?.Valid
          ? void t.FromUeRotator(r.ActorRotationProxy)
          : void t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
      case 7:
        a = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo);
        return a?.Valid
          ? ((e = a.GetSocketLocation(
              FNameUtil_1.FNameUtil.GetDynamicFName(_),
            )),
            void t.FromUeRotator(
              (l.AttackerMoveComp?.IsStandardGravity ?? !0)
                ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                  )
                : BulletUtil_1.BulletUtil.FindLookAtRotDouble(
                    l.GetActorLocation(),
                    e,
                    i.InitVelocityKeepUp,
                    l.AttackerMoveComp?.GravityUp.ToUeVector() ??
                      Vector_1.Vector.UpVectorDouble,
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
      var i = o.TrackParams,
        _ = i.length,
        r = i[0],
        i = 1 < _ ? i[1] : void 0,
        a = BulletPool_1.BulletPool.CreateVector();
      let t = 0;
      const s = e.AttackerMoveComp?.IsStandardGravity ?? !0;
      if (0 === o.TrackTarget || 10 === o.TrackTarget) {
        o = BulletUtil_1.BulletUtil.GetCurrentRole(e);
        if (!o)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                20,
                "围绕中心旋转子弹获取不到当前玩家控制的角色",
                ["Id", e.BulletRowName],
                ["Attacker", e.AttackerActorComp.Actor.GetName()],
              ),
            BulletController_1.BulletController.DestroyBullet(
              e.BulletEntityId,
              !1,
            ),
            void BulletPool_1.BulletPool.RecycleVector(a)
          );
        l.RoundCenter.FromUeVector(e.InitPosition),
          i
            ? BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                r,
                i,
                l.RoundOnceAxis,
                a,
                o,
                s ? void 0 : e.AttackerMoveComp.GravityUp,
              )
            : ((t = o.ActorRotation.Yaw),
              a.FromUeVector(Vector_1.Vector.ForwardVectorProxy));
      } else {
        o = e.TargetActorComp;
        o?.Valid
          ? (this.DVo(o),
            i
              ? BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                  r,
                  i,
                  l.RoundOnceAxis,
                  a,
                  o,
                  s ? void 0 : e.AttackerMoveComp.GravityUp,
                )
              : ((t = o.ActorRotation.Yaw), a.FromUeVector(o.ActorForward)))
          : (l.RoundCenter.FromUeVector(e.InitPosition),
            i
              ? BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                  r,
                  i,
                  l.RoundOnceAxis,
                  a,
                  void 0,
                  s ? void 0 : e.AttackerMoveComp.GravityUp,
                )
              : a.FromUeVector(Vector_1.Vector.ForwardVectorProxy));
      }
      o = BulletPool_1.BulletPool.CreateVector();
      if (1 < _)
        a.RotateAngleAxis(r.Y, l.RoundOnceAxis, o),
          o.MultiplyEqual(r.X),
          o.AdditionEqual(l.RoundCenter),
          e.SetActorLocation(o);
      else {
        const s = e.AttackerMoveComp?.IsStandardGravity ?? !0;
        s
          ? (a.RotateAngleAxis(r.Y, Vector_1.Vector.UpVectorProxy, o),
            (i = r.Z * MathCommon_1.MathCommon.DegToRad),
            (o.Z =
              -Math.sin((t + r.Y) * MathCommon_1.MathCommon.DegToRad) *
              Math.tan(i)),
            o.Normalize(),
            o.MultiplyEqual(r.X),
            o.AdditionEqual(l.RoundCenter),
            e.SetActorLocation(o),
            l.RoundOnceAxis.Set(0, Math.sin(i), Math.cos(i)))
          : ((_ = e.AttackerMoveComp.GravityUp),
            a.RotateAngleAxis(r.Y, _, o),
            o.Normalize(),
            o.MultiplyEqual(r.X),
            o.AdditionEqual(l.RoundCenter),
            e.SetActorLocation(o),
            (i = BulletPool_1.BulletPool.CreateVector()),
            Vector_1.Vector.CrossProduct(
              _,
              Vector_1.Vector.ForwardVectorProxy,
              i,
            ),
            Vector_1.Vector.Lerp(
              _,
              i,
              MathUtils_1.MathUtils.Clamp(r.Z, 0, 90) / 90,
              l.RoundOnceAxis,
            ),
            BulletPool_1.BulletPool.RecycleVector(i));
      }
      (l.AroundAngle = r.Y),
        BulletPool_1.BulletPool.RecycleVector(a),
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
    var i = this.Pe.Move,
      _ = i.Trajectory,
      r = 4 === _;
    if (r || 5 === _) {
      _ = i.TrackParams;
      if (_ && !(_.length < 2)) {
        var a = this.BulletInfo,
          s = a.MoveInfo;
        let e = 0,
          l = !1,
          t = 0,
          o = void 0;
        r
          ? ((n = _[2]), (o = _[3]), n && ((e = n.X), (l = 0 < n.Z), (t = n.Y)))
          : ((n = _[1]), (o = _[2]), n && (e = n.Y)),
          s.GravityMoveRotator.Reset();
        var n = a.Attacker?.GetComponent(3),
          u = a.TargetActorComp,
          h = BulletPool_1.BulletPool.CreateVector(),
          B = FNameUtil_1.FNameUtil.GetDynamicFName(i.TrackTargetBlackboardKey),
          B = BulletUtil_1.BulletUtil.GetTargetLocation(
            u,
            FNameUtil_1.FNameUtil.IsNothing(B) ? a.SkillBoneName : B,
            a,
          ),
          c = a.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
        if (B) {
          if (u?.Valid && (0, RegisterComponent_1.isComponentInstance)(u, 3)) {
            h.FromUeVector(B);
            let t = 0;
            0 !== e && (t = u.Actor.CapsuleComponent.CapsuleHalfHeight * e),
              l &&
                (m = u.Entity?.GetComponent(176)) &&
                (t -= m.GetHeightAboveGround());
            var m = a.Target?.GetComponent(44),
              v = BulletPool_1.BulletPool.CreateVector();
            v.FromUeVector(m?.GravityUp ?? Vector_1.Vector.UpVectorProxy),
              v.MultiplyEqual(t),
              h.AdditionEqual(v),
              BulletPool_1.BulletPool.RecycleVector(v);
          } else h.FromUeVector(B);
          var M = BulletPool_1.BulletPool.CreateVector();
          switch (i.DestOffsetForward) {
            case 0:
              M.FromUeVector(a.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              var P = BulletPool_1.BulletPool.CreateVector();
              h.Subtraction(a.AttackerActorComp.ActorLocationProxy, P),
                P.Normalize(),
                Vector_1.Vector.VectorPlaneProject(P, c, M),
                BulletPool_1.BulletPool.RecycleVector(P),
                M.Normalize();
              break;
            case 1:
              M.FromUeVector(u.ActorForwardProxy);
          }
          var m = BulletPool_1.BulletPool.CreateVector(!0),
            v = i.DestOffset.X,
            B = i.DestOffset.Y,
            U = i.DestOffset.Z;
          0 !== B &&
            ((C = BulletPool_1.BulletPool.CreateVector()),
            Vector_1.Vector.CrossProduct(c, M, C),
            C.MultiplyEqual(B),
            m.AdditionEqual(C),
            BulletPool_1.BulletPool.RecycleVector(C)),
            0 !== v && (M.MultiplyEqual(v), m.AdditionEqual(M)),
            0 !== U &&
              ((B = BulletPool_1.BulletPool.CreateVector()).FromUeVector(c),
              B.MultiplyEqual(U),
              m.AdditionEqual(B),
              BulletPool_1.BulletPool.RecycleVector(B)),
            h.AdditionEqual(m),
            BulletPool_1.BulletPool.RecycleVector(m),
            BulletPool_1.BulletPool.RecycleVector(M);
        } else
          h.FromUeVector(n.ActorForwardProxy),
            h.MultiplyEqual(_[0].X),
            h.AdditionEqual(n.ActorLocationProxy);
        var C = BulletPool_1.BulletPool.CreateVector(),
          v =
            (h.Subtraction(a.GetActorLocation(), C),
            C.Normalize(),
            s.GravityMoveRotator),
          U =
            (Vector_1.Vector.VectorPlaneProject(
              C,
              c,
              a.MoveInfo.GravityMoveForward,
            ),
            MathUtils_1.MathUtils.LookRotationUpFirst(
              a.MoveInfo.GravityMoveForward,
              c,
              v,
            ),
            BulletPool_1.BulletPool.RecycleVector(C),
            _[0]);
        r
          ? ((m = 0 < (B = _[1]).Z ? B.Z : 1),
            (s.Gravity = 0 !== U.Z ? U.Z : DEFAULT_GRAVITY),
            (n = BulletPool_1.BulletPool.CreateVector()),
            h.Subtraction(a.GetActorLocation(), n),
            (C = Vector_1.Vector.DotProduct(n, a.MoveInfo.GravityMoveForward)),
            (C += t),
            (C = Math.max(C, U.X)),
            (C = Math.min(C, U.Y)),
            (s.BulletSpeed2D = C / m),
            BulletPool_1.BulletPool.RecycleVector(n),
            (r = Vector_1.Vector.DotProduct(n, c)),
            (r = Math.max(r, B.X)),
            (r = Math.min(r, B.Y)),
            (s.BulletSpeedZ = r / m - 0.5 * s.Gravity * m),
            (s.BulletSpeed = Math.sqrt(
              Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2),
            )))
          : ((C = _[1].X),
            (s.Gravity = 0 !== U.Z ? U.Z : DEFAULT_GRAVITY),
            (n = BulletPool_1.BulletPool.CreateVector()),
            h.Subtraction(a.GetActorLocation(), n),
            (B = Vector_1.Vector.DotProduct(n, a.MoveInfo.GravityMoveForward)),
            (r = Vector_1.Vector.DotProduct(n, c)),
            BulletPool_1.BulletPool.RecycleVector(n),
            (s.BulletSpeed2D = Math.sqrt(
              Math.abs(
                (B * B * s.Gravity) /
                  (2 * r -
                    2 * Math.tan(C * MathCommon_1.MathCommon.DegToRad) * B),
              ),
            )),
            (s.BulletSpeedZ =
              Math.tan(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed2D),
            (s.BulletSpeed = Math.sqrt(
              Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2),
            )),
            (s.BulletSpeed = Math.max(U.X, s.BulletSpeed)),
            (s.BulletSpeed = Math.min(U.Y, s.BulletSpeed)),
            (s.BulletSpeedZ =
              Math.sin(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed),
            (s.BulletSpeed2D =
              Math.cos(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed)),
          i.InitVelocityRot.IsNearlyZero() ||
            ((m = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(v),
            MathUtils_1.MathUtils.ComposeRotator(i.InitVelocityRot, m, v),
            BulletPool_1.BulletPool.RecycleRotator(m)),
          !o ||
            (1 !== o.X && 2 !== o.X) ||
            (a.SetActorRotation(v), (s.ActorRotateParabola = 2 === o.X)),
          BulletPool_1.BulletPool.RecycleVector(h);
      }
    }
  }
  bNc() {
    var _ = this.Pe.Move,
      r = _.Trajectory,
      a = 4 === r;
    if (a || 5 === r) {
      r = _.TrackParams;
      if (r && !(r.length < 2)) {
        var s = this.BulletInfo,
          n = s.MoveInfo;
        let t = 0,
          e = !1,
          l = 0,
          o = void 0;
        a
          ? ((u = r[2]), (o = r[3]), u && ((t = u.X), (e = 0 < u.Z), (l = u.Y)))
          : ((u = r[1]), (o = r[2]), u && (t = u.Y)),
          n.GravityMoveRotator.Reset();
        var u = s.Attacker?.GetComponent(3),
          h = s.TargetActorComp,
          B = BulletPool_1.BulletPool.CreateVector(),
          c = FNameUtil_1.FNameUtil.GetDynamicFName(_.TrackTargetBlackboardKey),
          c = BulletUtil_1.BulletUtil.GetTargetLocation(
            h,
            FNameUtil_1.FNameUtil.IsNothing(c) ? s.SkillBoneName : c,
            s,
          );
        if (c) {
          h?.Valid && (0, RegisterComponent_1.isComponentInstance)(h, 3)
            ? (B.FromUeVector(c),
              0 !== t &&
                (B.Z += h.Actor.CapsuleComponent.CapsuleHalfHeight * t),
              e &&
                (m = h.Entity?.GetComponent(176)) &&
                (B.Z -= m.GetHeightAboveGround()))
            : B.FromUeVector(c);
          var m = BulletPool_1.BulletPool.CreateVector(!0);
          const U = BulletPool_1.BulletPool.CreateVector();
          switch (_.DestOffsetForward) {
            case 0:
              U.FromUeVector(s.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              B.Subtraction(s.AttackerActorComp.ActorLocationProxy, U),
                (U.Z = 0),
                U.Normalize();
              break;
            case 1:
              U.FromUeVector(h.ActorForwardProxy);
          }
          var c = _.DestOffset.X,
            v = _.DestOffset.Y,
            M = _.DestOffset.Z;
          0 !== v &&
            ((P = BulletPool_1.BulletPool.CreateVector()),
            Vector_1.Vector.CrossProduct(Vector_1.Vector.UpVectorProxy, U, P),
            P.MultiplyEqual(v),
            m.AdditionEqual(P),
            BulletPool_1.BulletPool.RecycleVector(P)),
            0 !== c && (U.MultiplyEqual(c), m.AdditionEqual(U)),
            0 !== M &&
              ((v = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                Vector_1.Vector.UpVectorProxy,
              ),
              v.MultiplyEqual(M),
              m.AdditionEqual(v),
              BulletPool_1.BulletPool.RecycleVector(v)),
            B.AdditionEqual(m),
            BulletPool_1.BulletPool.RecycleVector(m),
            BulletPool_1.BulletPool.RecycleVector(U);
        } else
          B.FromUeVector(u.ActorForwardProxy),
            B.MultiplyEqual(r[0].X),
            B.AdditionEqual(u.ActorLocationProxy);
        let i = 0;
        var P = r[0],
          v =
            (a
              ? ((M = 0 < (c = r[1]).Z ? c.Z : 1),
                (n.Gravity = 0 !== P.Z ? P.Z : DEFAULT_GRAVITY),
                (v = Vector_1.Vector.Dist2D(B, s.GetActorLocation())),
                (v += l),
                (v = Math.max(v, P.X)),
                (v = Math.min(v, P.Y)),
                (n.BulletSpeed2D = v / M),
                (m = B.Z - s.GetActorLocation().Z),
                (m = Math.max(m, c.X)),
                (m = Math.min(m, c.Y)),
                (n.BulletSpeedZ = m / M - 0.5 * n.Gravity * M),
                (n.BulletSpeed = Math.sqrt(
                  Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2),
                )),
                (i =
                  Math.atan(n.BulletSpeedZ / n.BulletSpeed2D) *
                  MathCommon_1.MathCommon.RadToDeg))
              : ((i = r[1].X),
                (n.Gravity = 0 !== P.Z ? P.Z : DEFAULT_GRAVITY),
                (u = Vector_1.Vector.Dist2D(B, s.GetActorLocation())),
                (a = B.Z - s.GetActorLocation().Z),
                (n.BulletSpeed2D = Math.sqrt(
                  Math.abs(
                    (u * u * n.Gravity) /
                      (2 * a -
                        2 * Math.tan(i * MathCommon_1.MathCommon.DegToRad) * u),
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
        const U = BulletPool_1.BulletPool.CreateVector();
        B.Subtraction(s.GetActorLocation(), U),
          U.Normalize(),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            U,
            Vector_1.Vector.UpVectorProxy,
            v,
          ),
          BulletPool_1.BulletPool.RecycleVector(U),
          (v.Pitch = i),
          _.InitVelocityRot.IsNearlyZero() ||
            ((c = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(v),
            MathUtils_1.MathUtils.ComposeRotator(_.InitVelocityRot, c, v),
            BulletPool_1.BulletPool.RecycleRotator(c)),
          !o ||
            (1 !== o.X && 2 !== o.X) ||
            (s.SetActorRotation(v), (n.ActorRotateParabola = 2 === o.X)),
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
        !this.Pe.Base.NotFollowMovePlatform &&
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
    var o = this.BulletInfo,
      i = this.Pe.Base;
    if (i.StickGround) {
      var _ = BulletPool_1.BulletPool.CreateVector(),
        e = BulletPool_1.BulletPool.CreateVector(),
        r =
          (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||
            (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace =
              BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
                UE.TraceLineElement.StaticClass(),
                QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
              )),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((r = (a = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(
              this.BulletInfo.Attacker.Id,
            ))
              ? 2
              : 0),
            BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(
              r,
            ),
            a) &&
            (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearGreen,
            ),
            TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearRed,
            )),
          BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace),
        a = o.BaseTransformEntity?.Entity?.GetComponent(3),
        s =
          (e.FromUeVector(o.GetActorLocation()),
          a?.Valid &&
            !this.tVo &&
            (0, RegisterComponent_1.isComponentInstance)(a, 3)),
        n = BulletPool_1.BulletPool.CreateVector(),
        u = o.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy,
        h = BulletPool_1.BulletPool.CreateVector(),
        s =
          (s
            ? n.FromUeVector(a.GetSocketLocation(o.SkillBoneName))
            : (u.Multiply(DEFAULT_UP_DISTANCE, h),
              e.AdditionEqual(h),
              n.FromUeVector(o.GetActorLocation())),
          e.X),
        B = e.Y,
        c = e.Z,
        m =
          (r.SetStartLocation(s, B, c),
          u.Multiply(i.StickTraceLen + DEFAULT_UP_DISTANCE, h),
          e.SubtractionEqual(h),
          e.X),
        v = e.Y,
        M = e.Z,
        e =
          (BulletPool_1.BulletPool.RecycleVector(e),
          r.SetEndLocation(m, v, M),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            r,
            PROFILE_STICK_GROUND,
          ));
      const T = r.HitResult;
      let t = !1,
        l = Number.MAX_VALUE;
      var P = BulletPool_1.BulletPool.CreateVector();
      if (e) {
        var U = T.GetHitCount();
        if (0 < U) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, 0, P),
            (l = Vector_1.Vector.DistSquared(P, n));
          let e = 0;
          t = !0;
          for (let t = 1; t < U; t++) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, t, P);
            var C = Vector_1.Vector.DistSquared(P, n);
            l > C && ((l = C), (e = t));
          }
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, e, _),
            o.SetActorLocation(_),
            i.IgnoreGradient ||
              TraceElementCommon_1.TraceElementCommon.GetImpactNormal(T, e, _);
        }
      }
      if (i.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||
          (BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace =
            BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
              UE.TraceLineElement.StaticClass(),
              QueryTypeDefine_1.KuroTraceTypeQuery.Water,
            ));
        (r = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace),
          (e =
            (r.SetStartLocation(s, B, c),
            r.SetEndLocation(m, v, M),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              r,
              PROFILE_STICK_WATER,
            )));
        if (e) {
          const T = r.HitResult;
          var f = T.GetHitCount();
          if (0 < f) {
            let e = -1;
            t = !0;
            for (let t = 0; t < f; t++) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, t, P);
              var E = Vector_1.Vector.DistSquared(P, n);
              l > E && ((l = E), (e = t));
            }
            -1 < e &&
              (TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, e, _),
              o.SetActorLocation(_),
              i.IgnoreGradient ||
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  T,
                  e,
                  _,
                ));
          }
        }
      }
      BulletPool_1.BulletPool.RecycleVector(n),
        BulletPool_1.BulletPool.RecycleVector(P),
        t
          ? i.IgnoreGradient && _.FromUeVector(u)
          : (h.FromUeVector(u),
            (a?.Valid
              ? (h.MultiplyEqual(a.ScaledHalfHeight), a.ActorLocationProxy)
              : (h.MultiplyEqual(o.Size.Z), o.GetActorLocation())
            ).Subtraction(h, _),
            o.SetActorLocation(_),
            _.FromUeVector(u)),
        i.IgnoreGradient ||
          ((s = BulletPool_1.BulletPool.CreateRotator()),
          MathUtils_1.MathUtils.LookRotationUpFirst(
            Vector_1.Vector.ForwardVectorProxy,
            _,
            s,
          ),
          o.SetActorRotation(s),
          0 !== o.AttackerActorComp.ActorRotationProxy.Yaw &&
            (s.Set(0, o.AttackerActorComp.ActorRotationProxy.Yaw, 0),
            o.AddBulletLocalRotator(s.ToUeRotator())),
          BulletPool_1.BulletPool.RecycleRotator(s)),
        BulletPool_1.BulletPool.RecycleVector(h),
        BulletPool_1.BulletPool.RecycleVector(_);
    }
  }
  TNc() {
    var i = this.BulletInfo,
      _ = this.Pe.Base;
    if (_.StickGround) {
      var r = BulletPool_1.BulletPool.CreateVector(),
        e = BulletPool_1.BulletPool.CreateVector(),
        a =
          (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||
            (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace =
              BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
                UE.TraceLineElement.StaticClass(),
                QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
              )),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ((a = (s = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(
              this.BulletInfo.Attacker.Id,
            ))
              ? 2
              : 0),
            BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(
              a,
            ),
            s) &&
            (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearGreen,
            ),
            TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
              BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace,
              ColorUtils_1.ColorUtils.LinearRed,
            )),
          BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace),
        s = i.BaseTransformEntity?.Entity?.GetComponent(3),
        n =
          (e.FromUeVector(i.GetActorLocation()),
          s?.Valid &&
            !this.tVo &&
            (0, RegisterComponent_1.isComponentInstance)(s, 3));
      let l = 0;
      l = (
        n
          ? s.GetSocketLocation(i.SkillBoneName)
          : ((e.Z += DEFAULT_UP_DISTANCE), i.GetActorLocation())
      ).Z;
      var n = e.X,
        u = e.Y,
        h = e.Z,
        B =
          (a.SetStartLocation(n, u, h),
          (e.Z -= _.StickTraceLen + DEFAULT_UP_DISTANCE),
          e.X),
        c = e.Y,
        m = e.Z,
        v =
          (a.SetEndLocation(B, c, m),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            a,
            PROFILE_STICK_GROUND,
          ));
      const f = a.HitResult;
      let t = !1,
        o = Number.MAX_VALUE;
      if (v) {
        var M = f.GetHitCount();
        if (0 < M) {
          o = Math.abs(f.LocationZ_Array.Get(0) - l);
          let e = 0;
          t = !0;
          for (let t = 1; t < M; t++) {
            var P = f.LocationZ_Array.Get(t),
              P = Math.abs(P - l);
            o > P && ((o = P), (e = t));
          }
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(f, e, r),
            i.SetActorLocation(r),
            _.IgnoreGradient ||
              TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f, e, r);
        }
      }
      if (_.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||
          (BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace =
            BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(
              UE.TraceLineElement.StaticClass(),
              QueryTypeDefine_1.KuroTraceTypeQuery.Water,
            ));
        (a = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace),
          (v =
            (a.SetStartLocation(n, u, h),
            a.SetEndLocation(B, c, m),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              a,
              PROFILE_STICK_WATER,
            )));
        if (v) {
          const f = a.HitResult;
          var U = f.GetHitCount();
          if (0 < U) {
            let e = -1;
            t = !0;
            for (let t = 0; t < U; t++) {
              var C = f.LocationZ_Array.Get(t),
                C = Math.abs(C - l);
              o > C && ((o = C), (e = t));
            }
            -1 < e &&
              (TraceElementCommon_1.TraceElementCommon.GetHitLocation(f, e, r),
              i.SetActorLocation(r),
              _.IgnoreGradient ||
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  f,
                  e,
                  r,
                ));
          }
        }
      }
      t
        ? _.IgnoreGradient && r.FromUeVector(Vector_1.Vector.UpVectorProxy)
        : (s?.Valid
            ? (r.FromUeVector(s.ActorLocationProxy),
              (r.Z -= s.ScaledHalfHeight))
            : (r.FromUeVector(i.GetActorLocation()), (r.Z -= i.Size.Z)),
          i.SetActorLocation(r),
          r.FromUeVector(Vector_1.Vector.UpVectorProxy));
      n = BulletPool_1.BulletPool.CreateRotator();
      _.IgnoreGradient ||
        (MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.ForwardVectorProxy,
          r,
          n,
        ),
        i.SetActorRotation(n),
        0 !== i.AttackerActorComp.ActorRotationProxy.Yaw &&
          (n.Set(0, i.AttackerActorComp.ActorRotationProxy.Yaw, 0),
          i.AddBulletLocalRotator(n.ToUeRotator()))),
        BulletPool_1.BulletPool.RecycleVector(r),
        BulletPool_1.BulletPool.RecycleVector(e),
        BulletPool_1.BulletPool.RecycleRotator(n);
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
