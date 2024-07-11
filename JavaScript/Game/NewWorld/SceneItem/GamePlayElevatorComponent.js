"use strict";
var GamePlayElevatorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        o = arguments.length,
        r =
          o < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, i, e, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (r = (o < 3 ? h(r) : 3 < o ? h(i, e, r) : h(i, e)) || r);
      return 3 < o && r && Object.defineProperty(i, e, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayElevatorComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ActorUtils_1 = require("../../Utils/ActorUtils"),
  TraceUtils_1 = require("../../Utils/TraceUtils"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  LogController_1 = require("../../World/Controller/LogController"),
  CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
  MIN_SPEED = 1,
  MTOCM = 100,
  NORMALIZE = 0.01,
  FOUR = 4,
  THOUSAND = 1e3,
  DELTATIMECHANGEVALUE = 10,
  NEGATIVEONE = -1,
  ACCELERATETIMERADIO = 1.5;
let GamePlayElevatorComponent =
  (GamePlayElevatorComponent_1 = class GamePlayElevatorComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Igo = void 0),
        (this.J_n = void 0),
        (this.z_n = void 0),
        (this.Z_n = void 0),
        (this.eun = void 0),
        (this.tun = void 0),
        (this.cz = void 0),
        (this.kRe = void 0),
        (this.iun = void 0),
        (this.oun = void 0),
        (this.run = void 0),
        (this.nun = void 0),
        (this.sun = -0),
        (this.aun = void 0),
        (this.hun = void 0),
        (this.lun = -0),
        (this.vtn = void 0),
        (this._un = void 0),
        (this.uun = -0),
        (this.cun = -0),
        (this.mun = void 0),
        (this.dun = 1),
        (this.Cun = 1),
        (this.gun = !1),
        (this.fun = !1),
        (this.pun = !1),
        (this.vun = !1),
        (this.Mun = !1),
        (this.Eun = !1),
        (this.Sun = void 0),
        (this.yun = void 0),
        (this.Iun = void 0),
        (this.xOi = void 0),
        (this.KHr = (t) => {
          this.Tun() ||
            (this.pun
              ? this.Lun(t)
              : !this.IsMove() ||
                (this.fun && this.Dun()) ||
                (this.Uun(t), this.tZo(t), this.Aun()));
        }),
        (this.Pun = () => {
          this.hun = !1;
        }),
        (this.xun = (t, i) => {
          var e,
            i = i.Entity;
          i.GetComponent(142) &&
            ((i = i.GetComponent(1)),
            (e = this.yun.indexOf(i.Owner)),
            t
              ? -1 === e && this.yun.push(i.Owner)
              : -1 !== e && this.yun.splice(e, 1),
            -1 !== (e = this.Sun.indexOf(i.Owner))) &&
            this.Sun.splice(e, 1);
        }),
        (this.wun = (t) => {
          var i, e;
          this.IsMove() &&
            ((e = void 0), (i = Global_1.Global.BaseCharacter)) &&
            (e = i.CharacterActorComponent.Entity.GetComponent(159)) &&
            (t
              ? ((t = i.K2_GetActorLocation().Z),
                this.Entity.GetComponent(1)?.ActorLocationProxy.Z < t &&
                  (e.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
                    InstigatorId: e.CreatureDataId,
                    Duration: this.Bun(),
                    Reason: "电梯添加buff",
                  }),
                  EventSystem_1.EventSystem.EmitWithTarget(
                    e.Entity,
                    EventDefine_1.EEventName.ElevatorMove,
                  )))
              : e.RemoveBuff(
                  CharacterBuffIds_1.buffId.ElevatorBuff,
                  -1,
                  "电梯移除buff",
                ));
        }),
        (this.bun = (t, i) => {
          var e = ActorUtils_1.ActorUtils.GetEntityByActor(i);
          e &&
            e.Entity.GetComponent(142) &&
            -1 === this.Sun.indexOf(i) &&
            (this.IsMove() && -1 !== this.yun.indexOf(i) && this.qun(i),
            this.Sun.push(i));
        }),
        (this.OnSceneInteractionLoadCompleted = () => {
          var t = this.Entity.GetComponent(185),
            t =
              SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
                t.GetSceneInteractionLevelHandleId(),
              );
          (this.Iun = t?.GetComponentByClass(
            UE.PrimitiveComponent.StaticClass(),
          )),
            this.Iun &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 32, "111", [
                  "111",
                  this.Iun.GetCollisionProfileName().toString(),
                ]),
              t.OnActorHit.Add(this.bun),
              this.Iun.SetNotifyRigidBodyCollision(!0));
        });
    }
    get CurLiftFloor() {
      return this.dun;
    }
    OnInitData(t) {
      t = t.GetParam(GamePlayElevatorComponent_1)[0];
      if (!t) throw Error("创建GamePlayElevatorComponent缺少配置参数");
      (this.eun = t.UniformMovement),
        (this.tun = t.TurnTime),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.iun = Vector_1.Vector.Create(0, 0, 0)),
        (this.nun = t.MaxSpeed),
        (this.z_n = Vector_1.Vector.Create(0, 0, 0)),
        (this.Z_n = Vector_1.Vector.Create(0, 0, 0)),
        (this.kRe = Vector_1.Vector.Create(0, 0, 0)),
        (this.run = Vector_1.Vector.Create(0, 0, 0)),
        (this.oun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Sun = []),
        (this.yun = []);
      var i = this.Entity.GetComponent(0),
        e = i.GetInitLocation(),
        s = e.X || 0,
        h = e.Y || 0,
        o = e.Z || 0;
      if (((this.mun = []), t.StayPositions))
        for (const r of t.StayPositions)
          this.mun.push(
            Vector_1.Vector.Create(
              r.X ? s + r.X : s,
              r.Y ? h + r.Y : h,
              r.Z ? o + r.Z : o,
            ),
          );
      return (
        (this.dun = i.LiftFloor ?? 1),
        (this.Cun = 0),
        (this.Igo = Vector_1.Vector.Create(0, 0, 0)),
        (this.J_n = Vector_1.Vector.Create(0, 0, 0)),
        (this.gun = !1),
        (this.fun = !1),
        (this.pun = !1),
        (this.vun = void 0 !== t.AutoConfig),
        (this.Mun = t.AutoConfig?.IsCircle ?? !1),
        (this.Eun = !1),
        (this.cun = t.AutoConfig?.Interval ?? 0),
        (this.uun = 0),
        t.SafePoint &&
          (this.aun = Vector_1.Vector.Create(
            t.SafePoint.X ?? 0,
            t.SafePoint.Y ?? 0,
            t.SafePoint.Z ?? 0,
          )),
        !0
      );
    }
    OnStart() {
      return (
        this.V6o(),
        (this.vtn = this.Entity.GetComponent(76)),
        this.vtn &&
          (this.vtn.AddOnPlayerOverlapCallback(this.wun),
          this.vtn.AddOnEntityOverlapCallback(this.xun)),
        (this._un = this.Entity.GetComponent(117)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneInteractionLoadCompleted,
        ),
        !0
      );
    }
    OnClear() {
      return (
        this.vtn &&
          (this.vtn.RemoveOnPlayerOverlapCallback(this.wun),
          this.vtn.RemoveOnEntityOverlapCallback(this.xun)),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneInteractionLoadCompleted,
        ),
        void 0 !== this.xOi && TimerSystem_1.TimerSystem.Remove(this.xOi),
        !0
      );
    }
    OnForceTick(t) {
      this.KHr(t);
    }
    Uun(t) {
      this.eun ? this.Gun() : this.Nun();
    }
    Oun(i, e) {
      if (!this.Tun() && !this.hun) {
        this.hun = !0;
        let t = Protocol_1.Aki.Protocol.W4s.Proto_End;
        e &&
          (t =
            this.Cun > this.dun
              ? Protocol_1.Aki.Protocol.W4s.h6n
              : Protocol_1.Aki.Protocol.W4s.Proto_Reverse),
          LevelGamePlayController_1.LevelGamePlayController.ElevatorStateChangeRequest(
            this.Entity.Id,
            i,
            t,
            this.Pun,
          );
      }
    }
    Aun() {
      var t = this.J_n,
        i = this.Entity.GetComponent(1).ActorLocationProxy;
      t.Subtraction(i, this.cz),
        this.cz.MultiplyEqual(this.iun),
        (0 <= this.cz.X && 0 <= this.cz.Y && 0 <= this.cz.Z) || this.kun();
    }
    kun() {
      var t = this.J_n,
        i = this.Entity.GetComponent(1);
      this.oun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.run.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        i.SetActorLocation(t.ToUeVector()),
        (this.lun = 0),
        (this.fun = !1),
        (this.gun = !1),
        this.Oun(this.Cun, !1),
        (this.dun = this.Cun),
        (this.Cun = 0),
        this.Vun(),
        this.vun && (this.pun = !0),
        (this._un.IsMoving = !1);
    }
    tZo(t) {
      (!this.lun || Math.abs(t - this.lun) > DELTATIMECHANGEVALUE) &&
        (this.lun = t);
      var t = this.Entity.GetComponent(1),
        i = this.lun * MathUtils_1.MathUtils.MillisecondToSecond,
        e =
          (this.cz.DeepCopy(this.run),
          this.cz.MultiplyEqual(i),
          this.oun.Addition(this.cz, this.kRe),
          this.kRe);
      this.Z_n.SizeSquared() > e.SizeSquared() || e.DotProduct(this.oun) < 0
        ? this.oun.DeepCopy(this.Z_n)
        : this.z_n.SizeSquared() < e.SizeSquared()
          ? this.oun.DeepCopy(this.z_n)
          : this.oun.AdditionEqual(this.cz),
        this.cz.DeepCopy(this.oun),
        this.cz.MultiplyEqual(i),
        this.kRe.DeepCopy(t.ActorLocationProxy),
        this.kRe.AdditionEqual(this.cz),
        t.SetActorLocation(this.kRe.ToUeVector());
    }
    Lun(t) {
      (this.uun += t * MathUtils_1.MathUtils.MillisecondToSecond),
        this.uun > this.cun &&
          ((this.uun = 0),
          (this.pun = !1),
          (t = this.Hun()),
          this.SetTargetFloor(t));
    }
    Gun() {}
    Nun() {
      var t = this.Igo,
        i = this.J_n,
        e = this.Entity.GetComponent(1).ActorLocationProxy,
        s = this.sun;
      const h = Vector_1.Vector.DistSquared(e, t);
      t = MathUtils_1.MathUtils.Bisection((t) => t * t > h, 0, h, 1);
      const o = Vector_1.Vector.DistSquared(e, i);
      e = MathUtils_1.MathUtils.Bisection((t) => t * t > o, 0, o, 1);
      0 !== this.run.SizeSquared() &&
        t > (1 / FOUR) * s &&
        e > (1 / FOUR) * s &&
        this.run.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        0 === this.run.SizeSquared() &&
          e < (1 / FOUR) * s &&
          this.run.DeepCopy(this.jun().MultiplyEqual(NEGATIVEONE));
    }
    Wun() {
      return (
        this.J_n.Subtraction(this.Igo, this.cz),
        this.cz.Normalize(NORMALIZE),
        this.cz.MultiplyEqual(this.nun * MTOCM),
        this.cz
      );
    }
    jun() {
      var t = this.Igo,
        t = (this.J_n.Subtraction(t, this.cz), this.cz.Size());
      return (
        this.cz.Normalize(NORMALIZE),
        this.cz.MultiplyEqual((this.nun * MTOCM * this.nun * MTOCM * 2) / t),
        this.cz
      );
    }
    IsMove() {
      return !(!this.gun && !this.fun);
    }
    V6o() {
      var t;
      this.vun && ((t = this.Hun()), this.SetTargetFloor(t));
    }
    SetTargetFloor(t) {
      var i, e;
      t < 1 || t > this.mun.length || this.dun === t
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneItem", 36, "SetTargetFloor Wrong Floor", [
            "targetFloor",
            t,
          ])
        : 0 !== this.Cun
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("SceneItem", 36, "Elevator Running")
          : ((this.Cun = t),
            this.Vun(),
            this.vun && this.Oun(t, !0),
            this.vun ||
              ((i = Global_1.Global.BaseCharacter) &&
                ((i = i.CharacterActorComponent.ActorLocationProxy),
                ((e = new LogReportDefine_1.ElevatorUsedRecord()).i_config_id =
                  this.Entity.GetComponent(0)?.GetPbDataId().toString() ?? ""),
                (e.i_area_id =
                  ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId.toString()),
                (e.i_state_id = t.toString()),
                (e.f_player_pos_x = i.X.toFixed(2)),
                (e.f_player_pos_y = i.Y.toFixed(2)),
                (e.f_player_pos_z = i.Z.toFixed(2)),
                LogController_1.LogController.LogElevatorUsedPush(e))));
    }
    Vun() {
      if (!this.Tun()) {
        let t = void 0;
        var i = Global_1.Global.BaseCharacter;
        if (
          (i &&
            ((i = i.CharacterActorComponent.Entity), (t = i.GetComponent(159))),
          0 === this.Cun)
        ) {
          if (
            (this.Kun() &&
              t &&
              t.RemoveBuff(
                CharacterBuffIds_1.buffId.ElevatorBuff,
                -1,
                "电梯移除buff",
              ),
            0 < this.Sun.length)
          )
            for (const e of this.Sun)
              TimerSystem_1.TimerSystem.Next(() => {
                this.Qun(e);
              });
          GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            ?.GetCurrentQualityInfo()
            ?.ApplyMotionBlur();
        } else if (
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MotionBlur.Amount 0",
          ),
          this.Xun(),
          this.tun
            ? (this.xOi = TimerSystem_1.TimerSystem.Delay((t) => {
                this.$un(), (this.xOi = void 0);
              }, this.tun * THOUSAND))
            : this.$un(),
          this.Kun() &&
            t &&
            (t.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
              InstigatorId: t.CreatureDataId,
              Duration: this.Bun() + this.tun ?? 0,
              Reason: "电梯添加buff",
            }),
            EventSystem_1.EventSystem.EmitWithTarget(
              t.Entity,
              EventDefine_1.EEventName.ElevatorMove,
            )),
          0 < this.Sun.length)
        )
          for (const s of this.Sun) -1 !== this.yun.indexOf(s) && this.qun(s);
      }
    }
    Xun() {
      this.Igo.DeepCopy(this.mun[this.dun - 1]),
        this.J_n.DeepCopy(this.mun[this.Cun - 1]),
        this.J_n.Subtraction(this.Igo, this.iun),
        (this.sun = this.iun.Size()),
        this.cz.DeepCopy(this.iun),
        this.cz.Normalize(NORMALIZE),
        this.cz.Multiply(this.nun * MTOCM, this.z_n),
        this.cz.Multiply(MIN_SPEED * MTOCM, this.Z_n);
    }
    $un() {
      this.eun ? this.oun.DeepCopy(this.Wun()) : this.run.DeepCopy(this.jun()),
        (this.fun = this.dun > this.Cun),
        (this.gun = this.dun < this.Cun),
        (this._un.IsMoving = !0);
    }
    Tun() {
      return this.Entity.GetComponent(180).HasTag(-662723379);
    }
    Dun() {
      if (!this.vtn) return !1;
      var t,
        i,
        e,
        s,
        h = this.vtn.GetEntitiesInRangeLocal();
      if (!h) return !1;
      let o = !1;
      for (const r of h.values())
        r?.Valid &&
          r.Entity !== this.Entity &&
          ((t = r.Entity.GetComponent(1)?.ActorLocationProxy),
          (i = r.Entity.GetComponent(1)?.HasMesh()),
          (e =
            void 0 !== (e = r.Entity.GetComponent(0)?.GetSummonerId()) &&
            0 !== e),
          (s = this.Entity.GetComponent(1)?.ActorLocationProxy),
          i) &&
          t &&
          t.Z < s.Z - 100 &&
          !e &&
          (r.Entity ===
            Global_1.Global.BaseCharacter.CharacterActorComponent.Entity &&
            r.Entity.GetComponent(56)?.StopManipualte(),
          this.Yun(r.Entity),
          (o = !0));
      return o;
    }
    Yun(i) {
      var e = i.GetComponent(1)?.ActorLocationProxy,
        t = this.Entity.GetComponent(1).ActorLocationProxy;
      if (e && t)
        if (this.aun) {
          const l = i.GetComponent(1);
          var s,
            h = l.GetRadius(),
            h = Vector_1.Vector.Create(
              t.X + this.aun.X,
              t.Y + this.aun.Y,
              t.Z + this.aun.Z + h,
            ),
            o = i.GetComponent(3);
          void (o
            ? ((s = l.DisableCollision(
                "[GamePlayElevatorComponent.SetEntitySafePos]",
              )),
              o.TeleportAndFindStandLocation(h),
              l.EnableCollision(s))
            : l.SetActorLocation(h.ToUeVector(), this.constructor.name, !1));
        } else {
          t.Subtraction(e, this.cz), (this.cz.Z = 0);
          const l = i.GetComponent(1);
          for (let t = 0; t <= 3; t++) {
            (this.kRe.X = e.X + this.cz.X * (t / 3)),
              (this.kRe.Y = e.Y + this.cz.Y * (t / 3)),
              (this.kRe.Z = e.Z);
            var [r, a] = TraceUtils_1.TraceUtils.LineTraceWithLocation(
              this.kRe,
              2e3,
              0,
            );
            if (r && !a.bStartPenetrating) {
              var n,
                r =
                  ModelManager_1.ModelManager.TraceElementModel
                    .CommonHitLocation,
                a =
                  (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                    a,
                    0,
                    r,
                  ),
                  l.GetRadius()),
                a = ((r.Z += a), i.GetComponent(3));
              a
                ? ((n = l.DisableCollision(
                    "[GamePlayElevatorComponent.SetEntitySafePos]",
                  )),
                  a.TeleportAndFindStandLocation(r),
                  l.EnableCollision(n))
                : ((a = i.GetComponent(142)) && a.TryEnableTick(!0),
                  l.SetActorLocation(
                    r.ToUeVector(),
                    this.constructor.name,
                    !1,
                  ));
              break;
            }
          }
        }
    }
    Kun() {
      if (!this.vtn) return !1;
      var t = this.vtn.GetEntitiesInRangeLocal();
      if (!t) return !1;
      let i = -1;
      var e = Global_1.Global.BaseCharacter;
      return e && (i = e.CharacterActorComponent.Entity.Id), t.has(i);
    }
    Bun() {
      this.Igo.Subtraction(this.J_n, this.cz);
      var t = this.cz.Size();
      if (this.eun) {
        const i = t / MTOCM / this.nun;
        return i > THOUSAND ? THOUSAND : i;
      }
      const i = (ACCELERATETIMERADIO * t) / MTOCM / this.nun;
      return i > THOUSAND ? THOUSAND : i;
    }
    Hun() {
      let t = this.Eun ? this.dun - 1 : this.dun + 1;
      return this.Mun
        ? (t = t > this.mun.length ? 1 : t)
        : (t > this.mun.length
            ? ((t = this.mun.length - 1), (this.Eun = !0))
            : t < 1 && ((t = 2), (this.Eun = !1)),
          t);
    }
    qun(t) {
      var i = ActorUtils_1.ActorUtils.GetEntityByActor(t);
      i &&
        (i = i.Entity.GetComponent(142)) &&
        (i.TryDisableTick("[GamePlayElevator.AttachToElevator] 上电梯关闭Tick"),
        (i = this.Entity.GetComponent(185)),
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
          t,
          i.Owner,
          2,
          "GamePlayElevatorComponent.AttachToElevator",
          void 0,
          1,
          1,
          1,
          !1,
        ));
    }
    Qun(t) {
      ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
        t,
        !1,
        "GamePlayElevatorComponent.DetachFromElevator",
        1,
        1,
        1,
      );
      var t = ActorUtils_1.ActorUtils.GetEntityByActor(t);
      t && (t = t.Entity.GetComponent(142)) && t.TryEnableTick(!0);
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
          this,
          this.KHr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
          this,
          this.KHr,
        );
    }
    OnEnd() {
      return (
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
            this.KHr,
          ),
        !0
      );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
          this.KHr,
        );
    }
  });
(GamePlayElevatorComponent = GamePlayElevatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(125)],
    GamePlayElevatorComponent,
  )),
  (exports.GamePlayElevatorComponent = GamePlayElevatorComponent);
//# sourceMappingURL=GamePlayElevatorComponent.js.map
