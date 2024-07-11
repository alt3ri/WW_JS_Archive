"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCollisionUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletStaticFunction_1 = require("./BulletStaticFunction");
class BulletCollisionUtil {
  static UpdateCollisionExtend(t, l, e, o, i) {
    switch (t) {
      case 0:
        l.SetBoxExtent(e.ToUeVector(), !0);
        break;
      case 1:
        l.SetSphereRadius(e.X, !0);
        break;
      case 2:
        var a = this.GetSectorExtent(e, o),
          r = l,
          s = BulletPool_1.BulletPool.CreateVector();
        i.Quaternion().RotateVector(BulletCollisionUtil.o7o, s),
          r.K2_SetRelativeLocation(s.ToUeVector(), !1, void 0, !0),
          BulletPool_1.BulletPool.RecycleVector(s),
          r.SetBoxExtent(a.ToUeVector(), !0);
        break;
      case 3:
        l.SetBoxExtent(new UE.Vector(e.X, e.X, e.Z), !0);
    }
  }
  static UpdateRegionExtend(t, l, e) {
    switch (t) {
      case 6:
        l.BoxExtent = e.ToUeVector();
        break;
      case 7:
        l.Radius = e.X;
        break;
      case 8:
        (l.Radius = e.X), (l.HalfHeight = e.Z), (l.Angle = e.Y);
        break;
      case 9:
        (l.Radius = e.X), (l.HalfHeight = e.Z);
    }
  }
  static GetSectorExtent(t, l) {
    BulletCollisionUtil.o7o.FromUeVector(l);
    var e,
      l = Vector_1.Vector.Create();
    return (
      t.Y < 180
        ? ((BulletCollisionUtil.o7o.X += 0.5 * t.X),
          l.Set(
            0.5 * t.X,
            Math.sin(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad) * t.X,
            t.Z,
          ))
        : ((e = Math.cos(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad)),
          (BulletCollisionUtil.o7o.X += t.X * (1 + e) * 0.5),
          l.Set(t.X * (1 - e) * 0.5, t.X, t.Z)),
      l
    );
  }
  static ShowBulletDeBugDraw(t) {
    var l, e, o, i, a, r, s;
    UE.KismetSystemLibrary.DrawDebugSphere(
      GlobalData_1.GlobalData.GameInstance,
      t.ActorComponent.ActorLocation,
      10,
      void 0,
      ColorUtils_1.ColorUtils.LinearRed,
    ),
      t.Size.IsZero() ||
        ((l = t.BulletDataMain.Base.Shape),
        (e = t.CollisionInfo.CollisionComponent),
        3 === l
          ? ((i = e.BoundsScale),
            BulletStaticFunction_1.BulletStaticFunction.DebugDrawRing(
              t.Size.Z * i,
              i * t.Size.Y,
              t.Size.X * i,
              t.CenterLocation,
            ),
            t.BulletDataMain?.Base.DebugShowProgress &&
              ((r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                t.CenterLocation,
              ),
              (r.Z -= t.Size.Z * i),
              (s = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
              (i = MathUtils_1.MathUtils.Lerp(
                i * t.Size.Y,
                t.Size.X * i,
                s / t.BulletDataMain.Base.Duration,
              )),
              UE.KismetSystemLibrary.DrawDebugCircle(
                GlobalData_1.GlobalData.GameInstance,
                r.ToUeVector(),
                i,
                36,
                ColorUtils_1.ColorUtils.LinearRed,
                t.BulletDataMain.Base.Duration - s,
                3,
                t.Actor?.GetActorRightVector(),
                t.Actor?.GetActorForwardVector(),
                !1,
              ),
              BulletPool_1.BulletPool.RecycleVector(r)))
          : 2 === l
            ? ((i = e.BoundsScale),
              (s = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(
                t.CollisionRotator,
              ),
              BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                t.Size.Z * i,
                t.Size.X * i,
                t.Size.Y,
                s.Quaternion(),
                t.CenterLocation,
              ),
              t.BulletDataMain?.Base.DebugShowProgress &&
                ((r = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                (o = MathUtils_1.MathUtils.Lerp(
                  0,
                  t.Size.Y,
                  r / t.BulletDataMain.Base.Duration,
                )),
                (a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                  t.CenterLocation,
                ),
                (a.Z -= t.Size.Z * i),
                BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                  1,
                  t.Size.X * i,
                  o,
                  s.Quaternion(),
                  a,
                  ColorUtils_1.ColorUtils.LinearRed,
                  t.BulletDataMain.Base.Duration - r,
                ),
                BulletPool_1.BulletPool.RecycleVector(a)),
              BulletPool_1.BulletPool.RecycleRotator(s))
            : 0 === l
              ? ((i = e.BoundsScale),
                (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                  e.BoxExtent,
                ),
                o.MultiplyEqual(i),
                UE.KismetSystemLibrary.DrawDebugBox(
                  GlobalData_1.GlobalData.GameInstance,
                  e.K2_GetComponentLocation(),
                  o.ToUeVector(),
                  ColorUtils_1.ColorUtils.LinearYellow,
                  e.K2_GetComponentRotation(),
                  0,
                  1,
                ),
                t.BulletDataMain?.Base.DebugShowProgress &&
                  ((r = BulletPool_1.BulletPool.CreateVector()),
                  (a = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                  Vector_1.Vector.Lerp(
                    Vector_1.Vector.ZeroVectorProxy,
                    o,
                    a / t.BulletDataMain.Base.Duration,
                    r,
                  ),
                  (r.Z = 4),
                  (s = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                    e.K2_GetComponentLocation(),
                  ),
                  (s.Z -= o.Z + 2),
                  UE.KismetSystemLibrary.DrawDebugBox(
                    GlobalData_1.GlobalData.GameInstance,
                    s.ToUeVector(),
                    r.ToUeVector(),
                    ColorUtils_1.ColorUtils.LinearRed,
                    e.K2_GetComponentRotation(),
                    t.BulletDataMain.Base.Duration - a,
                    2,
                  ),
                  BulletPool_1.BulletPool.RecycleVector(r),
                  BulletPool_1.BulletPool.RecycleVector(s)),
                BulletPool_1.BulletPool.RecycleVector(o))
              : 1 === l &&
                ((i = e.GetScaledSphereRadius()),
                (a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                  e.K2_GetComponentLocation(),
                ),
                UE.KismetSystemLibrary.DrawDebugSphere(
                  GlobalData_1.GlobalData.GameInstance,
                  a.ToUeVector(),
                  i,
                  void 0,
                  ColorUtils_1.ColorUtils.LinearGreen,
                ),
                t.BulletDataMain?.Base.DebugShowProgress &&
                  ((r = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                  (s = MathUtils_1.MathUtils.Lerp(
                    0,
                    i,
                    r / t.BulletDataMain.Base.Duration,
                  )),
                  UE.KismetSystemLibrary.DrawDebugCircle(
                    GlobalData_1.GlobalData.GameInstance,
                    a.ToUeVector(),
                    s,
                    36,
                    ColorUtils_1.ColorUtils.LinearRed,
                    t.BulletDataMain.Base.Duration - r,
                    3,
                    t.Actor?.GetActorRightVector(),
                    t.Actor?.GetActorForwardVector(),
                    !1,
                  )),
                BulletPool_1.BulletPool.RecycleVector(a)));
  }
  static EntityLeave(t, l) {
    var e = l.EntityHandle;
    if (e?.Valid) {
      const a = e.Entity;
      if (1 === l.Type) {
        var o,
          e = t.CollisionInfo,
          i = e.CharacterEntityMap.get(a);
        void 0 === i ||
          ((o = a.GetComponent(3)) &&
            (this.r7o(t, a, o.IsRoleAndCtrlByMe), 0 < i) &&
            a.GetComponent(107)?.RemoveTimeScale(i),
          e.CharacterEntityMap.delete(a),
          t.BulletDataMain.Base.Interval <= 0 &&
            e.ObjectsHitCurrent.delete(a.Id),
          e.CharacterEntityMap.size) ||
          (e.HaveCharacterInBullet = !1);
      } else if (2 === l.Type) {
        const a = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
          l.BulletEntityId,
        );
        a &&
          void 0 !== (i = (o = t.CollisionInfo).BulletEntityMap.get(a)) &&
          (0 < i && BulletUtil_1.BulletUtil.RemoveTimeScale(t, i),
          o.BulletEntityMap.delete(a));
      }
    }
  }
  static r7o(t, l, e) {
    (e = l.GetComponent(0)?.IsRole() && !e), (t = t.BulletDataMain);
    if (!e && t.Execution.GeIdApplyToVictim) {
      var o = l.GetComponent(157);
      if (o)
        for (const i of t.Execution.GeIdApplyToVictim)
          o.RemoveBuff(
            i,
            -1,
            "BulletCollisionUtil.CharacterLeaveBulletUseBuff",
          );
    }
  }
  static n7o(t, l, e, o, i, a) {
    var r = new Array(),
      l = l.EffectOnHit.get(e ? 7 : 4);
    return (
      l && 0 < l.length && "None" !== l && r.push(l),
      i &&
        t.IsPartHit &&
        (e = t.GetPartHitConf(o)) &&
        (e.ReplaceBulletHitEffect && (r.length = 0),
        (l = e.Effect),
        ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(l) &&
          r.push(l.ToAssetPathName()),
        a) &&
        ((i = e.Audio),
        ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(i)) &&
        r.push(i.ToAssetPathName()),
      r
    );
  }
  static PlayHitEffect(l, o, i, a, r, s) {
    var _ = l.BulletDataMain,
      u = _.Render,
      _ = 0 < _.Base.DamageId,
      o = o.Entity.GetComponent(185).HasTag(-1728163740)
        ? void 0
        : BulletCollisionUtil.n7o(
            o,
            u,
            a,
            i,
            _,
            l.BulletDataMain.Base.EnablePartHitAudio,
          );
    if (o && 0 < o.length) {
      a = u.EffectOnHitConf.get(0);
      let t = void 0;
      (t = a
        ? (a.EnableHighLimit &&
            ((i = l.GetActorLocation().Z),
            (_ = a.HighLimit),
            (r.Z = MathUtils_1.MathUtils.Clamp(r.Z, i + _.X, i + _.Y))),
          a.Scale)
        : Vector_1.Vector.OneVectorProxy),
        BulletCollisionUtil.s7o.Set(r, s.Quaternion(), t);
      var n = l.Attacker?.GetComponent(51)?.HitEffectMap,
        i = l.Attacker?.GetComponent(42);
      let e = !1;
      (0, RegisterComponent_1.isComponentInstance)(i, 170) &&
        (e = "p1" === i.Priority.State);
      var c = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
        l.Attacker,
        e,
      );
      const C = u.AudioOnHit;
      var U = (t, l) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, C, e);
      };
      for (const h of o) {
        let t = 0;
        var B = n.get(h);
        B &&
        B.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
        ((t = B.Pop()), EffectSystem_1.EffectSystem.IsValid(t))
          ? (EffectSystem_1.EffectSystem.ReplayEffect(
              t,
              "ReUseHitEffect",
              BulletCollisionUtil.s7o.ToUeTransform(),
            ),
            B.Push(t),
            BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, t, C, e))
          : ((t = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              BulletCollisionUtil.s7o.ToUeTransform(),
              h,
              "[BulletCollisionUtil.ProcessHitEffect]",
              c,
              void 0,
              void 0,
              U,
            )),
            n.has(h) || n.set(h, new Queue_1.Queue()),
            n.get(h).Push(t));
      }
    }
  }
  static PlaySceneItemHitEffect(t, l, e, o) {
    var i = t?.GetComponent(51)?.HitEffectMap;
    let a = 0;
    var r = i.get(l),
      s = t?.GetComponent(42);
    let _ = !1;
    (0, RegisterComponent_1.isComponentInstance)(s, 170) &&
      (_ = "p1" === s.Priority.State),
      r &&
      r.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
      ((a = r.Pop()), EffectSystem_1.EffectSystem.IsValid(a))
        ? (EffectSystem_1.EffectSystem.ReplayEffect(a, "ReUseHitEffect", e),
          r.Push(a),
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, a, o, _))
        : ((s = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
            t,
            _,
          )),
          (a = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            e,
            l,
            "[BulletCollisionUtil.ProcessHitEffect]",
            s,
            void 0,
            void 0,
            (t, l) => {
              BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, o, _);
            },
          )),
          i.has(l) || i.set(l, new Queue_1.Queue()),
          i.get(l).Push(a));
  }
  static CalcPartDistance(t, l) {
    var e = BulletPool_1.BulletPool.CreateVector(),
      t =
        (e.FromUeVector(t.K2_GetComponentLocation()),
        BulletPool_1.BulletPool.CreateVector()),
      l =
        (e.Subtraction(l.CenterLocation, t),
        t.Normalize(),
        Vector_1.Vector.DistSquared(e, l.GetActorLocation()));
    return (
      BulletPool_1.BulletPool.RecycleVector(e),
      BulletPool_1.BulletPool.RecycleVector(t),
      l
    );
  }
  static GetImpactPointCharacter(t, l, e) {
    var o, i, a, r;
    t instanceof UE.CapsuleComponent
      ? ((o = l.GetActorLocation()),
        e.FromUeVector(t.GetUpVector()),
        this.h7o.FromUeVector(t.K2_GetComponentLocation()),
        o.Subtraction(this.h7o, this.l7o),
        (r = Vector_1.Vector.DotProduct(this.l7o, e)),
        (i = Math.sign(r)),
        (a = Math.abs(r)),
        (r = Math.min(t.CapsuleHalfHeight, a) * i),
        e.MultiplyEqual(r),
        e.AdditionEqual(this.h7o),
        ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
          l.Attacker.Id,
        ) &&
          UE.KismetSystemLibrary.DrawDebugSphere(
            GlobalData_1.GlobalData.World,
            e.ToUeVector(),
            4,
            8,
            ColorUtils_1.ColorUtils.LinearBlue,
            2,
            3,
          ),
        o.Subtraction(e, this._7o),
        this._7o.Normalize(),
        this._7o.MultiplyEqual(t.CapsuleRadius),
        e.AdditionEqual(this._7o),
        ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
          l.Attacker.Id,
        ) &&
          UE.KismetSystemLibrary.DrawDebugSphere(
            GlobalData_1.GlobalData.World,
            e.ToUeVector(),
            4,
            8,
            ColorUtils_1.ColorUtils.LinearYellow,
            2,
            3,
          ),
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "命中特效 碰撞点 角色",
            ["boneName", t.GetName()],
            ["bulletRowName", l.BulletRowName],
          ))
      : t instanceof UE.BoxComponent
        ? BulletCollisionUtil.GetHitPointBoxComp(t, l, e)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              21,
              "击中了其它形状组件作为部位碰撞体",
              ["boneName", t?.GetName()],
              ["actorName", t?.GetOwner().GetName()],
            ),
          e.FromUeVector(l.GetActorLocation()));
  }
  static GetHitPointBoxComp(t, l, e, o) {
    this.c7o.FromUeTransform(t.K2_GetComponentToWorld());
    var o = o ?? l.GetActorLocation(),
      i =
        (this.c7o.InverseTransformPosition(o, this.m7o),
        this.d7o.FromUeVector(this.m7o),
        this.d7o.MultiplyEqual(-1),
        t.BoxExtent),
      a = i.X,
      r = i.Y,
      i = i.Z,
      a = this.C7o(this.m7o, this.d7o, [-a, -r, -i], [a, r, i], this.g7o);
    this.c7o.TransformPosition(this.g7o, e),
      1 !== a &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Bullet",
          21,
          "理论上必须有一个碰撞点才对",
          ["Bullet", l.BulletRowName],
          ["Part", t.GetName()],
          ["Victim", t.GetOwner()?.GetName()],
        ),
      BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "命中特效 碰撞点 角色 Box",
          ["boneName", t.GetName()],
          ["bulletRowName", l.BulletRowName],
          ["outPoint", e],
        ),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        l.Attacker.Id,
      ) &&
        (UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          e.ToUeVector(),
          4,
          8,
          ColorUtils_1.ColorUtils.LinearYellow,
          2,
          3,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.World,
          o.ToUeVector(),
          this.c7o.GetLocation().ToUeVector(),
          ColorUtils_1.ColorUtils.LinearBlue,
          2,
          3,
        ));
  }
  static C7o(o, i, a, r, t) {
    let s = 0,
      _ = Number.MAX_VALUE;
    for (let e = 0; e < 3; e++)
      if (Math.abs(i.Tuple[e]) < Number.EPSILON) {
        if (o.Tuple[e] < a[e] || o.Tuple[e] > r[e]) return 0;
      } else {
        var u = 1 / i.Tuple[e];
        let t = (a[e] - o.Tuple[e]) * u,
          l = (r[e] - o.Tuple[e]) * u;
        if (
          (t > l && ((u = t), (t = l), (l = u)),
          t > s && (s = t),
          l > _ && (_ = l),
          s > _)
        )
          return 0;
      }
    return i.Multiply(s, t), t.AdditionEqual(o), 1;
  }
  static GetImpactPointSceneItem(t, l, e) {
    var o,
      i = BulletPool_1.BulletPool.CreateVector(),
      a =
        (i.FromUeVector(t.K2_GetComponentLocation()),
        BulletPool_1.BulletPool.CreateVector());
    const r = t.Bounds.SphereRadius;
    if (
      (Math.abs(l.MoveInfo.BulletSpeed) < MathUtils_1.MathUtils.SmallNumber
        ? t.IsA(UE.BoxComponent.StaticClass())
          ? BulletCollisionUtil.GetHitPointBoxComp(
              t,
              l,
              e,
              l.AttackerActorComp.ActorLocationProxy,
            )
          : (l.AttackerActorComp.ActorLocationProxy.Subtraction(i, a),
            a.Normalize(),
            a.MultiplyEqual(r),
            a.Addition(i, e))
        : (i.Subtraction(l.CollisionInfo.LastFramePosition, a),
          (o = a.Size() - r),
          a.Normalize(),
          a.MultiplyEqual(o),
          l.CollisionInfo.LastFramePosition.Addition(a, e)),
      BulletPool_1.BulletPool.RecycleVector(i),
      BulletPool_1.BulletPool.RecycleVector(a),
      BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "命中特效 碰撞点 场景物",
          ["boneName", t.GetName()],
          ["radius", r],
          ["bulletRowName", l.BulletRowName],
        ),
      ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l.Attacker.Id))
    ) {
      const r = 4;
      UE.KismetSystemLibrary.DrawDebugSphere(
        GlobalData_1.GlobalData.World,
        i.ToUeVector(),
        4,
        8,
        ColorUtils_1.ColorUtils.LinearBlue,
        2,
        3,
      ),
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          e.ToUeVector(),
          4,
          8,
          ColorUtils_1.ColorUtils.LinearYellow,
          2,
          3,
        );
    }
  }
}
((exports.BulletCollisionUtil = BulletCollisionUtil).o7o =
  Vector_1.Vector.Create()),
  (BulletCollisionUtil.a7o = void 0),
  (BulletCollisionUtil.s7o = Transform_1.Transform.Create()),
  (BulletCollisionUtil.h7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil.l7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil._7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil.c7o = Transform_1.Transform.Create()),
  (BulletCollisionUtil.m7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil.d7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil.g7o = Vector_1.Vector.Create()),
  (BulletCollisionUtil.u7o = void 0);
//# sourceMappingURL=BulletCollisionUtil.js.map
