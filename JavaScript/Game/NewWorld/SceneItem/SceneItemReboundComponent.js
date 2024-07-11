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
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  PROFILE_BULLECT_TRACK = "SceneItemReboundComponent_CalculateBulletTrackHit",
  REFLECT_START_OFFSET = 30,
  REFLECT_BULLET_EFFECT_CD = 2e3;
let SceneItemReboundComponent =
  (SceneItemReboundComponent_1 = class SceneItemReboundComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.aMn = void 0),
        (this.hMn = void 0),
        (this.P9r = void 0),
        (this.w9r = void 0),
        (this.lMn = void 0),
        (this.cz = void 0),
        (this.o9o = void 0),
        (this.A9r = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this._Mn = !1),
        (this.uMn = ""),
        (this.cie = void 0),
        (this.cMn = 150),
        (this.mMn = !0),
        (this.dMn = void 0);
    }
    OnInitData(t) {
      (t = t.GetParam(SceneItemReboundComponent_1)[0]),
        (this._Mn = 0 < t.BulletId),
        this._Mn && (this.uMn = t.BulletId.toString()),
        (this.dMn = Vector_1.Vector.Create()),
        (t = t.Option.ReboundPoint);
      return this.dMn.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Lie = this.Entity.GetComponent(177)),
        (this.aMn = Vector_1.Vector.Create()),
        (this.hMn = Vector_1.Vector.Create()),
        (this.P9r = Vector_1.Vector.Create()),
        (this.w9r = Vector_1.Vector.Create()),
        (this.lMn = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.cie = Rotator_1.Rotator.Create()),
        (this.o9o = Quat_1.Quat.Create()),
        !0
      );
    }
    OnActivate() {
      this.N9r();
    }
    End() {
      return (
        (this.Hte = void 0),
        (this.aMn = void 0),
        (this.hMn = void 0),
        (this.P9r = void 0),
        (this.w9r = void 0),
        (this.lMn = void 0),
        (this.cz = void 0),
        (this.A9r = void 0),
        (this.cie = void 0),
        !(this.o9o = void 0)
      );
    }
    N9r() {
      this.A9r ||
        ((this.A9r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.A9r.bIsSingle = !1),
        (this.A9r.bIgnoreSelf = !0),
        (this.A9r.Radius = 75),
        this.A9r.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
        )),
        (this.A9r.WorldContextObject = this.Entity.GetComponent(182)?.Owner);
    }
    CalculateReflectDir(t, e, i = void 0, s = !0) {
      if (
        ((i
          ? (this.cie.DeepCopy(i.K2_GetActorRotation()), this.cie)
          : this.Hte.ActorRotationProxy
        ).Vector(this.lMn),
        Vector_1.Vector.ZeroVectorProxy.Subtraction(t, t),
        s) &&
        t.DotProduct(this.lMn) < 0
      )
        return !1;
      return e.DeepCopy(this.lMn), !0;
    }
    ReboundBullet(t, e) {
      if (this._Mn && e.BulletRowName !== this.uMn) return !1;
      this.Lie.HasTag(-1827668160) ||
        (this.Lie.AddTag(-1827668160),
        TimerSystem_1.TimerSystem.Delay(() => {
          this.Lie.RemoveTag(-1827668160);
        }, REFLECT_BULLET_EFFECT_CD)),
        e.MoveInfo.BeginSpeedRotator.Vector(this.aMn),
        this.aMn.Multiply(this.cMn, this.cz),
        e.ActorComponent.ActorLocationProxy.Addition(this.cz, this.w9r),
        e.CollisionInfo.LastFramePosition.Subtraction(this.cz, this.P9r),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.A9r,
          this.P9r,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.A9r,
          this.w9r,
        );
      let i = void 0;
      if (
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.A9r,
          PROFILE_BULLECT_TRACK,
        )
      ) {
        let e = -1;
        for (let t = 0; t < this.A9r.HitResult.GetHitCount(); t++)
          if (
            ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
              this.A9r.HitResult.Actors.Get(t),
              !0,
            )?.Id === this.Entity.Id
          ) {
            e = t;
            break;
          }
        -1 < e &&
          ((i = this.A9r.HitResult.Actors.Get(e)),
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            this.A9r.HitResult,
            e,
            this.cz,
          ));
      }
      if (!i) {
        if (this.mMn) return !0;
        this.cz.DeepCopy(t.HitPosition);
      }
      t = i.GetAttachParentActor();
      return (
        t && (i = t),
        !(
          !this.CalculateReflectDir(this.aMn, this.hMn, i, !1) ||
          (MathUtils_1.MathUtils.LookRotationForwardFirst(
            this.hMn,
            Vector_1.Vector.UpVectorProxy,
            e.MoveInfo.BeginSpeedRotator,
          ),
          this.mMn
            ? ((i
                ? (this.aMn.DeepCopy(i.K2_GetActorLocation()),
                  this.cie.FromUeRotator(i.K2_GetActorRotation()),
                  this.cie)
                : (this.aMn.DeepCopy(this.Hte.ActorLocationProxy),
                  this.Hte.ActorRotationProxy)
              ).Quaternion(this.o9o),
              this.hMn.Multiply(REFLECT_START_OFFSET, this.hMn))
            : (this.hMn.Multiply(REFLECT_START_OFFSET, this.hMn),
              this.aMn.DeepCopy(this.cz)),
          this.aMn.Addition(this.hMn, this.aMn),
          this.o9o.RotateVector(this.dMn, this.cz),
          this.aMn.Addition(this.cz, this.aMn),
          e.ActorComponent.SetActorLocation(this.aMn.ToUeVector()),
          e.ActorComponent.SetActorRotation(
            e.MoveInfo.BeginSpeedRotator.ToUeRotator(),
          ),
          (e.LiveTime = 0))
        )
      );
    }
  });
(SceneItemReboundComponent = SceneItemReboundComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(146)],
    SceneItemReboundComponent,
  )),
  (exports.SceneItemReboundComponent = SceneItemReboundComponent);
//# sourceMappingURL=SceneItemReboundComponent.js.map
