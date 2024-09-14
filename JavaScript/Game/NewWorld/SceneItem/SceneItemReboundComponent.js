"use strict";
var SceneItemReboundComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var o,
        h = arguments.length,
        r =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (o = t[n]) &&
            (r = (h < 3 ? o(r) : 3 < h ? o(e, i, r) : o(e, i)) || r);
      return 3 < h && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemReboundComponent = void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PROFILE_BULLECT_TRACK = "SceneItemReboundComponent_CalculateBulletTrackHit",
  REFLECT_START_OFFSET = 30,
  REFLECT_BULLET_EFFECT_CD = 2e3;
let SceneItemReboundComponent =
  (SceneItemReboundComponent_1 = class SceneItemReboundComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Ovn = void 0),
        (this.kvn = void 0),
        (this.u9r = void 0),
        (this.m9r = void 0),
        (this.Fvn = void 0),
        (this.cz = void 0),
        (this.e7o = void 0),
        (this.l9r = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.Vvn = !1),
        (this.Hvn = ""),
        (this.cie = void 0),
        (this.jvn = 150),
        (this.Wvn = !0),
        (this.Kvn = void 0);
    }
    OnInitData(t) {
      (t = t.GetParam(SceneItemReboundComponent_1)[0]),
        (this.Vvn = 0 < t.BulletId),
        this.Vvn && (this.Hvn = t.BulletId.toString()),
        (this.Kvn = Vector_1.Vector.Create()),
        (t = t.Option.ReboundPoint);
      return this.Kvn.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(187)),
        (this.Lie = this.Entity.GetComponent(181)),
        (this.Ovn = Vector_1.Vector.Create()),
        (this.kvn = Vector_1.Vector.Create()),
        (this.u9r = Vector_1.Vector.Create()),
        (this.m9r = Vector_1.Vector.Create()),
        (this.Fvn = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.cie = Rotator_1.Rotator.Create()),
        (this.e7o = Quat_1.Quat.Create()),
        !0
      );
    }
    OnActivate() {
      this.p9r();
    }
    End() {
      return (
        (this.Hte = void 0),
        (this.Ovn = void 0),
        (this.kvn = void 0),
        (this.u9r = void 0),
        (this.m9r = void 0),
        (this.Fvn = void 0),
        (this.cz = void 0),
        (this.l9r = void 0),
        (this.cie = void 0),
        !(this.e7o = void 0)
      );
    }
    p9r() {
      this.l9r ||
        ((this.l9r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.l9r.bIsSingle = !1),
        (this.l9r.bIgnoreSelf = !0),
        (this.l9r.Radius = 75),
        this.l9r.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        )),
        (this.l9r.WorldContextObject = this.Entity.GetComponent(187)?.Owner);
    }
    CalculateReflectDir(t, e, i = void 0, s = !0) {
      if (
        ((i
          ? (this.cie.DeepCopy(i.K2_GetActorRotation()), this.cie)
          : this.Hte.ActorRotationProxy
        ).Vector(this.Fvn),
        Vector_1.Vector.ZeroVectorProxy.Subtraction(t, t),
        s) &&
        t.DotProduct(this.Fvn) < 0
      )
        return !1;
      return e.DeepCopy(this.Fvn), !0;
    }
    ReboundBullet(t, e) {
      if (this.Vvn && e.BulletRowName !== this.Hvn) return !1;
      this.Lie.HasTag(-1827668160) ||
        (this.Lie.AddTag(-1827668160),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.Lie.RemoveTag(-1827668160);
        }, REFLECT_BULLET_EFFECT_CD)),
        e.MoveInfo.BeginSpeedRotator.Vector(this.Ovn),
        this.Ovn.Multiply(this.jvn, this.cz),
        e.ActorComponent.ActorLocationProxy.Addition(this.cz, this.m9r),
        e.CollisionInfo.LastFramePosition.Subtraction(this.cz, this.u9r),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.l9r,
          this.u9r,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.l9r,
          this.m9r,
        );
      let i = void 0;
      if (
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.l9r,
          PROFILE_BULLECT_TRACK,
        )
      ) {
        let e = -1;
        for (let t = 0; t < this.l9r.HitResult.GetHitCount(); t++)
          if (
            ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
              this.l9r.HitResult.Actors.Get(t),
              !0,
            )?.Id === this.Entity.Id
          ) {
            e = t;
            break;
          }
        -1 < e &&
          ((i = this.l9r.HitResult.Actors.Get(e)),
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            this.l9r.HitResult,
            e,
            this.cz,
          ));
      }
      if (!i) {
        if (this.Wvn) return !0;
        this.cz.DeepCopy(t.HitPosition);
      }
      t = i.GetAttachParentActor();
      return (
        t && (i = t),
        !(
          !this.CalculateReflectDir(this.Ovn, this.kvn, i, !1) ||
          (MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.kvn,
            Vector_1.Vector.UpVectorProxy,
            e.MoveInfo.BeginSpeedRotator,
          ),
          this.Wvn
            ? ((i
                ? (this.Ovn.DeepCopy(i.K2_GetActorLocation()),
                  this.cie.FromUeRotator(i.K2_GetActorRotation()),
                  this.cie)
                : (this.Ovn.DeepCopy(this.Hte.ActorLocationProxy),
                  this.Hte.ActorRotationProxy)
              ).Quaternion(this.e7o),
              this.kvn.Multiply(REFLECT_START_OFFSET, this.kvn))
            : (this.kvn.Multiply(REFLECT_START_OFFSET, this.kvn),
              this.Ovn.DeepCopy(this.cz)),
          this.Ovn.Addition(this.kvn, this.Ovn),
          this.e7o.RotateVector(this.Kvn, this.cz),
          this.Ovn.Addition(this.cz, this.Ovn),
          e.ActorComponent.SetActorLocation(this.Ovn.ToUeVector()),
          e.ActorComponent.SetActorRotation(
            e.MoveInfo.BeginSpeedRotator.ToUeRotator(),
          ),
          (e.LiveTimeAddDelta = 0),
          (e.LiveTime = 0))
        )
      );
    }
  });
(SceneItemReboundComponent = SceneItemReboundComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(149)],
    SceneItemReboundComponent,
  )),
  (exports.SceneItemReboundComponent = SceneItemReboundComponent);
//# sourceMappingURL=SceneItemReboundComponent.js.map
