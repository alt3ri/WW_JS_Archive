"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitStaticFunction = exports.BulletStaticFunction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EffectAudioContext_1 = require("../../../Effect/EffectContext/EffectAudioContext"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  BulletConstant_1 = require("../BulletConstant"),
  collisionColor = new UE.LinearColor(255, 80, 77, 1),
  DRAW_SECTOR_ANGLE_PERIOD = 30;
class BulletStaticFunction {
  static CreateMultipleBoxToFan(e, i, o, s, l, r) {
    let a = void 0;
    a =
      o < MathCommon_1.MathCommon.FlatAngle
        ? BulletConstant_1.BulletConstant.FactorBoxSix
        : BulletConstant_1.BulletConstant.FactorBoxTwelve;
    var c = new UE.Transform(),
      n = new UE.Rotator(0);
    let _ = o / a;
    var t = Vector_1.Vector.Create(i / 2, 0, 0),
      t =
        (t.AdditionEqual(Vector_1.Vector.Create(s)),
        c.SetLocation(t.ToUeVector()),
        e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, c, !1)),
      u =
        ((t.LineThickness = 5),
        t.SetBoxExtent(Vector_1.Vector.OneVector, !1),
        t.SetCollisionProfileName(l),
        r.add(t),
        Vector_1.Vector.Create(0, 0, 0));
    for (let t = 0; t < a / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
        u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u),
        u.MultiplyEqual(i / 2),
        u.AdditionEqual(Vector_1.Vector.Create(s)),
        c.SetLocation(u.ToUeVector()),
        u.Reset(),
        (n.Yaw = _),
        c.SetRotation(n.Quaternion());
      var h = e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, c, !1);
      (h.LineThickness = 5),
        h.SetBoxExtent(Vector_1.Vector.OneVector, !1),
        h.SetCollisionProfileName(l),
        (_ += o / a),
        r.add(h);
    }
    _ = -o / a;
    for (let t = 0; t < a / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
        u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u),
        u.MultiplyEqual(i / 2),
        u.AdditionEqual(Vector_1.Vector.Create(s)),
        c.SetLocation(u.ToUeVector()),
        u.Reset(),
        (n.Yaw = _),
        c.SetRotation(n.Quaternion());
      var f = e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, c, !1);
      (f.LineThickness = 5),
        f.SetBoxExtent(Vector_1.Vector.OneVector, !1),
        f.SetCollisionProfileName(l),
        (_ -= o / a),
        r.add(f);
    }
    return t;
  }
  static CompCurveVector(t, e, i) {
    var o = (0, puerts_1.$ref)(0),
      s = (0, puerts_1.$ref)(0),
      e =
        (i.GetTimeRange(s, o),
        (o = (0, puerts_1.$unref)(o)),
        (s = (0, puerts_1.$unref)(s)),
        MathUtils_1.MathUtils.IsNearlyZero(
          e,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? MathUtils_1.MathUtils.KindaSmallNumber
          : e);
    return i.GetVectorValue(
      MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, s, o),
    );
  }
  static CompCurveFloat(t, e, i) {
    var o = (0, puerts_1.$ref)(0),
      s = (0, puerts_1.$ref)(0),
      e =
        (i.GetTimeRange(s, o),
        (o = (0, puerts_1.$unref)(o)),
        (s = (0, puerts_1.$unref)(s)),
        MathUtils_1.MathUtils.IsNearlyZero(
          e,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? MathUtils_1.MathUtils.KindaSmallNumber
          : e);
    return i.GetFloatValue(MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, s, o));
  }
  static DebugDrawRing(t, e, i, o) {
    var s;
    i <= 0 ||
      ((s = new UE.Vector(o.X, o.Y, o.Z + t)),
      (o = new UE.Vector(o.X, o.Y, o.Z - t)),
      0 < e &&
        UE.KismetSystemLibrary.DrawDebugCylinder(
          GlobalData_1.GlobalData.GameInstance,
          s,
          o,
          e,
          32,
          collisionColor,
        ),
      UE.KismetSystemLibrary.DrawDebugCylinder(
        GlobalData_1.GlobalData.GameInstance,
        s,
        o,
        i,
        32,
        collisionColor,
      ));
  }
  static DebugDrawRingWithRotation(t, e, i, o, s) {
    var l;
    i <= 0 ||
      ((l = s.RotateVector(new UE.Vector(0, 0, t)).op_Addition(o.ToUeVector())),
      (s = s.RotateVector(new UE.Vector(0, 0, -t)).op_Addition(o.ToUeVector())),
      0 < e &&
        UE.KismetSystemLibrary.DrawDebugCylinder(
          GlobalData_1.GlobalData.GameInstance,
          l,
          s,
          e,
          32,
          collisionColor,
        ),
      UE.KismetSystemLibrary.DrawDebugCylinder(
        GlobalData_1.GlobalData.GameInstance,
        l,
        s,
        i,
        32,
        collisionColor,
      ));
  }
  static DebugDrawSector(t, e, i, o, s, l, r) {
    o.RotateVector(Vector_1.Vector.UpVectorProxy, this.dHo),
      this.dHo.Multiply(t, this.CHo),
      this.dHo.Multiply(-t, this.gHo),
      s.Addition(this.CHo, this.dHo),
      s.Addition(this.gHo, this.Tz),
      UE.KismetSystemLibrary.DrawDebugLine(
        GlobalData_1.GlobalData.GameInstance,
        this.dHo.ToUeVector(),
        this.Tz.ToUeVector(),
        l ?? collisionColor,
        r,
      );
    var a = i * MathUtils_1.MathUtils.DegToRad * 0.5,
      c =
        (this.fHo.Set(Math.cos(a) * e, Math.sin(a) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(s),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.Tz.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        this.fHo.Set(Math.cos(-a) * e, Math.sin(-a) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(s),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.pHo.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.Tz.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        Math.max(Math.ceil(i / DRAW_SECTOR_ANGLE_PERIOD), 2)),
      n = (i / c) * MathUtils_1.MathUtils.DegToRad;
    for (let t = 1; t <= c; ++t) {
      this.dHo.FromUeVector(this.pHo), this.Tz.FromUeVector(this.vHo);
      var _ = -a + n * t;
      this.fHo.Set(Math.cos(_) * e, Math.sin(_) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(s),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.pHo.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.Tz.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        );
    }
  }
  static SpawnHitEffect(t, e, i) {
    t.EffectInfo.HandOver ||
      ((e = t.EffectInfo.EffectData.EffectOnHit.get(e)) &&
        BulletStaticFunction.PlayBulletEffect(
          t.Actor,
          e,
          t.ActorComponent.ActorTransform,
          t,
          i,
        ));
  }
  static BulletHitEffect(t, e) {
    var i = t.EffectInfo.EffectData.EffectOnHit.get(2);
    i &&
      ((e = new UE.Transform(
        Rotator_1.Rotator.ZeroRotator,
        e,
        Vector_1.Vector.OneVector,
      )),
      BulletStaticFunction.PlayBulletEffect(
        t.Actor,
        i,
        e,
        t,
        "[BulletStaticFunction.BulletHitEffect]",
      ));
  }
  static PlayBulletEffect(t, e, i, o, s) {
    let l = void 0;
    (0, RegisterComponent_1.isComponentInstance)(o.AttackerAudioComponent, 173)
      ? (((a = new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
          "p1" === o.AttackerAudioComponent.Priority.State),
        (a.EntityId = o.Attacker ? o.Attacker.Id : void 0),
        (a.SourceObject = o.AttackerActorComp.Owner),
        (l = a))
      : o.AttackerActorComp?.Valid &&
        (((l = new EffectContext_1.EffectContext(
          o.Attacker ? o.Attacker.Id : void 0,
        )).EntityId = o.Attacker ? o.Attacker.Id : void 0),
        (l.SourceObject = o.AttackerActorComp.Owner));
    let r = void 0;
    var a = o.BulletInitParams.Owner.GetComponent(3),
      o =
        (a && (r = a.GetReplaceEffect(e)),
        EffectSystem_1.EffectSystem.SpawnEffect(t, i, r || e, s, l, 0));
    return o;
  }
  static DestroyEffect(t, e = !0) {
    var i;
    t.HandOver ||
      t.IsEffectDestroy ||
      ((t.IsEffectDestroy = !0),
      EffectSystem_1.EffectSystem.IsValid(t.Effect) &&
        ((i = EffectSystem_1.EffectSystem.GetSureEffectActor(
          t.Effect,
        ))?.IsValid() && i.K2_DetachFromActor(1, 1, 1),
        t.IsFinishAuto
          ? (e && EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, 1),
            EffectSystem_1.EffectSystem.StopEffectById(
              t.Effect,
              "[BulletStaticFunction.DestroyEffect] IsFinishAuto=true",
              !1,
            ))
          : EffectSystem_1.EffectSystem.StopEffectById(
              t.Effect,
              "[BulletStaticFunction.DestroyEffect] IsFinishAuto=false",
              !0,
            )));
  }
  static SetBulletEffectTimeScale(t, e) {
    EffectSystem_1.EffectSystem.IsValid(t.Effect) &&
      EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, e);
  }
  static HandOverEffects(t, e) {
    (t = t.EffectInfo), (e = e.EffectInfo);
    this.DestroyEffect(e),
      (e.EffectData = t.EffectData),
      (e.Effect = t.Effect),
      (e.IsEffectDestroy = !1),
      (t.HandOver = !0),
      (t.Effect = 0);
  }
  static HandOverEffectsAfterInitTransform(t) {
    var e = t.EffectInfo,
      e = EffectSystem_1.EffectSystem.GetEffectActor(e.Effect);
    e?.IsValid()
      ? e.K2_AttachToActor(t.Actor, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, !0)
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 21, "接收父子弹特效为空");
  }
}
((exports.BulletStaticFunction = BulletStaticFunction).CHo =
  Vector_1.Vector.Create()),
  (BulletStaticFunction.gHo = Vector_1.Vector.Create()),
  (BulletStaticFunction.dHo = Vector_1.Vector.Create()),
  (BulletStaticFunction.Tz = Vector_1.Vector.Create()),
  (BulletStaticFunction.fHo = Vector_1.Vector.Create()),
  (BulletStaticFunction.pHo = Vector_1.Vector.Create()),
  (BulletStaticFunction.vHo = Vector_1.Vector.Create());
