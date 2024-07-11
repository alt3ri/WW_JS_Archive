"use strict";
var SceneItemFanComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, h) {
      var e,
        o = arguments.length,
        n =
          o < 3
            ? i
            : null === h
              ? (h = Object.getOwnPropertyDescriptor(i, s))
              : h;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, s, h);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (e = t[r]) &&
            (n = (o < 3 ? e(n) : 3 < o ? e(i, s, n) : e(i, s)) || n);
      return 3 < o && n && Object.defineProperty(i, s, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemFanComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
  LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  FAN_DEFAULT_ROTATE_SPEED = 120,
  FAN_MAX_TRACE_LENGTH_OFFSET = 300,
  FAN_DEFAULT_SPLINE_LENGTH = 300,
  SPLINE_MOVE_SEPPD = 6e3,
  FIRST_SPLINE_MOVE_SPEED = 3e4,
  WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME = 1e3,
  PROFILE_BULLECT_TRACK = "SceneItemFanComponent_StartTrace",
  FAN_SPHERE_TRACE_RADIUS = 10,
  ROTATE_ACTOR_KEY = "RotateActor",
  OFFSET_ACTOR_KEY = "OffsetActor";
class SporeStruct {
  constructor() {
    (this.Length = 0),
      (this.SporeEntityIds = new Array()),
      (this.SporeEntityLength = new Array()),
      (this.gwe = 0),
      (this.RootCreatureDataId = 0),
      (this.Xnr = void 0);
  }
  Init(t) {
    this.Xnr = t;
  }
  Clear(t = !1) {
    if (t)
      for (let t = this.SporeEntityIds.length - 1; -1 < t; t--) {
        var i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.SporeEntityIds[t],
        );
        i && this.Xnr && this.Xnr(i.Entity, !0, !1);
      }
    (this.Length = 0),
      (this.SporeEntityIds.length = 0),
      (this.SporeEntityLength.length = 0),
      (this.gwe = 0);
  }
  NeedTick() {
    return 0 < this.SporeEntityIds.length;
  }
  SetPreLength(t) {
    this.gwe = t + 0.01;
    for (let t = this.SporeEntityIds.length - 1; -1 < t; t--)
      this.gwe >= this.SporeEntityLength[t] &&
        (this.SporeEntityLength.splice(t, 1), this.SporeEntityIds.splice(t, 1));
  }
  SpliceToEntity(i) {
    for (
      let t = this.SporeEntityIds.length - 1;
      -1 < t && this.SporeEntityIds[t] !== i;
      t--
    )
      this.SporeEntityLength.splice(t, 1), this.SporeEntityIds.splice(t, 1);
  }
  Tick(t, i) {
    this.gwe +=
      t *
      TimeUtil_1.TimeUtil.Millisecond *
      (i ? FIRST_SPLINE_MOVE_SPEED : SPLINE_MOVE_SEPPD);
    for (let t = this.SporeEntityIds.length - 1; -1 < t; t--) {
      var s;
      this.gwe > this.SporeEntityLength[t] &&
        ((s = this.SporeEntityIds[t]),
        this.SporeEntityLength.splice(t, 1),
        this.SporeEntityIds.splice(t, 1),
        (s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(s))) &&
        this.Xnr &&
        this.Xnr(s.Entity, !0, !1);
    }
  }
}
class SplinePoint {
  constructor() {
    (this.Location = void 0),
      (this.Rotator = void 0),
      (this.Offset = void 0),
      (this.EntityId = 0),
      (this.EffectConfig = void 0),
      (this.IsBlockInMiddle = !1),
      (this.HitLocation = void 0),
      (this.HitRotator = void 0);
  }
}
let SceneItemFanComponent =
  (SceneItemFanComponent_1 = class SceneItemFanComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.FCn = 0),
        (this.VCn = 0),
        (this._se = 0),
        (this.HCn = void 0),
        (this.jCn = 0),
        (this.WCn = 0),
        (this.KCn = new Map()),
        (this.QCn = void 0),
        (this.XCn = void 0),
        (this.Brr = FAN_DEFAULT_ROTATE_SPEED),
        (this.$Cn = 0),
        (this.YCn = Vector_1.Vector.Create(0, 0, 0)),
        (this.JCn = void 0),
        (this.zCn = void 0),
        (this.ZCn = void 0),
        (this.nXt = void 0),
        (this.egn = void 0),
        (this.hwe = void 0),
        (this.Ome = void 0),
        (this.tgn = void 0),
        (this.ign = void 0),
        (this.cz = void 0),
        (this.Cji = void 0),
        (this.U9r = void 0),
        (this.ogn = void 0),
        (this.rgn = void 0),
        (this.ngn = void 0),
        (this.sgn = 0),
        (this.Xte = void 0),
        (this.agn = void 0),
        (this.lsn = void 0),
        (this.hgn = !1),
        (this.lgn = void 0),
        (this.gIe = (t, i) => {}),
        (this._gn = void 0),
        (this.SceneInteractionLoadCompleted = !1),
        (this.Qnn = () => {
          this.SceneInteractionLoadCompleted = !0;
          var t,
            i = this.nXt?.GetInteractionMainActor(),
            i =
              ((this._gn = i?.ReferenceActors?.Get(ROTATE_ACTOR_KEY)),
              this.ugn(),
              i?.ReferenceActors?.Get(OFFSET_ACTOR_KEY));
          i
            ? ((this.YCn = Vector_1.Vector.Create(i.K2_GetActorLocation())),
              this.YCn.SubtractionEqual(this.nXt.ActorLocationProxy),
              (t = Quat_1.Quat.Create()),
              this.nXt.ActorRotationProxy.Quaternion().Inverse(t),
              t.RotateVector(this.YCn, this.YCn))
            : this.YCn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            this.cgn(i),
            this.mgn(),
            !this.dgn && this.hgn && this.$tn();
        }),
        (this.Cgn = (i, s) => {
          if (!this.IsAnyRotating) {
            let t = void 0;
            (t = this.dgn ? this : this.JCn) &&
              (i || (this.zBn = s), t.ggn(i, this), (this.zBn = void 0));
          }
        }),
        (this.fgn = void 0),
        (this.pgn = void 0),
        (this.zBn = void 0),
        (this.vgn = void 0),
        (this.Mgn = !1),
        (this.Sgn = (i, s, t) => {
          const h = i.GetComponent(135);
          if (s && !this.Egn && h) h.ygn();
          else {
            if (h)
              if (s) {
                if (!h.Ign()) return;
              } else if (!h.dce()) return;
            if (this.ngn)
              if (this.ngn.has(i.Id)) {
                if (s) {
                  if (this.ngn.get(i.Id)) return;
                } else if (!this.ngn.get(i.Id)) return;
              } else this.ngn.set(i.Id, s);
            var e;
            t
              ? (t = i.GetComponent(177)) &&
                (s
                  ? (t.RemoveServerTagByIdLocal(-1152559349, ""),
                    t.HasTag(-3775711) || t.AddServerTagByIdLocal(-3775711, ""))
                  : (t.RemoveServerTagByIdLocal(-3775711, ""),
                    t.HasTag(-1152559349) ||
                      t.AddServerTagByIdLocal(-1152559349, "")),
                this.ngn.set(i.Id, s))
              : ((t = this.nXt.CreatureData.GetCreatureDataId()),
                (e = i.GetComponent(0)?.GetCreatureDataId()) &&
                  this.Tgn(t, e, s, (t) => {
                    0 !== t?.X5n
                      ? Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "Level",
                          37,
                          "SendBaoziStateRequest Failed",
                          ["ErrorCode", t?.X5n],
                        )
                      : (this.ngn.set(i.Id, s), !s && h && h.Ugn(!1, !1));
                  }));
          }
        }),
        (this.Lgn = 0),
        (this.kke = (t, i) => {
          if (
            (-511894810 === t &&
              (this.JCn?.Dgn(this.Entity.Id, i), i) &&
              this.Rgn(),
            -3775711 === t && i)
          ) {
            if (
              this.dgn &&
              (this.Agn ||
                ((this.Agn = !0),
                this.Egn ? this.Kgn(void 0, !0) : (this.Lgn = 5e3),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Level",
                    37,
                    "[SceneItemFanComponent] Root Active",
                    ["EntityId", this.Entity.Id],
                  )),
              this.zCn)
            )
              for (const s of this.zCn) s?.GetComponent(135)?.Ugn(!1, !1);
            this.Ugn(!0);
          } else -1152559349 === t && i && this.Ugn(!1, !1);
          if (this.dgn && (-1152559349 === t || 1298716444 === t) && i) {
            if (this.zCn) for (const h of this.zCn) h?.GetComponent(135)?.Rgn();
            1298716444 === t && this.ZDn();
          }
          if (i)
            for (const e of this.KCn)
              if (e[0] === t) return (this.QCn = e[1]), void this.Pgn();
          for (const o of this.KCn) if (this.Xte?.HasTag(o[0])) return;
          this.QCn !== this.HCn && ((this.QCn = this.HCn), this.Pgn());
        }),
        (this.xgn = 0),
        (this.opi = 0),
        (this.Krr = void 0),
        (this.wgn = void 0),
        (this.Bgn = void 0),
        (this.bgn = void 0),
        (this.S8s = void 0),
        (this.E8s = void 0),
        (this.qgn = void 0),
        (this.Ggn = void 0),
        (this.Egn = !1),
        (this.y8s = !1),
        (this.Ngn = 0),
        (this.Ogn = 0),
        (this.fle = 0),
        (this.kgn = 0),
        (this.Fgn = 0),
        (this.Agn = !1),
        (this.Vgn = !1),
        (this.gCn = (t) => {
          this.ExecuteInteract();
        }),
        (this.cjr = (i) => {
          var t, s;
          if (
            (0 < this.Fgn &&
              ((this.Fgn -= i),
              (t = MathUtils_1.MathUtils.Lerp(
                this.fle,
                this.kgn,
                1 - MathUtils_1.MathUtils.Clamp(this.Fgn / this.$Cn, 0, 1),
              )),
              (this.hwe.Yaw = t),
              MathUtils_1.MathUtils.ComposeRotator(
                this.hwe,
                this.egn,
                this.Ome,
              ),
              this.Hgn(this.Ome, "SceneItemFanComponent Rotate"),
              this.Fgn <= 0) &&
              this.jgn(),
            this.dgn)
          ) {
            if (
              (this.Wgn(i),
              this.rgn?.NeedTick() && this.rgn.Tick(i, this.y8s),
              0 < this.Lgn)
            ) {
              this.Lgn -= i;
              let t = !0;
              for (const n of this.zCn) {
                var h = n.GetComponent(135);
                if (h && !this.Egn && !h.dce()) {
                  t = !1;
                  break;
                }
              }
              t
                ? ((this.Lgn = 0),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      37,
                      "[SceneItemFanComponent] All Child Active",
                      ["EntityId", this.Entity.Id],
                    ),
                  this.Kgn())
                : this.Lgn <= 0 &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      37,
                      "[SceneItemFanComponent] Wait Child Active Timeout",
                      ["EntityId", this.Entity.Id],
                    ),
                  this.Kgn());
            }
            if (this.vgn) {
              for (let t = this.vgn.length - 1; -1 < t; t--) {
                var e,
                  o = this.vgn[t],
                  o =
                    ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                      o,
                    );
                o?.Entity &&
                  ((e = o?.Entity?.GetComponent(135))
                    ? e.SceneInteractionLoadCompleted &&
                      (e?.Valid && e.SetRoot(this),
                      this.zCn.push(o.Entity),
                      this.vgn.splice(t, 1))
                    : (this.vgn.splice(t, 1), this.zCn.push(o.Entity)));
              }
              0 === this.vgn.length && ((this.vgn = void 0), this.Qgn());
            }
            if (this.S8s && this.E8s)
              for (let t = this.E8s.length - 1; -1 < t; t--)
                this.E8s[t] <= i
                  ? ((s = this.S8s[t]),
                    this.S8s.splice(t, 1),
                    this.E8s.splice(t, 1),
                    EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
                      s,
                      !1,
                    ))
                  : (this.E8s[t] -= i);
          }
        }),
        (this.Xgn = void 0),
        (this.$gn = void 0),
        (this.Ygn = void 0),
        (this.Wtn = void 0),
        (this.Jgn = 300),
        (this.zgn = void 0),
        (this.Zgn = -1),
        (this.e0n = !1),
        (this.t0n = !1),
        (this.i0n = !1),
        (this.ZYo = void 0),
        (this.o0n = void 0),
        (this.r0n = void 0),
        (this.n0n = void 0),
        (this.s0n = 0),
        (this.a0n = 0),
        (this.h0n = 0),
        (this.l0n = 0),
        (this._0n = void 0),
        (this.u0n = void 0),
        (this.c0n = void 0),
        (this.m0n = void 0),
        (this.d0n = void 0),
        (this.C0n = void 0),
        (this.g0n = void 0),
        (this.f0n = void 0),
        (this.p0n = void 0);
    }
    get dgn() {
      return void 0 === this.JCn && void 0 !== this.zCn;
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemFanComponent_1)[0];
      if (
        ((this.FCn = t.CirclePerRound),
        (this.VCn = t.InitCircle),
        t.TargetEntityId && (this._se = t.TargetEntityId),
        (this.Egn = t.GearType === IComponent_1.EFanGearType.LightDeliver),
        t.InteractType?.Type === IComponent_1.EFanInteractType.FKey &&
          ((this.hgn = !0), (this.zgn = t.InteractType?.TidInteractOptionText)),
        (this.lgn = t.Condition),
        t.EffectConfig && ((this.HCn = t.EffectConfig), (this.QCn = this.HCn)),
        t.EffectByState)
      )
        for (const s of t.EffectByState) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            s.EntityState,
          );
          i && this.KCn.set(i, s.EffectConfig);
        }
      else this.XCn = this.QCn;
      return (
        (this.jCn = 360 / this.FCn),
        (this.$Cn =
          (this.jCn / this.Brr) * TimeUtil_1.TimeUtil.InverseMillisecond),
        !0
      );
    }
    OnStart() {
      if (
        (this.Entity.GetComponent(138).RegisterComponent(this),
        this.hgn ||
          EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.gCn,
          ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ),
        0 < this.KCn.size &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnLevelTagChanged,
            this.gIe,
          ),
        (this.nXt = this.Entity.GetComponent(182)),
        !this.nXt)
      )
        return !1;
      if (
        ((this.Xte = this.Entity.GetComponent(177)),
        (this.agn = this.Entity.GetComponent(145)),
        (this.lsn = this.Entity.GetComponent(74)),
        0 < this.KCn.size)
      ) {
        for (const i of this.KCn)
          if (this.Xte?.HasTag(i[0])) {
            this.QCn = i[1];
            break;
          }
        this.KCn.has(-3775711) && (this.XCn = this.KCn.get(-3775711));
      }
      this.Xte?.AddTagAddOrRemoveListener(-511894810, this.kke),
        this.Xte?.AddTagAddOrRemoveListener(-3775711, this.kke),
        this.Xte?.AddTagAddOrRemoveListener(-1152559349, this.kke),
        this.Xte?.AddTagAddOrRemoveListener(1298716444, this.kke),
        (this.hwe = Rotator_1.Rotator.Create()),
        (this.Ome = Rotator_1.Rotator.Create()),
        (this.tgn = Vector_1.Vector.Create()),
        (this.ign = Vector_1.Vector.Create()),
        (this.o0n = Vector_1.Vector.Create()),
        (this.r0n = Vector_1.Vector.Create()),
        (this.n0n = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.ZYo = Vector_1.Vector.Create());
      var t = this.nXt.CreatureData?.ComponentDataMap.get("cps")?.cps;
      return (
        t && (this.WCn = t.yMs),
        !Info_1.Info.EnableForceTick &&
          this.Active &&
          ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
            this,
            this.cjr,
          ),
        !0
      );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    Pgn() {
      this.dgn && this.Mgn
        ? (this.v0n(this.QCn?.EffectPath, 0, this.bgn),
          this.v0n(this.QCn?.HitEffectPath, 0, this.qgn))
        : this.JCn?.OnChildCurrentFanEffectChange(this.Entity.Id, this.QCn);
    }
    OnChildCurrentFanEffectChange(s, h) {
      if (this.dgn && this.Mgn) {
        let i = -1;
        for (let t = 0; t < this.U9r.length; t++)
          if (this.U9r[t].EntityId === s) {
            (i = t), (this.U9r[t].EffectConfig = h);
            break;
          }
        -1 < i &&
          ((i += 1),
          this.v0n(h?.EffectPath, i, this.bgn),
          this.v0n(h?.HitEffectPath, i, this.qgn),
          i !== this.U9r.length - 1 ||
            this.U9r[i].IsBlockInMiddle ||
            this.Yyn(i, !0, 0));
      }
    }
    cgn(t) {
      this.lsn &&
        (t && this.lsn.SetRangeActorParent(t),
        this.lsn.AddOnActorOverlapCallback(this.Cgn));
    }
    M0n(t = -1) {
      var i;
      this.fgn ||
        (this.fgn = new UE.Vector(
          0.1,
          FAN_SPHERE_TRACE_RADIUS,
          FAN_SPHERE_TRACE_RADIUS,
        )),
        this.pgn || (this.pgn = new UE.Vector(0, 0, 0)),
        t < 0
          ? ((i = this.QCn
              ? this.QCn.DefaultEffectLength
              : FAN_DEFAULT_SPLINE_LENGTH),
            (this.fgn.X = 0 < this.Ogn ? this.Ogn / 2 : i / 2))
          : (this.fgn.X = t),
        (this.pgn.X = this.fgn.X),
        this.lsn?.UpdateBoxRange(this.pgn, this.fgn);
    }
    ggn(t, h = void 0) {
      if (
        h &&
        this.Agn &&
        this.Mgn &&
        this.U9r &&
        !(this.U9r.length < 1) &&
        this.Cji &&
        this.nXt
      ) {
        var e = h.Entity?.Id;
        let i = void 0,
          s = -1;
        if (h.dgn) (i = this.U9r[0]), (s = 0);
        else
          for (let t = 0; t < this.U9r.length - 1; t++) {
            var o = this.U9r[t];
            if (0 === o.EntityId) break;
            o.EntityId === e && ((i = this.U9r[t + 1]), (s = t + 1));
          }
        if (i) {
          t || (this.Cji.Radius = 0.7 * FAN_SPHERE_TRACE_RADIUS);
          var n = h.S0n(this.Cji, this.sgn, i, this.ign);
          if (-1 < n) {
            if (
              (this.I0n &&
                this.Zgn === s &&
                ((this.e0n = !1), (this.t0n = !1), this.K0n(this.Zgn)),
              0 < i.EntityId)
            ) {
              this.rgn?.SpliceToEntity(i.EntityId);
              for (let t = this.U9r.length - 1; t >= s; t--) {
                var r = this.U9r[t],
                  _ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
                    r.EntityId,
                  );
                _ && _.Entity && this.Sgn(_.Entity, !1, !1),
                  t > s &&
                    (this.U9r.splice(t, 1), SceneItemFanComponent_1.E0n(r));
              }
              (i.EntityId = 0),
                (this.Zgn = s),
                this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
                this.y0n(!0, !1);
            }
            var a = this.U9r[s],
              a =
                (a.HitLocation?.DeepCopy(this.ign),
                a.Location?.DeepCopy(this.ign),
                h.T0n().Quaternion().RotateVector(h.YCn, this.tgn),
                this.tgn.AdditionEqual(h.nXt.ActorLocationProxy),
                this.D0n(s, this.tgn.ToUeVector(), this.ign.ToUeVector()),
                Math.min(
                  this.U9r.length - 1,
                  Math.min(this.qgn.length - 1, this.Zgn),
                ));
            -1 < a &&
              (h = EffectSystem_1.EffectSystem.GetEffectActor(this.qgn[a])) &&
              (this.Yyn(a, !1, 1),
              h.K2_SetActorLocationAndRotation(
                this.ign.ToUeVector(),
                this.U9r[a].HitRotator.ToUeRotator(),
                !1,
                void 0,
                !0,
              ));
          } else -3 === n && this.Kgn(e);
          t || (this.Cji.Radius = FAN_SPHERE_TRACE_RADIUS);
        }
      }
    }
    S0n(t, h, e, o) {
      this.T0n().Quaternion().RotateVector(this.YCn, this.tgn),
        this.tgn.AdditionEqual(this.nXt.ActorLocationProxy);
      this.L0n().Multiply(h, this.ign),
        this.ign.AdditionEqual(this.tgn),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.tgn),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.ign);
      h = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        t,
        PROFILE_BULLECT_TRACK,
      );
      if (h) {
        var n = t.HitResult,
          r = n.GetHitCount(),
          _ = n.Actors;
        let i = !1,
          s = !1;
        for (let t = 0; t < r; t++) {
          var a = _.Get(t);
          if (a !== this.zBn) {
            a =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
                a,
              );
            if (a?.Id !== this.Entity.Id) {
              var f = a?.Entity?.GetComponent(135);
              if (f) {
                if (s) {
                  i = !0;
                  break;
                }
                if (f.R0n()) continue;
                if (0 === e.EntityId) return -3;
              }
              if (!s) {
                if (a && a.Entity?.Id === e.EntityId) return -1;
                (s = !0),
                  (o.X = n.LocationX_Array.Get(t)),
                  (o.Y = n.LocationY_Array.Get(t)),
                  (o.Z = n.LocationZ_Array.Get(t));
              }
            }
          }
        }
        if (s)
          return (
            (h = Vector_1.Vector.Dist(o, this.tgn)),
            void 0 !== this.XCn?.DefaultEffectLength &&
            !i &&
            this.XCn?.DefaultEffectLength < h
              ? -2
              : h
          );
      }
      return -2;
    }
    ugn() {
      if (((this.egn = Rotator_1.Rotator.Create()), 0 !== this._se)) {
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this._se,
        );
        if (t) {
          t = t.Entity.GetComponent(182);
          if (t)
            return (
              t.ActorLocationProxy.Subtraction(
                this.nXt.ActorLocationProxy,
                this.cz,
              ),
              void MathUtils_1.MathUtils.LookRotationUpFirst(
                this.cz,
                this.A0n(),
                this.egn,
              )
            );
        }
      }
      this.egn.DeepCopy(this.T0n()),
        (this.WCn = this.WCn % this.FCn),
        (this.fle = (this.WCn + this.VCn) * this.jCn),
        (this.hwe.Yaw = this.fle),
        MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.egn, this.Ome),
        this.Hgn(this.Ome, "SceneItemFanComponent Rotate");
    }
    OnEnd() {
      if (
        (Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        this.hgn
          ? this.U0n()
          : EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.gCn,
            ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnLevelTagChanged,
            this.gIe,
          ),
        this.Xte?.RemoveTagAddOrRemoveListener(-511894810, this.kke),
        this.Xte?.RemoveTagAddOrRemoveListener(-3775711, this.kke),
        this.Xte?.RemoveTagAddOrRemoveListener(-1152559349, this.kke),
        this.Xte?.RemoveTagAddOrRemoveListener(1298716444, this.kke),
        (this.egn = void 0),
        (this.hwe = void 0),
        (this.Ome = void 0),
        (this.tgn = void 0),
        (this.ign = void 0),
        (this.o0n = void 0),
        (this.r0n = void 0),
        (this.n0n = void 0),
        (this.cz = void 0),
        (this.ZYo = void 0),
        this.Krr &&
          (ActorSystem_1.ActorSystem.Put(this.Krr), (this.Krr = void 0)),
        (this.JCn = void 0),
        EffectSystem_1.EffectSystem.IsValid(this.opi) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.opi,
            "SceneItemFanComponent.OnEnd",
            !0,
          ),
        (this.opi = 0),
        (this.U9r = void 0),
        (this.ogn = void 0),
        (this._0n = void 0),
        (this.u0n = void 0),
        (this.c0n = void 0),
        (this.m0n = void 0),
        (this.d0n = void 0),
        (this.C0n = void 0),
        (this.g0n = void 0),
        (this.f0n = void 0),
        (this.p0n = void 0),
        (this.rgn = void 0),
        (this._gn = void 0),
        this.wgn)
      )
        for (const t of this.wgn) ActorSystem_1.ActorSystem.Put(t);
      if (((this.wgn = void 0), (this.Bgn = void 0), this.bgn)) {
        for (const i of this.bgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "SceneItemFanComponent.OnEnd",
            !0,
          );
        this.bgn = void 0;
      }
      if (this.qgn) {
        for (const s of this.qgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            s,
            "SceneItemFanComponent.OnEnd",
            !0,
          );
        this.qgn = void 0;
      }
      return (
        (this.S8s = void 0),
        (this.E8s = void 0),
        (this.nXt = void 0),
        (this.Xte = void 0),
        (this.agn = void 0),
        this.lsn?.RemoveOnActorOverlapCallback(this.Cgn),
        !(this.lsn = void 0)
      );
    }
    SetRoot(t) {
      (this.JCn = t),
        (this.JCn?.Xte?.HasTag(-1152559349) ||
          this.JCn?.Xte?.HasTag(1298716444)) &&
          this.Rgn();
    }
    mgn() {
      var t = this.Entity.GetComponent(0);
      if (t?.Valid) {
        t = t.GetBaseInfo().ChildEntityIds;
        if (t && !(t.length < 1)) {
          (this.zCn = new Array()), (this.vgn = new Array());
          for (const i of t) this.vgn.push(i);
        }
      }
    }
    Qgn() {
      if (this.dgn) {
        this.hgn && this.$tn(),
          (this.Mgn = !0),
          (this.Cji = UE.NewObject(UE.TraceSphereElement.StaticClass())),
          (this.Cji.bIsSingle = !1),
          (this.Cji.bIgnoreSelf = !0),
          (this.Cji.Radius = FAN_SPHERE_TRACE_RADIUS),
          this.Cji.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
          ),
          (this.Cji.WorldContextObject = this.nXt.Owner);
        var n = this.nXt.ActorLocationProxy;
        let t = n.X,
          i = n.Y,
          s = n.Z,
          h = n.X,
          e = n.Y,
          o = n.Z;
        for (const a of this.zCn) {
          var r = a.GetComponent(182);
          r &&
            ((n = r.ActorLocationProxy),
            (t = Math.min(t, n.X)),
            (i = Math.min(i, n.Y)),
            (s = Math.min(s, n.Z)),
            (h = Math.max(h, n.X)),
            (e = Math.max(e, n.Y)),
            (o = Math.max(o, n.Z)));
        }
        if (
          ((this.sgn =
            Math.sqrt(
              Math.pow(h - t, 2) + Math.pow(e - i, 2) + Math.pow(o - s, 2),
            ) + FAN_MAX_TRACE_LENGTH_OFFSET),
          (this.ZCn = new Set()),
          (this.U9r = new Array()),
          (this.ogn = new Array()),
          (this._0n = Vector_1.Vector.Create()),
          (this.u0n = Vector_1.Vector.Create()),
          (this.c0n = Vector_1.Vector.Create()),
          (this.m0n = Quat_1.Quat.Create()),
          (this.d0n = Quat_1.Quat.Create()),
          (this.C0n = Quat_1.Quat.Create()),
          (this.g0n = Vector_1.Vector.Create()),
          (this.f0n = Vector_1.Vector.Create()),
          (this.p0n = Vector_1.Vector.Create()),
          (this.rgn = new SporeStruct()),
          this.rgn.Init(this.Sgn),
          (this.ngn = new Map()),
          (this.wgn = new Array()),
          (this.Bgn = new Array()),
          (this.bgn = new Array()),
          (this.S8s = new Array()),
          (this.E8s = new Array()),
          (this.qgn = new Array()),
          (this.Ggn = UE.NewArray(UE.Vector)),
          (this.Agn = this.Xte.HasTag(-3775711)),
          this.Agn && this.zCn)
        )
          for (const f of this.zCn) f?.GetComponent(135)?.I8s();
        TimerSystem_1.TimerSystem.Next(() => {
          this.Agn && this.Kgn(void 0, !0), this.M0n();
        }),
          this.Pgn();
        for (const v of this.zCn) {
          var _ = v.GetComponent(135);
          _ && _.Pgn();
        }
      }
    }
    P0n() {
      return this.nXt.ActorLocationProxy;
    }
    eRn() {
      return this.T0n();
    }
    w0n() {
      return this.YCn;
    }
    B0n() {
      return this.XCn;
    }
    static b0n() {
      var t;
      return SceneItemFanComponent_1.q0n.length < 1
        ? (((t = new SplinePoint()).Location = Vector_1.Vector.Create()),
          (t.Rotator = Rotator_1.Rotator.Create()),
          (t.Offset = Vector_1.Vector.Create()),
          (t.HitLocation = Vector_1.Vector.Create()),
          (t.HitRotator = Rotator_1.Rotator.Create()),
          t)
        : SceneItemFanComponent_1.q0n.pop();
    }
    static E0n(t) {
      t.Location.Set(0, 0, 0),
        t.Rotator.Set(0, 0, 0),
        t.Offset.Set(0, 0, 0),
        (t.EntityId = 0),
        (t.EffectConfig = void 0),
        (t.IsBlockInMiddle = !1),
        t.HitLocation.Set(0, 0, 0),
        t.HitRotator.Set(0, 0, 0),
        SceneItemFanComponent_1.q0n.push(t);
    }
    G0n(t) {
      this.Vgn = !0;
      var i = this.nXt.CreatureData.GetCreatureDataId();
      this.N0n(i, t, (t) => {
        (this.Vgn = !1),
          0 !== t?.X5n
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Level", 37, "SetFanStateResponse Failed", [
                "ErrorCode",
                t?.X5n,
              ])
            : this.Agn ||
              ((this.Agn = !0), this.Egn ? this.Kgn() : (this.Lgn = 5e3));
      });
    }
    dce() {
      return this.Xte?.HasTag(-3775711) ?? !1;
    }
    Ign() {
      return this.Xte?.HasTag(-1152559349) ?? !1;
    }
    R0n() {
      return this.Xte?.HasTag(-511894810) ?? !1;
    }
    ZDn() {
      if (this.bgn) {
        for (const i of this.bgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "SceneItemFanComponent.OnRootComplete",
            !0,
          );
        this.bgn.length = 0;
      }
      if (this.qgn) {
        for (const s of this.qgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            s,
            "SceneItemFanComponent.OnRootComplete",
            !0,
          );
        this.qgn.length = 0;
      }
      if (this.wgn) {
        for (const h of this.wgn) ActorSystem_1.ActorSystem.Put(h);
        this.wgn.length = 0;
      }
      this.Bgn && (this.Bgn.length = 0);
      for (const e of this.zCn) {
        var t = e.GetComponent(135);
        t && t.M0n(0);
      }
    }
    Dgn(s, t) {
      if (
        (t && this.ngn?.has(s) && this.ngn?.delete(s),
        this.Agn &&
          this.Mgn &&
          this.U9r &&
          !(this.U9r.length < 1) &&
          !this.Xte?.HasTag(1298716444))
      ) {
        let i = -1;
        for (let t = 0; t < this.U9r.length - 1; t++) {
          var h = this.U9r[t];
          if (0 === h.EntityId) break;
          if (h.EntityId === s) {
            i = t - 1;
            break;
          }
        }
        -1 < i ? ((t = this.U9r[i].EntityId), this.Kgn(t)) : this.Kgn();
      }
    }
    Rgn() {
      this.Xte?.RemoveTag(1174613996),
        this.Xte?.RemoveTag(942900915),
        this.Xte?.RemoveTag(-216276934);
      var t = this.agn?.EntityInSocket?.Entity?.GetComponent(177);
      t &&
        (t.RemoveTag(1174613996),
        t.RemoveTag(942900915),
        t.RemoveTag(-216276934)),
        0 !== this.xgn &&
          ((t = EntitySystem_1.EntitySystem.GetComponent(this.xgn, 177)) &&
            (t.RemoveTag(1174613996),
            t.RemoveTag(942900915),
            t.RemoveTag(-216276934)),
          (this.xgn = 0));
    }
    I8s() {
      this.Xte && !this.Xte.HasTag(-1018185327) && this.Xte.AddTag(1174613996);
    }
    Ugn(t, i = void 0) {
      var s;
      this.R0n() ||
        (!this.JCn?.Xte?.HasTag(-1152559349) &&
          !this.JCn?.Xte?.HasTag(1298716444) &&
          (this.Xte &&
            (t
              ? (this.Xte.RemoveTag(1174613996),
                this.Xte.HasTag(942900915) || this.Xte.AddTag(942900915),
                i
                  ? this.Xte.HasTag(-216276934) || this.Xte.AddTag(-216276934)
                  : void 0 !== i && this.Xte.RemoveTag(-216276934))
              : (this.Xte.HasTag(1174613996) || this.Xte.AddTag(1174613996),
                this.Xte.RemoveTag(942900915),
                this.Xte.RemoveTag(-216276934))),
          (s = this.agn?.EntityInSocket?.Entity?.GetComponent(177))) &&
          ((this.xgn = this.agn.EntityInSocket.Entity.Id),
          t
            ? (s.RemoveTag(1174613996),
              s.HasTag(942900915) || s.AddTag(942900915),
              i
                ? s.HasTag(-216276934) || s.AddTag(-216276934)
                : void 0 !== i && s.RemoveTag(-216276934))
            : (s.HasTag(1174613996) || s.AddTag(1174613996),
              s.RemoveTag(942900915),
              s.RemoveTag(-216276934))));
    }
    T5s(t) {
      for (const i of this.U9r) if (i.EntityId === t) return !0;
      return !1;
    }
    Kgn(s = void 0, t = !1) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Level",
            37,
            "[SceneItemFanComponent] RefreshTraceState",
            ["EntityId", this.Entity.Id],
          ),
        this.dgn)
      )
        if (this.Agn)
          if (this.Mgn)
            if (this.Xte?.HasTag(1298716444))
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Level",
                  37,
                  "[SceneItemFanComponent] RefreshTraceState Failed, Has Completed",
                  ["EntityId", this.Entity.Id],
                );
            else if (this.I0n) this.t0n = !0;
            else {
              (this.y8s = t), this.ZCn.clear();
              for (let t = this.zCn.length - 1; -1 < t; t--) {
                var i = this.zCn[t];
                i?.Valid ? this.ZCn.add(i.Id) : this.zCn.splice(t, 1);
              }
              this.ogn.length = 0;
              for (const e of this.U9r) {
                if (0 === e.EntityId) break;
                this.ogn.push(e.EntityId);
              }
              if (s)
                for (let t = this.U9r.length - 1; 0 < t; t--)
                  if (this.U9r[t - 1].EntityId === s) {
                    this.U9r[t].HitLocation?.Equals(
                      Vector_1.Vector.ZeroVectorProxy,
                    )
                      ? this.r0n.DeepCopy(this.U9r[t].Location)
                      : this.r0n.DeepCopy(this.U9r[t].HitLocation);
                    break;
                  }
              for (const o of this.U9r) SceneItemFanComponent_1.E0n(o);
              if (
                ((this.U9r.length = 0),
                this.rgn.Clear(),
                this.O0n(this.ZCn, this.U9r, this.Cji, this.sgn, this.rgn),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Level",
                    37,
                    "[SceneItemFanComponent] TraceToFan",
                    ["PointCount", this.U9r?.length],
                    ["EntityId", this.Entity.Id],
                  ),
                s)
              ) {
                let i = !1;
                for (let t = this.U9r.length - 1; 0 < t; t--)
                  if (this.U9r[t - 1].EntityId === s) {
                    i = !0;
                    break;
                  }
                i || this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
              } else this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
              for (let t = this.zCn.length - 1; -1 < t; t--) {
                var h = this.zCn[t];
                this.ZCn.has(h.Id) && this.Sgn(h, !1, !1);
              }
              if (
                (this.k0n(), this.rgn && 0 < this.U9r.length && 0 < this.Zgn)
              ) {
                let i = this.nXt.ActorLocationProxy,
                  s = 0;
                for (let t = 0; t < this.Zgn; t++)
                  (s += Vector_1.Vector.Dist(i, this.U9r[t].Location)),
                    (i = this.U9r[t].Location);
                this.rgn.SetPreLength(s);
              }
            }
          else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Level",
                37,
                "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsAllChildInitFinish",
                ["EntityId", this.Entity.Id],
              );
        else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Level",
              37,
              "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRootFire",
              ["EntityId", this.Entity.Id],
            );
      else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Level",
            37,
            "[SceneItemFanComponent] RefreshTraceState Failed, !this.IsRoot",
            ["EntityId", this.Entity.Id],
          );
    }
    O0n(t, i, s, h, e = void 0) {
      this.Ngn = 0;
      var o = this.XCn
          ? this.XCn.DefaultEffectLength
          : FAN_DEFAULT_SPLINE_LENGTH,
        n = SceneItemFanComponent_1.b0n(),
        r = this.F0n(t, s, h, n, e, o),
        o =
          ((this.Ngn = 0 < this.Ngn ? this.Ngn : o),
          e && (e.Length += this.Ngn),
          this.L0n()),
        _ = this.A0n();
      MathUtils_1.MathUtils.LookRotationUpFirst(o, _, n.HitRotator),
        r
          ? (n.Location?.DeepCopy(r.P0n()),
            n.Rotator?.DeepCopy(r.eRn()),
            n.Offset?.DeepCopy(r.w0n()),
            (n.EffectConfig = r.B0n()),
            (n.EntityId = r.Entity.Id),
            i.push(n),
            e &&
              (_ = r.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (e.SporeEntityIds.push(_), e.SporeEntityLength.push(e.Length)))
          : (o.Multiply(this.Ngn, n.Location),
            n.Location.AdditionEqual(this.nXt.ActorLocationProxy),
            n.Rotator.DeepCopy(Rotator_1.Rotator.ZeroRotatorProxy),
            n.Offset.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            i.push(n)),
        r && r.O0n(t, i, s, h, e);
    }
    F0n(o, t, n, r, _ = void 0, a = FAN_DEFAULT_SPLINE_LENGTH) {
      (this.Ogn = 0),
        this.T0n().Quaternion().RotateVector(this.YCn, this.tgn),
        this.tgn.AdditionEqual(this.nXt.ActorLocationProxy);
      this.L0n().Multiply(n, this.ign),
        this.ign.AdditionEqual(this.tgn),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.tgn),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.ign);
      n = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        t,
        PROFILE_BULLECT_TRACK,
      );
      if (n) {
        let i = void 0,
          s = !1,
          h = !1,
          e = void 0;
        var f,
          v,
          c,
          l,
          m = new Set(),
          E = t.HitResult,
          d = E.GetHitCount(),
          S = E.Actors;
        for (let t = 0; t < d; t++) {
          var p = S.Get(t);
          if (p !== this.zBn) {
            p =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
                p,
              );
            if (p?.Id !== this.Entity.Id)
              if (p && o.has(p?.Id)) {
                if (p) {
                  var C = p.Entity.GetComponent(135);
                  if (!C || !C.R0n()) {
                    if ((s && (h = !0), C)) {
                      var I = C.Entity.GetComponent(182)?.ActorLocationProxy;
                      I &&
                        (this.Ogn = Vector_1.Vector.Dist(
                          I,
                          this.nXt.ActorLocationProxy,
                        )),
                        s ||
                          ((e = C),
                          o.delete(p.Id),
                          TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                            E,
                            t,
                            r.HitLocation,
                          ));
                      break;
                    }
                    s || m.add(p);
                  }
                }
              } else
                s ||
                  (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                    E,
                    t,
                    r.HitLocation,
                  ),
                  (i = r.HitLocation),
                  (s = !0));
          }
        }
        if (
          (e &&
            (n = e.Entity.GetComponent(182)?.ActorLocationProxy) &&
            (this.Ngn = Vector_1.Vector.Dist(n, this.nXt.ActorLocationProxy)),
          (r.IsBlockInMiddle = h),
          i)
        ) {
          t = Vector_1.Vector.Dist(i, this.tgn);
          if (e) t < this.Ngn && (this.Ngn = t);
          else {
            if (m.size < 1)
              return void (h ? (this.Ngn = t) : (this.Ngn = Math.min(a, t)));
            this.Ngn = t;
          }
        }
        if (0 < this.Ngn) {
          let t = 0;
          for (const L of m)
            L &&
              o.has(L.Id) &&
              (f = L.Entity.GetComponent(182)) &&
              (f = Vector_1.Vector.Dist(
                this.nXt.ActorLocationProxy,
                f.ActorLocationProxy,
              )) < this.Ngn &&
              (i && f > t && (t = f), o.delete(L.Id), _) &&
              (v = L.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (_.SporeEntityIds.push(v),
              _.SporeEntityLength.push(_.Length + f));
          i && 0 < t && (this.Ngn = t);
        } else
          for (const F of m)
            F &&
              o.has(F.Id) &&
              (o.delete(F.Id), (c = F.Entity.GetComponent(182))) &&
              ((c = Vector_1.Vector.Dist(
                c.ActorLocationProxy,
                this.nXt.ActorLocationProxy,
              )) > this.Ngn && (this.Ngn = c),
              _) &&
              (l = F.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (_.SporeEntityIds.push(l),
              _.SporeEntityLength.push(_.Length + c));
        return e;
      }
    }
    get IsRotating() {
      return 0 < this.Fgn;
    }
    get IsAnyRotating() {
      if (0 < this.Fgn) return !0;
      if (!this.dgn) return !!this.JCn && this.JCn.IsAnyRotating;
      if (this.zCn)
        for (const i of this.zCn) {
          var t = i.GetComponent(135);
          if (t && 0 < t.Fgn) return !0;
        }
      return !1;
    }
    ExecuteInteract() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneItem", 37, "[FanComponent] ExecuteInteract", [
          "EntityId",
          this.Entity.Id,
        ]),
        0 < this.Fgn
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              37,
              "[FanComponent.ExecuteInteract] Self Is Rotating",
            )
          : this.dgn
            ? (this.Agn || this.Vgn || this.G0n(!0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  37,
                  "[FanComponent.ExecuteInteract] Self Is Root",
                ))
            : !this.JCn || this.JCn.V0n
              ? Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  37,
                  "[FanComponent.ExecuteInteract] Root Is Rotating",
                )
              : ((this.WCn = this.WCn % this.FCn),
                (this.fle = (this.WCn + this.VCn) * this.jCn),
                this.WCn++,
                (this.kgn = (this.WCn + this.VCn) * this.jCn),
                (this.Fgn = this.$Cn),
                (this.hwe.Yaw = this.kgn),
                this.JCn?.H0n(this.Entity.Id, this.fle, this.kgn, this.egn),
                this.Xte?.AddTag(-687845e3),
                this.j0n(),
                this.W0n(
                  this.nXt.CreatureData.GetCreatureDataId(),
                  this.WCn,
                  (t) => {
                    0 !== t?.X5n &&
                      Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Level",
                        37,
                        "SendFanNumberOfTurnsRequest Failed",
                        ["ErrorCode", t?.X5n],
                      );
                  },
                ));
    }
    tRn(s) {
      if (this.U9r) {
        let i = -1;
        for (let t = 0; t < this.U9r.length; t++)
          if (this.U9r[t].EntityId === s) {
            i = t;
            break;
          }
        if (!(i < 0 || i >= this.Zgn)) {
          this.I0n = !1;
          var h = this.Bgn.length;
          for (let t = i + 1; t < this.U9r.length; t++) {
            var e = EntitySystem_1.EntitySystem.GetComponent(
              this.U9r[t].EntityId,
              135,
            );
            e && e.M0n(0),
              this.Yyn(t, !0, 2),
              t < h && this.Bgn[t].ClearSplinePoints();
          }
        }
      }
    }
    H0n(s, h, e, o) {
      if (this.dgn && !this.i0n && this.Mgn) {
        this.tRn(s);
        let i = -1;
        for (let t = 0; t < this.U9r.length; t++)
          if (this.U9r[t].EntityId === s) {
            i = t;
            break;
          }
        if (!(i < 0 || ((this.Zgn = i + 1), this.Zgn > this.U9r.length - 1))) {
          (this.a0n = 0), (this.s0n = this.$Cn);
          let t = void 0;
          var n, r;
          (t =
            0 === this.Zgn
              ? (this.g0n.DeepCopy(this.nXt.ActorLocationProxy),
                this.f0n.DeepCopy(this.YCn),
                this.QCn)
              : ((n = this.U9r[this.Zgn - 1]),
                this.g0n.DeepCopy(n.Location),
                this.f0n.DeepCopy(n.Offset),
                n.EffectConfig)),
            (this.l0n = t ? t.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH),
            0 === this.l0n
              ? (n = this.Bgn[this.Zgn])
                ? n.ClearSplinePoints()
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Level",
                    37,
                    "[SceneItemFanComponent] MultiSplineComponents is undefined",
                  )
              : (this.ZYo.DeepCopy(this.U9r[this.Zgn].Location),
                (n = Vector_1.Vector.ForwardVectorProxy),
                (r = this.hwe.Yaw),
                (this.hwe.Yaw = e),
                MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome),
                this.Ome.Quaternion().RotateVector(n, this.cz),
                (this.i0n = !0),
                (this.I0n = !0),
                this.u0n.DeepCopy(this.cz),
                this.u0n.Normalize(),
                (this.hwe.Yaw = h),
                MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome),
                this.Ome.Quaternion().RotateVector(n, this.cz),
                this.ZYo.Subtraction(this.g0n, this._0n),
                (this.h0n = this._0n.Size()),
                this._0n.DeepCopy(this.cz),
                this._0n.Normalize(),
                this._0n.CrossProduct(this.u0n, this.c0n),
                this.c0n.Normalize(),
                MathUtils_1.MathUtils.LookRotationUpFirst(
                  this._0n,
                  this.c0n,
                  this.m0n,
                ),
                MathUtils_1.MathUtils.LookRotationUpFirst(
                  this.u0n,
                  this.c0n,
                  this.d0n,
                ),
                (this.hwe.Yaw = r),
                this.RefreshSpline(
                  t?.EffectPath,
                  t?.HitEffectPath,
                  this.Zgn,
                  !0,
                ));
        }
      }
    }
    get V0n() {
      return this.i0n;
    }
    ygn() {
      this.Xte?.AddTag(217251158);
    }
    OnTick(t) {
      Info_1.Info.EnableForceTick && this.cjr(t);
    }
    j0n() {
      this.QCn
        ? this.M0n(this.QCn?.DefaultEffectLength)
        : this.M0n(FAN_DEFAULT_SPLINE_LENGTH);
    }
    jgn() {
      this.dgn ||
        (this.JCn?.T5s(this.Entity.Id) && this.JCn?.Kgn(),
        this.Xte?.RemoveTag(-687845e3));
    }
    K0n(t) {
      0 < t
        ? ((t = this.U9r[t - 1]),
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
            t.EntityId,
          )?.Entity?.GetComponent(135)) && t.M0n())
        : this.M0n();
    }
    T0n() {
      return this._gn
        ? (this.Xgn || (this.Xgn = Rotator_1.Rotator.Create()),
          this.Xgn.DeepCopy(this._gn.K2_GetActorRotation()),
          this.Xgn)
        : this.nXt.ActorRotationProxy;
    }
    L0n() {
      return this._gn
        ? (this.$gn || (this.$gn = Vector_1.Vector.Create()),
          this.$gn.DeepCopy(this._gn.GetActorForwardVector()),
          this.$gn)
        : this.nXt.ActorForwardProxy;
    }
    A0n() {
      return this._gn
        ? (this.Ygn || (this.Ygn = Vector_1.Vector.Create()),
          this.Ygn.DeepCopy(this._gn.GetActorUpVector()),
          this.Ygn)
        : this.nXt.ActorUpProxy;
    }
    Hgn(t, i) {
      this._gn
        ? this._gn.K2_SetActorRotation(t.ToUeRotator(), !1)
        : this.nXt.SetActorRotation(t.ToUeRotator(), i);
    }
    $tn() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Level",
          37,
          "[SceneItemFanComponent]CreateInteractOption",
          ["EntityId", this.Entity.Id],
        );
      var t,
        i,
        s,
        h = this.Entity.GetComponent(178);
      h
        ? (h = h.GetInteractController())
          ? ((t = new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
            this.lgn &&
              (((i =
                new CodeDefineLevelConditionInfo_1.LevelCodeConditionCheckGroupInfo()).ConditionGroup =
                this.lgn),
              t.Conditions.push(i)),
            ((i =
              new LevelGameplayActionsDefine_1.ActionInteractFan()).EntityId =
              this.Entity.Id),
            (t.Type = 0),
            ((s =
              new CodeDefineLevelConditionInfo_1.LevelConditionCheckFanIsNotRotatingInfo()).EntityId =
              this.Entity.Id),
            t.Conditions.push(s),
            this.dgn &&
              (((s =
                new CodeDefineLevelConditionInfo_1.LevelConditionCheckEntityTagInfo()).EntityId =
                this.Entity.Id),
              (s.IsContain = !0),
              (s.TagId = -1152559349),
              t.Conditions.push(s)),
            (this.Wtn = h.AddClientInteractOption(
              i,
              t,
              "Direct",
              this.Jgn,
              this.zgn,
              2,
            )))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Level",
              37,
              "[SceneItemFanComponent]CreateInteractOption Failed_1",
              ["EntityId", this.Entity.Id],
            )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            37,
            "[SceneItemFanComponent]CreateInteractOption Failed_0",
            ["EntityId", this.Entity.Id],
          );
    }
    U0n() {
      var t;
      this.Wtn &&
        (t = this.Entity.GetComponent(178)) &&
        (t = t.GetInteractController()) &&
        (t.RemoveClientInteractOption(this.Wtn), (this.Wtn = void 0));
    }
    set I0n(t) {
      this.e0n !== t &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Level",
            37,
            "[SceneItemFanComponent] Set IsSplineMoving",
            ["Value", t],
          ),
        (this.e0n = t),
        this.e0n ||
          ((this.i0n = !1),
          this.rgn?.NeedTick() && this.rgn?.Clear(!0),
          this.t0n && ((this.t0n = !1), this.Kgn())));
    }
    get I0n() {
      return this.e0n;
    }
    k0n() {
      if (this.dgn) {
        this.Zgn = -1;
        for (let t = 0; t < this.U9r.length; t++)
          if (this.ogn.length - 1 < t || this.U9r[t].EntityId !== this.ogn[t]) {
            this.Zgn = t;
            break;
          }
        this.y0n(!0);
      }
    }
    D0n(t, i, s) {
      this.dgn &&
        -1 < t &&
        t < this.Bgn.length &&
        (t = this.Bgn[t]) &&
        (this.Ggn.Empty(),
        this.Ggn.Add(i),
        this.Ggn.Add(s),
        t.SetSplinePoints(this.Ggn, 1));
    }
    y0n(h = !1, e = !0) {
      let o = void 0,
        n = void 0,
        r = -1;
      if (-1 < this.Zgn && this.Zgn < this.U9r.length) {
        e &&
          ((this.I0n = !0), !this.i0n) &&
          this.Zgn < this.bgn.length &&
          ((e = this.bgn[this.Zgn]),
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, !0),
          -1 < (e = this.S8s.indexOf(e))) &&
          (this.S8s.splice(e, 1), this.E8s.splice(e, 1)),
          0 < this.Zgn &&
            ((e = this.bgn[this.Zgn - 1]),
            this.S8s.includes(e) ||
              (this.S8s.push(e),
              this.E8s.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME))),
          0 === this.Zgn
            ? this.Ugn(!0, !0)
            : ((e = this.U9r[this.Zgn - 1].EntityId),
              (e = EntitySystem_1.EntitySystem.GetComponent(e, 135)) &&
                this.Zgn < this.U9r.length &&
                (this.Zgn === this.U9r.length - 1
                  ? e.Ugn(!0, this.U9r[this.Zgn].IsBlockInMiddle)
                  : e.Ugn(!0, !0)));
        let t = void 0,
          i = void 0,
          s = void 0;
        (s =
          0 === this.Zgn
            ? (this.o0n.DeepCopy(this.nXt.ActorLocationProxy),
              (t = this.T0n().Quaternion()),
              (i = this.YCn),
              this.XCn)
            : ((e = this.U9r[this.Zgn - 1]),
              this.o0n.DeepCopy(e.Location),
              (t = e.Rotator?.Quaternion()),
              (i = e.Offset),
              e.EffectConfig)),
          t?.RotateVector(i, this.cz),
          this.o0n.AdditionEqual(this.cz),
          this.r0n.Equals(Vector_1.Vector.ZeroVectorProxy) &&
            this.r0n.DeepCopy(this.o0n);
        var e = s ? s.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH,
          _ =
            (this.Egn
              ? this.Zgn < this.U9r.length &&
                ((_ = Vector_1.Vector.Dist(
                  this.r0n,
                  this.U9r[this.Zgn].HitLocation,
                )),
                (this.Zgn === this.U9r.length - 1 &&
                  e < _ &&
                  !this.U9r[this.Zgn].IsBlockInMiddle) ||
                this.U9r[this.Zgn].HitLocation.Equals(
                  Vector_1.Vector.ZeroVectorProxy,
                )
                  ? (t?.RotateVector(
                      Vector_1.Vector.ForwardVectorProxy,
                      this.ZYo,
                    ),
                    this.ZYo?.MultiplyEqual(e),
                    this.ZYo?.AdditionEqual(this.o0n))
                  : this.ZYo.DeepCopy(this.U9r[this.Zgn].HitLocation))
              : this.ZYo.DeepCopy(this.U9r[this.Zgn].Location),
            this.n0n.DeepCopy(this.ZYo),
            this.Egn || this.n0n.AdditionEqual(this.cz),
            Vector_1.Vector.Dist(this.r0n, this.n0n)),
          a = this.y8s ? FIRST_SPLINE_MOVE_SPEED : SPLINE_MOVE_SEPPD;
        (this.s0n = (_ / a) * TimeUtil_1.TimeUtil.InverseMillisecond),
          (this.a0n = h
            ? (e / SPLINE_MOVE_SEPPD) * TimeUtil_1.TimeUtil.InverseMillisecond
            : 0),
          this.RefreshSpline(s?.EffectPath, s?.HitEffectPath, this.Zgn, h),
          this.Q0n(this.Zgn),
          0 === this.Zgn
            ? ((r = 0),
              this.U9r[0].IsBlockInMiddle &&
                ((o = this.U9r[0].HitLocation), (n = this.U9r[0].HitRotator)))
            : this.qgn.length > this.Zgn &&
              (_ = EffectSystem_1.EffectSystem.GetEffectActor(
                this.qgn[this.Zgn - 1],
              )) &&
              (this.Yyn(this.Zgn - 1, !1, 3),
              _.K2_SetActorLocationAndRotation(
                this.U9r[this.Zgn - 1].HitLocation.ToUeVector(),
                this.U9r[this.Zgn - 1].HitRotator.ToUeRotator(),
                !1,
                void 0,
                !0,
              ));
      } else
        (this.I0n = !1),
          this.Zgn - 1 < this.bgn.length &&
            ((a = this.bgn[this.Zgn - 1]),
            this.S8s.includes(a) ||
              (this.S8s.push(a),
              this.E8s.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME))),
          this.Zgn === this.U9r.length &&
            1 < this.qgn.length &&
            ((e = this.U9r[this.Zgn - 1]),
            (r = this.Zgn - 1),
            e.IsBlockInMiddle) &&
            ((o = e.HitLocation), (n = e.HitRotator));
      -1 < r &&
        this.qgn.length > r &&
        (o && n
          ? this.U9r[r].Location &&
            (this.Yyn(r, !1, 4),
            EffectSystem_1.EffectSystem.GetEffectActor(
              this.qgn[r],
            )?.K2_SetActorLocationAndRotation(
              o.ToUeVector(),
              n.ToUeRotator(),
              !1,
              void 0,
              !0,
            ))
          : this.Yyn(r, !0, 5));
    }
    Wgn(t) {
      var i, s;
      this.I0n &&
        (this.i0n
          ? ((this.a0n += t),
            (i =
              0 < this.s0n
                ? MathUtils_1.MathUtils.Clamp(this.a0n / this.s0n, 0, 1)
                : 1),
            (s = MathUtils_1.MathUtils.Lerp(this.h0n, this.l0n, i)),
            Quat_1.Quat.Slerp(this.m0n, this.d0n, i, this.C0n),
            this.C0n.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.p0n),
            this.C0n.RotateVector(this.f0n, this.cz),
            this.cz.AdditionEqual(this.g0n),
            this.p0n.MultiplyEqual(s),
            this.p0n.AdditionEqual(this.cz),
            (i = this.Bgn[this.Zgn]) &&
              (this.Ggn.Empty(),
              this.Ggn.Add(this.cz.ToUeVector()),
              this.Ggn.Add(this.p0n.ToUeVector()),
              i.SetSplinePoints(this.Ggn, 1)),
            this.a0n > this.s0n &&
              (this.K0n(this.Zgn), (this.I0n = !1), (this.i0n = !1)))
          : ((this.a0n += t),
            Vector_1.Vector.Lerp(
              this.r0n,
              this.n0n,
              0 < this.s0n
                ? MathUtils_1.MathUtils.Clamp(this.a0n / this.s0n, 0, 1)
                : 1,
              this.ZYo,
            ),
            (s = this.Bgn[this.Zgn]) &&
              (this.Ggn.Empty(),
              this.Ggn.Add(this.o0n.ToUeVector()),
              this.Ggn.Add(this.ZYo.ToUeVector()),
              s.SetSplinePoints(this.Ggn, 1)),
            this.a0n > this.s0n &&
              (this.r0n.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
              this.Zgn++,
              this.y0n(),
              this.K0n(this.Zgn - 1))));
    }
    X0n(t, i) {
      var s,
        h = ActorSystem_1.ActorSystem.Get(
          UE.BP_BasePathLine_C.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        ),
        e =
          (h.K2_SetActorLocationAndRotation(
            this.nXt?.ActorLocation,
            this.T0n().ToUeRotator(),
            !1,
            void 0,
            !0,
          ),
          h.GetComponentByClass(UE.SplineComponent.StaticClass()));
      t
        ? ((t = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            MathUtils_1.MathUtils.DefaultTransform,
            t,
            "[SceneItemFanComponent.DefaultFanEffect]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          )),
          EffectSystem_1.EffectSystem.IsValid(t) &&
            ((s =
              EffectSystem_1.EffectSystem.GetEffectActor(
                t,
              ))?.K2_SetActorLocation(h.K2_GetActorLocation(), !1, void 0, !0),
            s?.K2_AttachToActor(h, void 0, 1, 1, 1, !1),
            this.wgn?.push(h),
            this.Bgn?.push(e),
            this.bgn?.push(t),
            i
              ? (s = EffectSystem_1.EffectSystem.SpawnEffect(
                  GlobalData_1.GlobalData.World,
                  MathUtils_1.MathUtils.DefaultTransform,
                  i,
                  "[SceneItemFanComponent.DefaultFanEffect]",
                  new EffectContext_1.EffectContext(this.Entity.Id),
                )) &&
                ((t =
                  EffectSystem_1.EffectSystem.GetEffectActor(
                    s,
                  ))?.K2_SetActorLocation(
                  h.K2_GetActorLocation(),
                  !1,
                  void 0,
                  !0,
                ),
                t?.K2_AttachToActor(h, void 0, 1, 1, 1, !1),
                t?.SetActorHiddenInGame(!0),
                this.qgn?.push(s))
              : this.qgn?.push(-1)))
        : (this.wgn?.push(h),
          this.Bgn?.push(e),
          this.bgn?.push(-1),
          this.qgn?.push(-1));
    }
    Q0n(t) {
      0 < t &&
        t < this.wgn.length &&
        this.wgn[t].K2_SetActorLocation(
          this.U9r[t - 1].Location.ToUeVector(),
          !1,
          void 0,
          !1,
        );
    }
    RefreshSpline(i, s, h, t = !1) {
      var e = h + 1;
      if (t) {
        if (e < this.wgn.length)
          for (let t = e; t < this.wgn.length; t++)
            this.Ggn.Empty(),
              this.Bgn[t].SetSplinePoints(this.Ggn, 1),
              EffectSystem_1.EffectSystem.GetEffectActor(
                this.bgn[t],
              )?.SetActorHiddenInGame(!0);
        else {
          e <= this.wgn.length &&
            (-1 === this.bgn[h] && this.v0n(i, h, this.bgn),
            -1 === this.qgn[h]) &&
            this.v0n(s, h, this.qgn);
          for (let t = this.wgn.length; t < e; t++) this.X0n(i, s);
        }
        for (let t = h; t < this.qgn.length; t++) this.Yyn(t, !0, 6);
      } else
        this.wgn.length < e
          ? this.X0n(i, s)
          : ((t = this.bgn[h]),
            i !== EffectSystem_1.EffectSystem.GetPath(t)
              ? this.v0n(i, h, this.bgn)
              : EffectSystem_1.EffectSystem.ReplayEffect(
                  this.bgn[h],
                  "[SceneItemFanComponent.ReplayEffect1]",
                ),
            (t = this.qgn[h]),
            s !== EffectSystem_1.EffectSystem.GetPath(t)
              ? this.v0n(s, h, this.qgn)
              : EffectSystem_1.EffectSystem.ReplayEffect(
                  this.qgn[h],
                  "[SceneItemFanComponent.ReplayEffect1]",
                ),
            this.Yyn(h, !0, 7));
    }
    Yyn(t, i, s) {
      t >= this.qgn.length
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Level",
            37,
            "[SceneItemFanComponent] HideOrShowHitEffect invalid",
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Level",
              37,
              "[SceneItemFanComponent] HideOrShowHitEffect",
              ["index", t],
              ["hide", i],
              ["logIndex", s],
            ),
          EffectSystem_1.EffectSystem.GetEffectActor(
            this.qgn[t],
          )?.SetActorHiddenInGame(i));
    }
    v0n(i, s, h) {
      if (this.wgn && !(this.wgn.length <= s)) {
        var e,
          o = this.wgn[s],
          n = h[s];
        let t = !1;
        0 !== n &&
          ((e = EffectSystem_1.EffectSystem.GetEffectActor(n)) &&
            ((t = !0), this.cz.DeepCopy(e.K2_GetActorLocation())),
          EffectSystem_1.EffectSystem.StopEffectById(
            n,
            "[SceneItemFanComponent.ReplaceEffect]",
            !0,
          )),
          i
            ? ((e = EffectSystem_1.EffectSystem.SpawnEffect(
                GlobalData_1.GlobalData.World,
                MathUtils_1.MathUtils.DefaultTransform,
                i,
                "[SceneItemFanComponent.DefaultFanEffect]",
                new EffectContext_1.EffectContext(this.Entity.Id),
              )),
              EffectSystem_1.EffectSystem.IsValid(e) &&
                ((n =
                  EffectSystem_1.EffectSystem.GetEffectActor(
                    e,
                  ))?.K2_SetActorLocation(
                  t ? this.cz.ToUeVector() : o.K2_GetActorLocation(),
                  !1,
                  void 0,
                  !0,
                ),
                n?.K2_AttachToActor(o, void 0, 1, 1, 1, !1),
                (h[s] = e)))
            : (h[s] = 0);
      }
    }
    W0n(t, i, s) {
      var h = Protocol_1.Aki.Protocol.IJn.create();
      (h.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
        (h.v7n = i),
        Net_1.Net.Call(29125, h, s);
    }
    Tgn(t, i, s, h) {
      var e = Protocol_1.Aki.Protocol.LJn.create();
      (e.M7n = MathUtils_1.MathUtils.NumberToLong(t)),
        (e.S7n = MathUtils_1.MathUtils.NumberToLong(i)),
        (e.rVn = s ? 1 : 0),
        Net_1.Net.Call(2520, e, h);
    }
    N0n(t, i, s) {
      var h = Protocol_1.Aki.Protocol.DJn.create();
      (h.M7n = MathUtils_1.MathUtils.NumberToLong(t)),
        (h.rVn = i ? 1 : 0),
        Net_1.Net.Call(23892, h, s);
    }
  });
(SceneItemFanComponent.q0n = new Array()),
  (SceneItemFanComponent = SceneItemFanComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(135)],
      SceneItemFanComponent,
    )),
  (exports.SceneItemFanComponent = SceneItemFanComponent);
//# sourceMappingURL=SceneItemFanComponent.js.map
