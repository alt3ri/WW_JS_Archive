"use strict";
let GamePlayElevatorComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let h;
    const o = arguments.length;
    let r =
      o < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, i, e, s);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (h = t[a]) && (r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r);
    return o > 3 && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlayElevatorComponent = void 0);
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const TraceUtils_1 = require("../../Utils/TraceUtils");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const LogController_1 = require("../../World/Controller/LogController");
const CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds");
const MIN_SPEED = 1;
const MTOCM = 100;
const NORMALIZE = 0.01;
const FOUR = 4;
const THOUSAND = 1e3;
const DELTATIMECHANGEVALUE = 10;
const NEGATIVEONE = -1;
const ACCELERATETIMERADIO = 1.5;
let GamePlayElevatorComponent =
  (GamePlayElevatorComponent_1 = class GamePlayElevatorComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.DCo = void 0),
        (this.pun = void 0),
        (this.vun = void 0),
        (this.Mun = void 0),
        (this.Sun = void 0),
        (this.Eun = void 0),
        (this.cz = void 0),
        (this.kRe = void 0),
        (this.yun = void 0),
        (this.Iun = void 0),
        (this.Tun = void 0),
        (this.Lun = void 0),
        (this.Dun = -0),
        (this.Aun = void 0),
        (this.Uun = void 0),
        (this.Pun = -0),
        (this.ktn = void 0),
        (this.xun = void 0),
        (this.wun = -0),
        (this.Bun = -0),
        (this.bun = void 0),
        (this.qun = 1),
        (this.Gun = 1),
        (this.Nun = !1),
        (this.Oun = !1),
        (this.kun = !1),
        (this.Vun = !1),
        (this.Hun = !1),
        (this.jun = !1),
        (this.Wun = void 0),
        (this.Kun = void 0),
        (this.Qun = void 0),
        (this.xNi = void 0),
        (this.cjr = (t) => {
          this.Xun() ||
            (this.kun
              ? this.$un(t)
              : !this.IsMove() ||
                (this.Oun && this.Yun()) ||
                (this.Jun(t), this.rzo(t), this.zun()));
        }),
        (this.Zun = () => {
          this.Uun = !1;
        }),
        (this.ecn = (t, i) => {
          let e;
          var i = i.Entity;
          i.GetComponent(140) &&
            ((i = i.GetComponent(1)),
            (e = this.Kun.indexOf(i.Owner)),
            t
              ? e === -1 && this.Kun.push(i.Owner)
              : e !== -1 && this.Kun.splice(e, 1),
            (e = this.Wun.indexOf(i.Owner)) !== -1) &&
            this.Wun.splice(e, 1);
        }),
        (this.tcn = (t) => {
          let i, e;
          this.IsMove() &&
            ((e = void 0), (i = Global_1.Global.BaseCharacter)) &&
            (e = i.CharacterActorComponent.Entity.GetComponent(157)) &&
            (t
              ? ((t = i.K2_GetActorLocation().Z),
                this.Entity.GetComponent(1)?.ActorLocationProxy.Z < t &&
                  e.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
                    InstigatorId: e.CreatureDataId,
                    Duration: this.icn(),
                    Reason: "电梯添加buff",
                  }))
              : e.RemoveBuff(
                  CharacterBuffIds_1.buffId.ElevatorBuff,
                  -1,
                  "电梯移除buff",
                ));
        }),
        (this.ocn = (t, i) => {
          const e = ActorUtils_1.ActorUtils.GetEntityByActor(i);
          e &&
            e.Entity.GetComponent(140) &&
            this.Wun.indexOf(i) === -1 &&
            (this.IsMove() && this.Kun.indexOf(i) !== -1 && this.rcn(i),
            this.Wun.push(i));
        }),
        (this.OnSceneInteractionLoadCompleted = () => {
          var t = this.Entity.GetComponent(182);
          var t =
            SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
              t.GetSceneInteractionLevelHandleId(),
            );
          (this.Qun = t?.GetComponentByClass(
            UE.PrimitiveComponent.StaticClass(),
          )),
            this.Qun &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Temp", 32, "111", [
                  "111",
                  this.Qun.GetCollisionProfileName().toString(),
                ]),
              t.OnActorHit.Add(this.ocn),
              this.Qun.SetNotifyRigidBodyCollision(!0));
        });
    }
    get CurLiftFloor() {
      return this.qun;
    }
    OnInitData(t) {
      t = t.GetParam(GamePlayElevatorComponent_1)[0];
      if (!t) throw Error("创建GamePlayElevatorComponent缺少配置参数");
      (this.Sun = t.UniformMovement),
        (this.Eun = t.TurnTime),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.yun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Lun = t.MaxSpeed),
        (this.vun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Mun = Vector_1.Vector.Create(0, 0, 0)),
        (this.kRe = Vector_1.Vector.Create(0, 0, 0)),
        (this.Tun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Iun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Wun = []),
        (this.Kun = []);
      const i = this.Entity.GetComponent(0);
      const e = i.GetInitLocation();
      const s = e.X || 0;
      const h = e.Y || 0;
      const o = e.Z || 0;
      if (((this.bun = []), t.StayPositions))
        for (const r of t.StayPositions)
          this.bun.push(
            Vector_1.Vector.Create(
              r.X ? s + r.X : s,
              r.Y ? h + r.Y : h,
              r.Z ? o + r.Z : o,
            ),
          );
      return (
        (this.qun = i.LiftFloor ?? 1),
        (this.Gun = 0),
        (this.DCo = Vector_1.Vector.Create(0, 0, 0)),
        (this.pun = Vector_1.Vector.Create(0, 0, 0)),
        (this.Nun = !1),
        (this.Oun = !1),
        (this.kun = !1),
        (this.Vun = void 0 !== t.AutoConfig),
        (this.Hun = t.AutoConfig?.IsCircle ?? !1),
        (this.jun = !1),
        (this.Bun = t.AutoConfig?.Interval ?? 0),
        (this.wun = 0),
        t.SafePoint &&
          (this.Aun = Vector_1.Vector.Create(
            t.SafePoint.X ?? 0,
            t.SafePoint.Y ?? 0,
            t.SafePoint.Z ?? 0,
          )),
        !0
      );
    }
    OnStart() {
      return (
        this.WVo(),
        (this.ktn = this.Entity.GetComponent(74)),
        this.ktn &&
          (this.ktn.AddOnPlayerOverlapCallback(this.tcn),
          this.ktn.AddOnEntityOverlapCallback(this.ecn)),
        (this.xun = this.Entity.GetComponent(115)),
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
        this.ktn &&
          (this.ktn.RemoveOnPlayerOverlapCallback(this.tcn),
          this.ktn.RemoveOnEntityOverlapCallback(this.ecn)),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.OnSceneInteractionLoadCompleted,
        ),
        void 0 !== this.xNi && TimerSystem_1.TimerSystem.Remove(this.xNi),
        !0
      );
    }
    OnForceTick(t) {
      this.cjr(t);
    }
    Jun(t) {
      this.Sun ? this.ncn() : this.scn();
    }
    acn(i, e) {
      if (!this.Xun() && !this.Uun) {
        this.Uun = !0;
        let t = Protocol_1.Aki.Protocol.rks.Proto_End;
        e &&
          (t =
            this.Gun > this.qun
              ? Protocol_1.Aki.Protocol.rks.BFn
              : Protocol_1.Aki.Protocol.rks.Proto_Reverse),
          LevelGamePlayController_1.LevelGamePlayController.ElevatorStateChangeRequest(
            this.Entity.Id,
            i,
            t,
            this.Zun,
          );
      }
    }
    zun() {
      const t = this.pun;
      const i = this.Entity.GetComponent(1).ActorLocationProxy;
      t.Subtraction(i, this.cz),
        this.cz.MultiplyEqual(this.yun),
        (this.cz.X >= 0 && this.cz.Y >= 0 && this.cz.Z >= 0) || this.hcn();
    }
    hcn() {
      const t = this.pun;
      const i = this.Entity.GetComponent(1);
      this.Iun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Tun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        i.SetActorLocation(t.ToUeVector()),
        (this.Pun = 0),
        (this.Oun = !1),
        (this.Nun = !1),
        this.acn(this.Gun, !1),
        (this.qun = this.Gun),
        (this.Gun = 0),
        this.lcn(),
        this.Vun && (this.kun = !0),
        (this.xun.IsMoving = !1);
    }
    rzo(t) {
      (!this.Pun || Math.abs(t - this.Pun) > DELTATIMECHANGEVALUE) &&
        (this.Pun = t);
      var t = this.Entity.GetComponent(1);
      const i = this.Pun * MathUtils_1.MathUtils.MillisecondToSecond;
      const e =
        (this.cz.DeepCopy(this.Tun),
        this.cz.MultiplyEqual(i),
        this.Iun.Addition(this.cz, this.kRe),
        this.kRe);
      this.Mun.SizeSquared() > e.SizeSquared() || e.DotProduct(this.Iun) < 0
        ? this.Iun.DeepCopy(this.Mun)
        : this.vun.SizeSquared() < e.SizeSquared()
          ? this.Iun.DeepCopy(this.vun)
          : this.Iun.AdditionEqual(this.cz),
        this.cz.DeepCopy(this.Iun),
        this.cz.MultiplyEqual(i),
        this.kRe.DeepCopy(t.ActorLocationProxy),
        this.kRe.AdditionEqual(this.cz),
        t.SetActorLocation(this.kRe.ToUeVector());
    }
    $un(t) {
      (this.wun += t * MathUtils_1.MathUtils.MillisecondToSecond),
        this.wun > this.Bun &&
          ((this.wun = 0),
          (this.kun = !1),
          (t = this._cn()),
          this.SetTargetFloor(t));
    }
    ncn() {}
    scn() {
      let t = this.DCo;
      const i = this.pun;
      let e = this.Entity.GetComponent(1).ActorLocationProxy;
      const s = this.Dun;
      const h = Vector_1.Vector.DistSquared(e, t);
      t = MathUtils_1.MathUtils.Bisection((t) => t * t > h, 0, h, 1);
      const o = Vector_1.Vector.DistSquared(e, i);
      e = MathUtils_1.MathUtils.Bisection((t) => t * t > o, 0, o, 1);
      this.Tun.SizeSquared() !== 0 &&
        t > (1 / FOUR) * s &&
        e > (1 / FOUR) * s &&
        this.Tun.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Tun.SizeSquared() === 0 &&
          e < (1 / FOUR) * s &&
          this.Tun.DeepCopy(this.ucn().MultiplyEqual(NEGATIVEONE));
    }
    ccn() {
      return (
        this.pun.Subtraction(this.DCo, this.cz),
        this.cz.Normalize(NORMALIZE),
        this.cz.MultiplyEqual(this.Lun * MTOCM),
        this.cz
      );
    }
    ucn() {
      var t = this.DCo;
      var t = (this.pun.Subtraction(t, this.cz), this.cz.Size());
      return (
        this.cz.Normalize(NORMALIZE),
        this.cz.MultiplyEqual((this.Lun * MTOCM * this.Lun * MTOCM * 2) / t),
        this.cz
      );
    }
    IsMove() {
      return !(!this.Nun && !this.Oun);
    }
    WVo() {
      let t;
      this.Vun && ((t = this._cn()), this.SetTargetFloor(t));
    }
    SetTargetFloor(t) {
      let i, e;
      t < 1 || t > this.bun.length || this.qun === t
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneItem", 36, "SetTargetFloor Wrong Floor", [
            "targetFloor",
            t,
          ])
        : this.Gun !== 0
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("SceneItem", 36, "Elevator Running")
          : ((this.Gun = t),
            this.lcn(),
            this.Vun && this.acn(t, !0),
            this.Vun ||
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
    lcn() {
      if (!this.Xun()) {
        let t = void 0;
        let i = Global_1.Global.BaseCharacter;
        if (
          (i &&
            ((i = i.CharacterActorComponent.Entity), (t = i.GetComponent(157))),
          this.Gun === 0)
        ) {
          if (
            (this.mcn() &&
              t &&
              t.RemoveBuff(
                CharacterBuffIds_1.buffId.ElevatorBuff,
                -1,
                "电梯移除buff",
              ),
            this.Wun.length > 0)
          )
            for (const e of this.Wun)
              TimerSystem_1.TimerSystem.Next(() => {
                this.dcn(e);
              });
          GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
            ?.GetCurrentQualityInfo()
            ?.ApplyMotionBlur();
        } else if (
          (UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.MotionBlur.Amount 0",
          ),
          this.Ccn(),
          this.Eun
            ? (this.xNi = TimerSystem_1.TimerSystem.Delay((t) => {
                this.gcn(), (this.xNi = void 0);
              }, this.Eun * THOUSAND))
            : this.gcn(),
          this.mcn() &&
            t &&
            t.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
              InstigatorId: t.CreatureDataId,
              Duration: this.icn() + this.Eun ?? 0,
              Reason: "电梯添加buff",
            }),
          this.Wun.length > 0)
        )
          for (const s of this.Wun) this.Kun.indexOf(s) !== -1 && this.rcn(s);
      }
    }
    Ccn() {
      this.DCo.DeepCopy(this.bun[this.qun - 1]),
        this.pun.DeepCopy(this.bun[this.Gun - 1]),
        this.pun.Subtraction(this.DCo, this.yun),
        (this.Dun = this.yun.Size()),
        this.cz.DeepCopy(this.yun),
        this.cz.Normalize(NORMALIZE),
        this.cz.Multiply(this.Lun * MTOCM, this.vun),
        this.cz.Multiply(MIN_SPEED * MTOCM, this.Mun);
    }
    gcn() {
      this.Sun ? this.Iun.DeepCopy(this.ccn()) : this.Tun.DeepCopy(this.ucn()),
        (this.Oun = this.qun > this.Gun),
        (this.Nun = this.qun < this.Gun),
        (this.xun.IsMoving = !0);
    }
    Xun() {
      return this.Entity.GetComponent(177).HasTag(-662723379);
    }
    Yun() {
      if (!this.ktn) return !1;
      let t;
      let i;
      let e;
      let s;
      const h = this.ktn.GetEntitiesInRangeLocal();
      if (!h) return !1;
      let o = !1;
      for (const r of h.values())
        r?.Valid &&
          r.Entity !== this.Entity &&
          ((t = r.Entity.GetComponent(1)?.ActorLocationProxy),
          (i = r.Entity.GetComponent(1)?.HasMesh()),
          (e =
            void 0 !== (e = r.Entity.GetComponent(0)?.GetSummonerId()) &&
            e !== 0),
          (s = this.Entity.GetComponent(1)?.ActorLocationProxy),
          i) &&
          t &&
          t.Z < s.Z - 100 &&
          !e &&
          (r.Entity ===
            Global_1.Global.BaseCharacter.CharacterActorComponent.Entity &&
            r.Entity.GetComponent(55)?.StopManipualte(),
          this.fcn(r.Entity),
          (o = !0));
      return o;
    }
    fcn(i) {
      const e = i.GetComponent(1)?.ActorLocationProxy;
      const t = this.Entity.GetComponent(1).ActorLocationProxy;
      if (e && t)
        if (this.Aun) {
          const l = i.GetComponent(1);
          let s;
          var h = l.GetRadius();
          var h = Vector_1.Vector.Create(
            t.X + this.Aun.X,
            t.Y + this.Aun.Y,
            t.Z + this.Aun.Z + h,
          );
          const o = i.GetComponent(3);
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
              var n;
              var r =
                ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
              var a =
                (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                  a,
                  0,
                  r,
                ),
                l.GetRadius());
              var a = ((r.Z += a), i.GetComponent(3));
              a
                ? ((n = l.DisableCollision(
                    "[GamePlayElevatorComponent.SetEntitySafePos]",
                  )),
                  a.TeleportAndFindStandLocation(r),
                  l.EnableCollision(n))
                : ((a = i.GetComponent(140)) && a.TryEnableTick(!0),
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
    mcn() {
      if (!this.ktn) return !1;
      const t = this.ktn.GetEntitiesInRangeLocal();
      if (!t) return !1;
      let i = -1;
      const e = Global_1.Global.BaseCharacter;
      return e && (i = e.CharacterActorComponent.Entity.Id), t.has(i);
    }
    icn() {
      this.DCo.Subtraction(this.pun, this.cz);
      const t = this.cz.Size();
      if (this.Sun) {
        const i = t / MTOCM / this.Lun;
        return i > THOUSAND ? THOUSAND : i;
      }
      const i = (ACCELERATETIMERADIO * t) / MTOCM / this.Lun;
      return i > THOUSAND ? THOUSAND : i;
    }
    _cn() {
      let t = this.jun ? this.qun - 1 : this.qun + 1;
      return this.Hun
        ? (t = t > this.bun.length ? 1 : t)
        : (t > this.bun.length
            ? ((t = this.bun.length - 1), (this.jun = !0))
            : t < 1 && ((t = 2), (this.jun = !1)),
          t);
    }
    rcn(t) {
      let i = ActorUtils_1.ActorUtils.GetEntityByActor(t);
      i &&
        (i = i.Entity.GetComponent(140)) &&
        (i.TryDisableTick("[GamePlayElevator.AttachToElevator] 上电梯关闭Tick"),
        (i = this.Entity.GetComponent(182)),
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
    dcn(t) {
      ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(
        t,
        !1,
        "GamePlayElevatorComponent.DetachFromElevator",
        1,
        1,
        1,
      );
      var t = ActorUtils_1.ActorUtils.GetEntityByActor(t);
      t && (t = t.Entity.GetComponent(140)) && t.TryEnableTick(!0);
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
          this,
          this.cjr,
        );
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterPreTick(
          this,
          this.cjr,
        );
    }
    OnEnd() {
      return (
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
            this.cjr,
          ),
        !0
      );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterPreTick(
          this.cjr,
        );
    }
  });
(GamePlayElevatorComponent = GamePlayElevatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(123)],
    GamePlayElevatorComponent,
  )),
  (exports.GamePlayElevatorComponent = GamePlayElevatorComponent);
// # sourceMappingURL=GamePlayElevatorComponent.js.map
