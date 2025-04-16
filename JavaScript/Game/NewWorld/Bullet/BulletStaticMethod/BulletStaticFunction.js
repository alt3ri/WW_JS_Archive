"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HitStaticFunction = exports.BulletStaticFunction = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EffectAudioContext_1 = require("../../../Effect/EffectContext/EffectAudioContext"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  NiagaraComponentHandle_1 = require("../../../Effect/NiagaraComponentHandle"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BulletConstant_1 = require("../BulletConstant"),
  collisionColor = new UE.LinearColor(255, 80, 77, 1),
  DRAW_SECTOR_ANGLE_PERIOD = 30;
class BulletStaticFunction {
  static CreateMultipleBoxToFan(e, i, o, a, s, l) {
    let r = void 0;
    r =
      o < MathCommon_1.MathCommon.FlatAngle
        ? BulletConstant_1.BulletConstant.FactorBoxSix
        : BulletConstant_1.BulletConstant.FactorBoxTwelve;
    var n = new UE.Transform(),
      c = new UE.Rotator(0);
    let _ = o / r;
    var t = Vector_1.Vector.Create(i / 2, 0, 0),
      t =
        (t.AdditionEqual(Vector_1.Vector.Create(a)),
        n.SetLocation(t.ToUeVectorOld()),
        e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, n, !1)),
      u =
        ((t.LineThickness = 5),
        t.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, !1),
        t.SetCollisionProfileName(s),
        l.add(t),
        Vector_1.Vector.Create(0, 0, 0));
    for (let t = 0; t < r / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
        u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u),
        u.MultiplyEqual(i / 2),
        u.AdditionEqual(Vector_1.Vector.Create(a)),
        n.SetLocation(u.ToUeVectorOld()),
        u.Reset(),
        (c.Yaw = _),
        n.SetRotation(c.Quaternion());
      var f = e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, n, !1);
      (f.LineThickness = 5),
        f.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, !1),
        f.SetCollisionProfileName(s),
        (_ += o / r),
        l.add(f);
    }
    _ = -o / r;
    for (let t = 0; t < r / 2; ++t) {
      u.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
        u.RotateAngleAxis(_, Vector_1.Vector.UpVectorProxy, u),
        u.MultiplyEqual(i / 2),
        u.AdditionEqual(Vector_1.Vector.Create(a)),
        n.SetLocation(u.ToUeVectorOld()),
        u.Reset(),
        (c.Yaw = _),
        n.SetRotation(c.Quaternion());
      var h = e.AddComponentByClass(UE.BoxComponent.StaticClass(), !1, n, !1);
      (h.LineThickness = 5),
        h.D_SetBoxExtent(Vector_1.Vector.OneVectorDouble, !1),
        h.SetCollisionProfileName(s),
        (_ -= o / r),
        l.add(h);
    }
    return t;
  }
  static CompCurveVector(t, e, i) {
    var o = (0, puerts_1.$ref)(0),
      a = (0, puerts_1.$ref)(0),
      e =
        (i.GetTimeRange(a, o),
        (o = (0, puerts_1.$unref)(o)),
        (a = (0, puerts_1.$unref)(a)),
        MathUtils_1.MathUtils.IsNearlyZero(
          e,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? MathUtils_1.MathUtils.KindaSmallNumber
          : e);
    return i.GetVectorValue(
      MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, a, o),
    );
  }
  static CompCurveFloat(t, e, i) {
    var o = (0, puerts_1.$ref)(0),
      a = (0, puerts_1.$ref)(0),
      e =
        (i.GetTimeRange(a, o),
        (o = (0, puerts_1.$unref)(o)),
        (a = (0, puerts_1.$unref)(a)),
        MathUtils_1.MathUtils.IsNearlyZero(
          e,
          MathUtils_1.MathUtils.KindaSmallNumber,
        )
          ? MathUtils_1.MathUtils.KindaSmallNumber
          : e);
    return i.GetFloatValue(MathUtils_1.MathUtils.RangeClamp(t / e, 0, 1, a, o));
  }
  static DebugDrawRing(t, e, i, o, a) {
    var s;
    i <= 0 ||
      ((s = new UE.VectorDouble(o.X + a.X * t, o.Y + a.Y * t, o.Z + a.Z * t)),
      (o = new UE.VectorDouble(o.X - a.X * t, o.Y - a.Y * t, o.Z - a.Z * t)),
      0 < e &&
        UE.KismetSystemLibrary.D_DrawDebugCylinder(
          GlobalData_1.GlobalData.GameInstance,
          s,
          o,
          e,
          32,
          collisionColor,
        ),
      UE.KismetSystemLibrary.D_DrawDebugCylinder(
        GlobalData_1.GlobalData.GameInstance,
        s,
        o,
        i,
        32,
        collisionColor,
      ));
  }
  static DebugDrawRingWithRotation(t, e, i, o, a) {
    var s;
    i <= 0 ||
      ((s = a
        .RotateVectorDouble(new UE.VectorDouble(0, 0, t))
        .op_Addition(o.ToUeVector())),
      (a = a
        .RotateVectorDouble(new UE.VectorDouble(0, 0, -t))
        .op_Addition(o.ToUeVector())),
      0 < e &&
        UE.KismetSystemLibrary.D_DrawDebugCylinder(
          GlobalData_1.GlobalData.GameInstance,
          s,
          a,
          e,
          32,
          collisionColor,
        ),
      UE.KismetSystemLibrary.D_DrawDebugCylinder(
        GlobalData_1.GlobalData.GameInstance,
        s,
        a,
        i,
        32,
        collisionColor,
      ));
  }
  static DebugDrawSector(t, e, i, o, a, s, l, r) {
    o.RotateVector(s, this.dHo),
      this.dHo.Multiply(t, this.CHo),
      this.dHo.Multiply(-t, this.gHo),
      a.Addition(this.CHo, this.dHo),
      a.Addition(this.gHo, this.Tz),
      UE.KismetSystemLibrary.D_DrawDebugLine(
        GlobalData_1.GlobalData.GameInstance,
        this.dHo.ToUeVector(),
        this.Tz.ToUeVector(),
        l ?? collisionColor,
        r,
      );
    var n = i * MathUtils_1.MathUtils.DegToRad * 0.5,
      c =
        (this.fHo.Set(Math.cos(n) * e, Math.sin(n) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(a),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.Tz.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        this.fHo.Set(Math.cos(-n) * e, Math.sin(-n) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(a),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.pHo.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.Tz.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        Math.max(Math.ceil(i / DRAW_SECTOR_ANGLE_PERIOD), 2)),
      _ = (i / c) * MathUtils_1.MathUtils.DegToRad;
    for (let t = 1; t <= c; ++t) {
      this.dHo.FromUeVector(this.pHo), this.Tz.FromUeVector(this.vHo);
      var u = -n + _ * t;
      this.fHo.Set(Math.cos(u) * e, Math.sin(u) * e, 0),
        o.RotateVector(this.fHo, this.pHo),
        this.pHo.AdditionEqual(a),
        this.vHo.FromUeVector(this.pHo),
        this.pHo.AdditionEqual(this.CHo),
        this.vHo.AdditionEqual(this.gHo),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.pHo.ToUeVector(),
          this.vHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
          GlobalData_1.GlobalData.GameInstance,
          this.dHo.ToUeVector(),
          this.pHo.ToUeVector(),
          l ?? collisionColor,
          r,
        ),
        UE.KismetSystemLibrary.D_DrawDebugLine(
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
      ((e = new UE.TransformDouble(
        Rotator_1.Rotator.ZeroRotator,
        e,
        Vector_1.Vector.OneVectorDouble,
      )),
      BulletStaticFunction.PlayBulletEffect(
        t.Actor,
        i,
        e,
        t,
        "[BulletStaticFunction.BulletHitEffect]",
      ));
  }
  static PlayBulletEffect(t, e, i, o, a) {
    let s = void 0;
    o.AttackerActorComp?.Valid &&
      (((s = o.AttackerAudioComponent
        ? (((r =
            new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
            "p1" === o.AttackerAudioComponent.Priority.State),
          r)
        : new EffectContext_1.EffectContext()).EntityId = o.Attacker
        ? o.Attacker.Id
        : void 0),
      (s.SourceObject = o.AttackerActorComp.Owner),
      (s.DisablePostProcess = o.EffectInfo.DisablePostProcess));
    let l = void 0;
    var r = o.BulletInitParams.Owner.GetComponent(3),
      r =
        (r && (l = r.GetReplaceEffect(e)),
        EffectSystem_1.EffectSystem.SpawnEffect(t, i, l || e, a, s, 0)),
      t = EffectSystem_1.EffectSystem.GetNiagaraComponent(r);
    return (
      o.AttackerActorComp?.Valid &&
        ((i = o.AttackerActorComp.Owner),
        (e = o.Attacker ? o.Attacker.Id : void 0),
        i) &&
        e &&
        (a = i.GetComponentByClass(
          UE.KuroEnviInteractionComponent.StaticClass(),
        )) &&
        a.IsValid() &&
        a.bUseSPModelShiftColor &&
        (t instanceof UE.NiagaraComponent
          ? a.SetNiagaraCompShiftColor(t)
          : t instanceof NiagaraComponentHandle_1.NiagaraComponentHandle &&
            t.SetEnviInteractionComp(a)),
      r
    );
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
  static SetBulletEffectTimeScale(t, e, i = !1) {
    EffectSystem_1.EffectSystem.IsValid(t.Effect) &&
      EffectSystem_1.EffectSystem.SetTimeScale(t.Effect, e, i);
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
        Log_1.Log.Debug("Bullet", 20, "接收父子弹特效为空");
  }
  static GetNiagaraQualityLevel(t) {
    var e =
      GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
        GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
      ) ?? 0;
    let i = Math.min(e, t);
    return (i = Info_1.Info.IsPcOrGamepadPlatform()
      ? 0 < i
        ? 2
        : 1
      : 0 < i
        ? 1
        : 0);
  }
  static UpdateEffectQualityLevel(t) {
    var e = t.EffectInfo;
    EffectSystem_1.EffectSystem.IsValid(e.Effect) &&
      (t = t.BulletDataMain.Render.EffectBulletParams.get(5)) &&
      ((t = BulletStaticFunction.GetNiagaraQualityLevel(Number(t))),
      EffectSystem_1.EffectSystem.SetEffectQualityLevel(e.Effect, t));
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
          ControllerHolder_1.ControllerHolder.GameAudioController.SetRolePriority(
            o ? 0 : 2,
            t,
          );
        },
      })),
      AudioSystem_1.AudioSystem.PostEvent(i, e),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Audio", 20, "播放子弹命中音效", ["Event", i]);
  }
  static CreateEffectContext(e, i, o = void 0) {
    if (e) {
      var a,
        s = e.GetComponent(50),
        l = e.GetComponent(1);
      let t = void 0;
      return (
        l?.Valid &&
          (((t = s
            ? (((a =
                new EffectAudioContext_1.EffectAudioContext()).FromPrimaryRole =
                o ?? "p1" === s.Priority.State),
              a)
            : new EffectContext_1.EffectContext()).SourceObject = l?.Owner),
          (t.EntityId = e.Id),
          (t.DisablePostProcess = i)),
        t
      );
    }
  }
}
exports.HitStaticFunction = HitStaticFunction;
//# sourceMappingURL=BulletStaticFunction.js.map