class HitStaticFunction {
  static PlayHitAudio(t, e, i, o) {
    5 === t &&
      i &&
      !StringUtils_1.StringUtils.IsBlank(i) &&
      ((t = EffectSystem_1.EffectSystem.GetSureEffectActor(e)),
      (e = AudioSystem_1.AudioSystem.GetAkComponent(t, {
        OnCreated: (t) => {
          AudioSystem_1.AudioSystem.SetSwitch(
            "char_p1orp3",
            o ? "p1" : "p3",
            t,
          );
        },
      })),
      AudioSystem_1.AudioSystem.PostEvent(i, e),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Audio", 21, "播放子弹命中音效", ["Event", i]);
  }
  static CreateEffectContext(e, i = void 0) {
    if (e) {
      var o,
        s = e.GetComponent(43),
        l = e.GetComponent(1);
      let t = void 0;
      return (
        (0, RegisterComponent_1.isComponentInstance)(s, 173)
          ? (((o =
              new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
              i ?? "p1" === s.Priority.State),
            (o.SourceObject = l.Owner),
            ((t = o).SourceObject = l?.Owner),
            (t.EntityId = e.Id))
          : l?.Valid &&
            (((t = new EffectContext_1.EffectContext()).SourceObject =
              l?.Owner),
            (t.EntityId = e.Id)),
        t
      );
    }
  }
}
exports.HitStaticFunction = HitStaticFunction;
//# sourceMappingURL=BulletStaticFunction.js.map
