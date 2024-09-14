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
  OFFSET_ACTOR_KEY = "OffsetActor",
  FAN_LOGIC_RANGE = 24e3;
class SporeStruct {
  constructor() {
    (this.Length = 0),
      (this.SporeEntityIds = new Array()),
      (this.SporeEntityLength = new Array()),
      (this.gwe = 0),
      (this.RootCreatureDataId = 0),
      (this.Wsr = void 0);
  }
  Init(t) {
    this.Wsr = t;
  }
  Clear(t = !1) {
    if (t)
      for (let t = this.SporeEntityIds.length - 1; -1 < t; t--) {
        var i = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          this.SporeEntityIds[t],
        );
        i && this.Wsr && this.Wsr(i.Entity, !0, !1);
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
        this.Wsr &&
        this.Wsr(s.Entity, !0, !1);
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
        (this.MCn = 0),
        (this.ECn = 0),
        (this._se = 0),
        (this.SCn = void 0),
        (this.yCn = 0),
        (this.ICn = 0),
        (this.TCn = new Map()),
        (this.LCn = void 0),
        (this.DCn = void 0),
        (this.Pnr = FAN_DEFAULT_ROTATE_SPEED),
        (this.RCn = 0),
        (this.UCn = Vector_1.Vector.Create(0, 0, 0)),
        (this.ACn = void 0),
        (this.PCn = void 0),
        (this.xCn = void 0),
        (this.n$t = void 0),
        (this.wCn = void 0),
        (this.hwe = void 0),
        (this.Ome = void 0),
        (this.BCn = void 0),
        (this.bCn = void 0),
        (this.gTa = void 0),
        (this.cz = void 0),
        (this.mWi = void 0),
        (this._9r = void 0),
        (this.qCn = void 0),
        (this.GCn = void 0),
        (this.NCn = void 0),
        (this.OCn = 0),
        (this.Xte = void 0),
        (this.kCn = void 0),
        (this.jnn = void 0),
        (this.FCn = !1),
        (this.VCn = void 0),
        (this.HCn = void 0),
        (this.SceneInteractionLoadCompleted = !1),
        (this.Rnn = () => {
          var t,
            i = !this.SceneInteractionLoadCompleted,
            s =
              ((this.SceneInteractionLoadCompleted = !0),
              this.n$t?.GetInteractionMainActor()),
            s =
              ((this.HCn = s?.ReferenceActors?.Get(ROTATE_ACTOR_KEY)),
              this.jCn(),
              s?.ReferenceActors?.Get(OFFSET_ACTOR_KEY));
          s
            ? ((this.UCn = Vector_1.Vector.Create(s.K2_GetActorLocation())),
              this.UCn.SubtractionEqual(this.n$t.ActorLocationProxy),
              (t = Quat_1.Quat.Create()),
              this.n$t.ActorRotationProxy.Quaternion().Inverse(t),
              t.RotateVector(this.UCn, this.UCn))
            : this.UCn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            this.WCn(s),
            this.KCn(),
            i && !this.QCn && this.FCn && this.Rtn();
        }),
        (this.XCn = (i, s) => {
          if (!this.IsAnyRotating) {
            let t = void 0;
            (t = this.QCn ? this : this.ACn) &&
              (i || (this.RGn = s), t.$Cn(i, this), (this.RGn = void 0));
          }
        }),
        (this.YCn = void 0),
        (this.JCn = void 0),
        (this.RGn = void 0),
        (this.zCn = void 0),
        (this.ZCn = !1),
        (this.egn = (i, s, t) => {
          const h = i.GetComponent(138);
          if (s && !this.tgn && h) h.ign();
          else {
            if (h)
              if (s) {
                if (!h.ogn()) return;
              } else if (!h.dce()) return;
            if (this.NCn)
              if (this.NCn.has(i.Id)) {
                if (s) {
                  if (this.NCn.get(i.Id)) return;
                } else if (!this.NCn.get(i.Id)) return;
              } else this.NCn.set(i.Id, s);
            var e;
            t
              ? (t = i.GetComponent(181)) &&
                (s
                  ? (t.RemoveServerTagByIdLocal(-1152559349, ""),
                    t.HasTag(-3775711) || t.AddServerTagByIdLocal(-3775711, ""))
                  : (t.RemoveServerTagByIdLocal(-3775711, ""),
                    t.HasTag(-1152559349) ||
                      t.AddServerTagByIdLocal(-1152559349, "")),
                this.NCn.set(i.Id, s))
              : ((t = this.n$t.CreatureData.GetCreatureDataId()),
                (e = i.GetComponent(0)?.GetCreatureDataId()) &&
                  this.rgn(t, e, s, (t) => {
                    0 !== t?.G9n
                      ? Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "Level",
                          37,
                          "SendBaoziStateRequest Failed",
                          ["ErrorCode", t?.G9n],
                        )
                      : (this.NCn.set(i.Id, s), !s && h && h.lgn(!1, !1));
                  }));
          }
        }),
        (this.ngn = 0),
        (this.oFe = (t, i) => {
          if (
            (-511894810 === t &&
              (this.ACn?.sgn(this.Entity.Id, i), i) &&
              this.agn(),
            -3775711 === t && i)
          ) {
            if (
              this.QCn &&
              (this.hgn ||
                ((this.hgn = !0),
                this.tgn ? this.Tgn(void 0, !0) : (this.ngn = 5e3),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Level",
                    37,
                    "[SceneItemFanComponent] Root Active",
                    ["EntityId", this.Entity.Id],
                  )),
              this.PCn)
            )
              for (const s of this.PCn) s?.GetComponent(138)?.lgn(!1, !1);
            this.lgn(!0);
          } else -1152559349 === t && i && this.lgn(!1, !1);
          if (this.QCn && (-1152559349 === t || 1298716444 === t) && i) {
            if (this.PCn) for (const h of this.PCn) h?.GetComponent(138)?.agn();
            1298716444 === t && this.sAn();
          }
          if (i)
            for (const e of this.TCn)
              if (e[0] === t) return (this.LCn = e[1]), void this._gn();
          for (const o of this.TCn) if (this.Xte?.HasTag(o[0])) return;
          this.LCn !== this.SCn && ((this.LCn = this.SCn), this._gn());
        }),
        (this.ugn = 0),
        (this.rvi = 0),
        (this.Hnr = void 0),
        (this.cgn = void 0),
        (this.mgn = void 0),
        (this.dgn = void 0),
        (this.XYs = void 0),
        (this.YYs = void 0),
        (this.Cgn = void 0),
        (this.ggn = void 0),
        (this.tgn = !1),
        (this.JYs = !1),
        (this.fgn = 0),
        (this.pgn = 0),
        (this.fle = 0),
        (this.vgn = 0),
        (this.Mgn = 0),
        (this.hgn = !1),
        (this.Egn = !1),
        (this.$dn = (t) => {
          this.ExecuteInteract();
        }),
        (this.Jsn = () => {
          this.QCn ||
            this.ACn ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "SceneItem",
                37,
                "[FanComponent] OnEnterLogicRange RootComponent Is Undefined",
                ["EntityId", this.Entity.Id],
              ),
            this.gva());
        }),
        (this.KHr = (i) => {
          var t, s;
          if (
            (0 < this.Mgn &&
              ((this.Mgn -= i),
              (t = MathUtils_1.MathUtils.Lerp(
                this.fle,
                this.vgn,
                1 - MathUtils_1.MathUtils.Clamp(this.Mgn / this.RCn, 0, 1),
              )),
              (this.hwe.Yaw = t),
              MathUtils_1.MathUtils.ComposeRotator(
                this.hwe,
                this.wCn,
                this.Ome,
              ),
              this.Sgn(this.Ome, "SceneItemFanComponent Rotate"),
              this.Mgn <= 0) &&
              this.ygn(),
            this.QCn)
          ) {
            if (
              (this.Ign(i),
              this.GCn?.NeedTick() && this.GCn.Tick(i, this.JYs),
              0 < this.ngn)
            ) {
              this.ngn -= i;
              let t = !0;
              for (const r of this.PCn) {
                var h = r.GetComponent(138);
                if (h && !this.tgn && !h.dce()) {
                  t = !1;
                  break;
                }
              }
              t
                ? ((this.ngn = 0),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      37,
                      "[SceneItemFanComponent] All Child Active",
                      ["EntityId", this.Entity.Id],
                    ),
                  this.Tgn())
                : this.ngn <= 0 &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Level",
                      37,
                      "[SceneItemFanComponent] Wait Child Active Timeout",
                      ["EntityId", this.Entity.Id],
                    ),
                  this.Tgn());
            }
            if (this.zCn) {
              for (let t = this.zCn.length - 1; -1 < t; t--) {
                var e,
                  o = this.zCn[t],
                  n =
                    ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                      o,
                    );
                n?.Valid &&
                  n.Entity &&
                  ((e = n.Entity.GetComponent(138))
                    ? e.Valid &&
                      e.SceneInteractionLoadCompleted &&
                      (e.SetRoot(this),
                      this.PCn.includes(n.Entity) || this.PCn.push(n.Entity),
                      this.zCn.splice(t, 1),
                      Log_1.Log.CheckInfo()) &&
                      Log_1.Log.Info(
                        "Level",
                        37,
                        "[Fan.WaitChild]Remove WaitChildId",
                        ["ChildId", o],
                      )
                    : (this.zCn.splice(t, 1),
                      this.PCn.includes(n.Entity) || this.PCn.push(n.Entity)));
              }
              0 === this.zCn.length &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Level",
                    37,
                    "[Fan.WaitChild]Clear WaitChildIds",
                    ["EntityId", this.Entity.Id],
                  ),
                (this.zCn = void 0),
                this.Lgn());
            }
            if (this.XYs && this.YYs)
              for (let t = this.YYs.length - 1; -1 < t; t--)
                this.YYs[t] <= i
                  ? ((s = this.XYs[t]),
                    this.XYs.splice(t, 1),
                    this.YYs.splice(t, 1),
                    EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
                      s,
                      !1,
                    ))
                  : (this.YYs[t] -= i);
          }
        }),
        (this.Dgn = void 0),
        (this.Rgn = void 0),
        (this.Ugn = void 0),
        (this.Itn = void 0),
        (this.Agn = 300),
        (this.Pgn = void 0),
        (this.xgn = -1),
        (this.wgn = !1),
        (this.Bgn = !1),
        (this.bgn = !1),
        (this.YJo = void 0),
        (this.qgn = void 0),
        (this.Ggn = void 0),
        (this.Ngn = void 0),
        (this.Ogn = 0),
        (this.kgn = 0),
        (this.Fgn = 0),
        (this.Vgn = 0),
        (this.Hgn = void 0),
        (this.jgn = void 0),
        (this.Wgn = void 0),
        (this.Kgn = void 0),
        (this.Qgn = void 0),
        (this.Xgn = void 0),
        (this.$gn = void 0),
        (this.Ygn = void 0),
        (this.Jgn = void 0);
    }
    get QCn() {
      return void 0 === this.ACn && void 0 !== this.PCn;
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemFanComponent_1)[0];
      if (
        ((this.MCn = t.CirclePerRound),
        (this.ECn = t.InitCircle),
        t.TargetEntityId && (this._se = t.TargetEntityId),
        (this.tgn = t.GearType === IComponent_1.EFanGearType.LightDeliver),
        t.InteractType?.Type === IComponent_1.EFanInteractType.FKey &&
          ((this.FCn = !0), (this.Pgn = t.InteractType?.TidInteractOptionText)),
        (this.VCn = t.Condition),
        t.EffectConfig && ((this.SCn = t.EffectConfig), (this.LCn = this.SCn)),
        t.EffectByState)
      )
        for (const s of t.EffectByState) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            s.EntityState,
          );
          i && this.TCn.set(i, s.EffectConfig);
        }
      else this.DCn = this.LCn;
      return (
        (this.yCn = 360 / this.MCn),
        (this.RCn =
          (this.yCn / this.Pnr) * TimeUtil_1.TimeUtil.InverseMillisecond),
        !0
      );
    }
    OnStart() {
      if (
        (this.Entity.GetComponent(141).RegisterComponent(this),
        this.FCn ||
          EventSystem_1.EventSystem.AddWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHitByHitData,
            this.$dn,
          ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        this.Entity.GetComponent(109)?.SetLogicRange(FAN_LOGIC_RANGE),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.Jsn,
        ),
        (this.n$t = this.Entity.GetComponent(187)),
        !this.n$t)
      )
        return !1;
      if (
        ((this.Xte = this.Entity.GetComponent(181)),
        (this.kCn = this.Entity.GetComponent(148)),
        (this.jnn = this.Entity.GetComponent(77)),
        0 < this.TCn.size)
      ) {
        for (const i of this.TCn)
          if (this.Xte?.HasTag(i[0])) {
            this.LCn = i[1];
            break;
          }
        this.TCn.has(-3775711) && (this.DCn = this.TCn.get(-3775711));
      }
      this.Xte?.AddTagAddOrRemoveListener(-511894810, this.oFe),
        this.Xte?.AddTagAddOrRemoveListener(-3775711, this.oFe),
        this.Xte?.AddTagAddOrRemoveListener(-1152559349, this.oFe),
        this.Xte?.AddTagAddOrRemoveListener(1298716444, this.oFe),
        (this.hwe = Rotator_1.Rotator.Create()),
        (this.Ome = Rotator_1.Rotator.Create()),
        (this.BCn = Vector_1.Vector.Create()),
        (this.bCn = Vector_1.Vector.Create()),
        (this.qgn = Vector_1.Vector.Create()),
        (this.Ggn = Vector_1.Vector.Create()),
        (this.Ngn = Vector_1.Vector.Create()),
        (this.cz = Vector_1.Vector.Create()),
        (this.YJo = Vector_1.Vector.Create());
      var t = this.n$t.CreatureData?.ComponentDataMap.get("qys")?.qys;
      return (
        t && (this.ICn = t.WIs),
        !Info_1.Info.EnableForceTick &&
          this.Active &&
          ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
            this,
            this.KHr,
          ),
        !0
      );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    _gn() {
      this.QCn && this.ZCn
        ? (this.zgn(this.LCn?.EffectPath, 0, this.dgn),
          this.zgn(this.LCn?.HitEffectPath, 0, this.Cgn))
        : this.ACn?.OnChildCurrentFanEffectChange(this.Entity.Id, this.LCn);
    }
    OnChildCurrentFanEffectChange(s, h) {
      if (this.QCn && this.ZCn) {
        let i = -1;
        for (let t = 0; t < this._9r.length; t++)
          if (this._9r[t].EntityId === s) {
            (i = t), (this._9r[t].EffectConfig = h);
            break;
          }
        -1 < i &&
          ((i += 1),
          this.zgn(h?.EffectPath, i, this.dgn),
          this.zgn(h?.HitEffectPath, i, this.Cgn),
          i !== this._9r.length - 1 ||
            this._9r[i].IsBlockInMiddle ||
            this.fTn(i, !0, 0));
      }
    }
    WCn(t) {
      this.jnn &&
        (t && this.jnn.SetRangeActorParent(t),
        this.jnn.AddOnActorOverlapCallback(this.XCn));
    }
    Zgn(t = -1) {
      var i;
      this.YCn ||
        (this.YCn = new UE.Vector(
          0.1,
          FAN_SPHERE_TRACE_RADIUS,
          FAN_SPHERE_TRACE_RADIUS,
        )),
        this.JCn || (this.JCn = new UE.Vector(0, 0, 0)),
        t < 0
          ? ((i = this.LCn
              ? this.LCn.DefaultEffectLength
              : FAN_DEFAULT_SPLINE_LENGTH),
            (this.YCn.X = 0 < this.pgn ? this.pgn / 2 : i / 2))
          : (this.YCn.X = t),
        (this.JCn.X = this.YCn.X),
        this.jnn?.UpdateBoxRange(this.JCn, this.YCn);
    }
    $Cn(t, h = void 0) {
      if (
        h &&
        this.hgn &&
        this.ZCn &&
        this._9r &&
        !(this._9r.length < 1) &&
        this.mWi &&
        this.n$t
      ) {
        var e = h.Entity?.Id;
        let i = void 0,
          s = -1;
        if (h.QCn) (i = this._9r[0]), (s = 0);
        else
          for (let t = 0; t < this._9r.length - 1; t++) {
            var o = this._9r[t];
            if (0 === o.EntityId) break;
            o.EntityId === e && ((i = this._9r[t + 1]), (s = t + 1));
          }
        if (i) {
          t || (this.mWi.Radius = 0.7 * FAN_SPHERE_TRACE_RADIUS);
          var n = h.e0n(this.mWi, this.OCn, i, this.gTa);
          if (-1 < n) {
            if (
              (this.o0n &&
                this.xgn === s &&
                ((this.wgn = !1), (this.Bgn = !1), this.T0n(this.xgn)),
              ModelManager_1.ModelManager.CharacterModel?.IsValid(i.EntityId))
            ) {
              this.GCn?.SpliceToEntity(i.EntityId);
              for (let t = this._9r.length - 1; t >= s; t--) {
                var r = this._9r[t],
                  _ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
                    r.EntityId,
                  );
                _ && _.Entity && this.egn(_.Entity, !1, !1),
                  t > s &&
                    (this._9r.splice(t, 1), SceneItemFanComponent_1.t0n(r));
              }
              (i.IsBlockInMiddle = !0),
                (i.EntityId = 0),
                (this.xgn = s),
                this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
                this.i0n(!0, !1);
            }
            var a = this._9r[s],
              a =
                (a.HitLocation?.DeepCopy(this.gTa),
                a.Location?.DeepCopy(this.gTa),
                h.r0n().Quaternion().RotateVector(h.UCn, this.BCn),
                this.BCn.AdditionEqual(h.n$t.ActorLocationProxy),
                this.s0n(s, this.BCn.ToUeVector(), this.gTa.ToUeVector()),
                Math.min(
                  this._9r.length - 1,
                  Math.min(this.Cgn.length - 1, this.xgn),
                ));
            -1 < a &&
              (h = EffectSystem_1.EffectSystem.GetEffectActor(this.Cgn[a])) &&
              (this.fTn(a, !1, 1),
              h.K2_SetActorLocationAndRotation(
                this.gTa.ToUeVector(),
                this._9r[a].HitRotator.ToUeRotator(),
                !1,
                void 0,
                !0,
              ));
          } else -3 === n && this.Tgn(e);
          t || (this.mWi.Radius = FAN_SPHERE_TRACE_RADIUS);
        }
      }
    }
    e0n(t, h, e, o) {
      this.r0n().Quaternion().RotateVector(this.UCn, this.BCn),
        this.BCn.AdditionEqual(this.n$t.ActorLocationProxy);
      this.n0n().Multiply(h, this.bCn),
        this.bCn.AdditionEqual(this.BCn),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.BCn),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.bCn);
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
          if (a !== this.RGn) {
            a =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
                a,
              );
            if (a?.Id !== this.Entity.Id) {
              var f = a?.Entity?.GetComponent(138);
              if (f) {
                if (s) {
                  i = !0;
                  break;
                }
                if (f.a0n()) continue;
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
            (h = Vector_1.Vector.Dist(o, this.BCn)),
            void 0 !== this.DCn?.DefaultEffectLength &&
            !i &&
            this.DCn?.DefaultEffectLength < h
              ? -2
              : h
          );
      }
      return -2;
    }
    jCn() {
      if (!this.wCn) {
        if (((this.wCn = Rotator_1.Rotator.Create()), 0 !== this._se)) {
          var t =
            ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
              this._se,
            );
          if (t) {
            t = t.Entity.GetComponent(187);
            if (t)
              return (
                t.ActorLocationProxy.Subtraction(
                  this.n$t.ActorLocationProxy,
                  this.cz,
                ),
                void MathUtils_1.MathUtils.LookRotationUpFirst(
                  this.cz,
                  this.h0n(),
                  this.wCn,
                )
              );
          }
        }
        this.wCn.DeepCopy(this.r0n());
      }
      (this.ICn = this.ICn % this.MCn),
        (this.fle = (this.ICn + this.ECn) * this.yCn),
        (this.hwe.Yaw = this.fle),
        Info_1.Info.IsBuildShipping ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Level",
              37,
              "[FanComponent]InitRotation",
              ["PbDataId", this.Entity.GetComponent(0)?.GetPbDataId()],
              ["StartRotator", this.fle],
              ["InitRotator", this.wCn.Yaw],
            )),
        MathUtils_1.MathUtils.ComposeRotator(this.hwe, this.wCn, this.Ome),
        this.Sgn(this.Ome, "SceneItemFanComponent Rotate");
    }
    OnEnd() {
      if (
        (Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        this.FCn
          ? this.l0n()
          : EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHitByHitData,
              this.$dn,
            ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.Jsn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        this.Xte?.RemoveTagAddOrRemoveListener(-511894810, this.oFe),
        this.Xte?.RemoveTagAddOrRemoveListener(-3775711, this.oFe),
        this.Xte?.RemoveTagAddOrRemoveListener(-1152559349, this.oFe),
        this.Xte?.RemoveTagAddOrRemoveListener(1298716444, this.oFe),
        (this.wCn = void 0),
        (this.hwe = void 0),
        (this.Ome = void 0),
        (this.BCn = void 0),
        (this.bCn = void 0),
        (this.qgn = void 0),
        (this.Ggn = void 0),
        (this.Ngn = void 0),
        (this.cz = void 0),
        (this.YJo = void 0),
        this.Hnr &&
          (ActorSystem_1.ActorSystem.Put(this.Hnr), (this.Hnr = void 0)),
        this.ACn && this.ACn.fva(this.Entity),
        (this.ACn = void 0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Level", 37, "[Fan.WaitChild]Clear Root", [
            "id",
            this.Entity.Id,
          ]),
        EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.rvi,
            "SceneItemFanComponent.OnEnd",
            !0,
          ),
        (this.rvi = 0),
        (this.gTa = void 0),
        (this._9r = void 0),
        (this.qCn = void 0),
        (this.Hgn = void 0),
        (this.jgn = void 0),
        (this.Wgn = void 0),
        (this.Kgn = void 0),
        (this.Qgn = void 0),
        (this.Xgn = void 0),
        (this.$gn = void 0),
        (this.Ygn = void 0),
        (this.Jgn = void 0),
        (this.GCn = void 0),
        (this.HCn = void 0),
        this.cgn)
      )
        for (const t of this.cgn) ActorSystem_1.ActorSystem.Put(t);
      if (((this.cgn = void 0), (this.mgn = void 0), this.dgn)) {
        for (const i of this.dgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "SceneItemFanComponent.OnEnd",
            !0,
          );
        this.dgn = void 0;
      }
      if (this.Cgn) {
        for (const s of this.Cgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            s,
            "SceneItemFanComponent.OnEnd",
            !0,
          );
        this.Cgn = void 0;
      }
      return (
        (this.XYs = void 0),
        (this.YYs = void 0),
        (this.n$t = void 0),
        (this.Xte = void 0),
        (this.kCn = void 0),
        this.jnn?.RemoveOnActorOverlapCallback(this.XCn),
        !(this.jnn = void 0)
      );
    }
    SetRoot(t) {
      (this.ACn = t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Level", 37, "[Fan.WaitChild]SetRoot", [
            "id",
            this.Entity.Id,
          ]),
        (this.ACn?.Xte?.HasTag(-1152559349) ||
          this.ACn?.Xte?.HasTag(1298716444)) &&
          this.agn();
    }
    KCn() {
      var t = this.Entity.GetComponent(0);
      if (t?.Valid) {
        t = t.GetBaseInfo().ChildEntityIds;
        if (t && !(t.length < 1)) {
          (this.PCn = new Array()), (this.zCn = new Array());
          for (const i of t)
            this.zCn.push(i),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Level", 37, "[Fan.WaitChild]Add WaitChildId", [
                  "ChildId",
                  i,
                ]);
        }
      }
    }
    Lgn() {
      if (this.QCn) {
        this.FCn && this.Rtn(),
          (this.ZCn = !0),
          (this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass())),
          (this.mWi.bIsSingle = !1),
          (this.mWi.bIgnoreSelf = !0),
          (this.mWi.Radius = FAN_SPHERE_TRACE_RADIUS),
          this.mWi.SetTraceTypeQuery(
            QueryTypeDefine_1.KuroTraceTypeQuery.Visible,
          ),
          (this.mWi.WorldContextObject = this.n$t.Owner);
        var n = this.n$t.ActorLocationProxy;
        let t = n.X,
          i = n.Y,
          s = n.Z,
          h = n.X,
          e = n.Y,
          o = n.Z;
        for (const a of this.PCn) {
          var r = a.GetComponent(187);
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
          ((this.OCn =
            Math.sqrt(
              Math.pow(h - t, 2) + Math.pow(e - i, 2) + Math.pow(o - s, 2),
            ) + FAN_MAX_TRACE_LENGTH_OFFSET),
          (this.xCn = new Set()),
          (this._9r = new Array()),
          (this.qCn = new Array()),
          (this.Hgn = Vector_1.Vector.Create()),
          (this.jgn = Vector_1.Vector.Create()),
          (this.Wgn = Vector_1.Vector.Create()),
          (this.Kgn = Quat_1.Quat.Create()),
          (this.Qgn = Quat_1.Quat.Create()),
          (this.Xgn = Quat_1.Quat.Create()),
          (this.$gn = Vector_1.Vector.Create()),
          (this.Ygn = Vector_1.Vector.Create()),
          (this.Jgn = Vector_1.Vector.Create()),
          (this.gTa = Vector_1.Vector.Create()),
          (this.GCn = new SporeStruct()),
          this.GCn.Init(this.egn),
          (this.NCn = new Map()),
          (this.cgn = new Array()),
          (this.mgn = new Array()),
          (this.dgn = new Array()),
          (this.XYs = new Array()),
          (this.YYs = new Array()),
          (this.Cgn = new Array()),
          (this.ggn = UE.NewArray(UE.Vector)),
          (this.hgn = this.Xte.HasTag(-3775711)),
          this.hgn && this.PCn)
        )
          for (const f of this.PCn) f?.GetComponent(138)?.zYs();
        TimerSystem_1.TimerSystem.Next(() => {
          this.hgn && this.Tgn(void 0, !0), this.Zgn();
        }),
          this._gn();
        for (const v of this.PCn) {
          var _ = v.GetComponent(138);
          _ && _._gn();
        }
      }
    }
    _0n() {
      return this.n$t.ActorLocationProxy;
    }
    aAn() {
      return this.r0n();
    }
    c0n() {
      return this.UCn;
    }
    m0n() {
      return this.DCn;
    }
    static d0n() {
      var t;
      return SceneItemFanComponent_1.C0n.length < 1
        ? (((t = new SplinePoint()).Location = Vector_1.Vector.Create()),
          (t.Rotator = Rotator_1.Rotator.Create()),
          (t.Offset = Vector_1.Vector.Create()),
          (t.HitLocation = Vector_1.Vector.Create()),
          (t.HitRotator = Rotator_1.Rotator.Create()),
          t)
        : SceneItemFanComponent_1.C0n.pop();
    }
    static t0n(t) {
      t.Location.Set(0, 0, 0),
        t.Rotator.Set(0, 0, 0),
        t.Offset.Set(0, 0, 0),
        (t.EntityId = 0),
        (t.EffectConfig = void 0),
        (t.IsBlockInMiddle = !1),
        t.HitLocation.Set(0, 0, 0),
        t.HitRotator.Set(0, 0, 0),
        SceneItemFanComponent_1.C0n.push(t);
    }
    g0n(t) {
      this.Egn = !0;
      var i = this.n$t.CreatureData.GetCreatureDataId();
      this.f0n(i, t, (t) => {
        (this.Egn = !1),
          0 !== t?.G9n
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Level", 37, "SetFanStateResponse Failed", [
                "ErrorCode",
                t?.G9n,
              ])
            : this.hgn ||
              ((this.hgn = !0), this.tgn ? this.Tgn() : (this.ngn = 5e3));
      });
    }
    dce() {
      return this.Xte?.HasTag(-3775711) ?? !1;
    }
    ogn() {
      return this.Xte?.HasTag(-1152559349) ?? !1;
    }
    a0n() {
      return this.Xte?.HasTag(-511894810) ?? !1;
    }
    sAn() {
      if (this.dgn) {
        for (const i of this.dgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            i,
            "SceneItemFanComponent.OnRootComplete",
            !0,
          );
        this.dgn.length = 0;
      }
      if (this.Cgn) {
        for (const s of this.Cgn)
          EffectSystem_1.EffectSystem.StopEffectById(
            s,
            "SceneItemFanComponent.OnRootComplete",
            !0,
          );
        this.Cgn.length = 0;
      }
      if (this.cgn) {
        for (const h of this.cgn) ActorSystem_1.ActorSystem.Put(h);
        this.cgn.length = 0;
      }
      this.mgn && (this.mgn.length = 0);
      for (const e of this.PCn) {
        var t = e.GetComponent(138);
        t && t.Zgn(0);
      }
    }
    sgn(s, t) {
      if (
        (t && this.NCn?.has(s) && this.NCn?.delete(s),
        this.hgn &&
          this.ZCn &&
          this._9r &&
          !(this._9r.length < 1) &&
          !this.Xte?.HasTag(1298716444))
      ) {
        let i = -1;
        for (let t = 0; t < this._9r.length - 1; t++) {
          var h = this._9r[t];
          if (0 === h.EntityId) break;
          if (h.EntityId === s) {
            i = t - 1;
            break;
          }
        }
        -1 < i ? ((t = this._9r[i].EntityId), this.Tgn(t)) : this.Tgn();
      }
    }
    agn() {
      this.Xte?.RemoveTag(1174613996),
        this.Xte?.RemoveTag(942900915),
        this.Xte?.RemoveTag(-216276934);
      var t = this.kCn?.EntityInSocket?.Entity?.GetComponent(181);
      t &&
        (t.RemoveTag(1174613996),
        t.RemoveTag(942900915),
        t.RemoveTag(-216276934)),
        0 !== this.ugn &&
          ((t = EntitySystem_1.EntitySystem.GetComponent(this.ugn, 181)) &&
            (t.RemoveTag(1174613996),
            t.RemoveTag(942900915),
            t.RemoveTag(-216276934)),
          (this.ugn = 0));
    }
    zYs() {
      this.Xte && !this.Xte.HasTag(-1018185327) && this.Xte.AddTag(1174613996);
    }
    lgn(t, i = void 0) {
      var s;
      this.a0n() ||
        (!this.ACn?.Xte?.HasTag(-1152559349) &&
          !this.ACn?.Xte?.HasTag(1298716444) &&
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
          (s = this.kCn?.EntityInSocket?.Entity?.GetComponent(181))) &&
          ((this.ugn = this.kCn.EntityInSocket.Entity.Id),
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
    qWs(t) {
      for (const i of this._9r) if (i.EntityId === t) return !0;
      return !1;
    }
    Tgn(s = void 0, t = !1, i = !1) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Level",
            37,
            "[SceneItemFanComponent] RefreshTraceState",
            ["EntityId", this.Entity.Id],
          ),
        this.QCn)
      )
        if (this.hgn)
          if (this.ZCn)
            if (this.Xte?.HasTag(1298716444))
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Level",
                  37,
                  "[SceneItemFanComponent] RefreshTraceState Failed, Has Completed",
                  ["EntityId", this.Entity.Id],
                );
            else if (this.o0n) this.Bgn = !0;
            else {
              (this.JYs = t), this.xCn.clear();
              for (let t = this.PCn.length - 1; -1 < t; t--) {
                var h = this.PCn[t];
                h?.Valid ? this.xCn.add(h.Id) : this.PCn.splice(t, 1);
              }
              if (((this.qCn.length = 0), !i))
                for (const o of this._9r) {
                  if (0 === o.EntityId) break;
                  this.qCn.push(o.EntityId);
                }
              if (s)
                for (let t = this._9r.length - 1; 0 < t; t--)
                  if (this._9r[t - 1].EntityId === s) {
                    this._9r[t].HitLocation?.Equals(
                      Vector_1.Vector.ZeroVectorProxy,
                    )
                      ? this.Ggn.DeepCopy(this._9r[t].Location)
                      : this.Ggn.DeepCopy(this._9r[t].HitLocation);
                    break;
                  }
              for (const n of this._9r) SceneItemFanComponent_1.t0n(n);
              if (
                ((this._9r.length = 0),
                this.GCn.Clear(),
                this.p0n(this.xCn, this._9r, this.mWi, this.OCn, this.GCn),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Level",
                    37,
                    "[SceneItemFanComponent] TraceToFan",
                    ["PointCount", this._9r?.length],
                    ["EntityId", this.Entity.Id],
                  ),
                s)
              ) {
                let i = !1;
                for (let t = this._9r.length - 1; 0 < t; t--)
                  if (this._9r[t - 1].EntityId === s) {
                    i = !0;
                    break;
                  }
                i || this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
              } else this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
              for (let t = this.PCn.length - 1; -1 < t; t--) {
                var e = this.PCn[t];
                this.xCn.has(e.Id) && this.egn(e, !1, !1);
              }
              if (
                (this.v0n(), this.GCn && 0 < this._9r.length && 0 < this.xgn)
              ) {
                let i = this.n$t.ActorLocationProxy,
                  s = 0;
                for (let t = 0; t < this.xgn; t++)
                  (s += Vector_1.Vector.Dist(i, this._9r[t].Location)),
                    (i = this._9r[t].Location);
                this.GCn.SetPreLength(s);
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
    p0n(t, i, s, h, e = void 0) {
      this.fgn = 0;
      var o = this.DCn
          ? this.DCn.DefaultEffectLength
          : FAN_DEFAULT_SPLINE_LENGTH,
        n = SceneItemFanComponent_1.d0n(),
        r = this.M0n(t, s, h, n, e, o),
        o =
          ((this.fgn = 0 < this.fgn ? this.fgn : o),
          e && (e.Length += this.fgn),
          this.n0n()),
        _ = this.h0n();
      MathUtils_1.MathUtils.LookRotationUpFirst(o, _, n.HitRotator),
        r
          ? (n.Location?.DeepCopy(r._0n()),
            n.Rotator?.DeepCopy(r.aAn()),
            n.Offset?.DeepCopy(r.c0n()),
            (n.EffectConfig = r.m0n()),
            (n.EntityId = r.Entity.Id),
            i.push(n),
            e &&
              (_ = r.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (e.SporeEntityIds.push(_), e.SporeEntityLength.push(e.Length)))
          : (o.Multiply(this.fgn, n.Location),
            n.Location.AdditionEqual(this.n$t.ActorLocationProxy),
            n.Rotator.DeepCopy(Rotator_1.Rotator.ZeroRotatorProxy),
            n.Offset.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
            i.push(n)),
        r && r.p0n(t, i, s, h, e);
    }
    M0n(o, t, n, r, _ = void 0, a = FAN_DEFAULT_SPLINE_LENGTH) {
      (this.pgn = 0),
        this.r0n().Quaternion().RotateVector(this.UCn, this.BCn),
        this.BCn.AdditionEqual(this.n$t.ActorLocationProxy);
      this.n0n().Multiply(n, this.bCn),
        this.bCn.AdditionEqual(this.BCn),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.BCn),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, this.bCn);
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
          d = new Set(),
          m = t.HitResult,
          E = m.GetHitCount(),
          S = m.Actors;
        for (let t = 0; t < E; t++) {
          var C = S.Get(t);
          if (C !== this.RGn) {
            C =
              ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(
                C,
              );
            if (C?.Id !== this.Entity.Id)
              if (C && o.has(C?.Id)) {
                if (C) {
                  var I = C.Entity.GetComponent(138);
                  if (!I || !I.a0n()) {
                    if ((s && (h = !0), I)) {
                      var p = I.Entity.GetComponent(187)?.ActorLocationProxy;
                      p &&
                        (this.pgn = Vector_1.Vector.Dist(
                          p,
                          this.n$t.ActorLocationProxy,
                        )),
                        s ||
                          ((e = I),
                          o.delete(C.Id),
                          TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                            m,
                            t,
                            r.HitLocation,
                          ));
                      break;
                    }
                    s || d.add(C);
                  }
                }
              } else
                s ||
                  (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                    m,
                    t,
                    r.HitLocation,
                  ),
                  (i = r.HitLocation),
                  (s = !0));
          }
        }
        if (
          (e &&
            (n = e.Entity.GetComponent(187)?.ActorLocationProxy) &&
            (this.fgn = Vector_1.Vector.Dist(n, this.n$t.ActorLocationProxy)),
          (r.IsBlockInMiddle = h),
          i)
        ) {
          t = Vector_1.Vector.Dist(i, this.BCn);
          if (e) t < this.fgn && (this.fgn = t);
          else {
            if (d.size < 1)
              return void (h ? (this.fgn = t) : (this.fgn = Math.min(a, t)));
            this.fgn = t;
          }
        }
        if (0 < this.fgn) {
          let t = 0;
          for (const L of d)
            L &&
              o.has(L.Id) &&
              (f = L.Entity.GetComponent(187)) &&
              (f = Vector_1.Vector.Dist(
                this.n$t.ActorLocationProxy,
                f.ActorLocationProxy,
              )) < this.fgn &&
              (i && f > t && (t = f), o.delete(L.Id), _) &&
              (v = L.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (_.SporeEntityIds.push(v),
              _.SporeEntityLength.push(_.Length + f));
          i && 0 < t && (this.fgn = t);
        } else
          for (const F of d)
            F &&
              o.has(F.Id) &&
              (o.delete(F.Id), (c = F.Entity.GetComponent(187))) &&
              ((c = Vector_1.Vector.Dist(
                c.ActorLocationProxy,
                this.n$t.ActorLocationProxy,
              )) > this.fgn && (this.fgn = c),
              _) &&
              (l = F.Entity.GetComponent(0)?.GetCreatureDataId()) &&
              (_.SporeEntityIds.push(l),
              _.SporeEntityLength.push(_.Length + c));
        return e;
      }
    }
    get IsRotating() {
      return 0 < this.Mgn;
    }
    get IsAnyRotating() {
      if (0 < this.Mgn) return !0;
      if (!this.QCn) return !!this.ACn && this.ACn.IsAnyRotating;
      if (this.PCn)
        for (const i of this.PCn) {
          var t = i.GetComponent(138);
          if (t && 0 < t.Mgn) return !0;
        }
      return !1;
    }
    fva(t) {
      this.PCn && -1 < (t = this.PCn.indexOf(t)) && this.PCn.splice(t, 1);
    }
    gva() {
      var t,
        i,
        s = this.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
      0 !== s &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(s)) &&
        (t =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) &&
        (i = t.Entity?.GetComponent(138)) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            37,
            "[FanComponent] TryToResetRoot Successs",
            ["EntityId", this.Entity.Id],
          ),
        (this.ACn = i).vva(this, s));
    }
    vva(t, i) {
      var s;
      this.PCn &&
        (s = this.Entity.GetComponent(0))?.Valid &&
        !this.PCn.includes(t.Entity) &&
        (s = s.GetBaseInfo().ChildEntityIds)?.includes(i) &&
        this.PCn.length < s.length &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            37,
            "[FanComponent] TryToResetChild Successs",
            ["EntityId", this.Entity.Id],
          ),
        this.PCn.push(t.Entity),
        this.Tgn(void 0, !1));
    }
    ExecuteInteract() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneItem", 37, "[FanComponent] ExecuteInteract", [
          "EntityId",
          this.Entity.Id,
        ]),
        0 < this.Mgn
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              37,
              "[FanComponent.ExecuteInteract] Self Is Rotating",
            )
          : this.QCn
            ? (this.hgn || this.Egn || this.g0n(!0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  37,
                  "[FanComponent.ExecuteInteract] Self Is Root",
                ))
            : this.ACn
              ? this.ACn.E0n
                ? Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    37,
                    "[FanComponent.ExecuteInteract] Root Is Rotating",
                  )
                : ((this.ICn = this.ICn % this.MCn),
                  (this.fle = (this.ICn + this.ECn) * this.yCn),
                  this.ICn++,
                  (this.vgn = (this.ICn + this.ECn) * this.yCn),
                  (this.Mgn = this.RCn),
                  (this.hwe.Yaw = this.vgn),
                  Info_1.Info.IsBuildShipping ||
                    (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug(
                        "Level",
                        37,
                        "[FanComponent]StartRotate",
                        [
                          "PbDataId",
                          this.Entity.GetComponent(0)?.GetPbDataId(),
                        ],
                        ["StartRotator", this.fle],
                        ["EndRotator", this.vgn],
                        ["CurrentRotateCount", this.ICn],
                      )),
                  this.ACn?.S0n(this.Entity.Id, this.fle, this.vgn, this.wCn),
                  this.Xte?.AddTag(-687845e3),
                  this.y0n(),
                  this.I0n(
                    this.n$t.CreatureData.GetCreatureDataId(),
                    this.ICn,
                    (t) => {
                      0 !== t?.G9n &&
                        Log_1.Log.CheckWarn() &&
                        Log_1.Log.Warn(
                          "Level",
                          37,
                          "SendFanNumberOfTurnsRequest Failed",
                          ["ErrorCode", t?.G9n],
                        );
                    },
                  ))
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneItem",
                    37,
                    "[FanComponent.ExecuteInteract] RootComponent Is Undefined",
                  ),
                this.gva());
    }
    hAn(s) {
      if (this._9r) {
        let i = -1;
        for (let t = 0; t < this._9r.length; t++)
          if (this._9r[t].EntityId === s) {
            i = t;
            break;
          }
        if (!(i < 0 || i >= this.xgn)) {
          this.o0n = !1;
          var h = this.mgn.length;
          for (let t = i + 1; t < this._9r.length; t++) {
            var e = EntitySystem_1.EntitySystem.GetComponent(
              this._9r[t].EntityId,
              138,
            );
            e && e.Zgn(0),
              this.fTn(t, !0, 2),
              t < h && this.mgn[t].ClearSplinePoints();
          }
        }
      }
    }
    S0n(s, h, e, o) {
      if (this.QCn && !this.bgn && this.ZCn) {
        this.hAn(s);
        let i = -1;
        for (let t = 0; t < this._9r.length; t++)
          if (this._9r[t].EntityId === s) {
            i = t;
            break;
          }
        if (!(i < 0 || ((this.xgn = i + 1), this.xgn > this._9r.length - 1))) {
          (this.kgn = 0), (this.Ogn = this.RCn);
          let t = void 0;
          var n, r;
          (t =
            0 === this.xgn
              ? (this.$gn.DeepCopy(this.n$t.ActorLocationProxy),
                this.Ygn.DeepCopy(this.UCn),
                this.LCn)
              : ((n = this._9r[this.xgn - 1]),
                this.$gn.DeepCopy(n.Location),
                this.Ygn.DeepCopy(n.Offset),
                n.EffectConfig)),
            (this.Vgn = t ? t.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH),
            0 === this.Vgn
              ? (n = this.mgn[this.xgn])
                ? n.ClearSplinePoints()
                : Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Level",
                    37,
                    "[SceneItemFanComponent] MultiSplineComponents is undefined",
                  )
              : (this.YJo.DeepCopy(this._9r[this.xgn].Location),
                (n = Vector_1.Vector.ForwardVectorProxy),
                (r = this.hwe.Yaw),
                (this.hwe.Yaw = e),
                MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome),
                this.Ome.Quaternion().RotateVector(n, this.cz),
                (this.bgn = !0),
                (this.o0n = !0),
                this.jgn.DeepCopy(this.cz),
                this.jgn.Normalize(),
                (this.hwe.Yaw = h),
                MathUtils_1.MathUtils.ComposeRotator(this.hwe, o, this.Ome),
                this.Ome.Quaternion().RotateVector(n, this.cz),
                this.YJo.Subtraction(this.$gn, this.Hgn),
                (this.Fgn = this.Hgn.Size()),
                this.Hgn.DeepCopy(this.cz),
                this.Hgn.Normalize(),
                this.Hgn.CrossProduct(this.jgn, this.Wgn),
                this.Wgn.Normalize(),
                MathUtils_1.MathUtils.LookRotationUpFirst(
                  this.Hgn,
                  this.Wgn,
                  this.Kgn,
                ),
                MathUtils_1.MathUtils.LookRotationUpFirst(
                  this.jgn,
                  this.Wgn,
                  this.Qgn,
                ),
                (this.hwe.Yaw = r),
                this.RefreshSpline(
                  t?.EffectPath,
                  t?.HitEffectPath,
                  this.xgn,
                  !0,
                ));
        }
      }
    }
    get E0n() {
      return this.bgn;
    }
    ign() {
      this.Xte?.AddTag(217251158);
    }
    OnTick(t) {
      Info_1.Info.EnableForceTick && this.KHr(t);
    }
    y0n() {
      this.LCn
        ? this.Zgn(this.LCn?.DefaultEffectLength)
        : this.Zgn(FAN_DEFAULT_SPLINE_LENGTH);
    }
    ygn() {
      this.QCn ||
        (this.ACn?.qWs(this.Entity.Id) && this.ACn?.Tgn(),
        this.Xte?.RemoveTag(-687845e3));
    }
    T0n(t) {
      0 < t
        ? ((t = this._9r[t - 1]),
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
            t.EntityId,
          )?.Entity?.GetComponent(138)) && t.Zgn())
        : this.Zgn();
    }
    r0n() {
      return this.HCn
        ? (this.Dgn || (this.Dgn = Rotator_1.Rotator.Create()),
          this.Dgn.DeepCopy(this.HCn.K2_GetActorRotation()),
          this.Dgn)
        : this.n$t.ActorRotationProxy;
    }
    n0n() {
      return this.HCn
        ? (this.Rgn || (this.Rgn = Vector_1.Vector.Create()),
          this.Rgn.DeepCopy(this.HCn.GetActorForwardVector()),
          this.Rgn)
        : this.n$t.ActorForwardProxy;
    }
    h0n() {
      return this.HCn
        ? (this.Ugn || (this.Ugn = Vector_1.Vector.Create()),
          this.Ugn.DeepCopy(this.HCn.GetActorUpVector()),
          this.Ugn)
        : this.n$t.ActorUpProxy;
    }
    Sgn(t, i) {
      this.HCn
        ? this.HCn.K2_SetActorRotation(t.ToUeRotator(), !1)
        : this.n$t.SetActorRotation(t.ToUeRotator(), i);
    }
    Rtn() {
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
        h = this.Entity.GetComponent(182);
      h
        ? (h = h.GetInteractController())
          ? ((t = new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
            this.VCn &&
              (((i =
                new CodeDefineLevelConditionInfo_1.LevelCodeConditionCheckGroupInfo()).ConditionGroup =
                this.VCn),
              t.Conditions.push(i)),
            ((i =
              new LevelGameplayActionsDefine_1.ActionInteractFan()).EntityId =
              this.Entity.Id),
            (t.Type = 0),
            ((s =
              new CodeDefineLevelConditionInfo_1.LevelConditionCheckFanIsNotRotatingInfo()).EntityId =
              this.Entity.Id),
            t.Conditions.push(s),
            this.QCn &&
              (((s =
                new CodeDefineLevelConditionInfo_1.LevelConditionCheckEntityTagInfo()).EntityId =
                this.Entity.Id),
              (s.IsContain = !0),
              (s.TagId = -1152559349),
              t.Conditions.push(s)),
            (this.Itn = h.AddClientInteractOption(
              i,
              t,
              "Direct",
              this.Agn,
              this.Pgn,
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
    l0n() {
      var t;
      this.Itn &&
        (t = this.Entity.GetComponent(182)) &&
        (t = t.GetInteractController()) &&
        (t.RemoveClientInteractOption(this.Itn), (this.Itn = void 0));
    }
    set o0n(t) {
      this.wgn !== t &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Level",
            37,
            "[SceneItemFanComponent] Set IsSplineMoving",
            ["Value", t],
          ),
        (this.wgn = t),
        this.wgn ||
          ((this.bgn = !1),
          this.GCn?.NeedTick() && this.GCn?.Clear(!0),
          this.Bgn && ((this.Bgn = !1), this.Tgn())));
    }
    get o0n() {
      return this.wgn;
    }
    v0n() {
      if (this.QCn) {
        this.xgn = -1;
        for (let t = 0; t < this._9r.length; t++)
          if (this.qCn.length - 1 < t || this._9r[t].EntityId !== this.qCn[t]) {
            this.xgn = t;
            break;
          }
        this.i0n(!0);
      }
    }
    s0n(t, i, s) {
      this.QCn &&
        -1 < t &&
        t < this.mgn.length &&
        (t = this.mgn[t]) &&
        (this.ggn.Empty(),
        this.ggn.Add(i),
        this.ggn.Add(s),
        t.SetSplinePoints(this.ggn, 1));
    }
    i0n(h = !1, e = !0) {
      let o = void 0,
        n = void 0,
        r = -1;
      if (-1 < this.xgn && this.xgn < this._9r.length) {
        e &&
          ((this.o0n = !0), !this.bgn) &&
          this.xgn < this.dgn.length &&
          ((e = this.dgn[this.xgn]),
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(e, !0),
          -1 < (e = this.XYs.indexOf(e))) &&
          (this.XYs.splice(e, 1), this.YYs.splice(e, 1)),
          0 < this.xgn &&
            ((e = this.dgn[this.xgn - 1]),
            this.XYs.includes(e) ||
              (this.XYs.push(e),
              this.YYs.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME))),
          0 === this.xgn
            ? this.lgn(!0, !0)
            : ((e = this._9r[this.xgn - 1].EntityId),
              (e = EntitySystem_1.EntitySystem.GetComponent(e, 138)) &&
                this.xgn < this._9r.length &&
                (this.xgn === this._9r.length - 1
                  ? e.lgn(!0, this._9r[this.xgn].IsBlockInMiddle)
                  : e.lgn(!0, !0)));
        let t = void 0,
          i = void 0,
          s = void 0;
        (s =
          0 === this.xgn
            ? (this.qgn.DeepCopy(this.n$t.ActorLocationProxy),
              (t = this.r0n().Quaternion()),
              (i = this.UCn),
              this.DCn)
            : ((e = this._9r[this.xgn - 1]),
              this.qgn.DeepCopy(e.Location),
              (t = e.Rotator?.Quaternion()),
              (i = e.Offset),
              e.EffectConfig)),
          t?.RotateVector(i, this.cz),
          this.qgn.AdditionEqual(this.cz),
          this.Ggn.Equals(Vector_1.Vector.ZeroVectorProxy) &&
            this.Ggn.DeepCopy(this.qgn);
        var e = s ? s.DefaultEffectLength : FAN_DEFAULT_SPLINE_LENGTH,
          _ =
            (this.tgn
              ? this.xgn < this._9r.length &&
                ((_ = Vector_1.Vector.Dist(
                  this.Ggn,
                  this._9r[this.xgn].HitLocation,
                )),
                (this.xgn === this._9r.length - 1 &&
                  e < _ &&
                  !this._9r[this.xgn].IsBlockInMiddle) ||
                this._9r[this.xgn].HitLocation.Equals(
                  Vector_1.Vector.ZeroVectorProxy,
                )
                  ? (t?.RotateVector(
                      Vector_1.Vector.ForwardVectorProxy,
                      this.YJo,
                    ),
                    this.YJo?.MultiplyEqual(e),
                    this.YJo?.AdditionEqual(this.qgn))
                  : this.YJo.DeepCopy(this._9r[this.xgn].HitLocation))
              : this.YJo.DeepCopy(this._9r[this.xgn].Location),
            this.Ngn.DeepCopy(this.YJo),
            this.tgn || this.Ngn.AdditionEqual(this.cz),
            Vector_1.Vector.Dist(this.Ggn, this.Ngn)),
          a = this.JYs ? FIRST_SPLINE_MOVE_SPEED : SPLINE_MOVE_SEPPD;
        (this.Ogn = (_ / a) * TimeUtil_1.TimeUtil.InverseMillisecond),
          (this.kgn = h
            ? (e / SPLINE_MOVE_SEPPD) * TimeUtil_1.TimeUtil.InverseMillisecond
            : 0),
          this.RefreshSpline(s?.EffectPath, s?.HitEffectPath, this.xgn, h),
          this.L0n(this.xgn),
          0 === this.xgn
            ? ((r = 0),
              this._9r[0].IsBlockInMiddle &&
                ((o = this._9r[0].HitLocation), (n = this._9r[0].HitRotator)))
            : this.Cgn.length > this.xgn &&
              (_ = EffectSystem_1.EffectSystem.GetEffectActor(
                this.Cgn[this.xgn - 1],
              )) &&
              (this.fTn(this.xgn - 1, !1, 3),
              _.K2_SetActorLocationAndRotation(
                this._9r[this.xgn - 1].HitLocation.ToUeVector(),
                this._9r[this.xgn - 1].HitRotator.ToUeRotator(),
                !1,
                void 0,
                !0,
              ));
      } else
        (this.o0n = !1),
          this.xgn - 1 < this.dgn.length &&
            ((a = this.dgn[this.xgn - 1]),
            this.XYs.includes(a) ||
              (this.XYs.push(a),
              this.YYs.push(WAIT_RESUME_IGNORE_VISIBILITY_OPTIMIZE_TIME))),
          this.xgn === this._9r.length &&
            1 < this.Cgn.length &&
            ((e = this._9r[this.xgn - 1]),
            (r = this.xgn - 1),
            e.IsBlockInMiddle) &&
            ((o = e.HitLocation), (n = e.HitRotator));
      -1 < r &&
        this.Cgn.length > r &&
        (o && n
          ? this._9r[r].Location &&
            (this.fTn(r, !1, 4),
            EffectSystem_1.EffectSystem.GetEffectActor(
              this.Cgn[r],
            )?.K2_SetActorLocationAndRotation(
              o.ToUeVector(),
              n.ToUeRotator(),
              !1,
              void 0,
              !0,
            ))
          : this.fTn(r, !0, 5));
    }
    Ign(t) {
      var i, s;
      this.o0n &&
        (this.bgn
          ? ((this.kgn += t),
            (i =
              0 < this.Ogn
                ? MathUtils_1.MathUtils.Clamp(this.kgn / this.Ogn, 0, 1)
                : 1),
            (s = MathUtils_1.MathUtils.Lerp(this.Fgn, this.Vgn, i)),
            Quat_1.Quat.Slerp(this.Kgn, this.Qgn, i, this.Xgn),
            this.Xgn.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Jgn),
            this.Xgn.RotateVector(this.Ygn, this.cz),
            this.cz.AdditionEqual(this.$gn),
            this.Jgn.MultiplyEqual(s),
            this.Jgn.AdditionEqual(this.cz),
            (i = this.mgn[this.xgn]) &&
              (this.ggn.Empty(),
              this.ggn.Add(this.cz.ToUeVector()),
              this.ggn.Add(this.Jgn.ToUeVector()),
              i.SetSplinePoints(this.ggn, 1)),
            this.kgn > this.Ogn &&
              (this.T0n(this.xgn), (this.o0n = !1), (this.bgn = !1)))
          : ((this.kgn += t),
            Vector_1.Vector.Lerp(
              this.Ggn,
              this.Ngn,
              0 < this.Ogn
                ? MathUtils_1.MathUtils.Clamp(this.kgn / this.Ogn, 0, 1)
                : 1,
              this.YJo,
            ),
            (s = this.mgn[this.xgn]) &&
              (this.ggn.Empty(),
              this.ggn.Add(this.qgn.ToUeVector()),
              this.ggn.Add(this.YJo.ToUeVector()),
              s.SetSplinePoints(this.ggn, 1)),
            this.kgn > this.Ogn &&
              (this.Ggn.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
              this.xgn++,
              this.i0n(),
              this.T0n(this.xgn - 1))));
    }
    D0n(t, i) {
      var s,
        h = ActorSystem_1.ActorSystem.Get(
          UE.BP_BasePathLine_C.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
        ),
        e =
          (h.K2_SetActorLocationAndRotation(
            this.n$t?.ActorLocation,
            this.r0n().ToUeRotator(),
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
            this.cgn?.push(h),
            this.mgn?.push(e),
            this.dgn?.push(t),
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
                EffectSystem_1.EffectSystem.SetEffectHidden(s, !0),
                this.Cgn?.push(s))
              : this.Cgn?.push(-1)))
        : (this.cgn?.push(h),
          this.mgn?.push(e),
          this.dgn?.push(-1),
          this.Cgn?.push(-1));
    }
    L0n(t) {
      0 < t &&
        t < this.cgn.length &&
        this.cgn[t].K2_SetActorLocation(
          this._9r[t - 1].Location.ToUeVector(),
          !1,
          void 0,
          !1,
        );
    }
    RefreshSpline(i, s, h, t = !1) {
      var e = h + 1;
      if (t) {
        if (e < this.cgn.length)
          for (let t = e; t < this.cgn.length; t++)
            this.ggn.Empty(),
              this.mgn[t].SetSplinePoints(this.ggn, 1),
              EffectSystem_1.EffectSystem.SetEffectHidden(this.dgn[t], !0);
        else {
          e <= this.cgn.length &&
            (-1 === this.dgn[h] && this.zgn(i, h, this.dgn),
            -1 === this.Cgn[h]) &&
            this.zgn(s, h, this.Cgn);
          for (let t = this.cgn.length; t < e; t++) this.D0n(i, s);
        }
        for (let t = h; t < this.Cgn.length; t++) this.fTn(t, !0, 6);
      } else
        this.cgn.length < e
          ? this.D0n(i, s)
          : ((t = this.dgn[h]),
            i !== EffectSystem_1.EffectSystem.GetPath(t)
              ? this.zgn(i, h, this.dgn)
              : EffectSystem_1.EffectSystem.ReplayEffect(
                  this.dgn[h],
                  "[SceneItemFanComponent.ReplayEffect1]",
                ),
            (t = this.Cgn[h]),
            s !== EffectSystem_1.EffectSystem.GetPath(t)
              ? this.zgn(s, h, this.Cgn)
              : EffectSystem_1.EffectSystem.ReplayEffect(
                  this.Cgn[h],
                  "[SceneItemFanComponent.ReplayEffect1]",
                ),
            this.fTn(h, !0, 7));
    }
    fTn(t, i, s) {
      t >= this.Cgn.length
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
          EffectSystem_1.EffectSystem.SetEffectHidden(this.Cgn[t], i));
    }
    zgn(i, s, h) {
      if (this.cgn && !(this.cgn.length <= s)) {
        var e,
          o = this.cgn[s],
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
    I0n(t, i, s) {
      var h = Protocol_1.Aki.Protocol.Tts.create();
      (h.F4n = MathUtils_1.MathUtils.NumberToLong(t)),
        (h.aKn = i),
        Net_1.Net.Call(27902, h, s);
    }
    rgn(t, i, s, h) {
      var e = Protocol_1.Aki.Protocol.Rts.create();
      (e.hKn = MathUtils_1.MathUtils.NumberToLong(t)),
        (e.lKn = MathUtils_1.MathUtils.NumberToLong(i)),
        (e.WHn = s ? 1 : 0),
        Net_1.Net.Call(24428, e, h);
    }
    f0n(t, i, s) {
      var h = Protocol_1.Aki.Protocol.Ats.create();
      (h.hKn = MathUtils_1.MathUtils.NumberToLong(t)),
        (h.WHn = i ? 1 : 0),
        Net_1.Net.Call(24298, h, s);
    }
  });
(SceneItemFanComponent.C0n = new Array()),
  (SceneItemFanComponent = SceneItemFanComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(138)],
      SceneItemFanComponent,
    )),
  (exports.SceneItemFanComponent = SceneItemFanComponent);
//# sourceMappingURL=SceneItemFanComponent.js.map
