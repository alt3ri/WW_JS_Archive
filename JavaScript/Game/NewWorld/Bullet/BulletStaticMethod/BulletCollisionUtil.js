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
        l.D_SetBoxExtent(e.ToUeVector(), !0);
        break;
      case 1:
        l.SetSphereRadius(e.X, !0);
        break;
      case 2:
        var a = this.GetSectorExtent(e, o),
          s = l,
          r = BulletPool_1.BulletPool.CreateVector();
        i.Quaternion().RotateVector(BulletCollisionUtil.eHo, r),
          s.D_K2_SetRelativeLocation(r.ToUeVector(), !1, void 0, !0),
          BulletPool_1.BulletPool.RecycleVector(r),
          s.D_SetBoxExtent(a.ToUeVector(), !0);
        break;
      case 3:
        l.D_SetBoxExtent(new UE.VectorDouble(e.X, e.X, e.Z), !0);
    }
  }
  static UpdateRegionExtend(t, l, e) {
    switch (t) {
      case 6:
        l.BoxExtent = e.ToUeVectorOld();
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
    BulletCollisionUtil.eHo.FromUeVector(l);
    var e,
      l = Vector_1.Vector.Create();
    return (
      t.Y < 180
        ? ((BulletCollisionUtil.eHo.X += 0.5 * t.X),
          l.Set(
            0.5 * t.X,
            Math.sin(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad) * t.X,
            t.Z,
          ))
        : ((e = Math.cos(0.5 * t.Y * MathUtils_1.MathUtils.DegToRad)),
          (BulletCollisionUtil.eHo.X += t.X * (1 + e) * 0.5),
          l.Set(t.X * (1 - e) * 0.5, t.X, t.Z)),
      l
    );
  }
  static ShowBulletDeBugDraw(t) {
    var l, e, o, i, a, s, r;
    UE.KismetSystemLibrary.D_DrawDebugSphere(
      GlobalData_1.GlobalData.GameInstance,
      t.ActorComponent.ActorLocation,
      10,
      void 0,
      ColorUtils_1.ColorUtils.LinearRed,
    ),
      t.Size.IsZero() ||
        ((l = t.BulletDataMain.Base.Shape),
        (o = t.CollisionInfo.CollisionComponent),
        3 === l
          ? ((s = o.BoundsScale),
            BulletStaticFunction_1.BulletStaticFunction.DebugDrawRing(
              t.Size.Z * s,
              s * t.Size.Y,
              t.Size.X * s,
              t.CenterLocation,
              t.ActorComponent.ActorUpProxy,
            ),
            t.BulletDataMain?.Base.DebugShowProgress &&
              ((e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                t.CenterLocation,
              ),
              (e.Z -= t.Size.Z * s),
              (r = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
              (s = MathUtils_1.MathUtils.Lerp(
                s * t.Size.Y,
                t.Size.X * s,
                r / t.Duration,
              )),
              UE.KismetSystemLibrary.D_DrawDebugCircle(
                GlobalData_1.GlobalData.GameInstance,
                e.ToUeVector(),
                s,
                36,
                ColorUtils_1.ColorUtils.LinearRed,
                t.Duration - r,
                3,
                t.Actor?.D_GetActorRightVector(),
                t.Actor?.D_GetActorForwardVector(),
                !1,
              ),
              BulletPool_1.BulletPool.RecycleVector(e)))
          : 2 === l
            ? ((s = o.BoundsScale),
              (r = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(
                t.CollisionRotator,
              ),
              BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                t.Size.Z * s,
                t.Size.X * s,
                t.Size.Y,
                r.Quaternion(),
                t.CenterLocation,
                t.ActorComponent.ActorUpProxy,
              ),
              t.BulletDataMain?.Base.DebugShowProgress &&
                ((e = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                (a = MathUtils_1.MathUtils.Lerp(0, t.Size.Y, e / t.Duration)),
                (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                  t.CenterLocation,
                ),
                (i.Z -= t.Size.Z * s),
                BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                  1,
                  t.Size.X * s,
                  a,
                  r.Quaternion(),
                  i,
                  t.ActorComponent.ActorUpProxy,
                  ColorUtils_1.ColorUtils.LinearRed,
                  t.Duration - e,
                ),
                BulletPool_1.BulletPool.RecycleVector(i)),
              BulletPool_1.BulletPool.RecycleRotator(r))
            : 0 === l
              ? ((s = o.BoundsScale),
                (a = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                  o.BoxExtent,
                ),
                a.MultiplyEqual(s),
                UE.KismetSystemLibrary.D_DrawDebugBox(
                  GlobalData_1.GlobalData.GameInstance,
                  o.D_K2_GetComponentLocation(),
                  a.ToUeVector(),
                  ColorUtils_1.ColorUtils.LinearYellow,
                  o.K2_GetComponentRotation(),
                  0,
                  1,
                ),
                t.BulletDataMain?.Base.DebugShowProgress &&
                  ((e = BulletPool_1.BulletPool.CreateVector()),
                  (i = t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                  Vector_1.Vector.Lerp(
                    Vector_1.Vector.ZeroVectorProxy,
                    a,
                    i / t.Duration,
                    e,
                  ),
                  (e.Z = 4),
                  (r = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                    o.D_K2_GetComponentLocation(),
                  ),
                  (r.Z -= a.Z + 2),
                  UE.KismetSystemLibrary.D_DrawDebugBox(
                    GlobalData_1.GlobalData.GameInstance,
                    r.ToUeVector(),
                    e.ToUeVector(),
                    ColorUtils_1.ColorUtils.LinearRed,
                    o.K2_GetComponentRotation(),
                    t.Duration - i,
                    2,
                  ),
                  BulletPool_1.BulletPool.RecycleVector(e),
                  BulletPool_1.BulletPool.RecycleVector(r)),
                BulletPool_1.BulletPool.RecycleVector(a))
              : 1 === l
                ? ((s = o.GetScaledSphereRadius()),
                  (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                    o.D_K2_GetComponentLocation(),
                  ),
                  UE.KismetSystemLibrary.D_DrawDebugSphere(
                    GlobalData_1.GlobalData.GameInstance,
                    i.ToUeVector(),
                    s,
                    void 0,
                    ColorUtils_1.ColorUtils.LinearGreen,
                  ),
                  t.BulletDataMain?.Base.DebugShowProgress &&
                    ((e =
                      t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                    (r = MathUtils_1.MathUtils.Lerp(0, s, e / t.Duration)),
                    UE.KismetSystemLibrary.D_DrawDebugCircle(
                      GlobalData_1.GlobalData.GameInstance,
                      i.ToUeVector(),
                      r,
                      36,
                      ColorUtils_1.ColorUtils.LinearRed,
                      t.Duration - e,
                      3,
                      t.Actor?.D_GetActorRightVector(),
                      t.Actor?.D_GetActorForwardVector(),
                      !1,
                    )),
                  BulletPool_1.BulletPool.RecycleVector(i))
                : 6 === l
                  ? ((a = t.CollisionInfo.RegionComponent),
                    (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                      a.BoxExtent,
                    ),
                    UE.KismetSystemLibrary.D_DrawDebugBox(
                      GlobalData_1.GlobalData.GameInstance,
                      a.D_K2_GetComponentLocation(),
                      o.ToUeVector(),
                      ColorUtils_1.ColorUtils.LinearYellow,
                      a.K2_GetComponentRotation(),
                      0,
                      1,
                    ),
                    t.BulletDataMain?.Base.DebugShowProgress &&
                      ((s = BulletPool_1.BulletPool.CreateVector()),
                      (r =
                        t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond),
                      Vector_1.Vector.Lerp(
                        Vector_1.Vector.ZeroVectorProxy,
                        o,
                        r / t.Duration,
                        s,
                      ),
                      (s.Z = 4),
                      (e = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                        a.D_K2_GetComponentLocation(),
                      ),
                      (e.Z -= o.Z + 2),
                      UE.KismetSystemLibrary.D_DrawDebugBox(
                        GlobalData_1.GlobalData.GameInstance,
                        e.ToUeVector(),
                        s.ToUeVector(),
                        ColorUtils_1.ColorUtils.LinearRed,
                        a.K2_GetComponentRotation(),
                        t.Duration - r,
                        2,
                      ),
                      BulletPool_1.BulletPool.RecycleVector(s),
                      BulletPool_1.BulletPool.RecycleVector(e)),
                    BulletPool_1.BulletPool.RecycleVector(o))
                  : 7 === l
                    ? ((i = t.Size.X),
                      (a = t.ActorComponent.ActorLocation),
                      UE.KismetSystemLibrary.D_DrawDebugSphere(
                        GlobalData_1.GlobalData.GameInstance,
                        a,
                        i,
                        void 0,
                        ColorUtils_1.ColorUtils.LinearGreen,
                      ),
                      t.BulletDataMain?.Base.DebugShowProgress &&
                        ((r =
                          t.LiveTime *
                          MathUtils_1.MathUtils.MillisecondToSecond),
                        (s = MathUtils_1.MathUtils.Lerp(0, i, r / t.Duration)),
                        UE.KismetSystemLibrary.D_DrawDebugCircle(
                          GlobalData_1.GlobalData.GameInstance,
                          a,
                          s,
                          36,
                          ColorUtils_1.ColorUtils.LinearRed,
                          t.Duration - r,
                          3,
                          t.Actor?.D_GetActorRightVector(),
                          t.Actor?.D_GetActorForwardVector(),
                          !1,
                        )))
                    : 8 === l
                      ? ((e = t.CollisionInfo.RegionComponent),
                        (o =
                          BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(
                          t.CollisionRotator,
                        ),
                        BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                          e.HalfHeight,
                          e.Radius,
                          e.Angle,
                          o.Quaternion(),
                          t.CenterLocation,
                          t.ActorComponent.ActorUpProxy,
                        ),
                        t.BulletDataMain?.Base.DebugShowProgress &&
                          ((i =
                            t.LiveTime *
                            MathUtils_1.MathUtils.MillisecondToSecond),
                          (a = MathUtils_1.MathUtils.Lerp(
                            0,
                            t.Size.Y,
                            i / t.Duration,
                          )),
                          (s =
                            BulletPool_1.BulletPool.CreateVector()).FromUeVector(
                            t.CenterLocation,
                          ),
                          (s.Z -= e.HalfHeight),
                          BulletStaticFunction_1.BulletStaticFunction.DebugDrawSector(
                            1,
                            e.Radius,
                            a,
                            o.Quaternion(),
                            s,
                            t.ActorComponent.ActorUpProxy,
                            ColorUtils_1.ColorUtils.LinearRed,
                            t.Duration - i,
                          ),
                          BulletPool_1.BulletPool.RecycleVector(s)),
                        BulletPool_1.BulletPool.RecycleRotator(o))
                      : 9 === l &&
                        ((r = t.CollisionInfo.RegionComponent),
                        BulletStaticFunction_1.BulletStaticFunction.DebugDrawRingWithRotation(
                          r.HalfHeight,
                          0,
                          r.Radius,
                          t.CenterLocation,
                          t.ActorComponent.ActorQuat,
                        )));
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
            (this.tHo(t, a, o.IsRoleAndCtrlByMe), 0 < i) &&
            a.GetComponent(120)?.RemoveTimeScale(i),
          e.CharacterEntityMap.delete(a),
          t.CollisionInfo.IntervalMs <= 0 && e.ObjectsHitCurrent.delete(a.Id),
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
  static tHo(t, l, e) {
    (e = l.GetComponent(0)?.IsRole() && !e), (t = t.BulletDataMain);
    if (!e && t.Execution.GeIdApplyToVictim) {
      var o = l.GetComponent(172);
      if (o)
        for (const i of t.Execution.GeIdApplyToVictim)
          o.RemoveBuff(
            i,
            -1,
            "BulletCollisionUtil.CharacterLeaveBulletUseBuff",
          );
    }
  }
  static GetHitEffects(l, e, o, i, a, s, r, _) {
    if ((BulletCollisionUtil.oSa.clear(), a)) {
      if (!_?.HasTag(-1728163740)) {
        a = r?.GetHitEffectReplaced();
        let t = void 0;
        if (l.IsPartHit && i) {
          l = l.GetPartHitConf(i);
          if (l) {
            var u = l.ReplaceBulletHitEffect;
            t = l.Effect.ToAssetPathName();
            r = r?.GetHitEffectReplacedIgnoreBones()?.has(i) ?? !1;
            if (
              ((t = BulletCollisionUtil.Dha(
                t,
                a?.受击特效.ToAssetPathName(),
                r,
              )) && BulletCollisionUtil.oSa.set(t, !1),
              s &&
                ((t = l.Audio.ToAssetPathName()),
                (t = BulletCollisionUtil.Dha(
                  t,
                  a?.受击音效.ToAssetPathName(),
                  r,
                ))) &&
                BulletCollisionUtil.oSa.set(t, !1),
              u)
            )
              return BulletCollisionUtil.oSa;
          }
        }
        (t = BulletCollisionUtil.prh(e, o, _)),
          (t = BulletCollisionUtil.Aha(t, a?.命中特效.ToAssetPathName())) &&
            BulletCollisionUtil.oSa.set(t, !0);
      }
    } else {
      const t = BulletCollisionUtil.prh(e, o, _);
      t && 0 < t.length && "None" !== t && BulletCollisionUtil.oSa.set(t, !0);
    }
    return BulletCollisionUtil.oSa;
  }
  static prh(t, l, e) {
    var o = t.EffectOnHit.get(9);
    return o && 0 < o.length && e?.HasTag(501201e3)
      ? o
      : t.EffectOnHit.get(l ? 7 : 4);
  }
  static Aha(t, l) {
    if (t && 0 < t.length && "None" !== t)
      return l && 0 < l.length && "None" !== l ? l : t;
  }
  static Dha(t, l, e) {
    return !e && l && 0 < l.length && "None" !== l
      ? l
      : t && 0 < t.length && "None" !== t
        ? t
        : void 0;
  }
  static PlayHitEffect(l, o, i, a, s, r, t) {
    var _ = l.BulletDataMain.Render,
      e = 0 < l.CollisionInfo.DamageId,
      u = o.Entity.GetComponent(203),
      o = BulletCollisionUtil.GetHitEffects(
        o,
        _,
        a,
        i,
        e,
        l.BulletDataMain.Base.EnablePartHitAudio,
        t,
        u,
      );
    if (0 < o.size) {
      a = _.EffectOnHitConf.get(0);
      let t = void 0;
      (t = a
        ? (a.EnableHighLimit && BulletCollisionUtil.te1(l, a.HighLimit, s),
          a.Scale)
        : Vector_1.Vector.OneVectorProxy),
        BulletCollisionUtil.oHo.Set(s, r.Quaternion(), t),
        BulletCollisionUtil.rHo.Start();
      var n = l.Attacker?.GetComponent(60)?.HitEffectMap,
        c = l.Attacker?.GetComponent(3),
        i = l.Attacker?.GetComponent(50);
      let e = !1;
      (0, RegisterComponent_1.isComponentInstance)(i, 187) &&
        (e = "p1" === i.Priority.State);
      var B = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
        l.Attacker,
        l.EffectInfo.DisablePostProcess,
        e,
      );
      const P = _.AudioOnHit;
      var U,
        C,
        f = (t, l) => {
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, P, e);
        };
      for ([U, C] of o) {
        let t = 0,
          l = c?.GetReplaceEffect(U);
        l = l || U;
        var h = n.get(l);
        h &&
        h.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
        ((t = h.Pop()), EffectSystem_1.EffectSystem.IsValid(t))
          ? (EffectSystem_1.EffectSystem.ReplayEffect(
              t,
              "ReUseHitEffect",
              BulletCollisionUtil.oHo.ToUeTransform(),
            ),
            h.Push(t),
            C &&
              BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, t, P, e))
          : ((t = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              BulletCollisionUtil.oHo.ToUeTransform(),
              l,
              "[BulletCollisionUtil.ProcessHitEffect]",
              B,
              void 0,
              void 0,
              C ? f : void 0,
            )),
            n.has(l) || n.set(l, new Queue_1.Queue()),
            n.get(l).Push(t));
      }
      BulletCollisionUtil.rHo.Stop();
    }
  }
  static te1(t, l, e) {
    var o, i;
    (t.AttackerMoveComp?.IsStandardGravity ?? !0)
      ? ((i = t.GetActorLocation().Z),
        (e.Z = MathUtils_1.MathUtils.Clamp(e.Z, i + l.X, i + l.Y)))
      : ((i = t.GetActorLocation()),
        (o = BulletPool_1.BulletPool.CreateVector()),
        e.Subtraction(i, o),
        (i = t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy),
        (t = o.DotProduct(i)) > l.Y &&
          (o.FromUeVector(i), o.MultiplyEqual(t - l.Y), e.SubtractionEqual(o)),
        t < l.X &&
          (o.FromUeVector(i), o.MultiplyEqual(l.X - t), e.AdditionEqual(o)),
        BulletPool_1.BulletPool.RecycleVector(o));
  }
  static PlaySceneItemHitEffect(t, l, e, o, i) {
    var a = t?.GetComponent(60)?.HitEffectMap;
    let s = 0;
    var r = a.get(l),
      _ = t?.GetComponent(50);
    let u = !1;
    (0, RegisterComponent_1.isComponentInstance)(_, 187) &&
      (u = "p1" === _.Priority.State),
      r &&
      r.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
      ((s = r.Pop()), EffectSystem_1.EffectSystem.IsValid(s))
        ? (EffectSystem_1.EffectSystem.ReplayEffect(s, "ReUseHitEffect", e),
          r.Push(s),
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, s, o, u))
        : ((_ = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
            t,
            i,
            u,
          )),
          (s = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            e,
            l,
            "[BulletCollisionUtil.ProcessHitEffect]",
            _,
            void 0,
            void 0,
            (t, l) => {
              BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, o, u);
            },
          )),
          a.has(l) || a.set(l, new Queue_1.Queue()),
          a.get(l).Push(s));
  }
  static PlayVehicleHitEffect(i, a, s) {
    var r = i.BulletDataMain.Render,
      _ = BulletCollisionUtil.prh(r, !1);
    if (_ && !(_.length <= 0) && "None" !== _) {
      var u = r.EffectOnHitConf.get(0);
      let t = void 0;
      (t = u
        ? (u.EnableHighLimit && BulletCollisionUtil.te1(i, u.HighLimit, a),
          u.Scale)
        : Vector_1.Vector.OneVectorProxy),
        BulletCollisionUtil.oHo.Set(a, s.Quaternion(), t);
      (u = i.Attacker?.GetComponent(60)?.HitEffectMap),
        (a = i.Attacker?.GetComponent(3)),
        (s = i.Attacker?.GetComponent(50));
      let e = !1;
      (0, RegisterComponent_1.isComponentInstance)(s, 187) &&
        (e = "p1" === s.Priority.State);
      s = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(
        i.Attacker,
        i.EffectInfo.DisablePostProcess,
        e,
      );
      const n = r.AudioOnHit;
      let l = 0,
        o = a?.GetReplaceEffect(_);
      o = o || _;
      i = u.get(o);
      i &&
      i.Size >= CharacterHitComponent_1.MAX_HIT_EFFECT_COUNT &&
      ((l = i.Pop()), EffectSystem_1.EffectSystem.IsValid(l))
        ? (EffectSystem_1.EffectSystem.ReplayEffect(
            l,
            "ReUseHitEffect",
            BulletCollisionUtil.oHo.ToUeTransform(),
          ),
          i.Push(l),
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(5, l, n, e))
        : ((l = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            BulletCollisionUtil.oHo.ToUeTransform(),
            o,
            "[BulletCollisionUtil.ProcessHitEffect]",
            s,
            void 0,
            void 0,
            (t, l) => {
              BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, l, n, e);
            },
          )),
          u.has(o) || u.set(o, new Queue_1.Queue()),
          u.get(o).Push(l));
    }
  }
  static CalcPartDistance(t, l) {
    var e = BulletPool_1.BulletPool.CreateVector(),
      t =
        (e.FromUeVector(t.D_K2_GetComponentLocation()),
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
    var o, i, a, s;
    t instanceof UE.CapsuleComponent
      ? ((o = l.GetActorLocation()),
        e.FromUeVector(t.D_GetUpVector()),
        this.nHo.FromUeVector(t.D_K2_GetComponentLocation()),
        o.Subtraction(this.nHo, this.sHo),
        (s = Vector_1.Vector.DotProduct(this.sHo, e)),
        (i = Math.sign(s)),
        (a = Math.abs(s)),
        (s = Math.min(t.CapsuleHalfHeight, a) * i),
        e.MultiplyEqual(s),
        e.AdditionEqual(this.nHo),
        ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
          l.Attacker.Id,
        ) &&
          UE.KismetSystemLibrary.D_DrawDebugSphere(
            GlobalData_1.GlobalData.World,
            e.ToUeVector(),
            4,
            8,
            ColorUtils_1.ColorUtils.LinearBlue,
            2,
            3,
          ),
        o.Subtraction(e, this.aHo),
        this.aHo.Normalize(),
        this.aHo.MultiplyEqual(t.CapsuleRadius),
        e.AdditionEqual(this.aHo),
        ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
          l.Attacker.Id,
        ) &&
          UE.KismetSystemLibrary.D_DrawDebugSphere(
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
            20,
            "命中特效 碰撞点 角色",
            ["boneName", t.GetName()],
            ["bulletRowName", l.BulletRowName],
          ))
      : t instanceof UE.BoxComponent
        ? BulletCollisionUtil.GetHitPointBoxComp(t, l, e)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              20,
              "击中了其它形状组件作为部位碰撞体",
              ["boneName", t?.GetName()],
              ["actorName", t?.GetOwner().GetName()],
            ),
          e.FromUeVector(l.GetActorLocation()));
  }
  static GetHitPointBoxComp(t, l, e, o) {
    this.hHo.Start(), this.lHo.FromUeTransform(t.D_K2_GetComponentToWorld());
    var o = o ?? l.GetActorLocation(),
      i =
        (this.lHo.InverseTransformPosition(o, this._Ho),
        this.uHo.FromUeVector(this._Ho),
        this.uHo.MultiplyEqual(-1),
        t.BoxExtent),
      a = i.X,
      s = i.Y,
      i = i.Z,
      a = this.cHo(this._Ho, this.uHo, [-a, -s, -i], [a, s, i], this.mHo);
    this.lHo.TransformPosition(this.mHo, e),
      1 !== a &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Bullet",
          20,
          "理论上必须有一个碰撞点才对",
          ["Bullet", l.BulletRowName],
          ["Part", t.GetName()],
          ["Victim", t.GetOwner()?.GetName()],
        ),
      BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          20,
          "命中特效 碰撞点 角色 Box",
          ["boneName", t.GetName()],
          ["bulletRowName", l.BulletRowName],
          ["outPoint", e],
        ),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        l.Attacker.Id,
      ) &&
        (UE.KismetSystemLibrary.D_DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          e.ToUeVector(),
          4,
          8,
          ColorUtils_1.ColorUtils.LinearYellow,
          2,
          3,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.World,
          o.ToUeVector(),
          this.lHo.GetLocation().ToUeVector(),
          ColorUtils_1.ColorUtils.LinearBlue,
          2,
          3,
        )),
      this.hHo.Stop();
  }
  static cHo(o, i, a, s, t) {
    let r = 0,
      _ = Number.MAX_VALUE;
    for (let e = 0; e < 3; e++)
      if (Math.abs(i.Tuple[e]) < Number.EPSILON) {
        if (o.Tuple[e] < a[e] || o.Tuple[e] > s[e]) return 0;
      } else {
        var u = 1 / i.Tuple[e];
        let t = (a[e] - o.Tuple[e]) * u,
          l = (s[e] - o.Tuple[e]) * u;
        if (
          (t > l && ((u = t), (t = l), (l = u)),
          t > r && (r = t),
          l > _ && (_ = l),
          r > _)
        )
          return 0;
      }
    return i.Multiply(r, t), t.AdditionEqual(o), 1;
  }
  static GetImpactPointSceneItem(t, l, e) {
    var o = BulletPool_1.BulletPool.CreateVector(),
      i =
        (o.FromUeVector(t.D_K2_GetComponentLocation()),
        BulletPool_1.BulletPool.CreateVector());
    const a = t.D_GetComponentBounds().SphereRadius;
    if (
      (Math.abs(l.MoveInfo.BulletSpeed) < MathUtils_1.MathUtils.SmallNumber
        ? t.IsA(UE.BoxComponent.StaticClass())
          ? BulletCollisionUtil.GetHitPointBoxComp(
              t,
              l,
              e,
              l.AttackerActorComp.ActorLocationProxy,
            )
          : (l.AttackerActorComp.ActorLocationProxy.Subtraction(o, i),
            i.Normalize(),
            i.MultiplyEqual(a),
            i.Addition(o, e))
        : e.FromUeVector(l.CollisionInfo.LastFramePosition),
      BulletPool_1.BulletPool.RecycleVector(o),
      BulletPool_1.BulletPool.RecycleVector(i),
      BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          20,
          "命中特效 碰撞点 场景物",
          ["boneName", t.GetName()],
          ["radius", a],
          ["bulletRowName", l.BulletRowName],
        ),
      ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l.Attacker.Id))
    ) {
      const a = 4;
      UE.KismetSystemLibrary.D_DrawDebugSphere(
        GlobalData_1.GlobalData.World,
        o.ToUeVector(),
        4,
        8,
        ColorUtils_1.ColorUtils.LinearBlue,
        2,
        3,
      ),
        UE.KismetSystemLibrary.D_DrawDebugSphere(
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
((exports.BulletCollisionUtil = BulletCollisionUtil).eHo =
  Vector_1.Vector.Create()),
  (BulletCollisionUtil.oSa = new Map()),
  (BulletCollisionUtil.rHo = Stats_1.Stat.Create("PlayHitEffect")),
  (BulletCollisionUtil.oHo = Transform_1.Transform.Create()),
  (BulletCollisionUtil.nHo = Vector_1.Vector.Create()),
  (BulletCollisionUtil.sHo = Vector_1.Vector.Create()),
  (BulletCollisionUtil.aHo = Vector_1.Vector.Create()),
  (BulletCollisionUtil.lHo = Transform_1.Transform.Create()),
  (BulletCollisionUtil._Ho = Vector_1.Vector.Create()),
  (BulletCollisionUtil.uHo = Vector_1.Vector.Create()),
  (BulletCollisionUtil.mHo = Vector_1.Vector.Create()),
  (BulletCollisionUtil.hHo = Stats_1.Stat.Create("GetHitPointBoxComp"));
//# sourceMappingURL=BulletCollisionUtil.js.map
